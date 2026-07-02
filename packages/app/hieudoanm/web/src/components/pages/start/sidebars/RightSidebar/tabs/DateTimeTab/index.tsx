import { events } from '@hieudoanm.github.io/data/calendar/events';
import type { WeatherData } from '@hieudoanm.github.io/data/weather';
import { LunarCalendar } from '@lodashx/ts';
import { useQueries } from '@tanstack/react-query';
import { FC, useState } from 'react';

import { timezones } from '@hieudoanm.github.io/data/timezones';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { EventList } from './EventList';
import { LunarDate } from './LunarDate';
import { WorldClock } from './WorldClock';

const lunarCalendar = new LunarCalendar();

const getEventsForDate = (date: Date) =>
  events.filter(({ year = 0, month = 0, date: d = 0, frequency = '' }) => {
    const yearMatch =
      year === 0 || frequency === 'annual' || year === date.getFullYear();
    const monthMatch = month === 0 || month === date.getMonth() + 1;
    const dateMatch = d === 0 || d === date.getDate();
    return yearMatch && monthMatch && dateMatch;
  });

export const DateTimeTab: FC<{ times: string[] }> = ({ times }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [chosenDate, setChosenDate] = useState(today);

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
  DateTimeTab.displayName = 'DateTimeTab';

  const chosenEvents = getEventsForDate(chosenDate);

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
      <CalendarHeader
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      <CalendarGrid
        year={year}
        month={month}
        today={today}
        chosenDate={chosenDate}
        setChosenDate={setChosenDate}
        events={events}
      />

      <div className="border-base-300 border-t" />

      <LunarDate
        chosenDate={chosenDate}
        lunarDay={lunarDay}
        lunarMonth={lunarMonth}
        lunarYear={lunarYear}
      />

      <div className="border-base-300 border-t" />

      <EventList events={chosenEvents} />

      <div className="border-base-300 border-t" />

      <WorldClock times={times} weatherQueries={weatherQueries} />
    </div>
  );
};
