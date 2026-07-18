import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const ResumeTip: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Resume Tip';
  const tip = (data.tip as string) ?? '';
  const category = (data.category as string) ?? '';
  const description = (data.description as string) ?? '';
  const examples = (data.examples as string[]) ?? [];

  const citation = (data.citation as string) ?? '';
  return (
    <Background center textAlign>
      <h1 className="text-primary mb-1 text-4xl font-bold">{title}</h1>
      <p className="badge badge-accent badge-lg mb-2">{category}</p>
      <p className="text-accent mb-3 text-2xl font-semibold italic">"{tip}"</p>
      <p className="text-base-content/80 mb-3 max-w-lg text-xs leading-relaxed">
        {description}
      </p>
      {examples.length > 0 && (
        <ul className="text-base-content/70 space-y-1 text-left text-xs">
          {examples.map((example, index) => (
            <li key={index} className="flex items-start gap-1">
              <span className="text-secondary mt-0.5">▸</span>
              <span>{example}</span>
            </li>
          ))}
        </ul>
      )}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};
ResumeTip.displayName = 'ResumeTip';
