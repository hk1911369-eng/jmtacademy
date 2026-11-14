# JMT Academy — Project North Star and Working Memory

> **Purpose of this file:** durable project anchor for future work. Read this before choosing the next task. Continue the existing project; do not silently replace its goals with a new idea, generic blueprint, or isolated content-writing exercise.

**Project name:** JMT Academy  
**Repository:** https://github.com/hk1911369-eng/jmtacademy  
**Operating principle:** quality first; keep the project free/no-purchase until it is fully working. Do not buy domains, paid hosting, APIs, datasets, or services without explicit approval. The website comes first; mobile and desktop apps are later.

## 1. The existing project — do not redefine it

JMT Academy is an educational learning platform, with a broader academic and AI vision already part of the project. The following are not newly proposed features; they are established project goals to continue developing.

### A. Exam Question Predictor AI
Research and build an evidence-based system that helps HSC and other exam candidates prepare intelligently. Its foundations are:
- Authentic historical board, college/admission and other relevant examination questions, collected from identifiable sources and organised by subject, paper, year, board, chapter, topic, question type and marks.
- Official syllabuses, curriculum documents, textbooks, examination rules, question-setting/moderation guidance and changes between examination years.
- Reliable topic mapping, question-pattern analysis, marks/frequency trends, coverage gaps and teacher-reviewed classifications.
- Back-testing against unseen exam years, with no future-data leakage; measure whether topic-priority guidance is useful and calibrated.
- Explainable outputs showing the evidence, sample size, time period, uncertainty and syllabus comparability.
- The system must offer revision priorities and practice guidance, never promise or claim to know exact future questions.

### B. AI Teacher / AI Tutor
Build a subject-aware teaching assistant for JMT Academy students. Its knowledge and behavior should be grounded in:
- Official syllabus and textbook-aligned subject/chapter/topic structures.
- Verified explanations, definitions, formulae, derivations, worked solutions, diagrams and examples.
- Teacher-reviewed question answers, marking rubrics, misconceptions and practice sets.
- Bengali and English academic terminology and student-appropriate explanations.
- Step-by-step reasoning for calculations and problem solving, with checks for units and assumptions.
- Source-linked answers, honest uncertainty, and teacher escalation when material is missing or disputed.
- Personalised learning and practice based on student progress only with suitable privacy and consent controls.

The Predictor and AI Teacher are separate systems with different evaluation criteria. Their data may overlap, but a predictor's frequency statistics are not a substitute for a teacher's verified explanations.

## 2. Research and academic workstreams already in the project

Continue the research programme that supports the two AI systems and the wider academy:
1. **Curriculum Atlas:** map official Bangladesh curricula, current syllabus versions, subject/paper codes, chapters, topics, learning outcomes and textbooks.
2. **Historical Exam Question Corpus:** discover, authenticate, collect where lawful, digitise/transcribe, de-duplicate, classify and teacher-review past board and admission questions. Preserve provenance and rights status for every item.
3. **Question-setting and exam-pattern research:** study official board question-setter/moderator materials, exam formats, marks distributions, cognitive levels and historical changes.
4. **ACS/education ecosystem research:** continue the previously discussed research into the relevant ACS ecosystem and useful academic resources. Preserve the intended scope from earlier project discussions; do not assume a guessed expansion of the acronym or narrow it without evidence.
5. **Virtual Lab Network:** identify suitable virtual laboratory and simulation resources, map them to syllabus topics, assess accessibility/device requirements and safety/educational quality, and integrate only after review.
6. **AI Teacher knowledge collection:** prepare reliable, structured, cited teaching content and reviewed answer/explanation sets across subjects.
7. **Predictor research and validation:** build transparent baselines first, then evaluate against chronological holdout years and compare performance by subject, board and question type.
8. **Integration into the JMT Academy LMS:** deliver the AI features as part of the academy's actual student/teacher workflows, not as disconnected demos.

## 3. Subject coverage and sequencing

The intention is multi-subject coverage, not Chemistry-only. Priority HSC subjects include Chemistry, Physics, Higher Mathematics, Biology and ICT, plus other subjects and admission-exam areas as the verified curriculum and project scope require.

