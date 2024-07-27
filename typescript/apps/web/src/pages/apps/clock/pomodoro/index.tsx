import { Layout } from '@web/layout';
import { addZero } from '@web/utils/number/number';
import { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaCirclePause, FaCirclePlay, FaCircleStop } from 'react-icons/fa6';

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

const Pomodoro: NextPage = () => {
  const oneSecond: number = 1_000;

  const [restTime, setRestTime] = useState(5);
  const [workTime, setWorkTime] = useState(25);
  const [clock, setClock] = useState<Clock>({
    status: false,
    mode: Mode.IDLE,
    remainingSeconds: workTime * 60,
    display: `${addZero(workTime)}:00`,
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
            remainingSeconds: workTime * 60,
            display: `${addZero(workTime)}:00`,
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
      remainingSeconds: workTime * 60,
      display: `${addZero(workTime)}:00`,
    });
    clearInterval(timer);
  };

  useEffect(() => {
    if (clock.remainingSeconds === 0) {
      setClock(({ status, mode }: Clock) => {
        const newMode = mode === Mode.WORK ? Mode.REST : Mode.WORK;
        const newTime = mode === Mode.WORK ? restTime : workTime;
        return {
          status,
          mode: newMode,
          remainingSeconds: newTime * 60,
          display: `${addZero(newTime)}:00`,
        };
      });
    }
  }, [clock, restTime, workTime]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <Layout nav full>
      <div className='flex h-full flex-col items-center justify-center gap-y-8'>
        <div className='flex aspect-square h-60 w-60 items-center justify-center rounded-full border border-base-content'>
          <div className='flex flex-col items-center gap-y-2 md:gap-y-4'>
            <p className='uppercase'>{clock.mode}</p>
            <p className='text-2xl'>{clock.display}</p>
            <div className='flex gap-2 md:gap-4'>
              {clock.status ? (
                <button
                  aria-label='pause'
                  type='button'
                  className='btn btn-outline'
                  onClick={pause}>
                  <FaCirclePause />
                </button>
              ) : (
                <button
                  aria-label='start'
                  type='button'
                  className='btn btn-outline'
                  onClick={start}>
                  <FaCirclePlay />
                </button>
              )}
              <button
                aria-label='reset'
                type='button'
                className='btn btn-outline'
                onClick={reset}>
                <FaCircleStop />
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-2 md:flex-row'>
          <label
            htmlFor='workTime'
            className='input input-bordered flex w-full items-center gap-2 overflow-hidden md:w-28'>
            <span className='uppercase'>Work</span>
            <input
              type='number'
              id='workTime'
              name='workTime'
              placeholder='Time (minutes)'
              className='grow'
              min={1}
              max={60}
              value={workTime}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newTime: number = parseInt(
                  event?.target.value ?? '0',
                  10
                );
                setWorkTime(newTime);
                setClock(({ status, mode }: Clock) => {
                  return {
                    status,
                    mode,
                    remainingSeconds: newTime * 60,
                    display: `${addZero(newTime)}:00`,
                  };
                });
              }}
            />
          </label>
          <label
            htmlFor='restTime'
            className='input input-bordered flex w-full items-center gap-2 overflow-hidden uppercase md:w-28'>
            <span className='uppercase'>Rest</span>
            <input
              type='number'
              id='restTime'
              name='restTime'
              placeholder='Time (minutes)'
              className='grow'
              min={1}
              max={60}
              value={restTime}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setRestTime(parseInt(event?.target.value, 10))
              }
            />
          </label>
        </div>
      </div>
    </Layout>
  );
};

export default Pomodoro;
