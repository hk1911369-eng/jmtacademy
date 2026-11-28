# JMT Academy — Student Live Class & Recording Experience Design Specification v1

**Status:** Source-grounded design contract; awaiting editable Figma frames, owner review and authenticated learner/device testing.  
**Priority:** Learning Experience OS — student live class and continuity.  
**Visual workspace:** https://www.figma.com/design/ecJJeJe5sfGYRLuCcC5zaz  
**Related contracts:** docs/JMT_APPLICATION_SCREEN_CATALOG_V1.md, docs/JMT_APPLICATION_DESIGN_SYSTEM_V1.md, docs/JMT_SCREEN_DATA_PERMISSION_DESIGN_MATRIX_V1.md, docs/JMT_STUDENT_COURSE_HOME_LESSON_PLAYER_DESIGN_SPEC_V1.md, docs/JMT_OFFLINE_RECORDING_ENTITLEMENT_BENCHMARK_2026-11-23.md.

## 1. Product boundary: three different class experiences

JMT must not make three distinct concepts look like one generic “Watch class” button.

1. **Online live class:** a scheduled synchronous class associated with a course. The current integration stores an HTTPS meeting_url; the learner follows an external meeting link. JMT does not currently prove an embedded conferencing SDK, provider SSO, automatic participant admission, or a native in-app meeting experience.
2. **Ordinary online/recorded-course lesson:** published lesson/video content and generally entitled course resources. Access is governed by the course's online/recorded entitlement and current payment rules, not by a physical classroom roll.
3. **Physical offline missed-class recording:** a separate, private recording associated with a specific physical batch and completed non-cancelled class. Free access is restricted to the active, admitted offline student whose official roll is explicitly approved for that exact batch and whose entitlement period is current and not revoked. A disconnected online learner does not become eligible.

A class may be batch-linked for the physical offline programme, but that link does not mean every student in the course or every online enrollee can see its private recording. The student interface should state which experience is being offered before the learner acts.

## 2. Evidence and benchmark interpretation

### Primary product and operational references

- **Zoom education security guidance:** waiting rooms, participant management, controlled chat/screen-share and not publicly sharing meeting IDs/passcodes. These are provider capabilities and operational recommendations, not proof that JMT currently configures them. https://www.zoom.com/en/industry/education/resources/educator-guide/
- **Open edX learner video player:** documented player controls, captions/transcripts and optional downloads. JMT should expose only capabilities the actual media/provider supports. https://docs.openedx.org/en/latest/learners/SFD_video_player.html
- **University of Maryland online synchronous teaching guidance:** pre-session technical checks, arrival buffer, backup plan, and recording consideration for students affected by connectivity or scheduling. https://tltc.umd.edu/instructors/resources/method-delivery/hosting-online-class-session
- **Indiana University synchronous teaching guidance:** secure rooms, course-specific meeting setup, explicit participation/attendance thinking and class recording practices. https://citl.indiana.edu/teaching-resources/guides/start-synch.html
- **Missouri Online synchronous best practices:** recording notices, accessibility, security settings and a mix of active learning modes. https://teaching.missouri.edu/knowledge-base/community/synchronous-best-practices
- **SMU classroom-recording sharing guidance** is referenced by the existing JMT offline-recording benchmark for privacy and controlled class-member access. https://www.smu.edu/oit/services/classroomtech/recording

These sources are mostly first-party platform or university guidance. They are useful workflow/security references, not independent comparative studies proving better learning outcomes. JMT should benchmark specific controls and recovery behavior, not copy vendor UI or claim superiority without measured task and learning data.

### JMT design decisions

- Keep schedule, class context, teacher/course identity, access state and recovery guidance in JMT before and after an external meeting.
- Never expose meeting IDs/passcodes in public catalogue pages, notifications visible to unrelated users, or unauthenticated HTML.
- Avoid a blank external-link jump. Explain that the meeting opens in another app/tab, offer a preflight checklist and preserve a clear return-to-course path.
- If the meeting provider or link is not configured, show “Online joining details are not available yet” rather than a dead Join button.
- Do not equate a click on Join with attendance. Attendance needs a reliable provider event or an explicitly approved teacher-recorded source; otherwise label it “Join activity” or “Not recorded”.
- Provide a low-bandwidth learner choice: turn off self-camera where provider allows, switch to audio-only where provider supports it, or use published lesson notes/materials while reconnecting. Do not claim JMT can change external meeting settings.
- Recording notice and consent/policy are explicit before a session is recorded. Student-facing screens explain who may access the resulting recording and why; follow the academy's approved privacy/retention policy before publishing.

## 3. Student journey and screen anatomy

### A. Upcoming class card — Student Today and course home

