import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const TipCard: FC<TemplateProps> = ({ data }) => {
  const number = (data.number as string) ?? '01';
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col justify-center p-8">
      <span className="text-primary/20 mb-2 text-4xl font-black tracking-tighter">
        {number}
      </span>
      <h1 className="text-base-content mb-2 text-4xl leading-tight font-bold tracking-tight">
        {headline}
      </h1>
      <p className="text-neutral max-w-md text-sm leading-relaxed">{text}</p>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

TipCard.displayName = 'TipCard';
