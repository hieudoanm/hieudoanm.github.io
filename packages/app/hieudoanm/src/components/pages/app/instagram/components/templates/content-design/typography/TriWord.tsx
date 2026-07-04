import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const TriWord: FC<TemplateProps> = ({ data }) => {
  const word1 = (data.word1 as string) ?? 'WORK';
  const word2 = (data.word2 as string) ?? 'hard';
  const word3 = (data.word3 as string) ?? 'PLAY';
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-6">
      <div className="flex items-baseline gap-3 text-center">
        <span className="text-primary text-5xl leading-none font-black">
          {word1}
        </span>
        <span className="text-base-content text-2xl leading-none font-medium">
          {word2}
        </span>
        <span className="text-primary text-5xl leading-none font-black">
          {word3}
        </span>
      </div>
      {text && (
        <p className="text-neutral mt-4 text-sm leading-relaxed">{text}</p>
      )}
    </div>
  );
};

TriWord.displayName = 'TriWord';
