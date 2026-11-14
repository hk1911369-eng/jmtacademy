
# JMT Academy — Best-in-Class Feature Benchmark Standard

**Owner directive recorded:** 14 November 2026  
**Applies to:** every feature, workflow, screen, API, data model, integration and operating process in JMT Academy.  
**Status:** mandatory product and engineering standard; not a claim that benchmark work or all referenced capabilities are complete.

## 1. The standing owner rule

Before designing or implementing **any** JMT feature, research the strongest relevant products, websites, apps, open-source systems and evidence for that specific job. Identify what they do exceptionally well, where they fail or impose trade-offs, and then design an original JMT solution that is materially better for the intended student, teacher, guardian, staff member or administrator.

This rule applies to small details as well as major modules: navigation, onboarding, search, forms, study planning, lesson playback, assessments, payments, meetings, notifications, dashboards, support, administration, security, accessibility, analytics, integrations, automation and every future feature.

The owner's phrase “one hundred times better” is a direction for ambition, not a numerical performance claim. Never advertise a 100x advantage without a defined metric, comparable baseline, valid measurement and reproducible evidence. Translate the ambition into measurable superiority: fewer steps, lower task time, fewer errors, higher task success, better accessibility, stronger learning outcomes, faster recovery, safer authorization, clearer explanations and more reliable operations.

**Non-negotiable:** JMT should not copy a competitor. Benchmark the quality of problem-solving, pedagogy, interaction patterns and operational controls. Use original JMT branding, interface, content, code and assets, and comply with copyright, licence, privacy and contractual limits.

## 2. Required benchmark-before-build workflow

No feature moves directly from idea to code. Each feature must have a benchmark record with the following:

1. **User problem and outcome** — who needs the feature, in what context, what currently blocks them, and what success means.
2. **Best-fit reference products** — at least one strong primary reference for the exact job, with a second independent or complementary reference where useful. Do not choose a famous product merely because it is famous.
3. **Evidence quality** — record first-party documentation, real product behavior, open-source implementation, practitioner evidence, independent research, user reviews or support complaints separately. Label vendor claims as vendor claims.
4. **What works** — identify the specific affordances, interaction details, workflow shortcuts, pedagogy, architecture or controls that make the reference strong.
5. **Trade-offs and failure modes** — cost, paywalls, complexity, accessibility gaps, privacy risks, onboarding burden, lock-in, over-notification, poor learning transfer, operational limits and common user complaints.
6. **JMT design decision** — explicitly state what principle JMT will adapt, what it will reject, and what original capability will differentiate JMT.
7. **Acceptance criteria** — testable requirements for happy paths, edge cases, failure states, mobile, accessibility, security, performance, localization and role boundaries.
8. **Measurement plan** — define baseline, target, population, method, guardrails and time window before launch. Do not optimise proxy metrics that undermine the actual learning or user outcome.
9. **Verification evidence** — repository path/commit, test run, browser/device coverage, database/security checks, source review or production evidence as applicable.
10. **Status** — label each atomic requirement as idea, researching, specified, in development, implemented, test-verified, production-verified, blocked or retired. Never promote a status without evidence.

When there is no credible product reference, say so. Use research, standards and a well-defined problem model instead of inventing a “best app.”

## 3. Benchmark quality rubric

Score each candidate and the JMT implementation from 1–5. A score must include a short evidence note; do not give a number based only on taste.

| Dimension | What to examine |
|---|---|
| Learning or task outcome | Does it measurably help the user learn, finish the job correctly or make a sound decision? |
| Clarity and cognitive load | Is the next action obvious? Are concepts, states and consequences understandable? |
| Task efficiency | How many steps, decisions, repeated entries and avoidable waits does the task require? |
| Feedback and recovery | Are results, errors, saving, progress and recovery clear and timely? |
| Personalisation and user control | Is adaptation useful, explainable, editable and respectful of user agency? |
| Accessibility and inclusion | Keyboard, screen reader, focus, contrast, captions, reduced motion, language and cognitive accessibility. |
| Mobile and device quality | Does it work well on Android phones, tablets and desktop without a squeezed or degraded experience? |
| Low-bandwidth resilience | Does it remain usable on slow, unstable or interrupted connections? |
| Security and privacy | Are sensitive actions authorised server-side, private data minimised and events auditable? |
| Teacher/admin operations | Can authorised staff understand, oversee and correct the workflow without unsafe access? |
| Bangladesh fit | Bengali/English, Bangladesh dates/time, BDT, local education cohorts, MFS and local connectivity. |
| Interoperability and cost | Can JMT extend or replace providers safely? What are hosting, support, licensing and transaction dependencies? |

Do not average away a release-critical weakness. Security, privacy, payment integrity, academic correctness, child safety and data integrity are gates: a low score in a critical dimension blocks release even when the overall score looks attractive.

