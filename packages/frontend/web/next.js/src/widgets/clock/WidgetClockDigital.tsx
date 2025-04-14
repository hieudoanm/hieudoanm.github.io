import { addZero } from '@web/utils/number';
import { getOrdinalSuffix, months, weekdays } from '@web/utils/time';
import { FC, useEffect, useState } from 'react';

export const WidgetClockDigital: FC = () => {
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

  return (
    <div className="shadow-3xl aspect-square w-full max-w-60 rounded-3xl border border-white bg-gray-900 p-8">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-2 text-gray-100">
          <p className="text-sm">
            <span className="uppercase">{months[clock.month]}</span>{' '}
            {clock.date}
            <sup>{getOrdinalSuffix(clock.date)}</sup>, {clock.year}
          </p>
          <p className="text-5xl uppercase">
            {addZero(clock.hours)}:{addZero(clock.minutes)}:
            {addZero(clock.seconds)}
          </p>
          <p className="text-sm uppercase">{weekdays[clock.weekday]}</p>
        </div>
      </div>
    </div>
  );
};
