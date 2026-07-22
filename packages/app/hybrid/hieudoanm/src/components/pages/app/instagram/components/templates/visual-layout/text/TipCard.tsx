import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background, Footer } from '../../_shared';

export const TipCard: FC<TemplateProps> = ({ data }) => {
  const number = (data.number as string) ?? '01';
  const title = (data.title as string) ?? '';
  const text = (data.text as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <span className="text-primary/20 mb-2 text-4xl font-black tracking-tighter">
        {number}
      </span>
      <h1 className="text-base-content mb-2 text-4xl leading-tight font-bold tracking-tight">
        {title}
      </h1>
      <p className="text-neutral max-w-md text-sm leading-relaxed">{text}</p>
      <Footer citation={citation} />
    </Background>
  );
};

TipCard.displayName = 'TipCard';
