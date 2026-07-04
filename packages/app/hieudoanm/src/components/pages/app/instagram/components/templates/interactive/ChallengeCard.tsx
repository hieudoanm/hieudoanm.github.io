import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const ChallengeCard: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const description = (data.description as string) ?? '';
  const days = (data.days as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center gap-6 p-12 text-center">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        Challenge
      </span>
      <h1 className="text-base-content text-2xl leading-tight font-bold">
        {headline}
      </h1>
      <p className="text-neutral max-w-xs text-sm leading-relaxed">
        {description}
      </p>
      {days && (
        <div className="rounded-box bg-accent/10 px-6 py-3">
          <span className="text-accent text-sm font-bold">
            {days} Day Challenge
          </span>
        </div>
      )}
    </div>
  );
};

ChallengeCard.displayName = 'ChallengeCard';
