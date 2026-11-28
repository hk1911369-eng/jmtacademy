# JMT Learning Journey Design Brief v1 — Course to Lesson

**Date:** 28 November 2026  
**Status:** Evidence-backed design brief; not yet a Figma screen set or implemented UI.  
**Priority:** Learning Experience OS (strategic priority 1).  
**Related:** `docs/JMT_APPLICATION_SCREEN_CATALOG_V1.md`, `docs/JMT_APPLICATION_DESIGN_SYSTEM_V1.md`.

## 1. User problem and outcome

A learner opening JMT should not need to understand the platform's internal structure before studying. The course-to-lesson journey must answer, at every step:
- What am I learning and why does it matter for my HSC/admission goal?
- What is the best next action, and what evidence supports that suggestion?
- What can I access with my current enrolment and entitlement?
- If a video, resource, or network fails, how do I continue without losing progress?
- How do I ask for help or review without losing the lesson context?

The primary success outcome is successful continuation of the intended learning task, not clicks, session duration or dashboard visits.

## 2. Benchmark evidence and interpretation

### MyStudyLife — academic context in one place
Official product materials describe a unified view of classes, homework, exams and activities, including rotating timetables, task progress and revision planning:
- https://mystudylife.com/tour/
- https://mystudylife.com/faq/

**Useful pattern:** keep academic deadlines and class schedule in a single coherent model; support partial task progress and rotating schedules.  
**Trade-off / caution:** its feature set is a planner, not a course-content and entitlement-aware lesson environment. JMT must connect planning to actual lessons, teacher feedback, assessment and course access rather than create another standalone calendar.

### Moodle — explicit mobile and offline boundaries
Official Moodle mobile documentation lists course content, progress, learning plans, quizzes, forums and grades on mobile:
- https://docs.moodle.org/501/en/Moodle_app
- https://docs.moodle.org/405/en/Moodle_app_offline_features

The offline documentation also describes limits, selective download and sync behavior, including storage/data considerations and activity types that may not work offline.

**Useful pattern:** offline availability must be explicit, resource-specific and synchronized with visible status. Warn about large downloads and respect storage/data constraints.  
**Trade-off / caution:** Moodle's broad activity support is plugin/site-dependent; do not imply every activity works offline. JMT must show exactly what is saved and what remains online-only, and enforce physical offline recording entitlement separately from general offline access.

### Duolingo — guided progression and mastery before speed
Duolingo's public handbook explains its move from a navigable tree to a more guided path to reduce learner uncertainty and avoid skipping foundational material:
- https://handbook.duolingo.com/
- https://blog.duolingo.com/new-duolingo-home-screen-design/
- https://duolingo-papers.s3.amazonaws.com/reports/Duolingo_whitepaper_language_read_listen_write_speak_2024.pdf

**Useful pattern:** make course progression legible, group content into units with clear objectives, and make the next recommended step obvious.  
**Trade-off / caution:** a rigid linear path can frustrate learners who need teacher-directed flexibility, exam-driven revision or prerequisite exceptions. JMT should use a recommended route with explicit prerequisites and teacher-authorised flexibility, not force every learner into one sequence.

### Khan Academy — accessibility controls are product features
Khan Academy's help documentation describes captions, reduced motion and options to reduce visual dependence:
- https://support.khanacademy.org/hc/en-us/articles/360015623271-Khan-Academy-s-accessibility-settings

**Useful pattern:** captions, reduced motion and alternative presentation are visible learning controls, not hidden technical accommodations.  
**Trade-off / caution:** accessibility must be validated against actual lesson media, Bengali text and assistive technology; a settings toggle alone is not proof of accessibility.

## 3. Original JMT journey decision

Use a **guided-but-flexible learning path** connected to the student's real academic calendar, teacher-assigned work and current entitlements.

1. **Course detail:** outcome, syllabus/chapter map, delivery mode (live + recording / recorded-only / physical offline), verified schedule, transparent fee and eligibility. Primary action is context-sensitive: enrol/apply, continue, or view schedule.
2. **Course home:** clear unit/chapter progression; current lesson; upcoming class; due work; teacher-approved recommended next step. Show prerequisites and why a step is suggested.
3. **Lesson player:** media first, title and progress visible, then a compact course outline and context tabs: Overview, Resources, My Notes, Discussion. On mobile, tabs become accessible sections/drawers without hiding playback controls.
4. **Playback continuity:** resume only when checkpoint and completion evidence are both verified. If evidence is unavailable, suppress the resume CTA and explain that it could not be checked; do not guess.
5. **Live class:** distinct Upcoming / Live / Ended states; local Asia/Dhaka time; joining instructions and connection recovery; recording appears only after publication and entitlement checks.
6. **Resources:** preview/download controls show file type, size, access state and whether offline access is permitted. Large downloads require a data/storage-aware confirmation.
7. **After lesson:** one clear next step — short retrieval practice, assignment, teacher doubt or scheduled revision — based on actual course structure and learner evidence. Never fabricate mastery.
8. **Recovery:** preserve lesson context across playback failure, weak network, expired entitlement and sign-in expiry. Give a retry or safe return path without exposing private resource URLs.

