'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

async function actor() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin','teacher','staff'].includes(profile.role)) redirect('/portal');
  return { supabase, user, role: profile.role as string };
}

function parseDhakaDateTime(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(value)) return null;
  const normalized = value.length === 16 ? value + ':00' : value;
  const parsed = new Date(normalized + '+06:00');
  if (Number.isNaN(parsed.getTime())) return null;
  const roundTrip = new Date(parsed.getTime() + 6 * 60 * 60 * 1000).toISOString().slice(0, 19);
  return roundTrip === normalized ? parsed.toISOString() : null;
}

export async function createOfflineBatch(formData: FormData) {
  const { supabase, user, role } = await actor();
  if (role !== 'admin') redirect('/offline-operations?error=permission');
  const courseId = String(formData.get('course_id') ?? '');
  const batchName = String(formData.get('batch_name') ?? '').trim();
  if (!courseId || batchName.length < 2 || batchName.length > 120) redirect('/offline-operations?error=batch');
  const { data: course } = await supabase.from('courses')
    .select('id,programme_group,delivery_modes,archived_at,is_published').eq('id', courseId).maybeSingle();
  if (!course || !course.is_published || course.archived_at || !course.programme_group?.trim() || !course.delivery_modes?.includes('offline')) redirect('/offline-operations?error=batch');
  const { error } = await supabase.from('offline_batches').insert({
    course_id: courseId, batch_name: batchName,
    cohort_label: course.programme_group || 'Unspecified cohort', created_by: user.id,
  });
  redirect(error ? '/offline-operations?error=batch' : '/offline-operations?saved=batch');
}

export async function assignOfflineBatchStaff(formData: FormData) {
  const { supabase, user, role } = await actor();
  if (role !== 'admin') redirect('/offline-operations?error=permission');
  const batchId = String(formData.get('batch_id') ?? '');
  const staffId = String(formData.get('staff_id') ?? '');
  if (!batchId || !staffId) redirect('/offline-operations?error=assignment');
  const { data: batch } = await supabase.from('offline_batches').select('id,course_id').eq('id', batchId).maybeSingle();
  const { data: staff } = await supabase.from('profiles').select('id,role,is_active').eq('id', staffId).maybeSingle();
  if (!batch || !staff || !staff.is_active || !['teacher','staff'].includes(staff.role)) redirect('/offline-operations?error=assignment');
  const { data: courseAssignment } = await supabase.from('course_assignments').select('id')
    .eq('course_id', batch.course_id).eq('teacher_id', staffId).maybeSingle();
  if (!courseAssignment) redirect('/offline-operations?error=assignment');
  const { error } = await supabase.from('offline_batch_staff').insert({ batch_id: batchId, staff_id: staffId, assigned_by: user.id });
  redirect(error ? '/offline-operations?error=assignment' : '/offline-operations?saved=assignment');
}

export async function approveOfflineStudentRoll(formData: FormData) {
  const { supabase, user } = await actor();
  const batchId = String(formData.get('batch_id') ?? '');
  const studentCode = String(formData.get('student_code') ?? '').trim();
  const rollNumber = String(formData.get('roll_number') ?? '').trim();
  const startsAt = parseDhakaDateTime(String(formData.get('starts_at') ?? ''));
  const endsAt = parseDhakaDateTime(String(formData.get('ends_at') ?? ''));
  if (!batchId || !studentCode || studentCode.length > 60 || rollNumber.length < 1 || rollNumber.length > 40
    || !startsAt || !endsAt || new Date(endsAt) <= new Date(startsAt)) redirect('/offline-operations?error=roster');
  const { data: batch } = await supabase.from('offline_batches').select('id,course_id').eq('id', batchId).maybeSingle();
  if (!batch) redirect('/offline-operations?error=permission');
  const { data: student } = await supabase.from('profiles').select('id,role,is_active')
    .eq('student_code', studentCode).eq('role', 'student').eq('is_active', true).maybeSingle();
  if (!student) redirect('/offline-operations?error=student');
  const { error } = await supabase.from('offline_batch_roster').insert({
    batch_id: batch.id, course_id: batch.course_id, student_id: student.id,
    roll_number: rollNumber, status: 'approved', starts_at: startsAt, ends_at: endsAt,
    approved_by: user.id, created_by: user.id,
  });
  redirect(error ? '/offline-operations?error=roster' : '/offline-operations?saved=roster');
}

export async function revokeOfflineStudentRoll(formData: FormData) {
  const { supabase, user } = await actor();
  const rosterId = String(formData.get('roster_id') ?? '');
  if (!rosterId) redirect('/offline-operations?error=roster');
  const { error } = await supabase.from('offline_batch_roster').update({
    status: 'revoked', revoked_by: user.id, revoked_at: new Date().toISOString(),
  }).eq('id', rosterId).eq('status', 'approved');
  redirect(error ? '/offline-operations?error=roster' : '/offline-operations?saved=revoked');
}

export async function getOfflineClassRecordingUrl(recordingId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !/^[0-9a-f-]{36}$/i.test(recordingId)) return { url: null, error: 'unavailable' as const };
  const { data: recording } = await supabase.from('offline_class_recordings')
    .select('storage_path').eq('id', recordingId).maybeSingle();
  if (!recording) return { url: null, error: 'unavailable' as const };
  const { data, error } = await supabase.storage.from('offline-class-recordings').createSignedUrl(recording.storage_path, 900);
  return error || !data?.signedUrl ? { url: null, error: 'unavailable' as const } : { url: data.signedUrl, error: null };
}
