# JMT Academy — CURRENT WORK STATE (Single Live Handoff)

> **This is the one authoritative, replaceable handoff for the active work.**
> Update this file whenever a meaningful task starts, changes, finishes, is blocked, or a new feature request is accepted. Replace the previous active-task state; do not leave stale “next task” instructions active. Keep durable product requirements in the North Star and benchmark standard, not duplicated here.

**Last updated:** 15 November 2026 (Asia/Dhaka)  
**Canonical repository:** https://github.com/hk1911369-eng/jmtacademy  
**Branch containing this handoff:** `docs/jmt-academy-project-north-star`

## 0. Mandatory resume protocol — read before doing anything
At the start of every JMT work session, including a new chat:
1. Fetch and read this file first.
2. Read `docs/JMT_ACADEMY_PROJECT_NORTH_STAR.md` and `docs/JMT_BEST_IN_CLASS_FEATURE_BENCHMARK_STANDARD_2026-11-14.md`.
3. Refresh the live GitHub state for the active PR/branch/commit/checks and inspect relevant current code. Do not trust stale status copied here without refreshing it.
4. Identify the single next action in Section 4. Do not restart, duplicate completed work, silently change priorities, or jump to an unrelated feature.
5. If a new owner request arrives, add it to Section 7, classify its priority/dependencies, and explain how it affects the current task before changing direction. Preserve explicit owner constraints.
6. After any meaningful work, update this file with exact evidence, status, commit/PR links, tests and the next action. Read the updated file back from GitHub to verify it.
7. When the active task finishes, replace Section 2–5 with the next task's handoff. Do not retain the finished task as if it were still next. Keep only a concise completed-work record in Section 6 and durable detail in PRs/commits/docs. The live “next action” must always describe the actual next action.

## 1. Permanent rules (do not override)
- **Benchmark before building every feature.** For every feature, subfeature, screen, workflow, API, integration and operational process, research the strongest relevant websites/apps/products/open-source tools and research. Record what is excellent, what fails, trade-offs, user complaints and independent evidence. Then design an original JMT solution with measurable acceptance criteria. Owner's ambition is “100 times better”; translate it into measurable quality and never claim a measured 100x improvement without comparative evidence.
- Workflow: user problem → best-in-class benchmark → evidence/failure modes → original JMT design → measurable acceptance criteria → implementation → automated + human verification → honest status/evidence.
- Do not copy protected branding, UI, code, assets, copyrighted content or private data.
- Keep the strategic order: (1) JMT Learning Experience OS and world-class student-first UX; (2) JMT Intelligence Engine (separate AI Teacher and Exam Question Predictor); (3) Complete Learning Ecosystem.
- **Quality is non-negotiable across the entire product.** Strategic priority/intensity determines sequencing, investment focus and dependency order; it NEVER means lower quality, weaker UX, less research, less testing or inferior execution for another feature. Every feature must be best-in-class within its own category and deliver an exceptional, coherent JMT experience. The Learning Experience OS is a shared quality foundation across every feature, not the only feature that deserves excellence.
- The owner's Top 10 signature-feature ranking is a portfolio/intensity ranking, NOT a quality ranking or permission to neglect lower-ranked features. Preserve the exact order in Section 9. Every one of the ten must be unmatched in its own relevant dimensions, subject to evidence and measurable verification.
- Ethical study engagement, not compulsive engagement. No dark patterns or infinite-scroll traps.
- Distinguish idea/designed, code on main, code on draft PR, tests passing, test-environment verified and production verified. Never inflate feature counts using routes, migrations or function counts.
- Do not restart work or ask the owner to repeat details already available in this repository.

## 2. Active task — current stopping point
**Task:** Student Today dashboard / Personal Academic Command Centre — turn existing learning foundations into one coherent, useful student journey.

**Why this is next:** The prior benchmark pass identified this as the next major Learning Experience OS improvement. Existing code reportedly includes goals, revision tasks, mastery, mistake memory, recommendations and upcoming assessments; inspect current branches before relying on this inventory or implementing duplicates.

**Required outcomes:**
1. One clear, explainable **Next best learning action**.
2. Reliable **Continue where you stopped**, including interruption/recovery.
3. One connected calendar for classes, assignments, exams and revision.
4. Evidence-backed recommendations explaining why each is suggested.
5. A genuinely useful, polished first-use state for students with no learning history.

**Status:** The first Student Today implementation slice (one explainable next-action card) is in draft PR #66. Exact lesson resume, the unified academic calendar, visual/student usability validation and production verification remain incomplete. This task is not finished.

