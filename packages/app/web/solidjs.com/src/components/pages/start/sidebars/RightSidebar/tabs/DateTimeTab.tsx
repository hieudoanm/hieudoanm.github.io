import { CityCard } from '@hieudoanm.github.io/components/pages/start/cards/CityCard';
import { Event, events } from '@hieudoanm.github.io/data/calendar/events';
import {
  months,
  monthsByQuarters,
} from '@hieudoanm.github.io/data/calendar/months';
import { yearsByDecades } from '@hieudoanm.github.io/data/calendar/years';
import { timezones } from '@hieudoanm.github.io/data/timezones';
import type { WeatherData } from '@hieudoanm.github.io/data/weather';
import { LunarCalendar, calendar, weekOfYear } from '@lodashx/ts';
import { useQueries } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';

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

export const DateTimeTab = (props: { times: string[] }) => {
  const today = new Date();
  const [month, setMonth] = createSignal(today.getMonth());
  const [year, setYear] = createSignal(today.getFullYear());
  const [chosenDate, setChosenDate] = createSignal(today);

  const weatherQueries = useQueries({
    queries: timezones.map(({ lat, lon }) => ({
      queryKey: ['open-meteo', lat, lon],
      queryFn: async () => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        return (await res.json()).current as WeatherData;
      },
      staleTime: 1000 * 60 * 10,
    })),
  });

  const currentMonth = month();
  const currentYear = year();
  const currentChosenDate = chosenDate();

  const calendarData = calendar(currentYear, currentMonth);
  const chosenEvents = getEventsForDate(currentChosenDate);

  const lunarChosen = lunarCalendar.solar2lunar(
    currentChosenDate.getFullYear(),
    currentChosenDate.getMonth() + 1,
    currentChosenDate.getDate()
  );
  const lunarDay = lunarChosen === -1 ? null : lunarChosen.lDay;
  const lunarMonth = lunarChosen === -1 ? null : lunarChosen.lMonth;
  const lunarYear = lunarChosen === -1 ? null : lunarChosen.lYear;

  const handlePrev = () => {
    if (currentMonth === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const handleNext = () => {
    if (currentMonth === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  return (
    <div class="flex flex-col gap-4 p-3">
      <div class="flex items-center gap-1">
        <button
          class="btn btn-ghost btn-xs border-base-300 border"
          onClick={handlePrev}>
          ‹
        </button>
        <select
          class="select select-bordered select-xs flex-1"
          value={currentMonth}
          onChange={(e) => setMonth(parseInt(e.currentTarget.value))}>
          {monthsByQuarters.map(({ quarter, months: qm = [] }) => (
            <optgroup label={`Q${quarter}`}>
              {qm.map(({ monthIndex, month: mName }) => (
                <option value={monthIndex}>{mName}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <select
          class="select select-bordered select-xs w-20"
          value={currentYear}
          onChange={(e) => setYear(parseInt(e.currentTarget.value))}>
          {yearsByDecades.map(({ decade = 0, years = [] }) => (
            <optgroup label={`${decade}s`}>
              {years.map(({ year: y }) => (
                <option value={y}>{y}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <button
          class="btn btn-ghost btn-xs border-base-300 border"
          onClick={handleNext}>
          ›
        </button>
      </div>

      <div>
        <p class="text-base-content/40 mb-2 text-[10px] font-bold tracking-widest uppercase">
          {months[currentMonth].month} {currentYear}
        </p>
        <table class="w-full border-collapse text-[11px]">
          <thead>
            <tr>
              <th class="text-base-content/30 w-6 pb-1 text-center font-medium">
                Wk
              </th>
              {DAY_SHORT.map((d) => (
                <th class="text-base-content/30 pb-1 text-center font-medium">
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
                let wy = currentYear,
                  wm = currentMonth;
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
                weekNum = weekOfYear(
                  new Date(wy, wm, firstDay.date)
                ).toString();
              }
              return (
                <tr>
                  <td class="text-base-content/25 py-0.5 text-center text-[10px]">
                    {weekNum}
                  </td>
                  {week.map((dateObj, j) => {
                    if (!dateObj) return <td />;
                    const { date, currentMonth } = dateObj;
                    let cellDate = new Date(currentYear, currentMonth, date);
                    if (currentMonth === 'previous')
                      cellDate = new Date(currentYear, currentMonth - 1, date);
                    else if (currentMonth === 'next')
                      cellDate = new Date(currentYear, currentMonth + 1, date);
                    const isToday =
                      currentMonth === 'current' &&
                      date === today.getDate() &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear();
                    const isChosen =
                      cellDate.toDateString() ===
                      currentChosenDate.toDateString();
                    const hasEvents =
                      currentMonth === 'current' &&
                      getEventsForDate(cellDate).length > 0;
                    return (
                      <td class="p-0 text-center">
                        <button
                          onClick={() => setChosenDate(cellDate)}
                          class={[
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

      <div class="border-base-300 border-t" />

      <div>
        <p class="text-base-content/40 mb-2 text-[10px] font-bold tracking-widest uppercase">
          Lunar Date
        </p>
        <p class="text-base-content/70 text-xs">
          {DAY_LONG[currentChosenDate.getDay()]},{' '}
          {months[currentChosenDate.getMonth()].month}{' '}
          {currentChosenDate.getDate()}, {currentChosenDate.getFullYear()}
        </p>
        {lunarDay !== null ? (
          <p class="text-primary mt-1 font-mono text-sm font-bold">
            {lunarDay}/{lunarMonth}/{lunarYear}
          </p>
        ) : (
          <p class="text-base-content/30 mt-1 text-xs">Unavailable</p>
        )}
      </div>

      <div class="border-base-300 border-t" />

      <div>
        <p class="text-base-content/40 mb-2 text-[10px] font-bold tracking-widest uppercase">
          Events
        </p>
        {chosenEvents.length === 0 ? (
          <p class="text-base-content/25 text-xs">No events on this date.</p>
        ) : (
          <div class="flex flex-col gap-2">
            {chosenEvents.map((event) => (
              <div class="bg-primary/10 border-primary/20 text-primary rounded-lg border px-2 py-1.5 text-[11px] leading-snug">
                <p class="font-semibold">{event.title}</p>
                <p class="text-primary/60 mt-0.5 text-[10px]">{event.field}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div class="border-base-300 border-t" />

      <div class="flex min-h-0 flex-col gap-2">
        <p class="text-base-content/40 mb-2 text-[10px] font-bold tracking-widest uppercase">
          World Clock
        </p>
        <div class="flex flex-col gap-2">
          {timezones
            .map((tz, index) => ({ tz, index }))
            .filter(({ tz }) => tz.favorite)
            .map(({ tz, index }) => (
              <CityCard
                label={tz.label}
                time={props.times[index]}
                weather={weatherQueries[index].data}
                index={index}
              />
            ))}
          <hr class="border-base-300 my-1" />
          {timezones
            .map((tz, index) => ({ tz, index }))
            .filter(({ tz }) => !tz.favorite)
            .map(({ tz, index }) => (
              <CityCard
                label={tz.label}
                time={props.times[index]}
                weather={weatherQueries[index].data}
                index={index}
              />
            ))}
        </div>
        <p class="text-base-content/20 pt-3 text-center font-mono text-[10px] tracking-widest uppercase">
          Weather via Open-Meteo · 10 min
        </p>
      </div>
    </div>
  );
};
