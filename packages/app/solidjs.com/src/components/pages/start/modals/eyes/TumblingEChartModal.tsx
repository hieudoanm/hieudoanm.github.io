import { createSignal, onCleanup, onMount } from 'solid-js';

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

export const TumblingEChartModal = (props: { onClose: () => void }) => {
  const chart = generateChart();
  const [current, setCurrent] = createSignal(0);
  const [revealed, setRevealed] = createSignal(false);
  const [answers, setAnswers] = createSignal<Record<number, Direction | null>>(
    {}
  );

  const goTo = (idx: number) => {
    const next = Math.max(0, Math.min(chart.length - 1, idx));
    setCurrent(next);
    setRevealed(false);
  };

  onMount(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && !revealed()) {
        e.preventDefault();
        goTo(current() + 1);
      }
      if (e.key === 'ArrowUp' && !revealed()) {
        e.preventDefault();
        goTo(current() - 1);
      }
      if (chart[current()].count === 1) {
        const map: Record<string, Direction> = {
          ArrowRight: 'right',
          ArrowLeft: 'left',
          ArrowUp: 'up',
          ArrowDown: 'down',
        };
        if (map[e.key]) {
          e.preventDefault();
          setAnswers((a) => ({ ...a, [current()]: map[e.key] }));
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    onCleanup(() => window.removeEventListener('keydown', handleKey));
  });

  const line = chart[current()];
  const isFirst = current() === 0;
  const isLast = current() === chart.length - 1;
  const userAnswer = answers()[current()];
  const correct = userAnswer === line.directions[0];
  const scoredCount = Object.keys(answers()).length;

  return (
    <dialog
      open
      class="modal modal-open"
      style={
        { background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' } as any
      }>
      <div
        data-theme="luxury"
        class="modal-box bg-base-100 relative flex h-[90vh] w-full max-w-4xl flex-col items-center justify-center overflow-hidden p-0">
        <button
          class="btn btn-ghost btn-xs btn-square absolute top-2 right-2 z-20 text-base opacity-60 hover:opacity-100"
          onClick={props.onClose}>
          ✕
        </button>

        <div
          class="pointer-events-none absolute inset-0 z-0"
          style={
            {
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
            } as any
          }
        />

        <div class="via-primary absolute top-0 right-0 left-0 z-10 h-[3px] bg-gradient-to-r from-transparent to-transparent" />

        <div class="absolute top-4 right-0 left-0 z-10 flex justify-center">
          <span class="text-primary/50 text-[0.6rem] font-light tracking-[0.35em] uppercase">
            Tumbling E Visual Acuity Chart
          </span>
        </div>

        <div class="relative z-10 flex w-full flex-col items-center gap-8 px-8 text-center">
          <div class="flex items-center gap-3">
            <div class="bg-primary/30 h-px w-10" />
            <span class="text-primary text-[0.65rem] tracking-[0.3em] uppercase">
              {line.label}
            </span>
            <div class="bg-primary/30 h-px w-10" />
          </div>

          <div class="flex items-center justify-center gap-[0.5em]">
            {line.directions.map((dir, i) => (
              <span
                class={`${line.size} text-base-content inline-block font-serif leading-none font-bold transition-all duration-300 select-none ${
                  ROTATION[dir]
                } ${revealed() ? 'opacity-100' : 'opacity-10'}`}>
                E
              </span>
            ))}
          </div>

          {line.count === 1 && !revealed() && (
            <div class="flex flex-col items-center gap-3">
              <span class="text-primary/40 text-[0.5rem] tracking-[0.3em] uppercase">
                Which way does the E point?
              </span>
              <div class="grid w-32 grid-cols-3 gap-2">
                <div />
                <button
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [current()]: 'up' }))
                  }
                  class={`btn btn-xs rounded-none text-base transition-all duration-200 ${
                    userAnswer === 'up'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary opacity-50 hover:opacity-100'
                  }`}>
                  ↑
                </button>
                <div />
                <button
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [current()]: 'left' }))
                  }
                  class={`btn btn-xs rounded-none text-base transition-all duration-200 ${
                    userAnswer === 'left'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary opacity-50 hover:opacity-100'
                  }`}>
                  ←
                </button>
                <div class="flex items-center justify-center">
                  {userAnswer && (
                    <span
                      class={
                        correct ? 'text-success text-lg' : 'text-error text-lg'
                      }>
                      {correct ? '✓' : '✗'}
                    </span>
                  )}
                </div>
                <button
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [current()]: 'right' }))
                  }
                  class={`btn btn-xs rounded-none text-base transition-all duration-200 ${
                    userAnswer === 'right'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary opacity-50 hover:opacity-100'
                  }`}>
                  →
                </button>
                <div />
                <button
                  onClick={() =>
                    setAnswers((a) => ({ ...a, [current()]: 'down' }))
                  }
                  class={`btn btn-xs rounded-none text-base transition-all duration-200 ${
                    userAnswer === 'down'
                      ? 'btn-primary'
                      : 'btn-outline btn-primary opacity-50 hover:opacity-100'
                  }`}>
                  ↓
                </button>
                <div />
              </div>
            </div>
          )}

          <div class="flex flex-col items-center gap-2">
            {revealed() && (
              <div class="flex gap-3">
                {line.directions.map((dir, i) => (
                  <span class="text-primary text-lg">
                    {DIRECTION_LABELS[dir]}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={() => setRevealed((v) => !v)}
              class="btn btn-outline btn-primary btn-xs rounded-none px-5 text-[0.6rem] tracking-[0.25em] uppercase">
              {revealed() ? 'Hide Answer' : 'Reveal Answer'}
            </button>
          </div>
        </div>

        <div class="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 flex-col gap-2.5">
          {chart.map((c, i) => (
            <button
              onClick={() => goTo(i)}
              title={c.label}
              class={`cursor-pointer rounded-full border-none p-0 transition-all duration-300 ${
                i === current()
                  ? 'bg-primary h-2 w-2'
                  : answers()[i] !== undefined
                    ? 'bg-primary/50 h-1.5 w-1.5'
                    : 'bg-base-content/20 hover:bg-primary/50 h-1.5 w-1.5'
              }`}
            />
          ))}
        </div>

        {scoredCount > 0 && (
          <div class="absolute top-1/2 left-6 z-10 flex -translate-y-1/2 flex-col items-center gap-1">
            <span class="text-primary/40 text-[0.45rem] tracking-[0.2em] uppercase">
              Score
            </span>
            <span class="text-primary text-sm font-light tabular-nums">
              {
                Object.entries(answers()).filter(
                  ([idx, dir]) => dir === chart[Number(idx)].directions[0]
                ).length
              }
              <span class="text-primary/30 text-[0.6rem]">
                {' '}
                / {scoredCount}
              </span>
            </span>
            <span class="text-primary/30 text-[0.45rem] tracking-[0.15em] uppercase">
              correct
            </span>
          </div>
        )}

        <div class="absolute right-0 bottom-8 left-0 z-10 flex items-center justify-center gap-8">
          <button
            onClick={() => goTo(current() - 1)}
            disabled={isFirst}
            class="btn btn-ghost btn-sm text-primary gap-2 rounded-none text-[0.6rem] tracking-[0.2em] uppercase disabled:opacity-20">
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
            class="btn btn-ghost btn-xs text-primary/30 hover:text-primary rounded-none text-[0.5rem] tracking-[0.2em] uppercase">
            Reset
          </button>

          <button
            onClick={() => goTo(current() + 1)}
            disabled={isLast}
            class="btn btn-ghost btn-sm text-primary gap-2 rounded-none text-[0.6rem] tracking-[0.2em] uppercase disabled:opacity-20">
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

        <div class="absolute right-0 bottom-3 left-0 z-10 text-center">
          <span class="text-base-content/20 text-[0.5rem] tracking-[0.2em] uppercase">
            ↑ ↓ to navigate lines · tap arrows to answer direction
          </span>
        </div>

        <div class="via-primary absolute right-0 bottom-0 left-0 z-10 h-[3px] bg-gradient-to-r from-transparent to-transparent" />
      </div>
      <div class="modal-backdrop" onClick={props.onClose} />
    </dialog>
  );
};
