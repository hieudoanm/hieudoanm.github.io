import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const Ranking: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const items = (data.items as { rank: string; label: string }[]) ?? [];
  const list =
    items.length > 0
      ? items
      : [
          { rank: '1st', label: 'Innovation' },
          { rank: '2nd', label: 'Quality' },
          { rank: '3rd', label: 'Speed' },
        ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content mb-8 text-3xl font-bold tracking-tight">
        {headline}
      </h1>
      <div className="flex flex-1 flex-col justify-center gap-5">
        {list.map((item, i) => (
          <div key={i} className="flex items-center gap-5">
            <span className="bg-primary text-primary-content flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
              {item.rank}
            </span>
            <span className="text-base-content text-lg font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

Ranking.displayName = 'Ranking';