### Measurement rules

- Set the metric and baseline before implementation; retain an auditable test protocol.
- For student UX, prefer task completion, time-to-first-useful-study-action, lesson continuation success, recovery after interruption, comprehension and student-reported clarity over time-on-site.
- For learning, use verified retrieval/practice performance, retention intervals, curriculum coverage and validated assessment outcomes. Separate activity from mastery.
- For teacher/admin operations, measure handling time, unresolved queues, correction rate, data completeness and permission errors.
- For payments, measure verified transaction completion, duplicate/false-positive rate, reconciliation exceptions, refunds and settlement match. A redirect or uploaded screenshot is not proof of payment.
- For meetings, measure successful joins, audio/video reliability, moderation controls, recording integrity, device compatibility and bandwidth resilience.
- For accessibility, test against WCAG 2.2 AA as the minimum target and include keyboard, screen reader, zoom, contrast and touch scenarios.
- Report sample size, dates, device/network mix, exclusions, uncertainty and known confounders.

## 4. Source and intellectual-property rules

Use evidence in this order, while matching source type to the question:

1. Current first-party technical documentation and observed product workflows for what the product actually supports.
2. Standards, official platform documentation and open-source code/licences for technical and interoperability claims.
3. Peer-reviewed research, systematic reviews and independent evaluations for claims about learning effectiveness, safety and usability.
4. Practitioner case studies with concrete shipped work and transparent methods.
5. Support documentation, user reviews and community reports to identify friction and failure modes; verify recurring claims before treating them as fact.

For each source, capture title, publisher/author, URL, retrieval date, source type, last-updated/publication date where available, what it supports and limitations. Distinguish a vendor feature claim from independently demonstrated learning impact. For rapidly changing payment methods, prices, policies and product plans, re-check provider documentation and merchant terms immediately before implementation.

Do not copy source code, proprietary UI, design assets, question banks, textbooks, video, brand marks, private data or other protected material. Record open-source licences and attribution obligations before reuse. When rights are unclear, implement an original alternative or request permission.

## 5. Reference map — first benchmark candidates

These are specialist reference candidates, not a universal ranking and not a commitment to copy their products. The benchmark scope for each feature must be rechecked when implementation begins.

| JMT feature area | Strong reference candidate(s) | Specific lesson for JMT | Evidence and limitations |
|---|---|---|---|
| Learning Experience OS | Duolingo learning path/teaching method; Khan Academy mastery; W3C WCAG 2.2 | Guided learning progression, purposeful practice, clear next action, mastery over superficial streaks, accessible and mobile-first interaction | Duolingo/Khan Academy sources are first-party; their product claims are not independent evidence of every outcome. WCAG is a normative standard, not a visual design recipe. |
| Exam Question Predictor AI | Chronological forecasting and educational measurement research; official Bangladesh board/NCTB question and syllabus sources | Provenance, syllabus-version matching, temporal holdouts, leakage prevention, calibrated uncertainty and teacher-reviewed topic mapping; never claim exact future questions | No credible general-purpose competitor can be assumed to predict Bangladesh board papers accurately. Quality must come from an authenticated corpus and reproducible backtests. |
| JMT AI Teacher | Khanmigo; Khan Academy teacher/learner safety guidance | Hints-first Socratic tutoring, guided discovery, teacher oversight, clear AI limitations, privacy and escalation | First-party product documentation explains intended behavior and safeguards; independently evaluate correctness, pedagogy, Bengali quality and child safety. |
| Academic Command Centre / Planner | MyStudyLife; Khan Academy mastery challenges | Unified calendar for classes, rotating schedules, tasks and exams; meaningful reminders, revision planning, catch-up and mastery-based review | MyStudyLife feature descriptions are first-party. Verify which features are free/paid and do not assume all plans include them. |
| Virtual Lab Network | PhET Interactive Simulations; GeoGebra Math Practice | Inquiry-led exploration, immediate causal feedback, visual mental models, multiple representations (numbers, graphs, motion), adaptive hints and accessible alternatives | PhET describes research and classroom testing; validate every JMT simulation against subject-expert expected values and curriculum. |
| Learning Community | Piazza | Student question/answer participation, collaborative answer synthesis, instructor endorsement, controlled anonymity, unresolved-question queues and resource sharing | First-party product documentation; assess moderation, safety, privacy and local student needs independently. Do not reproduce a proprietary community interface. |
| Smart Assessment System | Moodle Quiz/Question Bank/Assignment; Gradescope | Reusable question banks, random selection, persistent attempts, student flags, rubric-based marking, annotated feedback, answer groups and item analysis | Official docs describe available workflows; some Gradescope capabilities and Moodle plugins may depend on institutional or paid plans. |
| Academic Productivity Toolkit | GeoGebra/Desmos for mathematics; Replit for browser-based coding sandbox | Interactive mathematics notation/visualisation, fast feedback, runnable code preview and isolated development environments | Replit documentation explicitly distinguishes sandbox preview from production. JMT execution environments must be isolated from academy systems and secrets. |
| Live Classes and Meetings | BigBlueButton with Moodle integration | Education-native class scheduling, moderator controls, waiting room, presentations, shared notes, multi-user whiteboard, polls, breakout rooms and managed recordings | Hosting, concurrency, retention, privacy and operational support depend on deployment/plan. The current JMT link field is not a native meeting system. |
| Teacher, Parent and Admin Workspace | Moodle roles and course operations; MyStudyLife parent view; Gradescope instructor workflow | Least-privilege roles, assigned-course visibility, teacher review queues, guardian visibility with consent, clear reports and auditable corrections | Each product has different institutional assumptions. JMT must use its own safeguarding and permission model. |
| Bangladesh Payments and Finance | Direct bKash merchant API; SSLCOMMERZ, aamarPay, shurjoPay and PortPos provider APIs | Provider-neutral adapters, hosted checkout, server-to-server status verification, signature/IPN validation, idempotency, refunds where supported, settlement reconciliation and clear method availability | Each provider requires its own eligibility, account, contract, credentials and test-mode verification. Aggregator channels are not the same as a direct wallet API. Never promise every MFS/card/EMI/QR method without checking the actual merchant package. |

