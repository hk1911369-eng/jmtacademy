'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

const uuidPattern = /^[0-9a-f-]{36}$/i;
const sourceKinds = ['original', 'official_document', 'licensed_resource', 'open_resource', 'teacher_material'];

export async function createStudentPracticeQuestion(formData: FormData) {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await db.from('profiles').select('role,is_active').eq('id', user.id).single();
  if (profile?.is_active !== true || !['admin', 'teacher', 'staff'].includes(profile.role ?? '')) redirect('/portal');

  const mapping = String(formData.get('course_subject') ?? '').split(':');
  const courseId = mapping[0] ?? '';
  const subjectId = mapping[1] ?? '';
  const questionText = String(formData.get('question_text') ?? '').trim();
  const chapterLabel = String(formData.get('chapter_label') ?? '').trim();
  const topic = String(formData.get('topic') ?? '').trim();
  const difficulty = String(formData.get('difficulty') ?? 'medium');
  const explanation = String(formData.get('explanation') ?? '').trim();
  const marks = Number(formData.get('marks') ?? 1);
  const correctOption = Number(formData.get('correct_option') ?? -1);
  const options = String(formData.get('options') ?? '').split(/\r?\n/).map(option => option.trim()).filter(Boolean);
  const conceptId = String(formData.get('concept_id') ?? '').trim();
  const sourceKind = String(formData.get('source_kind') ?? 'original');
  const sourceReference = String(formData.get('source_reference') ?? '').trim();
  const sourceYearValue = String(formData.get('source_year') ?? '').trim();
  const sourceYear = sourceYearValue ? Number(sourceYearValue) : null;

  if (
    !uuidPattern.test(courseId)
    || !uuidPattern.test(subjectId)
    || (conceptId && !uuidPattern.test(conceptId))
    || questionText.length < 2 || questionText.length > 4000
    || chapterLabel.length > 160 || topic.length > 160
    || explanation.length > 4000
    || !['easy', 'medium', 'hard'].includes(difficulty)
    || options.length < 2 || options.length > 6
    || options.some(option => option.length > 1000)
    || !Number.isInteger(correctOption) || correctOption < 0 || correctOption >= options.length
    || !Number.isFinite(marks) || marks <= 0 || marks > 100
    || !sourceKinds.includes(sourceKind)
    || sourceReference.length > 1000
    || (sourceKind !== 'original' && sourceReference.length < 4)
    || (sourceYear !== null && (!Number.isInteger(sourceYear) || sourceYear < 1900 || sourceYear > 2100))
  ) redirect('/teacher/practice?error=invalid');

  const { error } = await db.from('student_practice_questions').insert({
    course_id: courseId,
    subject_id: subjectId,
    concept_id: conceptId || null,
    chapter_label: chapterLabel,
    topic,
    difficulty,
    question_text: questionText,
    options,
    correct_option: correctOption,
    explanation,
    marks,
    source_kind: sourceKind,
    source_reference: sourceReference,
    source_year: sourceYear,
    is_published: false,
    created_by: user.id,
  });

  if (error) redirect('/teacher/practice?error=save');

  revalidatePath('/practice');
  revalidatePath('/teacher/practice');
  revalidatePath('/admin/practice-review');
  redirect('/teacher/practice?submitted=1');
}


export async function reviewStudentPracticeQuestion(formData: FormData) {
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await db.from('profiles').select('role,is_active').eq('id', user.id).single();
  if (profile?.is_active !== true || profile.role !== 'admin') redirect('/portal');

  const questionId = String(formData.get('question_id') ?? '').trim();
  const decision = String(formData.get('decision') ?? '');
  const rightsStatus = String(formData.get('rights_status') ?? '');
  const reviewNote = String(formData.get('review_note') ?? '').trim();
  if (!uuidPattern.test(questionId) || !['approve', 'reject'].includes(decision) || reviewNote.length > 2000
    || (decision === 'approve' && reviewNote.length < 10) || (decision === 'reject' && reviewNote.length < 5)) {
    redirect('/admin/practice-review?error=invalid');
  }

  const { error } = await db.rpc('review_student_practice_question', {
    p_question_id: questionId,
    p_decision: decision,
    p_rights_status: decision === 'approve' ? rightsStatus : null,
    p_review_note: reviewNote,
  });
  if (error) redirect('/admin/practice-review?error=review');

  revalidatePath('/admin/practice-review');
  revalidatePath('/teacher/practice');
  revalidatePath('/practice');
  redirect('/admin/practice-review?success=1');
}
