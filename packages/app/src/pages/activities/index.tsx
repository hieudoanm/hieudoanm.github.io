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

const Dot: FC<{ index: number; date: Date }> = ({ index, date }) => {
  const today = new Date();

  const toDateString = date.toLocaleString().split(',').at(0);

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const todayTime = today.getTime();
  const toDateTime = date.getTime();
  const isPast = todayTime - toDateTime > 0;
  const isFuture = todayTime - toDateTime < 0;

  if (index === 0) {
    return (
      <div
        title={toDateString}
        className="flex h-4 w-4 items-center justify-center">
        <div className="bg-base-content/5 aspect-square w-2 rounded-full" />
      </div>
    );
  }

  if (isToday) {
    return (
      <div
        title={toDateString}
        className="flex h-4 w-4 items-center justify-center">
        <div className="relative w-2">
          <div className="bg-base-content absolute aspect-square w-2 rounded-full" />
          <div className="bg-base-content aspect-square w-2 animate-ping rounded-full" />
        </div>
      </div>
    );
  }

  if (isPast) {
    return (
      <div
        title={toDateString}
        className="flex h-4 w-4 items-center justify-center">
        <div className="bg-base-content/75 aspect-square w-2 rounded-full" />
      </div>
    );
  }

  if (isFuture) {
    return (
      <div
        title={toDateString}
        className="flex h-4 w-4 items-center justify-center">
        <div className="border-base-content/50 aspect-square w-2 rounded-full border" />
      </div>
    );
  }

  return <></>;
};

const Weekday: FC = () => {
  const windowSize = useWindowSize();
  const times = windowSize.width < 768 ? 3 : 4;
  const daysPerRow = times * 7;
  const weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      className="grid grid-rows-1"
      style={{ gridTemplateColumns: `repeat(${daysPerRow}, minmax(0, 1fr))` }}>
      {[
        ...weekday, // Week 1
        ...weekday, // Week 2
        ...weekday, // Week 3
        ...(times === 4 ? weekday : []), // Week 4
      ].map((weekday, index) => (
        <div
          key={`${weekday}-${index}`}
          className="text-base-content col-span-1 text-center text-xs">
          {weekday}
        </div>
      ))}
    </div>
  );
};

