import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Collage: FC<TemplateProps> = ({ data }) => {
  const images = (data.images as string[]) ?? [];
  const urls = images.length >= 3 ? images.slice(0, 3) : ['', '', ''];

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="relative h-full w-full">
          {urls[0] ? (
            <div
              className="rounded-box absolute top-0 left-0 z-10 h-3/5 w-3/5 bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url(${urls[0]})` }}
            />
          ) : (
            <div className="rounded-box border-accent/30 bg-accent/5 text-accent absolute top-0 left-0 z-10 flex h-3/5 w-3/5 items-center justify-center border-2 border-dashed text-xs shadow-lg">
              Image 1 (1:1)
            </div>
          )}
          {urls[1] ? (
            <div
              className="rounded-box absolute right-0 bottom-0 z-20 h-3/5 w-3/5 bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url(${urls[1]})` }}
            />
          ) : (
            <div className="rounded-box border-accent/30 bg-accent/5 text-accent absolute right-0 bottom-0 z-20 flex h-3/5 w-3/5 items-center justify-center border-2 border-dashed text-xs shadow-lg">
              Image 2 (1:1)
            </div>
          )}
          {urls[2] ? (
            <div
              className="rounded-box absolute top-1/3 right-4 z-30 h-2/5 w-2/5 -translate-y-1/4 bg-cover bg-center shadow-lg ring-2 ring-white"
              style={{ backgroundImage: `url(${urls[2]})` }}
            />
          ) : (
            <div className="rounded-box border-accent/30 bg-accent/5 text-accent absolute top-1/3 right-4 z-30 flex h-2/5 w-2/5 -translate-y-1/4 items-center justify-center border-2 border-dashed text-xs shadow-lg ring-2 ring-white">
              Image 3 (1:1)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Collage.displayName = 'Collage';
