import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const MotivationalQuote: FC<TemplateProps> = ({ data }) => {
  const quote =
    (data.quote as string) ??
    'The future belongs to those who believe in the beauty of their dreams.';
  const author = (data.author as string) ?? 'Eleanor Roosevelt';
  const theme = (data.theme as string) ?? 'Dreams';
  const subtitle = (data.subtitle as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <p className="badge badge-primary mb-3 text-xs">{theme}</p>
      <blockquote className="text-base-content mb-3 max-w-xl text-2xl leading-snug font-bold">
        {quote}
      </blockquote>
      <p className="text-secondary mb-1 text-xs font-semibold">— {author}</p>
      {subtitle && (
        <p className="text-base-content/60 mt-1 max-w-md text-xs italic">
          {subtitle}
        </p>
      )}
    </div>
  );
};
MotivationalQuote.displayName = 'MotivationalQuote';
