import { FC } from 'react';

interface TimelineEntry {
  startYear: number;
  endYear: number;
  date: string;
  title: string;
  subtitle: string;
  location: string;
}

export const EntryCard: FC<{ entry: TimelineEntry & { icon: string } }> = ({
  entry,
}) => (
  <div className="min-w-0">
    <p className="text-sm leading-tight font-bold">{entry.title}</p>
    <p className="text-base-content/60 text-xs leading-tight">
      {entry.subtitle}
    </p>
    <p className="text-base-content/30 mt-0.5 text-[10px]">{entry.location}</p>
  </div>
);
EntryCard.displayName = 'EntryCard';
