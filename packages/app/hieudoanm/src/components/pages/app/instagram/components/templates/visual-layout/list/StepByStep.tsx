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
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <h1 className="text-base-content mb-2 text-center text-4xl font-bold tracking-tight">
        {headline}
      </h1>
      <p className="text-neutral mb-4 text-center text-xs">{text}</p>
      <div className="flex flex-1 items-center justify-center gap-2">
        {items.map((step, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="rounded-box bg-accent/10 flex h-8 w-8 items-center justify-center">
              <span className="text-primary text-sm font-bold">{i + 1}</span>
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
