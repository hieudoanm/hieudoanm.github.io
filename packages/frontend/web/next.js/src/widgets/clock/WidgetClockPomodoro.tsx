/* eslint-disable @typescript-eslint/no-explicit-any */
import { addZero } from '@web/utils/number/utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa6';

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

export const WidgetClockPomodoro: NextPage = () => {
  const oneSecond: number = 1_000;
  const WORK_TIME = 25;
  const REST_TIME = 5;

  const [clock, setClock] = useState<Clock>({
    status: false,
    mode: Mode.IDLE,
    remainingSeconds: WORK_TIME * 60,
    display: `${addZero(WORK_TIME)}:00`,
  });

  const [timer, setTimer] = useState<any>();

  const start = () => {
    setClock({ ...clock, status: true, mode: Mode.WORK });

    const newTimer = setInterval(() => {
      if (clock.remainingSeconds === 0) {
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
    setClock({ ...clock, status: false });
    clearInterval(timer);
  };

  const reset = () => {
    setClock({
      mode: Mode.IDLE,
      status: false,
      remainingSeconds: WORK_TIME * 60,
      display: `${addZero(WORK_TIME)}:00`,
    });
    clearInterval(timer);
  };

  useEffect(() => {
    if (clock.remainingSeconds === 0) {
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
  }, [clock, REST_TIME, WORK_TIME]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-gray-900 text-gray-100">
      <div className="flex h-full items-center">
        <div className="flex w-full flex-col items-center gap-y-4">
          <div className="flex w-full flex-col items-center gap-y-1">
            <p className="text-2xl uppercase">{clock.mode}</p>
            <p className="text-6xl text-red-500">{clock.display}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            {clock.status ? (
              <button aria-label="pause" type="button" onClick={pause}>
                <FaPause className="text-2xl" />
              </button>
            ) : (
              <button aria-label="start" type="button" onClick={start}>
                <FaPlay className="text-2xl" />
              </button>
            )}
            <button aria-label="reset" type="button" onClick={reset}>
              <FaStop className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
