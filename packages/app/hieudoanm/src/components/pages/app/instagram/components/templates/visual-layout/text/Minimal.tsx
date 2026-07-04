import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Minimal: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-between gap-4 p-12 text-center">
      <div />
      <div>
        <h1 className="text-base-content mb-4 text-4xl leading-tight font-bold tracking-tight">
          {headline}
        </h1>
        <p className="text-neutral mx-auto max-w-md text-base leading-relaxed">
          {text}
        </p>
      </div>
      {imageUrl ? (
        <div
          className="rounded-box h-48 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

Minimal.displayName = 'Minimal';
