import type { WeatherData } from '@hieudoanm.github.io/data/weather';
import { FC } from 'react';
import { WeatherBadge } from './WeatherBadge';

const TimeDisplay: FC<{ time: string }> = ({ time }) => {
  const [hh, mm, ss] = time.split(':');
  return (
    <div className="flex items-baseline gap-0.5 font-mono text-lg font-normal tracking-tight tabular-nums">
      <span className="text-base-content">{hh}</span>
      <span className="text-base-content/30 animate-pulse">:</span>
      <span className="text-base-content">{mm}</span>
      <span className="text-base-content/30 animate-pulse">:</span>
      <span className="text-base-content/50 text-sm">{ss}</span>
    </div>
  );
};

export const CityCard: FC<{
  label: string;
  country: string;
  time: string;
  weather: WeatherData | undefined;
  index: number;
}> = ({ label, country, time, weather, index }) => (
  <div
    className="bg-base-200 border-base-300 hover:border-base-content/20 hover:bg-base-300 group flex items-center justify-between gap-3 rounded-lg border p-3 transition-all duration-300"
    style={{ animationDelay: `${index * 60}ms` }}>
    <div className="flex min-w-0 items-center gap-2.5">
      <div className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full opacity-70 transition-opacity group-hover:opacity-100" />
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-base-content/60 truncate text-xs font-normal tracking-widest uppercase">
            {label}
          </span>
          <span className="text-base-content/20 shrink-0 text-[10px]">
            {country}
          </span>
        </div>
        <TimeDisplay time={time} />
      </div>
    </div>
    <WeatherBadge weather={weather} />
  </div>
);
CityCard.displayName = 'CityCard';
