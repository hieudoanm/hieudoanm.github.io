import type { WeatherData } from '@hieudoanm.github.io/data/weather';
import { FC } from 'react';
import { WeatherBadge } from './WeatherBadge';

export const CityCard: FC<{
  label: string;
  time: string;
  weather: WeatherData | undefined;
  index: number;
}> = ({ label, time, weather, index }) => {
  const [hh, mm, ss] = time.split(':');
  return (
    <div
      className="bg-base-200 border-base-300 hover:border-base-content/20 hover:bg-base-300 group flex items-center justify-between gap-3 rounded-lg border p-3 transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}>
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-1.5">
          <div className="bg-primary h-1.5 w-1.5 rounded-full opacity-70 transition-opacity group-hover:opacity-100" />
          <span className="text-base-content/60 truncate text-xs font-normal tracking-widest uppercase">
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-0.5 font-mono text-lg font-normal tracking-tight tabular-nums">
          <span className="text-base-content">{hh}</span>
          <span className="text-base-content/30 animate-pulse">:</span>
          <span className="text-base-content">{mm}</span>
          <span className="text-base-content/30 animate-pulse">:</span>
          <span className="text-base-content/50 text-sm">{ss}</span>
        </div>
      </div>
      <div className="shrink-0">
        <WeatherBadge weather={weather} />
      </div>
    </div>
  );
};
CityCard.displayName = 'CityCard';
