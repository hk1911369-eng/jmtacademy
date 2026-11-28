# JMT Academy — Application Screen & Journey Catalogue v1

**Status:** Design-planning artifact grounded in the repository route tree; not a visual design or proof that every workflow is implemented.  
**Purpose:** Establish complete screen coverage before any application UI programming resumes.  
**Canonical code reference:** `app/`, `components/`, `app/actions/` on the canonical repository.  
**Visual workspace:** [JMT Academy Figma file](https://www.figma.com/design/ecJJeJe5sfGYRLuCcC5zaz).

## 1. Design principles and product hierarchy

1. Learning Experience OS first: help learners decide what to do next, continue learning reliably, and understand progress without fabricated metrics.
2. Intelligence Engine second: AI Teacher and Exam Question Predictor remain separate, explainable experiences; never imply an AI capability exists merely because a screen is designed.
3. Complete ecosystem third: teacher, admin, parent, payments, offline entitlements, assessments, labs and operations must feel like one product with role-specific permissions.
4. Mobile-first in actual use, not simply desktop scaled down. Design around low-cost Android, intermittent connectivity, touch, readable Bangla and low data usage.
5. Every data-backed screen includes loading, true-empty, unavailable/error, permission-denied, success and retry states where applicable.
6. Use live authenticated data and server-enforced permissions at implementation. Design-only sample data must be labelled and never shipped as real student information.

## 2. Repository route inventory (observed)

### Public and account routes
- `/` — public landing/home
- `/about`, `/contact`, `/help`, `/privacy`, `/terms` — institutional information and support
- `/courses`, `/courses/[slug]` — catalogue and course detail
- `/apply` — course application
- `/login`, `/register`, `/forgot-password`, `/reset-password`, `/auth/confirm` — identity lifecycle
- `/account-pending`, `/account-disabled` — account access states

### Learning and student routes
- `/portal` — portal entry / role-aware shell
- `/student` — Student Today / Learning Experience OS
- `/learn/[courseId]` — course learning / lesson experience
- `/student/exam-war-room` — exam preparation workspace
- `/student/receipt/[id]` — student receipt
- `/academic` — academic tools and information
- `/labs` — virtual laboratory entry

### Teacher routes
- `/teacher` — teacher workspace
- `/teacher/learning` — teaching and learning workspace

### Admin and operations routes
- `/admin` — admin overview
- `/admin/applications` — admissions/application review
- `/admin/courses` — course management
- `/admin/finance` — finance/payment operations
- `/admin/learning` — learning operations
- `/admin/settings` — academy configuration
- `/students/manage` — student records and management

### Route-adjacent components and action domains observed
- Shared shell and navigation: `components/portal-layout.tsx`, `components/portal-icon.tsx`
- Course catalogue: `components/course-catalogue.tsx`
- Learning OS: `components/learning-os-dashboard.tsx`
- Lesson resource upload/access: `components/lesson-resource-upload.tsx`, `components/lesson-resource-access.tsx`
- Virtual lab studio: `components/virtual-lab-studio.tsx`
- Written exam builder: `components/written-exam-builder.tsx`
- Payment review: `components/payment-review-form.tsx`
- Server action domains: academic, academy settings, auth, course application/studio, exam war room, finance, language, learning OS, learning, notifications, payments, student management, teacher learning and virtual labs.

**Important:** route existence does not establish feature completeness, quality, correct permissions or real UI behaviour. The route tree is a design inventory input, not a QA result.

## 3. Student experience — required screen family

| Screen / flow | Entry point | Required design states and details |
|---|---|---|
| Student Today | `/student` | Resume lesson; one explainable next action; study goal/revision; upcoming schedule; honest progress; partial-source failure |
| Course library | `/courses` and student shell | Enrolled/saved/discoverable courses; HSC 2027, HSC 2028, Admission filters; access/price/entitlement clarity |
| Course detail | `/courses/[slug]` | Outcomes, syllabus, teacher facts only when verified, course mode, fee/entitlement, class schedule, enrol/join state |
| Learning home | `/learn/[courseId]` | Course outline, progress, next lesson, resources, assessment and live/recorded mode |
| Lesson player | Learning home | Video/live content, resume position, captions/transcript availability, low-bandwidth mode, lesson completion, access-denied and playback-error |
| Live class | Lesson/course | Upcoming/live/ended states, joining rules, connection recovery, schedule/timezone, recording entitlement |
| Resources | Lesson player | File preview/download, type/size, offline state, unavailable/permission-denied, safe retry |
| Notes and doubts | Course/lesson | Personal notes, question submission, answer thread, moderation/reporting and privacy |
| Planner/calendar | Student Today | Daily/weekly/monthly views, goals, class/exam/assignment conflicts, missed-class recovery, timezone-safe dates |
| Assignments | Course | Instructions, due date, upload/draft/submit, late state, teacher feedback and resubmission rules |
| Quizzes and exams | Course / Exam War Room | Instructions, attempt state, timer, autosave/offline loss prevention, review, result explanation |
| Exam War Room | `/student/exam-war-room` | Exam-specific preparation, syllabus coverage, practice, mistakes and revision evidence |
| Virtual labs | `/labs` | Safe simulation, setup, variables, experiment steps, result interpretation, risk warnings and reset |
| Notifications | Student shell | Read/unread, categories, deep links, quiet-state and failed-load |
| Payments and receipts | Student shell / receipt route | Fee breakdown, due/paid/pending, manual bKash/Nagad/Rocket proof status, receipt; never imply automatic gateway |
| Attendance | Student shell | Present/absent/late with source and correction route; no invented attendance |
| Profile and help | Student shell | Identity, guardian/contact, language, accessibility, account state and support |

### Student mobile navigation baseline
Today, Courses, Planner and Profile as the persistent primary destinations; context-specific actions (Live, Notes, Assessments, Payments, Attendance) remain discoverable without overloading the bottom bar. Confirm against actual navigation and usage before implementation.

## 4. Teacher experience — required screen family

- Teacher Today: assigned classes, urgent review queue, next class, unresolved learner questions and source-specific data health.
- My Courses & Batches: assigned cohorts, subject, schedule, permissions and enrolment counts.
- Class Studio: create/edit class session, attach lesson/resource, set live or recorded delivery, publish safely.
- Live Class Control: join/start/end, meeting link/status, attendance and recording publication workflow.
- Attendance: batch roster, present/absent/late, correction/audit history and role constraints.
- Resource Library: upload, preview, replace/version, publish/unpublish and batch visibility.
- Assignment Review: queue, learner submission, rubric, feedback, revision request and audit trail.
- Assessment Builder: quiz/written exam authoring, preview, scheduling, answer key and publication safeguards.
- Learner Progress: evidence-backed progress, mastery limitations, intervention history and privacy boundaries.
- Doubt/Discussion Inbox: course-scoped questions, response, moderation and escalation.
- Teacher profile and schedule: verified teaching assignments, availability and notifications.

## 5. Admin experience — required screen family

- Operations overview: admissions, active cohorts, class delivery, finance exceptions and platform health; no vanity metrics without source.
- Admissions: application queue, applicant detail, decision, missing documents and audit trail.
- Course Studio: course/subject/cohort/batch setup, delivery mode, price/fee rules, publication and archive.
- Student registry: identity, guardian, college/location, cohort, roll and status; protected fields and export controls.
- Staff & permissions: teacher/staff assignment, scoped capabilities, reasons, effective dates and audit.
- Offline Academy Registry: physical batch, verified roster, authorised roll approval, recording entitlement period and revocation. Online students must never receive this physical-offline entitlement by default.
- Finance: fee schedule, admission fee, monthly dues, manual payment proof review, paid/pending/overdue, reconciliation and receipts. No automatic gateway claim.
- Learning operations: classes, resources, assessments, attendance, incidents and moderation.
- Announcements and notifications: audience targeting, preview, scheduling and delivery status.
- Analytics and exports: cohort/time filters, definitions, data freshness, privacy and export audit.
- Settings: academy profile, terms, languages, feature flags, security, retention and integrations.

## 6. Parent / guardian experience — required screen family

- Linked learner selector with explicit relationship/authorisation state.
- Learner overview: course enrolment, upcoming classes and verified learning progress.
- Attendance history with correction/absence context.
- Academic calendar and important deadlines.
- Payment overview: admission/monthly fee, paid/pending/overdue and receipt links.
- Announcements and teacher/academy updates.
- Privacy and access management: show only explicitly linked learner data; no access to private notes, peer data or unrestricted teacher records.

## 7. Shared shell and design-system work still required

- Finalise logo/emblem and wordmark; equal symbolic dignity for Jayed, Mohammad and Talha. Do not make initials the whole mark.
- Establish semantic Light and Dark tokens, type ramp, spacing, radii, elevation, icon system, illustration/photo rules and motion rules.
- Shared components: desktop/mobile navigation, page header, buttons, text fields, select/search, tabs, cards, tables, data filters, dialogs, drawers, banners, toasts, empty/error/loading states, progress, avatars, badges and accessible media controls.
- Define component states and keyboard/focus behaviour, not only default appearance.
- Use Inter and Noto Sans Bengali consistently. Check Bangla line wrapping, numeric formatting, date/time and currency formatting (৳).
- Ensure 44px minimum touch targets, visible focus, WCAG AA contrast, screen-reader labels, reduced-motion and no colour-only status.

## 8. Required responsive coverage

For each high-frequency journey, design and review at:
- Mobile: 360×800 and 390×844 reference viewports.
- Tablet: 768×1024.
- Desktop: 1440×900.

Also specify narrow/short viewport, text zoom, long Bangla strings, empty/large datasets, slow connection, offline transition and keyboard-only operation. Mobile must recompose information hierarchy rather than merely shrink desktop.

## 9. Acceptance gates before programming resumes

1. All routes above are mapped to an approved screen, redirect, or explicit not-in-scope reason.
2. Student, teacher, admin and parent journey maps have entry, success, failure, recovery and permission-denied states.
3. Every screen has desktop and mobile layouts; high-frequency screens also have tablet review.
4. All reusable patterns are componentised and token-bound in Figma; no fake live metrics or unsupported claims.
5. Light and Dark modes are defined and contrast checked; typography and Bangla layout are checked.
6. Business rules for offline entitlement, payment methods, role permissions and cohort identity are visible in the relevant flows.
7. Final design review has screenshot evidence at full resolution and a recorded defect list; unresolved release-critical issues block sign-off.
8. Owner approval of the design direction is recorded before implementation begins.

## 10. Current evidence and blockers

- Existing Figma file has first-pass Student Today desktop/mobile, foundations specimen, button/stat card components and desktop course library.
- Six editable subject cover assets and one editable lecture opening slide exist in Adobe Express; they are supporting content assets, not UI screens.
- Figma Starter MCP call limit currently blocks further Figma inspection/editing in this session. Do not retry repeatedly or pretend the designs were changed.
- Adobe Express is not a substitute for a semantic multi-screen Figma application design system. Use it for high-quality supporting visual assets and academic templates.
- The Product Design plugin's full Work workflow is not available in standard chat. Continue with directly available design tools where supported; if a required tool is rate-limited, record the blocker and use non-destructive research/specification work until access returns.

## 11. Next design sequence

1. Reopen Figma access and visually audit the current Student Today and Course Library frames; correct desktop whitespace/navigation iconography and finish Light/Dark token foundations.
2. Complete the student course-to-lesson journey: course detail → learning home → lesson player → live class → resources → notes/doubts → assignment → quiz/exam → planner/notifications → profile/payment.
3. Build teacher workspace and its class delivery/review workflows.
4. Build admin operations, admissions, finance, staff permissions and physical-offline registry.
5. Build parent/guardian overview, attendance, calendar and finance.
6. Create and inspect reusable in-app assets and academic templates in Adobe Premium; then final logo, collateral and marketing.
7. Run complete responsive/accessibility visual QA and obtain owner sign-off.
8. Only then resume programming, using approved Figma components/tokens and actual route/data/permission contracts.
