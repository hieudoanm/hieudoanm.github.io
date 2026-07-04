import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Forecast: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? "Today's Weather";
  const city = (data.city as string) ?? 'London';
  const temp = (data.temp as string) ?? '18°C';
  const condition = (data.condition as string) ?? 'Partly Cloudy';
  const high = (data.high as string) ?? '21°C';
  const low = (data.low as string) ?? '14°C';
  const humidity = (data.humidity as string) ?? '62%';
  const wind = (data.wind as string) ?? '12 km/h';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-10">
      <span className="text-accent mb-2 text-[10px] font-bold tracking-[0.2em] uppercase">
        {title}
      </span>
      <h1 className="text-base-content text-2xl font-bold">{city}</h1>

      <div className="mt-6 text-center">
        <span className="text-accent text-6xl font-black">{temp}</span>
        <span className="text-neutral mt-2 block text-sm">{condition}</span>
      </div>

      <div className="mt-6 flex gap-6">
        <div className="text-center">
          <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
            High
          </span>
          <span className="text-base-content mt-1 block text-sm font-semibold">
            {high}
          </span>
        </div>
        <div className="text-center">
          <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
            Low
          </span>
          <span className="text-base-content mt-1 block text-sm font-semibold">
            {low}
          </span>
        </div>
      </div>

      <div className="bg-base-200 mt-6 flex gap-8 rounded-lg px-6 py-3">
        <div className="text-center">
          <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
            Humidity
          </span>
          <span className="text-base-content mt-1 block text-xs font-semibold">
            {humidity}
          </span>
        </div>
        <div className="text-center">
          <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
            Wind
          </span>
          <span className="text-base-content mt-1 block text-xs font-semibold">
            {wind}
          </span>
        </div>
      </div>
    </div>
  );
};

Forecast.displayName = 'Forecast';
