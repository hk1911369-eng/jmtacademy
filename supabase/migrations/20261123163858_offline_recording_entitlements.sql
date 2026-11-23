-- Secure physical-offline cohort rosters and time-bounded missed-class recordings.
-- delivery_mode='offline' alone is never sufficient for this free benefit.

create schema if not exists private;
grant usage on schema private to authenticated, service_role;

create table public.offline_batches (
 id uuid primary key default gen_random_uuid(),
 course_id uuid not null references public.courses(id) on delete restrict,
 batch_name text not null check (length(btrim(batch_name)) between 2 and 120),
 cohort_label text not null check (length(btrim(cohort_label)) between 2 and 120),
 is_active boolean not null default true,
 created_by uuid not null references public.profiles(id) on delete restrict,
 created_at timestamptz not null default now(),
 unique (id, course_id)
);
create unique index offline_batches_course_name_uidx on public.offline_batches(course_id, lower(btrim(batch_name)));
create index offline_batches_course_active_idx on public.offline_batches(course_id, is_active);

create table public.offline_batch_staff (
 id uuid primary key default gen_random_uuid(),
 batch_id uuid not null references public.offline_batches(id) on delete restrict,
 staff_id uuid not null references public.profiles(id) on delete restrict,
 assigned_by uuid not null references public.profiles(id) on delete restrict,
 created_at timestamptz not null default now(),
 unique (batch_id, staff_id)
);
create index offline_batch_staff_staff_idx on public.offline_batch_staff(staff_id, batch_id);

create table public.offline_batch_roster (
 id uuid primary key default gen_random_uuid(),
 batch_id uuid not null,
 course_id uuid not null,
 student_id uuid not null references public.profiles(id) on delete restrict,
 roll_number text not null check (length(btrim(roll_number)) between 1 and 40),
 status text not null default 'approved' check (status in ('approved','revoked')),
 starts_at timestamptz not null default now(),
 ends_at timestamptz not null,
 approved_by uuid not null references public.profiles(id) on delete restrict,
 approved_at timestamptz not null default now(),
 revoked_by uuid references public.profiles(id) on delete restrict,
 revoked_at timestamptz,
 created_by uuid not null references public.profiles(id) on delete restrict,
 created_at timestamptz not null default now(),
 foreign key (batch_id, course_id) references public.offline_batches(id, course_id) on delete restrict,
 check (ends_at > starts_at),
 check ((status='approved' and revoked_by is null and revoked_at is null) or
        (status='revoked' and revoked_by is not null and revoked_at is not null))
);
create unique index offline_roster_course_student_active_uidx on public.offline_batch_roster(course_id, student_id) where status='approved';
create unique index offline_roster_batch_roll_active_uidx on public.offline_batch_roster(batch_id, lower(btrim(roll_number))) where status='approved';
create index offline_roster_student_period_idx on public.offline_batch_roster(student_id, starts_at, ends_at) where status='approved';
create index offline_roster_batch_status_idx on public.offline_batch_roster(batch_id, status, ends_at);

alter table public.live_classes add column offline_batch_id uuid;
alter table public.live_classes
 add constraint live_classes_id_course_batch_uidx unique (id, course_id, offline_batch_id),
 add constraint live_classes_offline_batch_course_fkey
 foreign key (offline_batch_id, course_id) references public.offline_batches(id, course_id) on delete restrict;
create index live_classes_offline_batch_idx on public.live_classes(offline_batch_id, starts_at desc) where offline_batch_id is not null;

create table public.offline_class_recordings (
 id uuid primary key default gen_random_uuid(),
 live_class_id uuid not null unique,
 batch_id uuid not null,
 course_id uuid not null,
 title_snapshot text not null check (length(btrim(title_snapshot)) between 2 and 180),
 class_started_at timestamptz not null,
 storage_path text not null unique,
 file_name text not null check (length(btrim(file_name)) between 1 and 180),
 mime_type text not null check (mime_type in ('video/mp4','video/webm','video/quicktime')),
 file_size bigint not null check (file_size between 1 and 104857600),
 published_at timestamptz not null default now(),
 expires_at timestamptz,
 created_by uuid not null references public.profiles(id) on delete restrict,
 created_at timestamptz not null default now(),
 foreign key (batch_id, course_id) references public.offline_batches(id, course_id) on delete restrict,
 foreign key (live_class_id, course_id, batch_id) references public.live_classes(id, course_id, offline_batch_id) on delete restrict,
 check (expires_at is null or expires_at > published_at),
 check (storage_path ~ '^[0-9a-fA-F-]{36}/[0-9a-fA-F-]{36}/[A-Za-z0-9._-]{1,180}$')
);
create index offline_recordings_batch_published_idx on public.offline_class_recordings(batch_id, published_at desc);
create index offline_recordings_course_date_idx on public.offline_class_recordings(course_id, class_started_at desc);

