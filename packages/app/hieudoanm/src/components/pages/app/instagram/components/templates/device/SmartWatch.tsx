import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const SmartWatch: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const description = (data.description as string) ?? '';
  const image = (data.image as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center gap-3 p-6">
      <div className="flex w-full flex-col gap-1">
        <h2 className="text-base-content text-center text-base font-bold">
          {headline}
        </h2>
        {description && (
          <p className="text-base-content/70 text-center text-[10px] leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="ring-accent/30 flex flex-col items-center rounded-full p-6 ring-4">
        {image ? (
          <div className="h-20 w-20 overflow-hidden rounded-full">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="bg-base-200 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="text-neutral/30 text-[6px] leading-tight font-semibold tracking-widest uppercase">
              Add image
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

SmartWatch.displayName = 'SmartWatch';
