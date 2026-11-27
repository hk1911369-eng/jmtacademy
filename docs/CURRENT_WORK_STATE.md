# JMT Academy — CURRENT WORK STATE (Single Live Handoff)

> One replaceable live handoff. Durable product requirements remain in the North Star and benchmark standard. Refresh repository evidence before every resume.

**Last updated:** 27 November 2026, Asia/Dhaka  
**Canonical repository:** https://github.com/hk1911369-eng/jmtacademy  
**Handoff branch:** `docs/jmt-academy-project-north-star`

## 0. Resume protocol
1. Read this file, `docs/JMT_ACADEMY_PROJECT_NORTH_STAR.md`, and `docs/JMT_BEST_IN_CLASS_FEATURE_BENCHMARK_STANDARD_2026-11-14.md`.
2. Refresh the active PR heads, changed files, comments, checks and deployment state; do not trust this snapshot without rechecking.
3. Follow Section 4's single next action. Do not restart or duplicate completed work.
4. Benchmark every feature before implementation; use measurable acceptance criteria and distinguish code, automated tests, hosted verification and production verification.
5. After meaningful work, update this file on this branch using Git blob/tree/commit/ref operations (not the Contents API `update_file`, which previously wrote to `main` when a slash-containing branch was supplied). Read back the saved file.
6. Never merge PRs, touch Production, change secrets/environment, activate payments or deploy without the required explicit approval and verified prerequisites.

## 1. Permanent project rules
- Strategic order: (1) JMT Learning Experience OS, (2) separate AI Teacher and Exam Question Predictor systems, (3) Complete Learning Ecosystem. Quality remains best-in-class across every feature.
- Keep JMT free/no-purchase until fully working; no paid domain, hosting, API, dataset or service without approval.
- Physical offline academy students are distinct from internet-disconnected users. Free missed-class recordings require active offline enrolment plus explicit authorised roll approval for the matching physical batch and period, enforced server-side.
- HSC 2027 = 2025–26 XI intake; HSC 2028 = 2026–27 XI intake.
- Manual bKash/Nagad/Rocket foundations are not automatic payment gateways.
- No Production changes, real-money activation, PR merges or releases without required approval. Do not ask the owner to repeat recorded information or log in again.
- Never claim “100x” improvement without comparable measurements. No protected branding/code/assets or unlicensed question-bank/textbook reuse.

## 2. Active task — Student Today / Learning Experience OS review
**Task:** Student Today partial-data reliability improvement has been implemented on PR #66. Finish exact-head CI verification, then carefully reconcile the stacked PR #67–#73 chain with the updated PR #66 base. Do not merge any PR.

**Active PR stack (refreshed 26 Nov 2026):**
- PR #66 — [Student Today: surface one explainable next action](https://github.com/hk1911369-eng/jmtacademy/pull/66), open/draft/unmerged; head `347031b9484afe6769bfdaeb9d4d130bc25cfa29`, base `main` (partial-data reliability follow-up added 27 Nov).
- PR #67 — [secure lesson resume and playback checkpoints](https://github.com/hk1911369-eng/jmtacademy/pull/67), open/draft/unmerged; head `4af653c8ee043af9e15f5394f11769b19be33e72`, base branch `feat/student-today-next-action`. After PR #66 advanced to `347031b...`, GitHub reports #67 `mergeable=false` / `dirty`; its recorded base SHA is stale at `d46b050...`. Stack reconciliation is required before proceeding.
- PR #68 — [unified student academic calendar](https://github.com/hk1911369-eng/jmtacademy/pull/68), open/draft/unmerged; head `88daa1381712b0b0e4fc228e17aed9979c0fe5b5`, based on #67.
- PR #73 — [approved offline missed-class recording access](https://github.com/hk1911369-eng/jmtacademy/pull/73), open/draft/unmerged; head `871ba5401b0eb781fb46c1d22727621c125a6f6e`, based on #68. Keep it draft and do not merge independently.

**Exact-head GitHub Actions evidence:**
- PR #66 previous head `95dbb20...`: CI run `45070679125`, Quality `45070679113`, LMS Quality `45070679139` passed. New head `347031b9484afe6769bfdaeb9d4d130bc25cfa29`: CI run `46043132167` passed (159 tests, 0 failures, TypeScript and ESLint passed); LMS Quality run `46043132448` passed (ESLint, guardrail tests, TypeScript, production build and production dependency audit). Quality run `46043132362` had passed tests, ESLint and TypeScript; production build was still in progress at last check.
- PR #67: CI `45215592828`, Quality `45215592840`, LMS Quality `45215592600` — all completed successfully on the current head. Earlier superseded attempts include cancelled runs; do not confuse them with the latest successful runs.
- PR #68: CI `45215609171`, Quality `45215609052`, LMS Quality `45215608900` — all completed successfully on the current head. Earlier superseded attempts include cancelled runs.
- PR #73: workflow query returned no runs and combined status returned no rows for exact head `871ba5401b0eb781fb46c1d22727621c125a6f6e`. Previous green checks belong to older commit `21898218a23c3068248bab779fd0f0acf12a51e6`, not the latest head.

