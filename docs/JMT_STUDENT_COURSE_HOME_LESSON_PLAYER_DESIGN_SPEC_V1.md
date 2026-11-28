# JMT Academy — Student Course Home & Lesson Player Design Specification v1

**Status:** Screen-level design specification; awaiting editable Figma frames, owner visual review and learner testing.  
**Scope:** Public course detail → authenticated course home/content outline → lesson player/resource/discussion flow.  
**Parent documents:** `docs/JMT_APPLICATION_SCREEN_CATALOG_V1.md`, `docs/JMT_APPLICATION_DESIGN_SYSTEM_V1.md`, `docs/JMT_SCREEN_DATA_PERMISSION_DESIGN_MATRIX_V1.md`, `docs/JMT_STUDENT_TODAY_COURSE_LIBRARY_DESIGN_SPEC_V1.md`.  
**Visual workspace:** https://www.figma.com/design/ecJJeJe5sfGYRLuCcC5zaz

## 1. Product decision

Keep three distinct mental models:

1. **Public course detail** answers “Is this the right course and format for me?” It is discoverable without enrollment and shows only published, public facts.
2. **Course home** answers “What is inside my enrolled course, what is next, and what can I access now?” It is authenticated and entitlement-aware.
3. **Lesson player** answers “Help me learn this one lesson with minimal distraction, preserve my place, and make related materials/doubts easy to reach.”

Do not collapse these into one giant page. The current repository uses `/courses/[slug]` for public details and `/learn/[courseId]` for the authenticated course-learning experience. A distinct course-home/player route split is a design proposal, not an existing route or implementation commitment. Before programming, map the final information architecture to existing route contracts and obtain owner approval for any route changes.

## 2. Evidence and benchmark interpretation

- **Open edX mobile course-content redesign (community design proposal, updated 28 Oct 2025):** separates a course-home hub (“what’s next”) from a Content view with All, Videos and Assignments. Useful evidence that a full outline can overwhelm a course-home hub; it is a community proposal, not proof of measured learning improvement. https://openedx.atlassian.net/wiki/spaces/COMM/pages/4602429441/Course+Content+View+Mobile
- **Open edX learner video-player documentation:** supports familiar playback controls, captions, transcript, language selection, optional downloads and handouts. These are capability references, not all guaranteed for every media item. https://docs.openedx.org/en/latest/learners/SFD_video_player.html
- **Open edX mobile design guidance:** concise, distinct component names matter on narrow screens; avoid unnecessary iframes and test complex course content on real devices. https://docs.openedx.org/en/latest/educators/concepts/accessibility/design_for_mobile.html
- **Moodle mobile documentation:** course browsing, progress, notifications, quizzes, forums and offline features depend on site configuration and supported activity types. Do not promise full offline parity merely because a mobile platform advertises offline support. https://docs.moodle.org/401/en/Mobile_app
- **Coursera learner guidance:** video and transcript downloads are separate learner actions; subtitles/transcripts may have language limitations. JMT should not imply downloads exist unless rights, entitlement, format and device support are confirmed. https://www.coursera.support/s/article/learner-000001476?language=en_US

The sources are primarily first-party product documentation or a community design proposal. They do not establish comparative learning outcomes or prove JMT superiority. The JMT differentiation is the explicit Bangladesh cohort/fee/access model, honest entitlement states, lesson continuity and low-bandwidth responsive flow.

## 3. Public course detail — `/courses/[slug]`

### Desktop 1440 layout

1. Compact public header: JMT Academy brand, course catalogue, help/contact.
2. Course identity: published programme/cohort, course title, subjects, concise description and approved cover.
3. Course facts: verified teaching method, published schedule, verified teachers, delivery modes and published availability. Omit unknown fields instead of fabricating them.
4. Format comparison: Live + recordings, Recorded-only, Offline academy. Explain teacher interaction and access differences in plain language.
5. Fee breakdown: monthly course fee per format and one-time admission fee, with BDT units and clear “contact us” only when no published amount exists. Do not imply online gateway payment.
6. Course contents preview: syllabus/chapters only if actually published for public preview; otherwise show a neutral “outline shared after admission” message only if that is an approved policy.
7. Teaching team: public RPC-provided names only; never invent teacher biographies, credentials or ratings.
8. Primary CTA: “Apply for this format” when enrolment is open; otherwise disabled/closed state plus safe contact route.

