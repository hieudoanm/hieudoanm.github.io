import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const DestinationGuide: FC<TemplateProps> = ({ data }) => {
  const destination = (data.destination as string) ?? '';
  const highlights = (data.highlights as string[]) ?? [];
  const bestTime = (data.bestTime as string) ?? '';
  const tip = (data.tip as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        Destination
      </span>
      <h1 className="text-base-content mt-1 text-2xl font-bold">
        {destination}
      </h1>
      {bestTime && (
        <span className="rounded-box bg-accent/10 text-accent mt-3 inline-block self-start px-3 py-0.5 text-[10px] font-bold">
          Best time: {bestTime}
        </span>
      )}
      {highlights.length > 0 && (
        <div className="mt-5 flex flex-col gap-2">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-accent mt-0.5 text-xs">✦</span>
              <p className="text-base-content text-sm">{h}</p>
            </div>
          ))}
        </div>
      )}
      {tip && (
        <div className="border-accent/20 mt-6 border-t pt-4">
          <span className="text-accent text-[10px] font-bold tracking-widest uppercase">
            Tip
          </span>
          <p className="text-neutral mt-1 text-xs">{tip}</p>
        </div>
      )}
    </div>
  );
};

DestinationGuide.displayName = 'DestinationGuide';
