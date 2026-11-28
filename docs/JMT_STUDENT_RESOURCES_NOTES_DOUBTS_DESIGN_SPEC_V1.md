# JMT Academy — Student Resources, Private Notes & Learning Doubts Design Specification v1

**Status:** Design specification; not implementation approval  
**Priority:** Learning Experience OS — student learning continuity  
**Repository evidence reviewed:** `feat/offline-recording-entitlements` at `b1dfdce16b07bf595ddb9e5dc7280e58b7329c5c`, plus the authoritative design-document branch  
**Owner direction:** Complete the application design before programming resumes. The existing visual frames are provisional foundations, not an approved final visual direction.

## 1. Product intent

This experience must make learning material dependable, personal study private, and asking for help easy without turning the course into a noisy social feed.

A learner should be able to:
1. Find the exact class material attached to a lesson and understand whether it can be previewed, downloaded or saved for supported offline use.
2. Make private notes that remain theirs, are searchable and return them to the lesson context.
3. Ask a precise academic doubt, receive a useful teacher response, follow the thread and understand whether the question is public to the permitted course cohort or private.
4. Recover safely from a dropped connection without losing a draft or being told that something was saved when it was not.

**Design principle:** materials, private thinking and shared questions are three different information domains. They must not be collapsed into one generic “resources/discussion” panel.

## 2. Evidence boundary and current implementation audit

### 2.1 Observed source behavior

The following are source observations from the inspected feature head; they are not claims of successful hosted Storage or authenticated browser testing.

- `app/learn/[courseId]/page.tsx` loads lesson resources, course discussions, author roles and reactions for the authenticated learning page. It displays resource and discussion content inside each lesson card.
- `components/lesson-resource-upload.tsx` provides assigned-staff upload of MP4/WebM/QuickTime, PDF, office documents, images and audio, capped at 100 MiB in the client. It uploads directly to the private `lesson-materials` bucket, then inserts metadata. If metadata insertion fails, it attempts to remove the just-uploaded object. It currently reports a general upload message rather than byte-level progress.
- `components/lesson-resource-access.tsx` requests a signed link through `getLessonResourceUrl`. Preview is supported inline for video, PDF and image; other types open in a new tab. Download is shown only when metadata says `downloadable`. The signed URL lifetime in `app/actions/learning.ts` is 300 seconds.
- `getLessonResourceUrl` reads the resource row under the caller's RLS context, rejects missing rows and non-downloadable downloads, then requests a signed Storage URL. The private Storage bucket policy is a second authorization layer.
- `supabase/migrations/0010_lesson_resources_discussions.sql` defines resource metadata, the private bucket, role/course-scoped resource policies, lesson discussions, reactions and bookmarks. Student resource/discussion access is tied to published lessons and active enrolment with admission fee paid and current paid-through date. Assigned teachers/staff and admins have their scoped access.
- Discussion posts support top-level posts and one reply level, a 3,000-character body limit, three reactions (like/love/helpful), teacher/admin pinning, and a rate-limit RPC. Migrations 0021, 0028 and 0029 add field guards/rate limiting, reaction scope and author-only body editing constraints.
- The current discussion UI does not expose a report/flag action, a moderation queue, a private-to-teacher question mode, or a visible author edit/delete workflow.
- The inspected route contains no dedicated personal-notes UI or personal-notes data table. A separate private notes capability is therefore a **new product/design requirement**, not an existing feature to imply as implemented.
- Existing resource UI has no explicit offline download manager, checksum/integrity state, retry/resume progress display, or clear distinction between a temporary signed preview URL and a durable offline copy. The inspected upload and resource-access client handlers do not wrap network calls in try/catch/finally; an unexpected thrown request can leave the busy state stuck, and an expired/failed preview can leave an old URL in component state. This needs explicit failure cleanup and stale-link clearing in a future implementation.
- Current learning page queries and renders resource/discussion data in the same page request. It does not yet present independent loading/partial-failure states for the three domains. A future design must not show an empty discussion or empty library when that source actually failed.

