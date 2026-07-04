import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface StepDef {
  label: string;
}

export const StepByStep: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const text = (data.text as string) ?? '';
  const steps = (data.steps as StepDef[]) ?? [];
  const items =
    steps.length > 0
      ? steps
      : [{ label: 'Discover' }, { label: 'Learn' }, { label: 'Apply' }];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content mb-2 text-center text-3xl font-bold tracking-tight">
        {headline}
      </h1>
      <p className="text-neutral mb-8 text-center text-sm">{text}</p>
      <div className="flex flex-1 items-center justify-center gap-4">
        {items.map((step, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-3">
            <div className="rounded-box bg-accent/10 flex h-16 w-16 items-center justify-center">
              <span className="text-primary text-2xl font-bold">{i + 1}</span>
            </div>
            <span className="text-neutral text-center text-xs font-semibold tracking-wide uppercase">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

StepByStep.displayName = 'StepByStep';
