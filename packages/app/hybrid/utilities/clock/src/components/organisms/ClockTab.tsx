'use client';

import { getTimeInZone, timezones } from '@/data/timezones';
import type { WeatherData } from '@/data/weather';
import { useQueries } from '@tanstack/react-query';
import { FC, useCallback, useEffect, useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { WorldClock } from './WorldClock';

export const ClockTab: FC = () => {
  const [query, setQuery] = useState('');
  const [times, setTimes] = useState<string[]>([]);

  const updateTime = useCallback(() => {
    setTimes(timezones.map(({ tz }) => getTimeInZone(tz)));
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  const weatherQueries = useQueries({
    queries: timezones.map(({ lat, lon }) => ({
      queryKey: ['open-meteo', lat, lon],
      queryFn: async (): Promise<WeatherData> => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        if (!res.ok) {
          throw new Error(`Weather API error: ${res.status}`);
        }
        const data = await res.json();
        return data.current as WeatherData;
      },
      staleTime: 1000 * 60 * 10,
      retry: 2,
    })),
  });

  return (
    <div className="flex min-h-0 flex-col p-3">
      <div className="border-base-300 relative mb-3">
        <PiMagnifyingGlass className="text-base-content/40 absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search cities…"
          className="input input-bordered input-xs w-full pl-7"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <WorldClock
          times={times}
          weatherQueries={weatherQueries}
          query={query}
        />
      </div>
    </div>
  );
};
ClockTab.displayName = 'ClockTab';
