# Offline missed-class recording entitlement benchmark — 23 November 2026

## User problem and non-negotiable rule

Physical classroom students sometimes miss an in-person lesson. JMT may provide a free make-up recording, but an account with `delivery_mode = offline` is not proof that the person belongs to a particular physical batch or has permission to watch that recording.

Access must be tied to:
- Authenticated, active student identity.
- Active, admitted offline enrolment in the course.
- A specific active physical batch and cohort.
- An official classroom roll number explicitly approved by authorised academy staff/admin.
- A start/end entitlement period and a revocation state.
- A recording belonging to that same physical batch.

Online paid access remains a separate entitlement. A student code is an account lookup key, not the official classroom roll number.

## Benchmark findings

| Reference | Strength worth learning from | Limitation / trade-off | JMT decision |
|---|---|---|---|
| [Moodle groups and cohorts](https://docs.moodle.org/503/en/Groups_and_cohorts) | Separates site/category cohorts from course-level groups; cohort sync can keep course enrolment aligned with membership. | Administrators configure cohorts and course enrolment methods separately; the model is powerful but can be operationally confusing. | JMT uses a physical batch record plus a separate student roster and batch-scoped staff assignments. Do not conflate course enrolment with physical attendance group. |
| [Open edX content access settings](https://docs.openedx.org/en/latest/educators/references/controlling_content_visibility.html) and [cohort management](https://docs.openedx.org/en/latest/educators/how-tos/advanced_features/manage_cohorts.html) | Content visibility can be restricted to groups/cohorts; group rules can inherit from parent units; educators are told to preview the student experience. | Multiple overlapping group/access rules can conflict; the configuration burden rises quickly. | JMT keeps one explicit entitlement decision for the batch recording, with one server-side predicate reused by row and object policies. |
| Practitioner reports in [r/moodle](https://www.reddit.com/r/moodle/comments/1l220cg) | Reports mention steep learning curves, cluttered navigation, hard-to-find configuration and permission complexity; other users value bulk editing and flexibility. | Anecdotal community evidence, not representative prevalence or a controlled usability study. | JMT should make the common approval path one clear screen: identify student by JMT code, enter official roll, select validity dates, approve; expose current/expired/revoked status plainly. |

## Original JMT design

1. Admin creates an offline batch for a published course with offline delivery and assigns only course-assigned teachers/staff to that batch.
2. Assigned staff identify a student using the JMT student code, then separately record the official physical-class roll number.
3. The database accepts approval only for an active student profile with an active, admitted offline enrolment in that course.
4. The roster entry stores approver, approval time, batch, cohort snapshot, official roll and an explicit entitlement start/end.
5. A class is linked to one physical batch. Its recording is stored in a private bucket and published only after the class end time.
6. A single private database predicate checks profile, active offline enrolment, batch, approved roster, dates, revocation and course state. It protects both recording-row reads and Storage object reads. The application issues a short-lived signed URL only after the row is visible under the user's session.
7. Roster history is immutable except revocation; approvals and revocations write an admin-visible audit log. Corrections require revoking the old row and creating a new approval.

## Measurable acceptance criteria

- 0 recording-row or Storage grants for a student without an approved roster entry.
- 0 grants for wrong course, wrong batch, online/recorded-only enrolment, inactive profile, inactive/cancelled enrolment, inactive batch, archived/unpublished course, not-yet-started, expired or revoked entitlement.
- 0 staff approvals/uploads for accounts not assigned to that exact batch and still assigned to its course.
- 100% of roster approvals and revocations create an audit event with actor, student, batch, official roll and entitlement dates.
- No student-facing recording API returns meeting/join URLs.
- Recordings cannot be published before the associated live class ends or for a cancelled class.
- The same authorization predicate governs database metadata and private Storage object access; a hidden UI control is never treated as a security boundary.
- Target staff task: approve one known student in under 60 seconds after the student account is found; measure this in moderated usability testing, not as a current claim.
- Target student outcome: eligible recording opens successfully on mobile and can be refreshed after the short-lived signed URL expires; test on constrained networks before release.

## Current implementation slice and known limitations

The feature branch introduces:
- `offline_batches`, `offline_batch_staff`, `offline_batch_roster` and `offline_class_recordings`.
- Batch-specific live-class association.
- RLS/private helper functions and private Storage policies.
- Audit triggers for roster approval/revocation and recording publish/delete.
- Admin batch creation/staff assignment, assigned-staff roll approval/revocation and student recording viewing/upload UI.
- Public copy that explains the approval and period requirements.

Verification completed in this slice:
- The Node suite passes with five new offline-entitlement regression tests.
- TypeScript, ESLint and the production Next.js build pass.
- The migration was executed in an ephemeral PGlite/PostgreSQL instance. RLS checks passed for approved access and denials for missing roster, future start, expired entitlement, wrong course/batch, online enrolment, expired offline enrolment, unassigned staff and revoked access. Private Storage reads were denied in the same negative cases; roster revocation wrote an audit event. This is a local PostgreSQL simulation, not proof of behaviour on the hosted Supabase project.
- Local HTTP smoke checks returned 200 for the homepage/help/terms and 307 to login for the protected offline-operations route.

Not yet verified:
- The migration has **not** been applied to JMT Test or Production.
- JMT Test currently has 3 profiles and 3 unpublished demo courses, all configured only for `live_recorded`; it has zero enrollments, lessons, live classes and lesson resources. There is no offline course or student fixture with which to perform hosted Supabase RLS/Storage tests. Do not mutate this project or seed fixtures until the owner explicitly approves a Test-only migration and fixture operation.
- The recording upload uses the standard Supabase upload call, not resumable TUS; interruption recovery for large videos is not yet implemented.
- Authenticated mobile/browser usability and slow-network behaviour still require a safe test identity and populated test fixtures.
- External video URLs are not used for this new offline benefit; the new path uses private Storage objects and short-lived signed URLs.

## Source quality

The Moodle and Open edX pages are first-party product documentation and establish documented capabilities, not proof of user satisfaction. Reddit material is an anecdotal complaint signal only. The JMT acceptance criteria are original engineering requirements and must be verified against the actual application and database before release.


## Security review supplement — 24 November 2026

### Signed-link and cache semantics

The source review found a mismatch in the original upload path: recording objects were uploaded with `cacheControl: '3600'` while the application issued signed viewing URLs for 900 seconds. Supabase's current Smart CDN documentation says the signed-token expiry and object cache TTL are independent; a cached signed response can remain available after token expiry until the cache duration ends. Supabase's private-bucket troubleshooting guidance also warns that browser caches can continue serving a private file after access is removed and recommends a shorter `cacheControl` for revocable files.

JMT Test is currently in a Free-plan Supabase organisation (Smart CDN is Pro+), but browser caching remains relevant. The upload now sets `cacheControl: '60'`, below the 900-second signed-link lifetime. A regression test asserts both values and their ordering.

This does **not** make per-student revocation instantaneous. An already-issued signed URL is a bearer link and remains usable until its 900-second expiry; a cached response may add up to the configured 60-second cache window. Revocation prevents new metadata reads and new signed URLs. If the academy later requires immediate mid-stream revocation, replace direct signed playback with a server/Edge streaming path that checks the current entitlement on every request. That stronger path is not implemented or claimed here.

### Product and independent security evidence

- [Moodle 5.3 groupings](https://docs.moodle.org/503/en/Create_grouping) and [cohorts](https://docs.moodle.org/501/en/Cohorts) distinguish course-level groups from broader cohort membership. JMT keeps the physical batch separate from course enrolment and records the official roll independently.
- [Open edX content visibility](https://docs.openedx.org/en/latest/educators/references/controlling_content_visibility.html) supports release dates, publishing states and cohort/content-group restrictions. Its [cohort-specific content guide](https://docs.openedx.org/en/latest/educators/references/advanced_features/guide_cohort_specific_content.html) warns that inherited group rules and learner preview matter. JMT uses one explicit batch entitlement rather than stacking learner-visible group settings.
- Southern Methodist University's [classroom-recording guidance](https://www.smu.edu/oit/academictech/instructional-guidelines/guides/classroom-recording) distinguishes individual sharing from organization-wide or public-unlisted links; anyone with a public-unlisted link can view it. JMT therefore keeps the bucket private and does not expose public video URLs.
- [OWASP API1:2023 — Broken Object Level Authorization](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/) says every function that uses a client-supplied object ID must verify authorization for that exact object. JMT's recording-ID lookup relies on session-bound RLS for the recording row and a separate Storage-object policy; the ID itself is not treated as authority.
- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) provides the least-privilege control catalogue. JMT's batch-specific staff assignment is the corresponding product decision: staff access is limited to the batch and course they are assigned to, and assignment removal must be reflected in access tests.
- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control) confirms that `storage.objects` RLS controls upload, download and signed-URL creation. [Supabase Smart CDN](https://supabase.com/docs/guides/storage/cdn/smart-cdn#signed-urls-and-cdn-caching) documents the independent token/cache lifetimes and the residual-cache caveat.

### Updated release acceptance criteria

- 0 new recording-row or signed-URL grants after a student's roster entitlement is revoked, expires, or no longer matches the course/batch.
- 0 grants for online/recorded-only enrolments, inactive profiles/enrolments/batches, unpublished or archived courses, wrong batch/course, or unassigned staff.
- The signed URL lifetime remains 900 seconds and uploaded object cache TTL remains 60 seconds; automated regression tests must fail if cache TTL is raised to or above the signed-link lifetime.
- Authenticated test must verify the real browser/CDN behavior after signed-link expiry and after roster revocation. Until that test is run, report the 15-minute bearer-link lifetime plus up to 60 seconds of cache residual as a known limitation, not immediate revocation.
- No public bucket or public video URL; row metadata and Storage object reads use the same server-side entitlement predicate.
- Test recording-ID substitution, wrong batch/course, online enrolment, missing/revoked/expired roster, staff assignment removal, and signed-link expiry against hosted JMT Test before release.



## Hosted JMT Test verification — 26 November 2026

### Migration and fixture state

- Target: Supabase project `cullxqklmbdiosibgois` (JMT Test), confirmed `ACTIVE_HEALTHY`.
- Applied migration version: `20261126072557`, name `offline_recording_entitlements`. Source migration: `supabase/migrations/20261123163858_offline_recording_entitlements.sql`, Git blob `11f376a448206edf65246ff019a09d73188ccf9b`.
- Private bucket `offline-class-recordings` exists with `public=false`.
- Synthetic fixture course: `d1000000-0000-4000-8000-000000000001`; synthetic batch: `d2000000-0000-4000-8000-000000000001`; completed class: `d3000000-0000-4000-8000-000000000001`.
- Synthetic enrollment and roster use existing Test-only student identity; batch staff assignment uses existing Test-only teacher; existing Test admin performed setup. No new Auth identities were created. The original HSC 2027, HSC 2028 and Admission demo courses were not modified.
- Roster currently contains one revoked historical approval and one current approved entry. Audit log has two `offline_roster.approved` events and one `offline_roster.revoked` event.

### Hosted allow/deny evidence

| Scenario | Observed result |
|---|---|
| Eligible student, exact course + batch + active offline enrolment + approved roster | Entitlement helper returned `true` |
| Student reads own roster | 1 own roster row visible |
| Student reads batch records | 0 batches visible |
| Student reads recording metadata before any recording exists | 0 rows visible (no recording object/metadata was uploaded) |
| Wrong batch identifier | Entitlement helper returned `false` |
| Expired offline enrolment (transactional negative test, rolled back) | Entitlement helper returned `false` |
| Roster revoked (transactional negative test, rolled back) | Entitlement helper returned `false` |
| Persistent roster revocation | Access predicate denied after revocation; audit event recorded |
| Reapproval after revocation | New approval restored the entitlement; old revoked row remained immutable |
| Assigned teacher | 1 assigned batch and roster visible; `can_manage_offline_batch` returned `true` |
| Teacher not assigned to a second synthetic batch (transactional negative test, rolled back) | Predicate returned `false`; teacher could see only the assigned batch |
| Admin | Batch and roster visible; batch management predicate returned `true` |
| Student attempts to insert own roster approval | Denied by hosted RLS with SQLSTATE `42501` |
| Student attempts to insert Storage object | Denied by hosted Storage RLS with SQLSTATE `42501` |
| Anonymous Storage object listing | 0 objects visible |

Transactional negative tests were rolled back. The persistent revocation test was followed by a new approval so the synthetic student fixture remains eligible.

### Verification limitations and follow-up

- The available Supabase integration exposes SQL, migration and schema inspection actions but no Storage file-upload action. No dummy row was inserted directly into `storage.objects`; direct writes to Supabase's Storage metadata schema were intentionally avoided. Therefore actual object upload, eligible student object download, signed-URL creation, 900-second expiry, and 60-second browser/cache behavior remain unverified against hosted Storage.
- No authenticated browser or real student/staff/admin browser session was available. Hosted SQL role simulation verifies database policy behavior, not full Auth JWT or Next.js UI behavior.
- Supabase security advisors still report pre-existing public/authenticated SECURITY DEFINER warnings and leaked-password protection disabled. They do not identify the new private helper functions as public callable functions.
- Initial Supabase performance advisors reported 10 unindexed foreign-key constraints introduced by the feature migration. Follow-up migration `20261126073045` (`offline_recording_foreign_key_indexes`) adds 10 covering indexes. A fresh advisor run now reports only 2 unrelated pre-existing unindexed foreign keys (`assignment_submission_versions_assignment_id_fkey` and `lesson_playback_progress_lesson_id_fkey`). Multiple permissive policy notices remain for the distinct admin/staff/student role paths and should be reviewed for query cost.
- The feature remains a draft PR stacked on the academic-calendar branch. No PR was merged, no Production migration or deployment occurred, and no payment or secret settings changed.


### Follow-up index migration — 26 November 2026

- Source: `supabase/migrations/20261126073500_offline_recording_foreign_key_indexes.sql` (10 indexes).
- Applied to JMT Test only; Supabase migration version `20261126073045`, name `offline_recording_foreign_key_indexes`.
- Re-ran Supabase performance advisors. The feature's 10 unindexed foreign-key findings disappeared. Two unrelated pre-existing findings remain: `assignment_submission_versions_assignment_id_fkey` and `lesson_playback_progress_lesson_id_fkey`.
- This is hosted Test database verification, not Production. Production remains untouched.

## Cache semantics correction and upload interruption hardening — 28 November 2026

### Supabase cache semantics clarified

The current Supabase documentation (Smart CDN page updated 12 November 2026) makes an important distinction that must remain explicit in the release evidence:

- `cacheControl: '60'` controls the browser's cache TTL. It does **not** establish a 60-second Smart CDN edge TTL.
- Smart CDN is automatically enabled on Pro plans and above. When enabled, signed URLs are cached at the edge by their unique token; generating a new token creates a separate cache key.
- Supabase states that token expiry does not itself purge a cached CDN response. Deleting the object invalidates cached entries for that object across tokens, but global propagation can take up to 60 seconds. Browser caches are separate and may continue serving until their own `cacheControl` TTL expires.
- The 900-second signed URL remains a bearer credential. Roster revocation blocks new metadata reads and new signed-URL creation, but it does not individually revoke an already-issued URL. Immediate mid-stream revocation is not guaranteed by this design.

Official evidence:
- [Supabase Smart CDN — cache duration, signed URLs and expiry](https://supabase.com/docs/guides/storage/cdn/smart-cdn)
- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)
- [Supabase URL signing keys and revocation](https://supabase.com/docs/guides/storage/security/signing-keys)
- [Supabase private-bucket serving](https://supabase.com/docs/guides/storage/serving/downloads)
- [Supabase troubleshooting: private files after access removal/logout](https://supabase.com/kb/troubleshooting/storage-private-bucket-files-still-accessible-after-remove-access-or-logout)

The previous statement that the 60-second value represents the full cache-residual window must not be read as a CDN guarantee. It is the configured browser cache TTL. The project handoff previously recorded JMT Test as a Free-plan project; the Supabase project metadata action used in this session does not expose billing tier, so plan status was not independently rechecked. Do not assume Smart CDN is enabled or disabled without checking the current project plan.

### Hosted state re-read — 28 November 2026

- JMT Test project `cullxqklmbdiosibgois` remains `ACTIVE_HEALTHY`.
- The `offline-class-recordings` bucket is private (`public=false`), has a 100 MiB upload limit, and allows only MP4, WebM and QuickTime MIME types.
- Hosted Test counts: 1 synthetic offline batch, 1 assigned staff row, 2 roster history rows (1 currently approved), 1 linked completed class, 0 recording metadata rows and 0 Storage objects.
- All 10 follow-up foreign-key indexes are present in the hosted Test catalog. The performance advisor now reports only 2 unrelated pre-existing unindexed foreign keys: `assignment_submission_versions_assignment_id_fkey` and `lesson_playback_progress_lesson_id_fkey`.
- Because no object exists, no hosted upload, download, signed URL, expiry, browser cache or CDN cache test has occurred.

### Upload interruption handling

The browser upload component now handles thrown network/runtime errors with a `try/catch/finally` path:

- The busy state is always cleared, so a transient network failure does not leave the upload control permanently disabled.
- If an upload may have reached Storage but metadata publication has not started, the client attempts best-effort object cleanup.
- Once metadata insertion starts, the outcome can be ambiguous after a lost response. The client deliberately does not delete the object in that case; it asks staff to refresh and verify publication before retrying, avoiding deletion of an object whose metadata row may already have committed.
- A regression assertion covers the catch/finally path and the ambiguous-publication guard.

This is source-level resilience work, not a substitute for the still-missing authenticated hosted Storage test.

### Remaining hosted Storage acceptance gate

Before PR #73 can leave draft status, an authorised Test-only browser/JWT harness must verify:

1. An assigned staff account uploads a synthetic video to the exact `batch_id/live_class_id/random-file` path. Confirm the private object exists, metadata publication succeeds only after upload, MIME and 100 MiB limits are enforced, and the response carries the expected browser `Cache-Control: max-age=60` behavior.
2. An eligible synthetic student can obtain a 900-second signed URL and successfully GET/Range-read the object; anonymous users, wrong-batch students, online-only students, unapproved/revoked/expired roster entries and unassigned staff cannot create a new signed URL or read the object.
3. Revoke the student's roster after issuing a signed URL. Confirm a **new** URL request is denied. Record that the previously issued bearer URL can remain usable until its 900-second expiry; do not label this immediate revocation.
4. Test the same URL before and after expiry, with browser cache disabled and enabled. If the current project plan enables Smart CDN, inspect edge headers/cache behavior separately; do not infer CDN TTL from `cacheControl: '60'`. If object deletion is used for emergency invalidation, measure propagation and account for the documented up-to-60-second CDN invalidation window.
5. Simulate interruption during object upload and during metadata publication. Verify the UI unlocks, cleanup is best-effort, ambiguous publication is checked by refreshing before retry, and no duplicate recording is created.
6. Keep all identities, files and records synthetic and Test-only. Do not write directly to `storage.objects`, use real student recordings, alter Production, or activate payments.

The available Supabase connector still exposes SQL/migration/schema actions but no Storage object upload/download action or authenticated browser session. Until a safe owner-authorised browser/JWT path is available, the hosted Storage gate remains blocked and PR #73 stays draft/unmerged.
