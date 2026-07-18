import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const CinemaBanner: FC<TemplateProps> = ({ data }) => {
  const imageUrl = (data.imageUrl as string) ?? '';
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const caption = (data.caption as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black">
      {imageUrl ? (
        <img src={imageUrl} alt="" className="absolute inset-0 object-cover" />
      ) : (
        <div className="absolute inset-0 bg-black/80" />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 mx-8 border-y border-white/20 px-8 py-6 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white drop-shadow-lg">
          {headline || 'Cinematic Title'}
        </h1>
        <p className="mb-2 text-sm leading-relaxed text-white/80 drop-shadow">
          {text}
        </p>
        {caption && (
          <p className="text-xs tracking-widest text-white/50 uppercase">
            {caption}
          </p>
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

CinemaBanner.displayName = 'CinemaBanner';
