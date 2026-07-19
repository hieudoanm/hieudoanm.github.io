import { CityCard } from './CityCard';
import { timezones } from '@hieudoanm.github.io/data/timezones';
import type { WeatherData } from '@hieudoanm.github.io/data/weather';
import { FC } from 'react';

export const WorldClock: FC<{
  times: string[];
  weatherQueries: { data: WeatherData | undefined }[];
  query: string;
}> = ({ times, weatherQueries, query }) => {
  const q = query.toLowerCase().trim();
  const filtered = timezones
    .map((tz, index) => ({ tz, index }))
    .filter(
      ({ tz }) =>
        !q ||
        tz.label.toLowerCase().includes(q) ||
        tz.country.toLowerCase().includes(q)
    );

  return (
    <div className="flex min-h-0 flex-col gap-2">
      <div className="flex flex-col gap-2">
        {filtered
          .filter(({ tz }) => tz.favorite)
          .map(({ tz, index }) => (
            <CityCard
              key={tz.label}
              label={tz.label}
              country={tz.country}
              time={times[index]}
              weather={weatherQueries[index].data}
              index={index}
            />
          ))}
        {filtered.some(({ tz }) => tz.favorite) &&
          filtered.some(({ tz }) => !tz.favorite) && (
            <div className="border-base-300 border-t" />
          )}
        {filtered
          .filter(({ tz }) => !tz.favorite)
          .map(({ tz, index }) => (
            <CityCard
              key={tz.label}
              label={tz.label}
              country={tz.country}
              time={times[index]}
              weather={weatherQueries[index].data}
              index={index}
            />
          ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-base-content/30 py-8 text-center text-xs">
          No cities match "{query}"
        </p>
      )}
      <p className="text-base-content/20 pt-3 text-center font-mono text-[10px] tracking-widest uppercase">
        Weather via Open-Meteo · 10 min
      </p>
    </div>
  );
};

WorldClock.displayName = 'WorldClock';
