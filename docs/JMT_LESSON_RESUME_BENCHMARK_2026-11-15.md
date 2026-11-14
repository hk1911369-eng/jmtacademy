# JMT Continue Where You Stopped — Benchmark & Security Design

**Feature ID:** LXP-RESUME-LESSON-001  
**Strategic pillar:** Priority 1 — JMT Learning Experience OS  
**Related signature pillar:** Personal Academic Command Centre (#3) and Live Classes & Complete Learning Archive (#8)  
**Date:** 15 November 2026  
**Implementation branch:** `feat/student-resume-progress` (stacked on PR #66)

## 1. Student problem

A student may stop a recorded lesson because of a call, app switch, browser refresh, network interruption or device change. Requiring the student to search for the lesson and manually find the last position creates avoidable friction and makes the learning journey feel unreliable.

The desired experience is: **open the same lesson and safely continue close to the last position saved to the student's JMT account.** It must not autoplay, falsely mark the lesson complete, change mastery, or grant access to content.

## 2. Current JMT baseline verified on main

- `app/learn/[courseId]/page.tsx` renders a native HTML `video` element with browser controls.
- `lesson_progress` in `0007_learning_content_and_teacher_scope.sql` stores completion status, completion timestamp and update timestamp only. It has no playback position.
- Existing `markLessonComplete` records verified lesson completion and a `lesson_completed` learning event. Playback position must remain separate from this academic evidence.
- The current learning page checks authenticated user, role, active enrollment, admission fee and current Bangladesh billing-month payment before rendering student lessons.
- There was no saved per-student/per-lesson playback checkpoint table or reliable resume behavior on main.

## 3. Benchmark sources and evidence quality

| Reference | Observed pattern / evidence | JMT adaptation | Limitations |
|---|---|---|---|
| [Edrolo student homepage release](https://edrolo.com.au/blog-posts/term-4-2026-system-release) | First-party product description: resume the most recent meaningful learning point, prioritising question responses and otherwise the last watched video timestamp. Its task list includes items due within seven days and up to seven days overdue. | Resume the latest meaningful saved lesson point; keep due tasks and resume distinct; give a sensible first-use path. | Vendor-authored feature description. It does not disclose the complete data/security implementation or independently establish learning gains. |
| [Duolingo lesson UX case study](https://kylaharrod.com/work/duolingo) | Independent student UX project, not affiliated with Duolingo. The team reports heuristic review, 9 moderated new-user tests and 6 unmoderated tests of its redesign; it reports a 57% usability improvement. | Treat progress continuity and user control as core lesson-flow UX; test actual tasks rather than relying on visual taste. | Student portfolio case study; small sample, author-reported metric and no controlled causal evidence. It is not a statement about Duolingo's internal implementation. |
| [MDN: HTMLMediaElement.currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime) | The browser exposes current playback time in seconds; assigning `currentTime` seeks the media. The value is approximate and depends on media/browser behavior. | Restore only after media metadata is available; validate saved position against known duration; treat seek as best-effort. | Browser media behavior varies; a saved timestamp does not guarantee all media sources are seekable. |
| [MDN: timeupdate event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event) | Event frequency varies with system load and may be 4–66Hz. | Never write to the database on every `timeupdate`; throttle to meaningful position changes. | Event frequency is not a persistence guarantee. |
| [MDN: visibilitychange](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) and [sendBeacon](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) | Hidden is the last reliably observable page lifecycle state; `sendBeacon` queues a small asynchronous POST without blocking navigation. | Send a final best-effort checkpoint on hidden; use periodic saves and pause/seek saves as the primary safety net. | Beacon is queued, not an acknowledged database commit; keep a recent periodic checkpoint. |
| [Supabase Database Functions](https://supabase.com/docs/guides/database/functions) and [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) | Database functions can perform atomic data operations; grants and RLS policies are separate controls. Security-definer functions require deliberate privilege and search-path handling. | Put all checkpoint writes behind one authenticated database RPC; grant only own-row SELECT to clients; revoke direct writes. | Static migration tests do not replace execution against the real Postgres schema. |
| [Next.js data security](https://nextjs.org/docs/app/guides/data-security) and [use server](https://nextjs.org/docs/app/api-reference/directives/use-server) | Server Actions are reachable as endpoints and must validate authentication, authorization and client-supplied input. | Revalidate identity and input server-side; use the same guarded database function for Server Action and same-origin beacon route. | Next.js protections do not replace database authorization. |

## 4. Original JMT design and security decisions

1. **Separate playback from completion.** New `lesson_playback_progress` rows contain only student, lesson, approximate position, optional duration and timestamps. They do not write `lesson_progress`, mastery, scores or `learning_events`.
2. **No client write privilege.** Enable RLS, revoke all table privileges from `anon`, `authenticated` and `PUBLIC`, then grant authenticated SELECT only. RLS allows only the student's own checkpoint while the lesson is published and the student has an active, paid entitlement through the current Asia/Dhaka billing-month end.
3. **One guarded RPC.** The public `save_lesson_playback_checkpoint` endpoint is a SECURITY INVOKER wrapper; its SECURITY DEFINER implementation lives in a non-exposed `private` schema. It derives identity from `auth.uid()`; accepts no student ID or course ID; checks an active student profile, published lesson, active enrollment, admission fee, current `paid_through`, numeric bounds and already-completed status. A boolean return distinguishes a saved checkpoint from a server-throttled update; the client retries a deferred write after the two-second window.
4. **Completion cleanup.** A database trigger deletes the checkpoint when a lesson is completed. Resume state cannot masquerade as completion and does not survive a verified completion.
5. **Resilient client player.** Restore after `loadedmetadata`; save after meaningful progress changes (15 seconds), on pause and seek; queue a same-origin `sendBeacon` on `visibilitychange=hidden`; use a keepalive fetch fallback if the beacon cannot be queued. Do not block video playback on save errors.
6. **Student Today continuation.** Show the latest checkpoint from a currently eligible paid course and a published, incomplete lesson. If there is no urgent due action, the primary next action becomes Continue; if there is urgent work, show Continue as a secondary card.
7. **No autoplay.** The student deliberately presses Play. If the saved position is within five seconds of the end, start from the beginning rather than leaving the player stranded at EOF.
8. **Privacy and data minimisation.** No device fingerprint, IP address, raw media URL, watch analytics or client-provided identity is stored. Dashboard only considers the last 180 days. Offline/local persistence is not promised; if the network is lost, the last server-saved point remains and may be up to one save interval behind.

## 5. Acceptance criteria

- Only authenticated student accounts can write a checkpoint; role and entitlement are rechecked in Postgres, not trusted from the UI.
- Student A cannot read or write Student B's checkpoint, even by changing a lesson ID or posting directly to the RPC/route.
- A student cannot save for an inactive student profile, unpublished lesson, inactive/expired/unpaid course or a lesson in another course.
- Direct INSERT/UPDATE/DELETE against the checkpoint table is denied to anon and authenticated roles.
- Checkpoint values are integer seconds in the supported 0–86,400 range; duration may be unknown; position cannot exceed known duration by more than three seconds.
- Checkpoint saves never mark a lesson complete, advance goals, change mastery or create a learning event.
- Completion removes the checkpoint.
- Video restore waits for metadata and does not autoplay. If the saved point cannot be sought or is at EOF, playback falls back safely.
- Client saves are throttled; failures do not interrupt playback and the UI reports a recoverable save issue.
- Pause, seek, app/tab switch, refresh, same-account second device and completed-lesson cases are covered in tests or manual test plan.
- Student Today only shows current eligible paid, published, incomplete lesson checkpoints; expired/unpaid or completed lessons are not shown.
- No production migration is run as part of code review. The JMT Test migration and PostgreSQL RLS/RPC isolation test must pass before merge/release.

## 6. Verification plan and current limitations

- Automated tests cover SQL guardrails, table grants/RLS, action/route validation, player save/restore hooks and dashboard continuation wiring.
- CI must pass full test, lint, typecheck, production build and dependency audit on the exact PR head.
- **JMT Test** (project `cullxqklmbdiosibgois`, ap-south-1) was verified as the separate test project; its migration history was inspected before applying this migration. No production project was changed.
- The test migration succeeded and was recorded as `20261114185830 / secure_lesson_playback_resume_checkpoints`. Read-back SQL confirmed the checkpoint table, RLS, own-entitled-row policy, completion trigger, private SECURITY DEFINER implementation, public SECURITY INVOKER wrapper, anon denial, authenticated SELECT/EXECUTE, and no authenticated direct INSERT/UPDATE.
- A transaction-scoped PostgreSQL test used two synthetic students, a synthetic admin, one published course/lesson and current paid enrollments. Both students saved successfully; A saw one row; B saw zero A rows before saving and then saw only B's row; completing A's lesson deleted only A's checkpoint. The transaction rolled back and no synthetic test records were retained.
- Supabase security advisors reported no checkpoint-specific warning. Existing unrelated warnings remain for other public SECURITY DEFINER functions, two RLS-enabled rate-limit tables without policies, and disabled leaked-password protection.
- GitHub Actions has zero runs/check-runs for the current PR head. All repository workflows filter PRs to target `main`, but PR #67 targets `feat/student-today-next-action`; therefore Node tests, TypeScript, ESLint, production build and dependency audit are still unverified on this exact head.
- Android/mobile browser, network-throttling and human student usability tests remain mandatory. Full screenshot-based Product Design audit is not available in this standard chat environment; no visual or real-device verification is claimed.

## 7. Explicit boundaries

- This checkpoint does not grant lesson/media access. The existing lesson page's course-entitlement gate remains authoritative.
- The separate offline-academy rule (authorised offline roll-number roster and recording entitlement) remains a project security task; this migration does not implement or waive it.
- The save function uses the current paid-enrollment rule already used by the student lesson page. Any future change to course entitlements must update both the page access gate and this RPC together.
- No automatic payment integration, deployment, production data mutation or migration execution is included.