**PR #66 partial-data reliability follow-up implemented 27 Nov:**
- Re-read `docs/JMT_STUDENT_TODAY_NEXT_ACTION_BENCHMARK_2026-11-15.md`, `app/student/page.tsx`, `components/learning-os-dashboard.tsx`, `lib/learning-next-action.mjs` and the PR #68 partial-source calendar behavior.
- Research added to the benchmark: Home Office User-Centred Design Manual (polite live-region status), Agriculture Design System (separates error from successful empty), Intelligence Community Design System (empty-state semantics), and Invoca Design System (preserve loaded content on partial failure). These are design-system recommendations, not controlled learning-outcome studies.
- Commit `347031b9484afe6769bfdaeb9d4d130bc25cfa29` (branch `feat/student-today-next-action`) adds independent availability tracking for goals, revision, mastery, mistakes, recommendations, upcoming exams and assignments; scoped plain-language unavailable states; em-dash summary metrics for failed sources; one polite page-level status message; and suppresses next-action ranking when a priority source fails.
- Recommendation availability tracks failures in prerequisite, prerequisite mastery/concept, lesson and lesson-concept lookup stages. Backend error details are not exposed.
- Added `lib/learning-dashboard-availability.mjs`, `lib/learning-dashboard-availability.d.mts`, `tests/learning-dashboard-availability.test.mjs`; updated `app/student/page.tsx`, `components/learning-os-dashboard.tsx`, `app/globals.css`, and the benchmark.
- GitHub PR changed-file list was rechecked after repairing the initial tree construction: it contains only the expected PR #66 code/test/benchmark paths; North Star, live handoff and permanent standard are not in PR #66.
- PR #66 remains open/draft/unmerged and mergeable. No local/browser/real-device verification was available.
- PR #67 benchmark and implementation cover separate playback checkpoints; test-only migrations and hosted RLS checks are recorded in its PR body.
- PR #68 benchmark and implementation cover agenda/week/month, course/type filters, undated work, Asia/Dhaka formatting and conflict detection. Recurring physical timetable, offline cache, push reminders and external calendar sync remain out of scope.

## 3. Offline recording feature — verified state and blocker
**PR #73 implementation remains in draft; JMT Test migrations were explicitly approved and applied only to Test.**
- JMT Test project `cullxqklmbdiosibgois` is `ACTIVE_HEALTHY`.
- Hosted migration history confirms `20261126072557 offline_recording_entitlements` and `20261126073045 offline_recording_foreign_key_indexes`.
- Synthetic QA course `d1000000-0000-4000-8000-000000000001`, batch `d2000000-0000-4000-8000-000000000001`, completed class `d3000000-0000-4000-8000-000000000001`; existing Test-only admin/teacher/student profiles reused. No Auth users or real student data created; demo courses unchanged.
- Hosted SQL/RLS checks: eligible student allowed; wrong batch, expired enrolment and revoked roster denied; assigned teacher scoped to assigned batch; unassigned teacher denied; admin allowed; student self-approval insert denied with 42501; student Storage-object insert denied with 42501; anonymous Storage listing returned zero. Persistent revoke was audited and a new approval restored the synthetic student's entitlement.
- Ten feature-specific FK indexes were applied. Performance advisor then showed zero feature-specific unindexed FK warnings; two unrelated pre-existing findings remain.
- Security advisor baseline still includes existing SECURITY DEFINER warnings, leaked-password protection disabled and two RLS-enabled tables without policies. These were not changed here.

