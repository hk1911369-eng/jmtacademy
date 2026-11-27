# JMT Academy — CURRENT WORK STATE (Single Live Handoff)

> Replaceable operational checkpoint. Durable product requirements remain in the North Star and permanent benchmark standard. Refresh GitHub, Supabase and deployment evidence before every resume.

**Last updated:** 28 November 2026, Asia/Dhaka  
**Canonical repository:** https://github.com/hk1911369-eng/jmtacademy  
**Handoff branch:** `docs/jmt-academy-project-north-star`

## 0. Resume protocol
1. Read this file, `docs/JMT_ACADEMY_PROJECT_NORTH_STAR.md`, and `docs/JMT_BEST_IN_CLASS_FEATURE_BENCHMARK_STANDARD_2026-11-14.md`.
2. Refresh current PR heads, base heads, changed files, comments, conflicts, checks and deployments. Do not trust this snapshot without rechecking.
3. Follow Section 4's exact next action.
4. Distinguish source inspection, local tests, GitHub Actions, hosted Test verification, authenticated UI verification and Production verification.
5. Update this handoff after meaningful work and read the saved version back.
6. Never merge PRs, touch Production, change secrets/environment, activate payments or deploy without required explicit approval and verified prerequisites.

## 1. Permanent project rules
- Strategic order: (1) JMT Learning Experience OS, (2) separate AI Teacher and Exam Question Predictor systems, (3) Complete Learning Ecosystem.
- Keep JMT free/no-purchase until fully working; no paid domain, hosting, API, dataset or service without approval.
- Physical offline academy students are distinct from internet-disconnected users. Free missed-class recordings require active offline enrolment plus explicit authorised roll approval for the matching physical batch and entitlement period, enforced server-side.
- HSC 2027 = 2025–26 XI intake; HSC 2028 = 2026–27 XI intake.
- Manual bKash/Nagad/Rocket foundations are not automatic payment gateways.
- No Production changes, real-money activation, PR merges or releases without required approval. Do not ask the owner to repeat recorded information or log in again.
- Never claim “100x” improvement without comparable measurements. No protected branding/code/assets or unlicensed question-bank/textbook reuse.

## 2. Completed task — Student Today stack reconciliation and exact-head verification

**Current PR stack — refreshed 27 November 2026**
- PR #66 — [Student Today: surface one explainable next action](https://github.com/hk1911369-eng/jmtacademy/pull/66), open/draft/unmerged; head `347031b9484afe6769bfdaeb9d4d130bc25cfa29`, base `main`.
- PR #67 — [secure lesson resume and playback checkpoints](https://github.com/hk1911369-eng/jmtacademy/pull/67), open/draft/unmerged; head `84a2d3a8778bd887796a19be35410654adffea70`, base PR #66 head `347031b9484afe6769bfdaeb9d4d130bc25cfa29`.
- PR #68 — [unified student academic calendar](https://github.com/hk1911369-eng/jmtacademy/pull/68), open/draft/unmerged; head `0547adbe718271d0f0b15349d6617662e0e49413`, base PR #67 head `84a2d3a8778bd887796a19be35410654adffea70`.
- PR #73 — [approved offline missed-class recording access](https://github.com/hk1911369-eng/jmtacademy/pull/73), open/draft/unmerged; head `7288f6331c83dc84b621586cdcf4ad5714d4115e`, base PR #68 head `0547adbe718271d0f0b15349d6617662e0e49413`.
- GitHub currently reports all four PRs open, draft, unmerged and mergeable. No PR was merged. The stack ancestry was verified with compare-commits: each child is ahead of its current base and behind by zero commits.

