import { createSignal, onCleanup, onMount } from 'solid-js';

const LOGMAR_LINES = [
  { size: 'text-[9rem]', logmar: '1.0', snellen: '20/200', score: 1.0 },
  { size: 'text-[7rem]', logmar: '0.9', snellen: '20/160', score: 0.9 },
  { size: 'text-[5.5rem]', logmar: '0.8', snellen: '20/125', score: 0.8 },
  { size: 'text-[4.2rem]', logmar: '0.7', snellen: '20/100', score: 0.7 },
  { size: 'text-[3.2rem]', logmar: '0.6', snellen: '20/80', score: 0.6 },
  { size: 'text-[2.5rem]', logmar: '0.5', snellen: '20/63', score: 0.5 },
  { size: 'text-[1.9rem]', logmar: '0.4', snellen: '20/50', score: 0.4 },
  { size: 'text-[1.4rem]', logmar: '0.3', snellen: '20/40', score: 0.3 },
  { size: 'text-[1.1rem]', logmar: '0.2', snellen: '20/32', score: 0.2 },
  { size: 'text-[0.8rem]', logmar: '0.1', snellen: '20/25', score: 0.1 },
  { size: 'text-[0.6rem]', logmar: '0.0', snellen: '20/20', score: 0.0 },
  { size: 'text-[0.45rem]', logmar: '-0.1', snellen: '20/16', score: -0.1 },
  { size: 'text-[0.35rem]', logmar: '-0.2', snellen: '20/12', score: -0.2 },
  { size: 'text-[0.27rem]', logmar: '-0.3', snellen: '20/10', score: -0.3 },
];

const LETTERS = 'CDEFHKNPRSVZ';

function randomLetters(count: number): string {
  const pool = LETTERS.split('');
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join('');
}

function generateChart() {
  return LOGMAR_LINES.map((line) => ({
    ...line,
    letters: randomLetters(5),
  }));
}

export const LogMARChartModal = (props: { onClose: () => void }) => {
  const chart = generateChart();
  const [current, setCurrent] = createSignal(0);
  const [revealed, setRevealed] = createSignal(false);
  const [scores, setScores] = createSignal<Record<number, number>>({});

  const goTo = (idx: number) => {
    const next = Math.max(0, Math.min(chart.length - 1, idx));
    setCurrent(next);
    setRevealed(false);
  };

  onMount(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goTo(current() + 1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(current() - 1);
      }
    };
    window.addEventListener('keydown', handleKey);
    onCleanup(() => window.removeEventListener('keydown', handleKey));
  });

  const line = chart[current()];
  const isFirst = current() === 0;
  const isLast = current() === chart.length - 1;

  const totalScore = Object.entries(scores()).reduce(
    (acc, [lineIdx, correct]) => {
      const l = chart[Number(lineIdx)];
      return acc + l.score - (correct * 0.02 - 0.1);
    },
    0
  );

  const scoredLines = Object.keys(scores()).length;

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
            LogMAR Visual Acuity Chart
          </span>
        </div>

        <div class="relative z-10 flex w-full flex-col items-center gap-6 px-8 text-center">
          <div class="flex items-center gap-6">
            <div class="flex flex-col items-center gap-1">
              <span class="text-primary/40 text-[0.5rem] tracking-[0.25em] uppercase">
                LogMAR
              </span>
              <span class="text-primary text-[1.1rem] font-light tracking-wider tabular-nums">
                {line.logmar}
              </span>
            </div>
            <div class="bg-primary/20 h-6 w-px" />
            <div class="flex flex-col items-center gap-1">
              <span class="text-primary/40 text-[0.5rem] tracking-[0.25em] uppercase">
                Snellen
              </span>
              <span class="text-base-content/60 text-[1.1rem] font-light tracking-wider">
                {line.snellen}
              </span>
            </div>
            <div class="bg-primary/20 h-6 w-px" />
            <div class="flex flex-col items-center gap-1">
              <span class="text-primary/40 text-[0.5rem] tracking-[0.25em] uppercase">
                Line
              </span>
              <span class="text-base-content/60 text-[1.1rem] font-light tracking-wider tabular-nums">
                {current() + 1} / {chart.length}
              </span>
            </div>
          </div>

          <div class="flex w-full max-w-xs items-center gap-3">
            <div class="bg-primary/20 h-px flex-1" />
            <div class="bg-primary h-1 w-1 rounded-full" />
            <div class="bg-primary/20 h-px flex-1" />
          </div>

          <div
            class={`${line.size} text-base-content font-serif leading-none font-bold tracking-widest transition-opacity duration-300 select-none ${revealed() ? 'opacity-100' : 'opacity-10'}`}>
            {line.letters.split('').join(' ')}
          </div>

          <div class="flex flex-col items-center gap-3">
            <span class="text-primary/40 text-[0.5rem] tracking-[0.3em] uppercase">
              Letters read correctly
            </span>
            <div class="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <button
                  onClick={() => setScores((s) => ({ ...s, [current()]: n }))}
                  class={`btn btn-xs w-8 rounded-none text-[0.65rem] font-light transition-all duration-200 ${scores()[current()] === n ? 'btn-primary' : 'btn-outline btn-primary opacity-40 hover:opacity-100'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setRevealed((v) => !v)}
            class="btn btn-outline btn-primary btn-xs rounded-none px-5 text-[0.6rem] tracking-[0.25em] uppercase">
            {revealed() ? 'Hide Answer' : 'Reveal Answer'}
          </button>
        </div>

        <div class="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 flex-col gap-2">
          {chart.map((c, i) => (
            <button
              onClick={() => goTo(i)}
              title={`LogMAR ${c.logmar}`}
              class={`cursor-pointer rounded-full border-none p-0 transition-all duration-300 ${
                i === current()
                  ? 'bg-primary h-2 w-2'
                  : scores()[i] !== undefined
                    ? 'bg-primary/50 h-1.5 w-1.5'
                    : 'bg-base-content/20 hover:bg-primary/50 h-1.5 w-1.5'
              }`}
            />
          ))}
        </div>

        {scoredLines > 0 && (
          <div class="absolute top-1/2 left-6 z-10 flex -translate-y-1/2 flex-col items-center gap-1">
            <span class="text-primary/40 text-[0.45rem] tracking-[0.2em] uppercase">
              Score
            </span>
            <span class="text-primary text-sm font-light tabular-nums">
              {totalScore.toFixed(2)}
            </span>
            <span class="text-primary/30 text-[0.45rem] tracking-[0.15em] uppercase">
              {scoredLines} lines
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
            onClick={() => setScores({})}
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
            ↑ ↓ arrow keys to navigate · score each line with 0–5
          </span>
        </div>

        <div class="via-primary absolute right-0 bottom-0 left-0 z-10 h-[3px] bg-gradient-to-r from-transparent to-transparent" />
      </div>
      <div class="modal-backdrop" onClick={props.onClose} />
    </dialog>
  );
};
