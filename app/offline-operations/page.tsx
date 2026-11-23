import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PortalLayout } from '@/components/portal-layout';
import { createOfflineBatch, assignOfflineBatchStaff, approveOfflineStudentRoll, revokeOfflineStudentRoll } from '@/app/actions/offline-academy';

function dhakaInput(date: Date) {
  return new Date(date.getTime() + 6 * 60 * 60 * 1000).toISOString().slice(0, 16);
}

export default async function OfflineOperationsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !['admin','teacher','staff'].includes(profile.role)) redirect('/portal');
  const role = profile.role as 'admin' | 'teacher' | 'staff';

  const { data: batches } = await supabase.from('offline_batches')
    .select('id,course_id,batch_name,cohort_label,is_active,created_at,course:courses(title)')
    .order('created_at', { ascending: false }).limit(100);
  const batchRows = batches ?? [];
  const batchIds = batchRows.map((batch: any) => batch.id);
  const [{ data: roster }, { data: assignments }, { data: staffProfiles }, { data: offlineCourses }] = await Promise.all([
    batchIds.length
      ? supabase.from('offline_batch_roster')
        .select('id,batch_id,student_id,roll_number,status,starts_at,ends_at,approved_at,revoked_at')
        .in('batch_id', batchIds).order('created_at', { ascending: false }).limit(500)
      : Promise.resolve({ data: [] as any[] }),
    role === 'admin' && batchIds.length
      ? supabase.from('offline_batch_staff').select('batch_id,staff_id').in('batch_id', batchIds)
      : Promise.resolve({ data: [] as any[] }),
    role === 'admin'
      ? supabase.from('profiles').select('id,full_name,role').in('role', ['teacher','staff']).eq('is_active', true).order('full_name')
      : Promise.resolve({ data: [] as any[] }),
    role === 'admin'
      ? supabase.from('courses').select('id,title,programme_group,delivery_modes').contains('delivery_modes', ['offline']).eq('is_published', true).is('archived_at', null).order('title')
      : Promise.resolve({ data: [] as any[] }),
  ]);
  const studentIds = [...new Set((roster ?? []).map((row: any) => row.student_id))];
  const { data: studentProfiles } = studentIds.length
    ? await supabase.from('profiles').select('id,full_name,student_code').in('id', studentIds)
    : { data: [] as any[] };
  const { data: courseAssignments } = role === 'admin' && batchIds.length
    ? await supabase.from('course_assignments').select('course_id,teacher_id')
    : { data: [] as any[] };
  const studentById = new Map((studentProfiles ?? []).map((student: any) => [student.id, student]));
  const staffById = new Map((staffProfiles ?? []).map((staff: any) => [staff.id, staff]));
  const staffAssignments = new Map<string, Set<string>>();
  for (const assignment of courseAssignments ?? []) {
    if (!staffAssignments.has(assignment.course_id)) staffAssignments.set(assignment.course_id, new Set());
    staffAssignments.get(assignment.course_id)!.add(assignment.teacher_id);
  }
  const rosterByBatch = new Map<string, any[]>();
  for (const row of roster ?? []) {
    if (!rosterByBatch.has(row.batch_id)) rosterByBatch.set(row.batch_id, []);
    rosterByBatch.get(row.batch_id)!.push(row);
  }
  const assignmentByBatch = new Map<string, any[]>();
  for (const assignment of assignments ?? []) {
    if (!assignmentByBatch.has(assignment.batch_id)) assignmentByBatch.set(assignment.batch_id, []);
    assignmentByBatch.get(assignment.batch_id)!.push(assignment);
  }
  const now = new Date();
  const errorMessages: Record<string, string> = {
    permission: 'You do not have permission to perform that action.',
    batch: 'The batch could not be created. Confirm the course is published, has an offline delivery mode and programme group, and the batch name is unique.',
    assignment: 'Staff assignment failed. The person must be active and already assigned to the selected course.',
    student: 'Student not found or not visible to your assigned course. Use the JMT student code, not the classroom roll number.',
    roster: 'Roll approval failed. Check the student code, official roll, date range, active offline enrolment and duplicate roll number.',
  };
  const savedMessages: Record<string, string> = {
    batch: 'Offline batch created.',
    assignment: 'Staff member assigned to the batch.',
    roster: 'Student roll approved and entitlement activated.',
    revoked: 'Recording entitlement revoked.',
  };

  return (
    <PortalLayout role={role} active="offline-operations" title="Offline academy operations" returnTo={role === 'admin' ? '/admin' : '/teacher'}>
      <section className="portal-content">
        <span className="auth-kicker">PHYSICAL CLASSROOM ACCESS</span>
        <h1>Offline batches & recording eligibility</h1>
        <p className="muted">A student&apos;s offline delivery mode is not enough. Recording access requires a staff-approved official roll number, an active offline enrolment and a valid entitlement period.</p>
        {params.error && <p className="form-error" role="status">{errorMessages[params.error] ?? 'The action could not be completed.'}</p>}
        {params.saved && <p className="form-success" role="status">{savedMessages[params.saved] ?? 'Saved.'}</p>}

        {role === 'admin' && <>
          <section className="portal-card">
            <span className="auth-kicker">ADMINISTRATION</span>
            <h2>Create a physical batch</h2>
            <form action={createOfflineBatch} className="auth-form">
              <label>Offline course
                <select name="course_id" required defaultValue="">
                  <option value="" disabled>Select a course</option>
                  {(offlineCourses ?? []).map((course: any) => <option key={course.id} value={course.id}>{course.title} · {course.programme_group || 'Cohort not set'}</option>)}
                </select>
              </label>
              <label>Batch name <input name="batch_name" required minLength={2} maxLength={120} placeholder="e.g. HSC Physics · Morning A"/></label>
              <p className="muted">The cohort is copied from the selected course and locked as a snapshot. The batch is a physical classroom group.</p>
              <button className="auth-submit">Create offline batch</button>
            </form>
          </section>
        </>}

        {!batchRows.length && <p className="muted">No offline batches are available to your account yet. An administrator must create a batch and assign you to it.</p>}
        <div className="portal-grid">
          {batchRows.map((batch: any) => {
            const rows = rosterByBatch.get(batch.id) ?? [];
            const assigned = assignmentByBatch.get(batch.id) ?? [];
            const eligibleStaffIds = [...(staffAssignments.get(batch.course_id) ?? new Set<string>())];
            return (
              <article className="portal-card" key={batch.id}>
                <div className="section-heading">
                  <span className="auth-kicker">{batch.cohort_label}</span>
                  <span className={batch.is_active ? 'status-approved' : 'status-pending'}>{batch.is_active ? 'Active batch' : 'Inactive batch'}</span>
                </div>
                <h2>{batch.batch_name}</h2>
                <p className="muted">{batch.course?.title ?? 'Course'} · {rows.filter((row: any) => row.status === 'approved' && new Date(row.starts_at) <= now && new Date(row.ends_at) > now).length} current approved roll(s)</p>
                {role === 'admin' && <>
                  <h3>Assigned teaching staff</h3>
                  <p>{assigned.map((item: any) => (staffById.get(item.staff_id) as any)?.full_name ?? 'Staff account').join(', ') || 'No staff assigned yet.'}</p>
                  <form action={assignOfflineBatchStaff} className="auth-form">
                    <input type="hidden" name="batch_id" value={batch.id}/>
                    <label>Assign course teacher / staff
                      <select name="staff_id" required defaultValue="">
                        <option value="" disabled>Select a person</option>
                        {eligibleStaffIds.map(id => {
                          const staff: any = staffById.get(id);
                          return staff && !assigned.some((item: any) => item.staff_id === id)
                            ? <option key={id} value={id}>{staff.full_name || 'Staff'} · {staff.role}</option>
                            : null;
                        })}
                      </select>
                    </label>
                    <button className="quiet-button" disabled={!eligibleStaffIds.some(id => !assigned.some((item: any) => item.staff_id === id))}>Assign staff</button>
                  </form>
                </>}
                <h3>Approve a student&apos;s official roll</h3>
                {batch.is_active ? <form action={approveOfflineStudentRoll} className="auth-form">
                  <input type="hidden" name="batch_id" value={batch.id}/>
                  <label>JMT student code <input name="student_code" required maxLength={60} placeholder="Student&apos;s JMT account code"/></label>
                  <label>Official classroom roll number <input name="roll_number" required maxLength={40} placeholder="Roll as recorded by the academy"/></label>
                  <label>Entitlement starts <input name="starts_at" type="datetime-local" required defaultValue={dhakaInput(now)}/></label>
                  <label>Entitlement ends <input name="ends_at" type="datetime-local" required/></label>
                  <p className="muted">Only active student accounts with an active, admitted offline enrolment in this course can be approved. Choose the end date approved by the academy; do not extend access beyond the actual entitlement. Use the JMT student code to identify the account; the official roll is stored separately.</p>
                  <button className="auth-submit">Approve roll & activate recording access</button>
                </form> : <p className="muted">This batch is inactive. No new approvals can be made.</p>}
                <h3>Roster & approval history</h3>
                {!rows.length ? <p className="muted">No roll numbers approved yet.</p> : <div className="table-scroll"><table>
                  <thead><tr><th>Student</th><th>Official roll</th><th>Entitlement</th><th>Action</th></tr></thead>
                  <tbody>{rows.map((row: any) => {
                    const student: any = studentById.get(row.student_id);
                    const active = row.status === 'approved' && new Date(row.starts_at) <= now && new Date(row.ends_at) > now;
                    return <tr key={row.id}>
                      <td>{student?.full_name || 'Student'}<small>{student?.student_code || ''}</small></td>
                      <td>{row.roll_number}</td>
                      <td><span className={active ? 'status-approved' : 'status-pending'}>{row.status === 'revoked' ? 'Revoked' : active ? 'Active' : new Date(row.ends_at) <= now ? 'Expired' : 'Scheduled'}</span><small>{new Date(row.starts_at).toLocaleDateString('en-GB',{timeZone:'Asia/Dhaka'})} – {new Date(row.ends_at).toLocaleDateString('en-GB',{timeZone:'Asia/Dhaka'})}</small></td>
                      <td>{row.status === 'approved' && <form action={revokeOfflineStudentRoll}><input type="hidden" name="roster_id" value={row.id}/><button className="quiet-button" type="submit">Revoke</button></form>}</td>
                    </tr>;
                  })}</tbody>
                </table></div>}
              </article>
            );
          })}
        </div>
      </section>
    </PortalLayout>
  );
}