Chemistry is a current content pilot because draft HSC 2027 Chemistry chapter teacher packs have been prepared. Those packs can contribute to the AI Teacher after academic verification, but they are not the Predictor dataset and do not mean Physics or Higher Mathematics have been researched or completed.

Do not invent an official HSC 2027 syllabus, marks distribution or exam pattern. Verify against current NCTB and relevant education-board primary sources. Label older papers and historical patterns with their year and syllabus version.

## 4. Platform delivery priorities

- Complete and stabilise the JMT Academy website/LMS first.
- Maintain clear student, teacher and admin workflows, secure access, payments/finance, assessments, learning progress and support.
- Keep security, database migration integrity, accessibility, mobile responsiveness, performance and end-to-end QA as release gates.
- Do not apply database migrations, alter production data, publish courses, open enrolments, change payment settings or deploy risky changes without the required review/approval.
- Mobile and desktop apps are a later phase after the website is reliable.

## 5. Research integrity, safety, privacy and cost rules

- Prefer primary official sources (NCTB, Ministry of Education, education boards, official textbooks and exam notices); use secondary sources as discovery aids, not as authority.
- Record source title, publisher/board, URL or physical reference, exam/publication year, retrieval date, syllabus version, rights/permission status, transcription confidence and reviewer.
- Do not scrape, redistribute or train on copyrighted books/question banks without permission. Where rights are unclear, preserve metadata and create original teacher-authored explanations instead.
- Keep student identity, contact details, payment records and private account information out of model-training/analytics features. Use consent, pseudonymisation, retention controls and access audits.
- Generated academic content remains a draft until checked by a qualified teacher.
- Do not fabricate citations, question frequency, exam trends, source access or completed research.
- Use free/open resources and current connected services first. No paid purchase without explicit approval.

## 6. What has actually been done — snapshot dated 2026-11-14

This section is a status checkpoint, not a claim that the whole vision is complete.

### Platform
- Repository: `hk1911369-eng/jmtacademy`.
- Live Render site: https://jmtacademy-web.onrender.com (free service; may sleep).
- Main branch live deployment was verified at commit `141d49343d80452c0871cec77fbc02367346e847`.
- Existing draft PRs #60 and #61 cover catalogue/accessibility/SEO and payment-fee snapshot safeguards. They were not merged at this checkpoint.
- PR #62 contains draft HSC 2027 Chemistry course blueprint and Chapter 1–3 teacher packs. It is academic draft content, not official syllabus approval.
- The live database has not been migrated as part of the latest research work; no student records or courses were created/published by that work.

### AI and research
- No Exam Question Predictor model has been trained or deployed.
- No complete, authenticated, rights-cleared historical exam question corpus has been collected/tagged.
- No full Curriculum Atlas has been completed.
- No complete multi-subject AI Teacher knowledge base has been completed.
- The Chemistry Chapter 1–3 packs are draft teaching resources only.
- PR #63 was created as an AI data blueprint after the assistant misunderstood the user's request. It is supplementary documentation, not the original research programme and not evidence that research/data collection has been completed. Do not let PR #63 replace the actual workstreams above.

## 7. Required working behavior for future sessions

Before doing work:
1. Read this Project North Star and check the current repository/PR/deployment state; do not assume this snapshot is still current.
2. Identify the next unfinished, highest-value task in the existing programme.
3. Do the real work: inspect primary sources, collect and structure evidence, create traceable datasets/resources or implement/test the actual LMS feature.
4. Update this file's progress log with concrete outputs, source references, dates and limitations when meaningful work is completed.
5. Report exactly what changed, what was verified, what remains, and any blocker. Never claim a model, dataset, integration, migration, test or deployment exists unless it was actually completed and verified.

**Default next research task:** start the actual Curriculum Atlas and source inventory for HSC subjects using current official NCTB/education-board material; in parallel, identify and catalogue authentic past-paper sources and question-setter/moderator resources. Then build the question corpus and teacher-reviewed topic map. Do not spend the next work cycle writing another generic AI strategy document.

**User's intent:** remember and continue the original JMT Academy vision, especially the Exam Question Predictor AI and AI Teacher, with real research and implementation rather than repeatedly re-describing the idea.


## 8. Actual research log — 2026-11-14

This is the first source-verification pass. It records what was actually found, not assumptions.

### Official HSC question-setting resources located

