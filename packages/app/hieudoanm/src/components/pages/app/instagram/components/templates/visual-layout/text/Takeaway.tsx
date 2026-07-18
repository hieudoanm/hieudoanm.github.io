import type { FC } from 'react';
import type { TemplateProps } from '../../common';
import { Background } from '../../_shared';

export const Takeaway: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const source = (data.source as string) ?? '';

  const citation = (data.citation as string) ?? '';
  return (
    <Background>
      <div className="mb-3">
        <span className="bg-primary/20 text-primary rounded-full px-2 py-1.5 text-xs font-bold tracking-widest uppercase">
          Key Takeaway
        </span>
      </div>
      <div className="border-primary relative border-l-4 pl-3">
        <h1 className="text-base-content mb-2 text-4xl leading-tight font-bold tracking-tight">
          {headline}
        </h1>
        <p className="text-neutral max-w-md text-sm leading-relaxed">{text}</p>
      </div>
      {source && (
        <p className="text-accent mt-4 text-xs font-medium tracking-wider">
          &mdash; {source}
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

Takeaway.displayName = 'Takeaway';