### 2.2 Important security and product boundaries

- Never expose raw Storage object paths or permanent public URLs as learner access links. A private object must be authorized for each preview/download request.
- A signed URL is a time-limited bearer capability. The interface must identify an expired link and obtain a fresh one only after current authorization is checked. A UI timer is not an authorization control.
- Resource metadata and Storage object policies must remain aligned. A metadata row alone must not grant access to a path belonging to another course or lesson.
- Do not let a client-side role check, hidden button or route visibility act as the security boundary.
- Private notes must be owner-only by default. Teachers, staff, admins, parents/guardians and classmates must not silently gain access to private notes.
- A doubt posted to the course cohort is not private. The composer must say who can see it before submission.
- Do not expose a learner's phone, email, guardian details, payment status or unrelated profile information in discussion identity.
- Parent/guardian access must never include private notes or private teacher communications unless a future explicit, separately approved sharing control exists.
- The physical-offline recording entitlement remains a separate entitlement system. Downloading an ordinary course resource must not create, imply or grant physical-offline missed-class recording rights.

## 3. Benchmark findings and decisions

### Open edX — notes and course discussions

Open edX documents a notes workflow with in-context highlighting, tags, a course-level notes index, search and links back to the original course location. Its documentation also describes limitations: note/highlight support is not universal across videos, exercises and PDF textbooks. This is a useful pattern, but JMT should not imply annotation support on every file type until it exists and is tested.

- Learner notes: https://docs.openedx.org/en/latest/learners/SFD_notes.html
- Course resources and discussion guidance: https://docs.openedx.org/en/latest/learners/references/resources_for_learners.html
- Accessibility guidance: https://docs.openedx.org/en/latest/educators/concepts/accessibility/accessibility_guidelines.html

### Moodle — scoped forum permissions

Moodle documents group-aware discussions, local moderator roles and configurable forum permissions. The useful lesson is that cohort visibility and moderator powers are explicit permission concepts, not just visual labels. JMT should keep permissions simpler and more legible for learners while enforcing scope in the database.

- Forum configuration and permissions: https://docs.moodle.org/25/en/Forum_configuration
- Forum setup and role permissions: https://docs.moodle.org/24/en/Adding/editing_a_forum

### Community pain signals — discussion workload and low-value posting

A Reddit discussion about Canvas discussion requirements contains student and instructor complaints that excessive mandatory posting can produce repetitive, low-substance contributions and grading burden. This is anecdotal, not a representative study. It supports a design guardrail, not a universal conclusion: JMT should optimize for useful doubt resolution, not post counts, forced engagement or leaderboard pressure.

- Student/instructor discussion: https://www.reddit.com/r/college/comments/14an85w/you_know_those_discussion_posts_on_canvas_my/

### Synthesis

1. Notes should be useful in context and discoverable from one private library.
2. Questions should be structured around the lesson and the learning problem, not generic social engagement.
3. Visibility and moderation must be understandable before the learner posts.
4. Uploads need reliable progress, recovery and clear file constraints; a spinner alone is not enough.
5. A mobile interface must not bury the core actions under nested tabs or tiny controls.
6. No feature should force a learner to publish private thinking merely to save it.

The sources above are vendor documentation and anecdotal community evidence. They do not prove that JMT's design will improve learning outcomes; those outcomes require later usability and learning evaluation.

## 4. Proposed information architecture

The learning experience separates into three persistent destinations:

- **Class materials** — teacher-published files, lesson attachments and approved resources.
- **My notes** — private notes and saved explanations, searchable across the learner's enrolled courses.
- **Doubts** — course-visible questions and teacher replies, with a clearly explained audience.

Within a lesson, the learner sees three compact contextual entry points: **Materials**, **My notes**, and **Ask a doubt**. On mobile, these become a segmented control or stacked sections with persistent context—not a dense desktop sidebar squeezed into a narrow viewport.