**Dhaka Education Board — HSC and equivalent question-setter/moderator training manuals**
- Landing page: https://dhakaeducationboard.gov.bd/index.php/site/cms/24857
- The page labels the collection as the HSC/equivalent question-setter and moderator training manual collection.
- Subject links listed include Bangla, Physics, Civics & Good Governance, Business Organisation & Management, Biology, Sociology, Higher Math, ICT, Logic, Accounting, Chemistry, Geography, Islamic History, Economics, Social Work and Production Management.
- Direct linked HSC-26 archives observed from the page:
  - Physics: https://dhakaeducationboard.gov.bd/Moderator%20Training%20Manual/HSC-26/Book_02_Physics.zip
  - Biology: https://dhakaeducationboard.gov.bd/Moderator%20Training%20Manual/HSC-26/Book_05_Biology.zip
  - Higher Mathematics: https://dhakaeducationboard.gov.bd/Moderator%20Training%20Manual/HSC-26/Book_07_Higher_Math.zip
  - ICT: https://dhakaeducationboard.gov.bd/Moderator%20Training%20Manual/HSC-26/Book_08_ICT.zip
  - Chemistry: https://dhakaeducationboard.gov.bd/Moderator%20Training%20Manual/HSC-26/Book_11_Chemistry.zip
- Access status: the official page and its subject labels are readable. Attempts to retrieve the linked ZIP files through the available browser/download path hit the board's anti-bot verification or unsupported ZIP content handling. Therefore, archive contents have **not yet been inspected or extracted**. Do not claim the manuals have been analysed until the ZIPs are actually obtained and reviewed.
- Board HSC Corner: https://dhakaeducationboard.gov.bd/index.php/site/product/hsccorner
  - Search-indexed notices show the HSC question-setter/moderator training manual announcement dated 1 February 2026, related training notices in January 2026, and a 28 October 2025 notice about full syllabus for HSC/Alim 2026. These are useful discovery leads; each notice and attachment must be opened and checked before using its details.

### NCTB curriculum and textbook source findings

- NCTB official portal: https://nctb.gov.bd/
- NCTB higher-secondary curriculum files page: https://nctb.gov.bd/pages/files/6922dbc6933eb65569e0c702
  - The page is labelled higher-secondary curriculum and lists subject files including Higher Mathematics, Biology, Chemistry, ICT and Physics.
  - It is last updated 7 August 2017. Treat it as a legacy curriculum source, **not proof of the HSC 2027 syllabus**.
- NCTB 2026 school and higher-secondary textbook index: https://nctb.gov.bd/pages/static-pages/695b98afc4774958d7b7044c
  - Official index for 2026 textbooks, including a higher-secondary section. Its page alone does not establish a complete subject-specific HSC 2027 syllabus.
- NCTB 2025–26 higher-secondary XI–XII textbook page: https://nctb.gov.bd/pages/static-pages/6922e145933eb65569e2b37b
  - Search-indexed listing includes Literature, English for Today and ICT (Bangla and English versions). It is not a complete list of all group-subject textbooks.
- HSC 2027 official syllabus/subject-wise syllabus notice: **not located in this first official-source pass**. This is an open verification task, not evidence that no such notice exists.

### Research conclusions and next actions

1. Use the Dhaka Board HSC-26 manual archives as primary source leads for question construction and moderation, but obtain and inspect their contents before coding any question taxonomy.
2. Search NCTB and all relevant education-board official notice archives for the actual HSC 2027 batch syllabus, subject-wise curriculum, exam structure and marks distribution. Keep HSC 2026, legacy 2017 curriculum, and HSC 2027 evidence in separate version buckets.
3. Build a source register and subject/topic map first; do not begin predictor-frequency calculations until a sufficiently complete, authenticated, rights-cleared set of papers exists.
4. Do not infer exact chapter weighting or predicted topics from the existence of moderator manuals alone.
5. Preserve the distinction between official syllabus, official question-setting guidance, past papers, and JMT teacher-created explanations.


## 9. Recovered prior decisions and work — authoritative continuity update (2026-11-14)

This section corrects the earlier abbreviated snapshot. The project already had substantial research and product decisions before this North Star document was created. Do not restart those workstreams or overwrite their findings.

### 9.1 ACS benchmark — user's actual intent and first-hand feature observations

