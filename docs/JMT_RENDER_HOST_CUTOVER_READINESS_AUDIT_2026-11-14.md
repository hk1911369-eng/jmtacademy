# JMT Academy Render host cutover readiness audit — 14 November 2026

## Decision

**Do not delete the old Render service yet.** The replacement host is serving the application, but the cutover is not proven complete. Two material configuration mismatches and two unverified authentication settings remain.

## Verified live checks

- Replacement host: `https://jmtacademy-web.onrender.com`
  - `/api/health` returned HTTP 200 with `status=ok` and `database=reachable`.
  - `/login`, `/register` and `/forgot-password` each returned HTTP 200 and rendered the JMT Academy interface.
- Previous host: `https://sanjay-kumar-chemistry-lms.onrender.com`
  - `/api/health` also returned HTTP 200 with `status=ok` and `database=reachable`.
  - The previous service is still active and is not redirecting/retired.
- Both Render services are active Free Node web services in Singapore, attached to `hk1911369-eng/jmtacademy` on `main`.
- Latest observed deploys succeeded on both services. The old service has continued to receive deploys, including a manual successful deploy on 14 November.
- The 30-day Render request-log query returned no records for either service. This is not proof of zero user traffic and must not be treated as a safe-to-delete signal.

## Blocking configuration drift

### 1. New Render health check is missing

- New service `jmtacademy-web` has an empty `healthCheckPath`.
- Old service has `/api/health` configured.
- The new endpoint is confirmed healthy, so set the new service health-check path to `/api/health` and confirm the service remains healthy after Render applies the setting.

The available Render connector can read service configuration but does not expose a service-settings update action for this field. This audit did not change Render settings.

### 2. Repository Blueprint and deployment guide still describe the old host

The current `main` branch `render.yaml` still declares:
- Service name `sanjay-kumar-chemistry-lms`
- Repository `hk1911369-eng/sanjay-kumar-chemistry-lms`
- `APP_URL` and `NEXT_PUBLIC_SITE_URL` set to the old hostname

The current `DEPLOYMENT.md` also identifies the old service, old repository and old URL as production.

This is a real source-of-truth mismatch. Do not sync the existing Blueprint as-is: it could recreate or reconfigure the old service rather than describe the current replacement. Update and review the Blueprint and deployment guide before any future Blueprint sync or service retirement.

## Authentication and integration gates

The application constructs signup-confirmation and password-recovery redirects from `APP_URL`, falling back to `NEXT_PUBLIC_SITE_URL`. The source code throws in production if neither is configured.

- The Render connector response does not expose environment-variable names/presence or values. Secret values were not requested or printed. Confirm on the new service that `APP_URL` and `NEXT_PUBLIC_SITE_URL` are both set to the replacement origin.
- The available Supabase connector does not expose the Supabase Auth Site URL / redirect allow-list configuration. Confirm the primary project Auth URL settings allow the replacement host and `/auth/confirm` callback, while keeping the old host during transition.
- A page-load check does not test actual email confirmation, password recovery, login sessions or sign-out. These flows remain unverified.
- Repository source uses manual payment review rather than a live payment gateway. Still check any external emails, bookmarks, OAuth providers, custom domains or third-party callbacks for old-host references before retirement.

## Required cutover checklist

1. Set Render health-check path on `jmtacademy-web` to `/api/health`; verify healthy status.
2. Confirm new service environment-variable presence and that `APP_URL` and `NEXT_PUBLIC_SITE_URL` use `https://jmtacademy-web.onrender.com`. Confirm its Supabase URL is the primary production project, not JMT Test.
3. Update `render.yaml` and `DEPLOYMENT.md` to describe the actual replacement service and repository. Review the diff; do not Blueprint-sync until the plan is understood.
4. Update Supabase Auth Site URL and redirect allow-list to include the replacement host. Keep the old host allowed until end-to-end tests pass.
5. Test on the replacement host: registration email confirmation, login, password reset, session refresh, sign-out, student/teacher/admin access and manual payment submission/review using an approved test account.
6. Check any custom domains, external callback URLs, notification/email templates and public links for the old host.
7. Observe the replacement service through a normal usage window and review request logs/events. Only then consider deleting the old Render service.

## Scope and safety

- Read-only inspection only.
- No Render setting, environment variable, custom domain, deploy, database, Supabase Auth setting or service was changed.
- No service was suspended or deleted.
- No environment-variable values, credentials or student data were accessed or disclosed.

**Deletion decision: NOT READY.** Reassess only after all seven cutover checks are complete.
