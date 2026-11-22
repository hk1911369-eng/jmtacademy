import test from 'node:test';
import assert from 'node:assert/strict';
import { selectNextLearningAction } from '../lib/learning-next-action.mjs';

const now = new Date('2026-11-15T06:00:00.000Z');

test('prioritises the most recently overdue revision over future deadlines', () => {
  const action = selectNextLearningAction({
    now,
    courseNames: new Map([['course-1', 'Physics']]),
    revisionTasks: [
      { id: 'old', title: 'Old review', scheduled_for: '2026-10-01T00:00:00.000Z', course_id: 'course-1', priority: 5 },
      { id: 'recent', title: 'Recent review', scheduled_for: '2026-11-14T00:00:00.000Z', course_id: 'course-1', priority: 2 },
    ],
    upcomingAssignments: [{ title: 'Assignment', due_at: '2026-11-16T00:00:00.000Z' }],
  });
  assert.equal(action.kind, 'revision');
  assert.equal(action.title, 'Review Recent review');
  assert.equal(action.href, '/learn/course-1');
  assert.match(action.description, /overdue/);
});

test('does not surface a revision task for a course the student is no longer enrolled in', () => {
  const action = selectNextLearningAction({
    now,
    revisionTasks: [{ title: 'Old course review', scheduled_for: '2026-11-14T00:00:00.000Z', course_id: 'inactive-course', priority: 5 }],
  });
  assert.equal(action.kind, 'explore');
});

test('chooses the nearest upcoming assignment or exam within seven days', () => {
  const action = selectNextLearningAction({
    now,
    upcomingAssignments: [{ title: 'Lab report', due_at: '2026-11-16T12:00:00.000Z' }],
    upcomingExams: [{ title: 'Physics test', starts_at: '2026-11-17T12:00:00.000Z' }],
  });
  assert.equal(action.kind, 'assignment');
  assert.equal(action.title, 'Prepare: Lab report');
  assert.equal(action.href, '/academic');
});

test('chooses the nearest exam when it precedes the assignment', () => {
  const action = selectNextLearningAction({
    now,
    upcomingAssignments: [{ title: 'Lab report', due_at: '2026-11-18T12:00:00.000Z' }],
    upcomingExams: [{ title: 'Physics test', starts_at: '2026-11-16T12:00:00.000Z' }],
  });
  assert.equal(action.kind, 'exam');
  assert.equal(action.title, 'Prepare for Physics test');
});

test('uses an evidence-backed lesson recommendation when no timed task is near', () => {
  const action = selectNextLearningAction({
    now,
    recommendations: [
      { lessonId: 'lesson-2', lessonTitle: 'Vectors', courseId: 'course-1', conceptTitle: 'Vectors', masteryScore: 0.4, rootCauseFor: null },
      { lessonId: 'lesson-1', lessonTitle: 'Algebra', courseId: 'course-1', conceptTitle: 'Algebra', masteryScore: 0.6, rootCauseFor: null },
    ],
  });
  assert.equal(action.kind, 'recommendation');
  assert.equal(action.title, 'Study Vectors');
  assert.equal(action.href, '/learn/course-1#lesson-lesson-2');
  assert.match(action.description, /40% mastery/);
});

test('explains prerequisite recommendations without inventing mastery scores', () => {
  const action = selectNextLearningAction({
    now,
    recommendations: [
      { lessonId: 'lesson-1', lessonTitle: 'Fractions', courseId: 'course-1', conceptTitle: 'Fractions', masteryScore: null, rootCauseFor: 'Algebra' },
    ],
  });
  assert.match(action.description, /prerequisite for Algebra/);
  assert.equal(action.description.includes('% mastery'), false);
});

test('new students with no course or learning history receive a useful start path', () => {
  const action = selectNextLearningAction({ now });
  assert.equal(action.kind, 'explore');
  assert.equal(action.href, '/courses');
  assert.match(action.description, /learning journey/);
});

test('enrolled students with no due work or evidence get a study-goal path', () => {
  const action = selectNextLearningAction({ now, courseNames: new Map([['course-1', 'Physics']]) });
  assert.equal(action.kind, 'goal');
  assert.equal(action.href, '#learning-os-goal-form');
});

test('invalid and distant dates do not create a false urgent action', () => {
  const action = selectNextLearningAction({
    now,
    upcomingAssignments: [
      { title: 'Bad date', due_at: 'not-a-date' },
      { title: 'Far future', due_at: '2027-01-01T00:00:00.000Z' },
    ],
  });
  assert.equal(action.kind, 'explore');
});

test('dashboard renders the primary action before summary metrics and provides a goal anchor', async () => {
  const { readFile } = await import('node:fs/promises');
  const component = await readFile(new URL('../components/learning-os-dashboard.tsx', import.meta.url), 'utf8');
  assert.ok(component.includes('learning-os-next-action'));
  assert.ok(component.indexOf('learning-os-next-action') < component.indexOf('learning-os-stats'));
  assert.ok(component.includes('aria-labelledby="learning-os-next-action-title"'));
  assert.ok(component.includes('selectNextLearningAction'));
  assert.ok(component.includes('id="learning-os-goal-form"'));
});

test('does not display NaN or unsupported percentages when mastery evidence is missing or invalid', () => {
  for (const masteryScore of [undefined, null, 'not-a-number', 1.5, -0.2]) {
    const action = selectNextLearningAction({
      now,
      recommendations: [{
        lessonId: 'lesson-unknown',
        lessonTitle: 'Foundations',
        courseId: 'course-1',
        conceptTitle: 'Foundations',
        masteryScore,
        rootCauseFor: null,
      }],
    });
    assert.equal(action.kind, 'recommendation');
    assert.match(action.description, /not enough mastery evidence/);
    assert.equal(action.description.includes('NaN'), false);
    assert.equal(/\\d+% mastery/.test(action.description), false);
  }
});

test('ranks recommendations with measured mastery before recommendations without valid evidence', () => {
  const action = selectNextLearningAction({
    now,
    recommendations: [
      { lessonId: 'unknown', lessonTitle: 'Unknown', courseId: 'course-1', conceptTitle: 'Unknown', masteryScore: undefined },
      { lessonId: 'known', lessonTitle: 'Measured weakness', courseId: 'course-1', conceptTitle: 'Measured weakness', masteryScore: 0.25 },
    ],
  });
  assert.equal(action.title, 'Study Measured weakness');
  assert.match(action.description, /25% mastery/);
});
