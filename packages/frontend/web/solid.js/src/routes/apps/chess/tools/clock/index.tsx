/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSolidArrowsRotate, FaSolidPause, FaSolidPlay } from 'solid-icons/fa';
import { createEffect, createSignal } from 'solid-js';
import { addZero } from '~/utils/number';

type ChessClockSide = 'top' | 'bottom';

type ChessClockState = {
  running: boolean;
  current: ChessClockSide | '';
  milliseconds: { top: number; bottom: number };
  increment: { top: number; bottom: number };
};

export const ChessClockPage = () => {
  const oneUnit = 10;

  const initial: ChessClockState = {
    milliseconds: { top: 10 * 60 * 1000, bottom: 10 * 60 * 1000 },
    increment: { top: 0, bottom: 0 },
    current: '',
    running: false,
  };
  const [clock, setClock] = createSignal<ChessClockState>(initial);

  const [timer, setTimer] = createSignal<any>(null);

  const click = (side: ChessClockSide) => {
    const otherSide: ChessClockSide = side === 'top' ? 'bottom' : 'top';
    setClock((previousClock) => ({
      ...previousClock,
      current: otherSide,
      running: true,
    }));

    const newTimer = setInterval(() => {
      if (clock().milliseconds.top === 0 || clock().milliseconds.bottom === 0) {
        clearInterval(timer());
      } else {
        setClock(
          ({ current, milliseconds, increment, running }: ChessClockState) => {
            if (current === '')
              return { current, milliseconds, increment, running };
            const newCurrentMilliseconds: number =
              milliseconds[current] - oneUnit;

            return {
              current,
              running,
              increment,
              milliseconds: {
                ...milliseconds,
                [current]: newCurrentMilliseconds,
              },
            };
          }
        );
      }
    }, oneUnit);

    setTimer(newTimer);
  };

  const format = (milliseconds: number): string => {
    const minutes: number = Math.floor(milliseconds / (60 * 1000));
    const remainingMilliseconds: string = (
      (milliseconds % (60 * 1000)) /
      1000
    ).toFixed(1);
    const [seconds, ms] = remainingMilliseconds.split('.');
    return `${addZero(minutes)}:${addZero(parseFloat(seconds))}.${ms}`;
  };

  createEffect(() => {
    return () => {
      clearInterval(timer());
    };
  });

  const pause = () => {
    setClock((previous) => ({ ...previous, running: false }));
    clearInterval(timer());
  };

  return (
    <div class="h-screen w-screen overflow-hidden">
      <div class="flex h-full flex-row md:flex-col">
        <div class="order-2 grow md:order-1">
          <div class="grid h-full grid-cols-1 md:grid-cols-2">
            <div class="order-2 col-span-1 md:order-1">
              <button
                type="button"
                class={`${clock().current === 'top' ? 'bg-red-500 text-gray-100' : 'bg-gray-100 text-gray-900'} h-full w-full`}
                onClick={() => click('top')}>
                <div class="text-6xl md:text-9xl">
                  {format(clock().milliseconds.top)}
                </div>
              </button>
            </div>
            <div class="order-1 col-span-1 md:order-2">
              <button
                type="button"
                class={`${clock().current === 'bottom' ? 'bg-red-500 text-gray-100' : 'bg-gray-900 text-gray-100'} h-full w-full`}
                onClick={() => click('bottom')}>
                <div class="rotate-180 text-6xl md:rotate-0 md:text-9xl">
                  {format(clock().milliseconds.bottom)}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="order-1 grid grid-cols-1 md:order-2 md:grid-cols-2">
          <div class="order-2 col-span-1 md:order-1">
            <button
              type="button"
              class="h-full w-full bg-gray-900 p-4 text-center text-gray-100"
              disabled={clock().current === ''}
              onClick={() => {
                if (clock().running) {
                  pause();
                } else if (clock().current !== '') {
                  click(clock().current === 'top' ? 'bottom' : 'top');
                }
              }}>
              {clock().running ? (
                <FaSolidPause class="mx-auto" />
              ) : (
                <FaSolidPlay class="mx-auto" />
              )}
            </button>
          </div>
          <div class="order-1 col-span-1 md:order-2">
            <button
              type="button"
              class="h-full w-full bg-gray-100 p-4 text-center text-gray-900"
              onClick={() => setClock(initial)}>
              <FaSolidArrowsRotate class="mx-auto text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessClockPage;
