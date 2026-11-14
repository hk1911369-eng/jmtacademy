'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { saveLessonPlaybackCheckpoint } from '@/app/actions/learning';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
type PlaybackCheckpoint = { lessonId: string; positionSeconds: number; durationSeconds: number | null };

export function LessonVideoPlayer({
  lessonId,
  title,
  src,
  initialPositionSeconds = 0,
  completed = false,
  enabled = true,
}: {
  lessonId: string;
  title: string;
  src: string;
  initialPositionSeconds?: number;
  completed?: boolean;
  enabled?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastSavedPosition = useRef(Math.max(0, Math.floor(initialPositionSeconds)));
  const lastAttemptAt = useRef(0);
  const saving = useRef(false);
  const pendingCheckpoint = useRef<PlaybackCheckpoint | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const readCheckpoint = useCallback(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.currentTime) || video.currentTime < 1) return null;
    const positionSeconds = Math.min(86400, Math.floor(video.currentTime));
    if (positionSeconds <= 0) return null;
    const durationSeconds = Number.isFinite(video.duration) && video.duration > 0 && video.duration <= 86400
      ? Math.floor(video.duration)
      : null;
    return { lessonId, positionSeconds, durationSeconds };
  }, [lessonId]);

  const persistCheckpoint = useCallback(async (firstCheckpoint: PlaybackCheckpoint) => {
    if (!enabled || completed) return;
    if (saving.current) {
      // Preserve the latest pause/seek checkpoint if a periodic save is still in flight.
      pendingCheckpoint.current = firstCheckpoint;
      return;
    }

    let checkpoint: PlaybackCheckpoint | null = firstCheckpoint;
    while (checkpoint && enabled && !completed) {
      saving.current = true;
      setSaveStatus('saving');
      try {
        const result = await saveLessonPlaybackCheckpoint(
          checkpoint.lessonId,
          checkpoint.positionSeconds,
          checkpoint.durationSeconds,
        );
        if (result.ok) {
          lastSavedPosition.current = checkpoint.positionSeconds;
          setSaveStatus('saved');
        } else {
          setSaveStatus('error');
        }
      } catch {
        setSaveStatus('error');
      } finally {
        saving.current = false;
      }

      // Flush one newer pause/seek point captured while the previous request was pending.
      const pending = pendingCheckpoint.current;
      pendingCheckpoint.current = null;
      checkpoint = pending && Math.abs(pending.positionSeconds - lastSavedPosition.current) >= 1
        ? pending
        : null;
    }
  }, [completed, enabled]);

  const saveProgress = useCallback(async (force = false) => {
    if (!enabled || completed) return;
    const checkpoint = readCheckpoint();
    if (!checkpoint) return;
    const difference = Math.abs(checkpoint.positionSeconds - lastSavedPosition.current);
    const now = Date.now();
    if (saving.current) {
      if (force) pendingCheckpoint.current = checkpoint;
      return;
    }
    if (!force && (difference < 15 || now - lastAttemptAt.current < 10000)) return;
    if (force && now - lastAttemptAt.current < 2000 && difference < 5) return;

    lastAttemptAt.current = now;
    await persistCheckpoint(checkpoint);
  }, [completed, enabled, persistCheckpoint, readCheckpoint]);

  const restorePosition = useCallback(() => {
    const video = videoRef.current;
    const position = Math.max(0, Math.floor(initialPositionSeconds));
    if (!enabled || completed || !video || position < 5 || !Number.isFinite(video.duration)) return;
    if (video.duration <= position + 5) {
      // A checkpoint at the end is replayed from the beginning, not stranded at EOF.
      lastSavedPosition.current = 0;
      return;
    }
    try {
      video.currentTime = position;
      lastSavedPosition.current = position;
    } catch {
      setSaveStatus('error');
    }
  }, [completed, enabled, initialPositionSeconds]);

  const sendFinalCheckpoint = useCallback(() => {
    if (!enabled || completed) return;
    const checkpoint = readCheckpoint();
    if (!checkpoint || Math.abs(checkpoint.positionSeconds - lastSavedPosition.current) < 1) return;
    if (saving.current) {
      pendingCheckpoint.current = checkpoint;
      return;
    }
    const body = new Blob([JSON.stringify(checkpoint)], { type: 'application/json' });
    const queued = typeof navigator.sendBeacon === 'function'
      && navigator.sendBeacon('/api/learning/playback-checkpoint', body);
    if (!queued) {
      void fetch('/api/learning/playback-checkpoint', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkpoint),
        keepalive: true,
      }).catch(() => undefined);
    }
  }, [completed, enabled, readCheckpoint]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') sendFinalCheckpoint();
    };
    const handleOnline = () => { void saveProgress(true); };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('online', handleOnline);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('online', handleOnline);
    };
  }, [saveProgress, sendFinalCheckpoint]);

  return (
    <div className="lesson-video-progress">
      <video
        ref={videoRef}
        controls
        playsInline
        preload="metadata"
        src={src}
        aria-label={'Lesson video: ' + title}
        onLoadedMetadata={restorePosition}
        onTimeUpdate={() => {
          const video = videoRef.current;
          if (video && video.currentTime - lastSavedPosition.current >= 15) void saveProgress();
        }}
        onPause={() => { void saveProgress(true); }}
        onSeeked={() => { void saveProgress(true); }}
      >
        Your browser does not support video playback.
      </video>
      {enabled && !completed && saveStatus !== 'idle' && (
        <p className="lesson-video-progress-status" role="status" aria-live="polite">
          {saveStatus === 'saving' ? 'Saving your progress…' : saveStatus === 'saved' ? 'Progress saved' : 'Progress could not be saved yet. Playback can continue; we will try again.'}
        </p>
      )}
    </div>
  );
}
