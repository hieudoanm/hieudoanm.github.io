import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const FinancialPlan: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const steps = (data.steps as { label: string; desc: string }[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <h1 className="text-base-content mb-8 text-xl font-bold">{title}</h1>
      <div className="flex flex-col gap-5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="bg-accent text-accent-content mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
              {i + 1}
            </span>
            <div>
              <p className="text-base-content text-sm font-semibold">
                {step.label}
              </p>
              <p className="text-neutral mt-0.5 text-xs">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FinancialPlan.displayName = 'FinancialPlan';
