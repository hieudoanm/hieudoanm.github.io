import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface StepDef {
  label: string;
}

export const StepsHorizontal: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const steps = (data.steps as StepDef[]) ?? [];
  const items =
    steps.length > 0
      ? steps
      : [{ label: 'Plan' }, { label: 'Build' }, { label: 'Launch' }];

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-4 text-center text-4xl font-bold tracking-tight">
        {headline}
      </h1>
      <ol className="flex flex-1 items-start justify-center gap-0 px-2">
        {items.map((step, i) => (
          <li key={i} className="flex flex-1 flex-col items-center">
            <div className="relative flex w-full items-center justify-center">
              <div className="bg-primary text-primary-content flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-lg">
                {i + 1}
              </div>
              {i < items.length - 1 && (
                <div className="bg-accent/20 absolute top-1/2 right-[calc(50%-2rem)] left-[calc(50%+2rem)] h-0.5 -translate-y-1/2" />
              )}
            </div>
            <p className="text-neutral mt-1 text-center text-xs font-semibold tracking-wide">
              {step.label}
            </p>
          </li>
        ))}
      </ol>
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

StepsHorizontal.displayName = 'StepsHorizontal';
