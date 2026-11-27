export type LearningDashboardSectionState = 'unavailable' | 'ready' | 'empty';

export function getLearningDashboardAvailability(sourceIssues?: string[]): {
  hasIssues: boolean;
  hasIssue: (source: string) => boolean;
  nextActionUnavailable: boolean;
};

export function getLearningDashboardSectionState(
  sourceIssues: string[] | undefined,
  source: string,
  itemCount?: number,
): LearningDashboardSectionState;
