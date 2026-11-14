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
