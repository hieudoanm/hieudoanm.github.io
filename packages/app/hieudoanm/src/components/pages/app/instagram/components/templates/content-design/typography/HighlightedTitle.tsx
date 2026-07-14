import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const HighlightedTitle: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'The Future is NOW';
  const highlights = (data.highlights as string[]) ?? ['NOW'];
  const text = (data.text as string) ?? '';

  const renderHeadline = () => {
    const words = headline.split(/(\s+)/);
    return words.map((word, i) => {
      const isHighlight = highlights.some(
        (h: string) => (h ?? '').toLowerCase() === word.trim().toLowerCase()
      );
      return (
        <span
          key={i}
          className={
            isHighlight
              ? 'text-primary font-black'
              : 'text-base-content font-bold'
          }>
          {word}
        </span>
      );
    });
  };

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-base-content text-5xl leading-tight font-bold tracking-tight">
          {renderHeadline()}
        </h1>
        {text && (
          <p className="text-neutral mt-4 text-sm leading-relaxed">{text}</p>
        )}
      </div>
    </div>
  );
};

HighlightedTitle.displayName = 'HighlightedTitle';
