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

  const secondsAngle =
    (clock.seconds < 60 ? (clock.seconds / 60) * 360 : 0) + 90;
  const minutesAngle =
    (clock.minutes < 60 ? (clock.minutes / 60) * 360 : 0) + 90;
  const hoursAngle = (clock.hours < 24 ? (clock.hours / 24) * 360 : 0) - 90;

  return (
    <div className="shadow-3xl aspect-square w-72 rounded-full border border-white bg-black">
      <div className="relative h-full w-full rounded-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto aspect-square w-4 rounded-full bg-white">
          <div className="relative h-full w-full">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (index) => {
                const angle = 22.5 * index;
                const mainPoint =
                  angle % 90 === 0 ? (
                    <div className="aspect-square w-4 rounded-full bg-white" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                  );
                return (
                  <div
                    key={angle}
                    className="absolute h-full w-full"
                    style={{ rotate: `${angle}deg` }}>
                    <div className="absolute bottom-0 right-2 top-0 my-auto flex h-4 w-28 items-center justify-start bg-transparent">
                      {mainPoint}
                    </div>
                  </div>
                );
              }
            )}
            <div
              className="absolute z-10 h-full w-full transition-all ease-linear"
              style={{ rotate: `${secondsAngle}deg` }}>
              <div className="absolute bottom-0 right-2 top-0 my-auto h-1 w-24 rounded-full bg-red-700"></div>
            </div>
            <div
              className="absolute h-full w-full transition-all"
              style={{ rotate: `${minutesAngle}deg` }}>
              <div className="absolute bottom-0 right-2 top-0 my-auto h-2 w-20 rounded-full bg-white"></div>
            </div>
            <div
              className="absolute h-full w-full transition-all"
              style={{ rotate: `${hoursAngle}deg` }}>
              <div className="absolute bottom-0 right-2 top-0 my-auto h-2 w-16 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
