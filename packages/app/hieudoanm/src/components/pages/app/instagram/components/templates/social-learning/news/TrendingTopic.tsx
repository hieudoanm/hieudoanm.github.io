import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const TrendingTopic: FC<TemplateProps> = ({ data }) => {
  const hashtag = (data.hashtag as string) ?? '';
  const volume = (data.volume as string) ?? '';
  const relatedTags = (data.relatedTags as string[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-10">
      <div className="w-full text-center">
        <div className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          Trending Now
        </div>
        <div className="text-primary mt-3 text-4xl font-black">{hashtag}</div>
        {volume && <div className="text-neutral mt-2 text-xs">{volume}</div>}
        {relatedTags.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {relatedTags.map((tag, i) => (
              <span
                key={i}
                className="border-base-300 text-base-content rounded-full border px-3 py-1 text-[10px] font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

TrendingTopic.displayName = 'TrendingTopic';
