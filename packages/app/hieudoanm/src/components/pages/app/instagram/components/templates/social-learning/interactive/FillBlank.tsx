import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const FillBlank: FC<TemplateProps> = ({ data }) => {
  const text = (data.text as string) ?? '';
  const blank = (data.blank as string) ?? '';
  const hint = (data.hint as string) ?? '';
  const author = (data.author as string) ?? '';

  const parts = text.split('___');

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-accent mb-4 text-sm font-bold tracking-[0.2em] uppercase">
        Fill in the Blank
      </span>
      <p className="text-base-content text-2xl leading-relaxed font-light">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="border-accent text-accent inline-block border-b-2 px-4 py-2 font-bold">
                {blank || '______'}
              </span>
            )}
          </span>
        ))}
      </p>
      {hint && <p className="text-neutral mt-4 text-sm">Hint: {hint}</p>}
      {author && (
        <p className="text-accent mt-6 text-sm font-medium">&mdash; {author}</p>
      )}
    </div>
  );
};

FillBlank.displayName = 'FillBlank';
