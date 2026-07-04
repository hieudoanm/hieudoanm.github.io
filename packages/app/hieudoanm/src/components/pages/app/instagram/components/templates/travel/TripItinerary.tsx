import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const TripItinerary: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const days = (data.days as { day: string; activities: string }[]) ?? [];
  const totalDays = (data.totalDays as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-base-content text-lg font-bold">{title}</h1>
        {totalDays && (
          <span className="rounded-box bg-accent/10 text-accent px-3 py-1 text-[10px] font-bold">
            {totalDays}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {days.map((d, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span className="bg-accent text-accent-content flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold">
                {d.day}
              </span>
              {i < days.length - 1 && (
                <div className="bg-accent/20 mt-0.5 h-full w-0.5" />
              )}
            </div>
            <div className="pt-1">
              <p className="text-base-content text-sm">{d.activities}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TripItinerary.displayName = 'TripItinerary';
