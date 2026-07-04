import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const FamousQuote: FC<TemplateProps> = ({ data }) => {
  const quote =
    (data.quote as string) ??
    'The only way to do great work is to love what you do.';
  const author = (data.author as string) ?? 'Steve Jobs';
  const source = (data.source as string) ?? '';
  const year = (data.year as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-primary mb-6 font-serif text-6xl">"</span>
      <p className="text-base-content mb-6 max-w-xl text-2xl leading-relaxed font-medium">
        {quote}
      </p>
      <span className="text-primary mb-6 font-serif text-6xl">"</span>
      <p className="text-secondary mb-2 text-lg font-semibold">— {author}</p>
      {source && (
        <p className="text-accent mb-1 text-sm font-medium">{source}</p>
      )}
      {year && <p className="text-accent text-xs">{year}</p>}
    </div>
  );
};
FamousQuote.displayName = 'FamousQuote';
