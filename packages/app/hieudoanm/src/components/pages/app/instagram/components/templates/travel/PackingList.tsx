import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const PackingList: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const items = (data.items as string[]) ?? [];
  const tip = (data.tip as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-base-content text-lg font-bold">{title}</h1>
        <span className="text-neutral text-xs">{items.length} items</span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="border-accent/20 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border text-[8px]" />
            <p className="text-base-content text-sm">{item}</p>
          </div>
        ))}
      </div>
      {tip && (
        <div className="border-accent/20 mt-6 border-t pt-4">
          <p className="text-neutral text-xs">{tip}</p>
        </div>
      )}
    </div>
  );
};

PackingList.displayName = 'PackingList';
