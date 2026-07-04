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

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content mb-10 text-center text-3xl font-bold tracking-tight">
        {headline}
      </h1>
      <div className="flex flex-1 items-start justify-center gap-0 px-4">
        {items.map((step, i) => (
          <div key={i} className="flex flex-1 flex-col items-center">
            <div className="relative flex w-full items-center justify-center">
              <div className="bg-primary text-primary-content flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold shadow-lg">
                {i + 1}
              </div>
              {i < items.length - 1 && (
                <div className="bg-accent/20 absolute top-1/2 right-[calc(50%-2rem)] left-[calc(50%+2rem)] h-0.5 -translate-y-1/2" />
              )}
            </div>
            <p className="text-neutral mt-3 text-center text-xs font-semibold tracking-wide">
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

StepsHorizontal.displayName = 'StepsHorizontal';