The course-level library offers filters by course, chapter, lesson, file type and recently added. The notes library offers search, tags, course/chapter filters and a “return to lesson” action. The doubt inbox offers unanswered, teacher-replied, resolved and archived filters without gamified post counters.

## 5. Screen specifications

### 5.1 Lesson materials panel

**Header:** lesson title and chapter context; count of available items; a clear indication if some items are unavailable due to access or network failure.

**Each resource row/card:**
- Human-readable file title and optional teacher caption.
- File type icon plus text label; file size; added date; source lesson.
- Primary action based on capability: Preview, Open, or Download.
- Explicit download availability; do not show a disabled download icon without explanation.
- For large files, estimated size and a warning before starting a cellular download.
- For video/audio, playback duration only when real metadata is available; never invent it.
- For PDFs, an accessible preview with a clear open-in-reader fallback.
- For office files, state that the file opens externally if no safe in-app renderer exists.

**Resource library filters:** course, chapter, lesson, type, newest/oldest, downloadable-only. Search must match file title and caption, and show the matching lesson context.

**Staff publishing flow:** choose lesson → choose file → validate supported type/size → optional caption → choose whether student download is permitted → upload with progress → verify upload → publish metadata. The UI must distinguish “file uploaded” from “resource published”. A failed metadata write must not leave an apparently published orphan.

**Upload progress:** percentage and transferred/total bytes when the transport provides reliable progress; otherwise use an honest indeterminate progress state. Show cancel only if cancellation is actually supported. Prevent accidental duplicate submission. Do not promise resumable upload until the underlying transport supports it.

### 5.2 My notes — private study workspace

**Private by default.** Every notes surface displays a small but explicit “Only you can see these notes” privacy cue.

A note can contain:
- Title (optional; generated fallback such as “Note from [lesson title]” is allowed only from actual lesson metadata).
- Rich text with accessible headings, lists, inline equations and Bangla/English mixed text.
- Tags chosen by the learner.
- Course, chapter, lesson and source anchor when available.
- Created/updated timestamp and sync status.

**In-context capture:** a learner can create a note from the lesson's “My notes” action. Text selection/highlighting is a later enhancement and must be designed as progressive enhancement; never make it the only way to create a note, especially on touch screens, screen readers or video/PDF content.

**Notes library:** search note text and tags; filter by course/chapter/tag; sort by recently edited or lesson order; open note; return to its lesson; edit; delete with undo/confirmation. Support an untagged note and empty state.

**Privacy controls:** private is the default and there is no public/share toggle in v1. Do not include notes in teacher dashboards, parent views, analytics exports or AI prompts by default. Any future AI use must have a separate, informed, revocable opt-in and clear data handling description.

**Data contract gap:** the inspected source has no personal-notes table or action. Before implementation, design and security review must define owner identity, note content format, course/lesson references, tag model, created/updated timestamps, soft-delete/retention behavior, RLS, export/delete semantics and conflict handling. Do not repurpose `lesson_discussions` or another shared table for private notes.

### 5.3 Doubts — structured academic question and answer

**Question composer fields:**
- Question title or short prompt (required).
- Detailed explanation (optional; bounded length).
- Context prefilled from current course and lesson.
- Optional attachment only after a secure attachment contract is designed and tested.
- Audience statement: “Visible to learners and assigned teaching staff in this course” (or the exact narrower scope if group/batch scoping is implemented).
- Optional topic/concept tag when backed by course metadata.

Before submission, show the audience and a reminder not to include phone numbers, payment details or private information.

**Thread view:**
- Original question, lesson context, timestamp and author display name.
- Teacher/staff identity marker based on verified role and assignment, not user-entered text.
- Answers/replies with a clear teacher response emphasis.
- “Helpful” reaction is secondary; no public popularity ranking.
- State: Awaiting teacher, Teacher replied, Resolved by learner/teacher, or Archived. Resolution must not hide the thread or prevent a follow-up when allowed.
- “Return to lesson” and “continue learning” actions.
- Sort default: pinned teacher guidance, then unanswered/recently active with transparent ordering. Do not let reactions alone decide academic priority.

