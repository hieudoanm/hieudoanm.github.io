import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Listicle: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const items = (data.items as string[]) ?? [];
  const text = (data.text as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';
  const list =
    items.length > 0
      ? items
      : [
          'First key point',
          'Second important point',
          'Third compelling takeaway',
        ];

  const count = list.length;
  const gap = (() => {
    if (count <= 2) return 'gap-2.5';
    if (count <= 4) return 'gap-2';
    if (count <= 6) return 'gap-1.5';
    if (count <= 8) return 'gap-1';
    if (count <= 10) return 'gap-0.5';
    return 'gap-px';
  })();

  return (
    <div className="bg-base-100 flex h-full w-full flex-col px-5 py-4">
      <h1 className="text-base-content mb-1 text-xl font-bold tracking-tight">
        {headline}
      </h1>
      <p className="text-neutral mb-3 text-xs">{text}</p>
      <div className={`flex flex-1 flex-col ${gap}`}>
        {list.map((item, i) => (
          <div
            key={i}
            className="rounded-box bg-accent/5 flex items-center gap-2 px-3 py-2">
            <span className="bg-primary text-primary-content flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {i + 1}
            </span>
            <span className="text-base-content text-xs leading-tight font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>
      {imageUrl && (
        <div
          className="rounded-box mt-2 h-16 w-full flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
    </div>
  );
};

Listicle.displayName = 'Listicle';
