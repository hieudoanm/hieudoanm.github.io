import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const TrendingTopic: FC<TemplateProps> = ({ data }) => {
  const hashtag = (data.hashtag as string) ?? '';
  const volume = (data.volume as string) ?? '';
  const relatedTags = (data.relatedTags as string[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <div className="w-full text-center">
        <h2 className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
          Trending Now
        </h2>
        <div className="text-primary mt-4 text-4xl font-black">{hashtag}</div>
        {volume && <div className="text-neutral mt-2 text-sm">{volume}</div>}
        {relatedTags.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {relatedTags.map((tag, i) => (
              <li
                key={i}
                className="border-base-300 text-base-content rounded-full border px-4 py-2 text-sm font-medium">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

TrendingTopic.displayName = 'TrendingTopic';
