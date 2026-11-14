# JMT Exam Predictor — Temporal Validation and Release Gate

**Status:** Research protocol; implementation and predictive claims remain blocked until the required corpus and tests exist.  
**Prepared:** 2026-11-14  
**Applies to:** HSC, SSC, admission and other examination cohorts, each evaluated separately.

## 1. Decision

JMT must not describe a topic, question, or question family as “predicted” merely because it is frequent in the historical corpus. The Predictor may be released only as a calibrated preparation-support tool after a genuinely chronological, leakage-audited evaluation. It must never promise exact questions or guaranteed marks.

## 2. Evidence and research basis

- Paleka, Goel, Geiping & Tramèr (2025), *Pitfalls in Evaluating Language Model Forecasters*, ICLR. Full text was retrieved through CoChat. It identifies logical leakage in retrospective question selection, unreliable date-restricted retrieval, cutoff-date overconfidence, benchmark bias, and weaknesses in single-score evaluation. https://arxiv.org/abs/2506.00723
- Cerqueira, Torgo & Mozetič (2020), *Evaluating time series forecasting models: an empirical study on performance estimation methods*, Machine Learning 109:1997–2028. The comparative study reports that for non-stationary series, repeated out-of-sample holdout periods can estimate future performance more accurately than randomised approaches. https://doi.org/10.1007/s10994-020-05910-7
- Hewamalage, Ackermann & Bergmeir (2022), *Forecast evaluation for data scientists: common pitfalls and best practices*, Data Mining and Knowledge Discovery 37:788–832. It reviews non-stationarity, partitioning, error metrics and common evaluation failures. https://doi.org/10.1007/s10618-022-00894-5
- Tashman (2000), *Out-of-sample tests of forecasting accuracy: an analysis and review*, International Journal of Forecasting 16:437–450. It discusses rolling origins, recalibration, multiple test periods and reproducible out-of-sample design. https://doi.org/10.1016/S0169-2070(00)00065-0

These sources support the evaluation design; they do not establish that HSC questions are predictable or that any JMT model currently performs well.

## 3. Unit of evaluation and data contract

Every record must carry, where applicable:

- examination system, board, institution and exam type;
- cohort / syllabus version and effective dates;
- examination year, session, paper, subject code, medium and candidate category;
- chapter, topic, concept, question family, format, marks and question position;
- exact source, source owner, acquisition date, licence/permission status, page/section and content hash;
- original wording and a separately stored normalised representation;
- human reviewer, mapping confidence and adjudication status.

Keep distinct cohorts separate. In particular, HSC 2027 (2025–26 intake) must not inherit the 2026–27 / HSC 2028 curriculum map. A question with uncertain syllabus mapping remains excluded from scored cohort-level evaluation.

## 4. Chronological evaluation protocol

1. Freeze a corpus snapshot and its hashes before model development.
2. Define the forecast cut-off as the day before the target examination (or another explicitly justified operational date).
3. For each target year, expose the model only to papers, syllabus documents, guidance and metadata demonstrably available before that cut-off.
4. Fit topic mappings, text normalisation, embeddings, feature selection, thresholds and hyperparameters using only the training years. No global preprocessing over future years.
5. Use expanding-window walk-forward folds: train on years up to Y-1, predict Y; then train through Y and predict Y+1. Keep multiple target years as independent temporal test periods where data permit.
6. Keep the latest complete examination year as a final locked holdout. Do not tune against it.
7. Include a simple frequency / recency baseline and a syllabus-coverage baseline. A complex model must beat these baselines consistently, not just on one year.
8. Have a reviewer who did not build the model inspect a sample of source mappings and every apparent high-confidence prediction.

## 5. Leakage and validity checks

Block or flag a run if any of the following occurs:

- a target-year paper, answer key, examiner report, post-exam analysis or later publisher solution enters training or retrieval;
- a syllabus or chapter map from a later cohort is projected backwards without documented equivalence;
- a source page was edited after the forecast cut-off and its historical version cannot be established;
- a question was selected for the test set because its eventual outcome or appearance is already known;
- duplicate, near-duplicate or paraphrased questions cross the train/test boundary;
- model prompts, embeddings or training corpora contain the target paper or answer;
- manual topic mapping was informed by seeing the target paper without a blinded adjudication record.

