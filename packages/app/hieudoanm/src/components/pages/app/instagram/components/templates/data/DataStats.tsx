import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const DataStats: FC<TemplateProps> = ({ data }) => {
  const stat = (data.stat as string) ?? '84%';
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-12 text-center">
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className="relative z-10">
        <div className="text-primary mb-4 text-8xl font-black tracking-tight">
          {stat}
        </div>
        <h1 className="text-base-content mb-3 text-2xl font-bold tracking-tight">
          {headline}
        </h1>
        <p className="text-neutral mx-auto max-w-sm text-sm leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

DataStats.displayName = 'DataStats';
