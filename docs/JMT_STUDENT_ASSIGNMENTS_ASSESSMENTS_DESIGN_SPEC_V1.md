# JMT Academy — Student Assignments, Quizzes & Written Assessments Design Specification v1

**Status:** Source-grounded design specification; not implementation approval  
**Priority:** JMT Learning Experience OS — student learning continuity and assessment integrity  
**Repository baseline inspected:** `main` at `e6c7fb6c66323f1b4493be3bf0a20134026f0f53`  
**Design context:** preserve the separate AI Teacher and Exam Question Predictor goals in the North Star; neither is a substitute for assessment workflow quality.

## 1. Product outcome

An assessment should feel like a clear academic contract, not a form buried in a generic portal.

A learner must be able to answer, before beginning:
- What am I being assessed on, and why?
- What is the format, marks, duration, opening/closing window and submission rule?
- Can I save a draft, leave and resume, or make another attempt?
- What happens if the network drops or the deadline passes?
- When and how will marking, feedback and review become available?

During an attempt, the learner must know what is saved, what remains unanswered, how much time is left (when timed), and whether submission is final. Afterward, the learner should receive useful, trustworthy feedback and a route to repair the underlying knowledge gap.

JMT must support three distinct assessment modes:
1. **Assignments/homework:** considered work, possible attachments, due date and teacher feedback. Drafting and revisions matter more than countdown pressure.
2. **Timed MCQ quizzes/model tests:** fixed server-governed attempt clock, objective scoring, answer review according to teacher release policy, and reliable interruption recovery.
3. **Written exams:** structured MCQ/short/long answers, explicit open/close window, final submission, human marking and rubric-based feedback.

A fourth connected surface—**Exam War Room**—is a planning/revision aid, not an assessment attempt and not a predictor of exact future questions.

## 2. Current implementation audit — verified source observations

The inspected source baseline is main commit `e6c7fb6...`. The relevant route/action/migration/test paths are listed below. This section describes source behavior only; it does not claim authenticated runtime, browser or hosted RLS verification.

### 2.1 Current routes and interface

- `app/academic/page.tsx` is a single Academic Centre page for students, teachers, staff and admins. It combines notifications, live classes, assignments, submissions/marking, question-bank authoring, written exams, quizzes/model tests and results.
- Students see assignment cards with a text-answer textarea and an optional HTTPS link. A submit button immediately submits the answer; no student draft editor, upload control, autosave indicator or attempt history is rendered.
- Teachers/staff see a combined submission review list and basic numeric marks + free-text feedback forms. There is no visible marking rubric, annotation workflow, moderation queue, second-marker review or cohort analytics view in this route.
- Written exams are listed with opening/closing dates. Opening one loads all questions in a single form. Submission is described as final. The current page has no visible exam timer, autosave state, question navigator, unanswered-question summary or interruption-recovery explanation.
- MCQ quizzes show title, duration and total marks. Starting creates or reuses one attempt. The attempt form shows all questions and a single submit button; no visible countdown, answer-saved status, question navigator, flag-for-review control, attempt summary or resume notice is rendered.
- Quiz results appear in a basic table with test title, score and submitted timestamp. The UI does not expose per-question feedback, concept-level analysis or an explicit answer-review policy.
- Staff author MCQ quizzes through raw JSON text or a reusable question bank. The question bank UI displays correct answers and explanations to teaching staff. A separate written-exam builder supports MCQ, short-answer and long/creative-answer questions, with model answers/marking guidance kept in staff-only answer-key storage.
- `app/student/exam-war-room/page.tsx` provides exam target score/date/daily-minutes and revision tasks. It is a separate planning tool, not an exam delivery or question prediction guarantee.

### 2.2 Server actions and persistence

