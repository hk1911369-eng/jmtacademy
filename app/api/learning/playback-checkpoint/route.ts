import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const host = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '').split(',')[0].trim();
  let originHost = '';
  try {
    originHost = origin ? new URL(origin).host : '';
  } catch {
    return Response.json({ ok: false }, { status: 403, headers: { 'Cache-Control': 'no-store' } });
  }
  if (!originHost || !host || originHost.toLowerCase() !== host.toLowerCase()) {
    return Response.json({ ok: false }, { status: 403, headers: { 'Cache-Control': 'no-store' } });
  }

  const payload = await request.json().catch(() => null) as {
    lessonId?: unknown; positionSeconds?: unknown; durationSeconds?: unknown;
  } | null;
  if (!payload || typeof payload.lessonId !== 'string'
    || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(payload.lessonId)
    || typeof payload.positionSeconds !== 'number'
    || !Number.isFinite(payload.positionSeconds)
    || payload.positionSeconds < 0 || payload.positionSeconds > 86400
    || (payload.durationSeconds !== null && payload.durationSeconds !== undefined
      && (typeof payload.durationSeconds !== 'number' || !Number.isFinite(payload.durationSeconds)
        || payload.durationSeconds < 1 || payload.durationSeconds > 86400))) {
    return Response.json({ ok: false }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  const positionSeconds = Math.floor(payload.positionSeconds);
  const durationSeconds = typeof payload.durationSeconds === 'number' ? Math.floor(payload.durationSeconds) : null;
  if (durationSeconds !== null && positionSeconds > durationSeconds + 3) {
    return Response.json({ ok: false }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ ok: false }, { status: 401, headers: { 'Cache-Control': 'no-store' } });

  const { data, error } = await supabase.rpc('save_lesson_playback_checkpoint', {
    p_lesson_id: payload.lessonId,
    p_position_seconds: positionSeconds,
    p_duration_seconds: durationSeconds,
  });
  if (error) return Response.json({ ok: false }, { status: 403, headers: { 'Cache-Control': 'no-store' } });
  if (data !== true) return Response.json({ ok: false, retry: true }, { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': '2' } });
  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
}
