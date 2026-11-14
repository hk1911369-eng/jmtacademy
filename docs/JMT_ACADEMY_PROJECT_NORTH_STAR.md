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
