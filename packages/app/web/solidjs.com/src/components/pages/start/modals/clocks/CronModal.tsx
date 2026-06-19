import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { createSignal, createMemo } from 'solid-js';

// --- Utilities -------------------------------------------------------

type Fields = {
  minute: Set<number>;
  hour: Set<number>;
  dayOfMonth: Set<number>;
  month: Set<number>;
  dayOfWeek: Set<number>;
};

const FIELD_KEYS: (keyof Fields)[] = [
  'minute',
  'hour',
  'dayOfMonth',
  'month',
  'dayOfWeek',
];

const FIELD_LABELS: Record<keyof Fields, string> = {
  minute: 'Min',
  hour: 'Hour',
  dayOfMonth: 'Day',
  month: 'Month',
  dayOfWeek: 'DOW',
};

const FIELD_RANGES: Record<keyof Fields, [number, number]> = {
  minute: [0, 59],
  hour: [0, 23],
  dayOfMonth: [1, 31],
  month: [1, 12],
  dayOfWeek: [0, 7],
};

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// --- Parser ----------------------------------------------------------

const parseField = (raw: string, min: number, max: number): Set<number> => {
  const values = new Set<number>();

  for (const token of raw.split(',')) {
    const t = token.trim();
    if (!t) continue;

    const step = t.match(/^(\*|\d+(?:-\d+)?)\/(\d+)$/);
    if (step) {
      let lo = min;
      let hi = max;
      if (step[1] !== '*') {
        const parts = step[1].split('-').map(Number);
        lo = parts[0];
        hi = parts.length === 2 ? parts[1] : max;
      }
      const s = parseInt(step[2], 10);
      for (let i = lo; i <= hi; i += s) values.add(i);
      continue;
    }

    const range = t.match(/^(\d+)-(\d+)$/);
    if (range) {
      const lo = parseInt(range[1], 10);
      const hi = parseInt(range[2], 10);
      for (let i = lo; i <= hi; i++) values.add(i);
      continue;
    }

    const n = parseInt(t, 10);
    if (!isNaN(n) && n >= min && n <= max) values.add(n);
  }

  return values;
};

const parse = (expr: string): Fields | null => {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  try {
    return {
      minute: parseField(parts[0], 0, 59),
      hour: parseField(parts[1], 0, 23),
      dayOfMonth: parseField(parts[2], 1, 31),
      month: parseField(parts[3], 1, 12),
      dayOfWeek: parseField(parts[4], 0, 7),
    };
  } catch {
    return null;
  }
};

// --- Description -----------------------------------------------------

