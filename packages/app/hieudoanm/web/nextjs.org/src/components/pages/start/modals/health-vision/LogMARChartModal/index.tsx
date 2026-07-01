import { FC, useCallback, useEffect, useState } from 'react';

import { generateChart } from './utils/chart';

export const LogMARChartModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [chart] = useState(generateChart);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [scores, setScores] = useState<Record<number, number>>({});

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(Math.max(0, Math.min(chart.length - 1, idx)));
      setRevealed(false);
    },
    [chart.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(current + 1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, goTo]);

  const line = chart[current];
  const totalScore = Object.entries(scores).reduce(
    (acc, [lineIdx, correct]) => {
      const l = chart[Number(lineIdx)];
      return acc + l.score - (correct * 0.02 - 0.1);
    },
    0
  );
  const scoredLines = Object.keys(scores).length;

  return (
    <dialog
      open
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div
        data-theme="luxury"
        className="modal-box bg-base-100 relative flex h-[90vh] w-full max-w-4xl flex-col items-center justify-center overflow-hidden p-0">
        <button
          className="btn btn-ghost btn-xs btn-square absolute top-2 right-2 z-20 text-base opacity-60 hover:opacity-100"
          onClick={onClose}>
          ✕
        </button>
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <div className="via-primary absolute top-0 right-0 left-0 z-10 h-[3px] bg-gradient-to-r from-transparent to-transparent" />
        <div className="absolute top-4 right-0 left-0 z-10 flex justify-center">
          <span className="text-primary/50 text-[0.6rem] font-light tracking-[0.35em] uppercase">
            LogMAR Visual Acuity Chart
          </span>
        </div>
        <div className="relative z-10 flex w-full flex-col items-center gap-6 px-8 text-center">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="text-primary/40 text-[0.5rem] tracking-[0.25em] uppercase">
                LogMAR
              </span>
              <span className="text-primary text-[1.1rem] font-light tracking-wider tabular-nums">
                {line.logmar}
              </span>
            </div>
            <div className="bg-primary/20 h-6 w-px" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-primary/40 text-[0.5rem] tracking-[0.25em] uppercase">
                Snellen
              </span>
              <span className="text-base-content/60 text-[1.1rem] font-light tracking-wider">
                {line.snellen}
              </span>
            </div>
            <div className="bg-primary/20 h-6 w-px" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-primary/40 text-[0.5rem] tracking-[0.25em] uppercase">
                Line
              </span>
              <span className="text-base-content/60 text-[1.1rem] font-light tracking-wider tabular-nums">
                {current + 1} / {chart.length}
              </span>
            </div>
          </div>
          <div className="flex w-full max-w-xs items-center gap-3">
            <div className="bg-primary/20 h-px flex-1" />
            <div className="bg-primary h-1 w-1 rounded-full" />
            <div className="bg-primary/20 h-px flex-1" />
          </div>
          <div
            className={`${line.size} text-base-content font-serif leading-none font-normal tracking-widest transition-opacity duration-300 select-none ${revealed ? 'opacity-100' : 'opacity-10'}`}>
            {line.letters.split('').join(' ')}
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-primary/40 text-[0.5rem] tracking-[0.3em] uppercase">
              Letters read correctly
            </span>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setScores((s) => ({ ...s, [current]: n }))}
                  className={`btn btn-xs w-8 rounded-none text-[0.65rem] font-light transition-all duration-200 ${scores[current] === n ? 'btn-primary' : 'btn-outline btn-primary opacity-40 hover:opacity-100'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setRevealed((v) => !v)}
            className="btn btn-outline btn-primary btn-xs rounded-none px-5 text-[0.6rem] tracking-[0.25em] uppercase">
            {revealed ? 'Hide Answer' : 'Reveal Answer'}
          </button>
        </div>
        <div className="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 flex-col gap-2">
          {chart.map((c, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={`LogMAR ${c.logmar}`}
              className={`cursor-pointer rounded-full border-none p-0 transition-all duration-300 ${i === current ? 'bg-primary h-2 w-2' : scores[i] !== undefined ? 'bg-primary/50 h-1.5 w-1.5' : 'bg-base-content/20 hover:bg-primary/50 h-1.5 w-1.5'}`}
            />
          ))}
        </div>
        {scoredLines > 0 && (
          <div className="absolute top-1/2 left-6 z-10 flex -translate-y-1/2 flex-col items-center gap-1">
            <span className="text-primary/40 text-[0.45rem] tracking-[0.2em] uppercase">
              Score
            </span>
            <span className="text-primary text-sm font-light tabular-nums">
              {totalScore.toFixed(2)}
            </span>
            <span className="text-primary/30 text-[0.45rem] tracking-[0.15em] uppercase">
              {scoredLines} lines
            </span>
          </div>
        )}
        <div className="absolute right-0 bottom-8 left-0 z-10 flex items-center justify-center gap-8">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="btn btn-ghost btn-sm text-primary gap-2 rounded-none text-[0.6rem] tracking-[0.2em] uppercase disabled:opacity-20">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 12L8 4M8 4L4 8M8 4L12 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Prev
          </button>
          <button
            onClick={() => setScores({})}
            className="btn btn-ghost btn-xs text-primary/30 hover:text-primary rounded-none text-[0.5rem] tracking-[0.2em] uppercase">
            Reset
          </button>
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === chart.length - 1}
            className="btn btn-ghost btn-sm text-primary gap-2 rounded-none text-[0.6rem] tracking-[0.2em] uppercase disabled:opacity-20">
            Next
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 4L8 12M8 12L12 8M8 12L4 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="absolute right-0 bottom-3 left-0 z-10 text-center">
          <span className="text-base-content/20 text-[0.5rem] tracking-[0.2em] uppercase">
            ↑ ↓ arrow keys to navigate · score each line with 0–5
          </span>
        </div>
        <div className="via-primary absolute right-0 bottom-0 left-0 z-10 h-[3px] bg-gradient-to-r from-transparent to-transparent" />
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
LogMARChartModal.displayName = 'LogMARChartModal';
