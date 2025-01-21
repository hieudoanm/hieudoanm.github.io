import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekdays: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const chunkArray = <T,>(array: T[], chunkSize: number) => {
  if (chunkSize <= 0) throw new Error('Chunk size must be greater than 0');

  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const getOrdinalSuffix = (weekday: number): string => {
  const j = weekday % 10;
  const k = weekday % 100;

  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
};

const getNumberOfDaysPerMonth = (year: number): number[] => {
  return [
    31, // January
    new Date(year, 1, 29).getMonth() === 1 ? 29 : 28, // February
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31, // December
  ];
};

const MonthlyCalendar: FC<{ month: string; date: number; year: number }> = ({
  month = '',
  date = 0,
  year = 0,
}) => {
  const firstDateOfMonth = new Date(year, months.indexOf(month), 1);
  const firstWeekdayOfMonth = firstDateOfMonth.getDay();
  const numberOfDaysPerMonth =
    getNumberOfDaysPerMonth(year)[months.indexOf(month)];
  const array = Array.from(
    { length: 7 * 5 },
    (_, i) => i - firstWeekdayOfMonth + 1
  );
  const daysByWeek: number[][] = chunkArray(array, 7);

  return (
    <div className="shadow-3xl aspect-square w-72 rounded-3xl bg-black p-8 text-white">
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute left-0 right-0 top-0">
          <div className="flex items-center justify-between">
            <p className="text-red-500">
              {month} {year}
            </p>
            <p>
              {date}
              <sup>{getOrdinalSuffix(date)}</sup>
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
                {weekdays.map((weekday) => {
                  return (
                    <div
                      key={`weekday-${weekday}`}
                      className="flex items-center justify-center py-2">
                      <button
                        type="button"
                        onClick={() => {
                          console.log(year, month, weekday);
                        }}>
                        {weekday === date ? (
                          <div className="aspect-square w-2 rounded-full bg-red-500" />
                        ) : (
                          <>
                            {weekday <= 0 || weekday > numberOfDaysPerMonth ? (
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
        <div className="absolute bottom-0 left-0 right-0">
          <div className="flex items-center justify-center">
            <p>Nothing to Do</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TodayCalendar: FC<{ month: string; date: number; weekday: string }> = ({
  month = '',
  date = 0,
  weekday = '',
}) => {
  return (
    <div className="shadow-3xl aspect-square w-72 rounded-3xl bg-black p-8 text-white">
      <div className="relative flex h-full items-center justify-center">
        <div className="absolute left-0 right-0 top-0">
          <p className="text-red-500">{month}</p>
        </div>
        <div className="text-center">
          <p className="text-9xl">{date}</p>
          <p className="text-4xl">{weekday}</p>
        </div>
      </div>
    </div>
  );
};

const CalendarPage: NextPage = () => {
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
    <div className="h-double-screen w-screen overflow-hidden bg-gray-300 md:h-screen">
      <div className="grid h-full grid-cols-none grid-rows-2 md:grid-cols-2 md:grid-rows-none">
        <div className="col-span-1">
          <div className="flex h-full w-full items-center justify-center">
            <TodayCalendar month={month} date={clock.date} weekday={weekday} />
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex h-full w-full items-center justify-center">
            <MonthlyCalendar
              month={month}
              date={clock.date}
              year={clock.year}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
