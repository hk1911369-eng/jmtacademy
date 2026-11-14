-- Practice content needs traceable source/rights metadata and independent review.
-- Existing published questions are unpublished until an administrator reviews them.
ALTER TABLE public.student_practice_questions
  ADD COLUMN IF NOT EXISTS source_kind text NOT NULL DEFAULT 'original'
    CHECK (source_kind IN ('original','official_document','licensed_resource','open_resource','teacher_material')),
  ADD COLUMN IF NOT EXISTS source_reference text NOT NULL DEFAULT ''
    CHECK (length(source_reference) <= 1000),
  ADD COLUMN IF NOT EXISTS source_year integer
    CHECK (source_year IS NULL OR source_year BETWEEN 1900 AND 2100),
  ADD COLUMN IF NOT EXISTS rights_status text NOT NULL DEFAULT 'pending_review'
    CHECK (rights_status IN ('pending_review','original','permission_verified','open_license_verified','public_domain_verified','restricted')),
  ADD COLUMN IF NOT EXISTS review_status text NOT NULL DEFAULT 'pending_review'
    CHECK (review_status IN ('draft','pending_review','approved','rejected')),
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS review_note text NOT NULL DEFAULT ''
    CHECK (length(review_note) <= 2000);

GRANT INSERT (source_kind, source_reference, source_year)
  ON public.student_practice_questions TO authenticated;
GRANT UPDATE (rights_status, review_status, reviewed_by, reviewed_at, review_note, is_published)
  ON public.student_practice_questions TO authenticated;

UPDATE public.student_practice_questions
SET review_status = CASE WHEN is_published IS TRUE THEN 'pending_review' ELSE 'draft' END,
    rights_status = 'pending_review',
    is_published = false,
    reviewed_by = NULL,
    reviewed_at = NULL;

CREATE INDEX IF NOT EXISTS student_practice_questions_review_queue_idx
  ON public.student_practice_questions(review_status, created_at DESC);

CREATE OR REPLACE FUNCTION public.guard_student_practice_review_state()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  IF TG_OP = 'UPDATE'
    AND (NEW.review_status IS DISTINCT FROM OLD.review_status OR NEW.rights_status IS DISTINCT FROM OLD.rights_status)
    AND public.current_role() IS DISTINCT FROM 'admin'::public.app_role THEN
    RAISE EXCEPTION 'Only an administrator can change practice review status or rights verification'
      USING ERRCODE = '42501';
  END IF;

  IF TG_OP = 'UPDATE' AND (
    NEW.course_id IS DISTINCT FROM OLD.course_id
    OR NEW.subject_id IS DISTINCT FROM OLD.subject_id
    OR NEW.concept_id IS DISTINCT FROM OLD.concept_id
    OR NEW.chapter_label IS DISTINCT FROM OLD.chapter_label
    OR NEW.topic IS DISTINCT FROM OLD.topic
    OR NEW.difficulty IS DISTINCT FROM OLD.difficulty
    OR NEW.question_text IS DISTINCT FROM OLD.question_text
    OR NEW.options IS DISTINCT FROM OLD.options
    OR NEW.correct_option IS DISTINCT FROM OLD.correct_option
    OR NEW.explanation IS DISTINCT FROM OLD.explanation
    OR NEW.marks IS DISTINCT FROM OLD.marks
    OR NEW.source_kind IS DISTINCT FROM OLD.source_kind
    OR NEW.source_reference IS DISTINCT FROM OLD.source_reference
    OR NEW.source_year IS DISTINCT FROM OLD.source_year
  ) THEN
    NEW.review_status := 'pending_review';
    NEW.is_published := false;
    NEW.reviewed_by := NULL;
    NEW.reviewed_at := NULL;
    NEW.review_note := '';
    NEW.rights_status := 'pending_review';
  END IF

  IF NEW.source_kind <> 'original' AND length(btrim(NEW.source_reference)) = 0 THEN
    RAISE EXCEPTION 'A source reference is required for non-original practice content'
      USING ERRCODE = '23514';
  END IF;

  IF TG_OP = 'UPDATE'
    AND (NEW.review_status IS DISTINCT FROM OLD.review_status OR NEW.rights_status IS DISTINCT FROM OLD.rights_status)
    AND public.current_role() IS DISTINCT FROM 'admin'::public.app_role THEN
    RAISE EXCEPTION 'Only an administrator can change practice review status or rights verification'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.review_status = 'approved' THEN
    IF public.current_role() IS DISTINCT FROM 'admin'::public.app_role
      OR NEW.reviewed_by IS DISTINCT FROM auth.uid()
      OR NEW.reviewed_by IS NULL
      OR NEW.reviewed_by = NEW.created_by
      OR NEW.reviewed_at IS NULL
      OR NEW.rights_status NOT IN ('original','permission_verified','open_license_verified','public_domain_verified') THEN
      RAISE EXCEPTION 'Independent administrator review and verified content rights are required'
        USING ERRCODE = '42501';
    END IF;
  END IF;

  IF NEW.is_published IS TRUE AND NEW.review_status IS DISTINCT FROM 'approved' THEN
    RAISE EXCEPTION 'Practice content must be approved before publication'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.review_status <> 'approved' THEN
    NEW.is_published := false;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_student_practice_review_state ON public.student_practice_questions;
