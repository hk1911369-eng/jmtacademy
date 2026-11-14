# JMT Research Tranche 21 — ACS Benchmark Refresh and NCTB 2026–27 Source Retrieval

**Research date:** 14 November 2026  
**Research branch:** `audit/jmt-master-prompt-follow-through`  
**Purpose:** Resume the existing ACS benchmark and Curriculum Atlas work using the earlier research register and the product owner's first-hand benchmark observations. This is not a new product concept and not a clone specification.

## 1. ACS identity and benchmark boundary

In the existing JMT research programme, **ACS** refers to the Bangladesh ACS Group / Apar's Classroom (ASG Shop) education ecosystem, not merely one examination page or one mobile app.

The ACS Group first-party hub describes six brands:
1. ACS Future School — school learning.
2. ASG Shop / Apar's Classroom — HSC academic cycles and university/medical/engineering/IBA admission programmes.
3. Rhombus Publications — books, compact series, question banks and e-books.
4. Achieve — offline exam batches and model-test centres.
5. ACS Engineering School — engineering concept learning.
6. ACS Mart — marketplace.

The hub's learner-count statements (including 1M+) are marketing claims, not independently audited active-user numbers. The hub labels some brands as upcoming even where separate brand domains are live; record each brand's own site and observation date rather than relying on the hub status alone.

**JMT requirement:** benchmark the full learner journey and operational quality, but do not copy ACS code, branding, UI assets, paid books, question banks or proprietary content. The user's stated ambition is to make JMT materially better than ACS, not to reproduce it.

## 2. Product-owner first-hand benchmark observations (11 November 2026)

These were supplied directly by the product owner and are not inferred from public marketing pages. They are acceptance-research inputs; exact workflows still need screenshots/video or a guided walkthrough when available.

### Academic planner and personal routine
- Full-year syllabus planner with class timing and lesson sequence.
- Weekday and weekend availability, including Saturday/Sunday.
- Class archive and catch-up for missed classes.
- Sleep/wake preferences, personal study goals and syllabus-completion tracking.
- JMT target: annual → term → week → day planning, with explainable workload, automatic repair, protected completed work and no impossible schedules.

### Learning community and notes
- Topic/community spaces for questions, doubts and peer help.
- Notes sharing, comparisons, downloads and visible quality/ranking signals (including top 1/2/3).
- Teacher homework oversight and feedback.
- JMT target: concept-linked threads, accepted/teacher-verified answers, versioned notes, transparent quality rubric, attribution, report/moderation and privacy-safe student identities. Ranking must reward quality/helpfulness, not raw popularity or vote manipulation.

### Virtual labs and academic tools
- Physics: projectile-motion (“Prasher Goti”) experiment with adjustable parameters and graphs.
- ICT: HTML editor/live preview, SQL run/view and C-program output.
- Mathematics: matrices and vectors.
- Scientific calculator comparable in function to a Casio FX-991CW, but with original JMT interface and no copied Casio branding/assets.
- Focus mode, optional Islamic/routine mode, live classes and notifications.

These observations extend the earlier roadmap commit `3211b780e8f5074058be7d465dc6a4a08b96ebda` and must remain part of the project scope. Optional faith/routine preferences must be user-controlled; never infer a learner's religion.

## 3. Current public ACS source refresh

### 3.1 ACS Group
- First-party hub: https://www.acsedtech.com/
- Current public hub presents the six-brand ecosystem and links the specialized sites.
- Its 1M+ learner statement is self-published and must not be reported as verified active users.

### 3.2 ACS Future School
- Current homepage: https://www.acsfutureschool.com/
- Publicly presents Class 6–12 pathways, live classes, exams, learning materials and community.
- Current homepage links free courses, subject-specific teacher profiles and the HSC 2028 shop.
- The old 2026 academic-program URL recorded in the earlier research was returning 404 on the 14 November live scrape. Retain its prior dated feature inventory as historical evidence, but do not treat that old page as currently live.
- Curiosity AI public subdomain: https://curiosity.acsfutureschool.com/ returned Cloudflare 525 (origin TLS handshake failure) on this research pass. Its actual AI workflow, model, source grounding and privacy controls could not be inspected. Do not infer capabilities from the name alone.

