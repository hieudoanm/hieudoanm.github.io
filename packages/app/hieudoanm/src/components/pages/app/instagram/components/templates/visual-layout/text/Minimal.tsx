import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Minimal: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-base-content mb-2 text-4xl leading-tight font-bold tracking-tight">
          {headline}
        </h1>
        <p className="text-neutral mx-auto max-w-md text-sm leading-relaxed">
          {text}
        </p>
      </div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="rounded-box h-24 w-full object-cover"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

Minimal.displayName = 'Minimal';
