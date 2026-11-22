const DAY_MS = 24 * 60 * 60 * 1000;
const ACTION_WINDOW_MS = 7 * DAY_MS;

function validTime(value, nowMs, includePast = false) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return null;
  if (timestamp > nowMs + ACTION_WINDOW_MS) return null;
  if (!includePast && timestamp < nowMs) return null;
  return timestamp;
}

function formatDhakaDate(timestamp) {
  return new Intl.DateTimeFormat('en-BD', {
    timeZone: 'Asia/Dhaka',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}

function courseHref(courseId) {
  return '/learn/' + encodeURIComponent(courseId);
}

/**
 * Pick one explainable action from existing, authorised dashboard data.
 * This is a deterministic rules-based helper, not an AI prediction.
 */
export function selectNextLearningAction({
  revisionTasks = [],
  upcomingExams = [],
  upcomingAssignments = [],
  recommendations = [],
  courseNames = new Map(),
  now = new Date(),
} = {}) {
  const nowMs = new Date(now).getTime();
  const safeNow = Number.isFinite(nowMs) ? nowMs : Date.now();
  const candidates = [];

  for (const task of revisionTasks) {
    const timestamp = validTime(task?.scheduled_for, safeNow, true);
    if (timestamp === null || !task?.course_id || !task?.title || !courseNames?.has?.(task.course_id)) continue;
    candidates.push({
      kind: 'revision',
      timestamp,
      priority: Number.isFinite(Number(task.priority)) ? Number(task.priority) : 0,
      title: task.title,
      courseId: task.course_id,
    });
  }

  for (const assignment of upcomingAssignments) {
    const timestamp = validTime(assignment?.due_at, safeNow);
    if (timestamp === null || !assignment?.title) continue;
    candidates.push({ kind: 'assignment', timestamp, priority: 0, title: assignment.title });
  }

  for (const exam of upcomingExams) {
    const timestamp = validTime(exam?.starts_at, safeNow);
    if (timestamp === null || !exam?.title) continue;
    candidates.push({ kind: 'exam', timestamp, priority: 0, title: exam.title });
  }

  const kindOrder = { revision: 0, assignment: 1, exam: 2 };
  candidates.sort((a, b) => {
    const aOverdue = a.timestamp < safeNow;
    const bOverdue = b.timestamp < safeNow;
    if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
    if (aOverdue && bOverdue && a.timestamp !== b.timestamp) return b.timestamp - a.timestamp;
    if (a.timestamp !== b.timestamp) return a.timestamp - b.timestamp;
    if (a.kind !== b.kind) return kindOrder[a.kind] - kindOrder[b.kind];
    return b.priority - a.priority;
  });

  const selected = candidates[0];
  if (selected?.kind === 'revision') {
    const when = selected.timestamp < safeNow ? 'This review is overdue' : 'This review is scheduled';
    return {
      kind: 'revision',
      title: 'Review ' + selected.title,
      description: when + ' for ' + formatDhakaDate(selected.timestamp) + '. Open the course to work through it.',
      href: courseHref(selected.courseId),
      actionLabel: 'Open course',
    };
  }
  if (selected?.kind === 'assignment') {
    return {
      kind: 'assignment',
      title: 'Prepare: ' + selected.title,
      description: 'Due ' + formatDhakaDate(selected.timestamp) + '. Starting now gives you time to complete and check your work.',
      href: '/academic',
      actionLabel: 'Open academic hub',
    };
  }
  if (selected?.kind === 'exam') {
    return {
      kind: 'exam',
      title: 'Prepare for ' + selected.title,
      description: 'Scheduled for ' + formatDhakaDate(selected.timestamp) + '. Use a focused session to review the relevant course material.',
      href: '/academic',
      actionLabel: 'Open academic hub',
    };
  }

  const recommendation = [...recommendations]
    .filter(item => item?.lessonId && item?.courseId && item?.lessonTitle)
    .sort((a, b) => {
      const scoreA = Number(a.masteryScore);
      const scoreB = Number(b.masteryScore);
      const knownA = a.masteryScore !== null && a.masteryScore !== undefined
        && !(typeof a.masteryScore === 'string' && !a.masteryScore.trim())
        && Number.isFinite(scoreA) && scoreA >= 0 && scoreA <= 1;
      const knownB = b.masteryScore !== null && b.masteryScore !== undefined
        && !(typeof b.masteryScore === 'string' && !b.masteryScore.trim())
        && Number.isFinite(scoreB) && scoreB >= 0 && scoreB <= 1;
      if (knownA !== knownB) return knownA ? -1 : 1;
      return knownA ? scoreA - scoreB : 0;
    })[0];
  if (recommendation) {
    const score = Number(recommendation.masteryScore);
    const hasValidScore = recommendation.masteryScore !== null && recommendation.masteryScore !== undefined
      && !(typeof recommendation.masteryScore === 'string' && !recommendation.masteryScore.trim())
      && Number.isFinite(score) && score >= 0 && score <= 1;
    const concept = recommendation.conceptTitle || 'this concept';
    const reason = recommendation.rootCauseFor
      ? 'Strengthen ' + concept + ' as a prerequisite for ' + recommendation.rootCauseFor + '.'
      : hasValidScore
        ? 'Your current evidence shows ' + Math.round(score * 100) + '% mastery for ' + concept + '.'
        : 'There is not enough mastery evidence yet for ' + concept + '. Use this lesson as a first focused review.';
    return {
      kind: 'recommendation',
      title: 'Study ' + recommendation.lessonTitle,
      description: reason,
      href: courseHref(recommendation.courseId) + '#lesson-' + encodeURIComponent(recommendation.lessonId),
      actionLabel: 'Study this lesson',
    };
  }

  const firstCourse = courseNames instanceof Map ? courseNames.entries().next().value : null;
  if (firstCourse) {
    return {
      kind: 'goal',
      title: 'Plan your next study week',
      description: 'There is no urgent item or evidence-backed review to prioritise yet. Set a manageable goal to shape your next study sessions.',
      href: '#learning-os-goal-form',
      actionLabel: 'Set a study goal',
    };
  }

  return {
    kind: 'explore',
    title: 'Choose where to begin',
    description: 'Explore available courses to start your learning journey. Your dashboard will become more personal as you build learning history.',
    href: '/courses',
    actionLabel: 'Explore courses',
  };
}
