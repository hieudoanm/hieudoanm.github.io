import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const VideoStill: FC<TemplateProps> = ({ data }) => {
  const imageUrl = (data.imageUrl as string) ?? '';
  const headline = (data.headline as string) ?? '';
  const duration = (data.duration as string) ?? '';

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black">
      {imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <span className="text-neutral text-xs">Video thumbnail (16:9)</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="bg-primary/90 flex h-16 w-16 items-center justify-center rounded-full">
          <svg
            className="ml-1 h-8 w-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        {headline && (
          <h1 className="text-center text-xl font-bold text-white drop-shadow-lg">
            {headline}
          </h1>
        )}
        {duration && (
          <span className="rounded bg-black/60 px-2 py-0.5 text-xs text-white">
            {duration}
          </span>
        )}
      </div>
    </div>
  );
};

VideoStill.displayName = 'VideoStill';
