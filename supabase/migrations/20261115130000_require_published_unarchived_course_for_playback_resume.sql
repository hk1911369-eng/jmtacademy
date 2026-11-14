-- Keep playback checkpoint access aligned with the student lesson-content policy.
-- Archived or unpublished courses must not leave resumable checkpoint data visible or writable.
DROP POLICY IF EXISTS "students read own entitled lesson playback progress"
  ON public.lesson_playback_progress;

CREATE POLICY "students read own entitled lesson playback progress"
  ON public.lesson_playback_progress
  FOR SELECT TO authenticated
  USING (
    student_id = (SELECT auth.uid())
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid())
        AND p.role::text = 'student'
        AND p.is_active IS TRUE
    )
    AND EXISTS (
      SELECT 1
      FROM public.lessons l
      JOIN public.courses c ON c.id = l.course_id
        AND c.is_published IS TRUE
        AND c.archived_at IS NULL
      JOIN public.enrollments e ON e.course_id = l.course_id
      WHERE l.id = lesson_playback_progress.lesson_id
        AND l.is_published IS TRUE
        AND e.student_id = (SELECT auth.uid())
        AND e.status = 'active'
        AND e.admission_fee_paid IS TRUE
        AND e.paid_through >= (
          date_trunc('month', now() AT TIME ZONE 'Asia/Dhaka')::date
          + interval '1 month - 1 day'
        )::date
    )
  );

CREATE OR REPLACE FUNCTION private.save_lesson_playback_checkpoint(
  p_lesson_id uuid,
  p_position_seconds integer,
  p_duration_seconds integer DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  v_course_id uuid;
  v_period_end date;
  v_saved boolean;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '28000';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role::text = 'student'
      AND p.is_active IS TRUE
  ) THEN
    RAISE EXCEPTION 'Active student profile required' USING ERRCODE = '42501';
  END IF;

  IF p_lesson_id IS NULL
    OR p_position_seconds IS NULL
    OR p_position_seconds < 0
    OR p_position_seconds > 86400 THEN
    RAISE EXCEPTION 'Invalid playback checkpoint' USING ERRCODE = '22023';
  END IF;

  IF p_duration_seconds IS NOT NULL
    AND (p_duration_seconds < 1 OR p_duration_seconds > 86400) THEN
    RAISE EXCEPTION 'Invalid media duration' USING ERRCODE = '22023';
  END IF;

  IF p_duration_seconds IS NOT NULL
    AND p_position_seconds > p_duration_seconds + 3 THEN
    RAISE EXCEPTION 'Playback position exceeds media duration' USING ERRCODE = '22023';
  END IF;

  SELECT l.course_id INTO v_course_id
  FROM public.lessons l
  JOIN public.courses c ON c.id = l.course_id
    AND c.is_published IS TRUE
    AND c.archived_at IS NULL
  WHERE l.id = p_lesson_id AND l.is_published IS TRUE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Published lesson not found' USING ERRCODE = '42501';
  END IF;

  v_period_end := (
    date_trunc('month', now() AT TIME ZONE 'Asia/Dhaka')::date
    + interval '1 month - 1 day'
  )::date;

  IF NOT EXISTS (
    SELECT 1
    FROM public.enrollments e
    WHERE e.student_id = auth.uid()
      AND e.course_id = v_course_id
      AND e.status = 'active'
      AND e.admission_fee_paid IS TRUE
      AND e.paid_through >= v_period_end
  ) THEN
    RAISE EXCEPTION 'Current course entitlement required' USING ERRCODE = '42501';
  END IF;

  -- A completed lesson must not reappear as an unfinished resume target.
  IF EXISTS (
    SELECT 1 FROM public.lesson_progress lp
    WHERE lp.student_id = auth.uid()
      AND lp.lesson_id = p_lesson_id
      AND lp.completed IS TRUE
  ) THEN
    DELETE FROM public.lesson_playback_progress
    WHERE student_id = auth.uid() AND lesson_id = p_lesson_id;
    RETURN true;
  END IF;

  INSERT INTO public.lesson_playback_progress (
    student_id, lesson_id, position_seconds, duration_seconds, last_viewed_at, updated_at
  ) VALUES (
    auth.uid(), p_lesson_id, p_position_seconds, p_duration_seconds, now(), now()
  )
  ON CONFLICT (student_id, lesson_id) DO UPDATE
  SET position_seconds = EXCLUDED.position_seconds,
      duration_seconds = COALESCE(EXCLUDED.duration_seconds, public.lesson_playback_progress.duration_seconds),
      last_viewed_at = now(),
      updated_at = now()
  WHERE public.lesson_playback_progress.updated_at <= now() - interval '2 seconds'
  RETURNING true INTO v_saved;

  -- False means the server-side write throttle intentionally deferred this update.
  RETURN COALESCE(v_saved, false);
END;
$$;
