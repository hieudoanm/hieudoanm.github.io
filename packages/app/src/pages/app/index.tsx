import { useQueries, useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { toDataURL } from 'qrcode';
import { FC, useCallback, useEffect, useState } from 'react';
import { v1, v4, v7 } from 'uuid';

// ─── Bookmarks Data ───────────────────────────────────────────────────────────

const bookmarks = [
  {
    label: 'GitHub',
    url: 'https://github.com',
    description: 'Code',
    emoji: '🐙',
    color: '#6e40c9',
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com',
    description: 'Photos',
    emoji: '📷',
    color: '#e1306c',
  },
  {
    label: 'YouTube',
    url: 'https://youtube.com',
    description: 'Videos',
    emoji: '▶',
    color: '#ff0000',
  },
];

// ─── Currency Data ────────────────────────────────────────────────────────────

const CURRENCY_RATES: Record<string, number> = {
  USD: 1.0816,
  JPY: 161.63,
  BGN: 1.9558,
  CZK: 25.121,
  DKK: 7.4602,
  GBP: 0.8594,
  HUF: 403.33,
  PLN: 4.276,
  RON: 4.9752,
  SEK: 11.0098,
  CHF: 0.9584,
  ISK: 147.3,
  NOK: 11.7965,
  TRY: 42.2174,
  AUD: 1.7099,
  BRL: 6.3081,
  CAD: 1.5657,
  CNY: 7.8696,
  HKD: 8.4041,
  IDR: 18009.52,
  ILS: 3.9589,
  INR: 92.5515,
  KRW: 1567.79,
  MXN: 21.5975,
  MYR: 4.7878,
  NZD: 1.8849,
  PHP: 63.516,
  SGD: 1.4638,
  THB: 36.565,
  ZAR: 19.8877,
};

const BASE = 'EUR';
const CURRENCIES = [BASE, ...Object.keys(CURRENCY_RATES)].sort();

const CURRENCY_NAMES: Record<string, string> = {
  AUD: 'Australian Dollar',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Koruna',
  DKK: 'Danish Krone',
  EUR: 'Euro',
  GBP: 'British Pound',
  HKD: 'Hong Kong Dollar',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli Shekel',
  INR: 'Indian Rupee',
  ISK: 'Icelandic Króna',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Złoty',
  RON: 'Romanian Leu',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  USD: 'US Dollar',
  ZAR: 'South African Rand',
};

const toEur = (amount: number, currency: string): number => {
  if (currency === BASE) return amount;
  return amount / CURRENCY_RATES[currency];
};

const fromEur = (amount: number, currency: string): number => {
  if (currency === BASE) return amount;
  return amount * CURRENCY_RATES[currency];
};

const convert = (amount: number, from: string, to: string): number => {
  return fromEur(toEur(amount, from), to);
};

// ─── Timezone & Weather ───────────────────────────────────────────────────────

interface TimeZone {
  label: string;
  tz: string;
  lat: number;
  lon: number;
  favorite: boolean;
}

const timezones: TimeZone[] = [
  {
    label: 'Los Angeles',
    tz: 'America/Los_Angeles',
    lat: 34.0522,
    lon: -118.2437,
    favorite: false,
  },
  {
    label: 'Dallas',
    tz: 'America/Chicago',
    lat: 32.7767,
    lon: -96.797,
    favorite: true,
  },
  {
    label: 'New York',
    tz: 'America/New_York',
    lat: 40.7128,
    lon: -74.006,
    favorite: false,
  },
  {
    label: 'London',
    tz: 'Europe/London',
    lat: 51.5072,
    lon: -0.1276,
    favorite: false,
  },
  {
    label: 'Frankfurt',
    tz: 'Europe/Berlin',
    lat: 50.1109,
    lon: 8.6821,
    favorite: false,
  },
  {
    label: 'Paris',
    tz: 'Europe/Paris',
    lat: 48.8566,
    lon: 2.3522,
    favorite: false,
  },
  {
    label: 'Helsinki',
    tz: 'Europe/Helsinki',
    lat: 60.1695,
    lon: 24.9354,
    favorite: false,
  },
  {
    label: 'Dubai',
    tz: 'Asia/Dubai',
    lat: 25.2048,
    lon: 55.2708,
    favorite: false,
  },
  {
    label: 'Bangkok',
    tz: 'Asia/Bangkok',
    lat: 13.7563,
    lon: 100.5018,
    favorite: false,
  },
  {
    label: 'Ho Chi Minh City',
    tz: 'Asia/Ho_Chi_Minh',
    lat: 10.8231,
    lon: 106.6297,
    favorite: true,
  },
  {
    label: 'Singapore',
    tz: 'Asia/Singapore',
    lat: 1.3521,
    lon: 103.8198,
    favorite: false,
  },
  {
    label: 'Tokyo',
    tz: 'Asia/Tokyo',
    lat: 35.6895,
    lon: 139.6917,
    favorite: false,
  },
  {
    label: 'Sydney',
    tz: 'Australia/Sydney',
    lat: -33.8688,
    lon: 151.2093,
    favorite: false,
  },
  {
    label: 'Melbourne',
    tz: 'Australia/Melbourne',
    lat: -37.8136,
    lon: 144.9631,
    favorite: true,
  },
];

const aiBookmarks = [
  {
    label: 'ChatGPT',
    url: 'https://chatgpt.com',
    description: 'OpenAI',
    emoji: '🤖',
    color: '#10a37f',
  },
  {
    label: 'Claude',
    url: 'https://claude.ai/',
    description: 'Anthropic',
    emoji: '✦',
    color: '#d97757',
  },
  {
    label: 'Perplexity',
    url: 'https://www.perplexity.ai',
    description: 'AI Search',
    emoji: '🔍',
    color: '#20b2aa',
  },
  {
    label: 'Gemini',
    url: 'https://gemini.google.com/app',
    description: 'Google',
    emoji: '✨',
    color: '#4285f4',
  },
  {
    label: 'Grok',
    url: 'https://grok.com',
    description: 'xAI',
    emoji: '⚡',
    color: '#1d9bf0',
  },
  {
    label: 'Copilot',
    url: 'https://copilot.microsoft.com',
    description: 'Microsoft',
    emoji: '🪟',
    color: '#0078d4',
  },
  {
    label: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    description: 'DeepSeek',
    emoji: '🐋',
    color: '#4d6bfe',
  },
  {
    label: 'Mistral',
    url: 'https://chat.mistral.ai',
    description: 'Mistral AI',
    emoji: '🌬️',
    color: '#ff7000',
  },
  {
    label: 'Meta AI',
    url: 'https://www.meta.ai',
    description: 'Meta',
    emoji: '♾️',
    color: '#0082fb',
  },
  {
    label: 'HuggingChat',
    url: 'https://huggingface.co/chat',
    description: 'HuggingFace',
    emoji: '🤗',
    color: '#ff9d00',
  },
  {
    label: 'Poe',
    url: 'https://poe.com',
    description: 'Quora',
    emoji: '💬',
    color: '#8b5cf6',
  },
  {
    label: 'Cohere',
    url: 'https://coral.cohere.com',
    description: 'Cohere',
    emoji: '🌊',
    color: '#39d353',
  },
];

const weatherCodeToText = (code: number): string => {
  const map: Record<number, string> = {
    0: '☀️ Clear sky',
    1: '🌤️ Mainly clear',
    2: '⛅ Partly cloudy',
    3: '☁️ Overcast',
    45: '🌫️ Fog',
    48: '🌫️ Rime fog',
    51: '🌦️ Light drizzle',
    53: '🌦️ Drizzle',
    55: '🌧️ Dense drizzle',
    61: '🌧️ Light rain',
    63: '🌧️ Moderate rain',
    65: '🌧️ Heavy rain',
    71: '❄️ Light snow',
    73: '❄️ Moderate snow',
    75: '❄️ Heavy snow',
    80: '🌧️ Light showers',
    81: '🌧️ Showers',
    82: '🌧️ Heavy showers',
    95: '⛈️ Thunderstorm',
    96: '⛈️ Storm w/ hail',
    99: '🌩️ Heavy storm',
  };
  return map[code] ?? '❓ Unknown';
};

const getTimeInZone = (tz: string) =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: tz,
  }).format(new Date());

