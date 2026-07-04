import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Strikethrough: FC<TemplateProps> = ({ data }) => {
  const number = (data.number as string) ?? '$99';
  const replacement = (data.replacement as string) ?? 'FREE';
  const label = (data.label as string) ?? 'Limited Time Offer';
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-6">
      <div className="text-center">
        <div className="flex items-baseline justify-center gap-4">
          <span className="text-base-content text-6xl leading-none font-black line-through opacity-40">
            {number}
          </span>
          <span className="text-primary text-7xl leading-none font-black">
            {replacement}
          </span>
        </div>
        {label && (
          <div className="text-base-content mt-4 text-lg font-bold tracking-wider uppercase">
            {label}
          </div>
        )}
        {text && (
          <p className="text-neutral mt-3 text-sm leading-relaxed">{text}</p>
        )}
      </div>
    </div>
  );
};

Strikethrough.displayName = 'Strikethrough';
