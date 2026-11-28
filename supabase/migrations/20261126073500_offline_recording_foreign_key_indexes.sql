-- Cover the new offline-recording foreign keys to keep parent deletes/updates
-- and joins efficient as physical batches and rosters grow.
create index if not exists live_classes_offline_batch_course_fk_idx
  on public.live_classes (offline_batch_id, course_id);

create index if not exists offline_batch_roster_approved_by_fk_idx
  on public.offline_batch_roster (approved_by);

create index if not exists offline_batch_roster_batch_course_fk_idx
  on public.offline_batch_roster (batch_id, course_id);

create index if not exists offline_batch_roster_created_by_fk_idx
  on public.offline_batch_roster (created_by);

create index if not exists offline_batch_roster_revoked_by_fk_idx
  on public.offline_batch_roster (revoked_by);

create index if not exists offline_batch_staff_assigned_by_fk_idx
  on public.offline_batch_staff (assigned_by);

create index if not exists offline_batches_created_by_fk_idx
  on public.offline_batches (created_by);

create index if not exists offline_class_recordings_batch_course_fk_idx
  on public.offline_class_recordings (batch_id, course_id);

create index if not exists offline_class_recordings_created_by_fk_idx
  on public.offline_class_recordings (created_by);

create index if not exists offline_class_recordings_live_class_course_batch_fk_idx
  on public.offline_class_recordings (live_class_id, course_id, batch_id);
