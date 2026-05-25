import { FC, useCallback, useEffect, useState } from 'react';

const TUMBLING_E_LINES = [
  { size: 'text-[9rem]', count: 1, label: '20/200' },
  { size: 'text-[6rem]', count: 2, label: '20/100' },
  { size: 'text-[4.5rem]', count: 3, label: '20/70' },
  { size: 'text-[3.2rem]', count: 4, label: '20/50' },
  { size: 'text-[2.5rem]', count: 5, label: '20/40' },
  { size: 'text-[1.8rem]', count: 6, label: '20/30' },
  { size: 'text-[1.4rem]', count: 7, label: '20/25' },
  { size: 'text-[1.1rem]', count: 8, label: '20/20' },
  { size: 'text-[0.8rem]', count: 9, label: '20/15' },
  { size: 'text-[0.6rem]', count: 10, label: '20/10' },
];

// 4 orientations: right (0°), down (90°), left (180°), up (270°)
type Direction = 'right' | 'down' | 'left' | 'up';
const DIRECTIONS: Direction[] = ['right', 'down', 'left', 'up'];

const DIRECTION_LABELS: Record<Direction, string> = {
  right: '→',
  down: '↓',
  left: '←',
  up: '↑',
};

const ROTATION: Record<Direction, string> = {
  right: 'rotate-0',
  down: 'rotate-90',
  left: 'rotate-180',
  up: '-rotate-90',
};

function randomDirections(count: number): Direction[] {
  return Array.from(
    { length: count },
    () => DIRECTIONS[Math.floor(Math.random() * 4)]
  );
}

function generateChart() {
  return TUMBLING_E_LINES.map((line) => ({
    ...line,
    directions: randomDirections(line.count),
  }));
}

export const TumblingEChartModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [chart] = useState(generateChart);
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, Direction | null>>({});

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
      if (e.key === 'ArrowDown' && !revealed) {
        e.preventDefault();
        goTo(current + 1);
      }
      if (e.key === 'ArrowUp' && !revealed) {
        e.preventDefault();
        goTo(current - 1);
      }
      // Arrow keys also map to E direction when on a single-E line
      if (chart[current].count === 1) {
        const map: Record<string, Direction> = {
          ArrowRight: 'right',
          ArrowLeft: 'left',
          ArrowUp: 'up',
          ArrowDown: 'down',
        };
        if (map[e.key]) {
          e.preventDefault();
          setAnswers((a) => ({ ...a, [current]: map[e.key] }));
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [current, goTo, revealed, chart]);

  const line = chart[current];
  const isFirst = current === 0;
  const isLast = current === chart.length - 1;
  const userAnswer = answers[current];
  const correct = userAnswer === line.directions[0];

  // Count correct answers across all lines (for single-E lines only)
  const scoredCount = Object.keys(answers).length;

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
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 z-20"
          onClick={onClose}>
          ✕
        </button>

        {/* Vignette */}
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
            Tumbling E Visual Acuity Chart
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

          {/* E letters row */}
          <div className="flex items-center justify-center gap-[0.5em]">
            {line.directions.map((dir, i) => (
              <span
                key={i}
                className={[
                  line.size,
                  'font-serif leading-none font-bold',
                  'text-base-content select-none',
                  'inline-block transition-all duration-300',
                  ROTATION[dir],
                  revealed ? 'opacity-100' : 'opacity-10',
                ].join(' ')}>
                E
              </span>
            ))}
          </div>

          {/* Answer buttons — direction picker */}
          {line.count === 1 && !revealed && (
            <div className="flex flex-col items-center gap-3">
              <span className="text-primary/40 text-[0.5rem] tracking-[0.3em] uppercase">
                Which way does the E point?
              </span>
              <div className="grid w-32 grid-cols-3 gap-2">
                {/* Up */}
                <div />
                <button
                  onClick={() => setAnswers((a) => ({ ...a, [current]: 'up' }))}
                  className={[
                    'btn btn-xs rounded-none text-base transition-all duration-200',
                    userAnswer === 'up'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary opacity-50 hover:opacity-100',
                  ].join(' ')}>
                  ↑
                </button>
                <div />
                {/* Left / Right */}
                <button
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [current]: 'left' }))
                  }
                  className={[
                    'btn btn-xs rounded-none text-base transition-all duration-200',
                    userAnswer === 'left'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary opacity-50 hover:opacity-100',
                  ].join(' ')}>
                  ←
                </button>
                <div className="flex items-center justify-center">
                  {userAnswer && (
                    <span
                      className={
                        correct ? 'text-success text-lg' : 'text-error text-lg'
                      }>
                      {correct ? '✓' : '✗'}
                    </span>
                  )}
                </div>
                <button
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [current]: 'right' }))
                  }
                  className={[
                    'btn btn-xs rounded-none text-base transition-all duration-200',
                    userAnswer === 'right'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary opacity-50 hover:opacity-100',
                  ].join(' ')}>
                  →
                </button>
                {/* Down */}
                <div />
                <button
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [current]: 'down' }))
                  }
                  className={[
                    'btn btn-xs rounded-none text-base transition-all duration-200',
                    userAnswer === 'down'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary opacity-50 hover:opacity-100',
                  ].join(' ')}>
                  ↓
                </button>
                <div />
              </div>
            </div>
          )}

          {/* Reveal / answer display */}
          <div className="flex flex-col items-center gap-2">
            {revealed && (
              <div className="flex gap-3">
                {line.directions.map((dir, i) => (
                  <span key={i} className="text-primary text-lg">
                    {DIRECTION_LABELS[dir]}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={() => setRevealed((v) => !v)}
              className="btn btn-outline btn-primary btn-xs rounded-none px-5 text-[0.6rem] tracking-[0.25em] uppercase">
              {revealed ? 'Hide Answer' : 'Reveal Answer'}
            </button>
          </div>
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
                  : answers[i] !== undefined
                    ? 'bg-primary/50 h-1.5 w-1.5'
                    : 'bg-base-content/20 hover:bg-primary/50 h-1.5 w-1.5',
              ].join(' ')}
            />
          ))}
        </div>

        {/* Score summary — left side */}
        {scoredCount > 0 && (
          <div className="absolute top-1/2 left-6 z-10 flex -translate-y-1/2 flex-col items-center gap-1">
            <span className="text-primary/40 text-[0.45rem] tracking-[0.2em] uppercase">
              Score
            </span>
            <span className="text-primary text-sm font-light tabular-nums">
              {
                Object.entries(answers).filter(
                  ([idx, dir]) => dir === chart[Number(idx)].directions[0]
                ).length
              }
              <span className="text-primary/30 text-[0.6rem]">
                {' '}
                / {scoredCount}
              </span>
            </span>
            <span className="text-primary/30 text-[0.45rem] tracking-[0.15em] uppercase">
              correct
            </span>
          </div>
        )}

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

          <button
            onClick={() => setAnswers({})}
            className="btn btn-ghost btn-xs text-primary/30 hover:text-primary rounded-none text-[0.5rem] tracking-[0.2em] uppercase">
            Reset
          </button>

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
            ↑ ↓ to navigate lines · tap arrows to answer direction
          </span>
        </div>

        {/* Bottom gold rule */}
        <div className="via-primary absolute right-0 bottom-0 left-0 z-10 h-[3px] bg-gradient-to-r from-transparent to-transparent" />
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
