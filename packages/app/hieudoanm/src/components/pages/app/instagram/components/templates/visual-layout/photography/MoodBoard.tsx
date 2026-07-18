import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

interface Theme {
  name: string;
  color: string;
}

export const MoodBoard: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Mood Board';
  const description = (data.description as string) ?? '';
  const themes = (data.themes as Theme[]) ?? [];
  const keywords = (data.keywords as string[]) ?? [];

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <h2 className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Mood Board
      </h2>
      <h1 className="text-base-content mb-1 text-4xl font-bold">{title}</h1>
      {description && (
        <p className="text-neutral mb-1 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      {themes.length > 0 && (
        <ul className="mb-1 flex gap-1">
          {themes.map((theme, i) => (
            <li key={i} className="flex flex-col items-center gap-1">
              <div
                className="h-4 w-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: theme.color }}
              />
              <span className="text-neutral text-xs">{theme.name}</span>
            </li>
          ))}
        </ul>
      )}
      {keywords.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-1">
          {keywords.map((kw, i) => (
            <li
              key={i}
              className="rounded-box bg-base-300 text-base-content px-2 py-0.5 text-xs">
              {kw}
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

MoodBoard.displayName = 'MoodBoard';
