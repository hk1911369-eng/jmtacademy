# JMT Academy AI Exam Predictor and AI Teacher — Data Blueprint

**Status:** Research and implementation blueprint; not a trained model, verified question bank, or official syllabus.
**Scope:** HSC 2027 first, with a reusable structure for Physics, Chemistry, Higher Mathematics, Biology, ICT, and other subjects.
**Purpose:** Prepare traceable, teacher-reviewed academic data for two distinct AI systems:
1. Exam Question Predictor — estimates topic-level revision priority and likely question *formats* from evidence.
2. AI Teacher — answers syllabus-grounded questions, teaches concepts, solves problems, and generates practice.

## 1. Important boundary

The predictor must never claim to know, guarantee, leak, or reproduce the exact upcoming examination questions. It should communicate uncertainty, show the evidence behind each topic-priority estimate, and encourage full-syllabus preparation. Historical frequency is not a promise of future appearance.

The first release should use curated data, retrieval, transparent statistics, and evaluation. Do not fine-tune or train a model until data rights, quality, privacy, and evaluation are established. Prefer a model-independent AI layer so providers can be changed after measured comparisons.

## 2. Two systems, two evidence needs

### A. Exam Question Predictor

Required evidence:
- Current, officially confirmed syllabus and subject/paper codes.
- Official examination structure, marks, time, practical/written split, and question-setting guidance.
- Authentic past board papers, identified by board, year, subject, paper, set/version, and source.
- Teacher-reviewed topic/chapter mapping for every question and sub-question.
- Question type (MCQ, CQ stem, CQ parts a–d, numerical, practical/viva), marks, cognitive demand, and prerequisite concepts.
- Changes in syllabus, question pattern, and examination policy by year.
- Optional learner evidence, only after consent and privacy review: attempts, accuracy, time, topic mastery, revision history, and mock-test performance.

Outputs:
- Topic/chapter revision priority, not exact-question predictions.
- Evidence summary: number of comparable papers, years covered, observed frequency, marks exposure, syllabus changes, and confidence/uncertainty.
- Separate estimates for MCQ, CQ, numerical, practical, and viva where evidence supports it.
- Student-specific weak-topic recommendations, clearly separated from population-level exam-pattern analysis.

### B. AI Teacher

Required evidence:
- Approved syllabus map and textbook-aligned topic hierarchy.
- Teacher-reviewed explanations, definitions, formulae, derivations, worked examples, diagrams, and common misconceptions.
- Verified answers and marking rubrics for representative question types.
- Bengali and English terminology, with consistent subject-specific vocabulary.
- Safety notes for laboratory topics and clear boundaries for simulations versus real experiments.
- Approved practice questions with answer keys, explanations, difficulty, and learning outcomes.

Behavior:
- Answer from approved JMT materials first; cite chapter/lesson/source inside the LMS.
- Say when the approved material does not contain enough evidence.
- Show steps for calculations and derivations; check units, assumptions, and final answers.
- Adapt explanations to learner level and language preference.
- Generate new practice questions from learning objectives, not by copying protected past-paper text.
- Route uncertain or disputed answers to a teacher-review queue.

## 3. Source hierarchy and provenance

Use this order of trust:
1. Current NCTB and Ministry of Education notices, curriculum documents, and prescribed textbooks.
2. Official education-board notices, examination instructions, question-setter/moderator manuals, and official sample materials.
3. Past papers from an identifiable board, year, subject, paper, and authenticated source, subject to rights/permission checks.
4. Teacher-authored and teacher-reviewed JMT materials.
5. Reputable secondary sources only as discovery aids; never silently treat them as official.

Every imported item must record source URL or physical source reference, publisher/board, publication/exam year, retrieval date, rights/permission status, file checksum, and reviewer. Keep source scans private and access-controlled. Do not scrape or redistribute copyrighted guidebooks or commercial question banks without permission. Prefer metadata and teacher-created summaries where reproduction rights are unclear.

### Initial official discovery references

- Dhaka Education Board, HSC Question Setter and Moderator Training Manuals (subject links include Physics, Higher Math, and Chemistry): https://dhakaeducationboard.gov.bd/index.php/site/cms/24857
- Dhaka Education Board HSC Corner (official notices and examination updates): https://dhakaeducationboard.gov.bd/index.php/site/product/hsccorner

**Verification note:** An HSC 2027 schedule found on a college website is useful as a planning reference, but it is not an NCTB/education-board authority. The official HSC 2027 syllabus and current exam rules must be captured and verified before labelling any dataset or prediction as HSC 2027-aligned. Do not infer the official pattern from older years or coaching-centre tables.

## 4. Canonical data model

Keep source documents separate from normalized, searchable records.

