import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const SmartWatch: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const description = (data.description as string) ?? '';
  const image = (data.image as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center gap-4 p-8">
      <div className="flex w-full flex-col gap-2">
        <h2 className="text-base-content text-center text-base font-bold">
          {headline}
        </h2>
        {description && (
          <p className="text-base-content/70 text-center text-xs leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="ring-accent/30 flex flex-col items-center rounded-full p-3 ring-4">
        {image ? (
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="bg-base-200 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="text-neutral/30 text-xs leading-tight font-semibold tracking-widest uppercase">
              Add image (1:1)
            </span>
          </div>
        )}
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

SmartWatch.displayName = 'SmartWatch';
