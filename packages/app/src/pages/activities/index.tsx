import { DailyView } from '@web/components/activities/DailyView';
import { MonthlyView } from '@web/components/activities/MonthlyView';
import { WeeklyView } from '@web/components/activities/WeeklyView';
import { NextPage } from 'next';
import { useState } from 'react';

const startYear = 1970;
const endYear = new Date().getFullYear();
const years = new Array(endYear - startYear + 1)
  .fill(0)
  .map((_, i) => startYear + i);

enum View {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

const ActivitiesPage: NextPage = () => {
  const today = new Date();

  const [
    { year = today.getFullYear(), view = View.DAILY, withWeekday = false },
    setState,
  ] = useState<{
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
    <div className="flex h-screen w-screen flex-col p-4 md:p-8">
      <nav className="mx-auto flex w-84 items-center justify-between md:w-112">
        <span className="font-black">Activities</span>
        <div className="flex items-center">
          {showWeekday && (
            <button
              className={`btn btn-xs btn-ghost ${withWeekday ? '' : 'line-through'}`}
              onClick={() => {
                setState((previous) => ({
                  ...previous,
                  withWeekday: !previous.withWeekday,
                }));
              }}>
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
            </div>
            <ul
              tabIndex={-1}
              className="menu dropdown-content border-base-content/10 bg-primary-content z-1 mt-1 rounded-lg border shadow-sm">
              {[View.DAILY, View.WEEKLY, View.MONTHLY].map((v) => (
                <li key={v}>
                  <a
                    className="btn btn-xs btn-ghost"
                    onClick={() => {
                      setState((previous) => ({
                        ...previous,
                        view: v,
                      }));
                    }}>
                    {v === View.DAILY && 'Daily'}
                    {v === View.WEEKLY && 'Weekly'}
                    {v === View.MONTHLY && 'Monthly'}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <main className="flex grow items-center justify-center">
        <div className="flex flex-col gap-y-1">
          <form onSubmit={(e) => e.preventDefault()}>
            <select
              name="year"
              className="select select-xs select-ghost text-base-content m-0 w-full appearance-none bg-none p-0 text-center focus:bg-transparent focus:outline-none"
              value={year}
              onChange={(e) =>
                setState((previous) => ({
                  ...previous,
                  year: Number(e.target.value),
                }))
              }>
              {years.map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </form>
          {view === View.DAILY && (
            <DailyView year={year} withWeekday={withWeekday} />
          )}
          {view === View.WEEKLY && (
            <WeeklyView year={year} withWeekday={withWeekday} />
          )}
          {view === View.MONTHLY && <MonthlyView year={year} />}
        </div>
      </main>
    </div>
  );
};

export default ActivitiesPage;
