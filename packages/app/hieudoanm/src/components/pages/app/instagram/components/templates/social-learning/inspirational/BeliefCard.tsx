import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const BeliefCard: FC<TemplateProps> = ({ data }) => {
  const belief = (data.belief as string) ?? '';
  const author = (data.author as string) ?? '';
  const context = (data.context as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="text-accent text-sm font-bold tracking-[0.15em] uppercase">
        I Believe
      </span>
      <blockquote className="text-base-content text-4xl leading-snug font-bold">
        &ldquo;{belief}&rdquo;
      </blockquote>
      {author && (
        <div className="mt-2">
          <p className="text-base-content text-sm font-medium">{author}</p>
          {context && <p className="text-neutral text-sm">{context}</p>}
        </div>
      )}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

BeliefCard.displayName = 'BeliefCard';
