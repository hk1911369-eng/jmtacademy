# JMT Academy — Cross-Conversation Continuity Checkpoint

**Checkpoint date:** 15 November 2026 (Asia/Dhaka)  
**Purpose:** Preserve the exact project state, owner directives, completed work, unresolved work and next action so a future assistant can resume without restarting or asking the owner to repeat established context.

## Canonical project
- Repository: https://github.com/hk1911369-eng/jmtacademy
- Owner/repository: hk1911369-eng/jmtacademy
- Default branch: main
- Product North Star: `docs/JMT_ACADEMY_PROJECT_NORTH_STAR.md`
- Mandatory benchmark standard: `docs/JMT_BEST_IN_CLASS_FEATURE_BENCHMARK_STANDARD_2026-11-14.md`
- This checkpoint is the fast-resume index. Read it, then read the full North Star and benchmark standard before substantial work.

## Owner's permanent product directive
For **every feature, subfeature, workflow, screen, API, integration and operational process**, first find the strongest relevant website, app, product, open-source system and/or research for that exact job. Inspect what it does exceptionally well, its weaknesses, limitations, trade-offs and user complaints. Separate first-party vendor claims from independent evidence. Then design and build an original JMT solution intended to be dramatically better—owner's ambition: “one hundred times better.”

Do not copy protected UI, branding, source code, content, assets or private data. Translate “100x” into measurable criteria (task success, time, errors, learning outcomes, accessibility, reliability, security, recovery, cost, etc.); never claim a measured 100x advantage without valid comparable evidence.

**No feature should go straight from idea to code.** Required loop: user problem → best-in-class benchmark → evidence and failure modes → original JMT design decision → measurable acceptance criteria → implementation → automated and human verification → honest status/evidence log.

This directive is already fully specified in the benchmark standard and Section 17 of the North Star. Do not dilute it to a slogan or apply it only to major features.

## Strategic priorities — preserve order
1. **JMT Learning Experience OS — priority one.** World-class student-first design and UX, a coherent academic home, connected learning journey, clarity, focus, continuation, progress, mobile-first Android and low-bandwidth resilience, accessibility, ethical engagement and meaningful learning. Students should prefer JMT because it helps them study effectively—not because it traps attention. No infinite-scroll/dark-pattern/compulsive engagement design.
2. **JMT Intelligence Engine.** Distinct AI Teacher and Exam Question Predictor, trustworthy adaptive learning, mastery, revision and explainable recommendations. Predictor requires authentic lawful source corpus, syllabus/cohort matching, provenance, chronological leakage-safe backtests, calibrated uncertainty and no exact-future-question promises. AI Teacher requires curriculum-grounded explanations, Bengali/English, hints-first pedagogy, citations, uncertainty and teacher escalation.
3. **Complete Learning Ecosystem.** Courses, lessons, live/recorded classes, assessments, virtual labs, academic tools, community, teacher/parent/admin workspaces, offline entitlements, secure payments/finance, reporting, support and integrations.

The ten signature pillars and their detailed requirements remain in Section 16 of the North Star. Do not replace the charter with a generic strategy.

## Exact last stopping point (15 November 2026)
The last assistant delivery reported:
- A Best-in-Class Feature Benchmark Standard saved and read-back verified on branch `docs/jmt-academy-project-north-star`. The North Star records initial benchmark document commit `e5be70d64004ade63b9d3bcd8ac41ece6ad317f0`; the benchmark standard contains a 12-dimension rubric, evidence/source hierarchy, trade-off analysis, measurable acceptance criteria, feature status vocabulary and a reusable feature benchmark template.
- The first benchmark pass covered Duolingo, Khan Academy, MyStudyLife, PhET, GeoGebra, Piazza, Moodle, Gradescope, BigBlueButton, Replit, and Bangladesh payment references (bKash, SSLCOMMERZ, shurjoPay, aamarPay, PortPos), plus WCAG 2.2 and a 2026 meta-analysis of retrieval, spacing and interleaving. Treat these as initial candidates, not permanent winners; revalidate current products and exact capabilities when each feature enters implementation.
- A deep benchmark of the **Student Today dashboard** was completed. The next implementation target was identified as making the dashboard a single intelligent learning journey.
- PR #65 was created as a draft, not merged: https://github.com/hk1911369-eng/jmtacademy/pull/65
- PR #65 title: “JMT Learning Experience OS: first public identity and eligibility-copy corrections”.
- Last directly fetched PR #65 metadata: open=true, draft=true, merged=false, base=main, head branch `feat/jmt-learning-experience-os-first-pass`, head SHA `8dae210b135bb44322fa9fe206377720823f8f28`. It changes homepage fallback branding and removes unsupported unconditional free-recording claims; adds regression tests. It explicitly does **not** implement offline roll-number enforcement. CI must be freshly checked on the exact current head before any review/merge decision.
- Last reported checks: LMS quality checks passed; other quality/CI checks were still running. This is historical, not a current CI assertion.