create or replace function private.can_manage_offline_batch(p_batch_id uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
 select auth.uid() is not null and exists (
  select 1 from public.profiles p
  where p.id=auth.uid() and p.is_active is true
   and (p.role::text='admin' or
    (p.role::text in ('teacher','staff') and exists (
      select 1 from public.offline_batch_staff s
      join public.offline_batches b on b.id=s.batch_id
      join public.courses c on c.id=b.course_id
      join public.course_assignments a on a.course_id=b.course_id and a.teacher_id=p.id
      where s.batch_id=p_batch_id and s.staff_id=p.id and b.is_active is true
        and c.is_published is true and c.archived_at is null
    )))
 );
$$;

create or replace function private.has_active_offline_recording_entitlement(p_course_id uuid,p_batch_id uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
 select auth.uid() is not null and exists (
  select 1 from public.profiles p
  join public.enrollments e on e.student_id=p.id
  join public.offline_batches b on b.id=p_batch_id and b.course_id=e.course_id
  join public.courses c on c.id=b.course_id
  join public.offline_batch_roster r on r.batch_id=b.id and r.course_id=b.course_id and r.student_id=p.id
  where p.id=auth.uid() and p.role::text='student' and p.is_active is true
   and e.course_id=p_course_id and e.status='active' and e.delivery_mode='offline' and e.admission_fee_paid is true
   and (e.starts_at is null or e.starts_at<=now()) and (e.ends_at is null or e.ends_at>now())
   and b.is_active is true and c.is_published is true and c.archived_at is null
   and c.delivery_modes @> array['offline']::text[] and r.status='approved' and r.starts_at<=now() and r.ends_at>now() and r.revoked_at is null
 );
$$;

create or replace function private.prepare_offline_batch()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare v_programme_group text;
begin
 select c.programme_group into v_programme_group
 from public.courses c
 where c.id=new.course_id and c.archived_at is null and c.is_published is true and c.delivery_modes @> array['offline']::text[];
 if not found then raise exception 'An active published course with offline delivery must be selected' using errcode='23514'; end if;
 if nullif(btrim(v_programme_group),'') is null then
  raise exception 'Set the course programme group before creating a physical batch' using errcode='23514';
 end if;
 if tg_op='INSERT' then
  new.cohort_label:=btrim(v_programme_group);
 elsif new.course_id is distinct from old.course_id or new.cohort_label is distinct from old.cohort_label then
  raise exception 'Offline batch course and cohort identity are immutable' using errcode='23514';
 end if;
 return new;
end;
$$;

create or replace function private.validate_offline_batch_staff()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare v_course_id uuid;
begin
 select b.course_id into v_course_id from public.offline_batches b
 join public.courses c on c.id=b.course_id
 where b.id=new.batch_id and b.is_active is true and c.is_published is true and c.archived_at is null;
 if not found then raise exception 'Active offline batch not found' using errcode='23503'; end if;
 if not exists (select 1 from public.profiles p where p.id=new.staff_id and p.is_active is true and p.role::text in ('teacher','staff')) then
  raise exception 'Only active teacher or staff accounts can be assigned' using errcode='23514';
 end if;
 if not exists (select 1 from public.course_assignments a where a.course_id=v_course_id and a.teacher_id=new.staff_id) then
  raise exception 'Staff must already be assigned to this course' using errcode='23514';
 end if;
 if new.assigned_by is distinct from auth.uid() then raise exception 'Assignment actor must be the current administrator' using errcode='42501'; end if;
 return new;
end;
$$;

create or replace function private.guard_offline_roster()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare v_batch_active boolean;
begin
 if tg_op='INSERT' then
  if new.status<>'approved' or new.approved_by is distinct from auth.uid() or new.created_by is distinct from auth.uid()
    or new.approved_at is null or new.revoked_by is not null or new.revoked_at is not null then
   raise exception 'Roster entries must be explicitly approved by the current staff member' using errcode='42501';
  end if;
  select b.is_active into v_batch_active
  from public.offline_batches b join public.courses c on c.id=b.course_id
  where b.id=new.batch_id and b.course_id=new.course_id
    and c.is_published is true and c.archived_at is null
    and c.delivery_modes @> array['offline']::text[];
  if v_batch_active is distinct from true then raise exception 'Offline batch is inactive or mismatched' using errcode='23514'; end if;
  if not exists (select 1 from public.profiles p where p.id=new.student_id and p.role::text='student' and p.is_active is true) then
   raise exception 'Only active student accounts can be added to an offline roster' using errcode='23514';
  end if;
  if not exists (select 1 from public.enrollments e where e.student_id=new.student_id and e.course_id=new.course_id
    and e.status='active' and e.delivery_mode='offline' and e.admission_fee_paid is true
    and (e.starts_at is null or e.starts_at<=now()) and (e.ends_at is null or e.ends_at>now())) then
   raise exception 'An active admitted offline enrollment is required' using errcode='23514';
  end if;
  if new.starts_at>=new.ends_at or new.ends_at<=now() then
   raise exception 'Offline recording entitlement period must end in the future' using errcode='23514';
  end if;
  new.roll_number:=btrim(new.roll_number);
  new.approved_at:=now();
  new.created_at:=now();
  return new;
 end if;
 if old.status<>'approved' or new.status<>'revoked' or new.revoked_by is distinct from auth.uid() or new.revoked_at is null
  or new.id is distinct from old.id or new.batch_id is distinct from old.batch_id or new.course_id is distinct from old.course_id
  or new.student_id is distinct from old.student_id or new.roll_number is distinct from old.roll_number
  or new.starts_at is distinct from old.starts_at or new.ends_at is distinct from old.ends_at
  or new.approved_by is distinct from old.approved_by or new.approved_at is distinct from old.approved_at
  or new.created_by is distinct from old.created_by or new.created_at is distinct from old.created_at
  or new.revoked_at>now()+interval '1 minute' or new.revoked_at<old.approved_at then
  raise exception 'Approved roster history is immutable; revoke and create a new entry' using errcode='42501';
 end if;
 return new;
end;
$$;

create or replace function private.guard_live_class_offline_batch()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
 if new.offline_batch_id is not null then
  if not exists (
   select 1 from public.offline_batches b join public.courses c on c.id=b.course_id
   where b.id=new.offline_batch_id and b.course_id=new.course_id and b.is_active is true
    and c.is_published is true and c.archived_at is null and c.delivery_modes @> array['offline']::text[]
  ) then
   raise exception 'Class must reference an active offline batch in a published offline course' using errcode='23514';
  end if;
  if not private.can_manage_offline_batch(new.offline_batch_id) then raise exception 'You are not assigned to this offline batch' using errcode='42501'; end if;
 end if;
 return new;
end;
$$;

create or replace function private.guard_offline_recording()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare v_class public.live_classes%rowtype;
begin
 select * into v_class from public.live_classes c
 where c.id=new.live_class_id and c.course_id=new.course_id and c.offline_batch_id=new.batch_id;
 if not found or v_class.ends_at>now() or v_class.status='cancelled' then
  raise exception 'Only a completed, non-cancelled class for the same offline batch can be recorded' using errcode='23514';
 end if;
 if not exists (select 1 from public.offline_batches b join public.courses c on c.id=b.course_id
   where b.id=new.batch_id and b.is_active is true and c.is_published is true and c.archived_at is null
    and c.delivery_modes @> array['offline']::text[])
   or not private.can_manage_offline_batch(new.batch_id) or new.created_by is distinct from auth.uid() then
  raise exception 'You are not authorised to publish this batch recording' using errcode='42501';
 end if;
 if new.storage_path !~ ('^'||new.batch_id::text||'/'||new.live_class_id::text||'/[A-Za-z0-9._-]{1,180}$') then
  raise exception 'Recording storage path does not match its batch and class' using errcode='23514';
 end if;
 if not exists (select 1 from storage.objects o where o.bucket_id='offline-class-recordings' and o.name=new.storage_path) then
  raise exception 'Uploaded recording object must exist before it can be published' using errcode='23503';
 end if;
 new.title_snapshot:=v_class.title;
 new.class_started_at:=v_class.starts_at;
 return new;
end;
$$;

create or replace function private.log_offline_roster_audit()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
 insert into public.audit_logs(actor_id,action,target_type,target_id,metadata)
 values (auth.uid(),case when tg_op='INSERT' then 'offline_roster.approved' else 'offline_roster.revoked' end,
  'offline_batch_roster',new.id::text,
  jsonb_build_object('batch_id',new.batch_id,'course_id',new.course_id,'student_id',new.student_id,
   'roll_number',new.roll_number,'status',new.status,'starts_at',new.starts_at,'ends_at',new.ends_at,
   'approved_by',new.approved_by,'revoked_by',new.revoked_by));
 return new;
end;
$$;

create or replace function private.log_offline_recording_audit()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
 if tg_op='DELETE' then
  insert into public.audit_logs(actor_id,action,target_type,target_id,metadata)
  values (auth.uid(),'offline_recording.deleted','offline_class_recordings',old.id::text,
   jsonb_build_object('batch_id',old.batch_id,'course_id',old.course_id,'live_class_id',old.live_class_id,'storage_path',old.storage_path));
  return old;
 end if;
 insert into public.audit_logs(actor_id,action,target_type,target_id,metadata)
 values (auth.uid(),'offline_recording.published','offline_class_recordings',new.id::text,
  jsonb_build_object('batch_id',new.batch_id,'course_id',new.course_id,'live_class_id',new.live_class_id,'storage_path',new.storage_path));
 return new;
end;
$$;

create trigger offline_batches_prepare before insert or update of course_id,cohort_label on public.offline_batches
for each row execute function private.prepare_offline_batch();
create trigger offline_batch_staff_validate before insert on public.offline_batch_staff
for each row execute function private.validate_offline_batch_staff();
create trigger offline_roster_guard before insert or update on public.offline_batch_roster
for each row execute function private.guard_offline_roster();
create trigger live_classes_offline_batch_guard before insert or update of course_id,offline_batch_id on public.live_classes
for each row execute function private.guard_live_class_offline_batch();
create trigger offline_recordings_guard before insert on public.offline_class_recordings
for each row execute function private.guard_offline_recording();
create trigger offline_roster_audit after insert or update on public.offline_batch_roster
for each row execute function private.log_offline_roster_audit();
create trigger offline_recordings_audit after insert or delete on public.offline_class_recordings
for each row execute function private.log_offline_recording_audit();

alter table public.offline_batches enable row level security;
alter table public.offline_batch_staff enable row level security;
alter table public.offline_batch_roster enable row level security;
alter table public.offline_class_recordings enable row level security;

create policy "admins read offline batches" on public.offline_batches
for select to authenticated using ((select public.current_role())='admin'::public.app_role);
create policy "admins create offline batches" on public.offline_batches
for insert to authenticated with check ((select public.current_role())='admin'::public.app_role and created_by=(select auth.uid()));
create policy "admins update offline batches" on public.offline_batches
for update to authenticated using ((select public.current_role())='admin'::public.app_role)
with check ((select public.current_role())='admin'::public.app_role);
create policy "assigned staff read offline batches" on public.offline_batches
for select to authenticated using (private.can_manage_offline_batch(id));

create policy "admins read offline batch staff" on public.offline_batch_staff
for select to authenticated using ((select public.current_role())='admin'::public.app_role);
create policy "admins assign offline batch staff" on public.offline_batch_staff
for insert to authenticated with check ((select public.current_role())='admin'::public.app_role and assigned_by=(select auth.uid()));
create policy "admins remove offline batch staff" on public.offline_batch_staff
for delete to authenticated using ((select public.current_role())='admin'::public.app_role);
create policy "staff read own offline batch assignments" on public.offline_batch_staff
for select to authenticated using (staff_id=(select auth.uid()));

create policy "admins read offline roster" on public.offline_batch_roster
for select to authenticated using ((select public.current_role())='admin'::public.app_role);
create policy "admins approve offline roster" on public.offline_batch_roster
for insert to authenticated with check ((select public.current_role())='admin'::public.app_role
 and approved_by=(select auth.uid()) and created_by=(select auth.uid()) and status='approved');
create policy "admins revoke offline roster" on public.offline_batch_roster
for update to authenticated using ((select public.current_role())='admin'::public.app_role)
with check ((select public.current_role())='admin'::public.app_role and status='revoked'
 and revoked_by=(select auth.uid()) and revoked_at is not null);
create policy "assigned staff read offline roster" on public.offline_batch_roster
for select to authenticated using (private.can_manage_offline_batch(batch_id));
create policy "students read own offline roster" on public.offline_batch_roster
for select to authenticated using (student_id=(select auth.uid()) and (select public.current_role())='student'::public.app_role);
create policy "assigned staff approve offline roster" on public.offline_batch_roster
for insert to authenticated with check (private.can_manage_offline_batch(batch_id)
 and approved_by=(select auth.uid()) and created_by=(select auth.uid()) and status='approved');
create policy "assigned staff revoke offline roster" on public.offline_batch_roster
for update to authenticated using (private.can_manage_offline_batch(batch_id))
with check (private.can_manage_offline_batch(batch_id) and status='revoked'
 and revoked_by=(select auth.uid()) and revoked_at is not null);

create policy "admins read offline recordings" on public.offline_class_recordings
for select to authenticated using ((select public.current_role())='admin'::public.app_role);
create policy "admins publish offline recordings" on public.offline_class_recordings
for insert to authenticated with check ((select public.current_role())='admin'::public.app_role
 and created_by=(select auth.uid()) and published_at<=now());
create policy "admins delete offline recordings" on public.offline_class_recordings
for delete to authenticated using ((select public.current_role())='admin'::public.app_role);
create policy "assigned staff read offline recordings" on public.offline_class_recordings
for select to authenticated using (private.can_manage_offline_batch(batch_id));
create policy "assigned staff publish offline recordings" on public.offline_class_recordings
for insert to authenticated with check (private.can_manage_offline_batch(batch_id)
 and created_by=(select auth.uid()) and published_at<=now());
create policy "assigned staff delete offline recordings" on public.offline_class_recordings
for delete to authenticated using (private.can_manage_offline_batch(batch_id));
create policy "students read entitled offline recordings" on public.offline_class_recordings
for select to authenticated using (published_at<=now() and (expires_at is null or expires_at>now())
 and private.has_active_offline_recording_entitlement(course_id,batch_id));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('offline-class-recordings','offline-class-recordings',false,104857600,
 array['video/mp4','video/webm','video/quicktime']::text[]);

create policy "assigned offline batch staff upload class recordings" on storage.objects
for insert to authenticated with check (
 bucket_id='offline-class-recordings'
 and array_length(storage.foldername(name),1)=2
 and exists (
  select 1 from public.live_classes c
  join public.offline_batches b on b.id=c.offline_batch_id and b.is_active is true
  join public.courses course on course.id=b.course_id and course.is_published is true and course.archived_at is null
  where c.id::text=(storage.foldername(name))[2]
   and c.offline_batch_id::text=(storage.foldername(name))[1]
   and c.ends_at<=now() and c.status<>'cancelled'
   and private.can_manage_offline_batch(c.offline_batch_id)
 )
);
create policy "students and staff read offline class recordings" on storage.objects
for select to authenticated using (
 bucket_id='offline-class-recordings'
 and exists (
  select 1 from public.offline_class_recordings r
  where r.storage_path=objects.name and r.published_at<=now()
   and (r.expires_at is null or r.expires_at>now())
   and (private.can_manage_offline_batch(r.batch_id)
    or private.has_active_offline_recording_entitlement(r.course_id,r.batch_id))
 )
);
create policy "assigned offline batch staff delete class recordings" on storage.objects
for delete to authenticated using (
 bucket_id='offline-class-recordings'
 and exists (
  select 1 from public.offline_batches b
  where b.id::text=(storage.foldername(name))[1]
   and private.can_manage_offline_batch(b.id)
 )
);

revoke all on public.offline_batches,public.offline_batch_staff,public.offline_batch_roster,public.offline_class_recordings from public,anon,authenticated;
grant select,insert,update on public.offline_batches to authenticated;
grant select,insert,delete on public.offline_batch_staff to authenticated;
grant select,insert,update on public.offline_batch_roster to authenticated;
grant select,insert,delete on public.offline_class_recordings to authenticated;

revoke all on function private.can_manage_offline_batch(uuid) from public,anon;
revoke all on function private.has_active_offline_recording_entitlement(uuid,uuid) from public,anon;
grant execute on function private.can_manage_offline_batch(uuid) to authenticated;
grant execute on function private.has_active_offline_recording_entitlement(uuid,uuid) to authenticated;
revoke all on function private.prepare_offline_batch() from public,anon,authenticated;
revoke all on function private.validate_offline_batch_staff() from public,anon,authenticated;
revoke all on function private.guard_offline_roster() from public,anon,authenticated;
revoke all on function private.guard_live_class_offline_batch() from public,anon,authenticated;
revoke all on function private.guard_offline_recording() from public,anon,authenticated;
revoke all on function private.log_offline_roster_audit() from public,anon,authenticated;
revoke all on function private.log_offline_recording_audit() from public,anon,authenticated;
