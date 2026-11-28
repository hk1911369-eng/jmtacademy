# JMT Academy — Screen Data & Permission Design Matrix v1

**Status:** Design contract for visual design and future QA; not a claim that backend policies have been inspected or that every listed feature is implemented.  
**Created:** 28 November 2026 (Asia/Dhaka)  
**Parent catalogue:** `docs/JMT_APPLICATION_SCREEN_CATALOG_V1.md`  
**Design system:** `docs/JMT_APPLICATION_DESIGN_SYSTEM_V1.md`  
**Visual workspace:** https://www.figma.com/design/ecJJeJe5sfGYRLuCcC5zaz

## Purpose

The screen catalogue lists what must be designed. This matrix adds the data provenance, identity boundary, permission-denied treatment and recovery behaviour that each screen must communicate. It is a design-time contract. Before implementation, each row must be reconciled against the actual server action, database schema, RLS policy and authenticated role; a visual control is never an authorization boundary.

## Global rules

1. **Server decides access.** Hiding a button, route or navigation item is not security. Every read, write, upload, download, publish, approval and export must be authorized server-side for the current identity and scope.
2. **Show provenance.** Distinguish live/verified values, user-entered values, pending review, sample design content and unavailable data. Never convert a failed query into a zero, empty-success state or invented recommendation.
3. **Least privilege by default.** A student sees their own records and explicitly shared course/batch content; a teacher sees assigned courses/batches and permitted learner submissions; an administrator sees only the operations granted by their role; a guardian sees only explicitly linked learner information.
4. **Sensitive actions are attributable.** Admissions decisions, roll approvals, staff assignments, finance review, roster changes, recording publication/revocation, grade changes and exports need actor, reason, timestamp and effective scope in the product's audit model.
5. **Bangladesh context is first-class.** Show HSC 2027 as the 2025–26 XI intake and HSC 2028 as the 2026–27 XI intake. Format fees in ৳, dates and times in Asia/Dhaka unless a specific context requires otherwise. Use Inter + Noto Sans Bengali and test long Bangla text.
6. **No entitlement ambiguity.** Physical offline academy enrolment is not equivalent to a learner merely losing internet. Free missed-class recordings are limited to approved physical offline students, approved roll, matching batch/cohort and active entitlement period. Enforce on the server.
7. **No payment misrepresentation.** bKash, Nagad and Rocket are manual payment methods in the existing foundation. Screens must say submitted / under review / accepted / rejected / paid only when the underlying record supports that state; never imply automatic gateway confirmation.

## Route-to-screen contract

