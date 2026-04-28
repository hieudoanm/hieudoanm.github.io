import { CityCard } from '@hieudoanm/components/cards/CityCard';
import { timezones } from '@hieudoanm/data/timezones';
import { WeatherData } from '@hieudoanm/data/weather';
import { FC } from 'react';

export const ClockWeatherTab: FC<{
  times: string[];
  weatherQueries: { data: WeatherData | undefined }[];
}> = ({ times, weatherQueries }) => (
  <div className="flex flex-col gap-2 p-3">
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
    <hr className="border-base-300 my-2" />
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
    <p className="text-base-content/20 pt-1 text-center font-mono text-[10px] tracking-widest uppercase">
      Weather via Open-Meteo · 10 min
    </p>
  </div>
);
