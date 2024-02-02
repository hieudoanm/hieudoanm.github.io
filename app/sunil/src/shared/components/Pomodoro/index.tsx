import { addZero } from '@sunil/common/utils/add-zero';
import React, { useEffect, useState } from 'react';
import { FaCirclePause, FaCirclePlay, FaCircleStop } from 'react-icons/fa6';

const REST_STATUS: string = 'REST';
const WORK_STATUS: string = 'WORK';
const REST_TIME: number = 5;
const WORK_TIME: number = 25;
const REST_COLOR: string = '#3B82F6';
const WORK_COLOR: string = '#14B8A6';
const IDLE_COLOR: string = '#ffffff';

type Clock = {
  mode: string;
  status: boolean;
  seconds: number;
  display: string;
};

export const Pomodoro: React.FC = () => {
  const seconds = 1000;

  const [clock, setClock] = useState<Clock>({
    status: false,
    mode: WORK_STATUS,
    seconds: WORK_TIME * 60,
    display: `${addZero(WORK_TIME)}:00`,
  });

  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  const start = () => {
    setClock({ ...clock, status: true });

    const newTimer: NodeJS.Timeout = setInterval(() => {
      if (clock.seconds === 0) {
        setClock(({ status, mode }: Clock) => {
          const newMode = mode === WORK_STATUS ? REST_STATUS : WORK_STATUS;
          return {
            status,
            mode: newMode,
            seconds: WORK_TIME * 60,
            display: `${addZero(WORK_TIME)}:00`,
          };
        });
      } else {
        setClock(({ mode, status, seconds: currentSeconds }: Clock) => {
          const remainedSeconds = currentSeconds - 1;
          const minutes = addZero(Math.floor(remainedSeconds / 60));
          const newSeconds = addZero(remainedSeconds % 60);
          return {
            mode,
            status,
            display: `${minutes}:${newSeconds}`,
            seconds: remainedSeconds,
          };
        });
      }
    }, seconds);

    setTimer(newTimer);
  };

  const pause = () => {
    setClock({ ...clock, status: false });
    clearInterval(timer);
  };

  const reset = () => {
    setClock({
      mode: WORK_STATUS,
      status: false,
      seconds: WORK_TIME * 60,
      display: `${addZero(WORK_TIME)}:00`,
    });
    clearInterval(timer);
  };

  useEffect(() => {
    if (clock.seconds === 0) {
      setClock(({ status, mode }: Clock) => {
        const newMode = mode === WORK_STATUS ? REST_STATUS : WORK_STATUS;
        const newTime = mode === WORK_STATUS ? REST_TIME : WORK_TIME;
        return {
          status,
          mode: newMode,
          seconds: newTime * 60,
          display: `${addZero(newTime)}:00`,
        };
      });
    }
  }, [clock]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const newColor: string = clock.mode === WORK_STATUS ? REST_COLOR : WORK_COLOR;
  const backgroundColor: string = clock.status ? newColor : IDLE_COLOR;

  return (
    <div className={`h-full bg-[${backgroundColor}]`}>
      <div className="h-full flex items-center justify-center">
        <div className="flex items-center justify-center border border-gray-200 rounded-full aspect-square bg-white w-20">
          <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
            <p className="uppercase">
              {clock.status ? WORK_STATUS : REST_STATUS}
            </p>
            <p className="text-2xl">{clock.display}</p>
            <div className="flex gap-2 md:gap-4">
              {clock.status ? (
                <button
                  aria-label="pause"
                  type="button"
                  className="w-4 bg-teal-500"
                  onClick={pause}>
                  <FaCirclePause />
                </button>
              ) : (
                <button
                  aria-label="start"
                  type="button"
                  className="w-4 bg-teal-500"
                  onClick={start}>
                  <FaCirclePlay />
                </button>
              )}
              <button
                aria-label="reset"
                type="button"
                className="w-4 bg-teal-500"
                onClick={reset}>
                <FaCircleStop />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