// ─── Sub-components ──────────────────────────────────────────────────────────

interface WeatherData {
  temperature_2m: number;
  weather_code: number;
}

const WeatherBadge = ({ weather }: { weather: WeatherData | undefined }) => {
  if (!weather)
    return (
      <span className="badge badge-ghost badge-sm italic opacity-40">…</span>
    );
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="badge badge-outline badge-sm font-mono font-semibold tracking-wider">
        {weather.temperature_2m}°C
      </span>
      <span className="text-xs whitespace-nowrap opacity-50">
        {weatherCodeToText(weather.weather_code)}
      </span>
    </div>
  );
};

const CityCard: FC<{
  label: string;
  time: string;
  weather: WeatherData | undefined;
  index: number;
}> = ({ label, time, weather, index }) => {
  const [hh, mm, ss] = time.split(':');
  return (
    <div
      className="card bg-base-200 border-base-300 hover:border-primary/40 hover:bg-base-300 group border transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}>
      <div className="card-body flex-row items-center justify-between gap-3 p-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-1.5">
            <div className="bg-primary h-1.5 w-1.5 rounded-full opacity-70 transition-opacity group-hover:opacity-100" />
            <h2 className="truncate text-xs font-semibold tracking-widest uppercase opacity-60">
              {label}
            </h2>
          </div>
          <div className="flex items-baseline gap-0.5 font-mono text-lg font-bold tracking-tight tabular-nums">
            <span>{hh}</span>
            <span className="animate-pulse opacity-30">:</span>
            <span>{mm}</span>
            <span className="animate-pulse opacity-30">:</span>
            <span className="text-sm opacity-50">{ss}</span>
          </div>
        </div>
        <div className="shrink-0">
          <WeatherBadge weather={weather} />
        </div>
      </div>
    </div>
  );
};

