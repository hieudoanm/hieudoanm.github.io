import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const TipCard: FC<TemplateProps> = ({ data }) => {
  const number = (data.number as string) ?? '01';
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col justify-center p-10">
      <span className="text-primary/20 mb-4 text-7xl font-black tracking-tighter">
        {number}
      </span>
      <h1 className="text-base-content mb-4 text-3xl leading-tight font-bold tracking-tight">
        {headline}
      </h1>
      <p className="text-neutral max-w-md text-base leading-relaxed">{text}</p>
    </div>
  );
};

TipCard.displayName = 'TipCard';
