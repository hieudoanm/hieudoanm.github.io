import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const GameReview: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Game Title';
  const platform = (data.platform as string) ?? 'PC';
  const score = (data.score as string) ?? '8.5';
  const reviewer = (data.reviewer as string) ?? 'Anonymous';
  const pros = (data.pros as string[]) ?? ['Great graphics', 'Engaging story'];
  const cons = (data.cons as string[]) ?? ['Short campaign'];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-4 flex items-center justify-between">
        <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-[10px] font-bold">
          {platform}
        </span>
        <span className="text-primary text-3xl font-extrabold">{score}</span>
      </div>
      <h1 className="text-base-content mb-1 text-2xl font-bold">{title}</h1>
      <p className="text-neutral mb-4 text-xs">Reviewed by {reviewer}</p>
      <div className="flex flex-1 gap-4">
        <div className="flex w-1/2 flex-col gap-2">
          <span className="text-success text-[10px] font-bold tracking-widest uppercase">
            Pros
          </span>
          {pros.map((item, i) => (
            <p key={i} className="text-base-content text-xs leading-relaxed">
              {item}
            </p>
          ))}
        </div>
        <div className="bg-accent/20 w-0.5 flex-shrink-0" />
        <div className="flex w-1/2 flex-col gap-2">
          <span className="text-error text-[10px] font-bold tracking-widest uppercase">
            Cons
          </span>
          {cons.map((item, i) => (
            <p key={i} className="text-base-content text-xs leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

GameReview.displayName = 'GameReview';
