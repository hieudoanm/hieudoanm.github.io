/* eslint-disable @typescript-eslint/no-explicit-any */
import { addZero } from '@web/utils/number';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaArrowsRotate, FaPause, FaPlay } from 'react-icons/fa6';

type ChessClockSide = 'top' | 'bottom';

type ChessClockState = {
  running: boolean;
  current: ChessClockSide | '';
  milliseconds: { top: number; bottom: number };
  increment: { top: number; bottom: number };
};

export const ChessClockPage: NextPage = () => {
  const oneUnit = 10;

  const initial: ChessClockState = {
    milliseconds: { top: 10 * 60 * 1000, bottom: 10 * 60 * 1000 },
    increment: { top: 0, bottom: 0 },
    current: '',
    running: false,
  };
  const [clock, setClock] = useState<ChessClockState>(initial);

  const [timer, setTimer] = useState<any>(null);

  const click = (side: ChessClockSide) => {
    const otherSide: ChessClockSide = side === 'top' ? 'bottom' : 'top';
    setClock((previousClock) => ({
      ...previousClock,
      current: otherSide,
      running: true,
    }));

    const newTimer = setInterval(() => {
      if (clock.milliseconds.top === 0 || clock.milliseconds.bottom === 0) {
        clearInterval(timer);
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

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const pause = () => {
    setClock({ ...clock, running: false });
    clearInterval(timer);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full flex-row md:flex-col">
        <div className="order-2 grow md:order-1">
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
            <div className="order-2 col-span-1 md:order-1">
              <button
                type="button"
                className={`${clock.current === 'top' ? 'bg-red-500 text-gray-100' : 'bg-gray-100 text-gray-900'} h-full w-full`}
                onClick={() => click('top')}>
                <div className="text-6xl md:text-9xl">
                  {format(clock.milliseconds.top)}
                </div>
              </button>
            </div>
            <div className="order-1 col-span-1 md:order-2">
              <button
                type="button"
                className={`${clock.current === 'bottom' ? 'bg-red-500 text-gray-100' : 'bg-gray-900 text-gray-100'} h-full w-full`}
                onClick={() => click('bottom')}>
                <div className="rotate-180 text-6xl md:rotate-0 md:text-9xl">
                  {format(clock.milliseconds.bottom)}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="order-1 grid grid-cols-1 md:order-2 md:grid-cols-2">
          <div className="order-2 col-span-1 md:order-1">
            <button
              type="button"
              className="h-full w-full bg-gray-900 p-4 text-center text-gray-100"
              disabled={clock.current === ''}
              onClick={() => {
                if (clock.running) {
                  pause();
                } else if (clock.current !== '') {
                  click(clock.current === 'top' ? 'bottom' : 'top');
                }
              }}>
              {clock.running ? (
                <FaPause className="mx-auto" />
              ) : (
                <FaPlay className="mx-auto" />
              )}
            </button>
          </div>
          <div className="order-1 col-span-1 md:order-2">
            <button
              type="button"
              className="h-full w-full bg-gray-100 p-4 text-center text-gray-900"
              onClick={() => setClock(initial)}>
              <FaArrowsRotate className="mx-auto text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessClockPage;