- `app/actions/academic.ts` contains `createAssignment`, `submitAssignment`, `gradeAssignment`, `createQuiz`, `startQuiz`, `submitQuiz`, `createWrittenExam`, `submitWrittenExam`, `gradeWrittenExam`, question-bank and bank-to-quiz actions.
- Assignment submission upserts by (assignment_id, student_id), setting `submitted_at` on every submit. It rejects empty text + empty URL and answers over 12,000 characters; it blocks submission if already graded. The student can update their ungraded submission through the database policy/trigger, but the UI does not explain revision semantics. The action itself does not check `due_at` or persist a late flag. This is a key design/contract gap: due date is displayed, but a server-enforced late policy is not visible in the inspected action.
- Assignment attachments are stored as arbitrary HTTPS URLs, not uploaded to a JMT-managed private file workflow in the inspected route. This creates external-link availability, privacy and provenance concerns; do not label it a secure file-upload capability.
- Quiz creation stores question text/options and answer keys separately. Student question reads are limited to question text/options/marks/position; correct answers are held in `quiz_answer_keys` with staff-only RLS. This is a good security foundation.
- `startQuiz` checks published state and availability window, then inserts a single attempt if none exists. It reuses an existing attempt, but the page does not fetch saved answers or start timestamp into the attempt UI. The student cannot see an honest resume state from current data selection.
- `submitQuiz` sends answers only on final submission through the trusted `submit_quiz_attempt` RPC. The RPC rechecks student role, published quiz, current paid enrolment, availability window, answer question/option integrity and server-side duration; it locks the attempt row and computes score from private answer keys. It currently allows unanswered questions to count as zero rather than requiring all questions to be answered. The database enforces a one-attempt-per-student-per-quiz unique constraint. A one-minute server grace exists after duration.
- No quiz answer autosave/draft endpoint was found in the inspected actions or migrations. The attempt row stores answers, but the current UI only writes them at final submit.
- Written exam submission checks published state and open/close time in the server action and database policy. It requires every question to have an answer, inserts one final submission and prevents student update/delete of the submitted answers. The schema has a unique (exam_id, student_id) constraint. There is no written-exam duration field or countdown in the current data model.
- Written exam grading is restricted to authorised admin or assigned teacher/staff, with score maximum and grader identity enforced by database triggers. Grade notifications are emitted by a database trigger.
- Quiz learning-evidence triggers link concept-tagged questions to learning events, concept mastery, spaced-revision tasks and mistake memory. This is a valuable Learning OS foundation, but the resulting mastery is only as trustworthy as question quality, concept tagging, sample size and assessment conditions.

### 2.3 Database and security evidence inspected

- `supabase/migrations/0011_academic_operations.sql`: assignments, assignment submissions, quizzes, quiz questions, attempts, answer-key split and initial course/enrolment RLS.
- `supabase/migrations/0014_written_exams.sql`: written exams, questions, staff-only answer keys, submissions and teacher grading policies.
- `supabase/migrations/0030_admin_payment_calendar_and_paid_quiz_access.sql`: trusted quiz submission rechecks student role, paid-through enrolment and answer integrity inside SECURITY DEFINER RPC.
- `supabase/migrations/0049_student_submission_role_guards.sql`: student role, identity, admission fee, paid-through and course enrolment requirements for assignments, quiz attempts and written exams.
- `supabase/migrations/20261108183319_protect_student_submission_integrity.sql` and `20261108201953_bound_written_exam_scores_and_fail_closed_grader_role.sql`: prevent students/staff from rewriting submitted answer ownership/content and validate grader identity and maximum marks.
- `supabase/migrations/20261108214832_learning_os_quiz_concept_evidence_and_mistake_memory.sql`: concept-linked evidence, mastery, revision tasks and mistake-memory capture.
- `supabase/migrations/20261108215856_learning_os_enforce_quiz_schedule_and_answer_integrity.sql`: server-side quiz schedule, paid-access and question/option validation.
- Tests inspected: `tests/learning-os-quiz-evidence.test.mjs`, `tests/payment-visibility-quiz-access.test.mjs`, `tests/exam-war-room.test.mjs`, `tests/atomic-assignment-auth-throttle.test.mjs`. These are source/migration assertions, not a full interactive assessment E2E suite.