| Route / surface | Persona | Data that the design may display | Boundary and denial state | Required recovery / audit cue |
|---|---|---|---|---|
| `/`, `/about`, `/contact`, `/help`, `/privacy`, `/terms` | Public | Published academy information and public course facts | No private learner, staff or finance data | Content unavailable; contact/help fallback |
| `/courses`, `/courses/[slug]` | Public / signed-in learner | Published course, subject, cohort, mode, verified syllabus, published fee and schedule | Draft/unpublished course and private cohort information stay hidden | Empty catalogue, filter-empty, course unavailable, application/join next step |
| `/apply` | Applicant | Applicant's own submitted fields and application status | Applicant can read/edit only permitted own application fields; staff decisions are staff-only | Save draft, validation, duplicate submission, pending review, rejected/needs-information states |
| `/login`, `/register`, `/forgot-password`, `/reset-password`, `/auth/confirm` | Account owner | Own identity and authentication lifecycle state | No account enumeration; expired/invalid tokens do not expose account details | Rate-limit, expired link, resend/reset recovery and accessible form errors |
| `/account-pending`, `/account-disabled` | Account owner | Own activation/review/disabled state and safe support route | No portal data until account/role permits access | Clear reason category where safe, contact route, sign-out |
| `/portal` | Authenticated user | Role-appropriate workspace entry | Resolve role from trusted server-side profile, not client-supplied role | Missing/inactive profile, unsupported role, session expiry |
| `/student` | Student | Own enrolled courses, own schedule, saved lesson position, own goals and evidence-backed progress | Own records only; suppress ranking when priority sources are unavailable | Per-source loading/empty/unavailable, retry, last-updated and truthful next-action explanation |
| `/courses` (learner library state) | Student | Enrolled/saved/eligible-to-discover courses, cohort and access status | Do not expose another learner's enrolment; course content requires entitlement | No enrolments, no matching filters, pending enrolment, access expired |
| `/learn/[courseId]` | Student | Course outline, lessons, own progress, accessible resources and assessment links | Verify active enrolment/entitlement for every protected course/lesson/resource request | Course unavailable, access denied, partial course data, retry without losing position |
| Lesson player / live class | Student | Published lesson media, own resume checkpoint, class time/status and permitted recording | Live and recorded media access follows current enrolment and recording entitlement; signed URLs are bearer credentials | Buffering/offline, stream ended, reconnect, expired link, revoked entitlement and explicit retry |
| Lesson resources | Student / assigned teacher | Student: permitted resource metadata and file. Teacher: resources in assigned scope | Storage object authorization on every operation; private object URLs are not public identifiers | Upload interrupted, download denied, unsupported type/size, retry and duplicate-prevention feedback |
| Notes & doubts | Student / assigned teacher | Student's private notes; course questions and answers shared under course rules | Private notes remain private; teachers see only assigned course discussions; peers see only intentionally shared content | Draft saved/unsaved, moderation, report, deleted/unavailable thread |
| Planner / calendar | Student / teacher | Own or assigned schedule, class, exam, assignment and goal events | No other learner's private planner; teacher scope limited to assignments | Empty period, timezone clarification, partial event-source failure, conflict warning |
| Assignments / quizzes / exams | Student / assigned teacher | Student's own attempts/submissions/results; teacher sees assigned batch submissions | Attempt, answer key, grade and feedback visibility follows release rules; no answer leakage before permitted release | Autosave status, lost connection, duplicate submit protection, late/locked state, review and resubmission |
| `/student/exam-war-room` | Student | Own syllabus coverage, practice history, mistakes and revision evidence | Own results only; AI-generated prediction must be clearly labelled and explainable if/when built | Insufficient evidence, no prediction available, source/date disclosure, retry |
| `/labs` | Student / teacher | Simulation configuration, learner's own experiment state and safe result explanations | Simulations must not imply real-world experimental safety; teacher controls only assigned learning context | Reset, invalid parameter, unsupported device, risk warning and saved/unsaved state |
| Notifications | Each authenticated role | Notifications addressed to current identity and allowed audience | No cross-user notification content or private deep-link data | Empty inbox, unread state, failed delivery/load, stale deep link |
| `/student/receipt/[id]` / payments | Student / finance staff | Student's own receipts and fee ledger; staff sees assigned finance scope | Receipt ID alone grants no access; manual proof is not gateway confirmation | Pending review, rejected proof, mismatch, paid only after authorized confirmation |
| Attendance | Student / assigned teacher / admin | Student's own attendance; teacher assigned roster; admin permitted cohort view | Batch scope and role checks; correction rights restricted | Unknown/not recorded distinct from absent; correction request and audit trail |
| Profile / help | Account owner | Own profile, guardian details, accessibility and language preferences | Sensitive contact/identity fields are masked or editable only by permitted role | Save/error, verification pending, account recovery |
| `/teacher`, `/teacher/learning` | Teacher | Assigned classes, assigned courses/batches, review queue and permitted learner work | Never infer assignment from a URL; verify current staff assignment and active account | No assignments, revoked assignment, partial source health, escalation |
| Teacher Class Studio / Live Control | Assigned teacher | Classes and resources for assigned batch, live status and attendance workflow | Publish/start/end actions require authorized assigned staff; audit actor and timestamp | Draft/publish confirmation, connection loss, duplicate action guard, failed recording publish |
| Teacher review / assessment | Assigned teacher | Assigned student submissions, rubric and feedback | Student data limited to assigned cohort; answer keys and unpublished grades remain protected | Queue empty, submission unavailable, save conflict, feedback history |
| `/admin`, `/admin/applications`, `/admin/courses`, `/admin/finance`, `/admin/learning`, `/admin/settings` | Authorized admin | Operational records within granted admin scope | Admin UI is not a superuser bypass; each action needs server authorization and audit | Empty queue, stale data, confirmation for destructive actions, reason and audit history |
| `/students/manage` | Authorized student-management staff | Student identity, guardian, college/location, cohort, roll and status as permitted | Mask sensitive fields; role-specific edit/export rights; no unrestricted bulk export | Duplicate identity warning, verification, conflict resolution and audit |
| Offline Academy Registry | Authorized staff/admin | Physical batch, verified roster, approved roll, linked class and entitlement dates | Only explicitly approved physical offline students receive free missed-class recording entitlement; online-only and internet-disconnected status do not qualify | Approval reason, effective period, revocation, expired state, access-denied evidence |
| Parent / guardian workspace (design scope) | Verified linked guardian | Only linked learner's published progress, attendance, schedule, payment and announcements | Explicit relationship and active link; never private notes, peer data, answer keys or unrestricted teacher records | Link pending/revoked, no linked learner, consent/access explanation |
| Analytics / exports (design scope) | Authorized admin | Aggregated metrics with definitions, date range, freshness and source coverage | Row-level personal data only for explicit permitted purpose; export scope and actor audited | Stale/partial data, suppressed small cohorts where appropriate, export confirmation |

