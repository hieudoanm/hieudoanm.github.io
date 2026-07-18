import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';
import { Header } from '../../_shared';

export const MusicTheory: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Music Theory';
  const concept = (data.concept as string) ?? '';
  const subtitle = (data.subtitle as string) ?? '';
  const examples = (data.examples as string[]) ?? [];
  const tip = (data.tip as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
        Music Theory
      </span>
      <Header title={title} subtitle={subtitle} />
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
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};
MusicTheory.displayName = 'MusicTheory';
