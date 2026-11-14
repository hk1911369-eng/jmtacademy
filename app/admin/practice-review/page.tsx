import { redirect } from 'next/navigation';
import { PortalLayout } from '@/components/portal-layout';
import { reviewStudentPracticeQuestion } from '@/app/actions/student-practice-authoring';
import { createClient } from '@/lib/supabase/server';

type SearchParams = { success?: string; error?: string };

export default async function PracticeReviewPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const db = await createClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await db.from('profiles').select('role,is_active').eq('id', user.id).single();
  if (profile?.is_active !== true || profile.role !== 'admin') redirect('/portal');

  const { data: questions, error } = await db.from('student_practice_questions')
    .select('id,course_id,subject_id,chapter_label,topic,difficulty,question_text,options,correct_option,explanation,marks,source_kind,source_reference,source_year,rights_status,review_status,created_by,created_at')
    .in('review_status', ['pending_review', 'rejected'])
    .order('created_at', { ascending: true }).limit(100);
  const courseIds = [...new Set((questions ?? []).map(row => row.course_id))];
  const subjectIds = [...new Set((questions ?? []).map(row => row.subject_id))];
  const authorIds = [...new Set((questions ?? []).map(row => row.created_by))];
  const [{ data: courses }, { data: subjects }, { data: authors }] = await Promise.all([
    courseIds.length ? db.from('courses').select('id,title').in('id', courseIds) : Promise.resolve({ data: [] as { id: string; title: string }[] }),
    subjectIds.length ? db.from('academic_subjects').select('id,name').in('id', subjectIds) : Promise.resolve({ data: [] as { id: string; name: string }[] }),
    authorIds.length ? db.from('profiles').select('id,full_name').in('id', authorIds) : Promise.resolve({ data: [] as { id: string; full_name: string | null }[] }),
  ]);
  const courseNames = new Map((courses ?? []).map(row => [row.id, row.title]));
  const subjectNames = new Map((subjects ?? []).map(row => [row.id, row.name]));
  const authorNames = new Map((authors ?? []).map(row => [row.id, row.full_name || 'Teaching team']));

  return <PortalLayout role="admin" active="practice-review" title="Practice content review" returnTo="/admin">
    <section className="portal-content staff-practice-page">
      <header className="practice-page-heading">
        <span className="auth-kicker">JMT ACADEMY · ACADEMIC QUALITY</span>
        <h1>Practice content review</h1>
        <p className="muted">Check answer accuracy, explanation, syllabus fit and source permissions. Approval publishes the question; changing its content later sends it back for review.</p>
      </header>
      {params.success && <p className="form-success">Review decision saved.</p>}
      {params.error && <p className="form-error">The review decision could not be saved. Check the question and rights evidence.</p>}
      {error && <p className="form-error">The review queue could not be loaded.</p>}
      {!error && !(questions ?? []).length && <section className="portal-card practice-empty"><h2>Review queue is clear</h2><p className="muted">New teacher-authored questions will appear here before students can see them.</p></section>}
      {(questions ?? []).map(question => {
        const options = Array.isArray(question.options) ? question.options.filter((item): item is string => typeof item === 'string') : [];
        return <article className="portal-card practice-question-card" key={question.id}>
          <header className="practice-question-header">
            <span className="auth-kicker">{question.review_status.replaceAll('_', ' ').toUpperCase()} · {question.difficulty.toUpperCase()}</span>
            <span className="practice-marks">{question.marks} marks</span>
          </header>
          <p><b>{courseNames.get(question.course_id) ?? 'Course'} · {subjectNames.get(question.subject_id) ?? 'Subject'}</b></p>
          <p className="muted">Submitted by {authorNames.get(question.created_by) ?? 'Teaching team'} · {new Date(question.created_at).toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}</p>
          <p className="practice-topic">{[question.chapter_label, question.topic].filter(Boolean).join(' · ')}</p>
          <h2>{question.question_text}</h2>
          <ol>{options.map((option, index) => <li key={index}>{String.fromCharCode(65 + index)}. {option}{index === question.correct_option ? ' · Submitted answer key' : ''}</li>)}</ol>
          <p><b>Explanation:</b> {question.explanation || 'No explanation supplied'}</p>
          <p><b>Source:</b> {question.source_kind.replaceAll('_', ' ')} · {question.source_reference || 'Teacher-authored original'}{question.source_year ? ' · ' + question.source_year : ''}</p>
          <p><b>Current rights status:</b> {question.rights_status.replaceAll('_', ' ')}</p>
          <form action={reviewStudentPracticeQuestion} className="auth-form practice-authoring-form">
            <input type="hidden" name="question_id" value={question.id}/>
            <label>Rights verification
              <select name="rights_status" defaultValue={question.source_kind === 'original' ? 'original' : 'permission_verified'}>
                <option value="original">Original teacher-authored content</option>
                <option value="permission_verified">Permission / licence verified</option>
                <option value="open_license_verified">Open licence verified</option>
                <option value="public_domain_verified">Public domain verified</option>
              </select>
            </label>
            <label>Reviewer note <textarea name="review_note" rows={2} maxLength={2000} placeholder="Record syllabus fit, answer check and rights evidence…"/></label>
            <div className="practice-authoring-grid">
              <button type="submit" name="decision" value="approve" className="practice-submit-button">Approve and publish</button>
              <button type="submit" name="decision" value="reject" className="quiet-button">Reject / return for revision</button>
            </div>
          </form>
        </article>;
      })}
    </section>
  </PortalLayout>;
}
