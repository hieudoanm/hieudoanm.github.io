import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const ShareCTA: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const buttonLabel = (data.buttonLabel as string) ?? '';
  const hashtag = (data.hashtag as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <div className="mb-6 flex gap-3">
        {[
          'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z',
          'M4 9h4v12H4z',
          'M6 4a2 2 0 100-4 2 2 0 000 4z',
        ].map((d, i) => (
          <div
            key={i}
            className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-full">
            <svg
              className="text-accent h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d={d} />
            </svg>
          </div>
        ))}
      </div>
      <h1 className="text-base-content mb-3 text-2xl font-bold tracking-tight">
        {headline || 'Share This'}
      </h1>
      <p className="text-neutral mb-8 max-w-sm text-sm leading-relaxed">
        {text ||
          'Help others discover this content by sharing it with your network.'}
      </p>
      <div className="rounded-box bg-primary text-primary-content px-8 py-3 text-sm font-bold tracking-wider uppercase">
        {buttonLabel || 'Share Now'}
      </div>
      {hashtag && <p className="text-neutral mt-4 text-xs">{hashtag}</p>}
    </div>
  );
};

ShareCTA.displayName = 'ShareCTA';
