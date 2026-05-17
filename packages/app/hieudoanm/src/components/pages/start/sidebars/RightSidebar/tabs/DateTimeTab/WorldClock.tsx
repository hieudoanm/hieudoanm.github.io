import { CityCard } from './CityCard';
import { timezones } from '@hieudoanm.github.io/data/timezones';
import type { WeatherData } from '@hieudoanm.github.io/data/weather';
import { FC } from 'react';

export const WorldClock: FC<{
  times: string[];
  weatherQueries: { data: WeatherData | undefined }[];
}> = ({ times, weatherQueries }) => (
  <div className="flex min-h-0 flex-col gap-2">
    <p className="text-base-content/40 mb-2 text-[10px] font-normal tracking-widest uppercase">
      World Clock
    </p>
    <div className="flex flex-col gap-2">
      {timezones
        .map((tz, index) => ({ tz, index }))
        .filter(({ tz }) => tz.favorite)
        .map(({ tz, index }) => (
          <CityCard
            key={tz.label}
            label={tz.label}
            time={times[index]}
            weather={weatherQueries[index].data}
            index={index}
          />
        ))}
      <div className="border-base-300 border-t" />
      {timezones
        .map((tz, index) => ({ tz, index }))
        .filter(({ tz }) => !tz.favorite)
        .map(({ tz, index }) => (
          <CityCard
            key={tz.label}
            label={tz.label}
            time={times[index]}
            weather={weatherQueries[index].data}
            index={index}
          />
        ))}
    </div>
    <p className="text-base-content/20 pt-3 text-center font-mono text-[10px] tracking-widest uppercase">
      Weather via Open-Meteo · 10 min
    </p>
  </div>
);

WorldClock.displayName = 'WorldClock';
