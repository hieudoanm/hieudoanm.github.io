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
    <div className="bg-base-100 flex h-full w-full flex-col justify-center p-6">
      <h1 className="text-base-content mb-8 text-center text-2xl font-bold tracking-tight">
        {headline}
      </h1>
      <div className="flex flex-1 items-center justify-center gap-3">
        {items.slice(0, 3).map((s, i) => (
          <div
            key={i}
            className="rounded-box bg-accent/5 flex flex-1 flex-col items-center p-4 text-center">
            <span className="text-primary text-2xl font-black tracking-tight">
              {s.value}
            </span>
            <span className="text-neutral mt-1 text-[10px] font-semibold tracking-widest uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

StatRow.displayName = 'StatRow';
