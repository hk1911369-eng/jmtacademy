import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLearningCalendarEvents, getCalendarDateKey, getCalendarMonthGrid,
  getCalendarWeekDays, shiftCalendarDate, shiftCalendarMonth,
} from '../lib/learning-calendar.mjs';

test('normalizes all academic event types and preserves undated work', () => {
  const result = buildLearningCalendarEvents({
    courseNames: new Map([['c1', 'Physics']]),
    classes: [{ id: 'cl1', title: 'Physics class', course_id: 'c1', starts_at: '2026-11-16T03:00:00Z', ends_at: '2026-11-16T04:00:00Z', status: 'scheduled' }],
    assignments: [
      { id: 'a1', title: 'Lab report', course_id: 'c1', due_at: '2026-11-17T17:00:00Z', max_marks: 10 },
      { id: 'a2', title: 'Unscheduled worksheet', course_id: 'c1', due_at: null },
    ],
    quizzes: [{ id: 'q1', title: 'Vectors quiz', course_id: 'c1', starts_at: '2026-11-18T04:00:00Z', duration_minutes: 30 }],
    writtenExams: [{ id: 'w1', title: 'Model test', course_id: 'c1', starts_at: null }],
    revisionTasks: [{ id: 'r1', title: 'Revise vectors', course_id: 'c1', scheduled_for: '2026-11-16T05:00:00Z', priority: 4 }],
  });
  assert.equal(result.events.length, 4);
  assert.equal(result.undated.length, 2);
  assert.equal(result.events[0].courseTitle, 'Physics');
  assert.equal(result.events.find(item => item.id === 'quiz:q1').endAt, '2026-11-18T04:30:00.000Z');
  assert.equal(result.undated.some(item => item.title === 'Unscheduled worksheet'), true);
  assert.equal(result.undated.some(item => item.title === 'Model test'), true);
});

test('uses Bangladesh local dates rather than UTC or the browser timezone', () => {
  assert.equal(getCalendarDateKey('2026-11-15T18:30:00.000Z'), '2026-11-16');
});

test('flags only proven timed overlaps and not adjacent or deadline-only items', () => {
  const { events } = buildLearningCalendarEvents({
    classes: [
      { id: 'c1', title: 'Class A', course_id: 'x', starts_at: '2026-11-16T03:00:00Z', ends_at: '2026-11-16T04:00:00Z' },
      { id: 'c2', title: 'Class B', course_id: 'x', starts_at: '2026-11-16T04:00:00Z', ends_at: '2026-11-16T05:00:00Z' },
      { id: 'c3', title: 'Class C', course_id: 'x', starts_at: '2026-11-16T03:30:00Z', ends_at: '2026-11-16T04:30:00Z' },
    ],
    writtenExams: [{ id: 'e1', title: 'Exam', course_id: 'x', starts_at: '2026-11-16T03:45:00Z', ends_at: '2026-11-16T04:15:00Z' }],
    assignments: [{ id: 'a1', title: 'Deadline', course_id: 'x', due_at: '2026-11-16T03:30:00Z' }],
  });
  assert.equal(events.find(item => item.id === 'class:c1').conflict, true);
  assert.equal(events.find(item => item.id === 'class:c2').conflict, true);
  assert.equal(events.find(item => item.id === 'class:c3').conflict, true);
  assert.equal(events.find(item => item.id === 'written_exam:e1').conflict, true);
  assert.equal(events.find(item => item.id === 'assignment:a1').conflict, false);
});

test('excludes invalid dates and cancelled classes safely', () => {
  const result = buildLearningCalendarEvents({
    classes: [
      { id: 'cancelled', title: 'Cancelled class', course_id: 'x', starts_at: '2026-11-16T03:00:00Z', ends_at: '2026-11-16T04:00:00Z', status: 'cancelled' },
      { id: 'bad', title: 'Broken class', course_id: 'x', starts_at: 'not-a-date', ends_at: '2026-11-16T04:00:00Z' },
    ],
    assignments: [{ id: 'bad-assignment', title: 'Broken due date', course_id: 'x', due_at: 'not-a-date' }],
  });
  assert.equal(result.events.length, 0);
  assert.equal(result.undated.length, 0);
});

test('calculates Sunday-first week and 42-day month grids across boundaries', () => {
  assert.deepEqual(getCalendarWeekDays('2026-11-16'), [
    '2026-11-15','2026-11-16','2026-11-17','2026-11-18','2026-11-19','2026-11-20','2026-11-21',
  ]);
  assert.equal(getCalendarMonthGrid('2026-11').length, 42);
  assert.equal(getCalendarMonthGrid('2026-11')[0].dateKey, '2026-11-01');
  assert.equal(shiftCalendarDate('2026-12-31', 1), '2027-01-01');
  assert.equal(shiftCalendarMonth('2026-12', 1), '2027-01');
});
