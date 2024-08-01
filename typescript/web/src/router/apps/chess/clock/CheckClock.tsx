import { Layout } from '@web/layout';
import { addZero } from '@web/utils/add-zero';
import { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaPause } from 'react-icons/fa';
import { FaArrowsRotate, FaPlay, FaScrewdriverWrench } from 'react-icons/fa6';

type ChessClockSide = 'top' | 'bottom';

type ChessClockState = {
  running: boolean;
  current: ChessClockSide | '';
  seconds: { top: number; bottom: number };
  increment: { top: number; bottom: number };
};

const options: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 45, 60, 90, 120, 150, 180,
];

export const ChessClock: NextPage = () => {
  const oneSecond = 1_000;

  const initial: ChessClockState = {
    seconds: { top: 10 * 60, bottom: 10 * 60 },
    increment: { top: 0, bottom: 0 },
    current: '',
    running: false,
  };
  const [clock, setClock] = useState<ChessClockState>(initial);
  const [modal, setModal] = useState({
    topTime: 10,
    bottomTime: 10,
    topIncrement: 0,
    bottomIncrement: 0,
  });
  const [timer, setTimer] = useState<any>(null);

  const click = (side: ChessClockSide) => {
    const otherSide: ChessClockSide = side === 'top' ? 'bottom' : 'top';
    setClock((clock) => ({ ...clock, current: otherSide, running: true }));

    const newTimer = setInterval(() => {
      if (clock.seconds.top === 0 || clock.seconds.bottom === 0) {
        clearInterval(timer);
      } else {
        setClock(
          ({ current, seconds, increment, running }: ChessClockState) => {
            if (current === '') return { current, seconds, increment, running };
            const newCurrentSeconds = seconds[current] - 1;

            return {
              current,
              running,
              increment,
              seconds: { ...seconds, [current]: newCurrentSeconds },
            };
          }
        );
      }
    }, oneSecond);

    setTimer(newTimer);
  };

  const format = (seconds: number): string => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${addZero(minutes)}:${addZero(remainingSeconds)}`;
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
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='flex h-full flex-row gap-2 md:flex-col md:gap-4'>
            <div className='order-2 grow md:order-1'>
              <div className='grid h-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-4'>
                <div className='col-span-1'>
                  <button
                    type='button'
                    className={`btn ${clock.current === 'top' ? 'btn-secondary' : 'btn-primary'} h-full w-full`}
                    onClick={() => click('top')}>
                    <div className='rotate-180 text-6xl md:rotate-0 md:text-9xl'>
                      {format(clock.seconds.top)}
                    </div>
                  </button>
                </div>
                <div className='col-span-1'>
                  <button
                    type='button'
                    className={`btn ${clock.current === 'bottom' ? 'btn-secondary' : 'btn-primary'} h-full w-full`}
                    onClick={() => click('bottom')}>
                    <div className='text-6xl md:text-9xl'>
                      {format(clock.seconds.bottom)}
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className='order-1 grid grid-cols-1 gap-2 md:order-2 md:grid-cols-3 md:gap-4'>
              <div className='col-span-1'>
                <button
                  type='button'
                  className='btn btn-primary h-full w-full'
                  disabled={clock.current === ''}
                  onClick={() => {
                    if (clock.running) {
                      pause();
                    } else if (clock.current !== '') {
                      click(clock.current === 'top' ? 'bottom' : 'top');
                    }
                  }}>
                  {clock.running ? <FaPause /> : <FaPlay />}
                </button>
              </div>
              <div className='col-span-1'>
                <button
                  type='button'
                  className='btn btn-primary h-full w-full'
                  onClick={() => setClock(initial)}>
                  <FaArrowsRotate />
                </button>
              </div>
              <div className='col-span-1'>
                <button
                  type='button'
                  className='btn btn-primary h-full w-full'
                  onClick={() => {
                    (
                      document.getElementById('chess-clock-modal') as any
                    ).showModal();
                  }}>
                  <FaScrewdriverWrench />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id='chess-clock-modal' className='modal'>
        <div className='modal-box'>
          <div className='flex flex-col gap-y-4'>
            <div className='join'>
              <select
                id='topTime'
                name='Top Time'
                className='join-item select select-bordered w-full'
                value={modal.topTime}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const topTime = parseInt(event.target.value);
                  setModal((modal) => {
                    return { ...modal, topTime };
                  });
                  setClock(({ current, seconds, increment, running }) => {
                    return {
                      current,
                      running,
                      increment,
                      seconds: {
                        ...seconds,
                        top: topTime * 60,
                      },
                    };
                  });
                }}>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                id='topIncrement'
                name='Top Increment'
                className='join-item select select-bordered w-full'
                value={modal.topIncrement}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const topIncrement = parseInt(event.target.value);
                  setModal((modal) => {
                    return { ...modal, topIncrement };
                  });
                  setClock(({ current, seconds, increment, running }) => {
                    return {
                      current,
                      running,
                      increment: {
                        ...increment,
                        top: topIncrement,
                      },
                      seconds,
                    };
                  });
                }}>
                <option value={0}>0</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className='join'>
              <select
                id='bottomTime'
                name='Bottom Increment'
                className='join-item select select-bordered w-full'
                value={modal.bottomTime}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const bottomTime = parseInt(event.target.value);
                  setModal((modal) => {
                    return { ...modal, bottomTime };
                  });
                  setClock(({ current, seconds, increment, running }) => {
                    return {
                      current,
                      running,
                      increment,
                      seconds: {
                        ...seconds,
                        bottom: bottomTime * 60,
                      },
                    };
                  });
                }}>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                id='bottomIncrement'
                name='Bottom Increment'
                className='join-item select select-bordered w-full'
                value={clock.increment.bottom}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const bottomIncrement = parseInt(event.target.value);
                  setModal((modal) => {
                    return { ...modal, bottomIncrement };
                  });
                  setClock(({ current, seconds, increment, running }) => {
                    return {
                      current,
                      running,
                      increment: {
                        ...increment,
                        bottom: bottomIncrement,
                      },
                      seconds,
                    };
                  });
                }}>
                <option value={0}>0</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-primary w-full'>Set Clock</button>
            </form>
          </div>
        </div>
      </dialog>
    </Layout>
  );
};
