'use client';

import { useState } from 'react';
import { getOfflineClassRecordingUrl } from '@/app/actions/offline-academy';

export function OfflineRecordingAccess({
  recordingId, title, fileName, classStartedAt,
}: { recordingId: string; title: string; fileName: string; classStartedAt: string }) {
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function open() {
    setBusy(true); setError('');
    try {
      const result = await getOfflineClassRecordingUrl(recordingId);
      if (!result.url) { setUrl(''); setError('This recording is no longer available to your account.'); return; }
      setUrl(result.url);
    } catch {
      setUrl('');
      setError('Could not prepare the recording. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="portal-card">
      <span className="auth-kicker">{new Date(classStartedAt).toLocaleString('en-BD',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Dhaka'})} · Bangladesh time</span>
      <h3>{title}</h3>
      <p className="muted">{fileName}</p>
      {!url
        ? <button type="button" className="auth-submit" onClick={open} disabled={busy}>{busy ? 'Preparing secure recording…' : 'Watch missed-class recording'}</button>
        : <><video controls playsInline preload="metadata" className="resource-video" src={url}>Your browser does not support video playback.</video><button type="button" className="quiet-button" onClick={open} disabled={busy}>{busy ? 'Refreshing…' : 'Refresh secure link'}</button></>}
      {error && <p className="form-error" role="status">{error}</p>}
    </article>
  );
}