**Private-to-teacher doubt:** not included in v1 because current schema and UI only establish course-visible discussions. If introduced later, it must be a separate explicitly private conversation type with strict teacher assignment, retention and escalation rules—not a cosmetic toggle on a public post.

**Moderation and reporting:** design report action, reason selection, report confirmation, hidden/removed content state and staff moderation queue. The current schema has no report table or moderation queue. Do not fake report submission or imply a moderation process exists. The implementation design must define report actor, target, reason, timestamp, review status, reviewer, action and audit trail; access must be restricted to authorised moderators.

### 5.4 Teacher doubt inbox (design scope; later teacher-workspace phase)

- Filter assigned courses/batches and unanswered/replied/resolved.
- Show lesson context and student question without unrelated private learner data.
- Answer in context; pin important guidance; mark resolved only when the workflow supports it.
- Reported/hidden items appear in a moderation queue with reason and audit metadata.
- No cross-course access by guessing IDs. Assignment scope is enforced server-side.
- Batch actions require preview and explicit confirmation; no bulk delete by default.

## 6. Responsive and visual direction

This specification does not approve the current Figma visual direction. The next visual pass must be more distinctive and deliberate than a conventional LMS made from generic rounded cards.

**Design direction to explore:** a refined academic workspace with editorial typography, strong lesson-context hierarchy, restrained use of colour, precise spacing, purposeful motion, and a calm scientific/technical character. It should feel modern and confident without looking like a fintech dashboard, generic SaaS admin template, social network or gamified children's app. JMT branding must remain clear; subject content (Chemistry, Physics, Biology, Bangla, English and admission preparation) must feel native to one system.

Visual quality is not a substitute for clarity. A learner must identify the current lesson, file action, note privacy and question audience immediately.

### Desktop
- Course/lesson context remains visible.
- Materials use a compact, scannable list with preview occupying a deliberate content region where appropriate.
- Notes library supports a two-pane list/detail layout only when width permits.
- Doubt thread prioritizes question and teacher answer; metadata remains secondary.

### Mobile (390 px and narrower)
- Single-column layout; no horizontal scrolling.
- Primary action within thumb reach; minimum 44×44 CSS px touch target.
- File title and action wrap safely for long Bangla/English names.
- Preview opens in a dedicated full-screen or near-full-screen surface with a persistent close/back action.
- Notes editor uses a stable keyboard-aware layout; save state remains visible above the keyboard.
- Composer never loses text when opening an attachment picker or navigating to audience/privacy explanation.
- Avoid nested accordions for the only route to a file or teacher answer.

### Tablet and zoom
- Reflow at 768 px and 1024 px widths; preserve content hierarchy.
- At 200% text zoom, controls and text remain usable without clipped actions.
- Test long Bangla strings, mixed Bengali/Latin text, equations, filenames and large text settings.

## 7. Required state catalogue

Every relevant screen must have designed and testable states:

| State | Materials | My notes | Doubts |
|---|---|---|---|
| Initial loading | Skeleton rows with stable layout | Editor/list skeleton | Thread skeleton |
| True empty | “No files for this lesson yet” | “Start a private note” | “No questions yet” |
| Source unavailable | Explicit retry; never show empty as success | Preserve local draft; show sync unavailable | Preserve draft; show thread unavailable |
| Offline | Cached metadata only if confirmed; explain file may require connection | Local draft and unsynced badge; never claim cloud save | Draft preserved; posting waits for connection |
| Slow network | Upload/download progress or honest indeterminate state | Debounced save with pending state | Submit lock and pending state |
| Permission denied | Explain course/resource access is unavailable without leaking object existence | Sign-in/ownership explanation | Course access explanation |
| Expired signed URL | “Link expired—prepare a new secure link” | N/A | N/A |
| Revoked entitlement | Clear preview and protected URL; show access changed | Keep private note accessible to owner unless account policy says otherwise | Deny new course-thread access |
| Unsupported file | Explain safe external open/download option | N/A | Attachment validation |
| Upload failure | Keep selected file and allow retry; explain if object was not published | N/A | Attachment retry |
| Conflict | N/A | Show newer version and let user resolve; never silently overwrite | Prevent duplicate submit |
| Moderation | N/A | N/A | Report received / under review / hidden / actioned |
| Deleted/unavailable | Resource removed message | Deleted/undo or unavailable | Removed message with safe context |

