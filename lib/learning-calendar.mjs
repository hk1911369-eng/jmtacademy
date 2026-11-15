const TIME_ZONE = 'Asia/Dhaka';

function validIso(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function getCalendarDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return values.year + '-' + values.month + '-' + values.day;
}

export function shiftCalendarDate(dateKey, amount) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return null;
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + amount));
  return date.toISOString().slice(0, 10);
}

export function shiftCalendarMonth(monthKey, amount) {
  if (!/^\d{4}-\d{2}$/.test(monthKey)) return null;
  const [year, month] = monthKey.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1 + amount, 1)).toISOString().slice(0, 7);
}

export function getCalendarWeekDays(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const start = shiftCalendarDate(dateKey, -weekday);
  return Array.from({ length: 7 }, (_, index) => shiftCalendarDate(start, index));
}

export function getCalendarMonthGrid(monthKey) {
  const firstDay = monthKey + '-01';
  const [year, month] = monthKey.split('-').map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const start = shiftCalendarDate(firstDay, -weekday);
  return Array.from({ length: 42 }, (_, index) => {
    const dateKey = shiftCalendarDate(start, index);
    return { dateKey, inMonth: dateKey.slice(0, 7) === monthKey };
  });
}

export function buildLearningCalendarEvents({
  classes = [], assignments = [], quizzes = [], writtenExams = [], revisionTasks = [], courseNames = new Map(),
} = {}) {
  const events = [];
  const undated = [];

  function addEvent({ id, kind, title, courseId, startValue, endValue, durationMinutes, href, detail, allowUndated = false }) {
    if (!id || !title) return;
    const startAt = validIso(startValue);
    if (!startValue && allowUndated) {
      undated.push({
        id: kind + ':' + id, kind, title, courseId: courseId ?? '', courseTitle: courseNames.get(courseId) ?? 'Course',
        startAt: null, endAt: null, dateKey: null, href, detail: detail || 'No date set', conflict: false, conflictWith: [],
      });
      return;
    }
    if (!startAt) return;
    let endAt = validIso(endValue);
    if (!endAt && Number.isFinite(Number(durationMinutes)) && Number(durationMinutes) > 0) {
      endAt = new Date(new Date(startAt).getTime() + Number(durationMinutes) * 60000).toISOString();
    }
    events.push({
      id: kind + ':' + id, kind, title, courseId: courseId ?? '', courseTitle: courseNames.get(courseId) ?? 'Course',
      startAt, endAt, dateKey: getCalendarDateKey(startAt), href, detail: detail || '', conflict: false, conflictWith: [],
    });
  }

  for (const item of classes) {
    if (item.status === 'cancelled') continue;
    addEvent({
      id: item.id, kind: 'class', title: item.title, courseId: item.course_id,
      startValue: item.starts_at, endValue: item.ends_at, href: '/academic', detail: 'Class session',
    });
  }
  for (const item of assignments) {
    addEvent({
      id: item.id, kind: 'assignment', title: item.title, courseId: item.course_id,
      startValue: item.due_at, href: '/academic#assignments',
      detail: item.max_marks == null ? 'Assignment deadline' : 'Assignment deadline · ' + item.max_marks + ' marks',
      allowUndated: true,
    });
  }
  for (const item of quizzes) {
    addEvent({
      id: item.id, kind: 'quiz', title: item.title, courseId: item.course_id,
      startValue: item.starts_at, endValue: item.ends_at, durationMinutes: item.duration_minutes,
      href: '/academic#exams', detail: item.total_marks == null ? 'Quiz' : 'Quiz · ' + item.total_marks + ' marks',
      allowUndated: true,
    });
  }
  for (const item of writtenExams) {
    addEvent({
      id: item.id, kind: 'written_exam', title: item.title, courseId: item.course_id,
      startValue: item.starts_at, endValue: item.ends_at, href: '/academic#exams',
      detail: item.total_marks == null ? 'Written exam' : 'Written exam · ' + item.total_marks + ' marks',
      allowUndated: true,
    });
  }
  for (const item of revisionTasks) {
    addEvent({
      id: item.id, kind: 'revision', title: item.title, courseId: item.course_id,
      startValue: item.scheduled_for, href: '/student#learning-os',
      detail: 'Revision · Priority ' + (item.priority ?? 3) + '/5',
    });
  }

  const timed = events.filter(event => event.startAt && event.endAt && ['class', 'quiz', 'written_exam'].includes(event.kind));
  for (let left = 0; left < timed.length; left += 1) {
    for (let right = left + 1; right < timed.length; right += 1) {
      const a = timed[left];
      const b = timed[right];
      if (new Date(a.startAt) < new Date(b.endAt) && new Date(b.startAt) < new Date(a.endAt)) {
        a.conflict = true;
        b.conflict = true;
        a.conflictWith.push(b.title);
        b.conflictWith.push(a.title);
      }
    }
  }

  events.sort((a, b) => a.startAt.localeCompare(b.startAt) || a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
  undated.sort((a, b) => a.title.localeCompare(b.title));
  return { events, undated };
}
