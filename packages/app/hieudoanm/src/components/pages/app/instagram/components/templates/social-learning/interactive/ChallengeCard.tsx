import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const ChallengeCard: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const description = (data.description as string) ?? '';
  const days = (data.days as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background center textAlign gap="md">
      <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
        Challenge
      </span>
      <h1 className="text-base-content text-4xl leading-tight font-bold">
        {headline}
      </h1>
      <p className="text-neutral max-w-xs text-sm leading-relaxed">
        {description}
      </p>
      {days && (
        <div className="rounded-box bg-accent/10 px-6 py-4">
          <span className="text-accent text-sm font-bold">
            {days} Day Challenge
          </span>
        </div>
      )}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

ChallengeCard.displayName = 'ChallengeCard';