const AIBookmarkCard: FC<{
  label: string;
  url: string;
  description: string;
  emoji: string;
  color: string;
}> = ({
  label,
  url,
  description,
  emoji,
  color,
}: (typeof aiBookmarks)[number]) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="card bg-base-200 border-base-300 hover:bg-base-300 group border transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
    style={{ '--ai-color': color } as React.CSSProperties}>
    <div className="card-body flex-col items-center justify-center gap-2 p-4 text-center">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-inner transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}22`, border: `1.5px solid ${color}44` }}>
        <span>{emoji}</span>
      </div>
      <div>
        <div className="text-sm font-bold tracking-tight">{label}</div>
        <div className="text-base-content/40 mt-0.5 text-[10px] tracking-widest uppercase">
          {description}
        </div>
      </div>
    </div>
  </a>
);

const BookmarkCard = AIBookmarkCard as FC<(typeof bookmarks)[number]>;

// ─── Countdown Modal ──────────────────────────────────────────────────────────

type TimeLeft = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const diffParts = (from: Date, to: Date): TimeLeft => {
  const start = new Date(from);
  const end = new Date(to);

  let totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const tempDate = new Date(start);
  tempDate.setMonth(tempDate.getMonth() + totalMonths);
  if (tempDate > end) {
    totalMonths -= 1;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const diff = end.getTime() - tempDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { years, months, days, hours, minutes, seconds };
};

const calcProgress = (start: Date, end: Date): number => {
  const now = Date.now();
  const s = start.getTime();
  const e = end.getTime();
  if (now <= s) return 0;
  if (now >= e) return 100;
  return ((now - s) / (e - s)) * 100;
};

const toDateInputValue = (d: Date) => d.toISOString().slice(0, 10);

const CountdownModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const defaultStart = new Date();
  const defaultEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('My Countdown');
  const [titleInput, setTitleInput] = useState('My Countdown');
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);
  const [startInput, setStartInput] = useState(toDateInputValue(defaultStart));
  const [endInput, setEndInput] = useState(toDateInputValue(defaultEnd));
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    diffParts(new Date(), defaultEnd)
  );
  const [progress, setProgress] = useState(() =>
    calcProgress(defaultStart, defaultEnd)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now < start) setTimeLeft(diffParts(now, start));
      else if (now > end) setTimeLeft(diffParts(end, now));
      else setTimeLeft(diffParts(now, end));
      setProgress(calcProgress(start, end));
    }, 1000);
    return () => clearInterval(timer);
  }, [start, end]);

  const handleSave = () => {
    if (!startInput || !endInput) return;
    setStart(new Date(startInput));
    setEnd(new Date(endInput));
    setTitle(titleInput);
    setEditing(false);
  };

  const units: [string, number][] = [
    ['yrs', timeLeft.years],
    ['mo', timeLeft.months],
    ['days', timeLeft.days],
    ['hrs', timeLeft.hours],
    ['min', timeLeft.minutes],
    ['sec', timeLeft.seconds],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-lg border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">Countdown</h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                {title}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing((v) => !v)}
                className={`btn btn-outline btn-xs font-mono tracking-widest ${editing ? 'btn-primary' : ''}`}>
                {editing ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs btn-square text-base">
                ✕
              </button>
            </div>
          </div>

          {/* Edit form */}
          {editing ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  Title
                </p>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="input input-bordered input-sm w-full font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                    Start
                  </p>
                  <input
                    type="date"
                    value={startInput}
                    onChange={(e) => setStartInput(e.target.value)}
                    className="input input-bordered input-sm w-full font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                    End
                  </p>
                  <input
                    type="date"
                    value={endInput}
                    onChange={(e) => setEndInput(e.target.value)}
                    className="input input-bordered input-sm w-full font-mono"
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                className="btn btn-primary btn-sm w-full font-mono tracking-widest">
                Save
              </button>
            </div>
          ) : (
            <>
              {/* Countdown display */}
              <div className="bg-base-200 border-base-300 rounded-xl border p-4">
                <div className="grid grid-cols-6 gap-2 text-center">
                  {units.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1">
                      <span className="font-mono text-2xl leading-none font-black tabular-nums">
                        {String(value).padStart(2, '0')}
                      </span>
                      <span className="text-base-content/30 font-mono text-[9px] tracking-widest uppercase">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="flex flex-col gap-1.5">
                <progress
                  className="progress progress-primary w-full"
                  value={progress}
                  max="100"
                />
                <div className="flex justify-between font-mono text-[10px] opacity-30">
                  <span>{start.toDateString()}</span>
                  <span>{progress.toFixed(1)}%</span>
                  <span>{end.toDateString()}</span>
                </div>
              </div>
            </>
          )}

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Click outside to close · Edit to change title and dates
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── House M.D. Modal ─────────────────────────────────────────────────────────

const HouseModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [name, setName] = useState('House');
  const letters = name.trim().toUpperCase().split('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-lg border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">House, M.D.</h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                Name → Badge
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setName('House')}
                className="btn btn-outline btn-xs font-mono tracking-widest">
                Reset
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs btn-square text-base">
                ✕
              </button>
            </div>
          </div>

          {/* Input */}
          <input
            type="text"
            placeholder="e.g. Gregory"
            className="input input-bordered input-sm w-full font-mono tracking-widest"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Badge display */}
          <div className="bg-base-200 border-base-300 flex min-h-36 items-center justify-center overflow-x-auto rounded-xl border p-6">
            {letters.length > 0 && (
              <div className="relative flex items-center">
                {letters.map((letter, index) => {
                  const isFirst = index === 0;
                  return (
                    <div
                      key={`${letter}-${index}`}
                      className={`border-base-content flex h-16 w-16 items-center justify-center text-4xl font-bold ${isFirst ? 'mr-3 border-4' : 'border-b-4'}`}>
                      {letter}
                    </div>
                  );
                })}
                <div className="absolute -right-12 -bottom-1 font-mono text-xs font-bold tracking-[0.3em] opacity-60">
                  M.D.
                </div>
              </div>
            )}
          </div>

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Click outside to close · First letter gets full border
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── UUID Generator Modal ─────────────────────────────────────────────────────

const UUIDModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [uuids, setUuids] = useState({ v1: v1(), v4: v4(), v7: v7() });
  const [copied, setCopied] = useState<string | null>(null);

  const regenerate = (version: 'v1' | 'v4' | 'v7') => {
    setUuids((prev) => ({
      ...prev,
      [version]: version === 'v1' ? v1() : version === 'v4' ? v4() : v7(),
    }));
  };

  const regenerateAll = () => setUuids({ v1: v1(), v4: v4(), v7: v7() });

  const copy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const items: {
    key: 'v1' | 'v4' | 'v7';
    label: string;
    description: string;
  }[] = [
    { key: 'v1', label: 'UUID v1', description: 'Timestamp + MAC address' },
    { key: 'v4', label: 'UUID v4', description: 'Cryptographically random' },
    { key: 'v7', label: 'UUID v7', description: 'Unix timestamp + random' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-lg border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">
                UUID Generator
              </h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                v1 · v4 · v7
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={regenerateAll}
                className="btn btn-outline btn-xs font-mono tracking-widest">
                ↺ All
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs btn-square text-base">
                ✕
              </button>
            </div>
          </div>

          {/* UUID rows */}
          <div className="flex flex-col gap-3">
            {items.map(({ key, label, description }) => (
              <div
                key={key}
                className="bg-base-200 border-base-300 rounded-xl border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase">
                      {label}
                    </span>
                    <span className="text-base-content/30 ml-2 font-mono text-[10px]">
                      {description}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={uuids[key]}
                    className="input input-bordered input-xs flex-1 font-mono text-xs tracking-wider"
                  />
                  <button
                    onClick={() => regenerate(key)}
                    className="btn btn-ghost btn-xs btn-square"
                    title="Regenerate">
                    ↺
                  </button>
                  <button
                    onClick={() => copy(uuids[key], key)}
                    className={`btn btn-xs font-mono ${copied === key ? 'btn-success' : 'btn-primary'}`}>
                    {copied === key ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Click outside to close · Regenerate any version independently
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── QR Code Modal ────────────────────────────────────────────────────────────

const QRCodeModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [url, setUrl] = useState('https://');
  const [dataURL, setDataURL] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const result = await toDataURL(url, {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        width: 512,
        margin: 1,
        color: {
          dark: '#F5F5F5',
          light: '#171717',
        },
      });
      setDataURL(result);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') generate();
  };

  const downloadQR = () => {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'qrcode.jpg';
    a.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-sm border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">
                QR Code Generator
              </h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                URL → QR
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-xs btn-square text-base">
              ✕
            </button>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com"
              className="input input-bordered input-sm flex-1 font-mono text-xs"
            />
            <button
              onClick={generate}
              disabled={loading || !url.trim()}
              className="btn btn-primary btn-sm font-mono tracking-widest">
              {loading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                'Gen'
              )}
            </button>
          </div>

          {/* QR Preview */}
          {dataURL ? (
            <div className="flex flex-col items-center gap-3">
              <div
                className="border-base-300 aspect-square w-48 overflow-hidden rounded-xl border bg-contain bg-center bg-no-repeat shadow-inner"
                style={{ backgroundImage: `url(${dataURL})` }}
              />
              <button
                onClick={downloadQR}
                className="btn btn-outline btn-sm w-full font-mono tracking-widest">
                ↓ Download JPG
              </button>
            </div>
          ) : (
            <div className="border-base-300 flex aspect-square w-full max-w-[12rem] items-center justify-center self-center rounded-xl border border-dashed">
              <p className="text-base-content/20 font-mono text-[10px] tracking-widest uppercase">
                QR appears here
              </p>
            </div>
          )}

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Press Enter or Gen · Click outside to close
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Kaprekar Modal ───────────────────────────────────────────────────────────

const KAPREKAR_CONSTANT_3 = 495;
const KAPREKAR_CONSTANT_4 = 6174;
const IGNORE_NUMBERS_3 = new Set([111, 222, 333, 444, 555, 666, 777, 888, 999]);
const IGNORE_NUMBERS_4 = new Set([
  1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999,
]);

type Routine = { descending: number; ascending: number; result: number };

const kaprekarRoutine = (
  number: number,
  numbers: Routine[] = [],
  { count = 0, length = 4 }: { count: number; length: number } = {
    count: 0,
    length: 4,
  }
): Routine[] => {
  if (
    IGNORE_NUMBERS_3.has(number) ||
    IGNORE_NUMBERS_4.has(number) ||
    number === KAPREKAR_CONSTANT_3 ||
    number === KAPREKAR_CONSTANT_4 ||
    count >= 8
  )
    return numbers;

  const digits = number.toString().split('').map(Number);
  digits.sort((a, b) => a - b);
  const ascending = digits.join('');
  const reverse = digits.toReversed();
  const descending =
    digits.length < length ? `${reverse.join('')}0` : reverse.join('');
  const result = Number(descending) - Number(ascending);
  return kaprekarRoutine(
    result,
    [
      ...numbers,
      { descending: Number(descending), ascending: Number(ascending), result },
    ],
    { count: count + 1, length }
  );
};

const KaprekarModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [number, setNumber] = useState(KAPREKAR_CONSTANT_4);

  const routines = kaprekarRoutine(number, [], {
    count: 0,
    length: number.toString().length,
  });

  const isIgnored =
    IGNORE_NUMBERS_3.has(number) || IGNORE_NUMBERS_4.has(number);
  const isOutOfRange = number < 100 || number > 9999;
  const isConstant3 = number === KAPREKAR_CONSTANT_3;
  const isConstant4 = number === KAPREKAR_CONSTANT_4;
  const showRoutine =
    !isIgnored && !isOutOfRange && !isConstant3 && !isConstant4;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight')
        setNumber((p) => Math.min(p + 1, 9999));
      else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft')
        setNumber((p) => Math.max(p - 1, 100));
      else if (e.key === ' ') {
        e.preventDefault();
        setNumber(KAPREKAR_CONSTANT_4);
      }
    };
    globalThis.window.addEventListener('keydown', handleKeyDown);
    return () =>
      globalThis.window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-md border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">
                Kaprekar's Routine
              </h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                Constant · 495 · 6174
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNumber(KAPREKAR_CONSTANT_4)}
                className="btn btn-outline btn-xs font-mono tracking-widest">
                Reset
              </button>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs btn-square text-base">
                ✕
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="flex flex-col gap-1.5">
            <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
              Number · 100 – 9999
            </p>
            <div className="join w-full">
              <button
                onClick={() => setNumber((p) => Math.max(p - 1, 100))}
                className="btn btn-outline join-item btn-sm w-10 font-mono text-base">
                −
              </button>
              <input
                type="number"
                min={100}
                max={9999}
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                className="input input-bordered input-sm join-item flex-1 text-center font-mono text-lg font-bold tracking-tight tabular-nums"
              />
              <button
                onClick={() => setNumber((p) => Math.min(p + 1, 9999))}
                className="btn btn-outline join-item btn-sm w-10 font-mono text-base">
                +
              </button>
            </div>
            <p className="text-base-content/20 font-mono text-[10px] tracking-widest uppercase">
              Arrow keys · Space to reset
            </p>
          </div>

          {/* Result area */}
          <div className="bg-base-200 border-base-300 min-h-[10rem] rounded-xl border p-4">
            {isOutOfRange && (
              <p className="text-base-content/40 text-center text-xs">
                Enter a number between 100 and 9999
              </p>
            )}
            {isIgnored && (
              <p className="text-base-content/40 text-center text-xs">
                Number must have at least two different digits
              </p>
            )}
            {(isConstant3 || isConstant4) && (
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-primary font-mono text-3xl font-black tracking-tight">
                  {number}
                </p>
                <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  Kaprekar's Constant · {isConstant3 ? '3' : '4'} digits
                </p>
              </div>
            )}
            {showRoutine && (
              <div className="flex flex-col gap-2">
                {routines.map(({ descending, ascending, result }, i) => {
                  const isKC =
                    result === KAPREKAR_CONSTANT_3 ||
                    result === KAPREKAR_CONSTANT_4;
                  return (
                    <div
                      key={`${descending}-${ascending}-${result}`}
                      className="flex items-center justify-between font-mono text-sm tabular-nums">
                      <span className="text-base-content/30 w-5 text-right text-xs">
                        {i + 1}.
                      </span>
                      <span className="text-base-content/60 w-12 text-right">
                        {descending}
                      </span>
                      <span className="text-base-content/30 px-1">−</span>
                      <span className="text-base-content/60 w-12 text-right">
                        {ascending}
                      </span>
                      <span className="text-base-content/30 px-1">=</span>
                      <span
                        className={`w-12 text-right font-bold ${isKC ? 'text-primary' : ''}`}>
                        {result}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Click outside to close · Every number converges to the constant
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Tools Section ────────────────────────────────────────────────────────────

interface Tool {
  label: string;
  description: string;
  emoji: string;
  color: string;
  onClick: () => void;
}

const ToolCard: FC<Tool> = ({ label, description, emoji, color, onClick }) => (
  <button
    onClick={onClick}
    className="card bg-base-200 border-base-300 hover:bg-base-300 group w-full border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
    <div className="card-body flex-col items-center justify-center gap-2 p-4 text-center">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-inner transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}22`, border: `1.5px solid ${color}44` }}>
        <span>{emoji}</span>
      </div>
      <div>
        <div className="text-sm font-bold tracking-tight">{label}</div>
        <div className="text-base-content/40 mt-0.5 text-[10px] tracking-widest uppercase">
          {description}
        </div>
      </div>
    </div>
  </button>
);

