# JMT Student Academic Calendar — Benchmark, Product Design and Acceptance Criteria
**Date:** 16 November 2026  
**Scope:** Student Learning Experience OS; first implementation slice is a unified, read-only calendar projection over existing academic records.  
**Branch base:** PR #67 head `da2f632c688ae2077a07cc3be0993b51f9cb5747` (which is stacked on PR #66). This feature branch is intentionally based on PR #67 and must not be merged independently of its dependencies.

## 1. Product problem and intended outcome
Students currently encounter live classes, assignments, quizzes, written exams and revision tasks in separate parts of the Student/Academic Centre experience. JMT should give a student one trustworthy timeline across their currently accessible courses without creating a second source of truth or making them reconcile duplicate dates manually.

The first slice is a **read-only calendar projection** of existing records. Authoritative edits continue through the existing class, assignment, exam and revision workflows. This avoids drag-and-drop calendar edits silently diverging from the underlying assessment or teaching record.

## 2. Benchmark method and source quality
The review distinguishes first-party product documentation (feature evidence, not independent proof of quality), independent user reviews (anecdotal failure signals, not prevalence estimates), and empirical research (bounded by study population/method).

### MyStudyLife — student-native planner
- First-party [FAQ](https://mystudylife.com/faq/) (20 October 2026) documents web/iOS/Android sync, offline viewing and editing with later sync, rotating timetables, term dates/holidays, iCal import and Google/Apple calendar mirroring. It also documents seven task types, recurring tasks, subtasks, partial progress and revision tasks linked to exams.
- First-party [getting-started guide](https://care.mystudylife.com/en/articles/9502657-how-to-use-msl) describes daily/weekly/monthly views, class/task/exam detail, subject filters and a dashboard summary.
- Independent [Apple App Store reviews](https://apps.apple.com/us/app/my-study-life-school-planner/id910639339?platform=iphone&see-all=reviews) from June–September 2026 include individual reports of class times shifting by several hours, time/date mismatches, reminders not firing, and difficult schedule editing. The developer replied to some August reports that a small-group time-zone display bug had been fixed in an update. These are anecdotal reliability signals, not prevalence estimates or proof of an unresolved current defect; the same listing also contains positive feedback about exam organization and reminders.
- **Transferable strength:** academic-native event types, rotating timetable awareness, exam-linked revision, offline capability and a single student mental model.
- **Do not copy blindly:** do not promise offline editing/sync until JMT has a tested local persistence and conflict-resolution design; do not add an AI planner or automatic nudges that override student agency.

### Moodle — LMS calendar and deadline aggregation
- Official [Calendar documentation](https://docs.moodle.org/502/en/Calendar) describes aggregation of site, course, group, user and category events alongside assignment and quiz deadlines, color-coded categories, and event edits that can update the underlying activity.
- Official [Timeline block documentation](https://docs.moodle.org/502/en/Timeline_block) documents a dashboard deadline overview, but also important limits: at most five activities per course in the block, only two weeks of overdue history, quiz dates need a separate reminder setting, and restricted activities are hidden until the learner has access.
- **Transferable strength:** role- and course-scoped aggregation, visibility tied to actual activity access, and a useful compact upcoming-deadline surface.
- **JMT opportunity:** do not hide older overdue tasks behind a tiny per-course cap; keep the full event list searchable/filterable and preserve the actual entitlement rules.

### Canvas — global multi-course calendar
- Official [student calendar guide](https://community.instructure.com/en/kb/articles/662787-how-do-i-use-the-calendar) documents cross-course aggregation, day/week/month/agenda views, course and group calendars, color-coded categories, undated items, and personal recurring events. It also documents moving calendar items by drag-and-drop in month/week views.
- The guide notes that up to nine graded items with a To-Do date may display per course and that some assignments due at 11:59 PM appear at the bottom of week view. These product-specific limits and display quirks informed JMT's read-only projection and clear deadline labels.
- **Transferable strength:** one global calendar, explicit view modes, per-course filters and an undated-work queue.
- **JMT opportunity:** never make color the only category signal; distinguish deadline-only items from time-blocked sessions; keep student view read-only for official academic events.

### Independent usability and calendar research
- A 2020 University of Jyväskylä [master's thesis record](https://jyx.jyu.fi/jyx/Record/jyx_123456789_73124) compares agenda, day-list, week and grid timetable views through heuristic evaluation, survey and usability testing. Its participants preferred the agenda view. This is a bounded study, not proof that agenda is universally best; it supports an agenda-first mobile default that must still be tested with JMT students.
- Zhuo and Liu, [“Digital Boundaries of Time”](https://dl.acm.org/doi/full/10.1145/3715070.3749269), CSCW Companion 2025, analyzed features of 22 calendar apps and 977 user reviews. The paper identifies synchronization as a prerequisite for users to delegate agency to calendar tools (reported across 17 apps and 37 reviews), and describes buffer/travel-time and automatic task-rollover features in 7 of 22 apps. Its broader findings on visualization, regulation and flexibility highlight risks from rigid time boundaries and overloaded time-blocking, supporting user agency and flexible planning.
- **Design implication:** reliability and clear event semantics outrank clever automation. Users must be able to distinguish a fixed class/exam time from a deadline or a flexible revision task; notifications should be configurable and non-intrusive.

## 3. Existing JMT data and security constraints
The verified JMT Test schema already contains the sources required for this first slice:
- `live_classes`: dated class sessions with start/end, status and course.
- `assignments`: published assignments with optional `due_at`.
- `quizzes`: published assessments with optional start/end and duration.
- `written_exams`: published assessments with optional start/end.
- `revision_tasks`: student-specific pending revision tasks with `scheduled_for` and priority.
- `courses`, `enrollments`: course labels and active enrollment relationships.

There is no structured recurring weekly timetable table. `courses.schedule_text` is free text and must not be parsed into fabricated event times. The first slice therefore shows scheduled `live_classes` as class events; recurring timetable management remains a separately scoped follow-up requiring structured data and teacher workflows.

Security requirements:
- Query through the authenticated server Supabase client, never a service-role client for student calendar reads.
- Keep the user-scoped RLS policies as the enforcement boundary. Assignments, quizzes, written exams and playback/lesson access already have entitlement-aware student policies; live classes have active paid enrollment and delivery-mode scope; revision tasks are student-owned.
- Do not broaden RLS, grant table access or duplicate private records into a public calendar table.
- Do not show offline-student recordings or live events outside the student's current entitlement. Offline classroom identity/roll authorization remains a separate server-enforced feature.
- Render timestamps explicitly in `Asia/Dhaka`; store and query canonical timestamps, never reinterpret them as browser-local wall-clock values.

## 4. Original JMT design
1. **Agenda-first mobile experience.** The default is a readable list grouped by Bangladesh date, with a compact day/week/month switcher. The week/month views are secondary navigation, not the only way to read the calendar on a narrow screen.
2. **One canonical timeline.** Aggregate class sessions, assignment deadlines, quizzes, written exams and revision tasks. Each item keeps its source type, course, title, date/time, duration where applicable and a deep link to the authoritative workflow.
3. **Semantics before decoration.** Label “Class”, “Assignment due”, “Quiz”, “Written exam” and “Revision” in text; use color only as a supplementary cue. Deadline-only items are visually and verbally distinct from timed blocks.
4. **Course and type filters.** Provide a clear “All courses” default, plus course and event-type filtering with an obvious reset.
5. **Undated queue.** Published assignments/exams without a date are not silently dropped; they appear in an “Undated” section and do not get invented calendar dates.
6. **Conflict awareness.** Flag overlaps between timed classes and exams when start/end data proves an overlap. Do not claim a conflict for deadline-only or untimed tasks.
7. **Student agency.** Official academic events are read-only in the calendar; changes route to the relevant authorised workflow. No unsolicited automatic time-blocking or push reminders in this slice.
8. **Low-bandwidth restraint.** Use server-fetched data and lightweight React/CSS; no heavy calendar dependency, third-party embed, map or chart. Empty/error states must remain understandable.
9. **Privacy by construction.** Only the authenticated student's RLS-visible records are passed to the component. No parent/guardian sharing or staff-wide event visibility is introduced by this feature.

## 5. Measurable acceptance criteria
| Area | Acceptance criterion |
|---|---|
| Coverage | All five supported event types render when corresponding authorized records exist; undated assignment/exam records appear in the undated queue. |
| Correctness | Event ordering is chronological; date grouping and display are correct for `Asia/Dhaka`; invalid timestamps are safely excluded rather than displayed as “Invalid Date”. |
| Conflicts | A deterministic test proves overlapping timed class/exam intervals are flagged; adjacent intervals and deadline-only items are not flagged. |
| Filtering | Course and event-type filters update visible items; clearing filters restores the complete authorized set. |
| Views | Agenda, week and month views work; agenda is the mobile default; date navigation and “Today” work across month/year boundaries. |
| Accessibility | All controls are keyboard-operable, have accessible names and pressed/selected state; event type and conflict are conveyed in text, not color alone; visible focus and semantic headings are present. |
| Responsive | No horizontal page overflow at 320 CSS px; agenda remains readable at 320–390 px; wider layouts may use a week/month grid. |
| Empty/error | Empty calendar and undated-only states are explicit; a failed source query degrades without crashing the entire student dashboard and must not misrepresent missing data as “no events”. |
| Security | RLS tests demonstrate a student sees only their own entitled events; unauthorized course records are absent. No service-role query, public table or policy broadening is introduced. |
| Performance | Five source queries run in parallel and are bounded (maximum 200 rows per source); component uses no external calendar library or network requests. |
| Regression | Existing Next Best Action, Continue Where You Stopped, revision completion, goal creation and academic-center links continue to work. |

## 6. Known limitations and explicit non-goals for this slice
- No structured recurring weekly timetable yet; only persisted, RLS-visible `live_classes` sessions appear as class events. Offline physical classroom sessions are not surfaced in this first slice and must be added through a separate roll-number/cohort/batch-entitlement-aware timetable.
- No external Google/Apple calendar export or iCal import in this implementation.
- No offline write queue, local calendar cache, push notifications or reminder scheduler.
- No student drag-and-drop rescheduling of official classes/exams/deadlines.
- No parent calendar sharing or teacher/admin calendar workspace.
- No claims of measured productivity, learning gain or “100x” improvement; this is a benchmark-informed design hypothesis awaiting student usability testing.

## 7. Verification plan
- Unit-test event normalization, missing/invalid dates, Asia/Dhaka date keys, stable ordering, view date calculations, filter semantics and conflict detection.
- Run repository typecheck, test suite, lint and production build through exact-head GitHub checks.
- Use rollback-only JMT Test fixtures to verify RLS-visible event rows for an authenticated student and verify zero residual records after rollback.
- Perform authenticated mobile and desktop UI verification when a supported browser-control/authenticated test path exists. The current connected tools do not provide an authenticated browser session; do not claim visual QA until that is available.