## 4. Non-negotiable JMT business rules visible in design

- HSC 2027 is the 2025–26 XI intake; HSC 2028 is the 2026–27 XI intake.
- Physical offline academy learners are not equivalent to users who happen to be offline on the internet.
- Free missed-class recordings are available only to authorised physical offline learners whose roll is approved by authorised staff, within the active batch/course entitlement period. The design must show eligibility status without exposing another learner's record.
- Online/offline downloadable learning resources and physical offline missed-class recording entitlements are separate concepts.
- bKash, Nagad and Rocket are manual payment methods unless a verified gateway integration is actually implemented. The interface must show submitted / under review / approved / rejected, not pretend instant gateway confirmation.
- Sample metrics, teacher identities, class times, prices and course content in prototypes must be labelled sample data until backed by the actual source.

## 5. Screen-level acceptance criteria

| Area | Acceptance criterion |
|---|---|
| Course discovery | Learner can identify subject, cohort, delivery mode, fee and access eligibility without opening multiple pages |
| Course progression | Current unit, completed work, prerequisites and next action are distinguishable without relying on colour alone |
| Lesson continuity | Resume appears only when both checkpoint and completion evidence are available; failed source produces a scoped unavailable state |
| Mobile player | At 360px width, video controls and lesson title remain usable; outline/resources are reachable without horizontal overflow |
| Network resilience | Playback/resource errors preserve context and offer a retry or alternate path; no false success state |
| Offline downloads | Size, network type, storage impact and offline eligibility are explicit before download; status is synchronized and recoverable |
| Live class | Upcoming/live/ended states and Asia/Dhaka times are unambiguous; only authorised learners can join |
| Resources | Access denial, unavailable resource and expired entitlement are distinct states; no private URL is exposed in UI copy |
| Accessibility | Keyboard and screen-reader navigation; captions availability; reduced-motion; visible focus; WCAG 2.2 AA contrast; Bengali/English text wrapping |
| Trust | No invented progress, mastery, teacher, schedule, fee, attendance or exam data |

## 6. Design QA matrix

For each course and lesson screen, prepare:
- 360×800 Android mobile
- 390×844 Android mobile
- 768×1024 tablet
- 1440×900 desktop
- Long Bengali title and mixed Bengali/English content
- Empty course, no lessons, no resources and no upcoming events
- Slow network, disconnected network, playback failure and retry
- Expired enrolment, pending payment and permission denied
- Resume source unavailable, completed lesson checkpoint and no checkpoint
- Large file warning, insufficient storage and interrupted download
- Keyboard-only focus and reduced-motion setting

## 7. Repository baseline discovered during this session

- Current route/component inventory is recorded in `docs/JMT_APPLICATION_SCREEN_CATALOG_V1.md`.
- PR #78 adds fail-closed behavior when lesson playback or completion evidence cannot be checked. Its PR description records 179/179 tests, TypeScript and ESLint passed; production build (40 static pages) and dependency audit (0 vulnerabilities) passed on the exact head through GitHub-hosted checks. PR #78 remains draft/unmerged and does not constitute browser/mobile QA.
- PR #73's offline recording workflow has substantial JMT Test-only RLS/role validation and exact-head CI history, but actual Storage upload/download, eligible object read, signed-URL expiry/cache behavior and authenticated browser/mobile QA remain outstanding. Keep it draft/unmerged until those gates pass.
- Do not use PR #78's branch state as proof that it is included in PR #73. The PR descriptions explicitly state they are sibling drafts; reconcile the stack deliberately later.

## 8. Current tool blocker

Figma MCP Starter call limit is still active. A new Figma session was opened for this task, but the design-context request returned the Starter-plan call-limit paywall. No Figma nodes were modified. Continue evidence-backed design specification and supporting Adobe asset refinement; resume editable multi-screen Figma construction when access returns. Do not substitute an image or Adobe slide for a real application screen.

## 9. Sources and evidence limits

The product descriptions above are first-party product documentation or company-authored material. They are useful for identifying stated capabilities and design rationale, not independent proof of learning outcomes or usability. The Duolingo white paper is company-published research; treat it as evidence of its reported study, not as independent comparative validation of JMT. No claim of a measured JMT improvement is made.
