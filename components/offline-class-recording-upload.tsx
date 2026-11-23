'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

const allowed = new Set(['video/mp4','video/webm','video/quicktime']);

export function OfflineClassRecordingUpload({
  batchId, courseId, liveClassId,
}: { batchId: string; courseId: string; liveClassId: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function upload() {
    if (!file) { setMessage('Choose a class recording first.'); return; }
    if (!allowed.has(file.type)) { setMessage('Use MP4, WebM or QuickTime video.'); return; }
    if (file.size > 100 * 1024 * 1024) { setMessage('Maximum recording size is 100 MB.'); return; }
    setBusy(true);
    setMessage('Uploading the recording. Keep this page open until it finishes.');
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-').slice(-120) || 'class-recording.mp4';
    const path = batchId + '/' + liveClassId + '/' + crypto.randomUUID() + '-' + safeName;
    const { error: uploadError } = await supabase.storage.from('offline-class-recordings').upload(path, file, {
      contentType: file.type, cacheControl: '3600', upsert: false,
    });
    if (uploadError) {
      setBusy(false); setMessage('Upload failed. Check your connection and try again.'); return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    const { error: rowError } = await supabase.from('offline_class_recordings').insert({
      live_class_id: liveClassId, batch_id: batchId, course_id: courseId,
      storage_path: path, file_name: safeName, mime_type: file.type, file_size: file.size,
      created_by: user?.id,
    });
    if (rowError) {
      await supabase.storage.from('offline-class-recordings').remove([path]);
      setBusy(false); setMessage('The file uploaded but could not be published. No student access was granted.');
      return;
    }
    setFile(null); setBusy(false); setMessage('Recording published to the approved offline batch.');
    router.refresh();
  }

  return (
    <div className="resource-upload">
      <h4>Publish missed-class recording</h4>
      <p className="muted">Private to approved offline roll numbers in this batch · MP4, WebM or MOV · up to 100 MB.</p>
      <label className="resource-file-label">Choose recording
        <input type="file" accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov" disabled={busy} onChange={event => setFile(event.target.files?.[0] ?? null)}/>
      </label>
      {file && <p className="small-note">{file.name} · {(file.size / 1024 / 1024).toFixed(1)} MB</p>}
      <button type="button" className="auth-submit" onClick={upload} disabled={busy || !file}>{busy ? 'Uploading…' : 'Upload & publish recording'}</button>
      {message && <p className={message.startsWith('Recording published') ? 'form-success' : 'form-error'} role="status">{message}</p>}
    </div>
  );
}
