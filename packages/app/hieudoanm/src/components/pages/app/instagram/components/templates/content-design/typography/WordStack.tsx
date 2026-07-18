import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Word {
  text: string;
  highlight: boolean;
}

export const WordStack: FC<TemplateProps> = ({ data }) => {
  const words = (data.words as Word[]) ?? [
    { text: 'LESS', highlight: true },
    { text: 'is', highlight: false },
    { text: 'MORE', highlight: true },
  ];
  const text = (data.text as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <div className="text-center">
        {words.map((word, i) => (
          <div
            key={i}
            className={
              word.highlight
                ? 'text-primary text-4xl leading-tight font-black'
                : 'text-base-content text-base leading-tight font-medium'
            }>
            {word.text}
          </div>
        ))}
        {text && (
          <p className="text-neutral mt-2 text-base leading-relaxed">{text}</p>
        )}
      </div>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

WordStack.displayName = 'WordStack';