### SyllabusTopic
- `subject_code`, `subject_name`, `paper`, `chapter_id`, `chapter_title`, `topic_id`, `topic_title`
- `learning_outcomes[]`, `prerequisites[]`, `syllabus_version`, `effective_batch`
- `source_id`, `verification_status`, `reviewer_id`, `reviewed_at`

### ExamQuestion
- `question_id`, `exam_year`, `board`, `subject_code`, `paper`, `set_or_version`
- `section`, `question_type`, `question_number`, `subpart`, `marks`
- `topic_ids[]`, `learning_outcome_ids[]`, `prerequisite_topic_ids[]`
- `cognitive_level`, `difficulty`, `requires_calculation`, `requires_diagram`
- `source_id`, `rights_status`, `transcription_confidence`
- `teacher_review_status`, `reviewer_id`, `reviewed_at`

### LearningResource
- `resource_id`, `subject_code`, `topic_ids[]`, `resource_type`
- `language`, `content`, `worked_steps[]`, `formulae[]`, `misconceptions[]`
- `learning_outcome_ids[]`, `source_ids[]`, `version`
- `approval_status`, `reviewer_id`, `reviewed_at`

### PracticeItem
- `item_id`, `subject_code`, `topic_ids[]`, `question_type`, `difficulty`, `marks`
- `prompt`, `answer_key`, `explanation`, `marking_rubric`
- `origin` (teacher-authored, AI-drafted, adapted-with-permission)
- `approval_status`, `reviewer_id`, `reviewed_at`

### StudentLearningEvent (future, privacy-gated)
- Pseudonymous `learner_id`, `subject_code`, `topic_id`, `assessment_id`
- `attempted_at`, `score`, `max_score`, `time_spent`, `attempt_count`, `hint_count`
- Consent/retention policy reference and access audit.
- Never use names, phone numbers, email addresses, student IDs, or payment data as model features. Keep identity mapping outside analytics datasets.

## 5. Predictor methodology and safeguards

Start with explainable baselines:
- Count topic appearances and marks across comparable, verified papers.
- Report both raw counts and normalized rates (per paper / per available marks).
- Weight recent papers cautiously, but show the unweighted history too.
- Exclude or separately label papers from obsolete syllabi and changed exam patterns.
- Measure board coverage and missing years; do not treat one board as the whole country.
- Compare forecasts with simple baselines using chronological holdout years (never random-split question records across years).
- Track calibration, precision/recall for topic coverage, ranking quality, and performance by subject/board.
- Use confidence labels only after minimum evidence thresholds are defined and validated by teachers.

Do not use student outcomes to predict confidential examination content. Student data is for personalized readiness and revision support, not for claiming what the board will set.

## 6. AI Teacher architecture and safeguards

Recommended first architecture:
- Retrieval-augmented generation over approved JMT resources.
- Subject/topic metadata filters and source citations.
- Separate verified answer keys from generated explanations.
- Deterministic calculation checks where possible (units, arithmetic, formula substitutions).
- Bengali/English evaluation sets written or reviewed by teachers.
- Teacher escalation for low-confidence, conflicting, or high-impact academic answers.
- Rate limits, abuse controls, student privacy protections, age-appropriate responses, and auditable feedback.

Do not allow the model to invent textbook page references, official syllabus claims, exam statistics, or citations. A generated item remains a draft until teacher approval.

## 7. Quality gates before any AI release

1. Confirm current syllabus and exam pattern from official primary sources for each subject.
2. Build a complete subject/paper/chapter/topic taxonomy.
3. Authenticate each paper and record rights/permission.
4. Double-review question-to-topic mapping for a sample; resolve disagreement before scaling.
5. Check answer keys and numerical solutions independently.
6. Remove duplicates and flag OCR/transcription uncertainty.
7. Establish train/validation/test separation by exam year for predictor evaluation.
8. Test Bengali and English, accessibility, hallucination, and source-grounding.
9. Run a teacher pilot before student access.
10. Publish clear wording: revision guidance and practice support, never guaranteed predictions.

## 8. Suggested work sequence

- Phase 1: official syllabus and exam-rule verification for HSC 2027.
- Phase 2: subject taxonomies for Chemistry, Physics, Higher Mathematics, Biology, and ICT.
- Phase 3: collect/authenticate past papers and question-setting guidance; begin Chemistry as the first pilot.
- Phase 4: teacher-review and tag questions; create original explanations and practice resources.
- Phase 5: predictor baseline and AI Teacher retrieval prototype, kept separate.
- Phase 6: evaluation, privacy/security review, teacher pilot, and staged release.

**Current project status:** Chemistry Chapter 1–3 teacher packs are draft academic resources in a separate review PR. They are useful starting content for the AI Teacher, but no historical question corpus has yet been collected, tagged, rights-cleared, or used to train a predictor. No AI model has been trained or deployed by this document.
