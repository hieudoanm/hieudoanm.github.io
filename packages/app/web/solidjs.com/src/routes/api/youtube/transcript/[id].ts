import type { APIEvent } from '@solidjs/start/server';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type SuccessResponse = {
  transcript: string;
};

type ErrorResponse = {
  error: string;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

async function fetchCaptionUrl(videoId: string): Promise<string | null> {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const res = await fetch(watchUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });

  if (!res.ok) {
    throw new Error(`YouTube watch page returned HTTP ${res.status}`);
  }

  const html = await res.text();

  const marker = 'ytInitialPlayerResponse = ';
  const start = html.indexOf(marker);
  if (start === -1)
    throw new Error('ytInitialPlayerResponse not found in page');

  let depth = 0;
  const jsonStart = start + marker.length;
  let jsonEnd = jsonStart;
  for (let i = jsonStart; i < html.length; i++) {
    if (html[i] === '{') depth++;
    else if (html[i] === '}') {
      depth--;
      if (depth === 0) {
        jsonEnd = i + 1;
        break;
      }
    }
  }

  let playerResponse: any;
  try {
    playerResponse = JSON.parse(html.slice(jsonStart, jsonEnd));
  } catch {
    throw new Error('Failed to parse ytInitialPlayerResponse');
  }

  const captionTracks: any[] =
    playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks ??
    [];

  if (captionTracks.length === 0) {
    return null;
  }

  const preferred =
    captionTracks.find((t: any) => t.languageCode === 'en' && !t.kind) ??
    captionTracks.find((t: any) => t.languageCode === 'en') ??
    captionTracks.find((t: any) => t.kind === 'asr') ??
    captionTracks[0];

  return preferred?.baseUrl ?? null;
}

async function fetchTranscriptText(captionUrl: string): Promise<string> {
  const url = new URL(captionUrl);
  url.searchParams.set('fmt', 'srv3');
  url.searchParams.set('lang', 'en');

  const res = await fetch(url.toString(), {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!res.ok) throw new Error(`Caption fetch returned HTTP ${res.status}`);

  const xml = await res.text();

  const lines: { start: number; text: string }[] = [];
  const re = /<text[^>]+start="([^"]+)"[^>]*>([\s\S]*?)<\/text>/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(xml)) !== null) {
    const start = parseFloat(m[1]);
    const raw = m[2]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/\n/g, ' ')
      .trim();

    if (raw) lines.push({ start, text: raw });
  }

  if (lines.length === 0) {
    throw new Error('No text found in caption file');
  }

  lines.sort((a, b) => a.start - b.start);
  return lines.map((l) => l.text).join(' ');
}

function parseVideoId(raw: string): string | null {
  const clean = raw.trim();

  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;

  const patterns = [
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const p of patterns) {
    const m = clean.match(p);
    if (m?.[1]) return m[1];
  }

  return null;
}

/* ------------------------------------------------------------------ */
/* Handler                                                              */
/* ------------------------------------------------------------------ */

export async function POST({ params, request }: APIEvent) {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use POST.' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json', Allow: 'POST' },
      }
    );
  }

  const rawId = params.id;
  if (!rawId) {
    return new Response(
      JSON.stringify({ error: 'Missing video ID in path.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const videoId = parseVideoId(rawId);
  if (!videoId) {
    return new Response(
      JSON.stringify({ error: `Invalid video ID or URL: "${rawId}"` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const captionUrl = await fetchCaptionUrl(videoId);

    if (!captionUrl) {
      return new Response(
        JSON.stringify({
          error: `No captions available for video "${videoId}". The video may have captions disabled or be private.`,
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transcript = await fetchTranscriptText(captionUrl);

    return new Response(JSON.stringify({ transcript } as SuccessResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[youtube/transcripts/${videoId}]`, message);

    if (message.includes('HTTP 404') || message.includes('not found')) {
      return new Response(
        JSON.stringify({
          error: `Video "${videoId}" not found.`,
        } as ErrorResponse),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (message.includes('HTTP 403') || message.includes('private')) {
      return new Response(
        JSON.stringify({
          error: `Video "${videoId}" is private or restricted.`,
        } as ErrorResponse),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        error: `Failed to fetch transcript: ${message}`,
      } as ErrorResponse),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
