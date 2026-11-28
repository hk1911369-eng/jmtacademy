import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');

test('offline recording access requires a staff-approved physical batch roster and bounded entitlement', async () => {
  const sql = await read('supabase/migrations/20261123163858_offline_recording_entitlements.sql');
  assert.match(sql, /create table public\\.offline_batches/i);
  assert.match(sql, /Set the course programme group before creating a physical batch/);
  assert.match(sql, /create table public\\.offline_batch_staff/i);
  assert.match(sql, /create table public\\.offline_batch_roster/i);
  assert.match(sql, /delivery_mode='offline'/);
  assert.match(sql, /r\\.status='approved'/);
  assert.match(sql, /r\\.starts_at<=now\\(\\)/);
  assert.match(sql, /r\\.ends_at>now\\(\\)/);
  assert.match(sql, /r\\.revoked_at is null/);
  assert.match(sql, /e\\.admission_fee_paid is true/);
  assert.match(sql, /p\\.role::text='student' and p\\.is_active is true/);
  assert.match(sql, /unique index offline_roster_course_student_active_uidx/i);
  assert.match(sql, /unique index offline_roster_batch_roll_active_uidx/i);
});

test('offline roster approval is assigned-staff/admin-only and immutable except revocation', async () => {
  const sql = await read('supabase/migrations/20261123163858_offline_recording_entitlements.sql');
  assert.match(sql, /private\\.can_manage_offline_batch/);
  assert.match(sql, /public\\.course_assignments/);
  assert.match(sql, /new\\.approved_by is distinct from auth\\.uid\\(\\)/);
  assert.match(sql, /Approved roster history is immutable; revoke and create a new entry/);
  assert.match(sql, /offline_roster\\.approved/);
  assert.match(sql, /offline_roster\\.revoked/);
  assert.match(sql, /insert into public\\.audit_logs/);
  assert.match(sql, /grant execute on function private\\.has_active_offline_recording_entitlement/);
});

test('offline recordings are private, batch-specific, published after class end and time-bounded', async () => {
  const sql = await read('supabase/migrations/20261123163858_offline_recording_entitlements.sql');
  assert.match(sql, /offline_batch_id uuid/);
  assert.match(sql, /live_classes_offline_batch_course_fkey/);
  assert.match(sql, /create table public\\.offline_class_recordings/i);
  assert.match(sql, /v_class\\.ends_at>now\\(\\)/);
  assert.match(sql, /v_class\\.status='cancelled'/);
  assert.match(sql, /Uploaded recording object must exist before it can be published/);
  assert.match(sql, /values \\('offline-class-recordings','offline-class-recordings',false,104857600/);
  assert.match(sql, /students read entitled offline recordings/);
  assert.match(sql, /students and staff read offline class recordings/);
  assert.doesNotMatch(sql, /offline-class-recordings[^\\n]*public=true/i);
});

test('offline operations UI and actions enforce student-code lookup and server-side signed access', async () => {
  const action = await read('app/actions/offline-academy.ts');
  const page = await read('app/offline-operations/page.tsx');
  const upload = await read('components/offline-class-recording-upload.tsx');
  const access = await read('components/offline-recording-access.tsx');
  assert.match(action, /auth\\.getUser\\(\\)/);
  assert.match(action, /student_code/);
  assert.match(action, /approved_by: user\\.id/);
  assert.match(action, /status: 'revoked'/);
  assert.match(action, /createSignedUrl\\(recording\\.storage_path, 900\\)/);
  assert.match(page, /Approve roll & activate recording access/);
  assert.match(page, /physical classroom group/);
  assert.match(upload, /offline-class-recordings/);
  assert.match(upload, /No student access was granted/);
  assert.match(access, /getOfflineClassRecordingUrl/);
});

test('public offline recording copy does not promise access from offline enrolment alone', async () => {
  const home = await read('app/page.tsx');
  const help = await read('app/help/page.tsx');
  const terms = await read('app/terms/page.tsx');
  for (const content of [home, help, terms]) {
    assert.match(content, /approved|approve/i);
    assert.match(content, /roll number|classroom roll/i);
    assert.match(content, /batch/i);
  }
  assert.match(help, /does not grant recording access/);
});

test('private recording cache TTL stays shorter than signed-link expiry', async () => {
  const upload = await read('components/offline-class-recording-upload.tsx');
  const action = await read('app/actions/offline-academy.ts');
  const cacheTtl = Number(upload.match(/cacheControl:\\s*'(\\d+)'/)?.[1]);
  const signedTtl = Number(action.match(/createSignedUrl\\(recording\\.storage_path,\\s*(\\d+)\\)/)?.[1]);
  assert.equal(cacheTtl, 60);
  assert.equal(signedTtl, 900);
  assert.ok(cacheTtl < signedTtl);
});

test('recording upload recovers from thrown network errors and does not delete after an ambiguous metadata write', async () => {
  const upload = await read('components/offline-class-recording-upload.tsx');
  assert.match(upload, /try \\{/);
  assert.match(upload, /catch \\{/);
  assert.match(upload, /finally \\{[\\s\\S]*setBusy\\(false\\)/);
  assert.match(upload, /metadataInsertStarted/);
  assert.match(upload, /Refresh this page before retrying to check whether the recording was saved/);
  assert.match(upload, /remove\\(\\[path\\]\\)/);
});
