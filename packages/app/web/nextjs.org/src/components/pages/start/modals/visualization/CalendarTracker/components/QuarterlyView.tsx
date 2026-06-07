import { FC } from 'react';

import { Dot } from './Dot';
import { daysOfMonths } from '../constants';

export const QuarterlyView: FC<{ year: number }> = ({ year }) => {
  const quarters: number[][] = daysOfMonths.reduce((acc, day, index) => {
    const quarterIndex = Math.floor(index / 3);
    if (!acc[quarterIndex]) acc[quarterIndex] = [];
    acc[quarterIndex].push(day);
    return acc;
  }, [] as number[][]);

  return (
    <div className="w-84 md:w-112">
      {quarters.map((monthDays, index) => {
        const sum = monthDays.reduce((a, b) => a + b, 0);
        return (
          <div
            key={`quarter-${index}`}
            className="grid grid-cols-21 items-end md:grid-cols-28">
            <div className="col-span-13 md:col-span-20">
              <span className="text-base-content pl-1 text-xs">
                Quarter {index + 1}
              </span>
            </div>
            {Array.from({ length: sum }).map((_, i) => (
              <Dot
                key={`${index}-${i}`}
                index={i + 1}
                date={new Date(year, index * 3, i + 1)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export const HalfView: FC<{ year: number }> = ({ year }) => {
  const halves: number[][] = daysOfMonths.reduce((acc, day, index) => {
    const halfIndex = Math.floor(index / 6);
    if (!acc[halfIndex]) acc[halfIndex] = [];
    acc[halfIndex].push(day);
    return acc;
  }, [] as number[][]);

  return (
    <div className="w-84 md:w-112">
      {halves.map((monthDays, index) => {
        const sum = monthDays.reduce((a, b) => a + b, 0);
        return (
          <div
            key={`half-${index + 1}`}
            className="grid grid-cols-21 items-end md:grid-cols-28">
            <div className="col-span-5 md:col-span-12">
              <span className="text-base-content pl-1 text-xs">
                Half {index + 1}
              </span>
            </div>
            {Array.from({ length: sum }).map((_, i) => (
              <Dot
                key={`${index}-${i}`}
                index={i + 1}
                date={new Date(year, index * 6, i + 1)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
