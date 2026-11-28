# JMT Student Today — Next Best Action Benchmark & Implementation Record

**Feature ID:** LXP-STUDENT-HOME-NEXT-ACTION-001  
**Pillar:** Strategic Priority 1 — JMT Learning Experience OS  
**Related signature pillar:** Personal Academic Command Centre (#3 in the separate Top 10)  
**Date:** 15 November 2026  
**Scope of this slice:** Add one explainable primary next-action card to the existing student dashboard. This does not claim to implement lesson resume or the unified calendar.

## 1. User problem and intended outcome

A student currently opens the Student dashboard and encounters several summary metrics, a goal form, then separate lists for goals, revision, exams, assignments, mistakes, recommendations and mastery. The information exists but the interface does not first answer: **“What is the most useful thing I should do next?”**

The target is one clear primary action with a truthful reason and a direct destination. Students with no history must receive a useful start path, not fabricated mastery, progress or activity.

## 2. Current JMT baseline verified on main

Repository main commit: `141d49343d80452c0871cec77fbc02367346e847`.

- `app/student/page.tsx` (blob `6ff7e02864c2a31ab4802e171b61fbcc7f662bc3`) loads active enrolments, goals, pending revision tasks, concept mastery, unresolved mistake memory, evidence-backed recommendations, upcoming quizzes/written exams and assignments.
- `components/learning-os-dashboard.tsx` (blob `45effcdfbe5e9777f8f862df6bec5762f5bdfabf`) currently renders five summary numbers first, then a goal form, revision queue, upcoming exams/assignments, mistake memory, recommendations and mastery.
- Recommendation construction in the student page requires at least three evidence items and weak mastery, checks prerequisites, published lessons and currently paid course access.
- The dashboard does not currently have one selected primary action.
- The current lesson progress table (migration `0007_learning_content_and_teacher_scope.sql`) stores completion, completion timestamp and updated timestamp only. It does not store a playback position or resumable checkpoint. The learning-event model has a `lesson_viewed` event type, but the current learning page does not establish a reliable last-position resume path.
- The student dashboard does not currently combine live classes, assignments, exams and revision into one calendar.

## 3. Benchmark sources and evidence quality

| Reference | Evidence observed | JMT adaptation | Evidence limitation / risk |
|---|---|---|---|
| [Edrolo student homepage release](https://edrolo.com.au/blog-posts/term-4-2026-system-release) | First-party product description: tasks due soon are ordered; each subject has a one-click resume action; resume chooses the most recent meaningful learning point, preferring question responses then video timestamp; no-history state offers a sensible start point. | One primary action; deterministic and explainable selection; honest fallback. | Vendor-authored feature description, not independent evidence of learning impact. JMT's current schema cannot yet reproduce exact resume. |
| [MyStudyLife getting-started guide](https://care.mystudylife.com/en/articles/9502657-how-to-use-msl) | First-party documentation describes classes, recurring/rotating schedules, assignments, revision tasks, exams and day/week/month calendar views. | Later unified JMT calendar must combine academic event types and respect local schedule rules. | Product documentation, not comparative usability or learning-outcome evidence. |
| [Khan Academy Mastery Challenges](https://support.khanacademy.org/hc/en-us/articles/360037127892-What-are-Mastery-Challenges-in-course-mastery) | First-party explanation of review selection based on elapsed time since practice and current mastery. | Preserve evidence-based revision and explain why a review is suggested. | Feature availability and thresholds are product-specific; do not copy its six-question/three-skill structure as a universal rule. |
| [Moodle redesign case study](https://www.anisaanuhi.com/moodle-re-design) | Designer reports interviews with 15 students and 3 lecturers; students struggled to find essentials and deadlines. A concise “Now” panel and calendar were tested; the author reports faster assignment discovery. | Put one immediate action before dense metrics; keep time-sensitive work visible. | Portfolio case study with small sample and limited methods detail; reported outcomes are not an independent controlled evaluation. |
| [University of Edinburgh: Information Overflow](https://blogs.ed.ac.uk/ede/2021/06/25/information-overflow/) | Qualitative student/staff UX research describes alert fatigue, ignored notifications and difficulty discovering controls. | Do not add noisy notification counters or urgency mechanics to the next-action card. | Qualitative institutional blog, not a controlled study or a complete LMS audit. |

### Narrow benchmark assessment (1–5; evidence is specific to this job, not an overall product ranking)

- Edrolo: next-action/resume pattern 5/5; evidence strength for product behaviour 4/5, independent outcome evidence 1/5.
- MyStudyLife: planner/calendar breadth 5/5; evidence strength for product behaviour 4/5, independent outcome evidence 1/5.
- Khan Academy: evidence-informed revision pattern 5/5; direct dashboard/calendar coverage 2/5.
- Moodle redesign case study: action-first dashboard pattern 4/5; evidence strength 2/5 due to small, designer-reported case-study sample.
- JMT current baseline: underlying academic signals 4/5; first-action hierarchy 2/5; exact resume 1/5 (not supported by current progress schema); unified calendar 1/5 (not present on Student Today).

These are narrow desk-research scores, not a claim of direct hands-on comparative usability testing.

## 4. Original JMT design decision

- Place a single **Your next step** card immediately below the dashboard introduction and before summary metrics.
- Use transparent, deterministic rules over data already loaded for the authenticated student:
  1. Most recently overdue pending revision item (when present).
  2. Nearest assignment or exam within the next seven days.
  3. Lowest-mastery evidence-backed lesson recommendation.
  4. If the student is enrolled but has no urgent/evidence-backed action, offer a study-goal path.
  5. If there is no active course or learning history, offer course discovery.
- Explain the reason in plain language and link to the existing course or academic hub.
- Do not claim that the action is AI-generated, do not fabricate activity or mastery, and do not imply that the generic course link is an exact resume.
- Preserve all existing dashboard modules and the Learning Experience OS quality requirements.

## 5. Acceptance criteria for this implementation slice

1. Exactly one primary next action is rendered before the summary metrics.
2. Pending revision due/overdue items are selected deterministically; overdue items do not permanently starve the queue because the most recently overdue item is selected first.
3. The nearest assignment or exam within seven days is selected when there is no due revision task.
4. Evidence-backed recommendations are selected only when no urgent time-bound item exists.
5. New/no-history students see a useful course-discovery path; enrolled students with no urgent work see a study-goal path.
6. Invalid dates and items beyond the seven-day horizon cannot create a false urgent recommendation.
7. Every action has a human-readable reason and a valid existing destination.
8. The card is semantic, keyboard reachable, responsive and uses a visible focus indicator.
9. No schema, production database, payment, entitlement or deployment changes are part of this slice.
10. Unit/regression tests cover all decision branches; TypeScript, lint, full test suite and production build must pass in CI before the PR is considered ready.

## 6. Measurement and verification plan

- Primary metric for a future consented student pilot: time from dashboard open to starting the recommended action.
- Task success: students can explain why the action was selected and reach the correct destination without help.
- Guardrails: invalid/unsupported actions, incorrect course links, false urgency, privacy leaks, keyboard failures and recommendation dismissals/corrections.
- Baseline and outcome metrics are not yet available. Do not claim faster task completion or learning gains without a student study.

## 7. Explicit out-of-scope work that remains open

- Reliable Continue Where You Stopped requires a secure progress checkpoint model and client-side playback/lesson progress capture. The existing `lesson_progress.completed` boolean is insufficient.
- A unified academic calendar requires joining live classes, assignments, exams and revision, deduplication, recurring schedules, cancellation/time-zone handling and a usable day/week view.
- Full screenshot-based mobile and accessibility audit is not completed in this chat environment. Code and automated checks cannot replace real-device/student usability validation.


## 8. Partial data, failure and truthful empty-state extension — 27 November 2026

### Additional benchmark evidence
- **Home Office User-Centred Design Manual — Notifications** (first-party public design guidance): status updates should be exposed through an ARIA live region; `role="status"` with polite announcements avoids unnecessary interruption; keep focus in place and avoid over-notifying. This supports one calm page-level notice plus local section messages rather than assertive alerts or repeated toast spam.
- **Agriculture Design System — Loading, empty and error states** (government design system): a section-level error should say what failed in plain language and offer a recovery path; an empty state is only appropriate after data loaded successfully and returned no items. It explicitly distinguishes empty and error states.
- **Intelligence Community Design System — Empty state**: reserve empty states for genuinely absent content and give a useful next action; do not use an empty-state pattern to disguise an unrelated failure.
- **Invoca Design System — Error handling**: for partial page/table failures, preserve already-loaded content and place a scoped alert above it; reserve replacement/full-page failure for cases where no content can be rendered.

These are published design-system recommendations, not controlled evidence that a particular dashboard improves learning outcomes. JMT adapts the principles, not the component styling or proprietary code.

### JMT decision
- Track source availability independently for goals, revision, mastery, mistakes, recommendations, upcoming exams and upcoming assignments.
- Keep healthy sections visible when another source fails.
- A failed section shows a concise, non-technical explanation; it never reuses its successful-empty copy.
- Summary metrics show an em dash when their source is unavailable, not a false zero.
- Show one polite page-level status announcement; section-level copy identifies the affected data.
- If any source needed to rank the next action fails, suppress a potentially misleading priority and show a neutral refresh path. Never infer that no urgent task exists from incomplete data.
- Do not expose raw Supabase errors, SQL, identifiers or student records in UI messages.

### Acceptance criteria
1. Successful empty results retain the existing honest empty copy.
2. A failed source is represented as unavailable, never as a zero or confirmed empty state.
3. One or multiple source failures leave unrelated healthy dashboard sections visible.
4. If revision, exams, assignments or recommendations cannot be checked, the dashboard does not claim a reliable next-best action.
5. A failed mastery source does not show an empty mastery map or inferred score; a failed recommendation source does not say there are no recommendations.
6. The page-level notice uses `role="status"` and `aria-live="polite"`; no focus is moved and raw backend errors are never exposed.
7. Automated tests cover full success, successful empty, one failure and multiple failures.
8. Human mobile/screen-reader verification remains a release gate and is not claimed from code inspection alone.
