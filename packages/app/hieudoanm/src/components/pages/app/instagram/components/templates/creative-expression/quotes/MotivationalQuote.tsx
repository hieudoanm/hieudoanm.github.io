import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const MotivationalQuote: FC<TemplateProps> = ({ data }) => {
  const quote =
    (data.quote as string) ??
    'The future belongs to those who believe in the beauty of their dreams.';
  const author = (data.author as string) ?? 'Eleanor Roosevelt';
  const theme = (data.theme as string) ?? 'Dreams';
  const subtitle = (data.subtitle as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background center textAlign>
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
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};
MotivationalQuote.displayName = 'MotivationalQuote';
