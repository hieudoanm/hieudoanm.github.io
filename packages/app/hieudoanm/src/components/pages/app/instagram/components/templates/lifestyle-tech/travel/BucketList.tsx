import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const BucketList: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const items = (data.items as { place: string; reason: string }[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <span className="text-accent mb-2 text-[10px] font-bold tracking-[0.2em] uppercase">
        Bucket List
      </span>
      <h1 className="text-base-content mb-6 text-xl font-bold">{title}</h1>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="text-accent mt-0.5 font-mono text-sm font-bold">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="text-base-content text-sm font-semibold">
                {item.place}
              </p>
              <p className="text-neutral mt-0.5 text-xs">{item.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

BucketList.displayName = 'BucketList';
