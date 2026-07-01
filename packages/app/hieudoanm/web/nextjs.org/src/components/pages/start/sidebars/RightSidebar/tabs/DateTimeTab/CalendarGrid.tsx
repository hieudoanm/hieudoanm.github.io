import type { Event } from '@hieudoanm.github.io/data/calendar/events';
import { months } from '@hieudoanm.github.io/data/calendar/months';
import { calendar, weekOfYear } from '@lodashx/ts';
import { FC } from 'react';

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getEventsForDate = (date: Date, events: Event[]): Event[] =>
  events.filter(({ year = 0, month = 0, date: d = 0, frequency = '' }) => {
    const yearMatch =
      year === 0 || frequency === 'annual' || year === date.getFullYear();
    const monthMatch = month === 0 || month === date.getMonth() + 1;
    const dateMatch = d === 0 || d === date.getDate();
    return yearMatch && monthMatch && dateMatch;
  });

export const CalendarGrid: FC<{
  year: number;
  month: number;
  today: Date;
  chosenDate: Date;
  setChosenDate: (d: Date) => void;
  events: Event[];
}> = ({ year, month, today, chosenDate, setChosenDate, events }) => {
  const calendarData = calendar(year, month);

  return (
    <div>
      <p className="text-base-content/40 mb-2 text-[10px] font-normal tracking-widest uppercase">
        {months[month].month} {year}
      </p>
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr>
            <th className="text-base-content/30 w-6 pb-1 text-center font-normal">
              Wk
            </th>
            {DAY_SHORT.map((d) => (
              <th
                key={d}
                className="text-base-content/30 pb-1 text-center font-normal">
                {d.charAt(0)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarData.map((week, i) => {
            const firstDay = week.find((d) => d?.currentMonth !== undefined);
            let weekNum = '';
            if (firstDay) {
              let wy = year,
                wm = month;
              if (firstDay.currentMonth === 'previous') {
                wm--;
                if (wm < 0) {
                  wm = 11;
                  wy--;
                }
              } else if (firstDay.currentMonth === 'next') {
                wm++;
                if (wm > 11) {
                  wm = 0;
                  wy++;
                }
              }
              weekNum = weekOfYear(new Date(wy, wm, firstDay.date)).toString();
            }
            return (
              <tr key={i}>
                <td className="text-base-content/25 py-0.5 text-center text-[10px]">
                  {weekNum}
                </td>
                {week.map((dateObj, j) => {
                  if (!dateObj) return <td key={j} />;
                  const { date, currentMonth } = dateObj;
                  let cellDate = new Date(year, month, date);
                  if (currentMonth === 'previous')
                    cellDate = new Date(year, month - 1, date);
                  else if (currentMonth === 'next')
                    cellDate = new Date(year, month + 1, date);
                  const isToday =
                    currentMonth === 'current' &&
                    date === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();
                  const isChosen =
                    cellDate.toDateString() === chosenDate.toDateString();
                  const hasEvents =
                    currentMonth === 'current' &&
                    getEventsForDate(cellDate, events).length > 0;
                  return (
                    <td key={j} className="p-0 text-center">
                      <button
                        onClick={() => setChosenDate(cellDate)}
                        className={[
                          'h-6 w-6 rounded-full text-[11px] transition-colors',
                          isChosen
                            ? 'bg-primary text-primary-content font-normal'
                            : isToday
                              ? 'text-base-content/60 font-normal'
                              : currentMonth !== 'current'
                                ? 'text-base-content/20'
                                : hasEvents
                                  ? 'text-primary hover:bg-base-300'
                                  : 'hover:bg-base-300',
                        ].join(' ')}>
                        {date}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
CalendarGrid.displayName = 'CalendarGrid';
