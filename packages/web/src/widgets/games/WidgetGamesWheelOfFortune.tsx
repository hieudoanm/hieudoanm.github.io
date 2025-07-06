import { FC, useEffect, useState } from 'react';

export const WidgetGamesWheelOfFortune: FC = () => {
  const [degree, setDegree] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  useEffect(() => {
    if (!isSpinning) {
      return;
    }

    const timer = setInterval(() => {
      setDegree((previous) => previous + 100); // Decrement the countdown
    }, 100);

    return () => clearInterval(timer); // Clean up the interval on unmount or re-run
  }, [degree, isSpinning]);

  return (
    <div className="shadow-3xl relative aspect-square w-full max-w-60 overflow-hidden rounded-full bg-neutral-900 text-neutral-100">
      <div className="relative h-full w-full p-4">
        <div className="relative h-full w-full">
          <div
            style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
            className="absolute top-0 right-0 left-0 z-20 mx-auto h-8 w-4 bg-neutral-900"></div>
          <div className="absolute top-0 right-0 bottom-0 left-0 z-20 m-auto flex items-center justify-center">
            <button
              type="button"
              className="h-16 w-16 rounded-full bg-neutral-900 text-neutral-100"
              onClick={() => {
                setIsSpinning((previousIsSpinning) => {
                  setDegree((previous) =>
                    previousIsSpinning ? previous : previous + 1
                  );
                  return !previousIsSpinning;
                });
              }}>
              {isSpinning ? 'Pause' : 'Spin'}
            </button>
          </div>
          <div
            className="absolute top-0 right-0 bottom-0 left-0 z-10 m-auto h-full w-full origin-center rounded-full transition-all"
            style={{
              rotate: `${0 + degree}deg`,
              background:
                'conic-gradient(from var(--start, 0deg), #fb2c36 var(--angle, 60deg), #0000 0%',
            }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 left-0 z-10 m-auto h-full w-full origin-center rounded-full transition-all"
            style={{
              rotate: `${60 + degree}deg`,
              background:
                'conic-gradient(from var(--start, 0deg), #fb2c36 var(--angle, 60deg), #0000 0%',
            }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 left-0 z-10 m-auto h-full w-full origin-center rounded-full transition-all"
            style={{
              rotate: `${120 + degree}deg`,
              background:
                'conic-gradient(from var(--start, 0deg), #fb2c36 var(--angle, 60deg), #0000 0%',
            }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 left-0 z-10 m-auto h-full w-full origin-center rounded-full transition-all"
            style={{
              rotate: `${180 + degree}deg`,
              background:
                'conic-gradient(from var(--start, 0deg), #fb2c36 var(--angle, 60deg), #0000 0%',
            }}
          />
          <div
            className="absolute top-0 right-0 bottom-0 left-0 z-10 m-auto h-full w-full origin-center rounded-full transition-all"
            style={{
              rotate: `${240 + degree}deg`,
              background:
                'conic-gradient(from var(--start, 0deg), #fb2c36 var(--angle, 60deg), #0000 0%',
            }}
          />{' '}
          <div
            className="absolute top-0 right-0 bottom-0 left-0 z-10 m-auto h-full w-full origin-center rounded-full transition-all"
            style={{
              rotate: `${300 + degree}deg`,
              background:
                'conic-gradient(from var(--start, 0deg), #fb2c36 var(--angle, 60deg), #0000 0%',
            }}
          />
        </div>
      </div>
    </div>
  );
};
