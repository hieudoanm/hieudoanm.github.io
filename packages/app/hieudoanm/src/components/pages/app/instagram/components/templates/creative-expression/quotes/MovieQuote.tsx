import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const MovieQuote: FC<TemplateProps> = ({ data }) => {
  const quote = (data.quote as string) ?? 'Life is like a box of chocolates.';
  const movie = (data.movie as string) ?? 'Forrest Gump';
  const character = (data.character as string) ?? 'Forrest Gump';
  const year = (data.year as string) ?? '';
  const genre = (data.genre as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background center textAlign>
      <blockquote className="text-base-content mb-1.5 max-w-xl text-2xl leading-relaxed font-medium italic">
        "{quote}"
      </blockquote>
      <p className="text-primary mb-0.5 text-xs font-bold">{movie}</p>
      <p className="text-secondary mb-1.5 text-xs font-medium">
        as {character}
      </p>
      <div className="flex items-center gap-2">
        {genre && <p className="badge badge-secondary badge-sm">{genre}</p>}
        {year && <p className="badge badge-outline badge-sm">{year}</p>}
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};
MovieQuote.displayName = 'MovieQuote';