The user's reference to “ACS” means the Bangladesh ACS Group / Apar's Classroom (ASG Shop) ecosystem, as established by the existing JMT research documents. The user is an ACS student and supplied first-hand benchmark observations on 11 November 2026.

**Critical boundary:** ACS is a benchmark, not a clone target. The user wants JMT to be materially better (described as “hundred times or more better”), while preserving original JMT design, code, content and brand.

First-hand feature requirements supplied by the user:
- Annual academic planner: class schedule/timing, weekday and weekend availability, archive/catch-up for missed classes, sleep/wake preferences, goals and syllabus completion.
- Community: notes, doubts/questions, peer help, discussion, rankings/top 1–2–3, compare notes and downloads.
- Teacher homework oversight and feedback.
- Physics projectile-motion (“Prasher Goti”) lab with graphs.
- ICT HTML live preview, SQL run/view and C-program output.
- Mathematics matrix and vector labs.
- Scientific calculator comparable in functionality to Casio FX-991CW, but implemented with original JMT UI/assets.
- Optional focus mode and user-controlled Islamic/routine mode.
- Live classes, notifications and app-level learning workflows.

These are user-provided observations, not independently verified public feature claims. Screenshots/videos were expected as a future supplement but none were found in retrieved context. Do not claim to have received them.

### 9.2 Existing product decisions and roadmap

- Commit `3211b780e8f5074058be7d465dc6a4a08b96ebda` expanded `docs/LEARNING_OS_PRODUCT_ROADMAP.md` with the benchmark-driven scope: Personal Academic Command Centre, JMT Learning Community, Curriculum-linked Virtual Lab Network, productivity tools, teacher/parent workspaces, unified learning intelligence and AI.
- Strategic priority was: (1) planner and student-facing parity foundation, (2) community and knowledge sharing, (3) curriculum labs, (4) learning intelligence, (5) AI layer, (6) parent/offline/institution scale.
- The expanded scope is a target, not proof that each feature is implemented.

### 9.3 Research already completed before this update

The existing PR #42 branch `audit/jmt-master-prompt-follow-through` contains a substantial body of prior research and implementation work:
- `docs/DEEP_RESEARCH_PROGRAMME_AND_FIRST_FINDINGS.md` — ACS ecosystem mapping, feature research, curriculum and admission source discovery, predictor evaluation protocol and research limitations.
- Twenty numbered research tranches, including HSC source integrity, official NCTB notice discovery, HSC assessment operations, university admission sources and book/publisher/author registries.
- `docs/JMT_BOOK_AUTHOR_KNOWLEDGE_REGISTRY.md` and subject-specific publisher/edition registries spanning Physics, Chemistry, Higher Mathematics, Biology, ICT, language subjects, Statistics and Agriculture.
- `docs/JMT_ATOMIC_ACCEPTANCE_BACKLOG_2026-11-11.md`, `docs/JMT_EXPANDED_LEARNING_PLATFORM_SCOPE.md`, `docs/JMT_OFFLINE_MEDIA_AI_ARCHITECTURE.md`, `docs/VIRTUAL_LAB_MODEL_REGISTER.md` and `docs/VIRTUAL_LAB_OPEN_SOURCE_REVIEW.md`.
- Official-source discovery for NCTB, Dhaka/Rajshahi boards, DU, GST and agriculture admission. BUET and medical admission primary-source extraction remained incomplete.
- Predictor protocol requires rolling-origin/chronological holdouts, target-paper leakage exclusion, transparent baselines, calibration and separate evaluation of paper-content forecasting vs student-performance forecasting.
- AI Teacher architecture is grounded retrieval over approved resources, hints-first pedagogy, Bengali/English, citations, uncertainty, teacher escalation, privacy and cost controls.

At the 14 November recovery check, PR #42 head was `f94069cd17bc959c80a10b8fa8f0e2bbce44903f`; its Quality checks workflow run `43513738260` had succeeded for that exact head. PR #42 was still open/unmerged and its work was not thereby deployed to production. Recheck the branch and CI before relying on this snapshot.

### 9.4 Actual implementation foundations found in PR #42 branch