### 3.3 Apar's Classroom / ASG Shop
- Official shop: https://aparsclassroom.com/shop
- HSC 2027 catalogue: https://aparsclassroom.com/shop/academic/HSC_27/
- HSC 2028 catalogue: https://aparsclassroom.com/shop/academic/HSC_28/
- Current pages show multiple teacher-led academic cycles across Physics, Higher Mathematics, Chemistry, Biology, English, Bangla and ICT; course bundles and individual cycles; and separate admission programmes.
- The HSC 2027 page displays course-specific cycle enrolment counters and per-cycle prices (for example, ৳1,000 per cycle on several courses). These are dynamic first-party page claims, not independently audited enrolment or revenue figures.
- The HSC 2028 page shows separate cycles and combos for Physics, Higher Mathematics, Chemistry, Biology and EBI (English, Bangla, ICT). It displays a 47,905 enrolment counter on one Higher Mathematics course; treat it as a self-reported/dynamic page metric, not a verified active learner count.
- Product implication: JMT needs cohort-, subject-, teacher-, cycle-, medium- and exam-target-aware course pathways, not a single static course per subject.

### 3.4 ACS mobile/desktop app listing
- Google Play: https://play.google.com/store/apps/details?id=com.asgshop.acs
- Listing observed 14 November 2026: 4.6 rating, 100K+ downloads, updated 12 November 2026. The page rendered inconsistent review-count values (1.09K and 965 in different page regions); do not store a single exact review count without a fresh normalized capture.
- Release note/public listing advertises a **Python Lab for the new HSC ICT curriculum**.
- Sample user reviews mention downloadable classes, discussion groups/notes, calculator, bookmarks and lab features; another review reports buffering on mobile data. These are anecdotal user reports, not a representative reliability study.
- Google Play data-safety declarations are developer-supplied and are not an independent privacy audit.
- This is an important benchmark delta: the JMT research and code inventory must explicitly compare secure Python execution, not just HTML/SQL/C.

### 3.5 Achieve
- Official site: https://achievecentre.online/
- Publicly advertises offline HSC/admission exam batches, daily and weekly exams, paper/subject finals, model tests, home-practice exams, question-bank materials, solve classes/sheets, guidance, scholarships and a student portal with leaderboard/progress.
- The current homepage's counters include zero/placeholder values; do not infer branch or enrolment scale from them.
- Product implication: a blended online/offline learner record and standardized result import is a later institutional capability; do not pretend an online quiz is equivalent to a physical exam-centre network.

### 3.6 Rhombus Publications
- Official site: https://www.rhombuspublications.com/
- Current homepage presents HSC 2028 cycles/bundles for Physics, Chemistry and Higher Mathematics; HSC 2027 cycle resources; admission, e-book, class 6–10 and stationery areas.
- This reinforces the need for resource-type separation (textbook, cycle book, compact series, test paper, question bank, solution, e-book), edition/version tracking and rights records. Public catalogue existence is not permission to ingest or redistribute book content.

### 3.7 ACS Engineering School and ACS Mart
- Engineering site: https://acsengineeringschool.com/ (previous first-party review found a live public course site despite the group hub's “upcoming” label).
- ACS Mart is linked from the group hub as a marketplace brand; current operational status and full catalogue still require separate review.

## 4. JMT implementation comparison — repository evidence, not roadmap claims

This comparison is against the research/implementation branch `audit/jmt-master-prompt-follow-through` at head `f94069cd17bc959c80a10b8fa8f0e2bbce44903f`. It is **not** a statement that the branch has been merged or deployed.

