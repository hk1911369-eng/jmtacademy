export type LearningCalendarKind = 'class' | 'assignment' | 'quiz' | 'written_exam' | 'revision';

export type LearningCalendarEvent = {
  id: string;
  kind: LearningCalendarKind;
  title: string;
  courseId: string;
  courseTitle: string;
  startAt: string | null;
  endAt: string | null;
  dateKey: string | null;
  href: string;
  detail: string;
  conflict: boolean;
  conflictWith: string[];
};

export function getCalendarDateKey(value: string | Date): string | null;
export function shiftCalendarDate(dateKey: string, amount: number): string | null;
export function shiftCalendarMonth(monthKey: string, amount: number): string | null;
export function getCalendarWeekDays(dateKey: string): string[];
export function getCalendarMonthGrid(monthKey: string): Array<{ dateKey: string; inMonth: boolean }>;
export function buildLearningCalendarEvents(input?: {
  classes?: Array<{ id: string; title: string; course_id: string; starts_at: string; ends_at: string; status?: string }>;
  assignments?: Array<{ id: string; title: string; course_id: string; due_at: string | null; max_marks?: number | null }>;
  quizzes?: Array<{ id: string; title: string; course_id: string; starts_at: string | null; ends_at?: string | null; duration_minutes?: number | null; total_marks?: number | null }>;
  writtenExams?: Array<{ id: string; title: string; course_id: string; starts_at: string | null; ends_at?: string | null; total_marks?: number | null }>;
  revisionTasks?: Array<{ id: string; title: string; course_id: string; scheduled_for: string; priority?: number }>;
  courseNames?: ReadonlyMap<string, string>;
}): { events: LearningCalendarEvent[]; undated: LearningCalendarEvent[] };

export function filterLearningCalendarEvents(events: LearningCalendarEvent[], enabledKinds: LearningCalendarKind[], courseId?: string): LearningCalendarEvent[];
