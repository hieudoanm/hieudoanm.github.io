import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface TimelineEntry {
  date: string;
  event: string;
}

export const Timeline: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const entries = (data.entries as TimelineEntry[]) ?? [];
  const imageUrl = (data.imageUrl as string) ?? '';
  const items =
    entries.length > 0
      ? entries
      : ([
          { date: 'Q1 2024', event: 'Research phase' },
          { date: 'Q2 2024', event: 'MVP development' },
          { date: 'Q3 2024', event: 'Beta launch' },
          { date: 'Q4 2024', event: 'Public release' },
        ] as TimelineEntry[]);

  return (
    <div className="flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-3 text-4xl font-bold tracking-tight">
        {title}
      </h1>
      <div className="relative flex flex-1 flex-col gap-0 pl-4">
        <div className="bg-accent/20 absolute top-2 left-[11px] h-[calc(100%-16px)] w-0.5" />
        {items.map((entry, i) => (
          <div
            key={i}
            className="relative flex flex-1 items-start gap-2 pb-2 last:pb-0">
            <div
              className={`absolute -left-8 mt-1.5 h-[18px] w-[18px] flex-shrink-0 rounded-full ring-4 ${
                i === 0
                  ? 'bg-primary ring-primary/20'
                  : 'bg-accent/20 ring-white'
              }`}
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                {entry.date}
              </span>
              <span className="text-neutral text-sm leading-relaxed">
                {entry.event}
              </span>
            </div>
          </div>
        ))}
      </div>
      {imageUrl && (
        <div
          className="rounded-box mt-2 h-24 w-full flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
    </div>
  );
};

Timeline.displayName = 'Timeline';