| ACS benchmark / owner observation | JMT evidence located in branch | Current assessment / next proof |
|---|---|---|
| Annual planner, availability, sleep/wake, goals, catch-up | Exam War Room route, study goals, revision plans, spaced revision migrations | Partial foundation. No complete annual planner, availability model, sleep/wake scheduling, archived-class catch-up and plan-repair E2E verified. |
| Community doubts, peer help, homework oversight | Discussion schema/security, course discussions, assignments and teacher workflows | Partial foundation. Need unified community experience, teacher-verified answers, safe note sharing, ranking/compare/download and moderation journey. |
| Physics projectile motion and graphs | `components/projectile-motion-lab.tsx`, `lib/projectile-motion.mjs`, graph-analysis component, multiple physics simulations | A meaningful implementation exists. Validate exact curriculum alignment, graph axes/units, saved experiment report and teacher review. |
| ICT HTML preview, SQL and C output | No dedicated HTML/SQL/C lab component or safe code-runtime path found in this branch path inventory | Not verified/likely gap. Build only with isolated sandbox or constrained in-browser execution; never run learner code in the main server process. |
| ACS Python Lab | No Python lab/runtime component found in this branch path inventory | New explicit gap. Evaluate browser WebAssembly runtime vs isolated ephemeral sandbox, offline/low-end Android performance, abuse controls and curriculum fit before implementation. |
| Mathematics matrices/vectors | Quadratic explorer and general graph/calculator support exist in the broader catalogue; no dedicated matrix/vector lab component found in path inventory | Partial. Add matrix/vector visualisation and operation/geometry tasks with independently tested numerical models. |
| Scientific calculator | `components/lab-analysis-calculator.tsx` and tests | Partial lab-analysis utility, not evidence of a complete student scientific calculator with history, exam modes and broad function coverage. |
| Focus/Islamic routine modes | User-controlled routine preferences are in the roadmap; no dedicated implementation found in this route/component inventory | Not verified. Keep optional, accessible and user-configurable. |
| Live classes and notifications | Notifications actions/migrations exist; no verified live-class room/streaming workflow in this route inventory | Notifications foundation exists; live class delivery and reconnect/recording workflows need separate implementation/evidence. |
| Offline learning/downloads | Offline/media architecture proposal and app-shell work exist in related research branches | Architecture/partial shell only; content package download, encrypted cache, expiry and sync conflict flows require E2E. |
| AI Teacher / Curiosity AI benchmark | JMT AI Tutor architecture and acceptance requirements exist; no selected provider/model or evaluated tutor implementation | Deliberately deferred until source corpus, privacy, quality evaluation and cost controls are ready. |
| Exam Question Predictor | Leakage-resistant predictor protocol and exam research exist; no complete authenticated question corpus or blind backtest result | Specification/research foundation only. No trained or validated predictor. |

### Code inventory anchors
- `docs/JMT_EXPANDED_LEARNING_PLATFORM_SCOPE.md`
- `docs/JMT_OFFLINE_MEDIA_AI_ARCHITECTURE.md`
- `docs/JMT_ATOMIC_ACCEPTANCE_BACKLOG_2026-11-11.md`
- `docs/VIRTUAL_LAB_MODEL_REGISTER.md`
- `components/projectile-motion-lab.tsx`
- `components/chemical-kinetics-lab.tsx`
- `components/chemical-equilibrium-lab.tsx`
- `components/wave-interference-lab.tsx`
- `components/cell-division-lab.tsx`
- `app/student/exam-war-room/page.tsx`
- `app/teacher/learning/page.tsx`
- `app/teacher/practice/analytics/page.tsx`

## 5. NCTB 2026–27 higher-secondary syllabus notice — new retrieval result

### Official index evidence
- NCTB notice index: https://nctb.gov.bd/pages/notices/
- It lists the notice **“২০২৬-২৭ শিক্ষাবর্ষের উচ্চ মাধ্যমিক ও সমমান শ্রেণির জন্য নির্ধারিত পাঠ্যসূচি”** dated **1 October 2026**.
- The official index confirms that the notice exists and its date. The NCTB detail page did not expose the notice body or attachment in the current Firecrawl extraction; no canonical NCTB PDF URL was obtained in this pass.

