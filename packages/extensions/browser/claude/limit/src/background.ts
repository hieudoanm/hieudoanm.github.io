/**
 * background.ts
 *
 * Intercepts Claude API responses to extract free-tier usage data:
 *   - Daily usage %  + time until daily reset
 *   - Weekly usage % + time until weekly reset
 *
 * Strategy:
 *  1. Use a content script (content.js) to hook fetch() on claude.ai, forwarding
 *     response bodies for rate-limit related endpoints to this service worker.
 *  2. Parse the JSON and store structured data in chrome.storage.local.
 *  3. The popup reads from storage to display the info.
 *
 * Endpoints watched (Claude free tier usage info lives here):
 *   GET /api/organizations/:orgId/rate_limits
 *   POST/GET any endpoint that returns x-ratelimit-* headers or usage objects
 *
 * Storage schema (chrome.storage.local key: "claudeLimit"):
 * {
 *   daily:  { used: number, limit: number, resetAt: number | null },  // resetAt = unix ms
 *   weekly: { used: number, limit: number, resetAt: number | null },
 *   updatedAt: number   // unix ms
 * }
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface PeriodData {
  used: number;
  limit: number;
  resetAt: number | null; // epoch ms, null = unknown
}

interface LimitData {
  daily: PeriodData;
  weekly: PeriodData;
  updatedAt: number;
}

interface RawRateLimit {
  type?: string; // "message_limit" | "token_limit" | …
  window?: string; // "daily" | "weekly"
  limit?: number;
  remaining?: number;
  reset_time?: string; // ISO-8601 string
  // Sometimes nested inside different shapes:
  resets_at?: string;
  messages_remaining?: number;
  messages_limit?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Parse a raw rate-limit object (one entry from the API array). */
function parseRawEntry(
  entry: RawRateLimit
): Partial<{ daily: PeriodData; weekly: PeriodData }> {
  const result: Partial<{ daily: PeriodData; weekly: PeriodData }> = {};

  const window = (entry.window ?? '').toLowerCase();
  if (window !== 'daily' && window !== 'weekly') return result;

  const limit = entry.limit ?? entry.messages_limit ?? 0;
  const remaining = entry.remaining ?? entry.messages_remaining ?? 0;
  const used = Math.max(0, limit - remaining);
  const resetRaw = entry.reset_time ?? entry.resets_at ?? null;
  const resetAt = resetRaw ? new Date(resetRaw).getTime() : null;

  const period: PeriodData = { used, limit, resetAt };
  if (window === 'daily') result.daily = period;
  if (window === 'weekly') result.weekly = period;

  return result;
}

/** Default empty state */
function defaultData(): LimitData {
  return {
    daily: { used: 0, limit: 0, resetAt: null },
    weekly: { used: 0, limit: 0, resetAt: null },
    updatedAt: Date.now(),
  };
}

/** Merge new partial data into existing stored data. */
async function mergeAndStore(
  patch: Partial<{ daily: PeriodData; weekly: PeriodData }>
) {
  const stored = await chrome.storage.local.get('claudeLimit');
  const current: LimitData = (stored.claudeLimit as LimitData) ?? defaultData();

  if (patch.daily) current.daily = patch.daily;
  if (patch.weekly) current.weekly = patch.weekly;
  current.updatedAt = Date.now();

  await chrome.storage.local.set({ claudeLimit: current });
}

// ─── Message handler (receives intercepted payloads from content script) ──────

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== 'CLAUDE_API_RESPONSE') return false;

  const { url, body }: { url: string; body: unknown } = message;

  try {
    handleApiPayload(url, body);
  } catch (e) {
    // Silently swallow parse errors — API shape may vary
    console.debug('[claude-limit] parse error', e);
  }

  sendResponse({ ok: true });
  return false;
});

/** Dispatch to the right parser based on URL pattern. */
function handleApiPayload(url: string, body: unknown) {
  // /api/organizations/:id/rate_limits  → array of rate-limit objects
  if (url.includes('/rate_limits')) {
    parseRateLimitsEndpoint(body);
    return;
  }

  // /api/organizations/:id/usage  → usage summary object
  if (url.includes('/usage')) {
    parseUsageEndpoint(body);
    return;
  }

  // Fallback: try both parsers, first one that yields data wins
  if (!parseRateLimitsEndpoint(body)) {
    parseUsageEndpoint(body);
  }
}

/**
 * Try to parse a rate_limits response.
 * Expected shape: RawRateLimit[]  or  { rate_limits: RawRateLimit[] }
 * Returns true if anything useful was found.
 */