Required fields, only when backed by a source:
- Course title, cohort/programme, class title, teacher name/role if verified.
- Start/end time rendered in Asia/Dhaka, date, and “Starts in…” only when time is reliable.
- Delivery type: online live, physical classroom, or recorded lesson.
- State: scheduled, joining window open (a UI policy, not a database status), live, completed, cancelled, details pending.
- Join eligibility and exact reason if blocked.
- Published class materials and accessible post-class recording state.
- A compact “Prepare” link to connection/audio checklist.

The card should answer: **When is it? Where does it happen? Am I eligible? What can I do now? What happens if my connection fails?**

### B. Class detail / preflight screen

Before launch, show:
1. Course and class identity with Bangladesh-local time and duration.
2. Meeting opens externally and the provider is named only when known from verified configuration.
3. Join action only if authenticated access, class timing and meeting URL pass the server's eligibility checks.
4. Audio/headphone/network checklist with short, dismissible tips.
5. Low-bandwidth suggestion: close other high-bandwidth apps; turn off outgoing camera only if the external provider offers that control.
6. Handout links only if already published and individually authorised.
7. Recording notice and participation/privacy reminder when the session is recorded.
8. “Return to JMT Academy” path and support/help link.

Do not display private join URLs on a public course detail page or embed them in a shareable course card.

### C. Live / joining / reconnecting state

JMT's current code opens the external meeting_url; it does not embed or control the meeting. Therefore design the state around an external handoff:
- “Opening your class…” with a short explanation and a safe cancel/return path.
- If the browser blocks a new tab, provide an accessible retry link only after a user gesture.
- If the external meeting reports a problem, JMT cannot infer the provider's actual state. Show a user-driven “I couldn't join” recovery panel, not a fabricated “connection lost” signal.
- Offer: retry opening meeting; open provider app if installed; view published class materials; return to course; contact support/teacher.
- Never auto-create a second meeting or switch to a different link without verified teacher/admin update.
- If the class start time passes but status remains scheduled, show the time and a neutral “Class status has not updated yet” note; do not invent a live state.
- If class status is live but meeting URL is absent, show a blocking unavailable state with support route.
- If class is cancelled, disable joining and show cancellation details only when published; do not show a recording promise.
- After a learner returns from the meeting, offer “Back to course” and optional self-reported issue/feedback. Do not infer attendance or participation from the return click.

### D. After class

- Show ended/completed status only from a trusted class record/status; a passed end time alone is not equivalent to teacher-confirmed completion.
- Show published resources and lesson follow-up.
- If an ordinary online recording is published, show it only under the ordinary course entitlement and its own privacy/access policy.
- If a physical offline recording is published, use the dedicated private entitlement card (section 5); never merge it into a general course-wide recording list.
- If no recording is published, say “No recording has been published” or “Recording not available” according to the actual state. Never imply that all live classes are recorded.
- If a recording is being prepared, expose that state only if a real processing/publication status exists. The current offline recording metadata model does not document a transcoding/processing queue; do not invent one.

## 4. Schedule and class states

| State | Student wording | Available action |
|---|---|---|
| Scheduled | Scheduled · date and time | View details / prepare |
| Details pending | Joining details not available yet | View class info / contact support |
| Join window | Ready to join | Join class (external) |
| Live (trusted status) | Class is live | Join class |
| Completed | Class ended | Open published follow-up |
| Cancelled | Class cancelled | View published update |
| Time passed, status stale | Status not updated yet | Refresh / contact support |
| Not enrolled | Enrolment required | View course access |
| Payment due | Course access needs renewal | View payment status |
| Offline batch mismatch | This class is not part of your approved physical batch | No recording action; support route |
| Recording not published | No recording is available yet | Revisit course / view materials |
| Entitlement scheduled | Recording access starts on a future date | Show start date; no playback |
| Entitlement expired | Recording access period ended | Contact academy; do not imply automatic extension |
| Entitlement revoked | Access was withdrawn | Contact academy; no playback |
| Recording unavailable | Secure access could not be prepared | Retry once / support |
| Network unavailable | Connection interrupted | Retry / continue with available materials |

Do not derive “Live” solely from starts_at <= now < ends_at. The database status field and provider reality can disagree. Display both carefully when necessary: “Scheduled time is underway; live status has not been confirmed.”

## 5. Physical offline missed-class recording experience

### Student eligibility explanation

Use concise copy on the first relevant screen:

“Free missed-class recordings are for approved physical classroom students only. Your account must have an active offline course enrolment, an approved classroom roll in this batch, and a current access period.”

Explain the difference:
- JMT student code identifies the account.
- Official classroom roll is separately recorded and approved by authorised staff.
- Batch and cohort must match the class recording.
- Internet loss, online enrolment, or a generic “offline” label is not enough.

### Recording card