**Stack reconciliation completed this session**
- PR #67 merged the current PR #66 base with its playback checkpoint feature in merge commit `f868e6bcab35998d92a296b6005a032e6afaa1eb`. Follow-up commit `84a2d3a8778bd887796a19be35410654adffea70` removes an unused helper import from `app/student/page.tsx`; playback resume and partial-data tracking remain.
- PR #68 merged the updated PR #67 branch in merge commit `eca8dc0d65165946b9f441e4e3f4eb21a2f2789b`. Follow-up `0547adbe718271d0f0b15349d6617662e0e49413` preserves the calendar-aware page while removing the unused import.
- PR #73 merged the updated PR #68 branch in merge commit `88124499dc6d38270fd73471f2d4b0cc950f57dc`. Follow-up `7288f6331c83dc84b621586cdcf4ad5714d4115e` inherits the corrected calendar page without overwriting offline-recording feature files.
- The final PR #73 tree was read back: `app/student/page.tsx` retains calendar queries, lesson resume, and partial-data tracking; it does not contain the unused helper import. `components/learning-os-dashboard.tsx` retains calendar, continue-lesson and source-specific error states. CSS retains calendar, resume and partial-data styles.
- PR #67/#68/#73 descriptions were updated with reconciliation notes and latest heads. Changed-file lists were refreshed; PR #73's feature diff remains limited to its offline-recording files relative to its current base.

**Student Today partial-data reliability**
- Benchmark additions are in `docs/JMT_STUDENT_TODAY_NEXT_ACTION_BENCHMARK_2026-11-15.md`. Research sources and trade-offs include Home Office UCD notifications, Agriculture Design System loading/empty/error states, Intelligence Community Design System empty-state guidance and Invoca error handling. These are design-system recommendations, not controlled learning-outcome studies.
- Added `lib/learning-dashboard-availability.mjs`, `lib/learning-dashboard-availability.d.mts`, and `tests/learning-dashboard-availability.test.mjs`.
- Updated `app/student/page.tsx`, `components/learning-os-dashboard.tsx`, and `app/globals.css` across the stack.
- Independently tracks goals, revision, mastery, mistakes, recommendations, upcoming exams, upcoming assignments and calendar query failures.
- Failed sources no longer masquerade as successful empty results or zero counts. Healthy sections remain visible. A failed priority source suppresses next-action ranking. The page-level message uses `role="status"` and `aria-live="polite"`; raw backend errors are not exposed.
- Calendar's own source-error UI remains present; calendar source failures also contribute to the page-level status.
- Acceptance criteria are recorded in the benchmark: truthful empty vs unavailable, section isolation, no misleading priority, no inferred mastery, accessible polite status, regression tests, and human mobile/screen-reader verification.

**Checks and limitations**
- PR #66 exact head `347031b9484afe6769bfdaeb9d4d130bc25cfa29`: CI run `46043132167`, Quality run `46043132362`, LMS Quality run `46043132448` all passed. CI: 159 tests, zero failures, TypeScript and ESLint. Quality/LMS Quality: guardrails, ESLint, TypeScript, production build and production dependency audit passed.
- New exact-head workflow queries for PR #67 head `84a2d3a...`, PR #68 head `0547adb...`, and PR #73 head `7288f63...` returned no runs. Their older green workflow results do not validate these reconciled heads.
- Workflow files currently target `main` for push/pull_request; LMS Quality also supports workflow_dispatch. A temporary PR #67 base retarget to `main` did not create workflow runs and was restored. A temporary no-op validation commit was reset; it is not present at the branch head. No lasting base change remains.
- This session ran only the isolated Node availability-helper tests: **4 passed, 0 failed**. No full repository npm test, typecheck, lint or production build was run. No browser/mobile/screen-reader QA was run.
- Human Android/mobile, slow-network, screen-reader and authenticated student QA remain outstanding.

## 3. Offline missed-class recording feature — hosted Test state and blocker

