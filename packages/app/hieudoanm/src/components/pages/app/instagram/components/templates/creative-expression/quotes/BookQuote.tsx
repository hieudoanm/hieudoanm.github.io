import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const BookQuote: FC<TemplateProps> = ({ data }) => {
  const quote =
    (data.quote as string) ?? 'It is a truth universally acknowledged.';
  const book = (data.book as string) ?? 'Pride and Prejudice';
  const author = (data.author as string) ?? 'Jane Austen';
  const pageNumber = (data.pageNumber as string) ?? '';
  const genre = (data.genre as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <p className="text-base-content mb-6 max-w-xl text-xl leading-relaxed italic">
        "{quote}"
      </p>
      <p className="text-secondary mb-1 text-lg font-semibold">{book}</p>
      <p className="text-base-content/70 mb-4 text-sm">by {author}</p>
      <div className="flex items-center gap-3">
        {genre && <p className="badge badge-accent badge-sm">{genre}</p>}
        {pageNumber && (
          <p className="badge badge-outline badge-sm">p. {pageNumber}</p>
        )}
      </div>
    </div>
  );
};
BookQuote.displayName = 'BookQuote';