- Learning OS subject catalogue/concept graph, learning events, study goals, mastery/mistake memory, adaptive spaced revision and Exam War Room revision plans.
- Student practice question model/engine, guarded grading and privacy-conscious teacher analytics.
- Teacher learning/practice dashboards, assignment and assessment workflows.
- Database-driven virtual-lab catalogue, lab notebook evidence, practical assessment and teacher review.
- Existing simulation components include projectile motion, double pendulum, ray optics, gas laws, electrochemical cell, photosynthesis, inheritance, microscope, spring oscillator, wave interference, chemistry kinetics/equilibrium and cell division.
- Notifications actions/migrations exist.
- Offline/media/AI architecture is documented, but full offline content sync and AI tutor remain gated.

Feature gaps from the branch path inventory (must be rechecked against current code before implementation):
- Complete annual availability/sleep-wake planner and automatic catch-up/plan repair.
- Unified community note library with quality ranking, side-by-side comparison and download workflow.
- Secure ICT HTML/SQL/C/Python coding environments; the ACS Google Play listing now advertises Python Lab.
- Dedicated matrix/vector labs.
- Full student scientific calculator (the existing lab-analysis calculator is not equivalent).
- Focus/routine modes and verified live-class workflow.
- End-to-end offline content download/sync.
- AI Teacher implementation/evaluation and Predictor dataset/backtests.

### 9.5 AI model selection and cost constraint

No specific model or provider was selected in the recovered prior discussion. The user's preference is to choose the best genuinely free option based on quality, reliability, privacy, education suitability, Bengali/English performance and sustainability. Avoid provider lock-in; keep a model-independent service layer and distinguish free API tiers from self-hosted open weights. AI was deliberately deferred until core platform foundations, secure learning records, assessments and evaluation data are ready. Never imply a model was selected, trained or deployed unless that later happens and is verified.

### 9.6 Latest continuation point — research tranche 21

On 14 November 2026, work resumed on the existing PR #42 research branch and added:
- `docs/JMT_ACS_BENCHMARK_AND_NCTB_SOURCE_TRANCHE_21_2026-11-14.md`
- Section 13 in `docs/DEEP_RESEARCH_PROGRAMME_AND_FIRST_FINDINGS.md`

New findings: current ACS first-party site/app refresh; public Google Play release note for Python Lab; current HSC 2027/2028 Apar's Classroom cycle catalogues; NCTB official index lists the 1 October 2026 2026–27 higher-secondary syllabus notice; a third-party archived scan exposes six ICT chapter headings but the original NCTB attachment remains unretrieved. The 2026–27 Class XI notice must not be applied to HSC 2027; it belongs to the next cohort (HSC 2028), subject to official cohort mapping.

**Default next task:** continue from tranche 21. Retrieve original NCTB attachments for Bangla, English and ICT; separately verify HSC 2027 syllabus for the 2025–26 intake; obtain and inspect the five HSC-26 moderator ZIP archives; then continue ACS walkthrough/gap research and build the historical question corpus. Do not write another generic AI blueprint.


## 10. Research continuity update — tranche 22 (2026-11-14)

The original research branch has advanced beyond the first tranche-21 snapshot. The current source register is `docs/JMT_NCTB_HSC_2027_2028_CURRICULUM_SOURCE_REGISTER_TRANCHE_22_2026-11-14.md` on branch `audit/jmt-master-prompt-follow-through`.

New verified primary-source files:
- NCTB 2026–27 ICT prescribed syllabus: https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-nctb/2026/9/78491622-b852-466c-af8b-783718732428.pdf (six chapters extracted).
- NCTB 2026–27 Bangla First Paper syllabus: https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-nctb/2026/9/5be8f27e-5220-4c2f-8cf6-7bb42c7d2648.pdf (prose, poems, novel and drama list extracted).
- NCTB 2026–27 English First Paper, code 107: https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-nctb/2026/9/82c3294f-8f1d-4ab0-a85f-993766ded7bb.pdf (eight units and lessons extracted).
- NCTB general announcement dated 28 September 2026 confirms revised 2026–27 XI–XII textbooks for Literature, Bengali co-reader, ICT and English for Today, and that board assessment will consider their content: https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-nctb/2026/9/2bc5630e-eee1-4cd6-a945-cb39bda5b7ed.pdf.