### 2.4 Confirmed gaps and unresolved risks

1. **Assignment late policy:** due date is shown, but the inspected submission action does not enforce or record late submission. Product must decide whether late work is accepted, penalised, or closed; server/database must be authoritative.
2. **Assignment draft vs final semantics:** current upsert can update ungraded work, but there is no explicit draft/submitted/revised state or visible submission history. Resubmission resets submitted_at. This makes auditability and deadline interpretation ambiguous.
3. **Quiz recovery:** current attempt reuse exists, but the page does not load persisted answers/start time and no answer autosave path was found. A student may revisit an attempt but see blank controls while server time continues.
4. **Quiz clock transparency:** the server enforces duration but current UI does not show remaining time. The client must never be the source of truth for expiry.
5. **Written exam resilience:** final-only submission has no draft/autosave/recovery contract. The no-update policy is appropriate after final submission but dangerous if a transient network failure occurs before the database receives the request.
6. **Assessment page density:** one shared Academic Centre is doing too many jobs. It is an operational hub, not an optimal student assessment workspace.
7. **Teacher marking quality:** numeric marks and free text are insufficient for consistent long-answer marking across subjects. Rubrics, criterion-level feedback, moderation and return states need design.
8. **Result release:** current UI appears to show quiz scores once submitted and written-exam score/feedback once present. There is no configurable result-release policy in the inspected UI/model.
9. **Accommodation:** no visible student-specific extra-time, extended availability, reader/keyboard support or approved accommodation workflow was found in the inspected assessment paths. Do not make sensitive disability information visible to ordinary teachers/students; design least-privilege accommodation handling.
10. **Integrity:** no proctoring/lockdown system is evidenced. Do not promise invigilation, plagiarism detection or cheating prevention. Prefer transparent assessment design and proportionate audit signals over invasive surveillance.
11. **AI use:** no AI-generated grade or prediction should silently alter marks, mastery or official results. AI Teacher may explain/reteach; Predictor must remain a separate evidence-backed research product. Human approval is required for official marking and any future generated question set.
12. **Data volume and query behavior:** the page loads up to 60 assessments, 100 submissions and up to 200 question-bank entries in one server page. Pagination, filters and source-specific partial failure states are not represented in this design route.
13. **Course entitlement:** student-facing lists and trusted submission functions must consistently enforce the current JMT course entitlement contract, including paid-through period. RLS and UI queries must not drift apart.
14. **Question quality/provenance:** question-bank entries need source, syllabus version, year/board (where historical), rights status, reviewer, concept mapping, cognitive demand and difficulty calibration before being used for predictor or mastery claims.

## 3. Benchmark research and design decisions

### Moodle Quiz

Moodle's learner documentation describes question navigation, flagged questions, an attempt summary that identifies unanswered items, autosave, returning to a saved attempt, and post-attempt review/feedback controlled by teacher settings. This is a strong recovery and review reference. JMT should adopt the useful mental model, not Moodle's dense legacy navigation or all configuration complexity.

- Learner attempt and review: https://docs.moodle.org/402/en/mod/quiz/attempt
- Quiz viewing/review: https://docs.moodle.org/502/en/Viewing_a_quiz

### Canvas New Quizzes

Canvas documentation and university guidance describe separate due, available-from and until/lock windows, time limits, autosubmit behavior, student result visibility controls, event logs and student-specific time accommodations. These distinctions matter: a due date, an availability window and a per-attempt timer are different rules. Canvas university guides also warn that multiple tabs can conflict with autosave and that network interruptions can leave students uncertain whether work was backed up.

