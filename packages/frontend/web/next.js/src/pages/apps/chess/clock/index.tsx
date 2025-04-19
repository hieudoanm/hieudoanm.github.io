/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWindowSize } from '@web/hooks/window/use-size';
import { addZero } from '@web/utils/number/utils';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaArrowsRotate, FaPause, FaPlay } from 'react-icons/fa6';

type ChessClockSide = 'white' | 'black';

type ChessClockState = {
  running: boolean;
  current: ChessClockSide | '';
  timeControl: { white: string; black: string };
  milliseconds: { white: number; black: number };
  increment: { white: number; black: number };
};

const ONE_UNIT: number = 10;
const ONE_SECOND: number = 1000;
const ONE_MINUTE: number = 60 * ONE_SECOND;

export const ChessClockPage: NextPage = () => {
  const { width } = useWindowSize();

  const initial: ChessClockState = {
    timeControl: { white: '10+0', black: '10+0' },
    milliseconds: { white: 10 * ONE_MINUTE, black: 10 * ONE_MINUTE },
    increment: { white: 0, black: 0 },
    current: '',
    running: false,
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
        setClock(
          ({
            timeControl,
            current,
            milliseconds,
            increment,
            running,
          }: ChessClockState) => {
            if (current === '')
              return { timeControl, current, milliseconds, increment, running };
            const newCurrentMilliseconds: number =
              milliseconds[current] - ONE_UNIT;

            return {
              current,
              running,
              increment,
              timeControl,
              milliseconds: {
                ...milliseconds,
                [current]: newCurrentMilliseconds,
              },
            };
          }
        );
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

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex h-full flex-row md:flex-col">
        <div className="order-3 md:order-1">
          <div className="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
            <div className="col-span-1 row-span-1">
              <div className="h-full w-full">
                <select
                  name="white"
                  style={{
                    textAlignLast: 'center',
                    writingMode: width > 768 ? 'horizontal-tb' : 'vertical-lr',
                  }}
                  className="h-full w-full appearance-none p-4 text-center"
                  value={clock.timeControl.white}
                  onChange={(event) => {
                    const newTimeControl: string = event.target.value;
                    const timeControl: string[] = newTimeControl.split('+');
                    const newMinutes: number = parseInt(
                      timeControl.at(0) ?? '',
                      10
                    );
                    const newMilliseconds: number = newMinutes * ONE_MINUTE;
                    const newIncrement: number = parseInt(
                      timeControl.at(1) ?? '',
                      10
                    );
                    setClock(
                      ({
                        timeControl,
                        current,
                        milliseconds,
                        increment,
                        running,
                      }: ChessClockState) => {
                        const side = 'white';

                        return {
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
            </div>
            <div className="col-span-1 row-span-1 bg-gray-100 text-gray-900">
              <div className="h-full w-full">
                <select
                  name="black"
                  style={{
                    textAlignLast: 'center',
                    writingMode: width > 768 ? 'horizontal-tb' : 'vertical-lr',
                  }}
                  className="h-full w-full appearance-none p-4 text-center"
                  value={clock.timeControl.black}
                  onChange={(event) => {
                    const newTimeControl: string = event.target.value;
                    const timeControl: string[] = newTimeControl.split('+');
                    const newMinutes: number = parseInt(
                      timeControl.at(0) ?? '',
                      10
                    );
                    const newMilliseconds: number = newMinutes * ONE_MINUTE;
                    const newIncrement: number = parseInt(
                      timeControl.at(1) ?? '',
                      10
                    );
                    setClock(
                      ({
                        timeControl,
                        current,
                        milliseconds,
                        increment,
                        running,
                      }: ChessClockState) => {
                        const side = 'black';

                        return {
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
            </div>
          </div>
        </div>
        <div className="order-2 grow md:order-2">
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
            <div className="col-span-1">
              <button
                type="button"
                className={`${clock.current === 'white' ? 'bg-red-500 text-gray-100' : 'bg-gray-100 text-gray-900'} h-full w-full`}
                onClick={() => click('white')}>
                <div className="rotate-90 text-5xl md:rotate-0 md:text-9xl">
                  {format(clock.milliseconds.white)}
                </div>
              </button>
            </div>
            <div className="col-span-1">
              <button
                type="button"
                className={`${clock.current === 'black' ? 'bg-red-500 text-gray-100' : 'bg-gray-900 text-gray-100'} h-full w-full`}
                onClick={() => click('black')}>
                <div className="rotate-90 text-5xl md:rotate-0 md:text-9xl">
                  {format(clock.milliseconds.black)}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="order-1 grid grid-cols-1 md:order-3 md:grid-cols-2">
          <div className="col-span-1">
            <button
              type="button"
              className="h-full w-full bg-gray-900 p-4 text-center text-gray-100"
              disabled={clock.current === ''}
              onClick={() => {
                if (clock.running) {
                  pause();
                } else if (clock.current !== '') {
                  click(clock.current === 'white' ? 'black' : 'white');
                }
              }}>
              {clock.running ? (
                <FaPause className="mx-auto rotate-90 md:rotate-0" />
              ) : (
                <FaPlay className="mx-auto rotate-90 md:rotate-0" />
              )}
            </button>
          </div>
          <div className="col-span-1">
            <button
              type="button"
              className="h-full w-full bg-gray-100 p-4 text-center text-gray-900"
              onClick={() => setClock(initial)}>
              <FaArrowsRotate className="mx-auto rotate-90 md:rotate-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessClockPage;