CREATE TRIGGER guard_student_practice_review_state
BEFORE INSERT OR UPDATE ON public.student_practice_questions
FOR EACH ROW EXECUTE FUNCTION public.guard_student_practice_review_state();

CREATE OR REPLACE FUNCTION public.review_student_practice_question(
  p_question_id uuid,
  p_decision text,
  p_rights_status text DEFAULT NULL,
  p_review_note text DEFAULT ''
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = pg_catalog, public, pg_temp
AS $
DECLARE
  v_question public.student_practice_questions%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL
    OR public.current_role() IS DISTINCT FROM 'admin'::public.app_role THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;

  IF p_question_id IS NULL
    OR p_decision NOT IN ('approve','reject')
    OR length(COALESCE(p_review_note,'')) > 2000 THEN
    RAISE EXCEPTION 'Review request is invalid' USING ERRCODE = '22023';
  END IF;

  SELECT * INTO v_question
  FROM public.student_practice_questions
  WHERE id = p_question_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Practice question not found' USING ERRCODE = 'P0002';
  END IF;

  IF v_question.created_by = auth.uid() THEN
    RAISE EXCEPTION 'Authors cannot review their own practice questions' USING ERRCODE = '42501';
  END IF;

  IF p_decision = 'approve' THEN
    IF p_rights_status IS NULL OR p_rights_status NOT IN ('original','permission_verified','open_license_verified','public_domain_verified') THEN
      RAISE EXCEPTION 'Verified content rights are required for approval' USING ERRCODE = '23514';
    END IF;
    IF v_question.source_kind = 'original' AND p_rights_status <> 'original' THEN
      RAISE EXCEPTION 'Original teacher-authored content must be reviewed as original' USING ERRCODE = '23514';
    END IF;
    IF v_question.source_kind <> 'original' AND p_rights_status = 'original' THEN
      RAISE EXCEPTION 'Non-original content requires a verified permission, open licence or public-domain status' USING ERRCODE = '23514';
    END IF;

    UPDATE public.student_practice_questions
    SET review_status = 'approved',
        rights_status = p_rights_status,
        reviewed_by = auth.uid(),
        reviewed_at = now(),
        review_note = COALESCE(p_review_note,''),
        is_published = true
    WHERE id = p_question_id;
  ELSE
    UPDATE public.student_practice_questions
    SET review_status = 'rejected',
        rights_status = CASE WHEN rights_status = 'restricted' THEN 'restricted' ELSE 'pending_review' END,
        reviewed_by = auth.uid(),
        reviewed_at = now(),
        review_note = COALESCE(p_review_note,''),
        is_published = false
    WHERE id = p_question_id;
  END IF;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.guard_student_practice_review_state() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.review_student_practice_question(uuid,text,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.review_student_practice_question(uuid,text,text,text) TO authenticated;
