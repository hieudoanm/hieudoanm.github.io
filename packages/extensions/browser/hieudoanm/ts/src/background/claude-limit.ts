interface PeriodData {
  used: number;
  limit: number;
  resetAt: number | null;
}

interface LimitData {
  daily: PeriodData;
  weekly: PeriodData;
  updatedAt: number;
}

interface RawRateLimit {
  type?: string;
  window?: string;
  limit?: number;
  remaining?: number;
  reset_time?: string;
  resets_at?: string;
  messages_remaining?: number;
  messages_limit?: number;
}

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

function defaultData(): LimitData {
  return {
    daily: { used: 0, limit: 0, resetAt: null },
    weekly: { used: 0, limit: 0, resetAt: null },
    updatedAt: Date.now(),
  };
}

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

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== 'CLAUDE_API_RESPONSE') return false;

  const { url, body }: { url: string; body: unknown } = message;

  try {
    handleApiPayload(url, body);
  } catch (e) {
    console.debug('[claude-limit] parse error', e);
  }

  sendResponse({ ok: true });
  return false;
});

function handleApiPayload(url: string, body: unknown) {
  if (url.includes('/rate_limits')) {
    parseRateLimitsEndpoint(body);
    return;
  }

  if (url.includes('/usage')) {
    parseUsageEndpoint(body);
    return;
  }

  if (!parseRateLimitsEndpoint(body)) {
    parseUsageEndpoint(body);
  }
}

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

function parseUsageEndpoint(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;

  const patch: Partial<{ daily: PeriodData; weekly: PeriodData }> = {};

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

  if (!patch.daily && b.daily_message_count !== undefined) {
    patch.daily = {
      used: Number(b.daily_message_count),
      limit: Number(b.daily_message_limit ?? 0),
      resetAt: b.daily_reset_at
        ? new Date(String(b.daily_reset_at)).getTime()
        : null,
    };
  }

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

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && 'claudeLimit' in changes) {
    updateBadge();
  }
});

updateBadge();

export {};
