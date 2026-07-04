import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Story {
  headline: string;
  summary: string;
}

export const DailyDigest: FC<TemplateProps> = ({ data }) => {
  const date = (data.date as string) ?? '';
  const stories = (data.stories as Story[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 text-center">
        <div className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          Daily Digest
        </div>
        {date && (
          <div className="text-base-content mt-1 text-sm font-bold">{date}</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        {stories.map((story, i) => (
          <div
            key={i}
            className="border-base-300 flex gap-3 rounded border p-3">
            <span className="text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="text-base-content text-xs leading-tight font-bold">
                {story.headline}
              </div>
              <div className="text-neutral mt-0.5 text-[10px] leading-snug">
                {story.summary}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DailyDigest.displayName = 'DailyDigest';
