export type NextLearningAction = {
  kind: 'revision' | 'assignment' | 'exam' | 'recommendation' | 'goal' | 'explore';
  title: string;
  description: string;
  href: string;
  actionLabel: string;
};

export function selectNextLearningAction(input?: {
  revisionTasks?: Array<{ title: string; scheduled_for: string; priority?: number; course_id: string }>;
  upcomingExams?: Array<{ title: string; starts_at: string }>;
  upcomingAssignments?: Array<{ title: string; due_at: string }>;
  recommendations?: Array<{ lessonId: string; lessonTitle: string; courseId: string; conceptTitle: string; masteryScore: number | null; rootCauseFor: string | null }>;
  courseNames?: ReadonlyMap<string, string>;
  now?: Date | string | number;
}): NextLearningAction;
