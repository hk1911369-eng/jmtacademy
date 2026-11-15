'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  getCalendarMonthGrid, getCalendarWeekDays, shiftCalendarDate, shiftCalendarMonth,
} from '@/lib/learning-calendar.mjs';
import type { LearningCalendarEvent, LearningCalendarKind } from '@/lib/learning-calendar.mjs';

type View = 'agenda' | 'week' | 'month';
type Props = {
  events: LearningCalendarEvent[];
  undated: LearningCalendarEvent[];
  initialDateKey: string;
  sourceErrorCount?: number;
};

const kindLabels: Record<LearningCalendarKind, string> = {
  class: 'Class',
  assignment: 'Assignment due',
  quiz: 'Quiz',
  written_exam: 'Written exam',
  revision: 'Revision',
};

const kindFilters: Array<{ kind: LearningCalendarKind; label: string }> = [
  { kind: 'class', label: 'Classes' },
  { kind: 'assignment', label: 'Assignments' },
  { kind: 'quiz', label: 'Quizzes' },
  { kind: 'written_exam', label: 'Written exams' },
  { kind: 'revision', label: 'Revision' },
];

const bangladeshDate = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dhaka', day: 'numeric', month: 'short', year: 'numeric',
});
const bangladeshTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dhaka', hour: 'numeric', minute: '2-digit',
});
const bangladeshMonth = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dhaka', month: 'long', year: 'numeric',
});

function dateLabel(dateKey: string) {
  return bangladeshDate.format(new Date(dateKey + 'T12:00:00+06:00'));
}

function monthLabel(monthKey: string) {
  return bangladeshMonth.format(new Date(monthKey + '-15T12:00:00+06:00'));
}

function eventTime(event: LearningCalendarEvent) {
  if (!event.startAt) return 'Time not set';
  const start = bangladeshTime.format(new Date(event.startAt));
  if (event.kind === 'assignment') return 'Due ' + start + ' Bangladesh time';
  if (event.kind === 'revision') return start + ' Bangladesh time';
  if (event.endAt) return start + '–' + bangladeshTime.format(new Date(event.endAt)) + ' Bangladesh time';
  return start + ' Bangladesh time';
}

function eventList(events: LearningCalendarEvent[]) {
  return events.map(event => (
    <article className={'learning-calendar-event learning-calendar-event-' + event.kind} key={event.id}>
      <div className="learning-calendar-event-copy">
        <span className="learning-calendar-kind">{kindLabels[event.kind]}</span>
        <h4><Link href={event.href}>{event.title}</Link></h4>
        <p>{event.courseTitle} · {eventTime(event)}</p>
        {event.detail && <small>{event.detail}</small>}
        {event.conflict && <p className="learning-calendar-conflict" role="status">Schedule overlap with: {event.conflictWith.join(', ')}</p>}
      </div>
    </article>
  ));
}

