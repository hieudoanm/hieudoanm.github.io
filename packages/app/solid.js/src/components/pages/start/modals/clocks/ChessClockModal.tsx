import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';
import { createSignal, onCleanup } from 'solid-js';

const GearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.376l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
  </svg>
);
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16">
    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
  </svg>
);
const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16">
    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
  </svg>
);
const ResetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
    />
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
  </svg>
);
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
  </svg>
);

/* ---------------- Utils ---------------- */

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_UNIT = 10;

const addZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);

/* ---------------- Types ---------------- */

type ChessClockSide = 'white' | 'black';

type DelayType = 'none' | 'bronstein' | 'fischer';

type ClockState = {
  running: boolean;
  current: ChessClockSide | '';
  timeControl: { white: string; black: string };
  milliseconds: { white: number; black: number };
  increment: { white: number; black: number };
  delay: number;
  delayType: DelayType;
  moves: number;
  timeout: ChessClockSide | '';
};

/* ---------------- Presets ---------------- */

const PRESETS = {
  Bullet: ['1+0', '1+1', '2+1'],
  Blitz: ['3+0', '3+2', '5+0', '5+2', '5+5'],
  Rapid: ['10+0', '10+5', '15+0', '15+10', '30+0'],
};

export const ChessClockModal = ({ onClose }: { onClose: () => void }) => {
  const initial: ClockState = {
    running: false,
    current: '',
    timeControl: { white: '10+0', black: '10+0' },
    milliseconds: { white: 10 * ONE_MINUTE, black: 10 * ONE_MINUTE },
    increment: { white: 0, black: 0 },
    delay: 0,
    delayType: 'none',
    moves: 0,
    timeout: '',
  };

  const [clock, setClock] = createSignal<ClockState>(initial);
  const [showModal, setShowModal] = createSignal(true);

  let timer: ReturnType<typeof setInterval> | null = null;

  /* Bronstein tracking */
  const delaySpent: { white: number; black: number } = {
    white: 0,
    black: 0,
  };

  /* ---------------- Helpers ---------------- */

  const convert = (tc: string) => {
    const [min, inc] = tc.split('+');
    return {
      milliseconds: Number.parseInt(min) * ONE_MINUTE,
      increment: Number.parseInt(inc),
    };
  };

  const format = (ms: number) => {
    const m = Math.floor(ms / ONE_MINUTE);
    const remain = ((ms % ONE_MINUTE) / 1000).toFixed(1);
    const [s, d] = remain.split('.');
    return `${addZero(m)}:${addZero(Number.parseFloat(s))}.${d}`;
  };

  /* ---------------- Clock Logic ---------------- */

  const startTurn = (side: ChessClockSide) => {
    delaySpent[side] = 0;
  };

  const endTurn = (side: ChessClockSide) => {
    setClock((p) => {
      let refund = 0;

      if (p.delayType === 'bronstein') {
        refund = Math.min(delaySpent[side], p.delay * ONE_SECOND);
      }

      if (p.delayType === 'fischer') {
        refund = p.increment[side] * ONE_SECOND;
      }

      return {
        ...p,
        milliseconds: {
          ...p.milliseconds,
          [side]: p.milliseconds[side] + refund,
        },
        moves: p.moves + (side === 'black' ? 1 : 0),
      };
    });
  };

  const click = (side: ChessClockSide) => {
    const other = side === 'white' ? 'black' : 'white';

    if (clock().current) endTurn(side);
    startTurn(other);

    setClock((p) => ({ ...p, current: other, running: true }));

    clearInterval(timer);

    const t = setInterval(() => {
      setClock((p) => {
        if (!p.current) return p;

        let deduction = ONE_UNIT;

        /* Bronstein delay countdown */
        if (p.delayType === 'bronstein') {
          const spent = delaySpent[p.current];
          if (spent < p.delay * ONE_SECOND) {
            delaySpent[p.current] += ONE_UNIT;
            deduction = 0;
          }
        }

        const newMs = p.milliseconds[p.current] - deduction;

        if (newMs <= 0) {
          clearInterval(t);

          return {
            ...p,
            milliseconds: {
              ...p.milliseconds,
              [p.current]: 0,
            },
            running: false,
            current: '',
            timeout: p.current,
          };
        }

        return {
          ...p,
          milliseconds: {
            ...p.milliseconds,
            [p.current]: newMs,
          },
        };
      });
    }, ONE_UNIT);

    timer = t;
  };

  const pause = () => {
    clearInterval(timer);
    setClock((p) => ({ ...p, running: false }));
  };

  const reset = () => {
    setClock((p) => {
      const w = convert(p.timeControl.white);
      const b = convert(p.timeControl.black);

      return {
        ...initial,
        timeControl: p.timeControl,
        milliseconds: { white: w.milliseconds, black: b.milliseconds },
        increment: { white: w.increment, black: b.increment },
        delay: p.delay,
        delayType: p.delayType,
      };
    });
  };

  /* ---------------- PGN Export ---------------- */

  const exportPGN = () => {
    const pgn = `[TimeControl "${clock().timeControl.white}"]\n[Moves "${clock().moves}"]`;
    const blob = new Blob([pgn], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'clock.pgn';
    a.click();
  };

  onCleanup(() => clearInterval(timer));

  /* ---------------- UI ---------------- */

  return (
    <ModalWrapper
      onClose={onClose}
      title={showModal() ? 'Chess Clock Settings' : 'Chess Clock'}
      subtitle={showModal() ? 'Time Control' : undefined}
      size="max-w-2xl"
      fullHeight>
      {showModal() ? (
        <div class="flex flex-col gap-6 overflow-y-auto p-6">
          <div class="space-y-3">
            {Object.entries(PRESETS).map(([group, list]) => (
              <div key={group}>
                <p class="text-base-content/40 mb-1 font-mono text-[10px] tracking-widest uppercase">
                  {group}
                </p>
                <div class="flex flex-wrap gap-2">
                  {list.map((tc) => (
                    <button
                      type="button"
                      key={tc}
                      class={`btn btn-sm ${clock().timeControl.white === tc && clock().timeControl.black === tc ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => {
                        const c = convert(tc);
                        setClock((p) => ({
                          ...p,
                          timeControl: { white: tc, black: tc },
                          milliseconds: {
                            white: c.milliseconds,
                            black: c.milliseconds,
                          },
                          increment: {
                            white: c.increment,
                            black: c.increment,
                          },
                        }));
                      }}>
                      {tc}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label mb-1 p-0">
                <span class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  White minutes
                </span>
              </label>
              <input
                type="number"
                placeholder="White minutes"
                class="input input-sm input-bordered font-mono"
                value={Math.floor(clock().milliseconds.white / ONE_MINUTE)}
                onChange={(e) => {
                  const m = parseInt(e.target.value || '0');
                  setClock((p) => ({
                    ...p,
                    milliseconds: {
                      ...p.milliseconds,
                      white: m * ONE_MINUTE,
                    },
                  }));
                }}
              />
            </div>

            <div class="form-control">
              <label class="label mb-1 p-0">
                <span class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  Black minutes
                </span>
              </label>
              <input
                type="number"
                placeholder="Black minutes"
                class="input input-sm input-bordered font-mono"
                value={Math.floor(clock().milliseconds.black / ONE_MINUTE)}
                onChange={(e) => {
                  const m = Number.parseInt(e.target.value || '0');
                  setClock((p) => ({
                    ...p,
                    milliseconds: {
                      ...p.milliseconds,
                      black: m * ONE_MINUTE,
                    },
                  }));
                }}
              />
            </div>

            <div class="form-control">
              <label class="label mb-1 p-0">
                <span class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  White increment
                </span>
              </label>
              <input
                type="number"
                placeholder="White increment"
                class="input input-sm input-bordered font-mono"
                value={clock().increment.white}
                onChange={(e) => {
                  const v = Number.parseInt(e.target.value || '0');
                  setClock((p) => ({
                    ...p,
                    increment: { ...p.increment, white: v },
                  }));
                }}
              />
            </div>

            <div class="form-control">
              <label class="label mb-1 p-0">
                <span class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  Black increment
                </span>
              </label>
              <input
                type="number"
                placeholder="Black increment"
                class="input input-sm input-bordered font-mono"
                value={clock().increment.black}
                onChange={(e) => {
                  const v = Number.parseInt(e.target.value || '0');
                  setClock((p) => ({
                    ...p,
                    increment: { ...p.increment, black: v },
                  }));
                }}
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label mb-1 p-0">
                <span class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  Delay Type
                </span>
              </label>
              <select
                class="select select-sm select-bordered w-full font-mono"
                value={clock().delayType}
                onChange={(e) =>
                  setClock((p) => ({
                    ...p,
                    delayType: e.target.value as DelayType,
                  }))
                }>
                <option value="none">No Delay</option>
                <option value="bronstein">Bronstein</option>
                <option value="fischer">Fischer</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label mb-1 p-0">
                <span class="text-base-content/40 font-mono text-[10px] tracking-widest uppercase">
                  Delay (sec)
                </span>
              </label>
              <input
                type="number"
                placeholder="Delay sec"
                class="input input-sm input-bordered font-mono"
                value={clock().delay}
                onChange={(e) =>
                  setClock((p) => ({
                    ...p,
                    delay: Number.parseInt(e.target.value || '0'),
                  }))
                }
              />
            </div>
          </div>

          <button
            class="btn btn-primary mt-2 font-mono tracking-widest"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}>
            START
          </button>
        </div>
      ) : (
        <div class="flex h-full flex-col">
          <div class="border-base-300 flex items-center justify-between border-b px-4 py-3">
            <button
              class="btn btn-ghost btn-sm btn-square"
              onClick={() => {
                pause();
                setShowModal(true);
              }}>
              <GearIcon />
            </button>
            <div class="font-mono text-xs font-bold tracking-widest uppercase opacity-50">
              Move {clock().moves}
            </div>
          </div>

          <div class="flex flex-1 flex-col gap-4 p-4 md:flex-row">
            <button
              class={`flex flex-1 items-center justify-center rounded-2xl p-6 text-6xl font-black tabular-nums transition-all duration-300 ${
                clock().timeout === 'white'
                  ? 'bg-error text-error-content scale-[0.98]'
                  : clock().current === 'white'
                    ? 'bg-secondary text-secondary-content shadow-secondary scale-[1.02] shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)]'
                    : 'bg-base-200 hover:bg-base-300'
              }`}
              onClick={() => click('white')}>
              <div
                class={
                  clock().current === 'black' ? 'rotate-180 md:rotate-0' : ''
                }>
                {format(clock().milliseconds.white)}
              </div>
            </button>

            <button
              class={`flex flex-1 items-center justify-center rounded-2xl p-6 text-6xl font-black tabular-nums transition-all duration-300 ${
                clock().timeout === 'black'
                  ? 'bg-error text-error-content scale-[0.98]'
                  : clock().current === 'black'
                    ? 'bg-primary text-primary-content shadow-primary scale-[1.02] shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)]'
                    : 'bg-base-200 hover:bg-base-300'
              }`}
              onClick={() => click('black')}>
              <div
                class={
                  clock().current === 'white' ? 'rotate-180 md:rotate-0' : ''
                }>
                {format(clock().milliseconds.black)}
              </div>
            </button>
          </div>

          <div class="border-base-300 flex justify-center gap-4 border-t p-4">
            <button
              class="btn btn-circle btn-lg shadow-sm"
              onClick={() => {
                if (clock().timeout) {
                  reset();
                  return;
                }
                if (clock().running) {
                  pause();
                  return;
                }
                if (!clock().running && clock().current !== '') {
                  click(clock().current === 'white' ? 'black' : 'white');
                }
              }}>
              {clock().timeout ? (
                <ResetIcon />
              ) : clock().running ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </button>

            <button class="btn btn-circle btn-lg shadow-sm" onClick={reset}>
              <ResetIcon />
            </button>

            <button class="btn btn-circle btn-lg shadow-sm" onClick={exportPGN}>
              <DownloadIcon />
            </button>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};
