import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Composition: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Composition';
  const rule = (data.rule as string) ?? '';
  const description = (data.description as string) ?? '';
  const tips = (data.tips as string[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <div className="text-accent mb-1 text-xs font-bold tracking-[0.2em] uppercase">
        Composition
      </div>
      <h1 className="text-base-content mb-1 text-2xl font-bold">{title}</h1>
      {rule && (
        <span className="text-accent mb-3 text-lg font-bold">{rule}</span>
      )}
      {description && (
        <p className="text-neutral mb-4 max-w-sm text-xs leading-relaxed">
          {description}
        </p>
      )}
      {tips.length > 0 && (
        <div className="mt-1 flex w-full max-w-sm flex-col gap-2 text-left">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-accent mt-0.5 text-xs font-bold">
                {i + 1}.
              </span>
              <p className="text-base-content text-xs leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Composition.displayName = 'Composition';
