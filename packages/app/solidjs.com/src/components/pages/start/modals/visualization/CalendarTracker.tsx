import { createSignal, createMemo, onMount, onCleanup } from 'solid-js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

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

const useWindowSize = (): (() => WindowSize) => {
  const [windowSize, setWindowSize] = createSignal<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window?.innerWidth || 0,
      height: window?.innerHeight || 0,
    });
  };

  onMount(() => {
    if (!window) return;
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  onCleanup(() => {
    if (!window) return;
    window.removeEventListener('resize', handleResize);
  });

  return windowSize;
};

/* ------------------------------------------------------------------ */
/* Dot component                                                        */
/* ------------------------------------------------------------------ */

type DotProps = { index: number; date: Date };

const Dot = ({ index, date }: DotProps) => {
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
        class="flex h-4 w-4 items-center justify-center">
        <div class="bg-base-content/5 aspect-square w-2 rounded-full" />
      </div>
    );
  }

  if (isToday) {
    return (
      <div
        title={toDateString}
        class="flex h-4 w-4 items-center justify-center">
        <div class="relative w-2">
          <div class="bg-base-content absolute aspect-square w-2 rounded-full" />
          <div class="bg-base-content aspect-square w-2 animate-ping rounded-full" />
        </div>
      </div>
    );
  }

  if (isPast) {
    return (
      <div
        title={toDateString}
        class="flex h-4 w-4 items-center justify-center">
        <div class="bg-base-content/75 aspect-square w-2 rounded-full" />
      </div>
    );
  }

  if (isFuture) {
    return (
      <div
        title={toDateString}
        class="flex h-4 w-4 items-center justify-center">
        <div class="border-base-content/50 aspect-square w-2 rounded-full border" />
      </div>
    );
  }

  return <></>;
};

/* ------------------------------------------------------------------ */
/* Weekday header                                                       */
/* ------------------------------------------------------------------ */

