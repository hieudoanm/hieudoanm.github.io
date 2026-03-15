import { daysOfMonths, isLeapYear, months } from '@web/utils/time';
import { FC } from 'react';
import { Dot } from '../Dot';
import { Weekday } from '../Weekday';

export const WeeklyView: FC<{ year: number; withWeekday: boolean }> = ({
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