- Canvas New Quiz settings and moderation: https://uchicago.service-now.com/services?id=kb_article&sysparm_article=KB06002204
- Canvas availability and autosubmit: https://community.instructure.com/en/instructure/kb/articles/661024-unknown
- Stanford student exam guidance: https://canvashelp.stanford.edu/hc/en-us/articles/360047626293-Student-Guide-to-Using-Canvas-Quizzes-for-Exams
- University of Cornell exam decision guide: https://learn.canvas.cornell.edu/online-exam-decision-guide/

### Open edX timed exams

Open edX documents an explicit timed-exam state, visible remaining time, automatic ending/submission, and a route for learners to request additional time before starting. JMT should make timing visible and accommodation rules predictable, but must design reconnect behavior based on its own server persistence rather than assuming browser autosubmit always works.

- Timed exam learner documentation: https://docs.openedx.org/en/latest/learners/completing_assignments/timed_exams.html

### Synthesis

- Separate due date, available window and attempt duration.
- Make saved state explicit and recoverable; never equate a local draft with a server-saved answer.
- Give learners an attempt overview and unanswered-question check before final submission.
- Keep the assessment interface focused, with a question navigator and a clear review step.
- Result/answer visibility is a policy decision; do not expose answer keys before the teacher's release point.
- Support legitimate accommodations without leaking sensitive student data.
- Prefer a reliable low-bandwidth, transparent system over invasive proctoring theatre.
- Use concept-level results as learning evidence only with confidence/sample-size labels and teacher-reviewed question quality.

The cited sources are product documentation and university implementation guidance. They are not controlled evidence that copying any particular feature improves JMT learning outcomes.

## 4. Proposed student information architecture

### Assessment centre

A student-first assessment destination should have four views:
- **To do:** available assignments, upcoming deadlines, open tests, written exams and late/overdue items, ranked by urgency and learning relevance.
- **In progress:** saved assignment drafts and active timed attempts, with truthful sync/time-left status.
- **Submitted:** submission receipt, timestamp, late status where applicable, and marking status.
- **Feedback & review:** marks when released, teacher comments/rubric, permitted answer review, concept gaps and recommended next learning action.

Filters: course, assessment type, status, chapter/topic and date range. Search by title and course. Do not place teacher-only authoring forms in the student assessment surface.

### Assessment detail and preflight

Before starting, show:
- Title, course, chapter/topic and learning objectives.
- Format, question count, total marks and marking method.
- Open-from, due-by and hard-close times in Asia/Dhaka, with explicit date/time labels.
- Attempt count/retake policy; whether the attempt resumes or starts fresh.
- Duration and what happens when the timer expires.
- Whether answers are autosaved and what to do offline.
- Attachment/allowed file types and maximum sizes if applicable.
- Result/answer release timing.
- Accommodation route and support contact.
- A concise confirmation of irreversible actions.

Do not infer unavailable data. Hide irrelevant metadata rather than showing placeholder zeroes.

## 5. Assessment interaction specifications

### 5.1 Assignments and homework

**Lifecycle:** Not available → Available → Draft in progress → Submitted → Late (if policy allows) → Under review → Feedback released → Revision requested / Resubmitted / Complete.

**Student workspace**
- Assignment card shows course, chapter, teacher, due time, maximum marks, submission format, status and remaining time in human language.
- Detail page contains teacher instructions, linked resources and rubric/marking criteria when supplied.
- Draft editor separates saved draft from submitted work. Show last saved time, sync state and a manual Save action even when autosave is enabled.
- Text editor supports Bangla and English, lists, equations and long-form answers. Draft survives route changes and recoverable refresh under an explicit local/server persistence contract.
- Attachment upload uses a private managed storage contract, validated type/size, progress, retry and a clear published/submitted status. Do not use arbitrary public URLs as a substitute for secure upload.
- Before submit, show a review page with word/file summary, due/late state and explicit final-submit confirmation.
- After submit, show receipt ID, timestamp, version, status and downloadable/copyable receipt.
- If resubmission is allowed, show version history and the latest submitted version. If not allowed, clearly explain why. Do not silently overwrite a previous submission.
- If late work is accepted, label it Late and record server timestamp. If not accepted, explain the cutoff and contact route; no client clock override.
- Teacher feedback includes criterion-level score, annotated comment/overall feedback, rubric total and next-step guidance. Student can acknowledge feedback or request clarification without changing the graded answer.
- If teacher requests revision, preserve prior version and show the new deadline/attempt policy.

