import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useEffect, useState } from 'react';

interface TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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

export const CountdownModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    <ModalWrapper
      onClose={onClose}
      title="Countdown"
      subtitle={title}
      size="max-w-lg"
      footerNote="Click outside to close · Edit to change title and dates">
      <button
        onClick={() => setEditing((v) => !v)}
        className={`btn btn-outline btn-xs mb-2 font-mono tracking-widest ${editing ? 'btn-primary' : ''}`}>
        {editing ? 'Cancel' : 'Edit'}
      </button>

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
          <div className="bg-base-200 border-base-300 rounded-xl border p-4">
            <div className="grid grid-cols-6 gap-2 text-center">
              {units.map(([label, value]) => (
                <div key={label} className="flex flex-col items-center gap-1">
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
    </ModalWrapper>
  );
};
CountdownModal.displayName = 'CountdownModal';