### Mobile 360/390 layout

- One-column sequence; no side-by-side fee cards narrower than readable text.
- Sticky bottom CTA only when it does not cover content or accessibility controls.
- Format choice is an explicit selection, not an auto-selected default.
- Long Bangla/English course titles wrap without clipping.
- No auto-playing media or oversized hero that pushes fees and format choice far below the fold.

### Public states

- Published and open; published but enrolment closed; unavailable/unpublished (do not disclose draft existence); missing teacher facts; no cover image; fee unavailable; schedule unannounced; network failure.
- The “course not found” state must not reveal whether an unpublished/private course exists.

## 4. Authenticated course home — proposed learner hub

### Above-the-fold hierarchy

1. Back to Courses + course title + cohort/programme context.
2. Access status: active, pending, payment due, expired, or staff preview. Use server-confirmed state and explain what it means.
3. One Continue/Start card: most recently accessed entitled lesson and verified resume checkpoint. If no checkpoint, say “Start course”; never manufacture a resume position.
4. Course progress summary only from published lesson count and the learner’s own completion records. If either source fails, show unavailable rather than 0%.
5. “Next up” preview: next published, accessible lesson or scheduled live session. Show source/time and timezone Asia/Dhaka.
6. Content navigation: **All content**, **Videos**, **Assignments** only when each view has matching published content. Keep the full course outline in the All-content view, not as an endless first-screen wall.

### Course outline

- Ordered chapters/sections with concise, distinguishable titles and lesson counts.
- Each lesson row: title, content type, duration only when known, completion/resume state, and lock reason when inaccessible.
- Distinguish published, scheduled/not-yet-available, completed, in progress and unavailable.
- Search filters only content the current learner may discover. No results and source failure must look different.
- Keep chapter expansion state stable during refresh/search where feasible.
- Show resource/assessment indicators only when those resources/assessments actually exist.

### Access rules

- Student access requires active enrollment, paid admission and current billing entitlement as enforced by the server. UI is informational, never an authorization boundary.
- Staff preview is visibly labelled and must not masquerade as a student entitlement.
- Physical offline recording access is separate from generic course access and must require approved physical batch, approved roll and active entitlement period. Internet loss alone grants nothing.
- Never show another student's progress, discussion drafts, notes or payment state.

## 5. Lesson player

### Desktop layout

- Main column: breadcrumb/course context, lesson title, media or text lesson content, progress/save state, lesson actions.
- Secondary column: collapsible course outline with current lesson highlighted and next/previous navigation.
- Below/adjacent tabs: Overview, Resources, Discussion, My Notes. Tabs must preserve the current lesson and be keyboard accessible.
- Player controls: play/pause, timeline, volume, captions only when available, speed control only when supported, fullscreen, and explicit playback error/retry. Do not draw fake controls for capabilities the media source lacks.
- Transcript panel appears only when a real transcript exists; timestamp links seek only when supported.
- Do not add a download button unless the resource is explicitly downloadable and the user is entitled.

### Mobile layout

- Media/text first, full-width within safe margins; no persistent desktop sidebar.
- Course outline opens as a labelled drawer/sheet and returns focus to its trigger when closed.
- Primary actions have at least 44×44 px targets; avoid dense icon-only controls.
- Resources, discussion and notes appear below lesson content as clear sections or accessible tabs; avoid horizontal tab overflow.
- Next/previous lesson controls remain visible without obscuring video controls or browser safe areas.
- Respect portrait orientation and Android browser back behaviour.

### Playback and continuity states

