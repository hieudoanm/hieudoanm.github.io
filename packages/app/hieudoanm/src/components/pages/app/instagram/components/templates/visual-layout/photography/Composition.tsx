import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const Composition: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Composition';
  const rule = (data.rule as string) ?? '';
  const description = (data.description as string) ?? '';
  const tips = (data.tips as string[]) ?? [];

  const citation = (data.citation as string) ?? '';
  return (
    <Background center textAlign>
      <h2 className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Composition
      </h2>
      <h1 className="text-base-content mb-1 text-4xl font-bold">{title}</h1>
      {rule && (
        <span className="text-accent mb-1 text-xs font-bold">{rule}</span>
      )}
      {description && (
        <p className="text-neutral mb-2 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      {tips.length > 0 && (
        <ol className="mt-1 flex w-full max-w-sm flex-col gap-1 text-left">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-accent mt-0.5 text-xs font-bold">
                {i + 1}.
              </span>
              <p className="text-base-content text-xs leading-relaxed">{tip}</p>
            </li>
          ))}
        </ol>
      )}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

Composition.displayName = 'Composition';