Display only the minimum necessary:
- Class title snapshot and class date/time.
- Course and physical batch label the learner is authorised to see.
- File name only if helpful; avoid exposing storage path.
- State: available, future start, expired, revoked, unpublished, unavailable.
- “Watch missed-class recording” only when metadata is visible to that learner.
- Short note: “Secure viewing link is created when you open the recording.”

Do not show other students' rolls, roster membership, approval notes, staff-only audit fields or another batch's recording metadata.

### Secure playback

- Student requests a playback URL only after authentication and a server-side read of the recording metadata under their session.
- The private Storage object is not a public URL. Never render storage_path or persist signed URLs in analytics, logs, notifications or shared page data.
- The current server action requests a 900-second signed URL after a metadata row lookup; the actual Storage policy remains the security boundary. Treat the URL as a bearer credential while valid.
- The 60-second upload cache-control setting is not an instant-revocation guarantee and is not proof that CDN edge caches expire in 60 seconds. Existing benchmark/handoff explicitly flags this distinction.
- On entitlement revocation/expiry, clear the currently held URL when the UI learns of denial, request fresh authorization before subsequent playback, and do not promise that a previously issued bearer URL is instantly invalidated. This remains an API/CDN verification gate.
- Provide playback retry for link-request network errors; clear stale URL on failed refresh. Do not loop retries automatically.
- Support browser-native controls and playsInline on mobile. Captions/transcript/download appear only if a real accessible track/resource and permission exist.
- The current implementation uses direct browser video playback; do not promise adaptive bitrate, DRM, offline download, resume synchronization or background playback until implemented and tested.

### Staff publishing workflow

- Staff must be assigned to the exact physical batch and the course; admin can manage the batch.
- Staff choose the completed, non-cancelled class associated with that batch, then upload MP4/WebM/QuickTime up to the current 100 MiB limit.
- Upload to the private bucket first; publish metadata only after successful upload. If metadata outcome is ambiguous, refresh and reconcile before retrying. Do not blindly delete an object after a timed-out metadata insert.
- A class recording is not publishable before the linked class ends. The database trigger validates class/batch identity, class end time and non-cancelled status.
- Show progress, retryable interruption, session expiry, upload failure, metadata failure, ambiguous publication and success. Distinguish “file uploaded” from “recording published.”
- Staff see only their assigned batch operations; the interface must not expose other batch rosters.

## 6. Current source implementation — observed, not a QA claim

### Live class model and scheduling

The repository's supabase/migrations/0011_academic_operations.sql defines live_classes with:
- course_id, title, description, starts_at, ends_at
- optional HTTPS meeting_url and recording_url
- status constrained to scheduled/live/completed/cancelled
- creator and timestamps

The offline-recording feature adds offline_batch_id to associate a class with a specific physical batch. It does not replace the normal course-level live-class model.

### Current UI and actions on PR #73's feature head

- app/academic/page.tsx schedules classes with course, optional physical batch, title, start/end time and meeting URL. It renders class cards, external Join links, general recording_url links, and an offline-recording upload action for eligible staff after the scheduled end time. Students see a separate “Missed-class recordings” list.
- app/actions/academic.ts parses Bangladesh-local date/time and creates a live_classes row. For a supplied offline batch it checks that the batch belongs to the selected course; the database trigger/policies are the additional authorization boundary.
- app/actions/offline-academy.ts provides admin batch creation/staff assignment, staff roll approval/revocation, and a signed-URL action. The signed-URL action looks up the recording row using the authenticated session, then requests a 900-second URL.
- app/offline-operations/page.tsx provides physical batch roster management and shows approved/active/expired/scheduled/revoked states.
- components/offline-class-recording-upload.tsx uploads a file to the private bucket and inserts metadata after upload; includes 100 MiB/type validation and ambiguous-network handling.
- components/offline-recording-access.tsx requests a signed URL on demand and plays the video with browser-native controls.
- supabase/migrations/20261123163858_offline_recording_entitlements.sql creates physical batches, staff assignments, approved/revocable roster, class association, private recording metadata, audit triggers, entitlement predicates and RLS/Storage policies.

### Important current implementation gaps / design risks to resolve before programming

