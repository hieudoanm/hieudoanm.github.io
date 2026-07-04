import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const References: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'References';
  const items =
    (data.items as Array<{
      author?: string;
      title?: string;
      year?: string;
      url?: string;
    }>) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
        {title}
      </span>

      <div className="text-[10px]">
        <ul className="list-decimal pl-5">
          {items.map((item, i) => (
            <li key={i} className="border-base-200 mb-3 border-l-2 pl-3">
              {item.title && (
                <div className="text-base-content text-xs font-semibold">
                  {item.title}
                </div>
              )}
              <div className="flex items-center gap-2">
                {item.author && (
                  <div className="text-neutral text-[10px]">{item.author}</div>
                )}
                {item.year && (
                  <div className="text-neutral text-[10px]">({item.year})</div>
                )}
              </div>
              {item.url && (
                <div className="text-accent text-[8px] break-all">
                  {item.url}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

References.displayName = 'References';
