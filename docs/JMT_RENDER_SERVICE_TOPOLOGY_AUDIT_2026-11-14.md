# Render Workspace — JMT Academy Service Topology Audit

**Date:** 2026-11-14  
**Workspace:** My Workspace  
**Method:** Read-only Render service, deploy, event and log inspection; public health endpoint fetch.  
**No service configuration or deployment was changed.**

## 1. Services found

Two active, non-suspended web services point to the same GitHub repository and `main` branch:

| Property | New service | Previous service |
|---|---|---|
| Name | jmtacademy-web | jmtacademy |
| URL | https://jmtacademy-web.onrender.com | https://sanjay-kumar-chemistry-lms.onrender.com |
| Service ID | srv-dbs2jbm7bikc73ee5c10 | srv-dbn8v2hsrm7s738nntrg |
| Branch | main | main |
| Auto deploy | yes, on commit | yes, after checks pass |
| Runtime | Node | Node |
| Plan | Free | Free |
| Region | Singapore | Singapore |
| Build | npm ci && npm run build | npm ci && npm run build |
| Start | npm start | npm start |
| Health check path | blank / not configured | /api/health |
| Latest deploy | live / succeeded | live / succeeded |

Both services are configured to accept traffic from all IP addresses (0.0.0.0/0), which is normal for a public web app; application authorization must protect private routes.

## 2. New service verification

- New service deploy `dep-dbs2jbu7bikc73ee5d2g` reports live; its build and deploy events both report succeeded.
- Runtime logs show Next.js 15.5.29 starts successfully and reports “Ready” in approximately 6.5–7 seconds.
- Live `/api/health` returned:
  `{"status":"ok","app":"jmt-academy","database":"reachable"}`
- The new Render service has no Render health-check path configured, even though the application exposes a working health endpoint.

**Recommendation:** set Render's health-check path to `/api/health` on the new service after confirming this exact endpoint is intended as the service's readiness check. This audit did not change it.

## 3. Previous hostname and duplicate service

- The previous service still exists, remains non-suspended and has a live successful deployment.
- Its public URL currently responds with Render's free-tier cold-start interstitial; this is not evidence that the old hostname is decommissioned or redirected.
- The old service has `/api/health` configured as its health-check path.
- Both services deploy the same repository and branch, but have independent Render service IDs, deploy histories and settings.

**Risk:** two public Render services can serve the same application independently. A visitor or external integration using the old URL may continue to reach the old service. The old service should not be deleted until the new URL is confirmed as the sole canonical URL and all external links, callbacks, OAuth redirect URLs, email templates and integrations have been checked.

## 4. Deployment branch and PR safety

The latest deploys for both services reference the same main-branch commit:
`141d49343d80452c0871cec77fbc02367346e847`

The research and feature work in open pull requests has not been merged into main. Therefore, those draft PR changes are not part of these live deployments.

The new service auto-deploys on commits to main. The previous service auto-deploys after checks pass. Do not change either branch or auto-deploy trigger casually.

## 5. Recommended safe sequence

1. Configure `/api/health` as the new service health-check path and verify a successful deployment.
2. Review the new service's environment-variable **names and presence** against the application's required configuration without exposing secret values.
3. Check whether the old hostname is used in OAuth callbacks, payment/webhook allowlists, email links, external embeds or saved bookmarks.
4. If the owner wants the old hostname retired, arrange a deliberate redirect or migration plan first; do not delete the old service until dependencies are verified.
5. After the new URL is established as canonical, update public canonical metadata, sitemap, Search Console and external references as needed.

## 6. Change boundary

This report is read-only. No environment variables were displayed or changed; no health-check setting, hostname, redirect, service, deployment, branch or auto-deploy configuration was changed.
