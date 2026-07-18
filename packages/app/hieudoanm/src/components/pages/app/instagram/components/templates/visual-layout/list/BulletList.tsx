import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background, Footer } from '../../_shared';

export const BulletList: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const items = (data.items as string[]) ?? [];
  const list =
    items.length > 0 ? items : ['Point one', 'Point two', 'Point three'];

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <div className="flex flex-col">
        <h1 className="text-base-content mb-4 text-4xl font-bold tracking-tight">
          {title}
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
      <Footer citation={citation} />
    </Background>
  );
};

BulletList.displayName = 'BulletList';