export function LearningOSCalendar({ events, undated, initialDateKey, sourceErrorCount = 0 }: Props) {
  const [view, setView] = useState<View>('agenda');
  const [selectedDateKey, setSelectedDateKey] = useState(initialDateKey);
  const [monthKey, setMonthKey] = useState(initialDateKey.slice(0, 7));
  const [enabledKinds, setEnabledKinds] = useState<LearningCalendarKind[]>(kindFilters.map(item => item.kind));
  const [courseFilter, setCourseFilter] = useState('all');

  const courseOptions = useMemo(() => {
    const unique = new Map<string, string>();
    for (const event of [...events, ...undated]) {
      if (event.courseId) unique.set(event.courseId, event.courseTitle);
    }
    return [...unique.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [events, undated]);

  const filteredEvents = useMemo(() => events.filter(event =>
    enabledKinds.includes(event.kind) && (courseFilter === 'all' || event.courseId === courseFilter),
  ), [events, enabledKinds, courseFilter]);
  const filteredUndated = useMemo(() => undated.filter(event =>
    enabledKinds.includes(event.kind) && (courseFilter === 'all' || event.courseId === courseFilter),
  ), [undated, enabledKinds, courseFilter]);

  const rangeDays = useMemo(() => {
    if (view === 'week') return getCalendarWeekDays(selectedDateKey);
    if (view === 'month') return getCalendarMonthGrid(monthKey).map(item => item.dateKey);
    return Array.from({ length: 14 }, (_, index) => shiftCalendarDate(selectedDateKey, index) ?? selectedDateKey);
  }, [view, selectedDateKey, monthKey]);

  const rangeSet = useMemo(() => new Set(rangeDays), [rangeDays]);
  const rangeEvents = filteredEvents.filter(event => event.dateKey && rangeSet.has(event.dateKey));
  const groupedEvents = useMemo(() => {
    const groups = new Map<string, LearningCalendarEvent[]>();
    for (const event of rangeEvents) {
      const items = groups.get(event.dateKey!) ?? [];
      items.push(event);
      groups.set(event.dateKey!, items);
    }
    return [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [rangeEvents]);

  const selectedDayEvents = filteredEvents.filter(event => event.dateKey === selectedDateKey);
  const selectedDayUndated = filteredUndated;
  const heading = view === 'month'
    ? monthLabel(monthKey)
    : view === 'week'
      ? dateLabel(rangeDays[0]) + ' – ' + dateLabel(rangeDays[6])
      : dateLabel(selectedDateKey) + ' – ' + dateLabel(rangeDays[13]);

  function navigate(amount: number) {
    if (view === 'month') {
      const next = shiftCalendarMonth(monthKey, amount);
      if (next) {
        setMonthKey(next);
        setSelectedDateKey(next + '-01');
      }
    } else {
      const next = shiftCalendarDate(selectedDateKey, amount * (view === 'week' ? 7 : 7));
      if (next) {
        setSelectedDateKey(next);
        setMonthKey(next.slice(0, 7));
      }
    }
  }

  function goToday() {
    setSelectedDateKey(initialDateKey);
    setMonthKey(initialDateKey.slice(0, 7));
  }

  function toggleKind(kind: LearningCalendarKind) {
    setEnabledKinds(current => current.includes(kind)
      ? current.filter(item => item !== kind)
      : [...current, kind]);
  }

  const monthDays = view === 'month' ? getCalendarMonthGrid(monthKey) : [];

  return (
    <section id="learning-calendar" className="learning-calendar" aria-labelledby="learning-calendar-title">
      <div className="learning-calendar-heading">
        <div>
          <span className="auth-kicker">YOUR ACADEMIC TIMELINE</span>
          <h3 id="learning-calendar-title">One calendar for your learning</h3>
          <p>Classes, deadlines, exams and revision in Bangladesh time.</p>
        </div>
        <div className="learning-calendar-navigation">
          <button type="button" className="learning-calendar-today" onClick={goToday}>Today</button>
          <button type="button" aria-label="Previous period" onClick={() => navigate(-1)}>‹</button>
          <button type="button" aria-label="Next period" onClick={() => navigate(1)}>›</button>
        </div>
      </div>

      <div className="learning-calendar-view-controls" role="group" aria-label="Calendar view">
        {(['agenda', 'week', 'month'] as const).map(item => (
          <button type="button" key={item} aria-pressed={view === item} className={view === item ? 'is-active' : ''} onClick={() => setView(item)}>
            {item === 'agenda' ? 'Agenda' : item === 'week' ? 'Week' : 'Month'}
          </button>
        ))}
        <strong aria-live="polite">{heading}</strong>
      </div>

      <div className="learning-calendar-filters">
        <div className="learning-calendar-type-filters" role="group" aria-label="Filter event types">
          {kindFilters.map(item => (
            <button type="button" key={item.kind} aria-pressed={enabledKinds.includes(item.kind)} onClick={() => toggleKind(item.kind)}>
              {item.label}
            </button>
          ))}
          <button type="button" aria-pressed={enabledKinds.length === kindFilters.length} onClick={() => setEnabledKinds(kindFilters.map(item => item.kind))}>All types</button>
        </div>
        <label className="learning-calendar-course-filter">Course
          <select value={courseFilter} onChange={event => setCourseFilter(event.target.value)}>
            <option value="all">All courses</option>
            {courseOptions.map(([id, title]) => <option key={id} value={id}>{title}</option>)}
          </select>
        </label>
      </div>

      {sourceErrorCount > 0 && (
        <p className="learning-calendar-warning" role="status">
          Some calendar sources could not be loaded. The events shown may be incomplete. <a href="/student">Reload dashboard</a>
        </p>
      )}

      {view === 'month' ? (
        <>
          <div className="learning-calendar-month-grid" role="group" aria-label="Monthly calendar">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span className="learning-calendar-weekday" key={day}>{day}</span>)}
            {monthDays.map(day => {
              const count = filteredEvents.filter(event => event.dateKey === day.dateKey).length;
              return (
                <button type="button" key={day.dateKey} className={'learning-calendar-month-day' + (!day.inMonth ? ' is-outside' : '') + (day.dateKey === selectedDateKey ? ' is-selected' : '')}
                  aria-label={dateLabel(day.dateKey) + ', ' + count + ' events'} aria-pressed={day.dateKey === selectedDateKey}
                  onClick={() => { setSelectedDateKey(day.dateKey); setMonthKey(day.dateKey.slice(0, 7)); }}>
                  <span>{Number(day.dateKey.slice(-2))}</span>
                  {count > 0 && <small>{count} event{count === 1 ? '' : 's'}</small>}
                </button>
              );
            })}
          </div>
          <div className="learning-calendar-selected-day">
            <h4>{dateLabel(selectedDateKey)}</h4>
            {selectedDayEvents.length ? eventList(selectedDayEvents) : <p className="learning-calendar-empty">No events on this date.</p>}
          </div>
        </>
      ) : view === 'week' ? (
        <div className="learning-calendar-week-grid" role="group" aria-label="Week view">
          {rangeDays.map(day => {
            const dayEvents = filteredEvents.filter(event => event.dateKey === day);
            return (
              <section className="learning-calendar-week-day" key={day}>
                <h4><button type="button" onClick={() => { setSelectedDateKey(day); setView('agenda'); }}>{dateLabel(day)}</button></h4>
                {dayEvents.length ? eventList(dayEvents) : <p className="learning-calendar-empty">No events</p>}
              </section>
            );
          })}
        </div>
      ) : (
        <div className="learning-calendar-agenda">
          {groupedEvents.length ? groupedEvents.map(([day, dayEvents]) => (
            <section className="learning-calendar-agenda-day" key={day}>
              <h4>{dateLabel(day)}</h4>
              {eventList(dayEvents)}
            </section>
          )) : (
            <p className="learning-calendar-empty">
              {sourceErrorCount > 0 && events.length === 0 ? 'Calendar data could not be loaded. Please refresh.' : 'No scheduled learning events in this period.'}
            </p>
          )}
        </div>
      )}

      <section className="learning-calendar-undated" aria-labelledby="learning-calendar-undated-title">
        <h4 id="learning-calendar-undated-title">Undated work</h4>
        {selectedDayUndated.length ? eventList(selectedDayUndated) : <p className="learning-calendar-empty">No undated assignments or exams.</p>}
      </section>
    </section>
  );
}
