import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface ProgressItem {
  label: string;
  pct: number;
}

export const ProgressList: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const items = (data.items as ProgressItem[]) ?? [];
  const list =
    items.length > 0
      ? items
      : [
          { label: 'Design', pct: 90 },
          { label: 'Development', pct: 65 },
          { label: 'Testing', pct: 40 },
          { label: 'Deployment', pct: 20 },
        ];

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col justify-center p-8">
      <h1 className="text-base-content mb-5 text-center text-4xl font-bold tracking-tight">
        {headline || 'Progress'}
      </h1>
      <ul className="flex flex-col gap-3">
        {list.map((item, i) => (
          <li key={i}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-base-content text-sm font-medium">
                {item.label}
              </span>
              <span className="text-primary text-sm font-bold">
                {item.pct}%
              </span>
            </div>
            <div className="bg-neutral/20 h-3 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.max(0, item.pct))}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

ProgressList.displayName = 'ProgressList';