1. The current academic page renders an external Join link whenever meeting_url exists. Design acceptance requires server-side join eligibility/time checks and private link disclosure to be verified; a visible link alone does not prove the class is currently joinable.
2. The student academic page reads active course enrolments and live classes, but the visible page code does not itself show the same paid-through check used by /learn/[courseId]. Confirm whether database RLS and surrounding route authorization adequately protect meeting details; do not assume active enrolment is equivalent to paid access.
3. The legacy recording_url is a separate HTTPS field from private offline_class_recordings. Its privacy, publication and authorization behavior must be audited before any design presents it as equivalent or safe.
4. The current class creation action accepts an optional offline batch and checks course match; database trigger and policies provide further restrictions. Verify exact assigned-staff/admin scope in hosted RLS and actions before designing editable controls.
5. Current offline recording access action performs a metadata lookup then asks Storage for a signed URL. Its security depends on the row RLS predicate and object Storage SELECT policy both being correct. Source code review is not API-level proof.
6. Existing live_classes.status supports four values, but no student-facing trusted provider connection state is stored. A learner's external provider connection state cannot be inferred by JMT.
7. Current offline_class_recordings.expires_at exists in the schema; show expiry only when it is populated and enforced by the access predicate.
8. Existing offline recording benchmark and handoff say the Test bucket had zero objects/metadata at the last verified read, and actual upload/download/Range/signed expiry/cache/revocation flows remain unverified. Recheck before any release decision; do not represent old hosted counts as current.

## 7. Measurable acceptance criteria

### Student task success

- At least 90% of 10 representative learners correctly identify class time, delivery mode, eligibility and next action within 10 seconds in moderated testing.
- At least 90% can recover from a blocked external link by finding the retry/help/materials route without staff instruction.
- 0 cases in moderated tests where a learner mistakes a physical-offline recording entitlement for ordinary internet-offline access.

### Security and privacy

- 0 unauthorized meeting-link disclosures in public pages, unauthorised student sessions, notifications or page source.
- 0 private offline recording metadata or object reads for wrong student, wrong course, wrong batch, online-only enrolment, inactive/expired/revoked roster, inactive account, inactive batch, unpublished/archived course or expired entitlement.
- 0 recording publication before linked class end or for cancelled/mismatched class.
- 100% of roster approval/revocation and recording publication/deletion actions have auditable actor, subject, batch/class and timestamp.
- 0 student UI exposure of storage paths, staff roster, private audit fields or other students' attendance.
- Signed URL TTL and CDN/browser cache behavior are verified independently; no claim of instant revocation from 60-second browser cache-control.

### Reliability and accessibility

- Test external meeting handoff, blocked pop-up, no meeting URL, cancelled class, stale status, slow connection, network loss/reconnect, provider app unavailable, session expiry and return navigation.
- On 360×800 and 390×844, no horizontal overflow; primary join/play/retry targets are at least 44×44 px.
- All controls are keyboard reachable with visible focus; status is not communicated by colour alone; meaningful state changes are announced without repetitive screen-reader chatter.
- Bangla and English class titles, dates and time labels wrap without clipping; all time labels are explicitly Bangladesh time.
- Reduced-motion preference is respected; no autoplay of live or recorded media.
- Recording player errors clear stale signed URLs and provide a manual retry. No automatic infinite retry.

### Operational quality

- Assigned staff can find the right batch/class and understand whether upload succeeded versus publication succeeded in a moderated task; target under 90 seconds after locating the class.
- Wrong-batch staff cannot publish; a duplicate upload/ambiguous metadata result is safely reconciled without orphan deletion of a possibly published object.
- All acceptance tests must run against synthetic Test identities and private synthetic media. Production data and real learner recordings are excluded.

## 8. Required screen set and responsive deliverables

1. Student Today upcoming/live class card — desktop, mobile.
2. Course home class schedule/list — desktop, mobile.
3. Class detail/preflight — desktop, mobile.
4. External meeting handoff/return/recovery panel — mobile-first.
5. Class ended/follow-up/resources — desktop, mobile.
6. Ordinary online recording card/player — only after its entitlement contract is confirmed.
7. Physical offline missed-class recording list/card/player — desktop, mobile, with eligible and denied states.
8. Staff live-class scheduling and batch association — desktop, mobile.
9. Staff post-class recording upload/publish — desktop, mobile.
10. Offline roster approval/revocation context — link to existing operations screen; do not duplicate the admin roster editor inside student screens.
11. Shared loading, empty, error, network loss, retry, cancelled, permission-denied, expired, revoked and unavailable states.
12. Light and Dark tokens, 360×800, 390×844, 768×1024 and 1440×900 review.

## 9. Decisions still requiring evidence or owner approval

- Which external meeting provider(s) are officially supported and how provider identity is configured.
- The join window policy (how early the Join button becomes available); do not invent a policy in code.
- Whether normal online live classes should have a general course recording and its exact student entitlement/retention rules.
- Whether class recordings may include identifiable student audio/video and what notice/consent/retention policy applies.
- Whether a student may report an attendance correction and which evidence source is authoritative.
- Whether recording expiry is always indefinite or populated per course/batch.
- Whether JMT will eventually integrate an embedded provider SDK; current implementation is external-link handoff only.

**Non-goals:** this design does not create a meeting SDK, attendance integration, automatic recording/transcoding, automatic notification, downloadable/offline video feature, route changes, database changes or new entitlements. No programming should resume until the entire application design is complete and the owner approves the visual direction.