Do not use colour alone to convey any state. Use accessible status text and announcements.

## 8. Proposed data and permission contract — not a migration

This is a design contract, not approval to change the database.

### Resources
- Preserve private bucket and resource metadata separation.
- Validate MIME type, size, ownership, lesson/course match and role at server/storage boundaries.
- Student read requires published lesson plus active eligible enrolment and current paid-through period as defined by current business rules.
- Assigned teacher/staff can manage only assigned course resources; admin has explicit administrative scope.
- Signed URL creation re-checks current authorization and download permission.
- Define orphan cleanup/reconciliation for object upload success + metadata failure.
- Future offline copies require the existing offline package/integrity/entitlement architecture; do not treat a signed URL as offline storage.

### Private notes — new contract required
- Table owner key must be the authenticated user; RLS SELECT/INSERT/UPDATE/DELETE is owner-only.
- Validate referenced course/lesson belongs to a course the learner may access; preserve the note if course enrolment later expires unless retention policy explicitly says otherwise.
- No staff/admin/guardian bypass in ordinary learner reads.
- Use optimistic concurrency/version field or equivalent conflict strategy; never silently overwrite newer content from another device.
- Define content size limit, sanitization/rendering, export and permanent deletion behavior before implementation.
- Keep any AI processing disabled until separate consent and data-retention design is approved.

### Doubts and moderation
- Keep course, lesson and parent-thread references internally consistent.
- Public course discussion read/post requires current authorised course membership/entitlement.
- Teacher/staff moderation and pinning requires assigned scope; admin powers are audited.
- Report records are visible only to reporter (limited receipt state) and authorised moderators.
- Prevent spoofed author identity, role labels, timestamps, parent thread and pin status.
- Enforce rate limits, maximum lengths, safe text rendering and anti-spam controls server-side.
- Define whether a resolved thread can be reopened and who can do so before implementation.

## 9. Measurable acceptance criteria

These are proposed release gates, not achieved metrics.

### Findability and task completion
1. In moderated usability testing, at least 90% of representative learners locate and open a specified lesson file within 15 seconds without assistance.
2. At least 90% create a private note and return to its source lesson within 30 seconds.
3. At least 90% can state who will see a doubt before submitting it; zero participants should mistake a course-visible post for a private message.
4. At least 90% can locate a teacher's answer to a prior question within 20 seconds using search/filter.
5. Record task completion, time-on-task, wrong turns and confidence; do not use self-reported satisfaction alone.

### Reliability
6. A failed resource metadata write never displays a published resource; orphaned objects are detectable and safely reconciled.
7. A failed note sync never displays “Saved”; drafts survive refresh/navigation under the supported local persistence contract.
8. A failed discussion post never appears as posted; duplicate submission is prevented or clearly reconciled.
9. Expired/revoked signed URLs are cleared from the active UI and refreshed only after a fresh authorized request.
10. At least 95% of test uploads at or below the published size/type limits complete successfully under the agreed network test profile; report median and p95 completion time by file size/network, not a single average.
11. No silent data loss in 100 scripted interruption cases covering upload, note editing and doubt composition.

### Security and privacy
12. Cross-user private-note read/update/delete attempts are denied at the database/RLS layer in every tested role.
13. Unassigned teacher and online-only student cannot access another course's protected resources/discussions by changing identifiers.
14. Revoked/expired enrolment cannot mint a new resource signed URL.
15. Non-downloadable resources cannot be downloaded through direct action/API calls.
16. Reported content and moderation metadata are inaccessible to ordinary students except the reporter's minimal receipt state.
17. No private note content appears in parent, teacher, admin, export or analytics views without a separately approved opt-in contract.

