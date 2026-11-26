# JMT Academy — CURRENT WORK STATE (Single Live Handoff)

> One replaceable live handoff. Durable product requirements remain in the North Star and benchmark standard. Refresh repository evidence before every resume.

**Last updated:** 26 November 2026, 19:26 Asia/Dhaka  
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
**Task:** Continue the existing Student Today branch chain after the offline-recording hosted Storage gate was investigated and found blocked by missing authenticated Storage tooling. Review the current dashboard and its data-source failure behavior, then make only a small, benchmark-backed, PR-scoped improvement if it can be safely isolated.

**Active PR stack (refreshed 26 Nov 2026):**
- PR #66 — [Student Today: surface one explainable next action](https://github.com/hk1911369-eng/jmtacademy/pull/66), open/draft/unmerged; head `95dbb20e3877a2b7ca8b7e89515a9fa5a52c0b67`, base `main`.
- PR #67 — [secure lesson resume and playback checkpoints](https://github.com/hk1911369-eng/jmtacademy/pull/67), open/draft/unmerged; head `4af653c8ee043af9e15f5394f11769b19be33e72`, based on #66.
- PR #68 — [unified student academic calendar](https://github.com/hk1911369-eng/jmtacademy/pull/68), open/draft/unmerged; head `88daa1381712b0b0e4fc228e17aed9979c0fe5b5`, based on #67.
- PR #73 — [approved offline missed-class recording access](https://github.com/hk1911369-eng/jmtacademy/pull/73), open/draft/unmerged; head `871ba5401b0eb781fb46c1d22727621c125a6f6e`, based on #68. Keep it draft and do not merge independently.

**Exact-head GitHub Actions evidence:**
- PR #66: CI run `45070679125`, Quality `45070679113`, LMS Quality `45070679139` — all completed successfully on the current head.
- PR #67: CI `45215592828`, Quality `45215592840`, LMS Quality `45215592600` — all completed successfully on the current head. Earlier superseded attempts include cancelled runs; do not confuse them with the latest successful runs.
- PR #68: CI `45215609171`, Quality `45215609052`, LMS Quality `45215608900` — all completed successfully on the current head. Earlier superseded attempts include cancelled runs.
- PR #73: workflow query returned no runs and combined status returned no rows for exact head `871ba5401b0eb781fb46c1d22727621c125a6f6e`. Previous green checks belong to older commit `21898218a23c3068248bab779fd0f0acf12a51e6`, not the latest head.

**PR #66 review already started this session:**
- Re-read `docs/JMT_STUDENT_TODAY_NEXT_ACTION_BENCHMARK_2026-11-15.md`, `app/student/page.tsx`, `components/learning-os-dashboard.tsx`, and `lib/learning-next-action.mjs` on the PR branch.
- The benchmark defines a deterministic, explainable next action and expressly avoids claiming AI prediction. Existing logic prioritises most recently overdue revision, then near-term assignment/exam, then evidence-backed recommendation, then goal/course discovery.
- Initial source-level risk to investigate next: several dashboard data queries are consumed as `data ?? []` without surfacing query errors. This can make a failed source look like a genuinely empty queue/empty mastery state. Verify all relevant query branches and the UI before changing code; PR #68 already contains a related partial-source calendar correction, so avoid duplicating it.
- PR #66 changed paths: `app/globals.css`, `app/student/page.tsx`, `components/learning-os-dashboard.tsx`, its benchmark, `lib/learning-next-action.*`, and `tests/learning-next-action.test.mjs`.
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
**Audit PR #66 Student Today partial-source failures.** Start by tracing every dashboard query in `app/student/page.tsx` through `components/learning-os-dashboard.tsx`; distinguish successful empty results from failed/unavailable sources. Compare against the existing PR #66 benchmark and PR #68 calendar partial-source behavior. Then define a small accessible warning/partial-data design and regression tests before making any code change. Keep changes on the existing stacked PR chain or a clearly stacked follow-up branch; do not rewrite/rebase the chain casually.

Acceptance for this review/follow-up:
1. A successful empty query remains a truthful empty state.
2. A failed source is never presented as confirmed “no work”, “no mastery” or “no recommendations”.
3. Partial failure identifies which section may be incomplete without hiding healthy sections.
4. No sensitive query error, SQL detail or student data is exposed.
5. Keyboard/screen-reader status is clear and mobile layout remains usable.
6. Regression tests cover full success, one-source failure, multiple-source failure and empty success.
7. Run exact-head CI/Quality/LMS checks; do not claim human browser/mobile verification without it.

## 5. Pending gates and safety boundaries
- PR #73 hosted Storage object lifecycle and signed-link/cache verification remain blocked until an authorised synthetic staff browser/session or equivalent supported test harness exists. No owner approval is currently needed to investigate tooling; any new Auth identity, credentials, secret use or sensitive environment change requires separate review/approval.
- PR #73 exact-head CI is still missing; no merge.
- Authenticated UI QA, Android/mobile, slow-network, screen-reader and real-device verification remain outstanding across the Student Today chain.
- No PR #66–#68 or #73 merge, no Production migration/deployment, no real-money payment activation, no secrets/environment changes, no Render setting changes this session.
- Render current service/deployment state was not rechecked in this session; do not claim it is live/current.
- The daily “Continue JMT Academy” automation was previously saved for 16:00 Asia/Dhaka with flexible execution timing; its current enabled state was not rechecked this session.

## 6. Completed this session — 26 November 2026, 19:26 Asia/Dhaka
- Re-read this live handoff, the full North Star (656 lines) and permanent benchmark standard (460 lines) from the docs branch.
- Refreshed PR #66–#68 and #73 metadata, stack bases, heads, mergeability and changed-file lists. All remain open/draft/unmerged/mergeable; no PR was merged.
- Refreshed exact-head GitHub Actions: all three workflows pass on #66, #67 and #68 current heads; #73 has no runs/status rows.
- Rechecked JMT Test health and migration history; project remains ACTIVE_HEALTHY and both offline feature migrations are present.
- Enumerated Supabase and browser QA actions; no authenticated Storage upload route is available. Searched official Supabase docs for upload and signed URL APIs. Did not bypass Storage RLS or request owner credentials.
- Inspected PR #73 server action, upload/access components, migration, index migration and regression tests. No source modification was made; no new tests were run.
- Re-read PR #66 benchmark, dashboard component, next-action selector and student page. Identified the next review target: distinguish partial data-source failures from genuine empty dashboard sections.
- No database writes/migrations, Production changes, deployment, secrets/environment change, payment activation or PR merge occurred.

## 7. New owner requests
No new product request was introduced in this session. Preserve the existing project scope and priorities.