**Teacher workspace**
- Assignment authoring: instructions, course/chapter/concept, due date, late policy, submission type, allowed attachments, max marks, rubric, release date, resubmission policy and publish preview.
- Submission inbox: missing/submitted/late/under-review/graded/revision-requested filters; sort by due time/course/student; safe pagination.
- Marking: rubric criteria with criterion descriptions, marks and feedback; overall feedback; save draft grade; publish feedback separately. Show student identity only to assigned teaching staff.
- Bulk actions require preview and explicit confirmation; bulk grading is not v1.
- Audit history records who changed marks, feedback, due dates and publication state.

### 5.2 Timed MCQ quizzes and model tests

**Preflight**
- Show opening/closing window, duration, marks, number of questions, one-attempt rule (if still configured), result release and whether navigation/flagging is allowed.
- Confirm current eligibility before creating an attempt.
- Explain that the server clock governs expiry; browser countdown is a display of server-issued deadline, not authority.
- If one attempt only, say so before Start.

**Attempt workspace**
- Focused, distraction-minimised layout. Persistent title and countdown with accessible textual time; no alarm-only warnings.
- Question navigator with answered/unanswered/flagged states, not colour alone.
- One question per screen or grouped pagination based on user preference and device width; retain scroll/focus on navigation.
- Answer selection saved to server with idempotent versioned writes; show Saved, Saving, Offline draft (not server-saved), Syncing or Save failed.
- Autosave should debounce, but also save on explicit navigation/blur and before final submit. A local encrypted draft may bridge short outages only if a separately reviewed device-storage/privacy contract is implemented.
- On reconnect, reconcile with server version; if two sessions conflict, do not silently overwrite. Warn that multiple active sessions are unsupported unless concurrency is explicitly solved.
- Flag for review and return to flagged questions.
- Final review screen lists unanswered/flagged items and asks for explicit confirmation.
- At expiry, the server finalizes the last acknowledged saved answers under the published policy. If a final write is not possible, show a pending/failed state and a safe retry path; never claim submission before server confirmation.
- After submit, show a receipt and processing state. Score appears only when result policy permits.

**Integrity**
- Keep answer keys separate and inaccessible to students before/after review release.
- Server validates student role, course entitlement, quiz availability, attempt identity, question membership, option index, timer and finalization.
- A single active attempt must be idempotent under duplicate clicks and concurrent sessions.
- Record attempt start, answer revisions, reconnects, finalization and grading events with minimal necessary metadata. Avoid collecting invasive device fingerprints or location.
- Randomisation, question pools and shuffled options are optional policy controls; do not imply that a question bank alone prevents collusion.
- Do not lock browser navigation or request camera/microphone access in v1.

### 5.3 Written exams

- Preflight mirrors quiz rules but distinguishes written-answer formats and whether duration is limited or only an open/close window applies.
- Show marks per question and answer length guidance where useful.
- Autosave draft answers with visible sync state and version history before final submission. Final submit remains irreversible under the current one-submission rule.
- Question navigator shows unanswered questions and permits review before submit.
- Long-answer editor supports Bangla/English, mathematical notation, lists and structured paragraphs. Mobile typing must not lose cursor position when autosaving.
- At hard close, server policy decides whether the last acknowledged draft is submitted, locked for manual recovery or rejected; this policy must be explicit before implementation.
- After final submission, show receipt/time; do not allow answer edits. A technical failure before server acknowledgement must not show a false success.
- Human marking uses a rubric, partial-credit criteria, criterion comments, overall feedback and moderation for disputed/high-stakes assessments.
- Student review page displays score, rubric and teacher feedback only after release; model answers/answer keys remain hidden until the configured review window.