Search-engine date filters alone are not sufficient proof that information existed at the historical cut-off. Prefer archived primary sources, original paper scans and source timestamps with version evidence.

## 6. Metrics and reporting

Report per cohort, subject, paper and question type; do not pool incompatible curricula.

- **Top-k retrieval:** precision@k, recall@k and hit-rate@k at clearly defined question-family and topic levels.
- **Ranking:** mean reciprocal rank and nDCG where ranked topic lists are shown.
- **Coverage:** proportion of syllabus topics represented and proportion of actual paper marks covered by predicted topic families.
- **Calibration:** reliability diagram, Brier score and log loss for probabilistic appearance estimates; show bin counts and confidence intervals.
- **Uncertainty:** bootstrap intervals over papers/years, not individual question rows alone; display low-data warnings.
- **Baselines:** compare against uniform syllabus coverage, historical frequency, recency-weighted frequency and a simple teacher shortlist.
- **Robustness:** results by year, board, subject, paper and syllabus-change regime; report where the model fails.

Do not publish a single “accuracy” number without denominator, target definition, cohort, years, baseline and interval. If there are too few independent examination years, label the results exploratory and do not market predictive performance.

## 7. Human and student-facing safeguards

- Teacher review is required before a prediction list is published.
- Label output as “practice priorities / historical pattern indicators”, not leaked or guaranteed questions.
- Explain why a topic was prioritised, show source years and the syllabus mapping, and display uncertainty.
- Always retain full syllabus coverage in revision plans; predicted topics must never displace required learning.
- Do not expose private student performance data to train the public exam predictor. Student data requires separate purpose limitation, consent/controls and privacy review.

## 8. Release gates

| Gate | Required evidence | Failure action |
|---|---|---|
| G0 — Source integrity | Rights, provenance, hashes, cohort and syllabus verified | Exclude source |
| G1 — Corpus quality | Deduplication, blinded topic review, inter-reviewer agreement | Remap / adjudicate |
| G2 — Leakage audit | Reproducible chronological split and source-time audit | Block evaluation |
| G3 — Baseline comparison | Multiple target years and per-cohort baseline results | Keep research-only |
| G4 — Calibration | Reliability and uncertainty reporting adequate for intended use | Suppress probabilities |
| G5 — Teacher acceptance | Subject experts approve mappings and student-facing wording | Do not publish |
| G6 — Monitoring | Drift checks, source updates, versioned rollback and complaint route | Suspend predictions |

## 9. Current JMT evidence boundary (2026-11-14)

- Official NCTB notice for the 2025–26 XI–XII intake is dated 26 November 2025 and lists File 1; contemporary reporting quotes the decision as continuing the 2024–25 Bangla First Paper syllabus, but the official attachment bytes have not yet been retrieved and checked. Notice: https://nctb.gov.bd/pages/notices/695b9e5235ce18e1c05af63d
- NCTB's 2025–26 XI–XII textbook index lists *Sahityapath*, *Sahapath*, *English for Today* and ICT books: https://nctb.gov.bd/pages/static-pages/6922e145933eb65569e2b37b
- This does not constitute a complete HSC 2027 syllabus or examination blueprint. Physics, Chemistry, Higher Mathematics, Biology and other subject-specific syllabus/marking sources still require verification.
- The HSC 2028 / 2026–27 curriculum dataset is a separate cohort and remains marked for teacher review.
- Dhaka Board HSC-26 moderator-training ZIP links have been identified, but the archive payloads have not been successfully retrieved or inspected. No claims about their contents are made.
- No Predictor model has been trained or validated. No performance claim is authorised.

## 10. Next executable research tasks

1. Retrieve and verify the official NCTB 2025–26 Bangla First Paper attachment, including PDF metadata and page-level extraction.
2. Build a subject-by-subject HSC 2027 source matrix; mark every missing syllabus, marks distribution and practical/theory rule.
3. Obtain legally usable past papers and record their provenance and hashes before OCR or topic tagging.
4. Create a blinded double-review sample for topic taxonomy and calculate agreement.
5. Implement the walk-forward evaluation harness only after sufficient verified target-year papers are present.
