import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useState } from 'react';

import { DailyView } from './components/DailyView';
import { MonthlyView } from './components/MonthlyView';
import { QuarterlyView, HalfView } from './components/QuarterlyView';
import { WeeklyView } from './components/WeeklyView';
import { View, years } from './constants';

export const CalendarTracker: FC<{ onClose: () => void }> = ({ onClose }) => {
  const today = new Date();
  const [{ year, view, withWeekday }, setState] = useState({
    year: today.getFullYear(),
    view: View.DAILY,
    withWeekday: true,
  });
  const showWeekday = view === View.DAILY || view === View.WEEKLY;

  return (
    <FullScreen onClose={onClose} title="Calendar Tracker">
      <div>
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
                      {v}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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
    </FullScreen>
  );
};
CalendarTracker.displayName = 'CalendarTracker';