### 5.4 Results, feedback and learning continuity

- Result centre separates score from learning interpretation. Show earned/possible marks, percentage only when meaningful, submission time, late status, marking status and release time.
- Per-question review may show selected response, correct response and explanation only when teacher release policy allows.
- Concept analysis uses only teacher-reviewed mappings and sufficient evidence. Show confidence/sample count and avoid presenting one small quiz as a definitive mastery measure.
- Link each identified gap to a lesson, private note, targeted practice and AI Teacher explanation.
- AI Teacher may help explain a mistake with citations/uncertainty; it must not change official marks.
- Exam Question Predictor is separate: forecast confidence and corpus coverage must be explicit, never guaranteed questions or fabricated probability.
- Teacher override and mark correction require reason, identity, timestamp and audit trail.

## 6. State catalogue

| State | Student experience |
|---|---|
| Loading | Stable skeleton; no fake zero score or false empty list |
| No assessments | Clear explanation and link to enrolled course content |
| Upcoming | Opens-at date/time, time zone and preflight requirements |
| Available | Start/open action with eligibility recheck |
| Draft | Local vs server save state and last saved timestamp |
| Saving | Progress/status; prevent duplicate save without blocking typing |
| Save failed | Preserve local content, show retry and explain server copy is not confirmed |
| Offline | Read-only metadata; draft clearly labelled unsynced; no false submission |
| Reconnecting | Reconcile versions and server deadline; do not reset timer |
| Conflict | Compare versions and allow safe recovery; no silent last-write-wins |
| Active timed attempt | Server-derived deadline, countdown, question navigation, answered/flagged summary |
| Expiring | Accessible warnings at configurable thresholds; not colour/animation alone |
| Time expired | Server finalization receipt or explicit pending/failed recovery |
| Submitted | Immutable receipt, timestamp, status and next step |
| Late | Clear late label and applied policy; no inferred browser time |
| Under marking | Expected release window if supplied; no fabricated turnaround promise |
| Feedback released | Marks, rubric, comments and allowed answer review |
| Revision requested | Prior version retained, new due date/policy clear |
| Denied | Explain eligibility or availability without leaking other students' records |
| Revoked entitlement | No new attempt/submission; preserve own historical receipt/feedback according to policy |
| Cancelled/withdrawn | Explain teacher cancellation and whether attempt/grade is void |
| Partial service failure | Keep healthy assessment sections visible; failed sources do not masquerade as empty |
| Duplicate session | Identify active session and prevent silent overwrite |
| Accessibility mode | Keyboard/screen-reader/zoom operation with no timer-only or colour-only information |

## 7. Proposed policy and data contracts — design only, no migration

Before implementation, decide and document:
1. Assignment due date vs hard close; late acceptance/penalty; resubmission count; revision workflow.
2. Quiz availability window vs duration; timer grace; whether partial answers submit at expiry; result/answer release; retake count.
3. Written exam duration (if any), hard-close behavior and server-side finalization policy.
4. Individual accommodations and time extensions; who can approve, how to audit, and how sensitive reasons are protected.
5. Assessment deletion/withdrawal after attempts exist; archival rather than destructive deletion.
6. Grade appeal/recheck process and mark-change audit trail.
7. Retention/export/deletion for answers, attachments, attempt events and grade records.
8. Whether teacher/staff can view all assigned student attempts or only submissions in assigned course/batch; ensure the route and RLS agree.