function parseRateLimitsEndpoint(body: unknown): boolean {
  let entries: RawRateLimit[] = [];

  if (Array.isArray(body)) {
    entries = body as RawRateLimit[];
  } else if (body && typeof body === 'object') {
    const b = body as Record<string, unknown>;
    if (Array.isArray(b.rate_limits)) entries = b.rate_limits as RawRateLimit[];
    else if (Array.isArray(b.limits)) entries = b.limits as RawRateLimit[];
  }

  if (entries.length === 0) return false;

  const patch: Partial<{ daily: PeriodData; weekly: PeriodData }> = {};
  for (const entry of entries) {
    const parsed = parseRawEntry(entry);
    if (parsed.daily) patch.daily = parsed.daily;
    if (parsed.weekly) patch.weekly = parsed.weekly;
  }

  if (Object.keys(patch).length === 0) return false;

  mergeAndStore(patch);
  return true;
}

/**
 * Try to parse a usage endpoint response.
 * Claude's usage endpoint can look like:
 * {
 *   "daily": { "messages_used": 5, "messages_limit": 10, "resets_at": "..." },
 *   "weekly": { ... }
 * }
 * or flat fields like:
 * {
 *   "message_count": 5, "message_limit": 10,
 *   "daily_message_count": 3, "daily_message_limit": 10, "daily_reset_at": "..."
 * }
 */
function parseUsageEndpoint(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;

  const patch: Partial<{ daily: PeriodData; weekly: PeriodData }> = {};

  // Nested daily/weekly keys
  if (b.daily && typeof b.daily === 'object') {
    const d = b.daily as Record<string, unknown>;
    patch.daily = {
      used: Number(d.messages_used ?? d.used ?? 0),
      limit: Number(d.messages_limit ?? d.limit ?? 0),
      resetAt: d.resets_at
        ? new Date(String(d.resets_at)).getTime()
        : d.reset_at
          ? new Date(String(d.reset_at)).getTime()
          : null,
    };
  }
  if (b.weekly && typeof b.weekly === 'object') {
    const w = b.weekly as Record<string, unknown>;
    patch.weekly = {
      used: Number(w.messages_used ?? w.used ?? 0),
      limit: Number(w.messages_limit ?? w.limit ?? 0),
      resetAt: w.resets_at
        ? new Date(String(w.resets_at)).getTime()
        : w.reset_at
          ? new Date(String(w.reset_at)).getTime()
          : null,
    };
  }

  // Flat daily_* fields
  if (!patch.daily && b.daily_message_count !== undefined) {
    patch.daily = {
      used: Number(b.daily_message_count),
      limit: Number(b.daily_message_limit ?? 0),
      resetAt: b.daily_reset_at
        ? new Date(String(b.daily_reset_at)).getTime()
        : null,
    };
  }

  // Flat weekly_* fields
  if (!patch.weekly && b.weekly_message_count !== undefined) {
    patch.weekly = {
      used: Number(b.weekly_message_count),
      limit: Number(b.weekly_message_limit ?? 0),
      resetAt: b.weekly_reset_at
        ? new Date(String(b.weekly_reset_at)).getTime()
        : null,
    };
  }

  if (Object.keys(patch).length === 0) return false;

  mergeAndStore(patch);
  return true;
}

// ─── Badge updater ────────────────────────────────────────────────────────────

/** Update the extension badge with the highest usage % across daily/weekly. */
async function updateBadge() {
  const stored = await chrome.storage.local.get('claudeLimit');
  const data: LimitData | undefined = stored.claudeLimit as LimitData;
  if (!data) {
    chrome.action.setBadgeText({ text: '' });
    return;
  }

  const dailyPct =
    data.daily.limit > 0
      ? Math.round((data.daily.used / data.daily.limit) * 100)
      : null;
  const weeklyPct =
    data.weekly.limit > 0
      ? Math.round((data.weekly.used / data.weekly.limit) * 100)
      : null;

  const pct = Math.max(dailyPct ?? 0, weeklyPct ?? 0);
  if (pct === 0 && dailyPct === null && weeklyPct === null) {
    chrome.action.setBadgeText({ text: '' });
    return;
  }

  const text = `${pct}%`;
  const color = pct >= 90 ? '#e53e3e' : pct >= 60 ? '#d69e2e' : '#38a169';

  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color });
}

// ─── Storage change listener → keep badge fresh ───────────────────────────────

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'claudeLimit' in changes) {
    updateBadge();
  }
});

// Init badge on service worker start
updateBadge();

export {};
