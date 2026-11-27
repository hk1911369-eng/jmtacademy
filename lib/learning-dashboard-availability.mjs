const CRITICAL_NEXT_ACTION_SOURCES = ['revision', 'upcomingExams', 'upcomingAssignments', 'recommendations'];

export function getLearningDashboardAvailability(sourceIssues = []) {
  const issues = new Set(Array.isArray(sourceIssues) ? sourceIssues : []);
  return {
    hasIssues: issues.size > 0,
    hasIssue: (source) => issues.has(source),
    nextActionUnavailable: CRITICAL_NEXT_ACTION_SOURCES.some((source) => issues.has(source)),
  };
}

export function getLearningDashboardSectionState(sourceIssues = [], source, itemCount = 0) {
  const availability = getLearningDashboardAvailability(sourceIssues);
  if (availability.hasIssue(source)) return 'unavailable';
  return itemCount > 0 ? 'ready' : 'empty';
}