**Suggested contracts**
- Add explicit assignment submission status and version history (draft/submitted/late/revision_requested/graded) rather than inferring status from a single nullable marks field.
- Persist server-authoritative submission time and late classification; never trust client timestamps.
- Add assessment policy fields for availability, due and hard-close semantics separately.
- Persist quiz attempt start/deadline and server-acknowledged answer revisions. Do not rely on browser timers or localStorage as authoritative.
- Make finalization idempotent and transactional; support a clear receipt identifier.
- Written exam draft answers need a distinct draft store or status contract before the existing immutable final submission row is created.
- Keep answer keys/rubrics/model answers under staff-only RLS until their release window.
- Store private attachment objects in a private bucket with per-request entitlement checks and short-lived signed URLs; define malware scanning/content validation and orphan cleanup.
- Add audit records for accommodation changes, grading, mark changes, late overrides and moderation.
- Keep all actions role- and course-assignment-scoped; student operations must bind to auth.uid and active paid enrolment per the current business rules.

## 8. Measurable acceptance criteria — release gates, not achieved results

### Student task performance
1. At least 90% of test learners identify the next due assessment and its exact deadline within 10 seconds.
2. At least 90% start the correct assessment after accurately answering its duration, attempt count and submission rule.
3. At least 95% of learners can identify whether a draft is server-saved, locally pending or failed without assistance.
4. At least 95% complete a 20-question timed quiz using question navigation and final review without losing an acknowledged answer.
5. At least 90% can locate teacher feedback and convert a weak concept into a relevant lesson/practice action within 30 seconds.

### Reliability
6. In 500 scripted network interruption cases, no server-acknowledged answer is lost; all unsynced answers are visibly identified.
7. Duplicate submit, retry and double-click produce exactly one final submission/attempt receipt.
8. Reconnect never resets or extends server-authoritative time unless an approved accommodation/incident policy does so.
9. A deadline boundary test at -1s, exact time and +1s produces the documented policy consistently across UI/action/database.
10. No false success state appears when persistence fails; no final submission is claimed before server acknowledgement.
11. For assignments, every accepted late submission is labelled and timestamped by the server; rejected late work cannot bypass the policy through direct action/RPC calls.

### Security and fairness
12. Student cannot read answer keys, rubric/model answers before release, another student's attempt, submission or feedback.
13. Unassigned teacher/staff cannot read or grade another course's assessment or submission by changing IDs.
14. Student cannot alter own score, grade identity, submitted_at, attempt owner or final submitted answer.
15. Expired/unpaid/revoked enrolment cannot create or finalize a new assessment attempt, consistent with the approved entitlement policy.
16. Accommodation changes are audited and visible only to the learner and authorised staff.
17. No camera, microphone, geolocation or invasive device fingerprint is requested by default.
18. All grading changes and late overrides are attributable and reviewable.

### Accessibility and responsive quality
19. WCAG 2.2 AA target: contrast 4.5:1 normal text / 3:1 large text, visible/unobscured focus, keyboard-only completion and screen-reader question/status announcements.
20. All primary touch actions at least 44×44 CSS px; question navigator remains usable at 320/390 px.
21. At 200% zoom and 320, 390, 768 and 1024 CSS px widths, no essential control or answer is clipped and no horizontal page scroll is required.
22. Timers have a non-colour text equivalent, configurable warning and accommodation path; avoid flashing or disruptive motion.
23. Bangla, English, mixed script, scientific notation, chemical equations, mathematical expressions and long written answers are tested.

### Academic validity
24. Question-bank entries used for mastery/predictor work have provenance, syllabus version, reviewer and rights status.
25. Concept mastery is not asserted from a single low-sample assessment; confidence/sample size and assessment conditions are shown.
26. AI-generated content is clearly labelled and teacher-reviewed before it becomes an official assessment or marking key.

## 9. Verification plan before implementation

