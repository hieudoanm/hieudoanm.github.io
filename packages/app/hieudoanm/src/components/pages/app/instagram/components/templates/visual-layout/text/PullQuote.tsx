import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const PullQuote: FC<TemplateProps> = ({ data }) => {
  const quote = (data.quote as string) ?? '';
  const author = (data.author as string) ?? '';
  const source = (data.source as string) ?? '';
  const imageUrl = (data.imageUrl as string) ?? '';
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12">
      {imageUrl && (
        <div
          className="ring-base-300 mb-6 h-16 w-16 rounded-full bg-cover bg-center ring-2"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className="max-w-lg text-center">
        <span className="text-primary/20 mb-6 block text-7xl leading-none font-black">
          &ldquo;
        </span>
        <blockquote className="mb-6">
          <p className="text-base-content text-2xl leading-relaxed font-light italic">
            {quote ||
              text ||
              'The only way to do great work is to love what you do.'}
          </p>
        </blockquote>
        <span className="text-base-content mb-2 block text-sm font-bold">
          {author || 'Steve Jobs'}
        </span>
        {source && <span className="text-neutral text-xs">{source}</span>}
      </div>
    </div>
  );
};

PullQuote.displayName = 'PullQuote';
