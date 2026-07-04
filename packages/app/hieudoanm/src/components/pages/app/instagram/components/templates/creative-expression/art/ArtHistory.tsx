import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface HistoryEntry {
  date: string;
  event: string;
  artist: string;
}

export const ArtHistory: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Art History';
  const period = (data.period as string) ?? '';
  const entries = (data.entries as HistoryEntry[]) ?? [
    { date: '1485', event: 'Mona Lisa painted', artist: 'Leonardo da Vinci' },
    { date: '1512', event: 'Sistine Chapel ceiling', artist: 'Michelangelo' },
    { date: '1889', event: 'Starry Night created', artist: 'Vincent van Gogh' },
  ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-2xl font-black tracking-tight">
        {title}
      </h1>
      {period && (
        <p className="text-primary mb-5 text-sm font-semibold">{period}</p>
      )}
      <div className="relative flex w-full flex-col gap-3 pl-6">
        <div className="bg-primary/20 absolute top-2 left-[7px] h-[calc(100%-16px)] w-0.5" />
        {entries.map((e, i) => (
          <div key={i} className="relative flex items-start gap-3">
            <div className="bg-primary absolute top-1.5 -left-6 h-3 w-3 rounded-full ring-2 ring-white" />
            <div className="text-left">
              <span className="text-primary text-[11px] font-bold tracking-wider uppercase">
                {e.date}
              </span>
              <p className="text-base-content text-xs leading-snug font-medium">
                {e.event}
              </p>
              <p className="text-neutral text-[10px] italic">{e.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ArtHistory.displayName = 'ArtHistory';