These are official-hosted object-storage files identifying NCTB and supersede the earlier third-party ICT scan as the canonical source. HSC 2027 (2025–26 intake) remains a separate source gap; its NCTB Bangla First Paper notice dated 26 November 2025 has been found but the attachment is not yet extracted. Five HSC-26 Dhaka Board moderator ZIPs remain blocked by the board anti-bot page; none has been analysed.

**Next task:** continue the source register, retrieve the HSC 2027 Bangla First Paper attachment and science-subject official sources, then extract and teacher-review syllabus maps. Do not start model training or reuse HSC 2028 syllabus for HSC 2027.


### 10.1 Structured curriculum data artifact and regression test (2026-11-14)
- The active research branch now contains `data/curriculum/hsc-2028-2026-27-nctb-core-subjects.json`, with official NCTB source links and extracted ICT, Bangla First Paper and English First Paper records.
- Added `tests/curriculum-source-register.test.mjs` to validate JSON structure, official source provenance, subject record counts, extracted chapter/unit counts and the HSC 2027/HSC 2028 cohort boundary.
- All extracted records remain pending teacher review; this is not a published curriculum or exam prediction dataset.


## 11. Retrieval QA note (14 November 2026)

The tranche-22 source register now includes a follow-up retrieval audit:
- Official NCTB HSC 2027 Bangla First Paper notice page is HTTP 200 and identifies NCTB, but its “File 1” PDF href was not exposed by the page extraction. The PDF URL remains unresolved; never guess an object-storage path.
- Dhaka Board HSC-26 manual links are present on the official index. Following Physics, Biology, Higher Math, ICT and Chemistry links through the browser reader returns unsupported ZIP content-type / no archive body; a separate Firecrawl attempt encountered a verification response. No ZIP content has been inspected.
- This distinction matters: the retrieval layer cannot read the archive, but the official source links are present. Continue through a legitimate file-capable browser or a supplied archive, without bypassing verification.


## 12. ACS public catalogue benchmark refresh (14 November 2026)

The research branch now contains `data/benchmark/acs-public-product-benchmark-2026-11-14.json`, a structured public-source snapshot:
- ACS Group's official hub describes a six-brand network and self-reports 1M+ learners (not independently audited).
- Apar's Classroom/ASG Shop has separate HSC 2027 and HSC 2028 catalogues spanning Physics, Higher Math, Chemistry, Biology, English, Bangla and ICT/EBI.
- The app marketplace displayed 103 courses at capture time and exposes cohort, cycle, pricing and some enrollment metadata; these are dynamic snapshot fields.
- Public course descriptions include board + admission preparation offers and multi-cycle sequencing.

Product takeaway: JMT's catalogue must be cohort-aware and linked to syllabus versions, real lesson/cycle release status, tests, revision and mastery—not merely a list of course cards. Continue treating the user's first-hand planner/community/labs/homework/calculator/focus/live-class observations as a separate benchmark; do not claim public verification of those private app workflows.


## Research continuation — tranche 23 (14 November 2026)
- Located the official NCTB 26 November 2025 Bangla First Paper notice for HSC 2027 / 2025–26 intake; contemporaneous reporting quotes it as continuing the 2024–25 syllabus. The official attachment text remains pending, so record the carry-forward as secondary-reported until directly checked.
- Retrieved and checked the signed NCTB circular dated 21 November 2024 (memo 37.06.0000.402.71.068.02.39), which identifies the 2024–25 Bangla First Paper syllabus attachment and states the syllabus comprises twelve stories and twelve poems.
- The full attachment item list is still not retrieved; no detailed reading-list records are approved from the cover letter alone.
- Added tranche-23 audit: docs/JMT_HSC_2027_BANGLA_FIRST_PAPER_CARRY_FORWARD_AUDIT_TRANCHE_23_2026-11-14.md on the research branch / PR #42. The exact attachment is not yet verified.
- Predictor evaluation protocol added on PR #42: cohort-isolated chronological walk-forward validation, leakage checks, baseline comparisons, calibration, uncertainty and teacher-review release gates.


