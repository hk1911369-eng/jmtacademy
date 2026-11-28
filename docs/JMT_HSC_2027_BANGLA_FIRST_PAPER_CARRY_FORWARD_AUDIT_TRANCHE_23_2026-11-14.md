# HSC 2027 Bangla First Paper — Carry-Forward Source Audit (Tranche 23)

**Audit date:** 2026-11-14  
**Target cohort:** HSC 2027; XI–XII intake 2025–26  
**Subject:** Bangla First Paper  
**Status:** Official carry-forward rule verified; syllabus attachment payload still not extracted.

## 1. Primary-source chain

### A. NCTB 2025–26 carry-forward notice

- Issuer: National Curriculum and Textbook Board (NCTB), Bangladesh.
- Official notice: https://nctb.gov.bd/pages/notices/695b9e5235ce18e1c05af63d
- Title: “২০২৫-২৬ শিক্ষাবর্ষ থেকে একাদশ- দ্বাদশ শ্রেণির বাংলা প্রথম পত্রের পাঠ্যসূচি”
- Notice/publication date: 26 November 2025.
- Official page metadata confirms the notice date and identifies “File 1”.
- The official page exposes the notice title, date and File 1 presence, but the attachment href and attachment text were not exposed by the available page extractors; do not infer or fabricate its storage URL.

### B. Prior-year NCTB notice and signed circular

- Official notice page: https://nctb.gov.bd/pages/notices/6922e6cedbfbab28ce098e4c
- Title: “২০২৪-২৫ শিক্ষাবর্ষ থেকে একাদশ ও দ্বাদশ শ্রেণির বাংলা প্রথম পত্রের পাঠ্যসূচি এবং ইংরেজি প্রথম পত্র মানবন্টন সংক্রান্ত”
- Notice date: 21 November 2024.
- Official signed circular PDF: https://nctb.gov.bd/sites/default/files/files/nctb.portal.gov.bd/notices/2fda494e_f478_40f2_97a7_9692c9de42d8/2024-11-21-12-04-130109718cbffd151b90e1556a7dca07.pdf
- Memo number: 37.06.0000.402.71.068.02.39.
- The PDF identifies three attachments: (1) HSC and equivalent Bangla First Paper curriculum for 2024–25, (2) Alim Bangla First Paper curriculum, and (3) English First Paper marks distribution.
- The signed circular states that the 2024–25 HSC Bangla First Paper syllabus was set as twelve stories and twelve poems. The actual attachment content is not embedded in the text-extracted portion of this circular.

### C. Corroborating statement of the 2025–26 decision

A contemporaneous 27 November 2025 report quotes the NCTB decision as continuing the existing 2024–25 XI–XII Bangla First Paper syllabus for the 2025–26 intake, until further instruction:
- https://www.prothomalo.com/education/examination/6gnl078cvr

This is secondary corroboration only. The NCTB notice is the controlling primary record, but its attachment text has not yet been retrieved; therefore the carry-forward interpretation remains provisional pending direct attachment verification.

## 2. Safe conclusion for JMT

Contemporary reporting quotes the 26 November 2025 NCTB decision as continuing the existing 2024–25 Bangla First Paper syllabus for the 2025–26 intake. Record this as a reported carry-forward, pending retrieval of the official File 1 attachment or the full signed notice text. This is not permission to reuse the 2026–27 / HSC 2028 curriculum.

The source chain is strong enough to record the carry-forward rule, but not enough to publish the complete item-level reading list until the official 2024–25 syllabus attachment (or the 2025–26 notice's File 1) is retrieved and visually/textually checked.

## 3. Retrieval audit

- NCTB notice page search results expose the title, date and File 1 presence.
- The signed 21 November 2024 circular PDF was retrieved and text-extracted; its memo number, date, issuing body and attachment list were checked.
- The NCTB web page's embedded attachment URLs were not returned by the current extraction layer.
- The signed circular's extracted text does not contain the attachment's full curriculum list.
- No URL has been guessed and no unofficial mirror has been promoted to primary-source status.

## 4. Data and release treatment

- Add provisional cohort note: HSC 2027 / 2025-26 intake / Bangla First Paper -> contemporary report says the 2024-25 NCTB syllabus continues; primary attachment verification is pending.
- Keep attachment-level reading-list records pending.
- Mark source status as official_notice_found_secondary_carry_forward_reported_attachment_pending.
- Require teacher review after attachment retrieval.
- Do not use this finding to infer other subject syllabuses, question patterns, marks distributions or the HSC 2028 cohort.


## 5. Candidate reading list extracted from a secondary-hosted PDF

A Prothom Alo-hosted PDF presents itself as the NCTB 2024–25 higher-secondary Bangla First Paper syllabus. It contains the full candidate list below:
- Secondary-hosted PDF: https://media.prothomalo.com/prothomalo-bangla/2024-11-24/vuyx0h7e/l6q6l2ng.pdf
- PDF page 1; extracted text lines 0–129 in the research capture.
- The signed NCTB circular independently confirms the attachment and the 12-prose / 12-poetry counts, but the secondary PDF has not been byte-compared with the NCTB-hosted attachment.

**Prose (12):** বাংলার নবাব লেখকদিগের প্রতি নিবেদন; অপরিচিতা; সাহিত্যে খেলা; বিলাসী; অর্ধাঙ্গী; যৌবনের গান; জীবন ও বৃক্ষ; গন্তব্য কাবুল; মাসি-পিসি; কপিলদাস মুর্মুর শেষ কাজ; রেইনকোট; নেকলেস.

**Poetry (12):** খণ্ড-বর্ণ; বিভীষণের প্রতি মেঘনাদ; সোনার তরী; বিদ্রোহী; সুচেতনা; প্রতিদান; তাহারেই পড়ে মনে; পদ্মা; ফেব্রুয়ারি ১৯৬৯; আঠার বছর বয়স; আমি কিংবদন্তির কথা বলছি; প্রত্যাবর্তনের লজ্জা.

**Supplementary reading:** Novel — লালসালু; Drama — সিরাজউদ্দৌলা.

The structured candidate is stored at:
data/curriculum/hsc-2027-2024-25-bangla-first-paper-candidate-secondary-mirror.json

**Status remains:** secondary mirror / teacher review required / not publishable. Do not silently treat these title-level records as an authenticated NCTB attachment until the original File 1 or an official NCTB-hosted copy is obtained and compared.
