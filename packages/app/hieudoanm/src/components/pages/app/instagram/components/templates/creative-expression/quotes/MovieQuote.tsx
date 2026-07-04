import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const MovieQuote: FC<TemplateProps> = ({ data }) => {
  const quote = (data.quote as string) ?? 'Life is like a box of chocolates.';
  const movie = (data.movie as string) ?? 'Forrest Gump';
  const character = (data.character as string) ?? 'Forrest Gump';
  const year = (data.year as string) ?? '';
  const genre = (data.genre as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <p className="text-base-content mb-6 max-w-xl text-2xl leading-relaxed font-medium italic">
        "{quote}"
      </p>
      <p className="text-primary mb-1 text-lg font-bold">{movie}</p>
      <p className="text-secondary mb-3 text-sm font-medium">as {character}</p>
      <div className="flex items-center gap-3">
        {genre && <p className="badge badge-secondary badge-sm">{genre}</p>}
        {year && <p className="badge badge-outline badge-sm">{year}</p>}
      </div>
    </div>
  );
};
MovieQuote.displayName = 'MovieQuote';
