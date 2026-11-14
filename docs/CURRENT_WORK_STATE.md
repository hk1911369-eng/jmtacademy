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

**Status:** Research/benchmark first pass reported complete; implementation not yet verified as complete. This task is not finished.

## 3. Related active PR / dependencies to refresh
- PR #65: https://github.com/hk1911369-eng/jmtacademy/pull/65
- Last known state from 15 Nov 2026: open, draft, unmerged; branch `feat/jmt-learning-experience-os-first-pass`; last fetched head `8dae210b135bb44322fa9fe206377720823f8f28`.
- Last reported purpose: homepage fallback branding correction, removal of unsupported unconditional free-recording claims and regression tests.
- Last reported CI: LMS quality checks passed; other checks were still running. **This is stale historical information, not current CI status.**
- Offline roll-number enforcement was explicitly not included in PR #65. Refresh current PR files, head, checks, comments and conflicts before deciding next steps.
- Do not merge or deploy automatically.

## 4. The single next action (do this first on resume)
**Refresh GitHub evidence before coding:** fetch current PR #65 metadata/head/files/checks/comments; read current North Star and benchmark standard; inspect main plus relevant open PR branches for existing dashboard, goals, revision, mastery, mistake-memory, recommendation, calendar, lesson-progress and assessment code. Produce a concise verified gap list and benchmark the specific missing dashboard journeys. Then define acceptance tests and implement only the highest-value non-duplicative slice in a reviewable branch.

After this inspection, update this file with the actual verified state and the next concrete implementation step. Do not assume previous reports are still current.

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
- Student Today dashboard benchmark first pass was reported complete.
- PR #65 was created as a draft with the purpose described in Section 3; do not treat as merged or production released.
- Detailed product charter: Section 16 of `docs/JMT_ACADEMY_PROJECT_NORTH_STAR.md`.
- Permanent benchmark standard: `docs/JMT_BEST_IN_CLASS_FEATURE_BENCHMARK_STANDARD_2026-11-14.md`.
- Previous continuity checkpoint: `docs/JMT_PROJECT_CONTINUITY_CHECKPOINT_2026-11-15.md`. This file supersedes it as the **live active-work handoff**; the older file remains a historical checkpoint and must not be treated as the current task state.

## 7. New owner requests / feature intake
Add each new owner-requested feature here with its exact intent, date, priority, relevant cohort/roles, dependencies, benchmark needed and disposition. Do not silently discard it or allow it to derail an in-progress task without recording the decision.

**Current new requests:** None beyond the active dashboard task recorded in Section 2.

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
