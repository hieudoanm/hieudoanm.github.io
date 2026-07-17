import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const MenuHighlights: FC<TemplateProps> = ({ data }) => {
  const restaurant = (data.restaurant as string) ?? '';
  const items =
    (data.items as { name: string; price: string; desc?: string }[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      {restaurant && (
        <span className="text-accent mb-4 text-xs font-bold tracking-[0.2em] uppercase">
          {restaurant}
        </span>
      )}
      <h1 className="text-base-content text-4xl font-bold">Menu Highlights</h1>
      <div className="mt-5 flex flex-col gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="border-base-300 flex items-start justify-between border-b pb-3">
            <div className="pr-4">
              <p className="text-base-content text-sm font-medium">
                {item.name}
              </p>
              {item.desc && (
                <p className="text-neutral mt-0.5 text-xs">{item.desc}</p>
              )}
            </div>
            <span className="text-accent flex-shrink-0 text-sm font-bold">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

MenuHighlights.displayName = 'MenuHighlights';