## Next task — resume here, do not restart
**Student Today dashboard / Personal Academic Command Centre.** Before coding:
1. Refresh PR #65 head, changed files, checks and latest comments; do not assume the previous status is current.
2. Re-read the latest North Star and benchmark standard from GitHub.
3. Inspect current main and relevant open PR branches to identify existing goals, revision tasks, mastery, mistake memory, recommendations, upcoming assessments, lesson progress, timetable/calendar and student dashboard components. Avoid duplicating existing foundations.
4. Benchmark the exact dashboard journey against best-in-class references and current student needs; capture source URLs, what works, failures/trade-offs and JMT decisions.
5. Build an integrated experience with these previously agreed outcomes:
   - One clear, explainable **Next best learning action**.
   - Reliable **Continue where you stopped** with recovery after interruption.
   - One connected calendar for classes, assignments, exams and revision.
   - Evidence-backed recommendations that explain why each is suggested.
   - A beautiful, useful first-use/empty state for students with no learning history.
6. Define measurable acceptance criteria and test loading, empty, error, offline/slow network, accessibility, mobile/Android, role/privacy and security states.
7. Implement in a reviewable branch, test, inspect the actual UI and record exact evidence/status. Do not merge or deploy merely because code exists.

## Non-negotiable existing safeguards
- HSC 2027 = 2025–26 XI intake; HSC 2028 = 2026–27 XI intake. Never mix their syllabus/source records.
- Offline-batch recorded access must be assigned only to students whose roll numbers are authorised by permitted staff/teacher/admin, bound to identity + cohort + batch + entitlement period, enforced server-side across pages/APIs/media/playback/download, revocable and auditable. UI hiding alone is insufficient.
- Main currently has manual bKash, Nagad and Rocket payment submission/review foundations; this is not proof of automatic gateway checkout or settlement. Do not claim automatic integration. Do not activate real-money methods without actual merchant onboarding, credentials, legal/compliance review, settlement destination and test-mode verification.
- Do not invent provider accounts, credentials, academic sources or production verification.
- Existing Render/Supabase topology discrepancy is unresolved. New `jmtacademy-web` may point to test Supabase while legacy `jmtacademy` uses production. Do not switch production env vars or redeploy for cutover without the specific approval previously requested.
- Do not apply production migrations, alter production data, activate payments, change sensitive environment variables, merge PRs or make irreversible financial/production changes without verifying prerequisites and obtaining the relevant explicit approval.
- Distinguish designed, code-on-main, draft-PR-only, tested, test-verified and production-verified. Never inflate feature counts from route/migration/function counts.

## Durable memory and cross-chat behavior
This GitHub repository is the durable, version-controlled source of truth. Chat memory can help retrieve this context but cannot guarantee that every future new chat automatically loads every detail. At the beginning of a new JMT conversation, retrieve this checkpoint and the two canonical documents before acting. If a new chat does not have the context, use these repository paths rather than guessing or asking the owner to repeat the project history.

## Latest known PR/document references
- PR #65: https://github.com/hk1911369-eng/jmtacademy/pull/65
- North Star branch file: https://github.com/hk1911369-eng/jmtacademy/blob/docs/jmt-academy-project-north-star/docs/JMT_ACADEMY_PROJECT_NORTH_STAR.md
- Benchmark standard: https://github.com/hk1911369-eng/jmtacademy/blob/docs/jmt-academy-project-north-star/docs/JMT_BEST_IN_CLASS_FEATURE_BENCHMARK_STANDARD_2026-11-14.md
