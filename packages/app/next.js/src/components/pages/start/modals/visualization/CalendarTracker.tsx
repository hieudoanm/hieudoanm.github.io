import { FC, useCallback, useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Utilities                                                            */
/* ------------------------------------------------------------------ */

const isLeapYear = (year: number): boolean =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

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

/* ------------------------------------------------------------------ */
/* useWindowSize hook                                                   */
/* ------------------------------------------------------------------ */

type WindowSize = { width: number; height: number };

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  }, []);

  useEffect(() => {
    if (!window) return;
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      if (!window) return;
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
};

/* ------------------------------------------------------------------ */
/* Dot component                                                        */
/* ------------------------------------------------------------------ */

type DotProps = { index: number; date: Date };

const Dot: FC<DotProps> = ({ index, date }) => {
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

/* ------------------------------------------------------------------ */
/* Weekday header                                                       */
/* ------------------------------------------------------------------ */

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
        ...weekday,
        ...weekday,
        ...weekday,
        ...(times === 4 ? weekday : []),
      ].map((day, index) => (
        <div
          key={`${day}-${index}`}
          className="text-base-content col-span-1 text-center text-xs">
          {day}
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* View components                                                      */
/* ------------------------------------------------------------------ */

type DailyViewProps = { year: number; withWeekday: boolean };

const DailyView: FC<DailyViewProps> = ({ year, withWeekday }) => {
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
      if (!acc[weekIndex]) acc[weekIndex] = [];
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
          const firstDateOfMonth = new Date(year, monthIndex, 1);
          const firstWeekdayOfMonth = firstDateOfMonth.getDay();
          const paddingStartDays: Date[] = new Array(firstWeekdayOfMonth)
            .fill(0)
            .map(
              (_, i) =>
                new Date(
                  new Date(year, monthIndex, 1).getTime() -
                    (firstWeekdayOfMonth - i) * 24 * 60 * 60 * 1000
                )
            );
          const numberOfDays =
            isLeapYear(year) && monthIndex === 1
              ? 29
              : daysOfMonths[monthIndex];
          const dates: Date[] = new Array(numberOfDays)
            .fill(0)
            .map((_, i) => new Date(year, monthIndex, i + 1));
          const lastDateOfMonth = new Date(year, monthIndex, numberOfDays);
          const lastWeekdayOfMonth = lastDateOfMonth.getDay();
          const paddingEndDays: Date[] = new Array(6 - lastWeekdayOfMonth)
            .fill(0)
            .map((_, i) => new Date(year, monthIndex + 1, i + 1));
          const datesWithPadding: Date[] = [
            ...paddingStartDays,
            ...dates,
            ...paddingEndDays,
          ];

          const datesByWeek: Date[][] = datesWithPadding.reduce(
            (acc, date, index) => {
              const weekIndex = Math.floor(index / 7);
              if (!acc[weekIndex]) acc[weekIndex] = [];
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
              {fullDays.map((date, dateIndex) => (
                <div key={`date-${dateIndex}`}>
                  {date !== 0 && (
                    <Dot index={date} date={new Date(year, monthIndex, date)} />
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const QuarterlyView: FC<{ year: number }> = ({ year }) => {
  const quarters: number[][] = daysOfMonths.reduce((acc, day, index) => {
    const quarterIndex = Math.floor(index / 3);
    if (!acc[quarterIndex]) acc[quarterIndex] = [];
    acc[quarterIndex].push(day);
    return acc;
  }, [] as number[][]);

  const sumQuarters: number[] = quarters.map((monthDays) =>
    monthDays.reduce((acc, day) => acc + day, 0)
  );

  return (
    <div className="w-84 md:w-112">
      {sumQuarters.map((sum: number, index) => {
        const startMonth = index * 3;
        return (
          <div
            key={`quarter-${index}`}
            className="grid grid-cols-21 items-end md:grid-cols-28">
            <div className="col-span-13 md:col-span-20">
              <span className="text-base-content pl-1 text-xs">
                Quarter {index + 1}
              </span>
            </div>
            {Array.from({ length: sum })
              .fill(0)
              .map((_, i) => (
                <Dot
                  key={`${index}-${i}`}
                  index={i + 1}
                  date={new Date(year, startMonth, i + 1)}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
};

const HalfView: FC<{ year: number }> = ({ year }) => {
  const halves: number[][] = daysOfMonths.reduce((acc, day, index) => {
    const halfIndex = Math.floor(index / 6);
    if (!acc[halfIndex]) acc[halfIndex] = [];
    acc[halfIndex].push(day);
    return acc;
  }, [] as number[][]);

  const sumHalves: number[] = halves.map((monthDays) =>
    monthDays.reduce((acc, day) => acc + day, 0)
  );

  return (
    <div className="w-84 md:w-112">
      {sumHalves.map((sum: number, index) => {
        const startMonth = index * 6;

        return (
          <div
            key={`half-${index + 1}`}
            className="grid grid-cols-21 items-end md:grid-cols-28">
            <div className="col-span-5 md:col-span-12">
              <span className="text-base-content pl-1 text-xs">
                Half {index + 1}
              </span>
            </div>
            {Array.from({ length: sum })
              .fill(0)
              .map((_, i) => (
                <Dot
                  key={`${index}-${i}`}
                  index={i + 1}
                  date={new Date(year, startMonth, i + 1)}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const START_YEAR = 1970;
const END_YEAR = 2100;
const years = new Array(END_YEAR - START_YEAR + 1)
  .fill(0)
  .map((_, i) => START_YEAR + i);

enum View {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  HALF = 'half',
}

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */

export const CalendarTrackerModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const today = new Date();

  const [{ year, view, withWeekday }, setState] = useState<{
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
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-fit">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>

        <h3 className="mb-3 text-center text-lg font-bold">Calendar Tracker</h3>

        {/* Controls */}
        <nav className="mx-auto mb-3 flex w-84 items-center justify-between md:w-112">
          <div className="flex items-center gap-1">
            {showWeekday && (
              <button
                className={`btn btn-xs btn-ghost ${withWeekday ? '' : 'line-through'}`}
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    withWeekday: !prev.withWeekday,
                  }))
                }>
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
                {view === View.QUARTERLY && 'Quarterly'}
                {view === View.HALF && 'Half'}
              </div>
              <ul
                tabIndex={-1}
                className="menu dropdown-content border-base-content/10 bg-primary-content z-1 mt-1 rounded-lg border shadow-sm">
                {[
                  View.DAILY,
                  View.WEEKLY,
                  View.MONTHLY,
                  View.QUARTERLY,
                  View.HALF,
                ].map((v) => (
                  <li key={v}>
                    <a
                      className="btn btn-xs btn-ghost"
                      onClick={() =>
                        setState((prev) => ({ ...prev, view: v }))
                      }>
                      {v === View.DAILY && 'Daily'}
                      {v === View.WEEKLY && 'Weekly'}
                      {v === View.MONTHLY && 'Monthly'}
                      {v === View.QUARTERLY && 'Quarterly'}
                      {v === View.HALF && 'Half'}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Year picker */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="join">
              <button
                type="button"
                className="btn btn-xs btn-ghost join-item text-base-content"
                onClick={() =>
                  setState((prev) => ({ ...prev, year: prev.year - 1 }))
                }>
                Previous
              </button>
              <select
                name="year"
                className="select select-xs select-ghost text-base-content join-item m-0 w-full appearance-none bg-none p-0 text-center"
                value={year}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    year: Number(e.target.value),
                  }))
                }>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-xs btn-ghost join-item text-base-content"
                onClick={() =>
                  setState((prev) => ({ ...prev, year: prev.year + 1 }))
                }>
                Next
              </button>
            </div>
          </form>
        </nav>

        {/* View content */}
        <div className="flex items-center justify-center">
          {view === View.DAILY && (
            <DailyView year={year} withWeekday={withWeekday} />
          )}
          {view === View.WEEKLY && (
            <WeeklyView year={year} withWeekday={withWeekday} />
          )}
          {view === View.MONTHLY && <MonthlyView year={year} />}
          {view === View.QUARTERLY && <QuarterlyView year={year} />}
          {view === View.HALF && <HalfView year={year} />}
        </div>
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
