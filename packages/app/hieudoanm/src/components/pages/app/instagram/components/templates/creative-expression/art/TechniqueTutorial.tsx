import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Step {
  step: string;
  description: string;
}

export const TechniqueTutorial: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Technique Tutorial';
  const technique = (data.technique as string) ?? '';
  const difficulty = (data.difficulty as string) ?? 'Beginner';
  const steps = (data.steps as Step[]) ?? [
    { step: 'Prep', description: 'Set up your materials' },
    { step: 'Base', description: 'Apply the first layer' },
    { step: 'Detail', description: 'Add fine details' },
  ];
  const tip = (data.tip as string) ?? '';

  const badgeColor =
    difficulty === 'Advanced'
      ? 'bg-error/20 text-error'
      : difficulty === 'Intermediate'
        ? 'bg-warning/20 text-warning'
        : 'bg-success/20 text-success';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-base-content mb-1 text-2xl font-black tracking-tight">
        {title}
      </h1>
      {technique && (
        <p className="text-primary mb-3 text-sm font-semibold">{technique}</p>
      )}
      <span
        className={`mb-5 inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${badgeColor}`}>
        {difficulty}
      </span>
      <div className="mb-5 flex w-full flex-col gap-3">
        {steps.map((s, i) => (
          <div
            key={i}
            className="bg-base-200 flex items-start gap-3 rounded-lg p-3 text-left">
            <span className="bg-primary text-primary-content flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {i + 1}
            </span>
            <div>
              <span className="text-base-content text-xs font-bold">
                {s.step}
              </span>
              <p className="text-neutral text-[11px] leading-snug">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {tip && (
        <div className="bg-accent/10 text-accent rounded-lg px-4 py-2 text-xs font-medium">
          {tip}
        </div>
      )}
    </div>
  );
};

TechniqueTutorial.displayName = 'TechniqueTutorial';
