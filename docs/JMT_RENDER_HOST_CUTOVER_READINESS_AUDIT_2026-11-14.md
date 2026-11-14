# JMT Academy Render host cutover readiness audit — 14 November 2026

## Decision

**The repository-side source-of-truth mismatch has been corrected on the open PR branch, but the live Render service and authentication configuration still need verification. Do not delete or suspend any service based on this report alone.**

## Verified live checks

- Replacement host: `https://jmtacademy-web.onrender.com`
  - `/api/health` returned HTTP 200 with `status=ok` and `database=reachable`.
  - `/login`, `/register` and `/forgot-password` each returned HTTP 200 and rendered the JMT Academy interface.
- Previous host: `https://sanjay-kumar-chemistry-lms.onrender.com`
  - `/api/health` also returned HTTP 200 with `status=ok`.
  - It remains active in Render. The user has directed that project work proceed with the replacement as the sole intended production target; no deletion or suspension was performed.
- Both services were attached to `hk1911369-eng/jmtacademy` on `main` at the time of inspection.
- Render request-log retrieval returned no records for the inspected period. This is not proof of zero user traffic.

## Repository correction completed on the open PR branch

The following files were updated on `audit/jmt-master-prompt-follow-through`:

- `render.yaml`: production service is now named `jmtacademy-web`, uses repository `hk1911369-eng/jmtacademy`, retains `main`, configures `/api/health`, and sets both public URL variables to the replacement hostname.
- The prepared staging definition now references the renamed repository too. Its Supabase URL, anon key and service-role key remain manual secure inputs (`sync: false`); it has not been provisioned.
- `DEPLOYMENT.md`: production service, repository, URL, health check, environment-variable requirements and rollback instructions now describe `jmtacademy-web`. It explicitly warns against reintroducing the old service through a Blueprint sync.
- Added `tests/render-blueprint.test.mjs` to protect the production hostname/repository, health check, staging secret isolation and deployment documentation.

These changes are on the draft PR branch, not `main`. They have not changed the live service, deployed production code or synchronized a Render Blueprint.

## Remaining live configuration gates

1. The live Render service's `healthCheckPath` was blank when inspected. The Blueprint now contains `/api/health`, but that setting will not take effect until the reviewed Blueprint is applied or the service setting is updated in Render.
2. Render's available read-only service response did not expose environment-variable names/presence. Confirm `APP_URL` and `NEXT_PUBLIC_SITE_URL` on `jmtacademy-web` both equal `https://jmtacademy-web.onrender.com`, and verify its Supabase URL points to the primary production project.
3. The available Supabase connector did not expose Auth Site URL / redirect allow-list configuration. Confirm the primary project's Site URL and allow-list include the replacement host and `/auth/confirm`.
4. Actual registration email confirmation, password recovery, session refresh, sign-out, student/teacher/admin access and manual payment review remain untested end-to-end.
5. Check external OAuth providers, email templates, custom domains, callback URLs, notification links and bookmarks for old-host dependencies.

## Required release sequence

1. Review and merge the repository changes only after all required CI checks pass and the owner approves merging.
2. Apply the reviewed Render health-check configuration to the existing `jmtacademy-web` service; do not create another production service.
3. Verify production environment variables and primary Supabase Auth redirect settings without exposing secrets.
4. Test all authentication and role-gated workflows on the replacement host with approved test accounts.
5. Monitor real usage and inspect Render logs/events over a normal usage window.
6. Only after all checks pass should the old Render service be considered for deletion.

## Scope and safety

- Repository documentation and test changes only, on an open draft PR branch.
- No Render setting, environment variable, custom domain, deployment, Blueprint sync, database or Supabase Auth setting was changed.
- No service was suspended or deleted.
- No secret values, credentials or student data were accessed or disclosed.

**Deletion decision: NOT READY.** The repository-side fix is prepared for review; live configuration and end-to-end validation remain outstanding.