### Archived scan found, but source status remains provisional
- Third-party archive page: https://notishika.netlify.app/notice/904fa8/
- Archived one-page PDF: https://notishika.netlify.app/files/nctb-2026-10-01-904fa8/notice.pdf
- The archive states that it preserves a scan from NCTB and displays a truncated SHA-256 beginning `9faeec188f`; the full hash was not independently computed in this pass.
- Firecrawl's PDF parser extracted an ICT syllabus table from this scan. The six chapter headings shown are:
  1. তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ প্রেক্ষিত — ICT: World and Bangladesh Perspective.
  2. কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং — Communication Systems and Networking.
  3. সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস — Number Systems and Digital Devices.
  4. ওয়েব ডিজাইন পরিচিতি এবং HTML — Introduction to Web Design and HTML.
  5. প্রোগ্রামিং ভাষা — Programming Language.
  6. ডেটাবেজ ম্যানেজমেন্ট সিস্টেম — Database Management System.
- The PDF text includes an NCTB attribution/signature area, but OCR is imperfect. Because the file is hosted by a third party and the official original attachment was not retrieved, this is **secondary archived-scan evidence**, not yet a verified canonical syllabus record.
- Secondary news reports published 2–3 October 2026 say that Bangla, English and ICT syllabuses/marks distribution for Class XI, academic year 2026–27, were published. These reports are discovery/corroboration only; obtain the original NCTB subject files before production use:
  - https://thesun.bd/hsc-1st-year-syllabus-2026-2027-published-one-week-after-classes-begin-134
  - https://shikshasangbad.com/secondary/21624/
  - https://www.amaderbarta.net/en/news/class-xi-syllabus-published-386429

### Cohort boundary — do not mix HSC 2027 and HSC 2028
- The 2026–27 academic-year Class XI syllabus belongs to the students beginning Class XI in that session and is associated with the **HSC 2028** cohort, subject to the official cohort mapping.
- The **HSC 2027** cohort is the earlier 2025–26 Class XI intake, now in Class XII during 2026. Do not apply the 2026–27 Class XI syllabus notice to HSC 2027.
- This tranche does not verify the full subject-wise HSC 2027 syllabus or the complete HSC 2028 science-group syllabus.

## 6. Revised research status and next concrete actions

### Completed / recovered prior work
- ACS ecosystem and first-party product inventory initiated in the earlier research programme.
- Product-owner first-hand ACS benchmark list preserved from 11 November.
- Twenty numbered research tranches and publisher/author registries already exist in the PR #42 branch; do not recreate them.
- HSC 2026 candidate-status and component-level exam operations research is recorded in the existing deep-research register.
- Initial official NCTB, board, DU, GST and agriculture-admission sources are catalogued with explicit evidence limitations.

### Still open — execute in this order
1. Obtain the original NCTB 1 October 2026 notice attachment and the separate Bangla, English and ICT syllabus/marks-distribution files from an official NCTB URL; verify every page and applicable cohort.
2. Complete the HSC 2027 (2025–26 intake) official syllabus and exam-blueprint extraction separately from HSC 2028.
3. Download and inspect the five HSC-26 question-setter/moderator manual ZIP archives (Physics, Chemistry, Biology, Higher Mathematics, ICT); record original filenames, file checksums, document title/issuer/date, page count and review notes. Link discovery is complete; content review is not.
4. Continue ACS first-party and public-app walkthrough research, including Curiosity AI when accessible, and compare each workflow against the user-supplied benchmark. Obtain screenshots/video only if the user later supplies them; do not claim to have them.
5. Build a gap-to-acceptance map for annual planner, community/notes, live classes, Python/HTML/SQL/C labs, matrix/vector labs, scientific calculator and offline downloads.
6. Expand official university admission records for DU units, GST, agriculture, BUET and medical; keep each exam session/unit separate.
7. Only after provenance, syllabus mapping and rights review, start historical question-paper transcription/tagging and the predictor's chronological backtests.

**Evidence boundary:** This tranche adds current source observations and a repository feature-gap map. It does not certify ACS's private workflows, establish the official HSC 2027/2028 full syllabus, inspect the moderator ZIP contents, create a question corpus, train an AI model, or change production code/data.