**PR #73 implementation remains draft and unmerged. Test-only migrations were explicitly approved and applied.**
- JMT Test project `cullxqklmbdiosibgois` is `ACTIVE_HEALTHY`.
- Hosted migration history confirms `20261126072557 offline_recording_entitlements` and `20261126073045 offline_recording_foreign_key_indexes`.
- Synthetic QA course `d1000000-0000-4000-8000-000000000001`, batch `d2000000-0000-4000-8000-000000000001`, completed class `d3000000-0000-4000-8000-000000000001`; existing Test-only admin/teacher/student profiles reused. No Auth users or real student data created; demo courses unchanged.
- Hosted SQL/RLS checks: eligible student allowed; wrong batch, expired enrolment and revoked roster denied; assigned teacher scoped to assigned batch; unassigned teacher denied; admin allowed; student self-approval insert denied with SQLSTATE 42501; student Storage-object insert denied with SQLSTATE 42501; anonymous Storage listing returned zero objects. Persistent revocation was audited and a new approval restored the synthetic student's entitlement.
- Ten feature-specific FK indexes were applied. Performance advisor then showed zero feature-specific unindexed FK warnings; two unrelated pre-existing findings remain.
- Security advisor baseline still includes existing SECURITY DEFINER warnings, leaked-password protection disabled and two RLS-enabled tables without policies. These were not changed here.

**Storage blocker**
- Available Supabase actions include SQL, migrations, project/schema/advisors and Edge Function deployment, but no Storage upload/download or signed-URL action.
- Supabase Storage's supported JavaScript methods require an authorised staff session. No authenticated browser-control/Playwright/BrowserAct action or existing staff JWT/session is available.
- No direct SQL writes were made to `storage.objects`; no service-role secret was read or used. Do not ask the owner to log in again or provide credentials.
- Actual object upload/download, eligible object read, metadata publication, signed-URL creation, 900-second expiry and 60-second browser/cache behavior remain unverified.
- Static source review: private bucket `offline-class-recordings`, 100 MB cap, MP4/WebM/QuickTime MIME types, upload cacheControl `60`, signed URL expiry `900` seconds, created only after authenticated student authorization. A previously issued signed URL is a bearer link and may remain usable until expiry; 60-second cache TTL does not provide instant revocation.
- PR #73 latest head `7288f633...` has no exact-head workflow runs. Earlier checks on `21898218...` are historical only.

## 4. Single next action — do this first on resume

**Resolve the authorised Test Storage upload/playback verification path for PR #73, without exposing credentials or touching Production.**
1. Reconfirm JMT Test project `cullxqklmbdiosibgois` remains `ACTIVE_HEALTHY` and its two approved offline-recording migrations remain applied. Do not make a new migration or mutate existing real data.
2. Discover whether an authorised synthetic staff session can be created using existing supported Supabase Auth actions, or whether a supported Test-only browser/session harness exists. The current Supabase connector exposes SQL, migrations, project/schema/advisors and Edge Function operations but no Storage upload/download or signed-URL action; do not pretend SQL can substitute for the Storage API.
3. Do not request the owner's login, JWT, service-role key or any credential. Do not use a service-role bypass or direct SQL writes to `storage.objects`. If no supported authorised session/action is available, document the exact blocker and the minimum safe enabling capability; keep the feature draft/unmerged.
4. If a valid synthetic staff session becomes available, test the actual object upload (100 MB and MIME constraints), metadata publication, eligible student playback/download, wrong-batch/expired/revoked denial, signed URL expiry (900 seconds), cache behavior (60 seconds) and post-revocation behavior. Record observed results separately from source inspection and hosted RLS SQL checks.
5. In parallel, request the owner to confirm the Render workspace before any Render service/deployment inspection: both linked Render account aliases list the same workspace `My Workspace` (`tea-dbn7i7lbedkc73fshc40`), but the connector explicitly requires owner confirmation before selecting a workspace. No Render service or deployment was changed.
6. Keep PR #66–#68 and #73 open/draft/unmerged. Do not deploy, merge, change secrets/environment or touch Production. After meaningful progress, update and read back this handoff.
## 5. Pending gates and safety boundaries
- PR #73 hosted Storage object lifecycle and signed-link/cache verification remain blocked until an authorised synthetic staff browser/session or equivalent supported test harness exists.
- PR #73 exact-head CI is missing. PR #67 and #68 exact-head CI is also missing after reconciliation.
- Authenticated UI QA, Android/mobile, slow-network, screen-reader and real-device verification remain outstanding.
- No PR #66–#68 or #73 merge, no Production migration/deployment, no real-money payment activation, no secrets/environment changes, no Render setting changes this session.
- Render deployment state was not checked: the connected Render tools returned a workspace-selection requirement. Both linked account aliases list the same workspace ID `tea-dbn7i7lbedkc73fshc40`, but owner confirmation is required before selecting it. No Render changes were made.
- Daily “Continue JMT Academy” automation was previously configured for 16:00 Asia/Dhaka with flexible execution timing; its current enabled state was not rechecked.

