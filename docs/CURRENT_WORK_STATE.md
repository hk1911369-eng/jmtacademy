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

## 2. Active task — Student Today / Personal Academic Command Centre
**Task:** Finish the Student Today experience as one coherent student journey: explainable next action, secure lesson continuity, connected academic calendar and high-quality first-use states.

**Current implementation status:**
- **Next best learning action:** implemented in draft PR #66. Deterministic, explainable ordering with revision, assignment/exam, evidence-backed recommendation and first-use fallbacks.
- **Continue Where You Stopped:** implemented in draft PR #67. Includes per-student playback checkpoints, metadata-gated restore, pause/seek/periodic saves, deferred-write retry, same-origin visibility checkpoint, dashboard resume card and completion cleanup.
- **Unified academic calendar:** not implemented. This remains the next major Student Today feature slice after UX/device verification.
- **Recommendations:** existing mastery/revision/mistake-memory foundations are wired into the Student Today recommendation and next-action flow; further explanation quality and student validation remain.
- **First-use state:** implemented in PR #66 for students with no urgent work and students without active courses; visual/student validation remains.

**Status:** Core code and test-environment database work for the first two slices are complete on draft PRs. Exact-head CI is green. The overall Student Today task is **not finished**: screenshot/mobile/network/accessibility/student-usability verification and the unified academic calendar remain outstanding. Do not merge or deploy automatically.

## 3. Related active PR / dependencies to refresh
- PR #65: https://github.com/hk1911369-eng/jmtacademy/pull/65 — open, draft, unmerged; branch `feat/jmt-learning-experience-os-first-pass`; head `8dae210b135bb44322fa9fe206377720823f8f28`; mergeable. Five changed files cover multi-subject homepage fallback branding and correction of unsupported unconditional free-recording copy. Offline roll-number enforcement is not included.
- PR #66: https://github.com/hk1911369-eng/jmtacademy/pull/66 — open, draft, unmerged; branch `feat/student-today-next-action`; head `638bd0307f9044b34ef263a65f807bfef705c912`; base `main`; 9 commits, 6 changed files; mergeable.
- PR #66 adds a deterministic next-action selector, accessible card before dashboard metrics, responsive CSS, benchmark record and tests. It prioritises overdue pending revision, then nearest assignment/exam within 7 days, then an evidence-backed recommendation; first-use fallbacks are study goal or course discovery.
- PR #66 latest-head CI is green: [CI](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925289), [LMS quality checks](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925294), [Quality checks](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43626925319). No merge/deployment.
- PR #67: https://github.com/hk1911369-eng/jmtacademy/pull/67 — open, draft, unmerged; branch `feat/student-resume-progress`; exact head `da2f632c688ae2077a07cc3be0993b51f9cb5747`; base restored to `feat/student-today-next-action` (PR #66); 44 commits ahead, 0 behind, 14 changed files; mergeable.
- PR #67 changes: `app/actions/learning.ts`, `app/api/learning/playback-checkpoint/route.ts`, `app/globals.css`, `app/learn/[courseId]/page.tsx`, `app/student/page.tsx`, `components/learning-os-dashboard.tsx`, `components/lesson-video-player.tsx`, `lib/learning-next-action.mjs`, `lib/learning-next-action.d.mts`, two Supabase migrations, one benchmark doc and two test files.
- PR #67 exact-head workflows are green: [CI](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43630379143) — TypeScript, 161 regression tests and ESLint; [Quality checks](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43630229584) — guardrails, ESLint, TypeScript, production build and dependency audit; [LMS quality checks](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43630379125) — ESLint, guardrails, TypeScript, production build and dependency audit. All are for head `da2f632c...`.
- PR #67 has no conversation comments, review submissions or inline review threads at last refresh. It remains draft; do not merge automatically.
- PR #42: https://github.com/hk1911369-eng/jmtacademy/pull/42 — open, draft, unmerged; branch `audit/jmt-master-prompt-follow-through`; head `5574013d5ee2e6f02a7a487ca30ecd4e7ca3927a`; mergeable.
- PR #64: https://github.com/hk1911369-eng/jmtacademy/pull/64 — open, draft, unmerged; branch `docs/jmt-academy-project-north-star`; mergeable. This live handoff update advances that branch; refresh its exact head on the next resume. The branch contains the durable charter, benchmark standard and live handoff.
- PR #65, #42 and #64 remain separate draft/unmerged work; no automatic merges or production releases.

