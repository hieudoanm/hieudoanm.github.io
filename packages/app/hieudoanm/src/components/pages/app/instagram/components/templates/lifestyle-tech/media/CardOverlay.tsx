import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const CardOverlay: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background
      className="relative"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundColor: imageUrl ? undefined : '#1f1f1f',
      }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="rounded-box bg-base-100/90 relative z-10 mx-8 p-4 shadow-2xl backdrop-blur-sm">
        <h1 className="text-base-content mb-3 text-4xl leading-tight font-bold tracking-tight">
          {headline}
        </h1>
        <p className="text-neutral text-sm leading-relaxed">{text}</p>
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

CardOverlay.displayName = 'CardOverlay';
