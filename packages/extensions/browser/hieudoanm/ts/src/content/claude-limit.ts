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

const STORAGE_KEY = 'claude_limit_data';

function loadData(): LimitData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LimitData) : null;
  } catch {
    return null;
  }
}

function saveData(data: LimitData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

function defaultData(): LimitData {
  return {
    daily: { used: 0, limit: 0, resetAt: null },
    weekly: { used: 0, limit: 0, resetAt: null },
    updatedAt: Date.now(),
  };
}

function mergeData(patch: Partial<{ daily: PeriodData; weekly: PeriodData }>) {
  const current = loadData() ?? defaultData();
  if (patch.daily) current.daily = patch.daily;
  if (patch.weekly) current.weekly = patch.weekly;
  current.updatedAt = Date.now();
  saveData(current);
  renderIndicator(current);
}

const WATCHED = ['/rate_limits', '/usage'];

function parseRawEntry(
  entry: Record<string, unknown>
): Partial<{ daily: PeriodData; weekly: PeriodData }> {
  const win = String(entry.window ?? '').toLowerCase();
  if (win !== 'daily' && win !== 'weekly') return {};
  const limit = Number(entry.limit ?? entry.messages_limit ?? 0);
  const remaining = Number(entry.remaining ?? entry.messages_remaining ?? 0);
  const used = Math.max(0, limit - remaining);
  const resetRaw = (entry.reset_time ?? entry.resets_at ?? null) as
    string | null;
  const resetAt = resetRaw ? new Date(resetRaw).getTime() : null;
  const period: PeriodData = { used, limit, resetAt };
  return win === 'daily' ? { daily: period } : { weekly: period };
}

function tryParseArray(body: unknown): boolean {
  const b = body as Record<string, unknown>;
  const entries: Record<string, unknown>[] = Array.isArray(body)
    ? body
    : Array.isArray(b?.rate_limits)
      ? (b.rate_limits as Record<string, unknown>[])
      : Array.isArray(b?.limits)
        ? (b.limits as Record<string, unknown>[])
        : [];
  if (!entries.length) return false;
  const patch: Partial<{ daily: PeriodData; weekly: PeriodData }> = {};
  for (const e of entries) {
    const p = parseRawEntry(e);
    if (p.daily) patch.daily = p.daily;
    if (p.weekly) patch.weekly = p.weekly;
  }
  if (!Object.keys(patch).length) return false;
  mergeData(patch);
  return true;
}

function tryParseObject(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  const patch: Partial<{ daily: PeriodData; weekly: PeriodData }> = {};

  function toPeriod(o: Record<string, unknown>): PeriodData {
    return {
      used: Number(o.messages_used ?? o.used ?? 0),
      limit: Number(o.messages_limit ?? o.limit ?? 0),
      resetAt: o.resets_at
        ? new Date(String(o.resets_at)).getTime()
        : o.reset_at
          ? new Date(String(o.reset_at)).getTime()
          : null,
    };
  }

  if (b.daily && typeof b.daily === 'object')
    patch.daily = toPeriod(b.daily as Record<string, unknown>);
  if (b.weekly && typeof b.weekly === 'object')
    patch.weekly = toPeriod(b.weekly as Record<string, unknown>);
  if (!patch.daily && b.daily_message_count !== undefined)
    patch.daily = {
      used: Number(b.daily_message_count),
      limit: Number(b.daily_message_limit ?? 0),
      resetAt: b.daily_reset_at
        ? new Date(String(b.daily_reset_at)).getTime()
        : null,
    };
  if (!patch.weekly && b.weekly_message_count !== undefined)
    patch.weekly = {
      used: Number(b.weekly_message_count),
      limit: Number(b.weekly_message_limit ?? 0),
      resetAt: b.weekly_reset_at
        ? new Date(String(b.weekly_reset_at)).getTime()
        : null,
    };

  if (!Object.keys(patch).length) return false;
  mergeData(patch);
  return true;
}

function handleBody(url: string, body: unknown) {
  if (url.includes('/rate_limits')) {
    tryParseArray(body);
    return;
  }
  if (url.includes('/usage')) {
    tryParseObject(body);
    return;
  }
  if (!tryParseArray(body)) tryParseObject(body);
}

const _fetch = window.fetch.bind(window);

window.fetch = async function (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const response = await _fetch(input, init);
  const url =
    typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.href
        : (input as Request).url;
  if (WATCHED.some((p) => url.includes(p)) && response.ok)
    response
      .clone()
      .json()
      .then((body: unknown) => handleBody(url, body))
      .catch(() => {});
  return response;
};

function formatReset(resetAt: number | null): string {
  if (resetAt === null) return '?';
  const ms = resetAt - Date.now();
  if (ms <= 0) return 'now';
  const totalMin = Math.ceil(ms / 60_000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h >= 24) {
    const d = Math.floor(h / 24);
    const rh = h % 24;
    return rh > 0 ? `${d}d ${rh}h` : `${d}d`;
  }
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

function pctColor(pct: number): string {
  if (pct >= 90) return '#e05252';
  if (pct >= 60) return '#c9963a';
  return '#6b8f71';
}

function pctStr(d: PeriodData): string {
  if (d.limit === 0) return '—';
  return `${Math.min(100, Math.round((d.used / d.limit) * 100))}%`;
}

const INDICATOR_ID = 'claude-limit-indicator';

function injectStyles() {
  if (document.getElementById('claude-limit-styles')) return;
  const style = document.createElement('style');
  style.id = 'claude-limit-styles';
  style.textContent = `
    #${INDICATOR_ID} {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'SF Mono', 'Fira Code', ui-monospace, monospace;
      font-size: 11px;
      line-height: 1;
      opacity: 0.55;
      transition: opacity 0.15s;
      user-select: none;
      white-space: nowrap;
      cursor: default;
      padding: 0 4px;
    }
    #${INDICATOR_ID}:hover { opacity: 1; }
    .cl-period {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .cl-label {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      opacity: 0.6;
    }
    .cl-pct  { font-weight: 700; font-size: 11px; }
    .cl-reset { font-size: 10px; opacity: 0.6; }
    .cl-sep   { opacity: 0.3; font-size: 10px; }
  `;
  document.head.appendChild(style);
}

function buildIndicator(data: LimitData): HTMLElement {
  const el = document.createElement('div');
  el.id = INDICATOR_ID;

  const dailyPct =
    data.daily.limit > 0
      ? Math.min(100, Math.round((data.daily.used / data.daily.limit) * 100))
      : -1;
  const weeklyPct =
    data.weekly.limit > 0
      ? Math.min(100, Math.round((data.weekly.used / data.weekly.limit) * 100))
      : -1;

  if (dailyPct < 0 && weeklyPct < 0) {
    el.style.opacity = '0.3';
    el.style.fontSize = '10px';
    el.textContent = 'no usage data';
    return el;
  }

  function makePeriod(label: string, d: PeriodData, pct: number) {
    const span = document.createElement('span');
    span.className = 'cl-period';
    const labelEl = document.createElement('span');
    labelEl.className = 'cl-label';
    labelEl.textContent = label;
    const pctEl = document.createElement('span');
    pctEl.className = 'cl-pct';
    pctEl.style.color = pctColor(pct);
    pctEl.textContent = pctStr(d);
    const resetEl = document.createElement('span');
    resetEl.className = 'cl-reset';
    resetEl.textContent = `↻ ${formatReset(d.resetAt)}`;
    span.appendChild(labelEl);
    span.appendChild(pctEl);
    span.appendChild(resetEl);
    return span;
  }

  if (dailyPct >= 0) el.appendChild(makePeriod('D', data.daily, dailyPct));

  if (dailyPct >= 0 && weeklyPct >= 0) {
    const sep = document.createElement('span');
    sep.className = 'cl-sep';
    sep.textContent = '·';
    el.appendChild(sep);
  }

  if (weeklyPct >= 0) el.appendChild(makePeriod('W', data.weekly, weeklyPct));

  return el;
}

function findMountTarget(): Element | null {
  const byId = document.querySelector('[data-testid="input-menu-container"]');
  if (byId) return byId;

  const sendBtn =
    document.querySelector('button[aria-label*="Send"]') ??
    document.querySelector('button[data-testid*="send"]');
  if (sendBtn) {
    let el: Element | null = sendBtn.parentElement;
    for (let i = 0; i < 6 && el; i++) {
      const cs = window.getComputedStyle(el);
      if (
        (cs.display === 'flex' || cs.display === 'inline-flex') &&
        el.children.length > 1
      )
        return el;
      el = el.parentElement;
    }
    return sendBtn.parentElement;
  }

  const editor = document.querySelector('.ProseMirror');
  if (editor) return editor.closest("form, fieldset, [class*='input']");

  return null;
}

function renderIndicator(data: LimitData) {
  injectStyles();
  const existing = document.getElementById(INDICATOR_ID);
  const fresh = buildIndicator(data);
  if (existing) {
    existing.replaceWith(fresh);
    return;
  }

  const target = findMountTarget();
  if (!target) return;
  target.insertBefore(fresh, target.firstChild);
}

function tryMount() {
  const data = loadData();
  if (data && (data.daily.limit > 0 || data.weekly.limit > 0))
    renderIndicator(data);
}

const observer = new MutationObserver(() => {
  if (!document.getElementById(INDICATOR_ID)) tryMount();
});
observer.observe(document.body, { childList: true, subtree: true });

tryMount();
setTimeout(tryMount, 1000);
setTimeout(tryMount, 3000);

setInterval(() => {
  const data = loadData();
  if (data) renderIndicator(data);
}, 60_000);

export {};
