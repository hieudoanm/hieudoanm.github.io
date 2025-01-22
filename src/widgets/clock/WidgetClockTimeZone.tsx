import { addZero } from '@nothing/utils/number';
import { FC, useEffect, useState } from 'react';

export const WidgetClockTimeZone: FC = () => {
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

  const timeZones: { city: string; timeZone: number }[] = [
    { city: 'London', timeZone: 0 },
    { city: 'Hanoi', timeZone: 7 },
    { city: 'Melbourne', timeZone: 11 },
  ];

  return (
    <div className="shadow-3xl aspect-square w-72 rounded-3xl border border-white bg-black p-8">
      <div className="grid h-full w-full grid-rows-3">
        {timeZones.map(({ city, timeZone }, index: number, array) => {
          const last = array.length - 1 === index;
          const d = new Date(
            clock.year,
            clock.month,
            clock.date,
            clock.hours - (clock.timezone - timeZone),
            clock.minutes,
            clock.seconds
          );
          const timeZoneHours: number = d.getHours();
          const timeZoneMinutes: number = d.getMinutes();
          return (
            <div
              key={city}
              className={`col-span-1 text-white ${!last ? 'border-b border-gray-500' : ''}`}>
              <div className="flex h-full w-full items-center justify-between">
                <div>
                  <p className="text-sm uppercase text-gray-500">
                    +{addZero(timeZone)}Hrs
                  </p>
                  <p className="truncate whitespace-nowrap text-base font-semibold">
                    {city}
                  </p>
                </div>
                <p className="text-3xl font-bold">
                  {addZero(timeZoneHours)}:{addZero(timeZoneMinutes)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
