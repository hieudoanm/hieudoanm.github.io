import { useWindowSize } from '@web/hooks/window/use-size';
import { isLeapYear } from '@web/utils/time';
import { FC } from 'react';
import { Dot } from './Dot';
import { Weekday } from './Weekday';

export type DailyViewProps = {
  year: number;
  withWeekday: boolean;
};

export const DailyView: FC<DailyViewProps> = ({ year, withWeekday }) => {
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
