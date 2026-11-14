import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolveAcademyTagline } from '../lib/academy-tagline.mjs';

test('public homepage presents the academy as multi-subject rather than fixed chemistry cohorts', async () => {
  const page = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
  assert.ok(page.includes('School & secondary'));
  assert.ok(page.includes('Higher secondary'));
  assert.ok(page.includes('Admission, university & skills'));
  assert.equal(/HSC 2027|HSC 2028|Admission Batch/.test(page), false);
  assert.ok(page.includes('(c.subjects??[]).join'));
});

test('legacy Chemistry-only academy tagline resolves to the multi-subject product identity', () => {
  assert.equal(
    resolveAcademyTagline('JMT CHEMISTRY · LEARNING · PROGRESS'),
    'MULTI-SUBJECT LEARNING',
  );
  assert.equal(resolveAcademyTagline(null), 'MULTI-SUBJECT LEARNING');
  assert.equal(resolveAcademyTagline('LEARN · PRACTISE · ACHIEVE'), 'LEARN · PRACTISE · ACHIEVE');
});

test('public copy does not promise unverified free recorded access to every offline student', async () => {
  const home = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
  const student = await readFile(new URL('../app/student/page.tsx', import.meta.url), 'utf8');
  assert.ok(home.includes('Learn in person at JMT Academy with attendance and teacher support.'));
  assert.equal(home.includes('Active offline students also receive recorded lessons free'), false);
  assert.equal(student.includes('Offline students receive the recorded library as part of their paid offline course.'), false);
});
