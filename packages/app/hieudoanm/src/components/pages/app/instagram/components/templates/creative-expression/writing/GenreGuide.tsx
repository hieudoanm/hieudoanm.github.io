import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const GenreGuide: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Genre Guide';
  const genre = (data.genre as string) ?? 'Mystery';
  const description = (data.description as string) ?? '';
  const elements = (data.elements as string[]) ?? [
    'Clues',
    'Red herrings',
    'Revelation',
  ];
  const examples = (data.examples as string[]) ?? [
    'Sherlock Holmes',
    'Gone Girl',
  ];
  const tip = (data.tip as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-4xl font-black tracking-tight">
        {title}
      </h1>
      <span className="badge badge-primary badge-sm mb-3">{genre}</span>
      {description && (
        <p className="text-neutral mb-3 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      <div className="mb-2 w-full max-w-sm text-left">
        <h2 className="text-base-content mb-1 block text-xs font-bold tracking-wider uppercase">
          Required Elements
        </h2>
        <ul className="space-y-1">
          {elements.map((el) => (
            <li
              key={el}
              className="text-neutral flex items-start gap-1 text-xs">
              <span className="text-primary mt-0.5">&#9679;</span>
              {el}
            </li>
          ))}
        </ul>
      </div>
      {examples.length > 0 && (
        <ul className="mb-2 flex flex-wrap justify-center gap-1">
          {examples.map((ex) => (
            <li key={ex} className="badge badge-outline badge-sm">
              {ex}
            </li>
          ))}
        </ul>
      )}
      {tip && (
        <div className="bg-accent/10 text-accent max-w-sm rounded-lg px-2 py-1 text-xs font-medium">
          {tip}
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

GenreGuide.displayName = 'GenreGuide';
