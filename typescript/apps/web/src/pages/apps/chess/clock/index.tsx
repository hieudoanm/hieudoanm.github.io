import { Layout } from '@web/layout';
import { addZero } from '@web/utils/add-zero';
import { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaPause } from 'react-icons/fa';
import { FaArrowsRotate, FaPlay, FaScrewdriverWrench } from 'react-icons/fa6';

type ChessSide = 'top' | 'bottom';

type ChessClock = {
  running: boolean;
  current: ChessSide | '';
  seconds: { top: number; bottom: number };
  increment: { top: number; bottom: number };
};

const ChessClockPage: NextPage = () => {
  const oneSecond = 1_000;

  const initial: ChessClock = {
    seconds: { top: 10 * 60, bottom: 10 * 60 },
    increment: { top: 0, bottom: 0 },
    current: '',
    running: false,
  };
  const [clock, setClock] = useState<ChessClock>(initial);

  const [timer, setTimer] = useState<any>(null);

  const click = (side: ChessSide) => {
    const otherSide: ChessSide = side === 'top' ? 'bottom' : 'top';
    setClock((clock) => ({ ...clock, current: otherSide, running: true }));

    const newTimer = setInterval(() => {
      if (clock.seconds.top === 0 || clock.seconds.bottom === 0) {
        clearInterval(timer);
      } else {
        setClock(({ current, seconds, increment, running }: ChessClock) => {
          if (current === '') return { current, seconds, increment, running };
          const newCurrentSeconds = seconds[current] - 1;

          return {
            current,
            running,
            increment,
            seconds: { ...seconds, [current]: newCurrentSeconds },
          };
        });
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
              <input
                type='number'
                id='topTime'
                name='Top Time'
                className='input join-item input-bordered'
                value={clock.seconds.top}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setClock(({ current, seconds, increment, running }) => {
                    return {
                      current,
                      running,
                      increment,
                      seconds: {
                        ...seconds,
                        top: parseInt(event.target.value),
                      },
                    };
                  });
                }}
              />
              <input
                type='number'
                id='topIncrement'
                name='Top Increment'
                className='input join-item input-bordered'
                value={clock.increment.top}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setClock(({ current, seconds, increment, running }) => {
                    return {
                      current,
                      running,
                      increment: {
                        ...increment,
                        top: parseInt(event.target.value),
                      },
                      seconds,
                    };
                  });
                }}
              />
            </div>
            <div className='join'>
              <input
                type='number'
                id='topIncrement'
                name='Top Increment'
                className='input join-item input-bordered'
                value={clock.seconds.bottom}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setClock(({ current, seconds, increment, running }) => {
                    return {
                      current,
                      running,
                      increment,
                      seconds: {
                        ...seconds,
                        bottom: parseInt(event.target.value),
                      },
                    };
                  });
                }}
              />
              <input
                type='number'
                id='bottomIncrement'
                name='Bottom Increment'
                className='input join-item input-bordered'
                value={clock.increment.bottom}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setClock(({ current, seconds, increment, running }) => {
                    return {
                      current,
                      running,
                      increment: {
                        ...increment,
                        bottom: parseInt(event.target.value),
                      },
                      seconds,
                    };
                  });
                }}
              />
            </div>
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn btn-primary'>Set Clock</button>
            </form>
          </div>
        </div>
      </dialog>
    </Layout>
  );
};

export default ChessClockPage;
