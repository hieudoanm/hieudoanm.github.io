import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const SunriseSunset: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Sunrise & Sunset';
  const city = (data.city as string) ?? 'Barcelona';
  const sunrise = (data.sunrise as string) ?? '06:42';
  const sunset = (data.sunset as string) ?? '21:18';
  const daylight = (data.daylight as string) ?? '14h 36m';
  const goldenHour = (data.goldenHour as string) ?? '20:32 – 21:05';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-10">
      <span className="text-accent mb-2 text-[10px] font-bold tracking-[0.2em] uppercase">
        {title}
      </span>
      <h1 className="text-base-content text-xl font-bold">{city}</h1>

      <div className="mt-6 flex items-center gap-8">
        <div className="text-center">
          <span className="text-accent text-3xl font-black">{sunrise}</span>
          <span className="text-neutral mt-1 block text-[9px] font-bold tracking-[0.15em] uppercase">
            Sunrise
          </span>
        </div>
        <div className="bg-neutral/20 h-px w-12" />
        <div className="text-center">
          <span className="text-accent text-3xl font-black">{sunset}</span>
          <span className="text-neutral mt-1 block text-[9px] font-bold tracking-[0.15em] uppercase">
            Sunset
          </span>
        </div>
      </div>

      <div className="bg-base-200 mt-6 flex gap-6 rounded-lg px-6 py-3">
        <div className="text-center">
          <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
            Daylight
          </span>
          <span className="text-base-content mt-1 block text-sm font-semibold">
            {daylight}
          </span>
        </div>
        <div className="text-center">
          <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
            Golden Hour
          </span>
          <span className="text-base-content mt-1 block text-sm font-semibold">
            {goldenHour}
          </span>
        </div>
      </div>
    </div>
  );
};

SunriseSunset.displayName = 'SunriseSunset';