## 6. Completed this session — 27 November 2026, Asia/Dhaka
- Recovered this handoff, full North Star and permanent benchmark standard; verified the canonical repository and docs branch.
- Inspected PR #66–#68 and #73 heads, ancestry, changed files, comments, mergeability and exact-head workflow history.
- Reconciled PR #67, #68 and #73 sequentially with merge commits; preserved playback security, calendar and offline-recording feature code while carrying forward Student Today partial-data handling.
- Removed an unused import from the merged Student Today page and propagated the correction through PR #68 and #73. Read back the final PR #73 page, dashboard, CSS, helper, declaration, tests and benchmark.
- Updated PR #67/#68/#73 descriptions and verified latest heads. All remain open/draft/mergeable/unmerged.
- Ran the four isolated Node availability-helper tests: 4 passed, 0 failed.
- Confirmed no exact-head workflows were returned for the new #67/#68/#73 commits; a temporary base retarget to main did not trigger checks and was restored. No-op validation commit was reset.
- No full repository test/build, browser/mobile QA, database mutation, migration, Production change, deployment, secret/environment change, payment activation or PR merge occurred.

## 7. New owner requests
No new product request was introduced in this session. Preserve the existing project scope and strategic priorities.

## 8. Completed this session — 28 November 2026, Asia/Dhaka
- Recovered and re-read the live handoff, the 75,528-character North Star and the 50,774-character permanent benchmark standard from the handoff branch. The canonical repo and documented next action matched the previous checkpoint.
- Refreshed PR #66, #67, #68 and #73 metadata, base/head SHAs, changed-file lists, comments, mergeability and exact-head workflow runs. All feature PRs remain open/draft/unmerged/mergeable; no new feature commits were made.
- Confirmed the three workflows target pull requests to `main`. Created temporary validation branch `ci/validate-jmt-stack-7288f63` pointing to the exact existing PR #73 commit (no new commit), then temporary PR #75 to `main` solely to trigger those supported checks. The PR head SHA was exactly `7288f6331c83dc84b621586cdcf4ad5714d4115e`. Closed PR #75 unmerged after completion; the canonical feature branches were not retargeted.
- All three exact-head workflows passed: CI `46047365608`, Quality `46047365806`, LMS Quality `46047365618`. Each executed 184 tests with zero failures; TypeScript and ESLint passed. Both production builds succeeded and generated 41 static pages. Production dependency audits found 0 vulnerabilities.
- Updated PR #73 description with the exact-head validation links and scope limitations. Verified PR #73 still open/draft/unmerged/mergeable and PR #75 closed/unmerged.
- Re-discovered available Supabase actions: no Storage upload/download or signed-URL operation exists. No browser automation/authenticated test harness was found in the connected tools. No credential was requested, no service-role bypass used and no direct SQL write to `storage.objects` performed.
- Attempted a local Git checkout, but the runtime could not resolve `github.com`; the exact-head GitHub-hosted workflows provided full automated verification instead.
- Checked Render workspace discovery. Both linked aliases show the same `My Workspace` ID `tea-dbn7i7lbedkc73fshc40`, but the connector requires explicit owner confirmation before selecting a workspace. Service/deployment status remains unchecked; no Render operation was performed.
- No Supabase database changes, migrations, Production changes, deployment, payment activation, secret/environment changes or feature PR merges occurred.
- Next active task is the Storage lifecycle verification described in Section 4; full CI verification is complete, not the remaining authenticated Storage/UI QA.
