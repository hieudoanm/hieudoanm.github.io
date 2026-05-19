import { WeatherData, weatherCodeToText } from '@hieudoanm/data/weather';
import { FC } from 'react';

export const WeatherBadge: FC<{ weather: WeatherData | undefined }> = ({
  weather,
}) => {
  if (!weather)
    return (
      <span className="badge badge-ghost badge-sm italic opacity-40">…</span>
    );
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="badge badge-outline badge-sm font-mono font-semibold tracking-wider">
        {weather.temperature_2m}°C
      </span>
      <span className="text-xs whitespace-nowrap opacity-50">
        {weatherCodeToText(weather.weather_code)}
      </span>
    </div>
  );
};

export const CityCard: FC<{
  label: string;
  time: string;
  weather: WeatherData | undefined;
  index: number;
}> = ({ label, time, weather, index }) => {
  const [hh, mm, ss] = time.split(':');
  return (
    <div
      className="card bg-base-200 border-base-300 hover:border-primary/40 hover:bg-base-300 group border transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}>
      <div className="card-body flex-row items-center justify-between gap-3 p-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-1.5">
            <div className="bg-primary h-1.5 w-1.5 rounded-full opacity-70 transition-opacity group-hover:opacity-100" />
            <h2 className="truncate text-xs font-semibold tracking-widest uppercase opacity-60">
              {label}
            </h2>
          </div>
          <div className="flex items-baseline gap-0.5 font-mono text-lg font-bold tracking-tight tabular-nums">
            <span>{hh}</span>
            <span className="animate-pulse opacity-30">:</span>
            <span>{mm}</span>
            <span className="animate-pulse opacity-30">:</span>
            <span className="text-sm opacity-50">{ss}</span>
          </div>
        </div>
        <div className="shrink-0">
          <WeatherBadge weather={weather} />
        </div>
      </div>
    </div>
  );
};
