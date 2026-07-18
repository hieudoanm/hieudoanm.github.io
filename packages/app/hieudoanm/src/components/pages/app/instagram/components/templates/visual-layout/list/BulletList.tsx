import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const BulletList: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const items = (data.items as string[]) ?? [];
  const list =
    items.length > 0 ? items : ['Point one', 'Point two', 'Point three'];

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <div className="flex flex-col">
        <h1 className="text-base-content mb-4 text-4xl font-bold tracking-tight">
          {headline}
        </h1>
        <ul className="flex flex-1 flex-col gap-2">
          {list.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="bg-primary mt-1.5 flex h-2 w-2 flex-shrink-0 rounded-full" />
              <span className="text-base-content text-sm leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

BulletList.displayName = 'BulletList';