## Live-site smoke / SEO audit — 14 November 2026
- Verified the new Render host serves the JMT Academy application after its free-tier cold start; /api/health returned status ok and database reachable.
- Live robots.txt allows public routes and disallows private account/administration routes; live sitemap lists seven public URLs on jmtacademy-web.onrender.com.
- Public catalogue currently has zero published courses; no fake courses were added.
- Homepage strapline still reads “JMT CHEMISTRY · LEARNING · PROGRESS” from the production academy_settings row. It is not hard-coded in the homepage component; production data was not changed.
- Courses page has no detected meta description in the page metadata export; source already defines canonical /courses. Add unique descriptions in a reviewed code change.
- GSC Wizard has no connected or shared Search Console properties, so search performance/indexing metrics are unavailable.
- Full read-only audit is docs/JMT_LIVE_SITE_SMOKE_AND_SEO_AUDIT_2026-11-14.md on PR #42.


## Supabase primary/test boundary audit — 14 November 2026
- Both Supabase projects report ACTIVE_HEALTHY on PostgreSQL 17.11.
- Read-only public-schema comparison: primary has 49 tables; JMT Test has 57. All 49 shared tables match on column names/types, primary keys and RLS-enabled flags; neither project has a listed public table with RLS disabled.
- JMT Test has eight additional tables for practice questions/attempts, virtual-lab catalogue and lab notebooks/practicals/evidence/review history, plus assignment submission version history.
- Migration histories differ; do not replay or synchronize migration histories blindly. Production remains unchanged.
- Full report: docs/JMT_SUPABASE_PRIMARY_TEST_SCHEMA_BOUNDARY_AUDIT_2026-11-14.md on PR #42.


## HSC 2027 Bangla candidate list — secondary mirror (14 November 2026)
- Located a Prothom Alo-hosted PDF that presents the 2024–25 NCTB HSC Bangla First Paper syllabus and exposes 12 prose, 12 poems, one novel and one drama.
- The official NCTB signed circular independently confirms the 12+12 count and the syllabus attachment, but the secondary PDF has not been byte-compared with the NCTB attachment.
- Added candidate structured file data/curriculum/hsc-2027-2024-25-bangla-first-paper-candidate-secondary-mirror.json on PR #42.
- Candidate records are marked secondary-mirror, teacher-review-required and not publishable. HSC 2027 carry-forward remains secondary-reported until the 2025–26 NCTB File 1 attachment is retrieved.


## Render service topology audit — 14 November 2026
- Render workspace contains two active Free Node web services for the same repository and main branch: new jmtacademy-web (new hostname) and previous jmtacademy (old hostname).
- Both latest deploys are live/succeeded and reference main commit 141d49343d80452c0871cec77fbc02367346e847.
- New service starts successfully and /api/health returns status ok with database reachable, but its Render health-check path is blank. Previous service has /api/health configured.
- Old service is still present and non-suspended; its hostname must not be assumed retired just because a cold-start interstitial appears.
- Added docs/JMT_RENDER_SERVICE_TOPOLOGY_AUDIT_2026-11-14.md to PR #42. No Render settings, environment variables, hostnames, deploys or services were changed.


## Practice Studio governance and evidence review — 14 November 2026
- Added a draft independent content-review gate for student practice: source provenance, source year, rights classification, independent administrator review, documented reviewer notes and automatic unpublishing when approved content is edited.
- Added an administrator review queue; teacher submissions remain unpublished until approved. The migration is draft-only and has not been applied to JMT Test or production.
- Read-only JMT Test snapshot: 3 demo courses (none published), 24 course-subject mappings, 17 learning concepts (none published) and 0 practice questions. The empty student Practice Studio is therefore honest; content creation and course publication remain prerequisites.
- Added a research-backed practice design brief using school-classroom evidence on retrieval practice, spacing, interleaving and feedback. The brief flags limited evidence from non-WEIRD contexts and calls for local teacher/student validation.
- Added HSC 2028 / 2026–27 ICT chapter anchors from the official NCTB-hosted syllabus PDF. Only the six chapter headings are represented; subtopics and assessment weights remain un-inferred and the dataset is not publishable before teacher review.
- Details and tests are in PR #42. No Supabase data or Render production settings were changed.

- Live-site recheck after a 503 interstitial showed the new Render instance became ready and the health endpoint, homepage and course catalogue returned HTTP 200. Render's official Free-tier docs confirm idle services spin down after 15 minutes and show a loading page on restart; the cold-start delay remains a production UX/SEO risk until the service plan is reviewed.



## 13. Working checkpoint — verified continuation state (2026-11-14)

