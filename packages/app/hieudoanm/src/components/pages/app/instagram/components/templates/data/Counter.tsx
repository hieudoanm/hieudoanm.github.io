import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const Counter: FC<TemplateProps> = ({ data }) => {
  const number = (data.number as string) ?? '10K+';
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const suffix = (data.suffix as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <div className="text-primary mb-2 text-8xl font-black tracking-tight">
        {number}
      </div>
      {suffix && (
        <p className="text-neutral mb-4 text-lg font-medium">{suffix}</p>
      )}
      <h1 className="text-base-content mb-3 text-2xl font-bold tracking-tight">
        {headline}
      </h1>
      <p className="text-neutral mx-auto max-w-sm text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
};

Counter.displayName = 'Counter';