const cronToDescription = (expr: string): string => {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return 'Invalid expression';

  if (parts.every((p) => p === '*')) return 'Every minute';

  if (parts[0].startsWith('*/') && parts.slice(1).every((p) => p === '*'))
    return `Every ${parts[0].slice(2)} minutes`;

  if (parts[0] === '0' && parts.slice(2).every((p) => p === '*'))
    return 'Every hour';

  if (
    parts[0] === '0' &&
    parts[1] === '0' &&
    parts[2] === '*' &&
    parts[3] === '*' &&
    parts[4] === '*'
  )
    return 'At midnight';

  if (
    parts[0] === '0' &&
    parts[1] === '0' &&
    parts[2] === '*' &&
    parts[3] === '*'
  ) {
    const dow = parts[4];
    if (dow === '0' || dow === '7') return 'At midnight, only on Sunday';
    if (dow === '1') return 'At midnight, only on Monday';
    if (dow === '2') return 'At midnight, only on Tuesday';
    if (dow === '3') return 'At midnight, only on Wednesday';
    if (dow === '4') return 'At midnight, only on Thursday';
    if (dow === '5') return 'At midnight, only on Friday';
    if (dow === '6') return 'At midnight, only on Saturday';
    if (dow.includes(',')) {
      const days = dow
        .split(',')
        .map(Number)
        .sort()
        .map((d) => DAY_NAMES[d])
        .join(', ');
      return `At midnight, only on ${days}`;
    }
    return `At midnight, on day ${dow}`;
  }

  const fields = parse(expr);
  if (!fields) return expr;

  const parts_ = [];
  if (fields.minute.size < 60 && fields.minute.size > 0) {
    const sorted = [...fields.minute].sort((a, b) => a - b);
    if (fields.hour.size > 0 && fields.hour.size < 24) {
      parts_.push(
        `At ${sorted.map((m) => `:${String(m).padStart(2, '0')}`).join(',')}`
      );
    } else {
      if (sorted.length === 1) {
        parts_.push(`At minute ${sorted[0]}`);
      } else {
        const d = sorted[1] - sorted[0];
        const step = sorted.every((v, i) => i === 0 || v - sorted[i - 1] === d);
        if (step && d > 1) {
          parts_.push(`Every ${d} minutes`);
        } else {
          parts_.push(`At minutes ${sorted.join(',')}`);
        }
      }
    }
  }

  if (fields.hour.size < 24 && fields.hour.size > 0) {
    const sorted = [...fields.hour].sort((a, b) => a - b);
    if (sorted.length === 1) {
      parts_.push(`past hour ${sorted[0]}`);
    } else {
      const d = sorted[1] - sorted[0];
      const step = sorted.every((v, i) => i === 0 || v - sorted[i - 1] === d);
      if (step && d > 1) {
        parts_.push(`every ${d} hours`);
      } else {
        parts_.push(`past hours ${sorted.join(',')}`);
      }
    }
  }

  if (fields.dayOfMonth.size < 31 && fields.dayOfMonth.size > 0) {
    const sorted = [...fields.dayOfMonth].sort((a, b) => a - b);
    if (sorted.length === 1) {
      parts_.push(`on day ${sorted[0]}`);
    } else {
      parts_.push(`on days ${sorted.join(',')}`);
    }
  }

  if (fields.month.size < 12 && fields.month.size > 0) {
    const sorted = [...fields.month].sort((a, b) => a - b);
    if (sorted.length === 1) {
      parts_.push(`in ${MONTH_NAMES[sorted[0] - 1]}`);
    } else {
      const names = sorted.map((m) => MONTH_NAMES[m - 1]).join(',');
      parts_.push(`in ${names}`);
    }
  }

  if (fields.dayOfWeek.size < 8 && fields.dayOfWeek.size > 0) {
    const dowSet = new Set<number>();
    for (const d of fields.dayOfWeek) {
      if (d === 7) dowSet.add(0);
      else dowSet.add(d);
    }
    if (dowSet.size < 7) {
      const sorted = [...dowSet].sort();
      if (sorted.length === 1) {
        parts_.push(`on ${DAY_NAMES[sorted[0]]}`);
      } else {
        const names = sorted.map((d) => DAY_NAMES[d]).join(',');
        parts_.push(`on ${names}`);
      }
    }
  }

  return parts_.length ? parts_.join(' ') : expr;
};

// --- Next times ------------------------------------------------------

const matches = (f: Fields, d: Date): boolean => {
  if (!f.minute.has(d.getMinutes())) return false;
  if (!f.hour.has(d.getHours())) return false;

  const domWild = f.dayOfMonth.size >= 31;
  const dowWild = f.dayOfWeek.size >= 8;

  if (!domWild && !dowWild) {
    const domOk = f.dayOfMonth.has(d.getDate());
    const dowOk = f.dayOfWeek.has(d.getDay()) || f.dayOfWeek.has(7);
    return domOk || dowOk;
  }

  if (!domWild && !f.dayOfMonth.has(d.getDate())) return false;
  if (!dowWild && !(f.dayOfWeek.has(d.getDay()) || f.dayOfWeek.has(7)))
    return false;
  if (!f.month.has(d.getMonth() + 1)) return false;

  return true;
};

const nextTimes = (expr: string, count = 5): Date[] => {
  const f = parse(expr);
  if (!f) return [];

  const result: Date[] = [];
  const cursor = new Date();
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  let guard = 0;
  while (result.length < count && guard < 525_600) {
    if (matches(f, cursor)) result.push(new Date(cursor));
    cursor.setMinutes(cursor.getMinutes() + 1);
    guard++;
  }

  return result;
};

// --- Presets ---------------------------------------------------------

type Preset = { label: string; value: string };

const PRESETS: Preset[] = [
  { label: 'Every min', value: '* * * * *' },
  { label: 'Every 5m', value: '*/5 * * * *' },
  { label: 'Every 30m', value: '*/30 * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Every day', value: '0 0 * * *' },
  { label: 'Every week', value: '0 0 * * 0' },
  { label: 'Every month', value: '0 0 1 * *' },
];