const DailyView: FC<{ year: number; withWeekday: boolean }> = ({
  year,
  withWeekday,
}) => {
  const windowSize = useWindowSize();
  const times = windowSize.width < 768 ? 3 : 4;
  const daysPerRow = times * 7;

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
      {withWeekday && <Weekday />}
      <table className="w-full">
        <tbody>
          {daysByFourWeek.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const toDate = new Date(
                  new Date(year, 0, 0).getTime() + day * 24 * 60 * 60 * 1000
                );

                return (
                  <td key={j} className="text-center text-xs">
                    <Dot index={day} date={toDate} />
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
  return (
    <div className="w-84 md:w-112">
      {withWeekday && <Weekday />}
      <div className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3">
        {months.map((month: string, monthIndex: number) => {
          // First Date of the Month
          const firstDateOfMonth: Date = new Date(year, monthIndex, 1);
          const firstWeekdayOfMonth: number = firstDateOfMonth.getDay();
          const paddingStartDays: Date[] = new Array(firstWeekdayOfMonth)
            .fill(0)
            .map(
              (_, i) =>
                new Date(
                  new Date(year, monthIndex, 1).getTime() -
                    (firstWeekdayOfMonth - i) * 24 * 60 * 60 * 1000
                )
            );
          // Dates of Month
          const numberOfDays: number =
            isLeapYear(year) && monthIndex === 1
              ? 29
              : daysOfMonths[monthIndex];
          const dates: Date[] = new Array(numberOfDays)
            .fill(0)
            .map((_, i) => new Date(year, monthIndex, i + 1));
          // Last Date of the Month
          const lastDateOfMonth: Date = new Date(
            year,
            monthIndex,
            numberOfDays
          );
          const lastWeekdayOfMonth: number = lastDateOfMonth.getDay();
          const paddingEndDays: Date[] = new Array(6 - lastWeekdayOfMonth)
            .fill(0)
            .map((_, i) => new Date(year, monthIndex + 1, i + 1));
          // Full Month
          const datesWithPadding: Date[] = [
            ...paddingStartDays,
            ...dates,
            ...paddingEndDays,
          ];

          const datesByWeek: Date[][] = datesWithPadding.reduce(
            (acc, date, index) => {
              const weekIndex = Math.floor(index / 7);
              if (!acc[weekIndex]) {
                acc[weekIndex] = [];
              }
              acc[weekIndex].push(date);
              return acc;
            },
            [] as Date[][]
          );

          if (datesByWeek.length === 4) {
            datesByWeek.push(
              new Array(7)
                .fill(0)
                .map((_, i) => new Date(year, monthIndex + 1, i + 1))
            );
          } else if (datesByWeek.length === 6) {
            if (firstWeekdayOfMonth === 6) {
              datesByWeek.shift();
            } else if (lastWeekdayOfMonth === 0) {
              datesByWeek.pop();
            }
          }

          return (
            <div key={month} className="col-span-1 row-span-1">
              <table className="h-28 w-28">
                <tbody>
                  {datesByWeek.map((week: Date[], weekIndex: number) => (
                    <tr key={`week-${monthIndex}-${weekIndex}`}>
                      {week.map((date: Date) => {
                        const carriedOverFromLastMonth =
                          date.getMonth() === monthIndex - 1 &&
                          date.getDay() === 0 &&
                          firstWeekdayOfMonth === 1;

                        const pushOverToNextMonth =
                          date.getMonth() === monthIndex + 1 &&
                          date.getDay() === 6 &&
                          lastWeekdayOfMonth === 5;

                        const dotIndex =
                          date.getMonth() === monthIndex ||
                          carriedOverFromLastMonth ||
                          pushOverToNextMonth;

                        return (
                          <td
                            data-dot={dotIndex}
                            data-weekday={date.getDay()}
                            data-date={date.getDate()}
                            data-month={date.getMonth() + 1}
                            data-year={date.getFullYear()}
                            data-month-index={monthIndex}
                            key={date.toISOString()}>
                            <Dot
                              index={dotIndex ? date.getDate() : 0}
                              date={date}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MonthlyView: FC<{ year: number }> = ({ year }) => {
  return (
    <div className="w-84 md:w-112">
      <div className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3">
        {months.map((month, monthIndex) => {
          const daysOfMonth = daysOfMonths[monthIndex];
          const days = Array.from({ length: daysOfMonth }, (_, i) => i + 1);
          const missingDays = 31 - daysOfMonth;

          const fullDays = [...Array(missingDays).fill(0), ...days];

          return (
            <div key={month} className="grid grid-cols-7">
              <div className="text-base-content col-span-4 pl-1 text-left text-xs">
                {month.slice(0, 3)}
              </div>
              {fullDays.map((date, dateIndex) => {
                return (
                  <div key={`date-${dateIndex}`}>
                    {date !== 0 && (
                      <Dot
                        index={date}
                        date={new Date(year, monthIndex, date)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
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
    withWeekday: true,
  });

  const showWeekday = view === View.DAILY || view === View.WEEKLY;

  return (
    <div className="flex h-screen w-screen flex-col p-4 md:p-8">
      <nav className="mx-auto flex w-84 items-center justify-between md:w-112">
        <span className="font-black">Activities</span>
        <div className="flex items-center">
          {showWeekday && (
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
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-xs btn-ghost rounded-field">
              {view === View.DAILY && 'Daily'}
              {view === View.WEEKLY && 'Weekly'}
              {view === View.MONTHLY && 'Monthly'}
            </div>
            <ul
              tabIndex={-1}
              className="menu dropdown-content border-base-content/10 bg-primary-content z-1 mt-1 rounded-lg border shadow-sm">
              {[View.DAILY, View.WEEKLY, View.MONTHLY].map((v) => (
                <li key={v}>
                  <a
                    className="btn btn-xs btn-ghost"
                    onClick={() => {
                      setState((previous) => ({
                        ...previous,
                        view: v,
                      }));
                    }}>
                    {v === View.DAILY && 'Daily'}
                    {v === View.WEEKLY && 'Weekly'}
                    {v === View.MONTHLY && 'Monthly'}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <main className="flex grow items-center justify-center">
        <div className="flex flex-col gap-y-1">
          <form onSubmit={(e) => e.preventDefault()}>
            <select
              name="year"
              className="select select-xs select-ghost text-base-content m-0 w-full appearance-none bg-none p-0 text-center focus:bg-transparent focus:outline-none"
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
          {view === View.MONTHLY && <MonthlyView year={year} />}
        </div>
      </main>
    </div>
  );
};

export default ActivitiesPage;
