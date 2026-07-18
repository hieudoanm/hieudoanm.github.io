import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const BreakingNews: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const source = (data.source as string) ?? '';
  const timestamp = (data.timestamp as string) ?? '';
  const urgency = (data.urgency as string) ?? 'BREAKING';

  const citation = (data.citation as string) ?? '';
  return (
    <Background center>
      <div className="w-full max-w-lg text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="bg-error h-2 w-2 animate-pulse rounded-full" />
          <span className="error text-sm font-bold tracking-[0.2em] uppercase">
            {urgency}
          </span>
        </div>
        <h1 className="text-base-content text-4xl leading-tight font-black">
          {headline}
        </h1>
        <div className="text-neutral mt-4 flex items-center justify-center gap-2 text-sm">
          {source && <span className="font-semibold">{source}</span>}
          {source && timestamp && <span>-</span>}
          {timestamp && <time>{timestamp}</time>}
        </div>
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

BreakingNews.displayName = 'BreakingNews';