## 3. Related active PR / dependencies to refresh
- PR #65: https://github.com/hk1911369-eng/jmtacademy/pull/65 — still open, draft, unmerged; branch `feat/jmt-learning-experience-os-first-pass`; head `8dae210b135bb44322fa9fe206377720823f8f28`. Five changed files cover multi-subject homepage tagline fallback and correction of unconditional offline-recording copy. Offline roll-number enforcement is not included. The latest status endpoint returned no commit-status entries; do not claim CI green without checking workflow runs.
- PR #66: https://github.com/hk1911369-eng/jmtacademy/pull/66 — new open, draft, unmerged implementation slice; branch `feat/student-today-next-action`; latest head `638bd0307f9044b34ef263a65f807bfef705c912`; 9 commits ahead of main, 0 behind; 6 changed files.
- PR #66 adds a deterministic next-action selector, accessible card before dashboard metrics, responsive CSS, unit/regression tests and a feature-specific benchmark record. It prioritises the most recently overdue pending revision for a course in the active-enrolment map, then the nearest assignment/exam within 7 days, then an evidence-backed recommendation; fallback is study goal or course discovery.
- CI on latest PR #66 head: all three workflows passed: `CI` (TypeScript, regression tests, ESLint), `LMS quality checks` (ESLint, guardrail tests, TypeScript, production build, dependency audit) and `Quality checks` (guardrail tests, ESLint, TypeScript, production build, dependency audit).
- PR #66 is not merged, not deployed and not visually verified in a browser. Do not merge or deploy automatically.
- PR #42 remains open, draft, unmerged; last refreshed head `5574013d5ee2e6f02a7a487ca30ecd4e7ca3927a`. It contains extensive security parity, research and Learning OS foundations; it is not live on main.
- PR #64 remains open, draft, unmerged; its North Star branch head was `66e1f09bbea5b1f0e52e53473ad0379cb1b55056` before this handoff update. It contains the durable project charter and benchmark standard.
- Do not merge or deploy automatically.

## 4. The single next action (do this first on resume)
**Next feature: secure Continue Where You Stopped.** PR #66's latest head `638bd0307f9044b34ef263a65f807bfef705c912` has all three GitHub workflows green, but remains draft, unmerged and not visually/student verified. Before starting the resume implementation, refresh PR #66 checks/comments once more. Then inspect the current player/actions/schema and implement a server-authorised, privacy-safe playback checkpoint with a client player and a Student Today resume entry. Use a separate draft PR stacked on PR #66; do not merge or deploy automatically.

After latest-head checks pass, continue the same Student Today task with the next required slice: design and implement secure **Continue Where You Stopped**. First inspect all current lesson/video/player code and the authorised `lesson_progress` / `learning_events` schema and policies. The current `lesson_progress` table only stores completion, completion time and update time; the current player is a native video element in a server-rendered learning page. Define a minimal privacy-safe, server-authorised checkpoint model and client playback-save/recovery behavior; benchmark it against Edrolo and other strong learning products; set acceptance criteria for pause, refresh, seek, duplicate updates, throttling, expired sessions, revoked access, network loss, device changes and course entitlement. Do not expose media access or let students forge completion/mastery. Use a separate reviewable PR; no production migration or release without the required review and approval.

The unified class/task/exam/revision calendar remains the following Student Today slice after resume, with recurring schedules, cancellation, Bangladesh timezone and duplicate handling. Do not claim it is implemented.

## 5. Pending / unresolved / approval gates
- **Offline academy access:** Offline students mean students attending JMT's physical/local classroom academy, not merely website users without internet. They should receive free recordings of missed classes as make-up support. Eligibility is restricted to students whose roll numbers are added to the authorised roster by teacher/staff/admin; entitlement is tied to student identity, roll number, cohort, batch and period. Online students have separate enrolment and access entitlements. This policy is defined; robust technical enforcement is still a required security task. Enforce server-side for pages/APIs/media/playback/download, with revocation, audit trail and tests. Hiding buttons is insufficient.
- **Payments:** Main has manual bKash, Nagad and Rocket submission/review foundations; this does not prove automatic gateway checkout/settlement. No real-money activation without actual merchant onboarding, credentials, legal/compliance review, settlement destination and test-mode verification.
- **HSC cohorts:** HSC 2027 = 2025–26 XI intake; HSC 2028 = 2026–27 XI intake. Never mix curriculum/source records.
- **Render/Supabase topology:** New `jmtacademy-web` may point to test Supabase while legacy `jmtacademy` uses production. Do not switch production environment variables or redeploy for cutover without the specific approval previously requested.
- No production migrations/data changes, payment activation, sensitive env changes, irreversible financial actions, PR merges or production releases without verifying prerequisites and obtaining the relevant explicit approval.
- Do not invent provider accounts, credentials, official academic sources, test results or production verification.

