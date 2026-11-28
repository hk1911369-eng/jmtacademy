# JMT Academy — Student Today & Course Library Interaction Specification v1

**Status:** Screen-level design specification; awaiting translation into editable Figma frames and owner visual review.  
**Scope:** Student Today and Course Library only. This does not claim the screens are visually complete or implemented.  
**Parent documents:** `JMT_APPLICATION_SCREEN_CATALOG_V1.md`, `JMT_APPLICATION_DESIGN_SYSTEM_V1.md`, `JMT_SCREEN_DATA_PERMISSION_DESIGN_MATRIX_V1.md`.  
**Visual workspace:** https://www.figma.com/design/ecJJeJe5sfGYRLuCcC5zaz

## 1. Design outcome

A learner should answer three questions within a few seconds:

1. Where did I leave off?
2. What is the most useful next action, and why?
3. What is happening next in my academic schedule?

The interface must reduce decision effort without manufacturing urgency, progress, mastery, streaks or AI intelligence. A missing data source is an unavailable state, not a zero and not a reason to invent a recommendation.

## 2. Student Today — desktop structure (1440 reference)

Preserve the current Figma frame's 248 px navigation and 72 px top bar until reconciled against the live portal's 258 px sidebar. Do not silently alter the existing CSS shell.

Recommended content order:

1. **Greeting + context:** name only if the verified profile has one; active academic cohort and current date/time in Asia/Dhaka. Keep cohort explicit (HSC 2027 / HSC 2028 / Admission).
2. **Continue learning — primary focal card:** one most recent entitled course/lesson; saved position only when server-confirmed; clear Resume action. If no valid checkpoint exists, offer Open course rather than fabricate a resume point.
3. **Next best action:** exactly one prioritized action, with a short reason and source context (e.g. teacher-published assignment due date or scheduled class). If the required sources are unavailable, omit the recommendation and explain which source could not load.
4. **Today's schedule:** chronological classes, live sessions, assignments and exams. Distinguish scheduled, live, ended, cancelled and time-unconfirmed states.
5. **Study focus:** learner-controlled goal or plan, with an editable target. Do not convert app usage time into learning quality.
6. **My courses preview:** a small set of enrolled courses with accurate access mode and progress provenance; link to the full library.
7. **Recent activity / recovery:** only if there is meaningful verified activity; otherwise do not add an empty decorative chart.

Avoid dashboard overload: no more than one dominant primary card, one next-action card and one schedule section in the first viewport. Secondary sections can follow below the fold.

## 3. Student Today — mobile structure (390 reference; also validate 360)

Mobile is a reflow, not a scaled desktop. Use the existing bottom navigation concept (Today, Courses, Planner, Profile) only after confirming route destinations.

Recommended order:
- Compact top bar with page title, cohort context and notification access.
- Continue learning card with full-width Resume control.
- One next action with one-line reason; wrap naturally in Bangla.
- Today's schedule as a compact chronological list; horizontal scrolling is prohibited for primary content.
- Study focus and course preview.
- Bottom navigation with safe-area spacing and 44 px minimum touch targets.

At 360 px, long course titles, Bangla text, ৳ amounts and status labels must wrap without clipping or shrinking body text below accessible sizes. Cards must not force two-column layouts where text becomes cramped.

## 4. Course Library — information architecture

The library must separate three concepts that are often misleading when combined:

- **My learning:** courses the current learner is enrolled in or otherwise entitled to access.
- **Discover courses:** published courses available to view/apply for; availability is not proof of enrolment.
- **Saved:** learner-saved courses or lessons; saved does not imply paid/enrolled access.

Recommended filter sequence:
- Search.
- Cohort: All, HSC 2027, HSC 2028, Admission (only when matching published catalogue data exists).
- Subject.
- Learning mode: Live + recordings, Recorded, Offline academy (only where the course actually supports it).
- State: Enrolled, Available, Saved.

On mobile, present filters in a compact filter sheet or wrapping chips with an obvious active-filter count and clear-all action. Never hide the learner's current cohort context.

## 5. Course card content contract

Each course card may show:
- Verified subject and course title.
- Verified cohort/batch and teacher identity only when published.
- Mode and schedule only when confirmed.
- Price and admission fee only from the published course/fee source, formatted in ৳.
- Learner-specific enrolment/entitlement state.
- Progress only when supported by actual lesson/progress records and an explicit denominator.

Do not show fake ratings, popularity, student counts, completion percentages, scarcity, testimonials or "AI recommended" labels without validated source data and permission.

Access labels must distinguish:
- Enrolled and active.
- Application submitted / pending review.
- Available to apply.
- Not yet available to this cohort.
- Access expired / revoked.
- Saved, not enrolled.

A course being visible in Discover does not grant access to its protected lessons, resources, live sessions or recordings.

