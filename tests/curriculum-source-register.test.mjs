import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const sourcePath = new URL('../data/curriculum/hsc-2028-2026-27-nctb-core-subjects.json', import.meta.url);

test('NCTB curriculum source dataset is valid and versioned for the HSC 2028 cohort', async () => {
  const raw = await readFile(sourcePath, 'utf8');
  const dataset = JSON.parse(raw);
  assert.equal(dataset.schema_version, '1.0.0');
  assert.equal(dataset.dataset_id, 'jmt-curriculum-hsc-2028-2026-27-core-nctb');
  assert.equal(dataset.cohort.academic_session, '2026-27');
  assert.equal(dataset.cohort.label, 'HSC 2028');
  assert.equal(dataset.records.length, 3);
  assert.ok(dataset.records.every(record => record.status === 'source_extracted_needs_teacher_review'));
});

test('every curriculum record has official NCTB provenance and a stable source identifier', async () => {
  const dataset = JSON.parse(await readFile(sourcePath, 'utf8'));
  const ids = dataset.records.map(record => record.source_id);
  assert.equal(new Set(ids).size, ids.length);
  for (const record of dataset.records) {
    assert.match(record.source_id, /^NCTB-2026-27-/);
    assert.match(record.document.official_url, /^https:\/\/objectstorage\.ap-dcc-gazipur-1\.oraclecloud15\.com\//);
    assert.equal(record.document.file_type, 'PDF');
    assert.ok(record.verification_notes.length > 0);
  }
});

test('ICT source contains the six prescribed chapters, including HTML, programming and database topics', async () => {
  const dataset = JSON.parse(await readFile(sourcePath, 'utf8'));
  const ict = dataset.records.find(record => record.source_id === 'NCTB-2026-27-ICT-001');
  assert.ok(ict);
  assert.equal(ict.units.length, 6);
  assert.match(ict.units[3].title_en, /HTML/);
  assert.match(ict.units[4].title_en, /Programming/);
  assert.match(ict.units[5].title_en, /Database/);
});

test('Bangla First Paper source retains all extracted literature and supplementary-reader metadata', async () => {
  const dataset = JSON.parse(await readFile(sourcePath, 'utf8'));
  const bangla = dataset.records.find(record => record.source_id === 'NCTB-2026-27-BAN1-001');
  assert.ok(bangla);
  assert.equal(bangla.sections.prose.length, 12);
  assert.equal(bangla.sections.poems.length, 12);
  assert.equal(bangla.sections.supplementary_reader.novel.title_bn, 'লালসালু');
  assert.equal(bangla.sections.supplementary_reader.drama.title_bn, 'সিরাজ-উদ-দৌলা');
});

test('English First Paper source preserves subject code 107 and all 8 units / 29 lessons', async () => {
  const dataset = JSON.parse(await readFile(sourcePath, 'utf8'));
  const english = dataset.records.find(record => record.source_id === 'NCTB-2026-27-ENG1-001');
  assert.ok(english);
  assert.equal(english.subject.subject_code, '107');
  assert.equal(english.units.length, 8);
  assert.equal(english.units.reduce((total, unit) => total + unit.lessons.length, 0), 29);
});

test('dataset warns against mixing HSC 2027 and HSC 2028 or treating extracted content as approved', async () => {
  const dataset = JSON.parse(await readFile(sourcePath, 'utf8'));
  assert.ok(dataset.global_notes.some(note => /not the HSC 2027 cohort/i.test(note)));
  assert.ok(dataset.global_notes.some(note => /teacher-approved/i.test(note)));
});