const Weekday = () => {
  const windowSize = useWindowSize();
  const weekday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      class="grid grid-rows-1"
      style={{
        gridTemplateColumns: `repeat(${windowSize().width < 768 ? 3 * 7 : 4 * 7}, minmax(0, 1fr))`,
      }}>
      {[
        ...weekday,
        ...weekday,
        ...weekday,
        ...(windowSize().width >= 768 ? weekday : []),
      ].map((day, index) => (
        <div
          key={`${day}-${index}`}
          class="text-base-content col-span-1 text-center text-xs">
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

const DailyView = (props: DailyViewProps) => {
  const windowSize = useWindowSize();

  const startDateOfYear = new Date(props.year, 0, 1);
  const startWeekDayOfYear = startDateOfYear.getDay();
  const paddingStartDays: number[] = new Array(startWeekDayOfYear).fill(0);
  const daysOfYear: number[] = new Array(isLeapYear(props.year) ? 366 : 365)
    .fill(0)
    .map((_, i) => i + 1);

  const daysByFourWeek = createMemo(() => {
    const times = windowSize().width < 768 ? 3 : 4;
    const daysPerRow = times * 7;
    const paddingEndDays: number[] = new Array(
      daysPerRow - ((startWeekDayOfYear + daysOfYear.length) % daysPerRow)
    ).fill(0);
    const fullDaysOfYear = [
      ...paddingStartDays,
      ...daysOfYear,
      ...paddingEndDays,
    ];
    return fullDaysOfYear.reduce((acc, day, index) => {
      const weekIndex = Math.floor(index / daysPerRow);
      if (!acc[weekIndex]) acc[weekIndex] = [];
      acc[weekIndex].push(day);
      return acc;
    }, [] as number[][]);
  });

  return (
    <div class="w-84 md:w-112">
      {props.withWeekday && <Weekday />}
      <table class="w-full">
        <tbody>
          {daysByFourWeek().map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const toDate = new Date(
                  new Date(props.year, 0, 0).getTime() +
                    day * 24 * 60 * 60 * 1000
                );
                return (
                  <td key={j} class="text-center text-xs">
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

const WeeklyView = ({
  year,
  withWeekday,
}: {
  year: number;
  withWeekday: boolean;
}) => {
  return (
    <div class="w-84 md:w-112">
      {withWeekday && <Weekday />}
      <div class="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3">
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
            <div key={month} class="col-span-1 row-span-1">
              <table class="h-28 w-28">
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

const MonthlyView = ({ year }: { year: number }) => {
  return (
    <div class="w-84 md:w-112">
      <div class="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3">
        {months.map((month, monthIndex) => {
          const daysOfMonth = daysOfMonths[monthIndex];
          const days = Array.from({ length: daysOfMonth }, (_, i) => i + 1);
          const missingDays = 31 - daysOfMonth;
          const fullDays = [...Array(missingDays).fill(0), ...days];

          return (
            <div key={month} class="grid grid-cols-7">
              <div class="text-base-content col-span-4 pl-1 text-left text-xs">
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

const QuarterlyView = ({ year }: { year: number }) => {
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
    <div class="w-84 md:w-112">
      {sumQuarters.map((sum: number, index) => {
        const startMonth = index * 3;
        return (
          <div
            key={`quarter-${index}`}
            class="grid grid-cols-21 items-end md:grid-cols-28">
            <div class="col-span-13 md:col-span-20">
              <span class="text-base-content pl-1 text-xs">
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

const HalfView = ({ year }: { year: number }) => {
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
    <div class="w-84 md:w-112">
      {sumHalves.map((sum: number, index) => {
        const startMonth = index * 6;

        return (
          <div
            key={`half-${index + 1}`}
            class="grid grid-cols-21 items-end md:grid-cols-28">
            <div class="col-span-5 md:col-span-12">
              <span class="text-base-content pl-1 text-xs">
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

export const CalendarTrackerModal = ({ onClose }: { onClose: () => void }) => {
  const today = new Date();

  const [state, setState] = createSignal<{
    year: number;
    view: View;
    withWeekday: boolean;
  }>({
    year: today.getFullYear(),
    view: View.DAILY,
    withWeekday: true,
  });

  const year = () => state().year;
  const view = () => state().view;
  const withWeekday = () => state().withWeekday;

  const showWeekday = () => view() === View.DAILY || view() === View.WEEKLY;

  return (
    <ModalWrapper onClose={onClose} title="Calendar Tracker" size="max-w-fit">
      <div>
        {/* Controls */}
        <nav class="mx-auto mb-3 flex w-84 items-center justify-between md:w-112">
          <div class="flex items-center gap-1">
            {showWeekday() && (
              <button
                class={`btn btn-xs btn-ghost ${withWeekday() ? '' : 'line-through'}`}
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    withWeekday: !prev.withWeekday,
                  }))
                }>
                Weekday
              </button>
            )}
            <div class="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                class="btn btn-xs btn-ghost rounded-field">
                {view() === View.DAILY && 'Daily'}
                {view() === View.WEEKLY && 'Weekly'}
                {view() === View.MONTHLY && 'Monthly'}
                {view() === View.QUARTERLY && 'Quarterly'}
                {view() === View.HALF && 'Half'}
              </div>
              <ul
                tabIndex={-1}
                class="menu dropdown-content border-base-content/10 bg-primary-content z-1 mt-1 rounded-lg border shadow-sm">
                {[
                  View.DAILY,
                  View.WEEKLY,
                  View.MONTHLY,
                  View.QUARTERLY,
                  View.HALF,
                ].map((v) => (
                  <li key={v}>
                    <a
                      class="btn btn-xs btn-ghost"
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
            <div class="join">
              <button
                type="button"
                class="btn btn-xs btn-ghost join-item text-base-content"
                onClick={() =>
                  setState((prev) => ({ ...prev, year: prev.year - 1 }))
                }>
                Previous
              </button>
              <select
                name="year"
                class="select select-xs select-ghost text-base-content join-item m-0 w-full appearance-none bg-none p-0 text-center"
                value={year()}
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
                class="btn btn-xs btn-ghost join-item text-base-content"
                onClick={() =>
                  setState((prev) => ({ ...prev, year: prev.year + 1 }))
                }>
                Next
              </button>
            </div>
          </form>
        </nav>

        {/* View content */}
        <div class="flex items-center justify-center">
          {view() === View.DAILY && (
            <DailyView year={year()} withWeekday={withWeekday()} />
          )}
          {view() === View.WEEKLY && (
            <WeeklyView year={year()} withWeekday={withWeekday()} />
          )}
          {view() === View.MONTHLY && <MonthlyView year={year()} />}
          {view() === View.QUARTERLY && <QuarterlyView year={year()} />}
          {view() === View.HALF && <HalfView year={year()} />}
        </div>
      </div>
    </ModalWrapper>
  );
};
