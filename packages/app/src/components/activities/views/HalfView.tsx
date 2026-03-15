import { daysOfMonths } from '@web/utils/time';
import { FC } from 'react';
import { Dot } from '../Dot';

export const HalfView: FC<{ year: number }> = ({ year }) => {
  const halves: number[][] = daysOfMonths.reduce((acc, day, index) => {
    const halfIndex = Math.floor(index / 6);
    if (!acc[halfIndex]) {
      acc[halfIndex] = [];
    }
    acc[halfIndex].push(day);
    return acc;
  }, [] as number[][]);

  const sumHalves: number[] = halves.map((months) => {
    const sum = months.reduce((acc, day) => acc + day, 0);
    return sum;
  });

  return (
    <div className="w-84 md:w-112">
      {sumHalves.map((sum: number, index) => {
        const startMonth = index * 3;
        return (
          <div
            key={`half-${index}`}
            className="grid grid-cols-21 items-end md:grid-cols-28">
            <div className="col-span-5 md:col-span-12">
              <span className="text-base-content pl-1 text-xs">
                Half {index + 1}
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
