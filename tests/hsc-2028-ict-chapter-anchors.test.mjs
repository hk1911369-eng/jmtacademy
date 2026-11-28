import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile(new URL('../data/curriculum/hsc-2028-2026-27-ict-chapter-anchors.json', import.meta.url), 'utf8'));

test('HSC 2028 ICT chapter anchors preserve the six official NCTB chapter headings', () => {
  assert.equal(data.academic_session, '2026-2027');
  assert.equal(data.cohort, 'HSC 2028');
  assert.equal(data.chapters.length, 6);
  assert.deepEqual(data.chapters.map(chapter => chapter.number), [1, 2, 3, 4, 5, 6]);
  assert.ok(data.chapters.every(chapter => chapter.anchor_type === 'chapter_heading_only' && chapter.subtopics.length === 0));
  assert.match(data.source.url, /objectstorage\.ap-dcc-gazipur-1\.oraclecloud15\.com/);
});

test('HSC 2028 ICT anchors remain teacher-review candidates and cannot be published', () => {
  assert.equal(data.status, 'source_extracted_needs_teacher_review');
  assert.equal(data.release.teacher_review_required, true);
  assert.equal(data.release.publishable, false);
  assert.equal(data.release.approved_for_student_practice, false);
  assert.match(data.cohort_boundary, /Do not reuse.*HSC 2027/);
});
