import {
  WeatherData,
  weatherCodeToText,
} from '@hieudoanm.github.io/data/weather';
import { FC } from 'react';

export const WeatherBadge: FC<{ weather: WeatherData | undefined }> = ({
  weather,
}) => {
  if (!weather)
    return (
      <span className="badge badge-ghost badge-sm text-base-content/40 italic">
        …
      </span>
    );
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="badge badge-ghost badge-sm font-mono font-normal tracking-wider">
        {weather.temperature_2m}°C
      </span>
      <span className="text-base-content/50 text-xs whitespace-nowrap">
        {weatherCodeToText(weather.weather_code)}
      </span>
    </div>
  );
};

WeatherBadge.displayName = 'WeatherBadge';