## 6. Search, filtering and result behavior

- Search matches title and verified subject/course metadata; state whether it searches only published catalogue items.
- Filters compose predictably; selected filters remain visible and removable.
- Search and filter changes preserve useful scroll position where possible.
- Empty query result: say "No courses match these filters" and offer clear filters; do not imply there are no academy courses.
- Empty enrolled state: explain how to apply or contact the academy; do not mix discoverable courses into the enrolled list without a clear section label.
- Network failure: preserve the last known safe filter/search input, label data stale/unavailable and provide retry.
- A failed request must never be rendered as a successful empty catalogue.

## 7. Interaction and recovery states

### Student Today
- Initial loading skeleton preserves card geometry.
- Continue-learning source missing: neutral fallback to course library; no guessed lesson.
- Saved position stale or inaccessible: show that resume is unavailable and link to course home.
- Schedule partial failure: show healthy sources and mark the failed section, rather than suppressing the whole dashboard.
- No classes today: state this plainly; don't insert fabricated events.
- Offline/slow connection: clearly separate locally preserved draft/position from server-confirmed progress.
- Session expired: safe re-authentication route without leaking private lesson details.

### Course Library
- Loading, no enrolments, no published discoverable courses, no filter matches, unavailable source, permission denied, expired entitlement and retry states are distinct.
- If a learner loses access, remove protected media/URLs from active UI state and explain that access changed; do not keep a stale play action.
- If course metadata loads but entitlement status fails, label access as unverified and do not show a playable/enrolled state.

## 8. Benchmark decision record

| Reference | Principle worth learning | Trade-off / what JMT must avoid |
|---|---|---|
| MyStudyLife (official tour/FAQ) | Centralise schedule, tasks and study context around the learner's day | Planner-first information can obscure actual course/lesson continuity; JMT's primary action is learning resumption |
| Moodle app (official mobile/offline documentation) | Make course content and supported offline capability explicit | Feature parity depends on institution configuration and device/network conditions; never imply every resource is offline-ready |
| Duolingo (official home-screen design/handbook) | Clear next action and progressive guidance reduce choice overload | Streak/gamification pressure is not a substitute for deep HSC learning; avoid manipulative urgency and unsupported mastery claims |
| Khan Academy (official accessibility settings) | Accessibility controls and readable learning surfaces matter | A setting existing does not prove every flow is accessible; JMT must test complete keyboard/screen-reader journeys |

These are first-party product sources. They describe vendor features and design intent; they are not independent proof of learning outcomes or comparative superiority. The design decisions above are JMT-specific adaptations, not copied screens.

## 9. Measurable design acceptance criteria

These are proposed design QA thresholds, not measured results:

- At least 90% of first-time test learners identify the Resume action within 5 seconds in a moderated 5-person usability pass; record task definition and observed time.
- At least 90% correctly distinguish Enrolled from Available to apply in a 5-task comprehension test.
- A learner can reach an enrolled course from Student Today in at most 2 deliberate actions.
- A learner can clear all active filters in one action.
- At 360 px and 390 px widths, no primary action or essential status is clipped; no horizontal page overflow.
- All interactive targets are at least 44×44 px unless a documented platform exception applies.
- All text/background combinations meet WCAG 2.2 AA contrast; focus is visible and keyboard order follows visual hierarchy.
- Loading, empty, unavailable, partial, denied, expired/revoked and offline/slow states are designed for both screens.
- All sample learner names, course progress, schedule entries and fee values are clearly marked as sample data in design and replaced with verified bindings before release.
- No fabricated metric, popularity claim, recommendation, teacher credential, cohort or entitlement state appears in any design.

## 10. Required Figma frames when access returns

Create/refine in the existing JMT Figma file, not a replacement file:
1. Student Today — Desktop 1440 (audit existing node; preserve the established frame identity).
2. Student Today — Mobile 390 and responsive check at 360.
3. Course Library — Desktop 1440 (audit existing node; preserve existing frame).
4. Course Library — Mobile 390 and responsive check at 360.
5. Shared state specimens: loading, true-empty, unavailable/partial, permission-denied/expired, offline/slow.
6. Annotate persona, source-of-truth data, role boundary and interaction notes on each screen.

Do not create duplicate frames if suitable existing frames can be refined. Do not mark any of these visual deliverables complete until Figma node IDs and visual QA evidence are recorded.

## 11. Open dependencies

- Figma MCP Starter-plan call allowance currently blocks metadata inspection and visual construction.
- Existing frame details cannot be re-audited until Figma access returns.
- Current portal CSS sidebar is 258 px while first Figma desktop frame is documented as 248 px; reconcile using actual browser viewport evidence later.
- This specification is not yet tested with real students, Bangla screen-reader output, low-end Android, poor network or authenticated production data.
- No backend/API/RLS validation is implied by this document.
