import { FC, useCallback, useEffect, useState } from 'react';
import { SNELLEN_LINES, LETTERS, randomLetters, generateChart } from './utils';

export const SnellenChartModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    <dialog
      open
      className="modal modal-open"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div
        data-theme="luxury"
        className="modal-box bg-base-100 relative flex h-[90vh] w-full max-w-4xl flex-col items-center justify-center overflow-hidden p-0">
        {/* Close Button */}
        <button
          className="btn btn-ghost btn-xs btn-square absolute top-2 right-2 z-20 text-base opacity-60 hover:opacity-100"
          onClick={onClose}>
          ✕
        </button>

        {/* Vignette overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* Top gold rule */}
        <div className="via-primary absolute top-0 right-0 left-0 z-10 h-[3px] bg-gradient-to-r from-transparent to-transparent" />

        {/* Header */}
        <div className="absolute top-4 right-0 left-0 z-10 flex justify-center">
          <span className="text-primary/50 text-[0.6rem] font-light tracking-[0.35em] uppercase">
            Snellen Visual Acuity Chart
          </span>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex w-full flex-col items-center gap-8 px-8 text-center">
          {/* Acuity label */}
          <div className="flex items-center gap-3">
            <div className="bg-primary/30 h-px w-10" />
            <span className="text-primary text-[0.65rem] tracking-[0.3em] uppercase">
              {line.label}
            </span>
            <div className="bg-primary/30 h-px w-10" />
          </div>

          {/* Letters */}
          <div
            className={[
              line.size,
              'font-serif leading-none font-bold tracking-widest',
              'text-base-content select-none',
              'transition-opacity duration-300',
              revealed ? 'opacity-100' : 'opacity-10',
            ].join(' ')}>
            {line.letters.split('').join(' ')}
          </div>

          {/* Reveal button */}
          <button
            onClick={() => setRevealed((v) => !v)}
            className="btn btn-outline btn-primary btn-xs rounded-none px-5 text-[0.6rem] tracking-[0.25em] uppercase">
            {revealed ? 'Hide Answer' : 'Reveal Answer'}
          </button>
        </div>

        {/* Dot navigation — right side */}
        <div className="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 flex-col gap-2.5">
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

        {/* Bottom navigation */}
        <div className="absolute right-0 bottom-8 left-0 z-10 flex items-center justify-center gap-8">
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

        {/* Keyboard hint */}
        <div className="absolute right-0 bottom-3 left-0 z-10 text-center">
          <span className="text-base-content/20 text-[0.5rem] tracking-[0.2em] uppercase">
            ↑ ↓ arrow keys to navigate
          </span>
        </div>

        {/* Bottom gold rule */}
        <div className="via-primary absolute right-0 bottom-0 left-0 z-10 h-[3px] bg-gradient-to-r from-transparent to-transparent" />
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
SnellenChartModal.displayName = 'SnellenChartModal';
