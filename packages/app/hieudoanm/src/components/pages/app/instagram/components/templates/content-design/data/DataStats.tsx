import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const DataStats: FC<TemplateProps> = ({ data }) => {
  const stat = (data.stat as string) ?? (data.number as string) ?? '84%';
  const headline = (data.headline as string) ?? (data.label as string) ?? '';
  const text = (data.text as string) ?? (data.context as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';
  const suffix = (data.suffix as string) ?? '';
  const source = (data.source as string) ?? '';

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-8 text-center">
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className="relative z-10">
        <div className="text-primary mb-1 text-4xl font-black tracking-tight">
          {stat}
        </div>
        {suffix && <p className="text-neutral mb-2 text-sm">{suffix}</p>}
        <h1 className="text-base-content mb-2 text-xl font-bold tracking-tight">
          {headline}
        </h1>
        <p className="text-neutral mx-auto max-w-sm text-base leading-relaxed">
          {text}
        </p>
        {source && <p className="text-neutral mt-2 text-xs">— {source}</p>}
      </div>
    </div>
  );
};

DataStats.displayName = 'DataStats';
