// pages/api/youtube/transcript/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';

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

/**
 * Fetch the YouTube watch page and extract the timedtext (caption) URL
 * from the ytInitialPlayerResponse embedded JSON.
 */
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

  // Extract ytInitialPlayerResponse JSON blob
  const marker = 'ytInitialPlayerResponse = ';
  const start = html.indexOf(marker);
  if (start === -1)
    throw new Error('ytInitialPlayerResponse not found in page');

  // Find the matching closing brace
  let depth = 0;
  let jsonStart = start + marker.length;
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

  // Navigate to captions
  const captionTracks: any[] =
    playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks ??
    [];

  if (captionTracks.length === 0) {
    return null; // No captions available
  }

  // Prefer English, then any ASR (auto-generated), then first available
  const preferred =
    captionTracks.find((t: any) => t.languageCode === 'en' && !t.kind) ??
    captionTracks.find((t: any) => t.languageCode === 'en') ??
    captionTracks.find((t: any) => t.kind === 'asr') ??
    captionTracks[0];

  return preferred?.baseUrl ?? null;
}

/**
 * Fetch the timed XML caption file and convert to plain text.
 * YouTube returns TimedText XML like:
 *   <transcript><text start="0.5" dur="2.3">Hello world</text>...</transcript>
 */
async function fetchTranscriptText(captionUrl: string): Promise<string> {
  // Request plain text format directly
  const url = new URL(captionUrl);
  url.searchParams.set('fmt', 'srv3'); // srv3 = XML with timing
  url.searchParams.set('lang', 'en');

  const res = await fetch(url.toString(), {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!res.ok) throw new Error(`Caption fetch returned HTTP ${res.status}`);

  const xml = await res.text();

  // Parse <text> elements from XML — no DOM parser available in Node,
  // use a simple regex extraction (safe here since we control the source)
  const lines: { start: number; text: string }[] = [];
  const re = /<text[^>]+start="([^"]+)"[^>]*>([\s\S]*?)<\/text>/g;
  let m: RegExpExecArray | null;

  while ((m = re.exec(xml)) !== null) {
    const start = parseFloat(m[1]);
    // Decode HTML entities and strip any nested tags
    const raw = m[2]
      .replace(/<[^>]+>/g, '') // strip XML tags
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

  // Sort by start time and join with spaces
  lines.sort((a, b) => a.start - b.start);
  return lines.map((l) => l.text).join(' ');
}

/**
 * Extract a video ID from a raw ID string, full URL, or short URL.
 */
function parseVideoId(raw: string): string | null {
  const clean = raw.trim();

  // Already a bare 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;

  // Full or short URL
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  // Method guard
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Extract and validate video ID from path param
  const rawId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  if (!rawId) {
    return res.status(400).json({ error: 'Missing video ID in path.' });
  }

  const videoId = parseVideoId(rawId);
  if (!videoId) {
    return res
      .status(400)
      .json({ error: `Invalid video ID or URL: "${rawId}"` });
  }

  try {
    // Step 1: Get caption track URL from the watch page
    const captionUrl = await fetchCaptionUrl(videoId);

    if (!captionUrl) {
      return res.status(404).json({
        error: `No captions available for video "${videoId}". The video may have captions disabled or be private.`,
      });
    }

    // Step 2: Fetch and parse the caption XML into plain text
    const transcript = await fetchTranscriptText(captionUrl);

    return res.status(200).json({ transcript });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[youtube/transcripts/${videoId}]`, message);

    if (message.includes('HTTP 404') || message.includes('not found')) {
      return res.status(404).json({ error: `Video "${videoId}" not found.` });
    }

    if (message.includes('HTTP 403') || message.includes('private')) {
      return res
        .status(403)
        .json({ error: `Video "${videoId}" is private or restricted.` });
    }

    return res
      .status(500)
      .json({ error: `Failed to fetch transcript: ${message}` });
  }
}
