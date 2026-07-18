import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const HighlightedTitle: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? 'The Future is NOW';
  const highlights = (data.highlights as string[]) ?? ['NOW'];
  const text = (data.text as string) ?? '';

  const renderHeadline = () => {
    const words = headline.split(/(\s+)/);
    return words.map((word, i) => {
      const isHighlight = highlights.some(
        (h: string) =>
          (h ?? '').toString().toLowerCase() === word.trim().toLowerCase()
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

  const citation = (data.citation as string) ?? '';

  return (
    <Background center>
      <div className="text-center">
        <h1 className="text-base-content text-4xl leading-tight font-bold tracking-tight">
          {renderHeadline()}
        </h1>
        {text && (
          <p className="text-neutral mt-2 text-base leading-relaxed">{text}</p>
        )}
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </Background>
  );
};

HighlightedTitle.displayName = 'HighlightedTitle';
