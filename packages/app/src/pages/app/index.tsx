import { BookmarkCard } from '@hieudoanm/components/cards/BookmarkCard';
import { Tool, ToolCard } from '@hieudoanm/components/cards/ToolCard';
import { RightSidebar } from '@hieudoanm/components/sidebars/RightSidebar';
import { StatusSidebar } from '@hieudoanm/components/sidebars/StatusSidebar';
import { aiBookmarks, bookmarks } from '@hieudoanm/data/bookmarks';
import { getTimeInZone, timezones } from '@hieudoanm/data/timezones';
import { WeatherData } from '@hieudoanm/data/weather';
import { FormatStyle, strings } from '@hieudoanm/utils/string';
import { useQueries } from '@tanstack/react-query';
import { NextPage } from 'next';
import { toDataURL } from 'qrcode';
import { FC, useEffect, useState } from 'react';
import { v1, v4, v7 } from 'uuid';

// ─── Sub-components ──────────────────────────────────────────────────────────

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

// ─── String Formatter Modal ───────────────────────────────────────────────────

const formatString = (from: string, style: FormatStyle) =>
  strings(from).format(style);

const STRING_STYLES: { value: FormatStyle; label: string }[] = [
  { value: FormatStyle.Capitalise, label: 'Capitalise' },
  { value: FormatStyle.Deburr, label: 'deburr' },
  { value: FormatStyle.Kebabcase, label: 'kebab-case' },
  { value: FormatStyle.Lowercase, label: 'lowercase' },
  { value: FormatStyle.Snakecase, label: 'snake_case' },
  { value: FormatStyle.Uppercase, label: 'UPPERCASE' },
];

const StringModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [from, setFrom] = useState('Hello, World!');
  const [style, setStyle] = useState<FormatStyle>(FormatStyle.Capitalise);
  const [copied, setCopied] = useState(false);

  const to = formatString(from, style);

  const copy = () => {
    navigator.clipboard.writeText(to);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="card bg-base-100 border-base-300 w-full max-w-2xl border shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="card-body gap-5 p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">
                String Formatter
              </h2>
              <p className="text-base-content/40 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                Transform · Format · Convert
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-xs btn-square text-base">
              ✕
            </button>
          </div>

          {/* Style selector */}
          <div className="flex flex-col gap-1.5">
            <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
              Formatting style
            </p>
            <select
              className="select select-bordered select-sm w-full font-mono text-sm font-bold"
              value={style}
              onChange={(e) => setStyle(e.target.value as FormatStyle)}>
              {STRING_STYLES.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Editors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-200 border-base-300 flex flex-col gap-2 rounded-xl border p-4">
              <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                Input
              </p>
              <textarea
                placeholder="Enter your text..."
                value={from}
                className="textarea textarea-bordered bg-base-100 h-40 w-full resize-none text-sm leading-relaxed"
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="bg-base-200 border-base-300 flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center justify-between">
                <p className="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  Output
                </p>
                <button
                  onClick={copy}
                  className={`btn btn-xs font-mono ${copied ? 'btn-success' : 'btn-ghost border-base-300 border'}`}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <textarea
                value={to}
                readOnly
                placeholder="Formatted result..."
                className="textarea textarea-bordered bg-base-100 h-40 w-full resize-none font-mono text-sm leading-relaxed"
              />
            </div>
          </div>

          <p className="text-base-content/20 text-center font-mono text-[10px] tracking-widest uppercase">
            Click outside to close · Result updates as you type
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

// ─── Page ─────────────────────────────────────────────────────────────────────

const AppPage: NextPage = () => {
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = useState('');
  // Modals
  const [countdownModalOpen, setCountdownModalOpen] = useState<boolean>(false);
  const [houseModalOpen, setHouseModalOpen] = useState<boolean>(false);
  const [kaprekarModalOpen, setKaprekarModalOpen] = useState<boolean>(false);
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);
  const [stringModalOpen, setStringModalOpen] = useState<boolean>(false);
  const [uuidModalOpen, setUuidModalOpen] = useState<boolean>(false);

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
      label: 'String',
      description: 'Formatter',
      emoji: '✏️',
      color: '#10b981',
      onClick: () => setStringModalOpen(true),
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
      {stringModalOpen && (
        <StringModal onClose={() => setStringModalOpen(false)} />
      )}
      {uuidModalOpen && <UUIDModal onClose={() => setUuidModalOpen(false)} />}
    </div>
  );
};

export default AppPage;
