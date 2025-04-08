/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaSolidPause, FaSolidPlay, FaSolidStop } from 'solid-icons/fa';
import { createEffect, createSignal } from 'solid-js';
import { addZero } from '~/utils/number';

enum Mode {
  WORK = 'work',
  REST = 'rest',
  IDLE = 'idle',
}

type Clock = {
  mode: Mode;
  status: boolean;
  display: string;
  remainingSeconds: number;
};

export const WidgetClockPomodoro = () => {
  const oneSecond: number = 1_000;
  const WORK_TIME = 25;
  const REST_TIME = 5;

  const [clock, setClock] = createSignal<Clock>({
    status: false,
    mode: Mode.IDLE,
    remainingSeconds: WORK_TIME * 60,
    display: `${addZero(WORK_TIME)}:00`,
  });

  const [timer, setTimer] = createSignal<any>();

  const start = () => {
    setClock((previous) => ({ ...previous, status: true, mode: Mode.WORK }));

    const newTimer = setInterval(() => {
      if (clock().remainingSeconds === 0) {
        setClock(({ status, mode }: Clock) => {
          const newMode: Mode = mode === Mode.WORK ? Mode.REST : Mode.WORK;
          return {
            status,
            mode: newMode,
            remainingSeconds: WORK_TIME * 60,
            display: `${addZero(WORK_TIME)}:00`,
          };
        });
      } else {
        setClock(
          ({ mode, status, remainingSeconds: currentSeconds }: Clock) => {
            const remainedSeconds = currentSeconds - 1;
            const minutes = addZero(Math.floor(remainedSeconds / 60));
            const newSeconds = addZero(remainedSeconds % 60);
            return {
              mode,
              status,
              display: `${minutes}:${newSeconds}`,
              remainingSeconds: remainedSeconds,
            };
          }
        );
      }
    }, oneSecond);

    setTimer(newTimer);
  };

  const pause = () => {
    setClock((previous) => ({ ...previous, status: false }));
    clearInterval(timer());
  };

  const reset = () => {
    setClock({
      mode: Mode.IDLE,
      status: false,
      remainingSeconds: WORK_TIME * 60,
      display: `${addZero(WORK_TIME)}:00`,
    });
    clearInterval(timer());
  };

  createEffect(() => {
    if (clock().remainingSeconds === 0) {
      setClock(({ status, mode }: Clock) => {
        const newMode = mode === Mode.WORK ? Mode.REST : Mode.WORK;
        const newTime = mode === Mode.WORK ? REST_TIME : WORK_TIME;
        return {
          status,
          mode: newMode,
          remainingSeconds: newTime * 60,
          display: `${addZero(newTime)}:00`,
        };
      });
    }
  });

  createEffect(() => {
    return () => clearInterval(timer());
  });

  return (
    <div class="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <div class="flex h-full items-center">
        <div class="flex w-full flex-col items-center gap-y-4">
          <div class="flex w-full flex-col items-center gap-y-1">
            <p class="text-2xl uppercase">{clock().mode}</p>
            <p class="text-6xl text-red-500">{clock().display}</p>
          </div>
          <div class="flex items-center justify-between gap-4">
            {clock().status ? (
              <button aria-label="pause" type="button" onClick={pause}>
                <FaSolidPause class="text-2xl" />
              </button>
            ) : (
              <button aria-label="start" type="button" onClick={start}>
                <FaSolidPlay class="text-2xl" />
              </button>
            )}
            <button aria-label="reset" type="button" onClick={reset}>
              <FaSolidStop class="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