- Initial load / metadata loading; playable; buffering; paused; ended; unsupported media; network lost; reconnecting; source unavailable; access expired/revoked; checkpoint saving; checkpoint saved; checkpoint save failed.
- Preserve the last server-confirmed checkpoint. If local progress is pending sync, label it as pending and do not claim server save.
- On reconnect, reconcile progress without silently moving the learner backwards or overwriting a newer server checkpoint.
- Expired/revoked access clears stale protected media URLs and does not repeatedly retry an authorization failure.
- Avoid autoplay by default; honor reduced motion and user playback preference where possible.

## 6. Resources, doubts and notes

- Resource row displays verified filename, resource type, size, caption and explicit preview/download availability.
- A download action is shown only when server authorization and `downloadable` metadata permit it. Storage paths and signed URLs are never rendered as public links.
- Distinguish preview failure, unsupported file type, file too large, offline, expired access and server denial.
- Discussion is course/lesson scoped. Clearly label teacher/staff identity only from verified role data. Report/moderation states must not expose private moderation notes.
- Personal notes are private to the learner unless an explicit share action is designed and approved. Never imply a private note is visible to teachers or peers.
- Draft/saved/sync-pending states must be explicit; preserve text through recoverable network errors where the existing implementation supports it.

## 7. Source-grounded constraints from current repository

Observed in the docs branch:
- Public course detail is implemented at `app/courses/[slug]/page.tsx`. It queries published, non-archived course facts; delivery modes/prices/admission fee; schedule/teaching method; public teacher RPC; and public course media. Existing UI includes course formats, fee, teaching team and apply CTA.
- Authenticated learning is implemented at `app/learn/[courseId]/page.tsx`. It checks user identity, role, enrollment status, admission fee and current paid-through period; loads published lessons, own progress/bookmarks, chapters, resources and discussions; and renders video, resources, bookmarks, completion and discussion actions.
- The current learning route combines course overview, progress metrics, search, lesson content, video, resources and discussion. This is a valid starting implementation reference, not evidence that a dedicated course-home route or separate lesson-player route exists.
- Existing route code has a potential design concern: course progress is currently rendered from loaded lesson/progress counts. A future design should communicate unavailable/partial data distinctly and avoid interpreting incomplete sources as 0%.
- The course-detail route uses public course information. It must not be reused as the authenticated entitlement screen.

These observations are source inspection only. They do not prove every RLS policy, action, Storage request or browser state is correct. The screen/data/permission matrix remains the governing contract.

## 8. Measurable acceptance criteria

- A learner can identify current access mode, next lesson and course-outline entry within 5 seconds in a moderated task; target at least 90% task success across 10 representative learners before claiming usability acceptance.
- On 360 px and 390 px viewports, no horizontal page overflow; course titles, Bangla text, prices and action labels remain readable at 200% text zoom.
- No protected media URL or Storage path appears in page markup, client logs or analytics payloads.
- Every denied/expired/revoked protected-content request fails closed and clears stale playback state.
- Resume checkpoint shown as saved only after server confirmation; pending sync is visually distinct.
- Loading, true-empty, partial/unavailable, network loss, buffering, unsupported media, expired access, revoked access and retry states are represented in the design.
- Keyboard-only navigation reaches all player controls, outline rows, tabs, resource actions and discussion controls with visible focus; focus is restored after drawer close.
- Screen-reader announcements are limited to meaningful state changes; no repeated live-region chatter during playback.
- Captions/transcript/download controls appear only when the corresponding source capability and entitlement exist.
- Staff/student scope, private notes and physical-offline recording entitlement are visibly distinct.
- Verify at 360×800, 390×844, 768×1024 and 1440×900; test low-end Android, slow 3G simulation, offline transition, reconnect and browser back.

## 9. Explicit non-goals and unresolved decisions

- This specification does not add routes, change application source, alter fees, grant entitlements, enable video downloads or promise full offline playback.
- Route split between course home and lesson player remains a design proposal; map it against actual route complexity before implementation.
- Whether public syllabus preview is allowed, which video provider capabilities are available, transcript language coverage, and any media download rights require owner/content-policy confirmation.
- Figma frame construction and owner visual approval remain outstanding.