// ─── Right Sidebar Tabs ───────────────────────────────────────────────────────

const CurrencyTab: FC = () => {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('SGD');
  const [amount, setAmount] = useState<string>('1');

  const converted = useCallback(() => {
    const n = Number.parseFloat(amount);
    if (Number.isNaN(n) || n < 0) return null;
    return convert(n, from, to);
  }, [amount, from, to])();

  const quickPairs = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'SGD',
    'CNY',
    'AUD',
    'CAD',
    'CHF',
    'INR',
    'KRW',
    'HKD',
  ];

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="form-control">
        <label className="label py-1">
          <span className="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            Amount
          </span>
        </label>
        <input
          type="number"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered input-sm w-full font-mono text-lg font-bold tracking-tight"
          placeholder="1.00"
        />
      </div>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            From
          </span>
        </label>
        <select
          className="select select-bordered select-sm text-sm font-bold"
          value={from}
          onChange={(e) => setFrom(e.target.value)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c} — {CURRENCY_NAMES[c]}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => {
          setFrom(to);
          setTo(from);
        }}
        className="btn btn-outline btn-sm w-full font-mono tracking-widest">
        ⇅ Swap
      </button>

      <div className="form-control">
        <label className="label py-1">
          <span className="label-text text-base-content/50 text-[10px] tracking-widest uppercase">
            To
          </span>
        </label>
        <select
          className="select select-bordered select-sm text-sm font-bold"
          value={to}
          onChange={(e) => setTo(e.target.value)}>
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c} — {CURRENCY_NAMES[c]}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-base-100 rounded-box border-base-300 border p-3 text-center">
        {converted !== null ? (
          <>
            <p className="text-base-content/40 mb-1 font-mono text-[10px] tracking-widest uppercase">
              {parseFloat(amount).toLocaleString()} {from} =
            </p>
            <p className="text-primary font-mono text-2xl font-bold tracking-tight">
              {converted.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
              <span className="text-base-content/50 ml-1.5 text-base">
                {to}
              </span>
            </p>
            <p className="text-base-content/30 mt-1 font-mono text-[10px]">
              1 {from} ={' '}
              {convert(1, from, to).toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 6,
              })}{' '}
              {to}
            </p>
          </>
        ) : (
          <p className="text-base-content/30 text-xs">Enter a valid amount</p>
        )}
      </div>

      <hr className="border-base-300 my-1" />

      <div>
        <p className="text-base-content/30 mb-2 font-mono text-[10px] tracking-widest uppercase">
          1 {from} vs majors
        </p>
        <div className="flex flex-col gap-1">
          {quickPairs
            .filter((c) => c !== from)
            .map((currency) => {
              const rate = convert(1, from, currency);
              const isTarget = currency === to;
              return (
                <div
                  key={currency}
                  onClick={() => setTo(currency)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-all duration-150 ${
                    isTarget
                      ? 'bg-primary/10 ring-primary/30 ring-1'
                      : 'hover:bg-base-300'
                  }`}>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-xs font-bold tracking-wider ${isTarget ? 'text-primary' : 'opacity-70'}`}>
                      {currency}
                    </span>
                    <span className="text-base-content/30 text-[10px] tracking-wide">
                      {CURRENCY_NAMES[currency]?.split(' ')[0]}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs tabular-nums ${isTarget ? 'text-primary font-bold' : 'opacity-60'}`}>
                    {rate.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4,
                    })}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      <p className="text-base-content/20 pt-1 text-center font-mono text-[10px] tracking-widest uppercase">
        Rates via ECB · 20 Mar 2026
      </p>
    </div>
  );
};

const ClockWeatherTab: FC<{
  times: string[];
  weatherQueries: { data: WeatherData | undefined }[];
}> = ({ times, weatherQueries }) => (
  <div className="flex flex-col gap-2 p-3">
    {timezones
      .map((tz, index) => ({ tz, index }))
      .filter(({ tz }) => tz.favorite)
      .map(({ tz, index }) => (
        <CityCard
          key={tz.label}
          label={tz.label}
          time={times[index]}
          weather={weatherQueries[index].data}
          index={index}
        />
      ))}
    <hr className="border-base-300 my-2" />
    {timezones
      .map((tz, index) => ({ tz, index }))
      .filter(({ tz }) => !tz.favorite)
      .map(({ tz, index }) => (
        <CityCard
          key={tz.label}
          label={tz.label}
          time={times[index]}
          weather={weatherQueries[index].data}
          index={index}
        />
      ))}
    <p className="text-base-content/20 pt-1 text-center font-mono text-[10px] tracking-widest uppercase">
      Weather via Open-Meteo · 10 min
    </p>
  </div>
);

type RightTab = 'clock' | 'currency';

const RightSidebar: FC<{
  times: string[];
  weatherQueries: { data: WeatherData | undefined }[];
}> = ({ times, weatherQueries }) => {
  const [tab, setTab] = useState<RightTab>('clock');

  const tabs: { id: RightTab; label: string }[] = [
    { id: 'clock', label: 'Clock & Weather' },
    { id: 'currency', label: 'Currency' },
  ];

  return (
    <aside className="bg-base-200 border-base-300 flex min-h-0 flex-col overflow-hidden border-l">
      <div className="border-base-300 flex border-b">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 py-3 text-[10px] font-bold tracking-widest uppercase transition-all duration-200 ${
              tab === id
                ? 'border-primary text-primary border-b-2'
                : 'text-base-content/40 hover:text-base-content/70'
            }`}>
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {tab === 'clock' && (
          <ClockWeatherTab times={times} weatherQueries={weatherQueries} />
        )}
        {tab === 'currency' && <CurrencyTab />}
      </div>
    </aside>
  );
};

// ─── Status Sidebar (left) ────────────────────────────────────────────────────

const STATUS_SERVICES: Record<string, Record<string, string>> = {
  atlassian: {
    analytics: 'https://analytics.status.atlassian.com/api/v2/status.json',
    atlas: 'https://atlas.status.atlassian.com/api/v2/status.json',
    compass: 'https://compass.status.atlassian.com/api/v2/status.json',
    confluence: 'https://confluence.status.atlassian.com/api/v2/status.json',
    developer: 'https://developer.status.atlassian.com/api/v2/status.json',
    'jira-service-management':
      'https://jira-service-management.status.atlassian.com/api/v2/status.json',
    'jira-software':
      'https://jira-software.status.atlassian.com/api/v2/status.json',
    guard: 'https://guard.status.atlassian.com/api/v2/status.json',
    opsgenie: 'https://opsgenie.status.atlassian.com/api/v2/status.json',
    partners: 'https://partners.status.atlassian.com/api/v2/status.json',
    support: 'https://support.status.atlassian.com/api/v2/status.json',
    trello: 'https://trello.status.atlassian.com/api/v2/status.json',
  },
  'server(less)': {
    supabase: 'https://status.supabase.com/api/v2/status.json',
    render: 'https://status.render.com/api/v2/status.json',
    flyio: 'https://status.flyio.net/api/v2/status.json',
    cloudflare: 'https://www.cloudflarestatus.com/api/v2/status.json',
    netlify: 'https://www.netlifystatus.com/api/v2/status.json',
    vercel: 'https://www.vercel-status.com/api/v2/status.json',
  },
  crypto: {
    hedera: 'https://status.hedera.com/api/v2/status.json',
    solana: 'https://status.solana.com/api/v2/status.json',
    polygon: 'https://status.polygon.technology/api/v2/status.json',
  },
  'version control': {
    bitbucket: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
    github: 'https://www.githubstatus.com/api/v2/status.json',
    npm: 'https://status.npmjs.org/api/v2/status.json',
  },
};

const ServiceRow: FC<{ service: string; url: string }> = ({ service, url }) => {
  const { isPending, error, data } = useQuery<{
    status: { indicator: string };
  }>({
    queryKey: ['status', service],
    queryFn: () => fetch(url).then((res) => res.json()),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  const isOk = !error && data?.status?.indicator === 'none';
  const isErr = !!error || (!!data && data?.status?.indicator !== 'none');

  return (
    <div className="hover:bg-base-300 group flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors duration-150">
      <span className="text-base-content/70 group-hover:text-base-content text-xs tracking-wide capitalize transition-colors">
        {service.replaceAll('-', ' ')}
      </span>
      <div className="ml-2 shrink-0">
        {isPending ? (
          <div className="bg-base-content/20 h-2 w-2 animate-pulse rounded-full" />
        ) : isOk ? (
          <div className="bg-success h-2 w-2 rounded-full" />
        ) : isErr ? (
          <div className="bg-error h-2 w-2 rounded-full" />
        ) : (
          <div className="bg-warning h-2 w-2 rounded-full" />
        )}
      </div>
    </div>
  );
};

const StatusSidebar = () => {
  const totalCount = Object.values(STATUS_SERVICES).reduce(
    (acc, s) => acc + Object.keys(s).length,
    0
  );

  return (
    <aside className="bg-base-200 border-base-300 flex min-h-0 flex-col overflow-hidden border-r">
      <div className="border-base-300 sticky top-0 z-10 flex items-center justify-between border-b px-4 py-4">
        <h2 className="text-base font-black tracking-tight">
          Service<span className="text-primary"> Status</span>
        </h2>
        <div className="badge badge-xs badge-primary badge-outline font-mono tracking-widest uppercase">
          Live
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-3">
          {Object.entries(STATUS_SERVICES).map(([category, services]) => (
            <div key={category}>
              <p className="text-base-content/30 mb-1.5 px-2 font-mono text-[10px] tracking-widest uppercase">
                {category}
              </p>
              <div className="flex flex-col gap-0.5">
                {Object.entries(services).map(([service, url]) => (
                  <ServiceRow key={service} service={service} url={url} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-base-300 bg-base-200 mt-auto border-t px-4 py-4 text-center font-mono">
        <p className="text-xs tracking-widest uppercase opacity-20">
          {totalCount} services · 2 min refresh
        </p>
      </footer>
    </aside>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const AppPage: NextPage = () => {
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = useState('');
  // Modals
  const [countdownModalOpen, setCountdownModalOpen] = useState(false);
  const [houseModalOpen, setHouseModalOpen] = useState(false);
  const [kaprekarModalOpen, setKaprekarModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [uuidModalOpen, setUuidModalOpen] = useState(false);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
    const interval = setInterval(() => {
      setTimes(timezones.map(({ tz }) => getTimeInZone(tz)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const weatherQueries = useQueries({
    queries: timezones.map(({ lat, lon }) => ({
      queryKey: ['open-meteo', lat, lon],
      queryFn: async () => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        const data = await res.json();
        return data.current as WeatherData;
      },
      staleTime: 1000 * 60 * 10,
    })),
  });

  const tools: Tool[] = [
    {
      label: 'Countdown',
      description: 'Timer',
      emoji: '⏳',
      color: '#06b6d4',
      onClick: () => setCountdownModalOpen(true),
    },
    {
      label: 'House',
      description: 'M.D.',
      emoji: '🏥',
      color: '#ef4444',
      onClick: () => setHouseModalOpen(true),
    },
    {
      label: 'Kaprekar',
      description: 'Routine',
      emoji: '🔢',
      color: '#f59e0b',
      onClick: () => setKaprekarModalOpen(true),
    },
    {
      label: 'QR Code',
      description: 'Generator',
      emoji: '▦',
      color: '#22d3ee',
      onClick: () => setQrModalOpen(true),
    },
    {
      label: 'UUID',
      description: 'Generator',
      emoji: '🔑',
      color: '#a855f7',
      onClick: () => setUuidModalOpen(true),
    },
  ];

  return (
    <div className="bg-base-100 text-base-content h-screen overflow-hidden">
      <div
        className="grid h-full"
        style={{ gridTemplateColumns: '280px 2fr 320px' }}>
        {/* ── Left: Service Status ── */}
        <StatusSidebar />

        {/* ── Center: AI bookmarks + Tools ── */}
        <main className="flex flex-col items-center overflow-y-auto px-8 py-12">
          <p className="text-base-content/30 mb-2 font-mono text-xs tracking-widest uppercase">
            {today}
          </p>
          <h1 className="mb-10 text-3xl font-black tracking-tight">
            Start Page
          </h1>

          {/* AI Assistants */}
          <section aria-label="AI Bookmarks" className="w-full max-w-2xl">
            <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
              AI Assistants
            </p>
            <div className="grid grid-cols-4 gap-4">
              {aiBookmarks.map((bm) => (
                <AIBookmarkCard key={bm.label} {...bm} />
              ))}
            </div>
          </section>

          {/* Bookmarks */}
          <section aria-label="Bookmarks" className="mt-10 w-full max-w-2xl">
            <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Bookmarks
            </p>
            <div className="grid grid-cols-4 gap-4">
              {bookmarks.map((bm) => (
                <BookmarkCard key={bm.label} {...bm} />
              ))}
            </div>
          </section>

          {/* Tools */}
          <section aria-label="Tools" className="mt-10 w-full max-w-2xl">
            <p className="text-base-content/30 mb-4 text-center font-mono text-xs tracking-widest uppercase">
              Tools
            </p>
            <div className="grid grid-cols-4 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.label} {...tool} />
              ))}
            </div>
          </section>
        </main>

        {/* ── Right: Tabbed Clock/Weather + Currency ── */}
        <RightSidebar times={times} weatherQueries={weatherQueries} />
      </div>

      {/* ── Modals ── */}
      {countdownModalOpen && (
        <CountdownModal onClose={() => setCountdownModalOpen(false)} />
      )}
      {houseModalOpen && (
        <HouseModal onClose={() => setHouseModalOpen(false)} />
      )}
      {kaprekarModalOpen && (
        <KaprekarModal onClose={() => setKaprekarModalOpen(false)} />
      )}
      {qrModalOpen && <QRCodeModal onClose={() => setQrModalOpen(false)} />}
      {uuidModalOpen && <UUIDModal onClose={() => setUuidModalOpen(false)} />}
    </div>
  );
};

export default AppPage;
