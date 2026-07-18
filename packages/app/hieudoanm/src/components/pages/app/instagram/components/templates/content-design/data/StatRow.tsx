import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface StatItem {
  value: string;
  label: string;
}

export const StatRow: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const stats = (data.stats as StatItem[]) ?? [];
  const items =
    stats.length > 0
      ? stats
      : [
          { value: '10K+', label: 'Users' },
          { value: '99%', label: 'Uptime' },
          { value: '24/7', label: 'Support' },
        ];
  const citation = (data.citation as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col justify-center p-8">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-base-content text-center text-4xl font-bold tracking-tight">
            {headline}
          </h1>
          {text && (
            <p className="text-base-content/60 text-center text-sm">{text}</p>
          )}
        </div>
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

        {citation && (
          <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
            {citation}
          </p>
        )}
      </div>
    </div>
  );
};

StatRow.displayName = 'StatRow';
