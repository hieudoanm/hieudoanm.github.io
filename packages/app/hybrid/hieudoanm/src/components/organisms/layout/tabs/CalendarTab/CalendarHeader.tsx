import { monthsByQuarters } from '@hieudoanm.github.io/data/calendar/months';
import { yearsByDecades } from '@hieudoanm.github.io/data/calendar/years';
import { FC } from 'react';

export const CalendarHeader: FC<{
  month: number;
  year: number;
  setMonth: (m: number) => void;
  setYear: (y: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
}> = ({ month, year, setMonth, setYear, handlePrev, handleNext }) => (
  <div className="flex items-center gap-1">
    <button
      className="btn btn-ghost btn-xs border-base-300 border"
      onClick={handlePrev}>
      ‹
    </button>
    <select
      className="select select-bordered select-xs flex-1"
      value={month}
      onChange={(e) => setMonth(parseInt(e.target.value))}>
      {monthsByQuarters.map(({ quarter, months: qm = [] }) => (
        <optgroup key={quarter} label={`Q${quarter}`}>
          {qm.map(({ monthIndex, month: mName }) => (
            <option key={mName} value={monthIndex}>
              {mName}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
    <select
      className="select select-bordered select-xs w-20"
      value={year}
      onChange={(e) => setYear(parseInt(e.target.value))}>
      {yearsByDecades.map(({ decade = 0, years = [] }) => (
        <optgroup key={decade} label={`${decade}s`}>
          {years.map(({ year: y }) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
    <button
      className="btn btn-ghost btn-xs border-base-300 border"
      onClick={handleNext}>
      ›
    </button>
  </div>
);
CalendarHeader.displayName = 'CalendarHeader';
