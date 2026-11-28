import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');

test('practice questions require source provenance and verified rights before publication', async () => {
  const migration = await read('supabase/migrations/20261114100000_practice_content_provenance_and_review.sql');
  assert.match(migration, /source_kind text NOT NULL/);
  assert.match(migration, /source_reference text NOT NULL/);
  assert.match(migration, /rights_status text NOT NULL/);
  assert.match(migration, /review_status text NOT NULL/);
  assert.match(migration, /NEW\.is_published IS TRUE AND NEW\.review_status IS DISTINCT FROM 'approved'/);
  assert.match(migration, /permission_verified/);
  assert.match(migration, /open_license_verified/);
  assert.match(migration, /public_domain_verified/);
  assert.match(migration, /A source reference is required for non-original practice content/);
  assert.match(migration, /Approval requires a review note documenting answer and rights checks/);
  assert.match(migration, /Rejection requires a reason for the author/);
});

test('only an independent administrator can approve and publish practice content', async () => {
  const migration = await read('supabase/migrations/20261114100000_practice_content_provenance_and_review.sql');
  assert.match(migration, /public\.current_role\(\) IS DISTINCT FROM 'admin'/);
  assert.match(migration, /NEW\.reviewed_by = NEW\.created_by/);
  assert.match(migration, /Authors cannot review their own practice questions/);
  assert.match(migration, /REVOKE ALL ON FUNCTION public\.review_student_practice_question/);
  assert.match(migration, /GRANT EXECUTE ON FUNCTION public\.review_student_practice_question/);
});

test('editing an approved question returns it to unpublished review state', async () => {
  const migration = await read('supabase/migrations/20261114100000_practice_content_provenance_and_review.sql');
  assert.match(migration, /NEW\.question_text IS DISTINCT FROM OLD\.question_text/);
  assert.match(migration, /NEW\.options IS DISTINCT FROM OLD\.options/);
  assert.match(migration, /NEW\.review_status := 'pending_review'/);
  assert.match(migration, /NEW\.is_published := false/);
});

test('teacher authoring captures provenance and never publishes directly', async () => {
  const [action, page, migration] = await Promise.all([
    read('app/actions/student-practice-authoring.ts'),
    read('app/teacher/practice/page.tsx'),
    read('supabase/migrations/20261114100000_practice_content_provenance_and_review.sql'),
  ]);
  assert.match(action, /source_kind: sourceKind/);
  assert.match(action, /source_reference: sourceReference/);
  assert.match(migration, /rights_status text NOT NULL DEFAULT 'pending_review'/);
  assert.match(migration, /review_status text NOT NULL DEFAULT 'pending_review'/);
  assert.match(action, /is_published: false/);
  assert.match(page, /name="source_kind"/);
  assert.match(page, /name="source_reference"/);
  assert.match(page, /name="source_year"/);
  assert.match(page, /Submit for independent review/);
  assert.doesNotMatch(page, /name="is_published"/);
});

test('admin review page exposes source and rights evidence and uses the guarded review action', async () => {
  const [page, action, nav, teacherPage] = await Promise.all([
    read('app/admin/practice-review/page.tsx'),
    read('app/actions/student-practice-authoring.ts'),
    read('components/portal-layout.tsx'),
    read('app/teacher/practice/page.tsx'),
  ]);
  assert.match(page, /role !== 'admin'/);
  assert.match(page, /source_reference/);
  assert.match(page, /rights_status/);
  assert.match(page, /reviewStudentPracticeQuestion/);
  assert.match(page, /name="decision" value="approve"/);
  assert.match(page, /name="decision" value="reject"/);
  assert.match(page, /Reject and keep unpublished/);
  assert.match(teacherPage, /Reviewer feedback/);
  assert.match(teacherPage, /submit the revised question as a new version/);
  assert.match(page, /Choose only after checking the evidence/);
  assert.match(page, /required placeholder="Explain the answer check/);
  assert.match(action, /db\.rpc\('review_student_practice_question'/);
  assert.match(nav, /href: '\/admin\/practice-review'/);
});
