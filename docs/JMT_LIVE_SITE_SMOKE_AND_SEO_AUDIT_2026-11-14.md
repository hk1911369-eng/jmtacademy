# JMT Academy Live-Site Smoke and SEO Audit

**Date:** 2026-11-14  
**Target:** https://jmtacademy-web.onrender.com  
**Method:** Read-only live fetch through Firecrawl; repository source review through GitHub.  
**Scope:** Public homepage, courses, about, robots.txt, sitemap.xml and /api/health.

## 1. Live service verification

- The first request encountered Render's free-service cold-start interstitial. This was not the application response.
- A subsequent request after the service woke returned the JMT Academy homepage and a healthy JSON endpoint.
- Health response: status ok, app jmt-academy, database reachable.
- Do not interpret the first cold-start response as an application failure or as the actual robots policy.

## 2. Crawlability and sitemap

Live robots.txt after wake-up:
- Allows / to crawlers.
- Disallows private or operational routes: /admin, /teacher, /student, /portal, /learn/, /api/, /auth/, /reset-password, /login, /register, /forgot-password, /apply.
- Declares host https://jmtacademy-web.onrender.com.
- Declares sitemap https://jmtacademy-web.onrender.com/sitemap.xml.

Live sitemap contains seven public URLs on the new host:
- /
- /courses
- /about
- /contact
- /help
- /privacy
- /terms

Repository review confirms app/robots.ts and app/sitemap.ts derive the base URL from NEXT_PUBLIC_SITE_URL, then RENDER_EXTERNAL_URL, with the legacy URL only as a fallback. The live output confirms the new host is currently selected.

## 3. Public-page findings

### Homepage
- Page title observed: “A BETTER WAY TO LEARN”.
- H1: “Learn your way. Achieve more.”
- Positions JMT Academy as online and offline learning across school/secondary, higher secondary, and admission/university/skills.
- Current public course section says new courses are being prepared.
- The small dynamic brand strapline currently reads “JMT CHEMISTRY · LEARNING · PROGRESS”. Repository code obtains this from the production academy_settings.tagline row; it is database content, not a hard-coded JSX string.
- No production setting was changed. Confirm the desired academy-wide strapline before editing that row.

### Courses
- Page title: “JMT ACADEMY · COURSE CATALOGUE”.
- H1: “Find your learning programme”.
- Search and filter controls are present for course, subject/topic, programme and learning format.
- Live catalogue currently reports “Showing 0 of 0 available courses”.
- The page extraction did not find a meta description or canonical tag. Source code already declares a canonical URL, but a description is not present in the page metadata export. Verify rendered head metadata in a browser before treating the extractor's canonical result as definitive.
- Do not seed fake/published courses just to remove the empty state.

### About
- Page title: “ABOUT JMT ACADEMY”.
- H1: “Learn with purpose. Progress with confidence.”
- Explains HSC 2027, HSC 2028 and Admission Batch, plus online/offline learning and the learning workspace.
- Transparently says location, instructor biographies, qualifications and official contacts will be published after owner verification.

## 4. Search Console connection

GSC Wizard returned no connected or shared Search Console properties. Consequently:
- No organic impressions, clicks, CTR, ranking, indexing or sitemap performance can currently be reported from Search Console.
- Do not create or verify a property on the user's behalf without access to the relevant Google account and domain verification.

## 5. Recommended next changes

1. Confirm whether the academy strapline should be broadened beyond “JMT CHEMISTRY”; update the database setting only after the intended wording is confirmed.
2. Add unique meta descriptions to /courses and other public pages where absent; preserve canonical URLs and Open Graph descriptions.
3. Publish real course entries only after the owner/teacher has approved title, subject, cohort, curriculum version, delivery mode, schedule, fee and enrollment status.
4. Connect the new Render URL or a verified custom domain as a Search Console property, then measure indexing and search performance.
5. Repeat the public smoke test after deployment and after a cold start; treat Render free-tier wake-up delay separately from application health.

## 6. Change boundary

This audit made no production database, Render setting, deployment, course publication or Search Console property change. It is evidence and a proposed work list only.


## 7. Follow-up live verification and draft SEO repair — 14 November 2026

A fresh read-only fetch of the replacement URL after the earlier audit confirmed:
- Homepage HTTP 200; page title and description metadata are present, as are Open Graph title/description/URL and Twitter title/description.
- The homepage positions JMT as a school, higher-secondary, admission, university and skills learning provider. Its public course section still reports that new courses are being prepared.
- `/api/health` returned HTTP 200 with `status=ok`, `app=jmt-academy`, and `database=reachable`.
- Malwarebytes returned **unknown**, not a verified-safe verdict. This is absence of a threat-intelligence match, not a security certification.
- The live Render service remains the Free Node service `jmtacademy-web`, connected to `hk1911369-eng/jmtacademy` on `main`, auto-deploy enabled. Its live health-check path is still blank even though the repository Blueprint specifies `/api/health`. A repository change alone does not update this live setting.

### Draft code improvement
The PR #42 branch now adds distinct meta descriptions for `/courses`, `/about`, `/contact`, `/help`, `/privacy` and `/terms`, preserving each canonical path and Open Graph URL. A regression test checks that every public informational page has a non-empty, distinct description and canonical URL. This is branch-only until reviewed, merged and deployed; the currently live site has not received this change.

### Remaining release actions
1. Verify the new CI build and dependency audit.
2. Review and merge the draft only after all checks pass.
3. Set the live Render health-check path to `/api/health` through the approved Render configuration workflow.
4. Re-fetch rendered page heads after deployment to confirm metadata, canonical URLs and sitemap output.
5. Populate the course catalogue only with owner-approved, real courses and verified details; do not seed placeholder courses to disguise an empty catalogue.
