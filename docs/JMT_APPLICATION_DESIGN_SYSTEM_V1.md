# JMT Academy — Application Design System v1 (Working)

**Status:** Working visual direction; not owner-approved final identity.  
**Created:** 28 November 2026 (Asia/Dhaka)  
**Editable Figma file:** https://www.figma.com/design/ecJJeJe5sfGYRLuCcC5zaz  
**Related handoff:** `docs/CURRENT_WORK_STATE.md`, Sections 15–17.

## 1. Design intent

Build a calm, credible, multi-subject learning platform for Bangladesh HSC 2027, HSC 2028 and university-admission learners, with online and offline academy workflows. The interface should make the learner's next useful action obvious without turning the dashboard into a wall of metrics. Design student, teacher, administrator and parent workspaces as one coherent product with role-appropriate permissions and navigation.

The current Figma file contains first-pass Student Today desktop/mobile screens, a foundations specimen, reusable button/stat-card components and a desktop course-library screen. These are editable design artifacts, not implemented application UI. Remaining role and workflow screens are not complete.

## 2. Existing codebase tokens (confirmed in `app/globals.css`)

The first design pass deliberately reuses the live codebase's existing CSS palette rather than introducing an unrelated brand colour system.

| Token | Value | Use |
|---|---|---|
| Navy | `#071B3B` | Brand anchor, primary dark surfaces |
| Action blue | `#1769D2` | Primary actions, links, active navigation, focus |
| Ink | `#14233B` | Main text |
| Muted | `#66758B` | Supporting text |
| Line | `#DCE5F1` | Borders and separators |
| Canvas | `#F6F9FD` | Application background |
| Surface | `#FFFFFF` | Cards, panels, navigation |
| Accent | `#D89A35` | Limited attention/status accent; not the primary brand colour |
| Success | `#16744D` | Positive status |

The first Figma token collection contains the nine semantic colour variables above. It currently has Light mode only. A Dark mode is not complete and must not be claimed.

## 3. Typography

- English UI: Inter; Regular, Medium, Semi Bold and Bold.
- Bangla UI: Noto Sans Bengali; Regular, SemiBold and Bold.
- Preserve the existing CSS font stack: `Inter`, `Noto Sans Bengali`, `Noto Sans`, system sans-serif.
- Keep labels concise; use sentence case for primary headings and uppercase only for small section/kicker labels.
- Avoid overly tight tracking or tiny body text. The Figma specimen is a starting scale, not a final typography audit.

## 4. Layout and component direction

- Desktop Student Today first pass: 1440 px frame, 248 px left navigation, 72 px top bar, flexible content region, 32 px content inset.
- Existing portal CSS currently uses a 258 px sidebar; reconcile the 10 px difference during implementation rather than silently changing the live shell.
- Cards: white surface, subtle one-pixel border, 14–18 px corner radius, restrained/no heavy shadows.
- Primary button: 44 px high, 12 px radius, clear verb label, minimum 44 px interaction target.
- Stat card: one headline metric, one concise supporting explanation; do not show fabricated values in production.
- Mobile Student Today: 390 px reference width, single-column flow, two compact metrics side-by-side, bottom navigation with Today/Courses/Planner/Profile. It is reflowed, not scaled from desktop.
- Use the same spacing rhythm consistently: 8, 12, 16, 24 and 32 px as the initial scale.

## 5. Student information architecture

First-pass Student Today navigation: Today, My Courses, Live Classes, Study Planner, Notes & Doubts, Assessments, Payments, Attendance and Help Centre. Confirm every item against current routes and role permissions before implementation.

Student Today should prioritise:
1. Resume the last lesson with a truthful saved-position state.
2. One explainable next action, only when its source data is available.
3. Study goals and revision due.
4. Topic mastery only when backed by evidence; never infer a score from missing data.
5. Upcoming classes, assignments, exams and calendar items.
6. Clear source-specific loading, empty, unavailable and error states.

Course Library first pass: cohort filters (All, HSC 2027, HSC 2028, Admission, Saved), continue-learning cards and enrolled subject cards with progress. Course access and prices must be bound to the authenticated learner's actual enrolments/entitlements.

Lesson Player direction: video/live-stream region, lesson title and saved progress, tabs for Overview/Resources/Discussion/My Notes, and a course outline. Enforce existing server-side access controls for private resources, live sessions and recordings. The detailed player screen is not yet built in Figma.

## 6. Role workspaces still to design

- Teacher: teaching dashboard, assigned courses/batches, class studio, live-class controls, attendance, resource publishing, assignment review, assessments and learner progress.
- Admin: academy operations, admissions, batches, student/staff records, payment tracking, permissions, announcements, analytics and settings.
- Parent/guardian: linked learner overview, progress, attendance, payment status and academic updates; expose only authorised linked-student data.

These are design scopes, not assertions that every route or feature is already implemented.

## 7. Interaction, accessibility and reliability rules

- Provide visible keyboard focus; existing CSS uses a blue focus-visible outline. Preserve and test it rather than removing it.
- Keep text contrast at WCAG AA for normal text (4.5:1) and large text (3:1); verify all final palette combinations.
- Do not communicate status through colour alone. Add labels/icons/text.
- Support keyboard operation, accessible names, semantic headings, polite status announcements and reduced motion.
- Design loading, empty, error/unavailable, success, disabled and permission-denied states for every data-backed surface.
- Never display zero or an empty success state when the underlying source failed. Keep healthy dashboard sections visible when another source is unavailable.
- Make the mobile experience usable on low-cost Android devices and slow connections; do not rely on hover-only controls or oversized imagery.

## 8. Brand constraints

- The logo/emblem remains a separate identity task. The three founders Jayed, Mohammad and Talha must receive equal visual dignity in the symbol; do not use literal initials as the whole concept or visually elevate one founder above the others.
- Prefer a monochrome-first, flat mark that remains legible as a favicon and in low-resolution contexts. Do not treat the recent charcoal/ivory/gold Adobe cover palette as approved final brand colours.
- The app UI palette above is inherited from existing CSS. Marketing/academic collateral should align to it unless the owner approves a documented brand-system change.

## 9. Sample-data and implementation guardrails

The Figma screens contain sample course titles, cohort labels, lesson progress, study hours, upcoming schedule items and mastery percentages for visual composition only. They are not real student records or verified academy data. Replace them with live, permission-scoped data before release. Do not invent teacher names, fees, admission dates, results or institutional claims.

## 10. Next design and implementation gates

1. Complete Figma screens for course detail, lesson player, live class, resources, notes/doubts, assignments, quizzes/exams, planner/calendar, notifications, profile/payments and mobile states.
2. Complete teacher, admin and parent workspaces with role/permission states.
3. Review the designs against actual Next.js routes, data contracts, RLS and existing UI components.
4. Resolve known first-pass visual issues: desktop resume card's unused right-side space, navigation iconography, final spacing, all mobile heights and dark mode if approved.
5. Apply the approved system on a dedicated PR branch, not directly to main. Run tests, TypeScript, ESLint, production build, accessibility checks and authenticated Android/responsive QA.
6. Keep marketing collateral secondary until core application screens and their implementation are coherent.
