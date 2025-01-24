import { months } from '@nothing/constants';
import { chunkArray } from '@nothing/utils/array';
import { getNumberOfDaysPerMonth, getOrdinalSuffix } from '@nothing/utils/time';
import { FC, useEffect, useState } from 'react';

export const WidgetCalendarMonthly: FC = () => {
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

  const firstDateOfMonth = new Date(clock.year, months.indexOf(month), 1);
  const firstWeekdayOfMonth = firstDateOfMonth.getDay();
  const numberOfDaysPerMonth = getNumberOfDaysPerMonth(clock.year)[
    months.indexOf(month)
  ];
  const array = Array.from(
    { length: 7 * 5 },
    (_, i) => i - firstWeekdayOfMonth + 1
  );
  const daysByWeek: number[][] = chunkArray(array, 7);

  return (
    <div className="shadow-3xl aspect-square w-72 rounded-3xl bg-black p-8 text-white">
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute top-0 right-0 left-0">
          <div className="flex items-center justify-between">
            <p className="text-red-500">
              {month} {clock.year}
            </p>
            <p>
              {clock.date}
              <sup>{getOrdinalSuffix(clock.date)}</sup>
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          {daysByWeek.map((weekdays) => {
            return (
              <div
                key={`week-${weekdays}`}
                className="flex w-full items-center justify-between">
                {weekdays.map((date) => {
                  return (
                    <div
                      key={`date-${date}`}
                      className="flex items-center justify-center py-2">
                      <button
                        type="button"
                        onClick={() => {
                          console.log(
                            weekdays[clock.weekday],
                            month,
                            date,
                            clock.year
                          );
                        }}>
                        {date === clock.date ? (
                          <div className="aspect-square w-2 rounded-full bg-red-500" />
                        ) : (
                          <>
                            {date <= 0 || date > numberOfDaysPerMonth ? (
                              <div className="aspect-square w-2 rounded-full bg-gray-700" />
                            ) : (
                              <div className="aspect-square w-2 rounded-full bg-white" />
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="absolute right-0 bottom-0 left-0">
          <div className="flex items-center justify-center">
            <p>Nothing to Do</p>
          </div>
        </div>
      </div>
    </div>
  );
};