## 6. Recently completed / last known checkpoint (brief; not the active next task)
- Best-in-Class Feature Benchmark Standard was saved on the North Star branch and read-back verified. It contains a 12-dimension rubric, evidence hierarchy, trade-off analysis, measurable acceptance criteria and reusable template.
- Initial benchmark candidates included Duolingo, Khan Academy, MyStudyLife, PhET, GeoGebra, Piazza, Moodle, Gradescope, BigBlueButton, Replit, Bangladesh payment providers, WCAG 2.2 and research on retrieval/spacing/interleaving. Revalidate each source when implementing the relevant feature.
- Student Today dashboard benchmark research was extended and recorded in `docs/JMT_STUDENT_TODAY_NEXT_ACTION_BENCHMARK_2026-11-15.md` on PR #66. It covers Edrolo, MyStudyLife, Khan Academy, a Moodle redesign case study and University of Edinburgh notification-overload research, with evidence limitations and acceptance criteria.
- PR #66 implemented the first dashboard hierarchy slice: a deterministic, explainable primary next action before the existing metrics. Tests were added for revision, assignment, exam, evidence-backed recommendation, first-use, study-goal and inactive-course cases. Latest CI is still running/queued; no test suite is yet reported as passed on the latest head.
- PR #65 remains a separate draft with public branding/eligibility-copy corrections; do not treat as merged or production released.
- Detailed product charter: Section 16 of `docs/JMT_ACADEMY_PROJECT_NORTH_STAR.md`.
- Permanent benchmark standard: `docs/JMT_BEST_IN_CLASS_FEATURE_BENCHMARK_STANDARD_2026-11-14.md`.
- Previous continuity checkpoint: `docs/JMT_PROJECT_CONTINUITY_CHECKPOINT_2026-11-15.md`. This file supersedes it as the **live active-work handoff**; the older file remains a historical checkpoint and must not be treated as the current task state.

## 7. New owner requests / feature intake
Add each new owner-requested feature here with its exact intent, date, priority, relevant cohort/roles, dependencies, benchmark needed and disposition. Do not silently discard it or allow it to derail an in-progress task without recording the decision.

**Current new requests:** Owner clarified that prioritisation/intensity must never be interpreted as permission to deliver inferior quality to lower-ranked features; recorded permanently in Section 1 and the Top 10 list in Section 9. Owner also explicitly reaffirmed that the JMT Learning Experience OS (complete UI/UX and operating interface) is strategic Priority #1, separate from the Top 10 signature-pillar ranking; the Top 3 are preserved in Section 9's first subsection. No additional feature request was added in this session.

## 8. Update format required after every meaningful work session
Replace the relevant sections above and record:
- What was actually inspected/changed (paths and exact commit/PR).
- What is complete versus partial versus blocked.
- Tests run, exact outcomes and environment; distinguish local/CI/test/prod.
- External benchmark sources consulted and the JMT design decisions they informed.
- Risks, unresolved questions and approvals still needed.
- New owner requests captured in Section 7.
- One unambiguous next action.
- Date/time in Asia/Dhaka and the exact GitHub file SHA/commit after read-back verification.

**Never mark a task done because a document was written or code was committed. Done means acceptance criteria passed and the stated verification evidence exists.**

## 9. Strategic Top 3 — preserve separately from the Top 10 signature pillars

**Important correction to the earlier handoff wording:** The owner explicitly distinguishes the three highest strategic priorities from the ten signature product pillars. Never present the Top 10 as a replacement for the Top 3, and never omit the Learning Experience OS when summarising JMT's top priorities.

1. **JMT Learning Experience OS — Priority #1 and foundation of the entire product.** This is the complete student-first operating experience, not merely a dashboard or cosmetic redesign: UI, UX, information architecture, navigation, original design system, visual language, interaction patterns, personalised academic home, connected learning journey, focus workspace, mobile/Android and low-bandwidth excellence, accessibility, feedback, progress, recovery and consistent quality across every student, teacher, parent, staff and admin screen. Every feature must pass its review.
2. **JMT Intelligence Engine — Priority #2.** Includes the distinct AI Teacher and Exam Question Predictor, trustworthy adaptive learning, mastery, revision, mistake memory, explainable recommendations and academic analytics.
3. **Complete Learning Ecosystem — Priority #3.** Includes courses, lessons, live/recorded classes, assessments, virtual labs, academic tools, community, teacher/parent/admin workspaces, offline entitlements, secure finance/payments, reporting, support, integrations and automation.

