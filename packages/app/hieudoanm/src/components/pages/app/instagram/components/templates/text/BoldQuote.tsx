import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const BoldQuote: FC<TemplateProps> = ({ data }) => {
  const quote = (data.quote as string) ?? '';
  const author = (data.author as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <div className="bg-primary mb-8 h-1 w-16 rounded-full" />
      <blockquote className="max-w-lg">
        <p className="text-base-content mb-6 text-2xl leading-relaxed font-light italic">
          {quote}
        </p>
        <footer className="text-primary text-sm font-semibold tracking-widest uppercase">
          {author}
        </footer>
      </blockquote>
      {imageUrl && (
        <div
          className="ring-base-content/20 mt-8 h-16 w-16 rounded-full bg-cover bg-center ring-2"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
    </div>
  );
};

BoldQuote.displayName = 'BoldQuote';