## 4. The single next action (do this first on resume)
**Perform a screenshot-based mobile UX audit of Student Today and Continue Where You Stopped against the latest preview.** Verify first-use/empty states, urgent next action ordering, continue-card clarity, pause/seek/refresh recovery, near-end fallback, save errors, slow/offline network, keyboard/focus/accessibility and Android viewport behavior. Use the current PR #67 head `da2f632c688ae2077a07cc3be0993b51f9cb5747`; keep PRs #66/#67 draft. If no preview is available, inspect the correct Render service first after the owner confirms the workspace in Section 5. Do not deploy or change environment settings.

## 5. Pending / unresolved / approval gates
- **Offline academy access:** Offline students mean students attending JMT's physical/local classroom academy, not merely website users without internet. They should receive free recordings of missed classes as make-up support. Eligibility is restricted to students whose roll numbers are added to the authorised roster by teacher/staff/admin; entitlement is tied to student identity, roll number, cohort, batch and period. Online students have separate enrolment and access entitlements. This policy is defined; robust technical enforcement is still a required security task. Enforce server-side for pages/APIs/media/playback/download, with revocation, audit trail and tests. Hiding buttons is insufficient.
- **Payments:** Main has manual bKash, Nagad and Rocket submission/review foundations; this does not prove automatic gateway checkout/settlement. No real-money activation without actual merchant onboarding, credentials, legal/compliance review, settlement destination and test-mode verification.
- **HSC cohorts:** HSC 2027 = 2025–26 XI intake; HSC 2028 = 2026–27 XI intake. Never mix curriculum/source records.
- **Render/Supabase topology:** New `jmtacademy-web` may point to test Supabase while legacy `jmtacademy` uses production. Vercel connection currently reports no Git-linked projects. Render exposes a single workspace named `My Workspace` through both linked accounts, but the service list could not be read because the Render connector requires the owner to confirm/select a workspace first. Before the next preview/deployment check, ask the owner to confirm `My Workspace`; then inspect service branch, auto-deploy setting and latest deploy without changing anything. Do not switch production environment variables or redeploy for cutover without specific approval.
- No production migrations/data changes, payment activation, sensitive env changes, irreversible financial actions, PR merges or production releases without verifying prerequisites and obtaining the relevant explicit approval.
- Do not invent provider accounts, credentials, official academic sources, test results or production verification.

## 6. Recently completed / last known checkpoint (brief; not the active next task)
- Best-in-Class Feature Benchmark Standard was saved on the North Star branch and read-back verified. It contains a 12-dimension rubric, evidence hierarchy, trade-off analysis, measurable acceptance criteria and reusable template.
- Initial benchmark candidates included Duolingo, Khan Academy, MyStudyLife, PhET, GeoGebra, Piazza, Moodle, Gradescope, BigBlueButton, Replit, Bangladesh payment providers, WCAG 2.2 and research on retrieval/spacing/interleaving. Revalidate each source when implementing the relevant feature.
- Student Today dashboard benchmark research was extended and recorded in `docs/JMT_STUDENT_TODAY_NEXT_ACTION_BENCHMARK_2026-11-15.md` on PR #66. It covers Edrolo, MyStudyLife, Khan Academy, a Moodle redesign case study and University of Edinburgh notification-overload research, with evidence limitations and acceptance criteria.
- PR #66 implemented the first dashboard hierarchy slice: a deterministic, explainable primary next action before the existing metrics. Its latest-head CI, LMS quality and Quality checks all passed, including regression tests, typecheck, ESLint, production build and dependency audit.
- PR #65 remains a separate draft with public branding/eligibility-copy corrections; do not treat as merged or production released.
- PR #67 implemented secure lesson resume with two test-environment migrations, PostgreSQL RLS/RPC isolation tests and green exact-head GitHub workflows. No production migration or deployment was performed.
- Detailed product charter: Section 16 of `docs/JMT_ACADEMY_PROJECT_NORTH_STAR.md`.
- Permanent benchmark standard: `docs/JMT_BEST_IN_CLASS_FEATURE_BENCHMARK_STANDARD_2026-11-14.md`.
- Previous continuity checkpoint: `docs/JMT_PROJECT_CONTINUITY_CHECKPOINT_2026-11-15.md`. This file supersedes it as the **live active-work handoff**; the older file remains a historical checkpoint and must not be treated as the current task state.

## 7. New owner requests / feature intake
Add each new owner-requested feature here with its exact intent, date, priority, relevant cohort/roles, dependencies, benchmark needed and disposition. Do not silently discard it or allow it to derail an in-progress task without recording the decision.