- Unit/integration tests for due-date semantics, timer boundaries, answer validation, idempotent finalization, autosave versions, conflict handling, grade immutability, role scoping, paid-through eligibility and accommodation.
- RLS matrix: anonymous, student eligible, student unpaid/expired/revoked, another student, assigned teacher, unassigned teacher, staff, admin.
- Browser E2E: assignment draft/save/submit/resubmit/late/feedback; quiz start/autosave/reconnect/resume/expiry/review; written exam draft/final submission/marking/release.
- Network profiles: normal Wi-Fi, high latency, constrained 3G, mid-write disconnect, browser refresh, device sleep, offline-to-online, duplicate tabs.
- Accessibility: keyboard-only, NVDA or TalkBack, 200% zoom, high contrast, reduced motion, Bangla/English mixed text.
- Assessment security: inspect network payloads and direct API/RPC calls to prove answer keys and other students' records never leak.
- Content validity: teacher review of subject-specific rubrics, question difficulty, syllabus alignment and concept tagging.
- Report automated and human QA separately. Static source-pattern tests do not establish actual learner experience.

## 10. Design direction and screen quality

The current single Academic Centre is a functional starting point, not the final student assessment experience. Do not merely reskin the current long page.

Explore a focused assessment workspace with:
- A calm, high-clarity academic visual language; typography that handles Bangla and scientific notation exceptionally.
- A strong task hierarchy: due next, in progress, awaiting feedback, completed.
- A dedicated distraction-minimised attempt surface with persistent save/time status.
- Clear visual distinction between a low-stakes practice quiz, graded homework and high-stakes exam.
- Precise motion and feedback, not decorative dashboards, oversized cards or generic gamification.
- Desktop two-pane review where helpful; mobile-first single-column attempt flow with thumb-friendly navigation.
- Consistent JMT identity, not a clone of Moodle, Canvas or ACS.

The visual frames remain provisional. This specification does not create or approve editable Figma screens.

## 11. Unresolved owner/policy decisions

These choices materially affect product behavior and must be settled before implementation:
1. Should assignments accept late submissions by default, accept with a teacher-set penalty, or hard-close? Proposed default: teacher explicitly chooses; default accepts late with a visible late flag only if no penalty policy has been set, to avoid silent lockout.
2. Should assignment students be allowed to resubmit until graded, or must the teacher explicitly request a revision? Proposed default: one initial submission plus explicit teacher-requested revision with preserved history.
3. Should quiz results be immediate or teacher-controlled? Proposed default: objective score immediate only when teacher enables it; answer key/explanation release is separately configured.
4. Should a timed quiz auto-finalize the last server-saved answers at expiry? Proposed default: yes, only when the attempt and server save state are healthy; otherwise preserve explicit recovery evidence and mark pending rather than fabricate success.
5. Should written exams have a duration separate from opening/closing dates? Proposed default: support both, independently configurable.
6. Which roles can approve time accommodations? Proposed default: admin or explicitly assigned lead teacher, with reason kept private and audit logged.
7. Should students be able to appeal a grade? Proposed default: yes, a time-limited clarification/recheck request that does not modify the original submission.

## References

- Moodle learner quiz attempt, navigation, autosave and review: https://docs.moodle.org/402/en/mod/quiz/attempt
- Moodle quiz review and resuming saved attempts: https://docs.moodle.org/502/en/Viewing_a_quiz
- Canvas New Quizzes settings, logs and accommodations: https://uchicago.service-now.com/services?id=kb_article&sysparm_article=KB06002204
- Canvas availability windows, time limits and autosubmit: https://community.instructure.com/en/instructure/kb/articles/661024-unknown
- Stanford Canvas exam/network interruption guidance: https://canvashelp.stanford.edu/hc/en-us/articles/360047626293-Student-Guide-to-Using-Canvas-Quizzes-for-Exams
- Cornell assessment modality comparison: https://learn.canvas.cornell.edu/online-exam-decision-guide/
- Open edX timed exam behavior and additional-time requests: https://docs.openedx.org/en/latest/learners/completing_assignments/timed_exams.html
