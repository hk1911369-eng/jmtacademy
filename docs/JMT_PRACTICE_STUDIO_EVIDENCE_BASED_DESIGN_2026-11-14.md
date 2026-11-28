# JMT Practice Studio — evidence-based learning and release gates

**Prepared:** 14 November 2026  
**Scope:** Student Practice Studio, curriculum concepts, teacher authoring and content publication.  
**Status:** Design and governance specification; no production or test database changes.

## 1. Current JMT Test snapshot

Read-only queries against the separate `JMT Test` Supabase project returned:

| Metric | Snapshot |
|---|---:|
| Demo course records | 3 |
| Published courses | 0 |
| Course-subject mappings | 24 |
| Learning concepts | 17 |
| Published learning concepts | 0 |
| Student practice questions | 0 |
| Published practice questions | 0 |

All 17 concepts are currently broad, unpublished placeholders across Bangla, Biology, Chemistry, English, Higher Mathematics, ICT, Mathematics and Physics. Examples include ICT “Data representation” and “Algorithmic thinking”; they are not yet verified chapter-level HSC 2028 curriculum maps.

**Implication:** The Practice Studio's empty state is currently honest and correct. Do not create student-facing question sets or claim that adaptive practice is ready. The test catalogue has subject mappings but no published course, no published concepts and no practice questions. Production was not queried or modified as part of this snapshot.

## 2. Research evidence and limits

### Retrieval practice in schools

Agarwal, Nunes and Blunt (2021), *Retrieval Practice Consistently Benefits Student Learning: a Systematic Review of Applied Research in Schools and Classrooms*, reviewed 50 classroom experiments with 5,374 participants and 49 effect sizes. The authors report that 57% of effect sizes showed medium or large benefits. Only 6% of included experiments were conducted in non-WEIRD countries, so local validation in Bangladesh remains important.

- Consensus record: https://consensus.app/papers/agarwal-nunes-retrieval-practice-consistently-benefits-student/w:d75ede03-68ab-4a33-86db-d4049f68e80c/
- CoChat full-text record: https://app.cochat.ai/from/chatgpt/search/papers/10.1007/s10648-021-09595-9

### Retrieval, spacing and interleaving in authentic classrooms

Ruitenburg et al. (2026), *A Meta-Analysis of the Effectiveness and Boundary Conditions of Retrieval Practice, Distributed Practice, and Interleaved Practice in Authentic School Classrooms*, synthesised 233 effect sizes from 53 studies and 7,303 participants in primary and secondary settings. The reported mean effects were g=0.37 for testing, g=0.20 for spacing and g=0.40 for interleaving. The paper also reports moderators including knowledge type, practice/test format matching, retention interval and feedback provision/timing.

- DOI: https://doi.org/10.1007/s10648-026-10225-5
- CoChat full-text record: https://app.cochat.ai/from/chatgpt/search/papers/10.1007/s10648-026-10225-5
- Consensus record: https://consensus.app/papers/details/w:08a94097-7a5b-468e-b319-4fa0764eadcb/

### Retrieval-based concept mapping with high-school students

Lechuga, Ortega-Tudela and Gómez-Ariza (2024), *Retrieval-based concept mapping makes a difference as a retrieval practice activity: a study with high school students*, studied 60 students. The sequence of concept mapping followed by free recall improved performance on a two-week delayed test compared with the reverse sequence. This is a focused study, not proof that the same effect size will generalise to Bangladeshi HSC cohorts.

- DOI: https://doi.org/10.3389/feduc.2024.1287744
- CoChat full-text record: https://app.cochat.ai/from/chatgpt/search/papers/10.3389/feduc.2024.1287744

## 3. Product decisions for JMT

1. **Teach before testing.** Retrieval prompts should follow a lesson, textbook section or teacher-approved explanation. The system must not use an unintroduced concept as a surprise diagnostic without labelling it.
2. **Keep practice low stakes.** Show feedback and a clear explanation after submission. Do not make practice attempts count as a formal exam grade.
3. **Match practice to the intended outcome.** MCQs are useful for selected knowledge checks, but HSC preparation also needs short-answer, worked numerical, diagram, code-writing and creative/written response formats where the syllabus calls for them.
4. **Space review over time.** Use recent evidence and mastery state to schedule future retrieval; do not equate one correct answer with durable mastery.
5. **Interleave after foundations.** Mix related concepts after students have learned their basic distinctions. Do not randomise unrelated topics merely to look adaptive.
6. **Offer concept-map recall as an optional activity.** It should be a scaffolded prompt, not a required feature for every topic.
7. **Measure delayed learning.** Track return-session performance and retention windows, not only immediate session accuracy.
8. **Keep full syllabus coverage visible.** Any prioritisation is a practice suggestion, never a promise about future exam questions.

## 4. Content publication governance

The current draft branch adds a source/rights and independent-review gate to student practice questions:

- Every question records origin type, source reference and source year where available.
- New submissions are unpublished and enter a review queue.
- An administrator other than the author must review answer accuracy, explanation, curriculum fit and rights evidence.
- Approval requires explicit rights classification and a written review note.
- Editing an approved question returns it to unpublished review.
- A public or official URL does not itself prove permission to reproduce copyrighted textbook or publisher questions.

The migration is only in the draft PR. It has not been applied to JMT Test or production. Existing published questions would be unpublished for re-review when the migration is eventually applied; this impact must be confirmed against the target database before applying it.

## 5. HSC 2028 ICT curriculum anchor

Added `data/curriculum/hsc-2028-2026-27-ict-chapter-anchors.json` with the six chapter headings transcribed from the official NCTB-hosted 2026–27 higher-secondary ICT syllabus PDF.

- Official NCTB PDF: https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/office-nctb/2026/9/78491622-b852-466c-af8b-783718732428.pdf
- NCTB's official 2026–27 higher-secondary textbook index: https://nctb.gov.bd/pages/static-pages/6ae03d7be0cf994829342115

The official syllabus extraction confirms chapter headings only. The official index page was reachable, but the available extraction did not expose its ICT PDF attachment link. The six chapter anchors therefore remain teacher-review candidates; no subtopics, marks distribution or learning outcomes have been invented.

## 6. Next implementation sequence

1. Review and merge the practice governance feature only after CI passes and the migration has been reviewed.
2. Apply the governance migration to JMT Test first, then run Supabase security/performance advisors and verify RLS, grants, RPC permissions and trigger behaviour.
3. Retrieve and verify the matching NCTB textbook edition; create detailed ICT concepts only from textbook sections and teacher review.
4. Publish a small teacher-approved original question pack in JMT Test, then test the student flow with an approved test account.
5. Add written/numerical/code question types and spaced-return evaluation before calling the Practice Studio complete.
6. Keep all HSC 2027 and HSC 2028 curriculum versions separate.

## 7. Tool and data boundaries

- JMT Test was queried read-only. No database mutation was made.
- The primary production database was not changed.
- GitHub changes are in an open draft PR; no merge or production deploy was performed.
- No Canva design or Notion project page was found in the connected accounts.
- No Search Console property is connected to the GSC Wizard account; SEO performance cannot yet be measured from first-party search data.
- Browser interaction and external account configuration remain separate release tasks.
