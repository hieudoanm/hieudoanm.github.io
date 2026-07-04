import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const VisionBoard: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col">
      <div
        className="flex h-1/2 w-full items-end bg-cover bg-center p-6"
        style={
          imageUrl
            ? { backgroundImage: `url(${imageUrl})` }
            : { backgroundColor: '#e5e7eb' }
        }>
        <div className="rounded-box bg-base-100/90 w-full px-4 py-3 backdrop-blur-sm">
          <h1 className="text-base-content text-lg leading-tight font-bold">
            {headline}
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-neutral text-center text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

VisionBoard.displayName = 'VisionBoard';
