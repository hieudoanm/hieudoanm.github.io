import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const GradientText: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <h1 className="from-primary to-accent mb-4 bg-gradient-to-r bg-clip-text text-center text-4xl font-black text-transparent">
        {headline || 'Create'}
      </h1>
      <p className="text-base-content max-w-md text-center text-base leading-relaxed font-light">
        {text ||
          'Beautiful designs that inspire and motivate people every day.'}
      </p>
    </div>
  );
};

GradientText.displayName = 'GradientText';
