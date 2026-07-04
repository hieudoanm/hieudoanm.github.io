import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const TravelTip: FC<TemplateProps> = ({ data }) => {
  const tip = (data.tip as string) ?? '';
  const category = (data.category as string) ?? '';
  const description = (data.description as string) ?? '';
  const hashtag = (data.hashtag as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12 text-center">
      {category && (
        <span className="text-accent mb-4 text-[10px] font-bold tracking-[0.2em] uppercase">
          {category}
        </span>
      )}
      <svg
        className="text-accent/30 mb-4 h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
      <p className="text-base-content text-xl leading-snug font-bold">{tip}</p>
      <p className="text-neutral mt-4 text-sm leading-relaxed">{description}</p>
      {hashtag && (
        <span className="text-accent mt-6 text-xs font-medium">{hashtag}</span>
      )}
    </div>
  );
};

TravelTip.displayName = 'TravelTip';