**Current new requests:** Owner clarified that prioritisation/intensity must never be interpreted as permission to deliver inferior quality to lower-ranked features; recorded permanently in Section 1 and the Top 10 list in Section 9. Owner also explicitly reaffirmed that the JMT Learning Experience OS (complete UI/UX and operating interface) is strategic Priority #1, separate from the Top 10 signature-pillar ranking; the Top 3 are preserved in Section 9's first subsection. The owner repeated the master resume prompt and clarified that the previous assistant response had been interrupted; no new product feature request was added in this session.

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


## 10. Historical session record — Student Today next-action slice (15 November 2026, Asia/Dhaka)

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


## 11. Latest session record — secure lesson resume and handoff recovery (15 November 2026, Asia/Dhaka)

- Recovered the exact interruption: the prior assistant response stopped while a GitHub file-update operation was being reported. The interrupted operation updated `app/student/page.tsx` to hide near-end checkpoints from the Continue card; the work continued afterward into PR #67.
- Read this live handoff, the North Star, benchmark standard and historical checkpoint. The live handoff was stale: it still described secure resume as the next task even though PR #67 already existed. Verified live GitHub evidence and replaced the stale next action.
- Refreshed PR #65, #42, #64, #66 and #67. All remain open, draft and unmerged. PR #66 head is `638bd0307f9044b34ef263a65f807bfef705c912`; PR #67 head is `da2f632c688ae2077a07cc3be0993b51f9cb5747`, stacked on PR #66 with base restored to `feat/student-today-next-action`. PR #67 has 14 changed files, 44 commits ahead of its base, 0 behind, no review comments/threads and mergeable=true.
- Implemented secure resume in PR #67: RLS-protected playback checkpoints; private SECURITY DEFINER RPC with public SECURITY INVOKER wrapper; active-student, current paid entitlement, published lesson/course and non-archived-course checks; no direct client writes; completion cleanup; boolean write-throttle response and retry; client pause/seek/periodic/visibility checkpoint behavior; Student Today resume card. Payment flow was not changed.
- Added benchmark record `docs/JMT_LESSON_RESUME_BENCHMARK_2026-11-15.md`. Updated migration filenames to match the actual Supabase migration versions recorded by the test project.
- Applied migrations `20261114185830_secure_lesson_playback_resume_checkpoints` and `20261114190505_require_published_unarchived_course_for_playback_resume` **only** to the separately named JMT Test Supabase project. No production project, production data, payment configuration or environment variable was changed.
- Read-back SQL verified table/RLS/policy/trigger, private SECURITY DEFINER function and public SECURITY INVOKER wrapper, active-student and published/non-archived course checks, anon denial, authenticated SELECT/EXECUTE and denial of direct INSERT/UPDATE. Supabase advisors reported no checkpoint-specific finding; unrelated existing warnings remain documented in the benchmark record.
- Transaction-scoped PostgreSQL test with two synthetic students verified A saves and reads one row; B cannot read A's row, saves and reads only its own row; completion deletes A's checkpoint; archiving the course blocks further RPC writes and hides remaining checkpoint rows. All synthetic users, course, lesson and checkpoint rows were rolled back; follow-up count query confirmed zero test records remain.
- GitHub Actions exact-head verification for PR #67 `da2f632c...`: CI [43630379143](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43630379143) success (161 regression tests, TypeScript, ESLint); Quality [43630229584](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43630229584) success (guardrails, ESLint, TypeScript, production build, dependency audit); LMS [43630379125](https://github.com/hk1911369-eng/jmtacademy/actions/runs/43630379125) success (ESLint, guardrails, TypeScript, production build, dependency audit). Earlier failed runs were caused by static test assertions that were corrected; final exact-head runs passed.
- PR #67 was temporarily retargeted to `main` to trigger workflows whose filters only run on PRs targeting main, then restored to its intended stacked base `feat/student-today-next-action`. No PR was merged.
- Product Design screenshot audit and real Android/browser tests were not run: no browser-control/screenshot tool is available in this chat. Vercel reports no Git-linked projects. Render service/deploy state remains unverified because its connector requires owner confirmation of the `My Workspace` workspace before listing services. No deployment was initiated by the assistant; do not claim that no auto-deploy occurred until Render is inspected.
- No production migrations, payment activation, sensitive environment changes, merge or production release. No new feature request was added.
- **Single next action:** perform the screenshot-based mobile UX audit of Student Today and Continue Where You Stopped using the latest preview; if a preview is not known, first ask the owner to confirm Render workspace `My Workspace` so service/auto-deploy status can be inspected safely.
