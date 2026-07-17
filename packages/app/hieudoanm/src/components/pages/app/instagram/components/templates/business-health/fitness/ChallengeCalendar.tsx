import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const ChallengeCalendar: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const month = (data.month as string) ?? '';
  const days = (data.days as { day: string; activity: string }[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-base-content text-4xl font-bold">{title}</h1>
        {month && (
          <span className="text-accent text-xs font-bold tracking-widest uppercase">
            {month}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
        {days.map((d, i) => (
          <div
            key={i}
            className="rounded-box flex items-center gap-3 px-3 py-2 text-sm">
            <span className="text-accent w-6 text-xs font-bold">{d.day}</span>
            <p className="text-base-content text-xs">{d.activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ChallengeCalendar.displayName = 'ChallengeCalendar';
