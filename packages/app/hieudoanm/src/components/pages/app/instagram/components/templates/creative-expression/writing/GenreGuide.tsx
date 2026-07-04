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

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-2xl font-black tracking-tight">
        {title}
      </h1>
      <span className="badge badge-primary badge-sm mb-3">{genre}</span>
      {description && (
        <p className="text-neutral mb-5 max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      )}
      <div className="mb-4 w-full max-w-sm text-left">
        <span className="text-base-content mb-2 block text-xs font-bold tracking-wider uppercase">
          Required Elements
        </span>
        <ul className="space-y-1">
          {elements.map((el) => (
            <li
              key={el}
              className="text-neutral flex items-start gap-2 text-xs">
              <span className="text-primary mt-0.5">&#9679;</span>
              {el}
            </li>
          ))}
        </ul>
      </div>
      {examples.length > 0 && (
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {examples.map((ex) => (
            <span key={ex} className="badge badge-outline badge-sm">
              {ex}
            </span>
          ))}
        </div>
      )}
      {tip && (
        <div className="bg-accent/10 text-accent max-w-sm rounded-lg px-4 py-2 text-xs font-medium">
          {tip}
        </div>
      )}
    </div>
  );
};

GenreGuide.displayName = 'GenreGuide';
