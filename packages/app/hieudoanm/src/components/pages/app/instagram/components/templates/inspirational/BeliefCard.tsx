import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const BeliefCard: FC<TemplateProps> = ({ data }) => {
  const belief = (data.belief as string) ?? '';
  const author = (data.author as string) ?? '';
  const context = (data.context as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center gap-4 p-12 text-center">
      <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase">
        I Believe
      </span>
      <p className="text-base-content text-2xl leading-snug font-bold">
        &ldquo;{belief}&rdquo;
      </p>
      {author && (
        <div className="mt-2">
          <p className="text-base-content text-sm font-medium">{author}</p>
          {context && <p className="text-neutral text-xs">{context}</p>}
        </div>
      )}
    </div>
  );
};

BeliefCard.displayName = 'BeliefCard';