**Storage blocker reconfirmed 26 Nov 2026:**
- Enumerated all currently available Supabase actions. They include SQL, migrations, project/schema/advisors and Edge Function deployment, but no Storage file upload/download or signed-URL action.
- Supabase documentation search confirmed the supported JavaScript methods: `storage.from(bucket).upload(...)`, `createSignedUploadUrl(...)` / `uploadToSignedUrl(...)`, and `createSignedUrl(...)`. These still require a real authorised staff session to create the upload path or signed upload token.
- Available Firecrawl action is scrape-only; no BrowserAct or authenticated browser-control/Playwright action is available. No existing staff JWT/session is available. Do not ask the owner to sign in again or supply credentials.
- No direct SQL writes were made to `storage.objects`; no service-role secret was read or used. Therefore real object upload/download, metadata publication, signed URL generation, 900-second expiry and 60-second browser/cache behavior remain unverified.
- Static source review confirms the client upload uses private bucket `offline-class-recordings`, 100 MB cap, allowed MP4/WebM/QuickTime MIME types and `cacheControl: '60'`; server action issues a 900-second signed URL only after the recording row is visible under the authenticated user's RLS. This is source inspection, not hosted Storage proof.
- A previously issued signed URL is a bearer link and can remain usable until its 900-second expiry; 60-second cache TTL does not provide instant revocation. PR/benchmark accurately records this limitation.
- No new code, migration, deployment or database change was made this session.

## 4. Single next action — do this first on resume
**Finish PR #66 exact-head verification, then reconcile the stacked PR chain.** First poll Quality run `46043132362` for head `347031b9484afe6769bfdaeb9d4d130bc25cfa29` until the production build and dependency audit complete. CI `46043132167` and LMS Quality `46043132448` already passed on that exact head. If Quality passes, inspect commit ancestry and diffs for PR #67, then safely rebase/stack its work onto the new #66 head without dropping its playback migration/tests; update descendants #68 and #73 only as required. If Quality fails, inspect logs and fix PR #66 first. Do not merge any PR.

Acceptance for the partial-data slice:
1. Successful empty results remain honest empty states.
2. Failed sources are never shown as zero/confirmed empty.
3. Healthy sections remain visible when another source fails.
4. Priority ranking is suppressed when revision, exams, assignments or recommendations cannot be checked.
5. Raw backend errors, SQL, identifiers and student records are never exposed.
6. Regression tests cover successful empty, one failure, priority-source failure and multiple failures.
7. Human mobile/screen-reader verification remains outstanding; do not claim it from automated checks.

## 5. Pending gates and safety boundaries
- PR #73 hosted Storage object lifecycle and signed-link/cache verification remain blocked until an authorised synthetic staff browser/session or equivalent supported test harness exists. No owner approval is currently needed to investigate tooling; any new Auth identity, credentials, secret use or sensitive environment change requires separate review/approval.
- PR #73 exact-head CI is still missing; no merge.
- PR #67 currently reports mergeable=false/dirty after PR #66 advanced. PR #68 and #73 heads remain unchanged; their stacked ancestry must be checked after #67 is reconciled.
- Authenticated UI QA, Android/mobile, slow-network, screen-reader and real-device verification remain outstanding across the Student Today chain.
- No PR #66–#68 or #73 merge, no Production migration/deployment, no real-money payment activation, no secrets/environment changes, no Render setting changes this session.
- Render current service/deployment state was not rechecked in this session; do not claim it is live/current.
- The daily “Continue JMT Academy” automation was previously saved for 16:00 Asia/Dhaka with flexible execution timing; its current enabled state was not rechecked this session.

## 6. Completed this session — 27 November 2026, Asia/Dhaka
- Recovered this handoff, full North Star and permanent benchmark standard; confirmed docs branch started at `a456e86eb1ff85c9f269dfacf697b3ba5e481f8c`.
- Refreshed PR #66–#68 and #73. PR #66 now points to `347031b9484afe6769bfdaeb9d4d130bc25cfa29`, remains draft/unmerged/mergeable. PR #67 reports dirty after the #66 base advanced; #68 and #73 are unchanged.
- Researched partial-data UX/accessibility references and documented the evidence and trade-offs in the PR #66 benchmark.
- Implemented source-specific dashboard failure states, truthful summary metrics, partial-data preservation, priority suppression and regression tests. Updated PR #66 body and verified the changed-file list.
- Exact-head CI run `46043132167` passed: 159 tests, 0 failures, TypeScript and ESLint. LMS Quality run `46043132448` passed: ESLint, guardrail tests, TypeScript, production build and production dependency audit. Quality run `46043132362` passed guardrail tests, ESLint and TypeScript; production build/dependency audit were still in progress at last poll.
- No local tests, browser QA, mobile/device QA or screen-reader QA were run. No database writes/migrations, Production changes, deployment, secrets/environment change, payment activation or PR merge occurred.
- Offline-recording Storage blocker remains: no authorised authenticated Storage upload route is available in connected tools; no direct SQL Storage writes or credentials were used.

## 7. New owner requests
No new product request was introduced in this session. Preserve the existing project scope and priorities.
