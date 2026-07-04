import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const FlashCard: FC<TemplateProps> = ({ data }) => {
  const term = (data.term as string) ?? '';
  const definition = (data.definition as string) ?? '';
  const category = (data.category as string) ?? '';
  const example = (data.example as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <div className="rounded-box border-accent/20 w-full border px-8 py-10">
        <h1 className="text-base-content text-3xl leading-tight font-bold">
          {term}
        </h1>
      </div>
      <div className="mt-6 w-full">
        <p className="text-base-content text-sm leading-relaxed">
          {definition}
        </p>
        {example && (
          <p className="text-neutral mt-4 text-xs italic">{example}</p>
        )}
      </div>
      {category && (
        <span className="border-accent/20 text-accent mt-6 rounded-full border px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase">
          {category}
        </span>
      )}
    </div>
  );
};

FlashCard.displayName = 'FlashCard';