These are connected strategic priorities, not isolated products. The Learning Experience OS is the experience and quality foundation through which the Intelligence Engine and the complete ecosystem are delivered. **The Top 10 list below is a separate ranking of signature product pillars.** Ranking affects strategic focus and sequencing only; it never lowers the quality bar for any feature.

## 9. Owner's Top 10 signature features — ranked by strategic intensity, NOT quality
**Critical interpretation:** This is the separate Top 10 signature-pillar ranking, not the strategic Top 3 above. It determines strategic intensity, sequencing and focus only. It does not mean #1 gets excellence while #10 gets an ordinary implementation. Every single feature must be designed, benchmarked, built and verified to be best-in-class in its own category. The target is an unmatched overall JMT experience across the complete product.

1. **Exam Question Predictor AI** — evidence-based exam preparation and question-pattern intelligence.
2. **JMT AI Teacher** — personal, curriculum-grounded AI teaching experience.
3. **Personal Academic Command Centre** — one intelligent home for each student's academic life.
4. **Virtual Lab Network** — interactive practical learning and virtual experiments.
5. **JMT Learning Community** — high-quality academic community for students and teachers.
6. **Smart Examination & Assessment System** — advanced examinations, evaluation and performance insights.
7. **Academic Productivity Toolkit** — tools for planning, studying and academic productivity.
8. **Live Classes & Complete Learning Archive** — connected live teaching, recordings and learning continuity.
9. **Unified Teacher, Parent & Admin Workspace** — coordinated ecosystem for academic stakeholders.
10. **Advanced Payment & Financial Management** — secure, transparent and reliable financial operations.

**Portfolio-wide acceptance rule:** No feature may be deliberately downgraded because of its rank. Each feature requires its own category-specific benchmark research, measurable quality criteria, accessibility/security/reliability review where relevant, and honest verification. Shared foundations such as the Learning Experience OS must improve all features consistently. Rank may affect what is tackled first, never the quality bar.


## 10. Latest session record — Student Today next-action slice (15 November 2026, Asia/Dhaka)

- Recovered and read the current handoff, North Star and benchmark standard before work.
- Verified repository default branch `main` at `141d49343d80452c0871cec77fbc02367346e847`.
- Re-read current student dashboard, learning dashboard component, learning actions, lesson page, academic hub, Learning OS migrations and tests. Confirmed current UI has separated metrics/lists, no single next-action card, no unified student calendar, and no true resume checkpoint.
- Confirmed `lesson_progress` stores `completed`, `completed_at` and `updated_at`; it has no playback offset. The current video is a native HTML video element in `app/learn/[courseId]/page.tsx`; no exact resume behavior is established.
- Used GitHub for source history/code/PRs and Exa for benchmark research. Product Design's full screenshot workflow was not run in this standard chat environment; no visual audit or real-device validation is claimed.
- Created PR #66 on `feat/student-today-next-action`; current head `638bd0307f9044b34ef263a65f807bfef705c912`. Files: `components/learning-os-dashboard.tsx`, `app/globals.css`, `lib/learning-next-action.mjs`, `lib/learning-next-action.d.mts`, `tests/learning-next-action.test.mjs`, `docs/JMT_STUDENT_TODAY_NEXT_ACTION_BENCHMARK_2026-11-15.md`.
- Added an active-course filter so stale revision tasks from courses the student is no longer enrolled in do not become the primary action.
- No Supabase calls that mutate data/schema, no payment changes, no Render/Vercel deployments, no production changes, no merges.
- CI on the latest PR #66 head: all three workflows passed, including tests, typecheck, ESLint, production build and dependency audit.
- PR #65, #42 and #64 remain draft/unmerged as described in Section 3.


### CI status update (latest poll)
- PR #66 latest head: `638bd0307f9044b34ef263a65f807bfef705c912`.
- CI run: https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925289 — success.
- LMS quality checks: https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925294 — success, including production build and dependency audit.
- Quality checks: https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925319 — in progress at last poll.


### Final PR #66 verification (latest head)
- Exact head: `638bd0307f9044b34ef263a65f807bfef705c912`.
- CI: https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925289 — success.
- LMS quality checks: https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925294 — success.
- Quality checks: https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925319 — success.
- All workflows completed successfully: TypeScript, regression tests, ESLint, production build and dependency audit.
- PR #66 remains open, draft and unmerged; mergeability was reported true. No production deploy or migration was performed.
