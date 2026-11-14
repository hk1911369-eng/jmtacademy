import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('playback checkpoint storage is isolated from lesson completion and has strict client grants', async () => {
  const migration = await readFile(new URL('../supabase/migrations/20261115120000_secure_lesson_playback_resume_checkpoints.sql', import.meta.url), 'utf8');
  assert.ok(migration.includes('CREATE TABLE public.lesson_playback_progress'));
  assert.ok(migration.includes('ALTER TABLE public.lesson_playback_progress ENABLE ROW LEVEL SECURITY'));
  assert.ok(migration.includes('REVOKE ALL ON TABLE public.lesson_playback_progress FROM PUBLIC, anon, authenticated'));
  assert.ok(migration.includes('GRANT SELECT ON TABLE public.lesson_playback_progress TO authenticated'));
  assert.doesNotMatch(migration, /GRANT\s+(?:INSERT|UPDATE|DELETE)[^;]*lesson_playback_progress/i);
  assert.ok(migration.includes('student_id = (SELECT auth.uid())'));
  assert.ok(migration.includes("(SELECT public.current_role())::text = 'student'"));
});

test('database checkpoint RPC revalidates lesson, student role, payment and Bangladesh billing entitlement', async () => {
  const migration = await readFile(new URL('../supabase/migrations/20261115120000_secure_lesson_playback_resume_checkpoints.sql', import.meta.url), 'utf8');
  assert.ok(migration.includes('public.save_lesson_playback_checkpoint'));
  assert.ok(migration.includes('SECURITY DEFINER'));
  assert.ok(migration.includes('SET search_path = pg_catalog, public, pg_temp'));
  assert.ok(migration.includes("IS DISTINCT FROM 'student'"));
  assert.ok(migration.includes('l.is_published IS TRUE'));
  assert.ok(migration.includes("e.status = 'active'"));
  assert.ok(migration.includes('e.admission_fee_paid IS TRUE'));
  assert.ok(migration.includes('e.paid_through >= v_period_end'));
  assert.ok(migration.includes('p_position_seconds BETWEEN 0 AND 86400') || migration.includes('p_position_seconds < 0'));
  assert.ok(migration.includes('REVOKE ALL ON FUNCTION public.save_lesson_playback_checkpoint(uuid, integer, integer)'));
  assert.ok(migration.includes('GRANT EXECUTE ON FUNCTION public.save_lesson_playback_checkpoint(uuid, integer, integer) TO authenticated'));
  assert.ok(migration.includes('updated_at <= now() - interval \'2 seconds\''));
});

test('verified lesson completion clears its playback checkpoint without changing completion evidence', async () => {
  const migration = await readFile(new URL('../supabase/migrations/20261115120000_secure_lesson_playback_resume_checkpoints.sql', import.meta.url), 'utf8');
  assert.ok(migration.includes('CREATE OR REPLACE FUNCTION public.clear_completed_lesson_playback_checkpoint()'));
  assert.ok(migration.includes('DELETE FROM public.lesson_playback_progress'));
  assert.ok(migration.includes('AFTER INSERT OR UPDATE OF completed ON public.lesson_progress'));
  assert.ok(migration.includes('WHEN (NEW.completed IS TRUE)'));
  assert.ok(migration.includes('REVOKE ALL ON FUNCTION public.clear_completed_lesson_playback_checkpoint()'));
});

test('server action validates untrusted checkpoint values and writes only through the guarded RPC', async () => {
  const action = await readFile(new URL('../app/actions/learning.ts', import.meta.url), 'utf8');
  assert.ok(action.includes('export async function saveLessonPlaybackCheckpoint'));
  assert.ok(action.includes('supabase.auth.getUser()'));
  assert.ok(action.includes("rpc('save_lesson_playback_checkpoint'"));
  assert.ok(action.includes('Number.isFinite(positionSeconds)'));
  assert.ok(action.includes('positionSeconds > 86400'));
  assert.ok(action.includes('p_lesson_id: lessonId'));
  assert.ok(action.includes('p_position_seconds: safePosition'));
});

test('final checkpoint route is same-origin, authenticated and delegates authorization to the database', async () => {
  const route = await readFile(new URL('../app/api/learning/playback-checkpoint/route.ts', import.meta.url), 'utf8');
  assert.ok(route.includes('request.headers.get(\'origin\')'));
  assert.ok(route.includes('originHost.toLowerCase() !== host.toLowerCase()'));
  assert.ok(route.includes('supabase.auth.getUser()'));
  assert.ok(route.includes("rpc('save_lesson_playback_checkpoint'"));
  assert.ok(route.includes("credentials" ) === false);
  assert.ok(route.includes('Cache-Control'));
});

test('lesson player restores only after metadata, saves periodically and on pause/seek, and does not autoplay', async () => {
  const player = await readFile(new URL('../components/lesson-video-player.tsx', import.meta.url), 'utf8');
  assert.ok(player.includes("'use client'"));
  assert.ok(player.includes('onLoadedMetadata={restorePosition}'));
  assert.ok(player.includes('video.currentTime = position'));
  assert.ok(player.includes('onTimeUpdate'));
  assert.ok(player.includes('difference < 15'));
  assert.ok(player.includes('onPause='));
  assert.ok(player.includes('onSeeked='));
  assert.ok(player.includes("document.addEventListener('visibilitychange'"));
  assert.ok(player.includes('navigator.sendBeacon'));
  assert.ok(player.includes('preload="metadata"'));
  assert.ok(player.includes('playsInline'));
  assert.ok(player.includes('controls'));
  assert.doesNotMatch(player, /autoPlay|localStorage|sessionStorage/);
  assert.ok(player.includes('Progress could not be saved yet'));
});

test('learning page reads only the signed-in student checkpoint and does not resume completed lessons', async () => {
  const page = await readFile(new URL('../app/learn/[courseId]/page.tsx', import.meta.url), 'utf8');
  assert.ok(page.includes("from('lesson_playback_progress')"));
  assert.ok(page.includes("profile?.role === 'student'"));
  assert.ok(page.includes('initialPositionSeconds={done.has(l.id) ? 0'));
  assert.ok(page.includes('completed={done.has(l.id)}'));
  assert.ok(page.includes('<LessonVideoPlayer'));
});

test('Student Today offers the latest saved lesson only from current paid published courses', async () => {
  const page = await readFile(new URL('../app/student/page.tsx', import.meta.url), 'utf8');
  assert.ok(page.includes("from('lesson_playback_progress')"));
  assert.ok(page.includes('eligibleCourseIds'));
  assert.ok(page.includes(".eq('is_published', true)"));
  assert.ok(page.includes(".eq('completed', true)"));
  assert.ok(page.includes('continueLesson={continueLesson}'));
  const dashboard = await readFile(new URL('../components/learning-os-dashboard.tsx', import.meta.url), 'utf8');
  assert.ok(dashboard.includes('learning-os-continue-card'));
  assert.ok(dashboard.includes('Resume lesson'));
});