const formatNext = (d: Date): string => {
  const month = MONTH_NAMES[d.getMonth()];
  const date = d.getDate();
  const day = DAY_NAMES[d.getDay()];
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${day}, ${month} ${date} ${hh}:${mm}`;
};

// --- Component -------------------------------------------------------

export const CronModal = ({ onClose }: { onClose: () => void }) => {
  const [expr, setExpr] = createSignal('* * * * *');
  const [editing, setEditing] = createSignal(false);
  const [minute, setMinute] = createSignal('*');
  const [hour, setHour] = createSignal('*');
  const [dayOfMonth, setDayOfMonth] = createSignal('*');
  const [month, setMonth] = createSignal('*');
  const [dayOfWeek, setDayOfWeek] = createSignal('*');

  const description = createMemo(() => cronToDescription(expr()));
  const next = createMemo(() => nextTimes(expr(), 5));
  const invalid = createMemo(() => parse(expr()) === null);

  const apply = (value: string) => {
    const p = value.split(' ');
    setExpr(value);
    setMinute(p[0]);
    setHour(p[1]);
    setDayOfMonth(p[2]);
    setMonth(p[3]);
    setDayOfWeek(p[4]);
    setEditing(false);
  };

  const sync = (
    m: string,
    h: string,
    dom: string,
    mon: string,
    dow: string
  ) => {
    setExpr(`${m} ${h} ${dom} ${mon} ${dow}`);
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="Cron"
      subtitle={
        invalid()
          ? 'Invalid expression'
          : description() === expr()
            ? ''
            : description()
      }
      size="max-w-lg"
      footerNote="Click outside to close · Edit to customize">
      <div class="mb-3 flex items-center gap-2">
        <button
          onClick={() => setEditing((v: boolean) => !v)}
          class={`btn btn-outline btn-xs font-mono tracking-widest ${editing() ? 'btn-primary' : ''}`}>
          {editing() ? 'Cancel' : 'Edit'}
        </button>
        <div class="flex-1" />
        {!invalid() && next().length > 0 && (
          <span class="text-base-content/30 font-mono text-[10px] tracking-widest">
            Next: {formatNext(next()[0])}
          </span>
        )}
      </div>

      {/* Presets */}
      <div class="mb-3 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.value}
            class={`btn btn-xs font-mono ${expr() === p.value ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => apply(p.value)}>
            {p.label}
          </button>
        ))}
      </div>

      {editing() ? (
        <div class="flex flex-col gap-3">
          <div class="grid grid-cols-5 gap-2">
            {(
              ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'] as const
            ).map((k) => (
              <div key={k} class="flex flex-col gap-1">
                <p class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  {FIELD_LABELS[k]}
                </p>
                <input
                  type="text"
                  value={
                    k === 'minute'
                      ? minute()
                      : k === 'hour'
                        ? hour()
                        : k === 'dayOfMonth'
                          ? dayOfMonth()
                          : k === 'month'
                            ? month()
                            : dayOfWeek()
                  }
                  onChange={(e) => {
                    const v = (e.target as HTMLInputElement).value;
                    if (k === 'minute') {
                      setMinute(v);
                      sync(v, hour(), dayOfMonth(), month(), dayOfWeek());
                    } else if (k === 'hour') {
                      setHour(v);
                      sync(minute(), v, dayOfMonth(), month(), dayOfWeek());
                    } else if (k === 'dayOfMonth') {
                      setDayOfMonth(v);
                      sync(minute(), hour(), v, month(), dayOfWeek());
                    } else if (k === 'month') {
                      setMonth(v);
                      sync(minute(), hour(), dayOfMonth(), v, dayOfWeek());
                    } else {
                      setDayOfWeek(v);
                      sync(minute(), hour(), dayOfMonth(), month(), v);
                    }
                  }}
                  class={`input input-bordered input-sm w-full text-center font-mono ${invalid() ? 'input-error' : ''}`}
                  placeholder="*"
                />
                <p class="text-base-content/20 font-mono text-[8px] tracking-widest">
                  {k === 'minute'
                    ? '0-59'
                    : k === 'hour'
                      ? '0-23'
                      : k === 'dayOfMonth'
                        ? '1-31'
                        : k === 'month'
                          ? '1-12'
                          : '0-7'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Expression display */}
          <div class="bg-base-200 border-base-300 mb-3 rounded-xl border p-4">
            <div class="flex items-center justify-center gap-3">
              {expr()
                .split(' ')
                .map((part, i) => (
                  <div key={i} class="flex flex-col items-center gap-1">
                    <span class="font-mono text-xl leading-none font-black tabular-nums">
                      {part}
                    </span>
                    <span class="text-base-content/30 font-mono text-[9px] tracking-widest uppercase">
                      {FIELD_LABELS[FIELD_KEYS[i]]}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Next execution times */}
          {next().length > 0 && (
            <div class="flex flex-col gap-1">
              <p class="text-base-content/40 mb-1 font-mono text-[10px] tracking-widest uppercase">
                Upcoming executions
              </p>
              <div class="bg-base-200 border-base-300 rounded-lg border p-3">
                {next().map((t: Date, i: number) => (
                  <div
                    key={i}
                    class="font-mono text-sm leading-relaxed tabular-nums">
                    {formatNext(t)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </ModalWrapper>
  );
};
