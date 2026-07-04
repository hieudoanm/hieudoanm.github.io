import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const MusicTheory: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Music Theory';
  const concept = (data.concept as string) ?? '';
  const description = (data.description as string) ?? '';
  const examples = (data.examples as string[]) ?? [];
  const tip = (data.tip as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
        Music Theory
      </span>
      <h1 className="text-base-content mt-1 text-xl font-bold">{title}</h1>
      {concept && (
        <span className="bg-primary/10 text-primary mt-2 rounded-full px-3 py-0.5 text-[10px] font-bold">
          {concept}
        </span>
      )}
      <p className="text-neutral mt-4 max-w-xs text-xs leading-relaxed">
        {description}
      </p>
      {examples.length > 0 && (
        <div className="bg-base-200 mt-4 w-full max-w-xs overflow-hidden rounded-lg">
          {examples.map((example, i) => (
            <div
              key={i}
              className="border-base-300 border-b px-3 py-2 last:border-b-0">
              <p className="text-base-content text-left text-xs">{example}</p>
            </div>
          ))}
        </div>
      )}
      {tip && (
        <div className="bg-accent/10 text-accent mt-4 max-w-xs rounded-lg px-4 py-2 text-xs">
          💡 {tip}
        </div>
      )}
    </div>
  );
};
MusicTheory.displayName = 'MusicTheory';
