import { useWindowSize } from '@web/hooks/window/use-size';
import { NextPage } from 'next';
import { FC, useState } from 'react';

const startYear = 1970;
const endYear = new Date().getFullYear();
const years = new Array(endYear - startYear + 1)
  .fill(0)
  .map((_, i) => startYear + i);

const daysOfMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

enum View {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

const DailyView: FC<{ year: number; withWeekday: boolean }> = ({
  year,
  withWeekday,
}) => {
  const windowSize = useWindowSize();

  const times = windowSize.width < 768 ? 3 : 4;
  const daysPerRow = times * 7;
  const weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const today = new Date();

  const startDateOfYear = new Date(year, 0, 1);
  const startWeekDayOfYear = startDateOfYear.getDay();
  const paddingStartDays: number[] = new Array(startWeekDayOfYear).fill(0);
  const daysOfYear: number[] = new Array(isLeapYear(year) ? 366 : 365)
    .fill(0)
    .map((_, i) => i + 1);
  const paddingEndDays: number[] = new Array(
    daysPerRow - ((startWeekDayOfYear + daysOfYear.length) % daysPerRow)
  ).fill(0);
  const fullDaysOfYear = [
    ...paddingStartDays,
    ...daysOfYear,
    ...paddingEndDays,
  ];
  const daysByFourWeek: number[][] = fullDaysOfYear.reduce(
    (acc, day, index) => {
      const weekIndex = Math.floor(index / daysPerRow);
      if (!acc[weekIndex]) {
        acc[weekIndex] = [];
      }
      acc[weekIndex].push(day);
      return acc;
    },
    [] as number[][]
  );

  return (
    <div className="w-84 md:w-112">
      <table className="w-full">
        <tbody>
          {withWeekday && (
            <tr>
              {[
                ...weekday, // Week 1
                ...weekday, // Week 2
                ...weekday, // Week 3
                ...(times === 4 ? weekday : []), // Week 4
              ].map((day) => (
                <td key={day} className="text-center text-xs">
                  {day}
                </td>
              ))}
            </tr>
          )}
          {daysByFourWeek.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const toDate = new Date(
                  new Date(year, 0, 0).getTime() + day * 24 * 60 * 60 * 1000
                );
                const isToday =
                  toDate.getFullYear() === today.getFullYear() &&
                  toDate.getMonth() === today.getMonth() &&
                  toDate.getDate() === today.getDate();
                const timeZone = toDate.getTimezoneOffset() / -60;
                const toDateString = toDate.toLocaleString().split(',').at(0);
                return (
                  <td key={j} className="text-center text-xs">
                    {isToday ? (
                      <div
                        data-day={day}
                        data-timezone={timeZone}
                        title={toDateString}
                        className="relative m-1 w-2">
                        <div className="bg-base-content absolute aspect-square w-2 rounded-full" />
                        <div className="bg-base-content aspect-square w-2 animate-ping rounded-full" />
                      </div>
                    ) : (
                      <>
                        {day !== 0 ? (
                          <div
                            data-day={day}
                            data-timezone={timeZone}
                            title={toDateString}
                            className="bg-base-content/50 m-1 aspect-square w-2 rounded-full"
                          />
                        ) : (
                          <div
                            data-day={day}
                            data-timezone={timeZone}
                            title={toDateString}
                            className="bg-base-content/10 m-1 aspect-square w-2 rounded-full"
                          />
                        )}
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const WeeklyView: FC<{ year: number; withWeekday: boolean }> = ({
  year,
  withWeekday,
}) => {
  const today = new Date();

  return (
    <div className="w-84 md:w-112">
      <div className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
          (month: number, index: number) => {
            const numberOfDays: number =
              isLeapYear(year) && month == 2 ? 29 : daysOfMonths[index];
            const days: number[] = new Array(numberOfDays)
              .fill(0)
              .map((_, i) => i + 1);
            // Start of the Month
            const firstDayOfMonth: Date = new Date(year, month - 1, 1);
            const firstWeekdayOfMonth: number = firstDayOfMonth.getDay();
            const paddingStartDays: number[] = new Array(
              firstWeekdayOfMonth
            ).fill(0);
            // End of the Month
            const lastDayOfMonth: Date = new Date(
              year,
              month - 1,
              numberOfDays
            );
            const lastWeekdayOfMonth: number = lastDayOfMonth.getDay();
            const paddingEndDays: number[] = new Array(
              6 - lastWeekdayOfMonth
            ).fill(0);
            // Full Month
            const daysWithPadding: number[] = [
              ...paddingStartDays,
              ...days,
              ...paddingEndDays,
            ];

            const daysByWeek: number[][] = daysWithPadding.reduce(
              (acc, day, index) => {
                const weekIndex = Math.floor(index / 7);
                if (!acc[weekIndex]) {
                  acc[weekIndex] = [];
                }
                acc[weekIndex].push(day);
                return acc;
              },
              [] as number[][]
            );
            const numberOfWeeksByGroup: number = daysByWeek.length;
            if (numberOfWeeksByGroup === 4) {
              daysByWeek.push([0, 0, 0, 0, 0, 0, 0]);
              daysByWeek.push([0, 0, 0, 0, 0, 0, 0]);
            } else if (numberOfWeeksByGroup === 5) {
              daysByWeek.push([0, 0, 0, 0, 0, 0, 0]);
            }

            return (
              <div key={month} className="col-span-1 row-span-1">
                <table className="h-28 w-28">
                  {withWeekday && (
                    <caption className="text-xs">
                      {months[month - 1].slice(0, 3)}
                    </caption>
                  )}
                  <tbody>
                    {withWeekday && (
                      <tr>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                          <td key={day} className="text-center text-xs">
                            {day}
                          </td>
                        ))}
                      </tr>
                    )}
                    {daysByWeek.map((week: number[], weekIndex: number) => (
                      <tr key={weekIndex}>
                        {week.map((day: number, dayIndex: number) => {
                          const isToday =
                            day === today.getDate() &&
                            month === today.getMonth() + 1 &&
                            year === today.getFullYear();

                          return (
                            <td key={dayIndex} className="w-4 align-middle">
                              {isToday ? (
                                <div className="relative m-1 w-2">
                                  <div className="bg-base-content absolute aspect-square w-2 rounded-full" />
                                  <div className="bg-base-content aspect-square w-2 animate-ping rounded-full" />
                                </div>
                              ) : (
                                <>
                                  {day !== 0 ? (
                                    <div className="bg-base-content/50 m-1 aspect-square w-2 rounded-full" />
                                  ) : (
                                    <div className="bg-base-content/10 m-1 aspect-square w-2 rounded-full" />
                                  )}
                                </>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

const MonthlyView: FC<{ year: number; withWeekday: boolean }> = ({
  year,
  withWeekday,
}) => {
  const today = new Date();

  return (
    <div
      className={`grid grid-rows-12 ${withWeekday ? 'grid-cols-32' : 'grid-cols-31'}`}>
      {months.map((month, monthIndex) => {
        const daysOfMonth = daysOfMonths[monthIndex];
        const days = Array.from({ length: daysOfMonth }, (_, i) => i + 1);
        const paddingEndDays: number[] = Array.from(
          { length: 31 - daysOfMonth },
          () => 0
        );
        const fullDays = [...days, ...paddingEndDays];

        return (
          <>
            {withWeekday && (
              <div
                key={month}
                className="col-span-1 row-span-1 flex items-center justify-center">
                <span className="text-xs">{month.at(0)}</span>
              </div>
            )}
            {fullDays.map((day) => {
              const isToday =
                day === today.getDate() &&
                monthIndex === today.getMonth() &&
                year === today.getFullYear();
              return (
                <div key={day} className="col-span-1 row-span-1">
                  {isToday ? (
                    <div className="relative m-1 w-2">
                      <div className="bg-base-content absolute aspect-square w-2 rounded-full" />
                      <div className="bg-base-content aspect-square w-2 animate-ping rounded-full" />
                    </div>
                  ) : (
                    <>
                      {day !== 0 ? (
                        <div className="bg-base-content/50 m-1 aspect-square w-2 rounded-full" />
                      ) : (
                        <div className="bg-base-content/10 m-1 aspect-square w-2 rounded-full" />
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

const ActivitiesPage: NextPage = () => {
  const today = new Date();

  const [
    { year = today.getFullYear(), view = View.DAILY, withWeekday = false },
    setState,
  ] = useState<{
    year: number;
    view: View;
    withWeekday: boolean;
  }>({
    year: today.getFullYear(),
    view: View.DAILY,
    withWeekday: false,
  });

  return (
    <div className="flex h-screen w-screen flex-col p-4 md:p-8">
      <nav className="mx-auto flex w-84 items-center justify-between md:w-112">
        <span className="font-black">Activities</span>
        <div className="flex items-center">
          <button
            className={`btn btn-xs btn-ghost ${withWeekday ? '' : 'line-through'}`}
            onClick={() => {
              setState((previous) => ({
                ...previous,
                withWeekday: !previous.withWeekday,
              }));
            }}>
            Weekday
          </button>
          <button
            className="btn btn-xs btn-ghost"
            onClick={() => {
              setState((previous) => {
                let newView = View.DAILY;
                if (previous.view === View.DAILY) {
                  newView = View.WEEKLY;
                } else if (previous.view === View.WEEKLY) {
                  newView = View.MONTHLY;
                } else if (previous.view === View.MONTHLY) {
                  newView = View.DAILY;
                }
                return {
                  ...previous,
                  view: newView,
                };
              });
            }}>
            {view === View.DAILY && 'Daily'}
            {view === View.WEEKLY && 'Weekly'}
            {view === View.MONTHLY && 'Monthly'}
          </button>
        </div>
      </nav>
      <main className="flex grow items-center justify-center">
        <div className="flex flex-col gap-y-1">
          <form onSubmit={(e) => e.preventDefault()}>
            <select
              name="year"
              className="select select-xs select-ghost m-0 w-full appearance-none bg-none p-0 text-center focus:bg-transparent focus:outline-none"
              value={year}
              onChange={(e) =>
                setState((previous) => ({
                  ...previous,
                  year: Number(e.target.value),
                }))
              }>
              {years.map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </form>
          {view === View.DAILY && (
            <DailyView year={year} withWeekday={withWeekday} />
          )}
          {view === View.WEEKLY && (
            <WeeklyView year={year} withWeekday={withWeekday} />
          )}
          {view === View.MONTHLY && (
            <MonthlyView year={year} withWeekday={withWeekday} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ActivitiesPage;
