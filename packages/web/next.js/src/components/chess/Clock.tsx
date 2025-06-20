/* eslint-disable @typescript-eslint/no-explicit-any */
import { addZero } from '@web/utils/number/utils';
import { ONE_MINUTE, ONE_SECOND } from '@web/utils/time';
import { FC, useEffect, useState } from 'react';
import { FaArrowsRotate, FaMinimize, FaPause, FaPlay } from 'react-icons/fa6';

type ChessClockSide = 'white' | 'black';

type ChessClockState = {
  full: boolean;
  running: boolean;
  current: ChessClockSide | '';
  timeControl: { white: string; black: string };
  milliseconds: { white: number; black: number };
  increment: { white: number; black: number };
};

const ONE_UNIT: number = 10;

export const ChessClock: FC = () => {
  const initial: ChessClockState = {
    full: false,
    running: false,
    current: '',
    timeControl: { white: '10+0', black: '10+0' },
    milliseconds: { white: 10 * ONE_MINUTE, black: 10 * ONE_MINUTE },
    increment: { white: 0, black: 0 },
  };

  const [clock, setClock] = useState<ChessClockState>(initial);

  const [timer, setTimer] = useState<any>(null);

  const click = (side: ChessClockSide) => {
    const otherSide: ChessClockSide = side === 'white' ? 'black' : 'white';
    setClock((previous) => {
      const { milliseconds } = previous;
      const newMilliseconds: number =
        milliseconds[side] + previous.increment[side] * ONE_SECOND;

      return {
        ...previous,
        milliseconds: {
          ...milliseconds,
          [side]: newMilliseconds,
        },
        current: otherSide,
        running: true,
      };
    });

    const newTimer = setInterval(() => {
      if (clock.milliseconds.white === 0 || clock.milliseconds.black === 0) {
        clearInterval(timer);
      } else {
        setClock((previous: ChessClockState) => {
          const {
            full,
            timeControl,
            current,
            milliseconds,
            increment,
            running,
          } = previous;
          if (current === '')
            return {
              full,
              timeControl,
              current,
              milliseconds,
              increment,
              running,
            };

          const newCurrentMilliseconds: number =
            milliseconds[current] - ONE_UNIT;

          return {
            full,
            current,
            running,
            increment,
            timeControl,
            milliseconds: {
              ...milliseconds,
              [current]: newCurrentMilliseconds,
            },
          };
        });
      }
    }, ONE_UNIT);

    setTimer(newTimer);
  };

  const format = (milliseconds: number): string => {
    const minutes: number = Math.floor(milliseconds / ONE_MINUTE);
    const remainingMilliseconds: string = (
      (milliseconds % ONE_MINUTE) /
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

  const convertTimeControlToMillisecondsAndIncrement = (
    timeControl: string
  ) => {
    const timeControls: string[] = timeControl.split('+');
    const newMinutes: number = parseInt(timeControls.at(0) ?? '', 10);
    const milliseconds: number = newMinutes * ONE_MINUTE;
    const increment: number = parseInt(timeControls.at(1) ?? '', 10);
    return { milliseconds, increment };
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setClock((previous) => ({ ...previous, full: true }));
        }}
        className="flex w-full flex-col gap-y-4">
        <div className="flex items-center rounded border border-neutral-800">
          <label htmlFor="white" className="px-4">
            <strong>White</strong>
          </label>
          <select
            id="white"
            name="white"
            style={{ textAlignLast: 'right' }}
            className="grow appearance-none px-4 py-2 text-right"
            value={clock.timeControl.white}
            onChange={(event) => {
              const newTimeControl: string = event.target.value;
              const { milliseconds: newMilliseconds, increment: newIncrement } =
                convertTimeControlToMillisecondsAndIncrement(newTimeControl);
              setClock((previous: ChessClockState) => {
                const {
                  full,
                  timeControl,
                  current,
                  milliseconds,
                  increment,
                  running,
                } = previous;
                const side = 'white';

                return {
                  full,
                  current,
                  running,
                  timeControl: {
                    ...timeControl,
                    [side]: newTimeControl,
                  },
                  increment: { ...increment, [side]: newIncrement },
                  milliseconds: {
                    ...milliseconds,
                    [side]: newMilliseconds,
                  },
                };
              });
            }}>
            <optgroup label="Bullet">
              <option value="1+0">1 + 0</option>
              <option value="1+1">1 + 1</option>
            </optgroup>
            <optgroup label="Blitz">
              <option value="3+0">3 + 0</option>
              <option value="3+2">3 + 2</option>
              <option value="5+0">5 + 0</option>
              <option value="5+5">5 + 5</option>
            </optgroup>
            <optgroup label="Rapid">
              <option value="10+0">10 + 0</option>
              <option value="10+5">10 + 5</option>
              <option value="15+10">15 + 10</option>
              <option value="30+0">30 + 0</option>
              <option value="45+0">45 + 0</option>
              <option value="60+0">60 + 0</option>
            </optgroup>
          </select>
        </div>
        <div className="flex items-center rounded border border-neutral-800">
          <label htmlFor="black" className="px-4">
            <strong>Black</strong>
          </label>
          <select
            name="black"
            style={{ textAlignLast: 'right' }}
            className="grow appearance-none px-4 py-2 text-right"
            value={clock.timeControl.black}
            onChange={(event) => {
              const newTimeControl: string = event.target.value;
              const timeControl: string[] = newTimeControl.split('+');
              const newMinutes: number = parseInt(timeControl.at(0) ?? '', 10);
              const newMilliseconds: number = newMinutes * ONE_MINUTE;
              const newIncrement: number = parseInt(
                timeControl.at(1) ?? '',
                10
              );
              setClock(
                ({
                  full,
                  timeControl,
                  current,
                  milliseconds,
                  increment,
                  running,
                }: ChessClockState) => {
                  const side = 'black';

                  return {
                    full,
                    current,
                    running,
                    timeControl: {
                      ...timeControl,
                      [side]: newTimeControl,
                    },
                    increment: { ...increment, [side]: newIncrement },
                    milliseconds: {
                      ...milliseconds,
                      [side]: newMilliseconds,
                    },
                  };
                }
              );
            }}>
            <optgroup label="Bullet">
              <option value="1+0">1 + 0</option>
              <option value="1+1">1 + 1</option>
            </optgroup>
            <optgroup label="Blitz">
              <option value="3+0">3 + 0</option>
              <option value="3+2">3 + 2</option>
              <option value="5+0">5 + 0</option>
              <option value="5+5">5 + 5</option>
            </optgroup>
            <optgroup label="Rapid">
              <option value="10+0">10 + 0</option>
              <option value="10+5">10 + 5</option>
              <option value="15+10">15 + 10</option>
              <option value="30+0">30 + 0</option>
              <option value="45+0">45 + 0</option>
              <option value="60+0">60 + 0</option>
            </optgroup>
          </select>
        </div>

        <button type="submit" className="rounded bg-red-500 py-2 font-semibold">
          Start
        </button>
      </form>
      <div
        className={`${clock.full ? 'fixed top-0 right-0 bottom-0 left-0 bg-neutral-900' : 'hidden'} h-screen w-screen overflow-hidden`}>
        <div className="flex h-full flex-row md:flex-col">
          <div className="order-3 md:order-1">
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              <div className="col-span-1">
                <div className="flex h-full w-full items-center justify-center p-1 text-center md:p-2">
                  <div className="rotate-90 md:rotate-0">
                    {clock.timeControl.white}
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex h-full w-full items-center justify-center bg-neutral-100 p-1 text-center text-neutral-900 md:p-2">
                  <div className="rotate-90 md:rotate-0">
                    {clock.timeControl.black}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-2 grow md:order-2">
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
              <div className="col-span-1 row-span-1">
                <button
                  type="button"
                  className={`${clock.current === 'white' ? 'bg-red-500 text-neutral-100' : 'bg-neutral-100 text-neutral-900'} h-full w-full`}
                  onClick={() => click('white')}>
                  <div className="rotate-90 text-5xl md:rotate-0 md:text-9xl">
                    {format(clock.milliseconds.white)}
                  </div>
                </button>
              </div>
              <div className="col-span-1 row-span-1">
                <button
                  type="button"
                  className={`${clock.current === 'black' ? 'bg-red-500 text-neutral-100' : 'bg-neutral-900 text-neutral-100'} h-full w-full`}
                  onClick={() => click('black')}>
                  <div className="rotate-90 text-5xl md:rotate-0 md:text-9xl">
                    {format(clock.milliseconds.black)}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="order-1 grid grid-cols-1 md:order-3 md:grid-cols-2">
            <div className="col-span-1 row-span-1">
              <button
                type="button"
                className="h-full w-full bg-neutral-900 p-4 text-center text-neutral-100"
                onClick={() => {
                  if (clock.current === '') {
                    setClock((previous) => ({ ...previous, full: false }));
                  } else if (clock.running) {
                    pause();
                  } else {
                    click(clock.current === 'white' ? 'black' : 'white');
                  }
                }}>
                {clock.current === '' ? (
                  <FaMinimize className="mx-auto rotate-90 md:rotate-0" />
                ) : (
                  <>
                    {clock.running ? (
                      <FaPause className="mx-auto rotate-90 md:rotate-0" />
                    ) : (
                      <FaPlay className="mx-auto rotate-90 md:rotate-0" />
                    )}
                  </>
                )}
              </button>
            </div>
            <div className="col-span-1 row-span-1">
              <button
                type="button"
                className="h-full w-full bg-neutral-100 p-4 text-center text-neutral-900"
                onClick={() =>
                  setClock((previous) => {
                    const { timeControl } = previous;
                    const { white: whiteTimeControl, black: blackTimeControl } =
                      timeControl;
                    const {
                      milliseconds: whiteMilliseconds,
                      increment: whiteIncrement,
                    } =
                      convertTimeControlToMillisecondsAndIncrement(
                        whiteTimeControl
                      );
                    const {
                      milliseconds: blackMilliseconds,
                      increment: blackIncrement,
                    } =
                      convertTimeControlToMillisecondsAndIncrement(
                        blackTimeControl
                      );

                    return {
                      ...initial,
                      full: previous.full,
                      timeControl,
                      milliseconds: {
                        white: whiteMilliseconds,
                        black: blackMilliseconds,
                      },
                      increment: {
                        white: whiteIncrement,
                        black: blackIncrement,
                      },
                    };
                  })
                }>
                <FaArrowsRotate className="mx-auto rotate-90 md:rotate-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
