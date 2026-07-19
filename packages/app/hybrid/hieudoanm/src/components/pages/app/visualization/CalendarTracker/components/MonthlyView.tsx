import { FC } from 'react';

import { Dot } from './Dot';
import { daysOfMonths, months } from '../constants';

export const MonthlyView: FC<{ year: number }> = ({ year }) => (
  <div className="w-84 md:w-112">
    <div className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3">
      {months.map((month, monthIndex) => {
        const daysOfMonth = daysOfMonths[monthIndex];
        const fullDays = [
          ...Array(31 - daysOfMonth).fill(0),
          ...Array.from({ length: daysOfMonth }, (_, i) => i + 1),
        ];
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
MonthlyView.displayName = 'MonthlyView';
