import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const Affirmation: FC<TemplateProps> = ({ data }) => {
  const affirmation = (data.affirmation as string) ?? '';
  const subtitle = (data.subtitle as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center gap-4 p-12 text-center">
      <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
        I Am
      </span>
      <h1 className="text-base-content text-4xl leading-tight font-bold tracking-tight">
        {affirmation}
      </h1>
      {subtitle && (
        <p className="text-neutral max-w-xs text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

Affirmation.displayName = 'Affirmation';
