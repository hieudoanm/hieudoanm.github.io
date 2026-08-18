import { FC, useCallback, useEffect, useState } from 'react';
import { SNELLEN_LINES, LETTERS, randomLetters, generateChart } from './utils';

export const SnellenChart: FC = () => {
  const [chart] = useState(generateChart);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(chart.length - 1, idx));
      setCurrent(next);
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
  const isFirst = current === 0;
  const isLast = current === chart.length - 1;

  return (
    <div
      data-theme="luxury"
      className="flex h-screen w-full max-w-4xl flex-col p-8">
      <div className="flex w-full items-center justify-center">
        <span className="text-primary/50 text-[0.6rem] font-light tracking-[0.35em] uppercase">
          Snellen Visual Acuity Chart
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 text-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary/30 h-px w-10" />
          <span className="text-primary text-[0.65rem] tracking-[0.3em] uppercase">
            {line.label}
          </span>
          <div className="bg-primary/30 h-px w-10" />
        </div>

        <div
          className={[
            line.size,
            'font-serif leading-none font-normal tracking-widest',
            'text-base-content select-none',
            'transition-opacity duration-300',
            revealed ? 'opacity-100' : 'opacity-10',
          ].join(' ')}>
          {line.letters.split('').join(' ')}
        </div>

        <button
          onClick={() => setRevealed((v) => !v)}
          className="btn btn-outline btn-primary btn-xs rounded-none px-5 text-[0.6rem] tracking-[0.25em] uppercase">
          {revealed ? 'Hide Answer' : 'Reveal Answer'}
        </button>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex gap-2.5">
          {chart.map((c, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={c.label}
              className={[
                'cursor-pointer rounded-full border-none p-0 transition-all duration-300',
                i === current
                  ? 'bg-primary h-2 w-2'
                  : 'bg-base-content/20 hover:bg-primary/50 h-1.5 w-1.5',
              ].join(' ')}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => goTo(current - 1)}
            disabled={isFirst}
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

          <span className="text-base-content/25 text-[0.6rem] tracking-[0.25em] uppercase">
            {current + 1} / {chart.length}
          </span>

          <button
            onClick={() => goTo(current + 1)}
            disabled={isLast}
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

        <span className="text-base-content/20 text-[0.5rem] tracking-[0.2em] uppercase">
          ↑ ↓ arrow keys to navigate
        </span>
      </div>
    </div>
  );
};
SnellenChart.displayName = 'SnellenChart';