## 6. Initial evidence register

The following first-party and independent sources were inspected for this initial benchmark pass on 14 November 2026.

### Learning experience, pedagogy and personalisation
- Duolingo, [The Duolingo Teaching Method](https://blog.duolingo.com/duolingo-teaching-method/) — first-party explanation of interactive lessons, personalization, appropriate challenge and motivation.
- Duolingo, [The Duolingo Handbook](https://handbook.duolingo.com/) — first-party product/engineering decisions, including the shift toward a guided path and mastery.
- Khan Academy, [Mastery Challenges](https://support.khanacademy.org/hc/en-us/articles/360037127892-What-are-Mastery-Challenges-in-course-mastery) — personalized spaced review based on elapsed time and mastery level.
- MyStudyLife, [How to use MSL](https://care.mystudylife.com/en/articles/9502657-how-to-use-msl) and [FAQ](https://mystudylife.com/faq/) — classes, tasks, exams, rotating schedules, calendar views, focus timer and parent view. Product feature claims; plan boundaries must be checked.
- Ruitenburg et al. (2026), [Meta-analysis of retrieval, distributed and interleaved practice in authentic school classrooms](https://app.cochat.ai/from/chatgpt/fetch/papers/10.1007/s10648-026-10225-5), *Educational Psychology Review*, DOI: 10.1007/s10648-026-10225-5 — meta-analysis of 233 effect sizes from 53 studies (7,303 participants). Reports average testing effect g=0.37, spacing effect g=0.20 and interleaving effect g=0.40, with important moderators. This supports evidence-informed practice design, not a guaranteed JMT effect size.

### Virtual labs, mathematics and coding
- PhET, [About PhET and simulation design](https://phet.colorado.edu/en/about) — first-party simulation principles: inquiry, interactivity, visible mental models, multiple representations, real-world connection and immediate feedback.
- GeoGebra, [Teachers: Using Math Practice in class](https://help.geogebra.org/hc/en-us/articles/15294353125533-Teachers-Using-GeoGebra-Math-Practice-in-class) — interactive notation, adaptive hints, fast feedback and multiple solution paths.
- Replit, [Working with code](https://docs.replit.com/build/code/working-with-code) — cloud sandbox and preview; use as a reference for isolation and student workflow, never as a reason to run untrusted student code in production.

### Community, assessments and live classes
- Piazza, [Product overview](https://piazza.com/product/overview) — student Q&A, collaborative answers, instructor endorsements, anonymity options and class resources.
- Moodle, [Quiz activity](https://docs.moodle.org/405/en/Quiz_activity), [Assignment activity](https://docs.moodle.org/500/en/Assignment_activity) and [BigBlueButton activity](https://docs.moodle.org/500/en/BigBlueButton) — reusable question banks, submission/rubric workflows and learning-platform integration.
- Gradescope, [Assignment types](https://guides.gradescope.com/hc/en-us/articles/22244660005901-Assignment-Types) and [Grading with rubrics](https://guides.gradescope.com/hc/en-us/articles/22249389005709-Grading-submissions-with-rubrics) — varied assignment workflows, rubric-based grading and feedback; check plan restrictions.
- BigBlueButton, [Features](https://bigbluebutton.org/features/) and [Moodle integration](https://bigbluebutton.com/docs/integrations/moodle/overview) — teaching-focused conferencing and classroom collaboration.

### Payments, accessibility and security
- bKash, [Create Payment API](https://developer.bka.sh/docs/create-payment-1) — tokenized checkout and merchant onboarding dependencies.
- SSLCOMMERZ, [Developer integration documentation](https://developer.sslcommerz.com/doc/v4/) — hosted/easy checkout, IPN and mandatory transaction validation.
- shurjoPay, [REST API integration](https://shurjopay.com.bd/frontend-developers/direct-integration-with-api) — authentication, initiation and verification APIs plus sandbox.
- aamarPay, [Official website](https://www.aamarpay.com/) and [Education pricing/product page](https://www.aamarpay.com/index.php/pricing) — first-party description of card, MFS, wallet, net banking, QR and education offer; commercial terms must be confirmed directly.
- PortPos, [Developer API](https://developer.portpos.com/documentation.php) and [Payment options support note](https://support.portpos.com/support/solutions/articles/150000079275/) — API sandbox and described MFS/card/net banking options; support note is dated 2023 and must be revalidated.
- W3C, [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/) — standards baseline for JMT accessibility; target WCAG 2.2 AA minimum.

## 7. Current JMT baseline — inspected 14 November 2026

This section separates actual code, test-only foundations and live-site observations. It is a scoped snapshot, not a full release certification.

### Current main branch inventory

Repository: [hk1911369-eng/jmtacademy](https://github.com/hk1911369-eng/jmtacademy), inspected main commit **141d49343d80452c0871cec77fbc02367346e847**.

- 35 application page/API route files.
- 14 server-action modules containing 54 named exported operations.
- 13 reusable React UI components in the main components directory.
- 116 Supabase migration files.
- 32 automated test files.

These counts describe repository structure. They are **not** a count of distinct user-facing features, do not prove every path is used, and do not prove live behavior.

### Main-branch capabilities with code evidence

| Area | Evidence in main | Correct status wording |
|---|---|---|
| Authentication and account | Sign-up, sign-in/out, password reset/update, email confirmation routes and role-based routing | Implemented in code; current live acceptance not exhaustively verified |
| Public catalogue and discovery | Homepage, course catalogue with search/filter, course detail, public about/contact/help/policy pages | Implemented; catalogue currently has zero courses |
| Courses and teaching content | Course studio, publication/archive actions, multi-subject model foundations, chapters, lessons and resources | Implemented in code; production course data is empty |
| Admission/enrolment | Course application submission and review, learning-format selection and enrollment lifecycle | Implemented in code; full real student journey not live-verified |
| Payments | Manual bKash/Nagad/Rocket reference submission, sender number, proof upload and admin review; receiving-number settings | Manual workflow implemented in code; **no automatic online checkout** |
| Finance | Manual finance entries, monthly dashboard, income/expense/refund recording and export path | Implemented in code; end-to-end accounting reconciliation not certified |
| Live classes | Teacher/admin can create scheduled class records with an external meeting URL and recording URL | Scheduling/link management only; **not native JMT video conferencing** |
| Assignments and assessments | Assignment creation/submission/grading, quizzes, question bank, written exams and written-exam grading flows | Implemented in code; real student/teacher acceptance journeys remain required |
| Student management | Profile updates, role/account activation, attendance, follow-ups and exports | Implemented in code; no broad live operational usage verified |
| Learning OS | Subject/concept foundations, study goals, learning events, mastery/mistake models, revision actions and Exam War Room | Foundations in main; production learner evidence is currently sparse/empty |
| Labs | Virtual-lab route/studio and simulation component foundation | Implemented in code; scientific/content QA and real learner activity must be verified |
| Lesson community | Lesson discussion, pinning, reactions and bookmarks | Lesson-linked discussion primitives; not a full moderated, real-time community platform |
| Notifications/localization | In-app notifications and Bengali/English language foundations | Partial capability; delivery reliability and full coverage remain to be verified |

### Important unverified or missing capabilities in inspected main

- No deployed Exam Question Predictor model or complete rights-cleared, authenticated historical question corpus.
- No completed multi-subject AI Teacher knowledge base or production AI tutoring experience verified.
- No full parent/guardian workspace verified on main.
- No secure offline-batch roll-number roster and server-side recorded-media entitlement checks verified.
- No native JMT conferencing system; class records currently hold external meeting links.
- No complete academic toolkit (scientific calculator, full matrix/vector workbench, safe HTML/SQL/C sandbox) verified as a dedicated student workflow.
- No automatic payment checkout is enabled: the current payment-create API handler returns HTTP 410 and directs students to manual submission.
- No service-worker-based offline/PWA caching lifecycle was verified in the previous live audit. Do not claim offline browser operation.
- No production-ready multi-provider merchant configuration, webhook verification, automated refund or full settlement workflow has been demonstrated.

“Not found/verified in inspected main” is not the same as proof that no prototype exists anywhere. Recheck branches and current code before a future acceptance decision.

### Draft PR #42 — additional work is not live

Open draft [PR #42](https://github.com/hk1911369-eng/jmtacademy/pull/42) contains additional code and research beyond main, including student practice/analytics foundations, more virtual-lab catalogue work, lab notebooks and practical assessment/review workflows. It is not merged into main and must be labelled as a draft-branch or test-project foundation, not a live JMT feature. At the inspection checkpoint, the JMT Test project had 17 virtual-lab catalogue rows, 8 academic subjects, 24 course-subject mappings and 17 learning concepts; there were no published practice questions, lab notebook records or learner mastery/activity events. Catalogue rows are not the same as accepted interactive labs.

### Production and test database boundary

Read-only database inventory on 14 November 2026 showed:
- Production project jpoxrxjixkcgjqvyyznw: 0 courses, 0 enrollments, 0 lessons, 0 live classes, 0 assignments, 0 quizzes, 0 practice questions and 0 learning events at this capture; the payment settings table has three provider rows.
- Test project cullxqklmbdiosibgois: 3 course records, 8 academic subjects, 24 course-subject mappings, 17 concepts and 17 virtual-lab catalogue rows; no published course/lesson/question or learner activity was present at the same capture.
- Both are separate projects. Test-only changes are not production behavior. Migration histories must not be synchronized blindly.

This does not mean the product has “zero features.” It means the live production system has not yet been populated with a real academy/course and student journey.

### Live public website check

Public pages were retrieved from [jmtacademy-web.onrender.com](https://jmtacademy-web.onrender.com/) after warming the free Render service through the health endpoint:
- Homepage promotes online/offline learning but the catalogue section says new courses are being prepared; the homepage still displays the Chemistry-specific strapline.
- [Courses](https://jmtacademy-web.onrender.com/courses) currently shows 0 of 0 available courses and has search/filters but no course options.
- [About](https://jmtacademy-web.onrender.com/about) says location, instructor biographies/qualifications and contact details will be published after owner verification.
- [Contact](https://jmtacademy-web.onrender.com/contact) says phone, email and academy location are not configured.
- [Login](https://jmtacademy-web.onrender.com/login) provides email/password sign-in, password recovery and registration path.
- Render service is currently on the Free plan and has no health-check path configured. The first browser capture returned Render's loading interstitial; after a health request the service returned app health JSON with the database reachable. Treat cold-start and discovery/trust-page quality as a real launch issue.
- GSC Wizard had no connected Search Console properties at this checkpoint, so clicks, impressions, indexing and search-performance reporting were unavailable.

No public course, teacher qualification, contact detail, merchant credential or location is to be invented to make these pages appear complete.

## 8. Immediate priorities emerging from the benchmark

These priorities are based on the observed JMT baseline and should be translated into atomic acceptance criteria before code changes.

1. **Learning Experience OS first.** Design the complete mobile student journey and a shared design system before adding isolated feature islands. Prioritise the next academic action, readable hierarchy, accessible controls, meaningful progress and recovery from interruption.
2. **Fix the public discovery/trust journey without inventing data.** Resolve the Chemistry-only strapline, empty-catalogue experience, incomplete public contact/about content and the route from discovery to a real, verified course. Course publishing and contact facts require owner-controlled content and release gates.
3. **Connect the existing learning foundation into a coherent student day.** Planner, upcoming classes, lessons, practice, revision, weak concepts and next action should reinforce one another. A visible mastery number must be backed by real learner evidence.
4. **Benchmark and implement the community as a safe academic Q&A system.** Use Piazza's single high-quality collaborative answer and instructor endorsement as patterns; add report, moderation, visibility and child-safety controls.
5. **Develop the virtual lab network using PhET/GeoGebra principles.** Every model needs explicit objectives, controls, units, assumptions, graphs/multiple representations, reset, feedback, accessibility and subject-expert review.
6. **Strengthen assessment feedback and teacher marking.** Benchmark Moodle/Gradescope workflows for reusable banks, rubric consistency, submission recovery, annotations and item analysis; preserve teacher authority over high-stakes marks.
7. **Use an education-native meeting provider rather than pretending an external URL is a meeting product.** Evaluate BigBlueButton or other current options for cost, hosting, capacity, data location, recordings, moderation and mobile performance before integration.
8. **Build modular payment adapters in test mode first.** Preserve manual wallet payments while designing direct/aggregator gateway adapters. Add real checkout only after merchant onboarding and all release prerequisites; do not enable real-money collection by assumption.
9. **Implement offline eligibility as a security boundary.** Staff-authorised roll-number roster, transfer/revocation and server-side media/API protection must be tested before publicising free offline benefits.
10. **Connect Search Console and add measurable operations.** Without verified GSC properties, do not claim search traffic trends. Add health, cold-start, error, accessibility and student journey checks before a production launch.

## 9. Feature benchmark record template

Copy this block for every feature or meaningful subfeature. One large module can have dozens of separate records.

~~~yaml
feature_id:
feature_name:
pillar:
priority:
owner_problem:
primary_user:
secondary_users:
learning_or_operational_outcome:
primary_reference:
secondary_references: []
source_register:
  - url:
    source_type:
    retrieved_at:
    supports:
    limitation:
best_patterns_to_adapt: []
tradeoffs_and_failure_modes: []
jmt_original_advantage:
scope_included: []
scope_excluded: []
acceptance_criteria: []
accessibility_and_mobile_checks: []
low_bandwidth_and_recovery_checks: []
security_privacy_and_permissions:
data_and_content_provenance:
performance_budgets:
measurement:
  baseline:
  target:
  population:
  method:
  guardrails: []
test_evidence: []
release_evidence: []
status:
blockers: []
next_review_date:
~~~

## 10. Standing instruction for all future work

Read this benchmark standard and the Project North Star before major feature work. Find the best credible reference for the exact feature, validate it with primary documentation and user pain/failure evidence, create an original JMT design, and define success before implementation. Build in reviewable increments; test actual journeys and adversarial cases; record evidence and limitations. Never claim feature parity or superiority from a mock-up, marketing copy, code file or checklist alone.

**JMT's goal is not to copy the most popular app or to keep students trapped on a screen. It is to create the most useful, calm, trustworthy and effective academic environment we can prove works. Student learning, agency, mastery and wellbeing outrank compulsive engagement and vanity metrics.**


## 11. Deep benchmark record 01 — Student Today dashboard and guided learning path

**Feature ID:** LXP-STUDENT-HOME-001  
**Pillar:** Priority 1 — JMT Learning Experience OS  
**Related product pillars:** Personal Academic Command Centre, JMT AI Teacher, Smart Assessment, Live Classes, Virtual Labs  
**Benchmark date:** 14 November 2026  
**Status:** benchmark research completed; JMT code foundation exists; full user-journey design and student usability validation remain open; production-verified student usage is not established.

### 11.1 User problem and desired outcome

When a student opens JMT, they should not need to interpret a collection of statistics or decide from scratch what to do. The home experience should answer, in order:

1. What is the most useful learning action for me now?
2. Where did I last stop, and can I continue without searching?
3. What is due or scheduled soon?
4. Which topic should I revise, and why?
5. How will this action improve my preparation?

The result should be a calm, personalised academic command centre, not a social feed or attention trap. Students must be able to understand, edit, dismiss and pause recommendations.

### 11.2 Reference comparison

**Duolingo — guided learning path and teaching method**
- Reference: [The Duolingo Teaching Method](https://blog.duolingo.com/duolingo-teaching-method/) and [Duolingo Handbook](https://handbook.duolingo.com/).
- Observed patterns: a guided path reduces the burden of choosing a random next lesson; personalisation and appropriate challenge keep practice relevant; lesson progression should build foundations rather than reward rushing through a sequence.
- JMT adaptation: show a clear next academic action with a reason and prerequisite context; keep the student on a curriculum-linked journey.
- JMT rejection: no copying of Duolingo's character art, branding, path artwork, proprietary content, streak mechanics or interface. Do not use streak pressure or time-on-app as a learning metric.
- Evidence limitation: first-party product/engineering descriptions explain design intent. JMT must independently test local student outcomes.

**Khan Academy — Mastery Challenges**
- Reference: [Mastery Challenges in course mastery](https://support.khanacademy.org/hc/en-us/articles/360037127892-What-are-Mastery-Challenges-in-course-mastery).
- Observed patterns: review is personalised from prior skills; skill selection considers time since last practice and current mastery; short practice sessions revisit earlier learning rather than only pushing new content.
- JMT adaptation: schedule due retrieval practice from verified learning events, concept evidence, recency and mastery confidence; let students understand why an item is due.
- JMT improvement target: integrate the schedule with Bangladesh syllabus mapping, exam deadlines, teacher-assigned work, local time and lesson context; provide a clear “why this now” explanation and a fair way to reschedule.
- Evidence limitation: the support article describes product rules, not independent proof that copying its exact session length or scoring logic is best for JMT.

**MyStudyLife — planner and academic calendar**
- References: [How to use MyStudyLife](https://care.mystudylife.com/en/articles/9502657-how-to-use-msl) and [MyStudyLife FAQ](https://mystudylife.com/faq/).
- Observed patterns: one calendar brings together classes, tasks, assignments and exams; classes can repeat and support rotating timetables; tasks and revision items have due dates; the product describes daily, weekly and monthly views, filters, reminders, focus timer and a parent view.
- JMT adaptation: combine timetable, study plan, live classes, exam dates, assignment deadlines, missed-class catch-up and revision in one local-time aware view.
- JMT improvement target: connect every calendar item to its course, lesson, syllabus topic, teacher and next learning action. Support Bangla/English and actual academy schedules without asking students to re-enter information already held by JMT.
- Evidence limitation: MyStudyLife's own documentation describes features and current plan boundaries must be checked before implementation.

**Learning-science evidence — retrieval, spacing and interleaving**
- Reference: Ruitenburg et al. (2026), [meta-analysis in authentic school classrooms](https://app.cochat.ai/from/chatgpt/fetch/papers/10.1007/s10648-026-10225-5), DOI 10.1007/s10648-026-10225-5.
- The meta-analysis included 233 effect sizes from 53 studies and 7,303 participants. It reported average testing, spacing and interleaving effects, while also identifying meaningful moderators such as knowledge type, post-test format, comparison condition, retention interval and feedback.
- JMT implication: use retrieval and spaced practice deliberately, but select methods based on topic, learner evidence, feedback and the intended assessment. Do not turn the reported average effects into a JMT outcome promise or assume every topic should use the same schedule.

### 11.3 Current JMT implementation evidence

**Main branch code**
- Student page: app/student/page.tsx.
- Dashboard component: components/learning-os-dashboard.tsx.
- Actions: app/actions/learning-os.ts, app/actions/learning.ts and app/actions/exam-war-room.ts.
- Current component shows counts for goals, revision due, tracked topics, unresolved mistakes and average mastery; it offers a 7-day lesson-completion goal, a revision queue, upcoming quizzes/written exams/assignments, mistake memory, evidence-backed lesson recommendations and a topic mastery map.
- The student page loads learner goals, revision tasks, mastery rows and unresolved mistakes. Recommendations require at least three evidence items and a weak mastery score, are linked to published lessons and currently paid course enrolment, and use prerequisite evidence in the recommendation logic.
- The dashboard has an Exam War Room entry point. CSS has responsive grid behavior and a one-column goal form for narrow screens.

**What is already good**
- Recommendations are not shown from a single weak signal; the inspected code uses a minimum evidence count.
- Recommendation candidates are scoped to published lessons and eligible active paid course enrolments.
- The dashboard explicitly says insights improve as learning evidence is collected and has honest empty states for missing mastery or revision evidence.
- Mistake memory includes the previous response, correct answer and explanation rather than just a red/green score.
- Due tasks, upcoming assessments and goals are grouped into recognisable academic categories.

**Gaps identified by code review**
- The first action is not yet a single, prioritised “continue/learn next” card. The interface begins with several summary numbers and a goal form, then separate lists.
- No clearly verified “resume last lesson” or “continue where you stopped” action was located in the inspected dashboard component.
- The component does not display the full weekly timetable or a unified class/task/exam calendar.
- Goal creation is currently constrained to lesson completions in the visible component; broader goals (revision sessions, question sets, topic mastery, assignment completion and teacher-set targets) need a consistent design.
- Upcoming live classes are not passed into this dashboard's current props in the inspected code excerpt.
- Recommendations and mastery can be empty until enough mapped, verified learner evidence exists; a new student needs a useful onboarding path rather than a blank analytics panel.
- The dashboard is a relatively long vertical section. Its hierarchy and action priority require a real mobile usability test, not just a CSS inspection.
- The production database snapshot at this audit had no learners' goals, revision tasks, mastery rows or learning events. The product's live student experience is therefore not validated by production data.

### 11.4 Required JMT experience

The target student home should have a clear hierarchy:

**A. Today — one recommended next action**
- Display one primary action, with up to two secondary actions.
- Examples: continue an unfinished lesson, complete a due retrieval set, attend the next scheduled class, submit an assignment or review a teacher's feedback.
- Explain why it is recommended and estimate duration only when a defensible estimate exists.
- Make the action resumable and safe across refresh/network interruption.

**B. Continue learning**
- Show active course, subject, chapter and last visited lesson when this data is reliably recorded.
- Provide a one-tap resume link; do not fabricate “recent activity” for a new student.
- If there is no history, guide the student to the first available lesson or course-application step.

**C. Academic calendar**
- Show next class, assignment deadline, exam and revision item in a combined chronological view.
- Respect Asia/Dhaka date/time, recurring and rotating schedules where configured, academic holidays and student availability.
- Allow day/week/month views and filters without duplicating the same event.

**D. Revision and mastery**
- Show only evidence-backed due items and explain their reason.
- Show confidence and evidence count alongside mastery; never treat raw time spent, simulation clicks or an ungraded answer as mastery.
- Let learners defer or reschedule safely within teacher/course rules.
- Provide immediate corrective feedback and follow-up retrieval where appropriate.

**E. Progress and wellbeing**
- Show progress toward meaningful goals, not a wall of numbers.
- No public ranking pressure, manipulative streak-loss warnings, forced notifications or infinite scroll.
- Include a clear pause/focus control, optional study timer and notification preferences.
- Students can dismiss or correct recommendations and see the underlying reason.

**F. First-use and sparse-data experience**
- On a new account, explain how to add a course, choose a goal or begin the first lesson.
- Explain why mastery/recommendation data is not available yet.
- Never substitute sample/demo mastery values or fake upcoming classes.
- Provide a graceful state when the student has no published course, no active enrolment or an expired payment.

### 11.5 Atomic acceptance criteria

| ID | Acceptance criterion | Release evidence required |
|---|---|---|
| LXP-001-A | Student sees one primary next action and can reach it in one obvious step | Browser tests for new, returning, overdue and fully caught-up learner states |
| LXP-001-B | Resume action opens the correct authorised lesson and preserves progress safely | Database + browser test for pause, refresh, expired session and network interruption |
| LXP-001-C | Academic calendar merges classes, assignments, exams and revision without duplicates | Fixture tests for recurring events, time zones, cancellations and overlapping events |
| LXP-001-D | Recommendations show an understandable reason and only use verified evidence | Unit/integration tests for evidence thresholds, prerequisites, published content and paid access |
| LXP-001-E | Students can control study goals, reminders and focus settings | Role and preference tests; no reminder sent against user settings |
| LXP-001-F | Bengali and English labels, times, dates and academic terminology render consistently | Localization snapshots and manual review by fluent reviewers |
| LXP-001-G | Mobile layout works on representative Android widths with no horizontal overflow or tiny targets | Viewport tests and real-device review at 320, 360, 390 and 430 CSS pixels |
| LXP-001-H | Keyboard, screen reader, focus, contrast, zoom and reduced motion meet WCAG 2.2 AA target | Automated accessibility scan plus keyboard/screen-reader manual checks |
| LXP-001-I | Low-bandwidth and transient failures preserve user progress and provide retry/recovery | Network-throttling and offline-interruption test with persisted-state assertions |
| LXP-001-J | No fabricated metrics or mastery values are shown when evidence is sparse | Empty-state and zero/low-sample tests |
| LXP-001-K | Teacher/parent visibility is scoped and consent-aware; peers cannot see private learner records | Adversarial role/RLS and direct API tests |
| LXP-001-L | Dashboard does not optimise compulsive use or punish breaks | Product-copy review, notification preferences test and wellbeing review |

### 11.6 Measurement plan

Set baselines with a small, consented student usability pilot before comparing changes.

- **Primary UX metric:** time from student dashboard open to starting the next intended learning action.
- **Task success:** percentage of students who can identify and start the correct next action without help.
- **Continuity:** percentage of interrupted lessons/practice tasks that resume at the correct point without data loss.
- **Planning quality:** percentage of scheduled academic tasks completed or consciously rescheduled; do not punish legitimate changes.
- **Learning quality:** retention and correctness on aligned retrieval practice after defined intervals; stratify by subject, skill and feedback type.
- **Recommendation quality:** acceptance, dismissal/correction, and subsequent learning evidence; compare with a simple baseline.
- **Accessibility:** WCAG 2.2 AA audit results, screen-reader/keyboard completion and error rates by device.
- **Guardrails:** false/unsupported recommendations, missed classes due to incorrect notifications, data-loss incidents, excess notification opt-outs, privacy/security events and student-reported pressure.

Do not set an arbitrary “time-on-site” or streak target. Do not claim learning gains from clicks, session duration or dashboard visits.

### 11.7 Decision and status

- **Benchmark decision:** adapt Duolingo's guided progression, Khan Academy's evidence-informed mastery review and MyStudyLife's integrated academic calendar; combine them in an original Bangladesh curriculum-aware JMT experience.
- **JMT differentiation:** connect the next action to JMT course access, official cohort/syllabus version, teacher feedback, offline/online schedule, lesson, assessment, virtual lab and evidence-backed revision in a single student-controlled home.
- **Implementation status:** partial foundations exist in main. The complete integrated experience, unified calendar, verified resume flow, student pilot, full mobile/accessibility testing and production learning outcome measurement remain open.
- **Next implementation slice:** design and test the student home information hierarchy and next-action card, then add a real resume/continue path using the current authorised lesson-progress model. Do not build another dashboard island.
