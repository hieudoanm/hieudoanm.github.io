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
      <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
        Music Theory
      </span>
      <h1 className="text-base-content mt-1 text-lg font-bold">{title}</h1>
      {concept && (
        <span className="bg-primary/10 text-primary mt-1 rounded-full px-1.5 py-0.5 text-xs font-bold">
          {concept}
        </span>
      )}
      <p className="text-neutral mt-2 max-w-xs text-xs leading-relaxed">
        {description}
      </p>
      {examples.length > 0 && (
        <ul className="bg-base-200 mt-2 w-full max-w-xs overflow-hidden rounded-lg">
          {examples.map((example, i) => (
            <li
              key={i}
              className="border-base-300 border-b px-2 py-1 last:border-b-0">
              <p className="text-base-content text-left text-xs">{example}</p>
            </li>
          ))}
        </ul>
      )}
      {tip && (
        <div className="bg-accent/10 text-accent mt-2 max-w-xs rounded-lg px-2 py-1 text-xs">
          💡 {tip}
        </div>
      )}
    </div>
  );
};
MusicTheory.displayName = 'MusicTheory';