### Repository and active work
- Canonical repository remains `hk1911369-eng/jmtacademy`, default branch `main`.
- PR #42 (`audit/jmt-master-prompt-follow-through`) remains open and draft. Latest observed head: `dacd8124e74109b7414c66e84f7f2c4d7484778a`.
- Quality checks run `43613264247` succeeded on the immediately preceding PR #42 head `3f5ce241e35b714db595d40baad09d3ba924ef4b`. No workflow run was returned for the new documentation-only head; do not describe the latest head as CI-verified until checks run against it.
- PR #42 now also contains `docs/JMT_HSC_2027_OFFICIAL_SYLLABUS_GAP_AUDIT_TRANCHE_24_2026-11-14.md`, created and fetched back successfully. It documents the HSC 2027 official-source gap and source/version boundary.

### Render topology — rechecked
- Two active Free Node services still point to the same repository and `main` commit `141d49343d80452c0871cec77fbc02367346e847`.
- New service: `jmtacademy-web`, https://jmtacademy-web.onrender.com, service ID `srv-dbs2jbm7bikc73ee5c10`; latest deployment is live, but Render's health-check path is blank.
- Old service: `jmtacademy`, https://sanjay-kumar-chemistry-lms.onrender.com, service ID `srv-dbn8v2hsrm7s738nntrg`; latest deployment is live and its health-check path is `/api/health`.
- The old service is not suspended or retired. Do not delete/suspend it or change production service settings without a reviewed cutover plan and required approval.

### Supabase boundary — rechecked
- Both connected projects report ACTIVE_HEALTHY on PostgreSQL 17.11.
- `cullxqklmbdiosibgois` is named `JMT Test`; `jpoxrxjixkcgjqvyyznw` is named `hk1911369-eng's Project`.
- The prior read-only boundary audit records 49 shared public tables and 8 test-only tables, with matching shared table structure/RLS flags. Migration histories differ; never replay or synchronize them blindly.
- No production database change was made during this checkpoint.

### HSC 2027 source audit — tranche 24
- The official NCTB syllabus index (https://nctb.gov.bd/site/page/9a90c854-ce5f-4d77-9915-1ecd0953079d/SSC-&-HSC-Short-Syllabus) was live-scraped. Its HSC-specific 2024–25 XI–XII entry concerns HSC 2026, not HSC 2027.
- NCTB's current notices index (https://nctb.gov.bd/pages/notices/) lists the 1 October 2026 prescribed higher-secondary syllabus for academic year 2026–27; keep this in the HSC 2028 cohort bucket.
- A school-hosted Cantonment English School & College HSC 2027 Science PDF was found, but it is a school term/examination schedule, not an official NCTB/board syllabus. It is not a basis for national syllabus or marks-weighting claims.
- The official NCTB HSC 2027 Bangla First Paper notice dated 26 November 2025 remains a lead; its File 1 attachment URL/content has not yet been retrieved. Do not guess the attachment URL.
- The five official Dhaka Board HSC-26 moderator ZIP links remain identified but their ZIP payloads have not been obtained or inspected. Do not claim manual analysis.

### Immediate next work
1. Continue from the official HSC 2027 Bangla attachment retrieval and subject-wise official source audit.
2. Attempt the Dhaka Board HSC-26 manual archives through a supported file-capable route; do not bypass verification.
3. Continue building the versioned Curriculum Atlas and past-paper provenance register; do not train the Predictor until an authenticated, rights-cleared corpus and leakage-safe evaluation set exist.
4. Keep platform work in parallel, but use draft PRs and test environments first. Do not merge PR #42 blindly or alter production DB/Render settings without the required review.


### HSC 2027 Bangla carry-forward — secondary corroboration update (14 November 2026)
- Exa located two independent reports dated 27 November 2025 (Dhaka Post and Prothom Alo) describing the NCTB memo of 26 November 2025: the 2024–25 Bangla First Paper syllabus remains applicable to the 2025–26 XI–XII intake and continues until further instruction.
- This upgrades the carry-forward finding from a single secondary lead to secondary-corroborated, but the signed NCTB memo and its attachment remain unretrieved. Keep the existing 26-item secondary-mirror dataset teacher-review-required and non-publishable until primary attachment comparison.
- Sources: https://www.dhakapost.com/national/412688 and https://www.prothomalo.com/education/examination/6gnl078cvr
