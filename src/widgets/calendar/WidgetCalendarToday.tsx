import { months, weekdays } from '@nothing/constants';
import { FC, useEffect, useState } from 'react';

export const WidgetCalendarToday: FC = () => {
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

  const month: string = months[clock.month];
  const weekday: string = weekdays[clock.weekday];

  return (
    <div className="shadow-3xl aspect-square w-72 rounded-3xl bg-black p-8 text-white">
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute left-0 right-0 top-0">
          <p className="text-red-500">{month}</p>
        </div>
        <div className="text-center">
          <p className="text-9xl">{clock.date}</p>
          <p className="text-4xl">{weekday}</p>
        </div>
      </div>
    </div>
  );
};
