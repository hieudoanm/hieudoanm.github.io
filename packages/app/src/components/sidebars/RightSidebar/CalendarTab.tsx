// ── Helpers ──────────────────────────────────────────────────────────────────

import { Event, events } from '@hieudoanm/data/calendar/events';
import { monthsByQuarters, months } from '@hieudoanm/data/calendar/months';
import { yearsByDecades } from '@hieudoanm/data/calendar/years';
import {
  LunarCalendar,
  generateFullCalendar,
  getWeekOfYear,
} from '@hieudoanm/utils/calendar';
import { FC, useState } from 'react';

const lunarCalendar = new LunarCalendar();

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_LONG = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const getEventsForDate = (date: Date): Event[] =>
  events.filter(({ year = 0, month = 0, date: d = 0, frequency = '' }) => {
    const yearMatch =
      year === 0 || frequency === 'annual' || year === date.getFullYear();
    const monthMatch = month === 0 || month === date.getMonth() + 1;
    const dateMatch = d === 0 || d === date.getDate();
    return yearMatch && monthMatch && dateMatch;
  });

// ── Calendar Tab ─────────────────────────────────────────────────────────────

export const CalendarTab: FC = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [chosenDate, setChosenDate] = useState(today);

  const calendar = generateFullCalendar(year, month);
  const chosenEvents = getEventsForDate(chosenDate);

  // Lunar date for chosen date
  const lunarChosen = lunarCalendar.solar2lunar(
    chosenDate.getFullYear(),
    chosenDate.getMonth() + 1,
    chosenDate.getDate()
  );
  const lunarDay = lunarChosen === -1 ? null : lunarChosen.lDay;
  const lunarMonth = lunarChosen === -1 ? null : lunarChosen.lMonth;
  const lunarYear = lunarChosen === -1 ? null : lunarChosen.lYear;

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  return (
    <div className="flex flex-col gap-4 p-3">
      {/* ── Month / Year controls ── */}
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

      {/* ── Section 1: Mini calendar with week numbers ── */}
      <div>
        <p className="text-base-content/40 mb-2 text-[10px] font-bold tracking-widest uppercase">
          {months[month].month} {year}
        </p>
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr>
              <th className="text-base-content/30 w-6 pb-1 text-center font-medium">
                Wk
              </th>
              {DAY_SHORT.map((d) => (
                <th
                  key={d}
                  className="text-base-content/30 pb-1 text-center font-medium">
                  {d.charAt(0)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, i) => {
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
                weekNum = getWeekOfYear(
                  new Date(wy, wm, firstDay.date)
                ).toString();
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
                      getEventsForDate(cellDate).length > 0;

                    return (
                      <td key={j} className="p-0 text-center">
                        <button
                          onClick={() => setChosenDate(cellDate)}
                          className={[
                            'h-6 w-6 rounded-full text-[11px] transition-colors',
                            isChosen
                              ? 'bg-primary text-primary-content font-bold'
                              : isToday
                                ? 'text-secondary font-bold'
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

      <div className="border-base-300 border-t" />

      {/* ── Section 2: Lunar date ── */}
      <div>
        <p className="text-base-content/40 mb-2 text-[10px] font-bold tracking-widest uppercase">
          Lunar Date
        </p>
        <p className="text-base-content/70 text-xs">
          {DAY_LONG[chosenDate.getDay()]}, {months[chosenDate.getMonth()].month}{' '}
          {chosenDate.getDate()}, {chosenDate.getFullYear()}
        </p>
        {lunarDay !== null ? (
          <p className="text-primary mt-1 font-mono text-sm font-bold">
            {lunarDay}/{lunarMonth}/{lunarYear}
          </p>
        ) : (
          <p className="text-base-content/30 mt-1 text-xs">Unavailable</p>
        )}
      </div>

      <div className="border-base-300 border-t" />

      {/* ── Section 3: Events ── */}
      <div>
        <p className="text-base-content/40 mb-2 text-[10px] font-bold tracking-widest uppercase">
          Events
        </p>
        {chosenEvents.length === 0 ? (
          <p className="text-base-content/25 text-xs">
            No events on this date.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {chosenEvents.map((event) => (
              <div
                key={event.title}
                className="bg-primary/10 border-primary/20 text-primary rounded-lg border px-2 py-1.5 text-[11px] leading-snug">
                <p className="font-semibold">{event.title}</p>
                <p className="text-primary/60 mt-0.5 text-[10px]">
                  {event.field}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