## Required shared states and component contract

Every data-backed screen must be designed with the applicable states below. A single generic spinner/error panel is not sufficient where independent sections can fail separately.

- **Loading:** skeletons preserve layout; indicate progress only when meaningful.
- **True empty:** explain why there is no content and offer a valid next action; do not invent records.
- **Unavailable:** distinguish network/server/source failure from a successful zero-result query.
- **Permission denied:** concise explanation without leaking whether another person's record exists; provide a safe return/contact path.
- **Expired/revoked:** state that access has changed; clear stale protected media URLs and do not suggest retrying an entitlement that is no longer valid.
- **Partial data:** retain healthy sections, mark failed sections and suppress dependent recommendations.
- **Offline/slow network:** preserve drafts and resume position where supported; show what is saved locally versus confirmed remotely.
- **Success:** state what actually completed, who can now see it and whether further review is pending.
- **Destructive/high-impact action:** preview scope, require explicit confirmation, collect reason where required, and show audit outcome.

## Visual design and review checklist

- [ ] Each route maps to a screen, redirect or documented not-in-scope reason.
- [ ] Each screen shows its persona and access scope in the design annotations.
- [ ] Primary, secondary, destructive and disabled actions are visually distinct.
- [ ] Permission-denied, expired and revoked states are designed, not improvised later.
- [ ] Loading, true-empty, unavailable and partial-data states are distinguishable.
- [ ] Mobile 360×800 and 390×844 are reflowed; tablet 768×1024 and desktop 1440×900 are reviewed.
- [ ] 44px touch targets, keyboard focus, accessible labels, screen-reader announcements and WCAG AA contrast are checked.
- [ ] Bangla text expansion, ৳ formatting, cohort labels and Asia/Dhaka date/time are checked.
- [ ] Sample values are labelled design-only and removed before any real-data screenshot.
- [ ] All permission and business-rule assumptions are verified against source/RLS before implementation; design never substitutes for security tests.

## Explicitly unresolved

- This matrix has not been validated against every current server action, database table or RLS policy.
- Parent routes and some student/teacher sub-screens are design scope, not proof of existing route implementation.
- Current Figma file is blocked by the Starter-plan MCP call limit; this document is not a replacement for editable visual screens.
- No application code, database, Storage object, PR, deployment or production setting was changed while creating this design contract.