### Accessibility and responsive quality
18. WCAG 2.2 AA target: normal text contrast at least 4.5:1, large text at least 3:1; focus visible and not obscured.
19. All primary actions have at least 44×44 CSS px target; keyboard-only completion of core tasks is possible.
20. Screen-reader announcements accurately distinguish saved, saving, failed, uploaded, published, posted and pending.
21. At 320, 390, 768 and 1024 CSS px widths and 200% zoom, no essential action or content is clipped and no horizontal page scroll is required.
22. Bangla, English and mixed-language content, long filenames and equations are tested with real representative strings.

## 10. Verification plan before implementation approval

- Source/RLS review for every operation: resource list, preview, download, upload, metadata insert, orphan cleanup, note CRUD, discussion post/reply/edit/delete, reaction, pin, report, moderation and export.
- Test student, assigned teacher, unassigned teacher, staff, admin, anonymous user, expired enrolment and revoked access.
- Storage lifecycle tests must use an authorised Test-only staff session and actual Storage API. SQL policy inspection alone is not proof of object upload/playback.
- Browser QA at mobile/tablet/desktop widths, keyboard-only and at least one screen reader.
- Network profiles: fast Wi-Fi, constrained 3G, high latency, mid-upload disconnect, reconnect, offline editing and stale signed URL.
- Run automated unit/integration/E2E tests after implementation; capture actual outcomes. No application tests were run for this design specification.

## 11. Unresolved decisions and dependencies

1. Exact policy for whether a learner's course-visible doubt remains readable after paid-through expiry. Current RLS requires current paid-through access; product owner must decide if historical read-only access is desired before implementation.
2. Whether staff (not assigned teachers) may view/respond/moderate course discussions. Current source paths and policies must be reconciled precisely; do not infer from a UI role label.
3. Whether student questions can be marked resolved by the learner, teacher or both, and what happens when a learner reopens one.
4. Whether attachments to doubts are needed in v1; if yes, define private storage, scanning/validation, size caps and retention first.
5. Private notes storage and sync architecture, including offline editing and cross-device conflict behavior.
6. Retention, export, deletion and abuse-reporting policy for discussions and moderation records.
7. Actual Figma visual design access remains blocked by the previously confirmed Starter-plan MCP call limit. Do not claim this specification creates editable frames.

## 12. Design sign-off checklist

- [ ] Materials, private notes and course-visible doubts are visually distinct.
- [ ] Audience and privacy are explicit before every write action.
- [ ] Every loading, empty, unavailable, offline, denied, expired, revoked and failure state is designed.
- [ ] Resource access remains private and entitlement-aware.
- [ ] Private notes have a separate owner-only data contract.
- [ ] Reporting/moderation has a real audited workflow before the UI advertises it.
- [ ] Mobile, Bangla typography, keyboard, screen reader, contrast and zoom checks pass.
- [ ] Visual direction has been reviewed against the owner's ambition; current first-pass frames are not accepted by default.
- [ ] Owner approves the complete design system and journeys before application programming resumes.

## References

- Open edX learner notes: https://docs.openedx.org/en/latest/learners/SFD_notes.html
- Open edX learner resources: https://docs.openedx.org/en/latest/learners/references/resources_for_learners.html
- Open edX accessibility guidelines: https://docs.openedx.org/en/latest/educators/concepts/accessibility/accessibility_guidelines.html
- Moodle forum configuration: https://docs.moodle.org/25/en/Forum_configuration
- Moodle forum permissions: https://docs.moodle.org/24/en/Adding/editing_a_forum
- Community discussion about low-value/high-volume Canvas posts: https://www.reddit.com/r/college/comments/14an85w/you_know_those_discussion_posts_on_canvas_my/
