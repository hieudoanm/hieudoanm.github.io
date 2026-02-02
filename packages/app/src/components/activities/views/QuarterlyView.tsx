import { daysOfMonths, isLeapYear } from '@web/utils/time';
import { FC } from 'react';
import { Dot } from '../Dot';

export const QuarterlyView: FC<{ year: number }> = ({ year }) => {
  const quarters: number[][] = daysOfMonths.reduce((acc, day, index) => {
    const quarterIndex = Math.floor(index / 3);
    if (!acc[quarterIndex]) {
      acc[quarterIndex] = [];
    }
    acc[quarterIndex].push(day);
    return acc;
  }, [] as number[][]);

  const sumQuarters: number[] = quarters.map((months) => {
    const sum = months.reduce((acc, day) => acc + day, 0);
    return sum;
  });
  const max: number = Math.max(...sumQuarters);

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
              .map((_, i) => {
                return (
                  <Dot
                    key={`${index}-${i}`}
                    index={i + 1}
                    date={new Date(year, startMonth, i + 1)}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
  );
};
