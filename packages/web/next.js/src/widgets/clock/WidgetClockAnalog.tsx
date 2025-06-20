import { FC, useEffect, useState } from 'react';

export const WidgetClockAnalog: FC = () => {
  const d = new Date();
  const [clock, setClock] = useState<{
    year: number;
    month: number;
    date: number;
    weekday: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    timezone: number;
  }>({
    year: d.getFullYear(),
    month: d.getMonth(),
    date: d.getDate(),
    weekday: d.getDay(),
    hours: d.getHours(),
    minutes: d.getMinutes(),
    seconds: d.getSeconds(),
    milliseconds: d.getMilliseconds(),
    timezone: d.getTimezoneOffset() / -60,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const d: Date = new Date();
      setClock({
        year: d.getFullYear(),
        month: d.getMonth(),
        date: d.getDate(),
        weekday: d.getDay(),
        hours: d.getHours(),
        minutes: d.getMinutes(),
        seconds: d.getSeconds(),
        milliseconds: d.getMilliseconds(),
        timezone: d.getTimezoneOffset() / -60,
      });
    }, 1);

    return () => clearInterval(interval);
  });

  const secondsAngle: number =
    (clock.seconds < 60 ? (clock.seconds / 60) * 360 : 0) + 90;
  const minutesAngle: number =
    (clock.minutes < 60 ? (clock.minutes / 60) * 360 : 0) + 90;
  const hoursAngle: number = (clock.hours / 12) * 360 + 90;

  return (
    <div className="shadow-3xl aspect-square w-full max-w-60 rounded-full border border-white bg-neutral-900">
      <div className="relative h-full w-full rounded-full">
        <div className="absolute top-0 right-0 bottom-0 left-0 m-auto aspect-square w-4 rounded-full bg-white">
          <div className="relative h-full w-full">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index: number) => {
              const angle: number = 30 * index;
              const activeHour: boolean = (index + 9) % 12 === clock.hours % 12;
              const mainPoint =
                angle % 90 === 0 ? (
                  <div
                    title={((index + 9) % 12).toString()}
                    className={`aspect-square w-4 rounded-full ${activeHour ? 'bg-red-500' : 'bg-white'}`}
                  />
                ) : (
                  <div
                    title={((index + 9) % 12).toString()}
                    className={`aspect-square w-2 rounded-full ${activeHour ? 'bg-red-500' : 'bg-neutral-500'}`}
                  />
                );
              return (
                <div
                  key={angle}
                  className="absolute h-full w-full origin-center"
                  style={{ rotate: `${angle}deg` }}>
                  <div className="absolute top-0 right-2 bottom-0 my-auto flex h-4 w-24 items-center justify-start bg-transparent">
                    {mainPoint}
                  </div>
                </div>
              );
            })}
            <div
              className="absolute z-10 h-full w-full transition-all ease-linear"
              style={{ rotate: `${secondsAngle}deg` }}>
              <div className="absolute top-0 right-2 bottom-0 my-auto h-1 w-20 rounded-full bg-red-700"></div>
            </div>
            <div
              className="absolute h-full w-full transition-all"
              style={{ rotate: `${minutesAngle}deg` }}>
              <div className="absolute top-0 right-2 bottom-0 my-auto h-2 w-16 rounded-full bg-white"></div>
            </div>
            <div
              className="absolute h-full w-full transition-all"
              style={{ rotate: `${hoursAngle}deg` }}>
              <div className="absolute top-0 right-2 bottom-0 my-auto h-2 w-12 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
