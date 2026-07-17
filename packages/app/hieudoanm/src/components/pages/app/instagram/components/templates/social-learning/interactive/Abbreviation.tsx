import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Abbreviation: FC<TemplateProps> = ({ data }) => {
  const abbr = (data.abbr as string) ?? '';
  const full = (data.full as string) ?? '';
  const words = full.split(' ');

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <span className="text-accent mb-8 text-sm font-bold tracking-[0.2em] uppercase">
        Abbreviation
      </span>
      <ul className="flex flex-col items-start gap-3">
        {abbr.split('').map((letter, i) => (
          <li key={i} className="flex items-baseline gap-3">
            <span className="text-primary text-4xl leading-none font-black tracking-tight">
              {letter}
            </span>
            <span className="text-base-content text-2xl font-semibold">
              {(words[i] ?? '').slice(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

Abbreviation.displayName = 'Abbreviation';
