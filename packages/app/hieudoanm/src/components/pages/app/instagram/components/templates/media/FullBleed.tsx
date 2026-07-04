import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const FullBleed: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div
      className="relative flex h-full w-full items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundColor: imageUrl ? undefined : '#000000',
      }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 mx-8 max-w-lg text-center">
        <h1 className="text-base-content mb-4 text-4xl leading-tight font-bold tracking-tight drop-shadow-lg">
          {headline}
        </h1>
        <p className="text-base-content/80 text-base leading-relaxed drop-shadow">
          {text}
        </p>
      </div>
    </div>
  );
};

FullBleed.displayName = 'FullBleed';
