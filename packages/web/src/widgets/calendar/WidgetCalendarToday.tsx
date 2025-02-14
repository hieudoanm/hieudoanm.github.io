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
    <div className="shadow-3xl aspect-square w-full max-w-60 rounded-3xl bg-gray-900 p-4 text-gray-100">
      <div className="flex h-full flex-col items-center justify-center">
        <p className="w-full text-left">{month}</p>
        <div className="flex grow items-center justify-center">
          <p className="text-9xl text-red-500">{clock.date}</p>
        </div>
        <p className="text-xl">{weekday}</p>
      </div>
    </div>
  );
};
