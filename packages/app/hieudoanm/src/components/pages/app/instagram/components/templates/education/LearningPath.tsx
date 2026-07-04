import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const LearningPath: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const steps =
    (data.steps as { level: string; label: string; desc?: string }[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <h1 className="text-base-content mb-8 text-xl leading-tight font-bold">
        {title}
      </h1>
      <div className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative flex items-start gap-4 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="bg-accent text-accent-content z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold">
                {i + 1}
              </span>
              {i < steps.length - 1 && (
                <div className="bg-accent/20 mt-0.5 h-full w-0.5" />
              )}
            </div>
            <div className="pt-0.5">
              <p className="text-base-content text-sm font-semibold">
                {step.label}
              </p>
              {step.desc && (
                <p className="text-neutral mt-0.5 text-xs">{step.desc}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

LearningPath.displayName = 'LearningPath';
