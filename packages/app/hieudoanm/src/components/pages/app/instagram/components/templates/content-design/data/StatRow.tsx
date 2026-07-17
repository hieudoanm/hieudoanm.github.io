import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface StatItem {
  value: string;
  label: string;
}

export const StatRow: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const stats = (data.stats as StatItem[]) ?? [];
  const items =
    stats.length > 0
      ? stats
      : [
          { value: '10K+', label: 'Users' },
          { value: '99%', label: 'Uptime' },
          { value: '24/7', label: 'Support' },
        ];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col justify-center p-8">
      <h1 className="text-base-content mb-4 text-center text-4xl font-bold tracking-tight">
        {headline}
      </h1>
      <ul className="flex flex-1 items-center justify-center gap-2">
        {items.slice(0, 3).map((s, i) => (
          <li
            key={i}
            className="rounded-box bg-accent/5 flex flex-1 flex-col items-center p-4 text-center">
            <span className="text-primary text-4xl font-black tracking-tight">
              {s.value}
            </span>
            <span className="text-neutral mt-1 text-xs font-semibold tracking-widest uppercase">
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

StatRow.displayName = 'StatRow';
