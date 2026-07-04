import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Methods: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Methods';
  const design =
    (data.design as string) ?? 'Between-subjects experimental design';
  const procedure = (data.procedure as string[]) ?? [
    'Informed consent obtained',
    'Random assignment to conditions',
    'Task presentation and data collection',
    'Debriefing and compensation',
  ];
  const materials = (data.materials as string[]) ?? [
    'Custom survey (Qualtrics)',
    'Reaction time software (PsychoPy)',
    'Stimulus set (n = 120)',
  ];
  const analysis =
    (data.analysis as string) ??
    'Mixed-effects regression with random intercepts for participants';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-3 text-[10px] font-bold tracking-[0.2em] uppercase">
        Methods
      </span>
      <h1 className="text-base-content text-xl leading-tight font-bold">
        {title}
      </h1>

      <div className="bg-accent/10 mt-4 inline-flex self-start rounded px-3 py-1">
        <span className="text-accent text-[10px] font-bold tracking-[0.1em] uppercase">
          {design}
        </span>
      </div>

      <div className="mt-5">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Procedure
        </span>
        <div className="mt-2 flex flex-col gap-2">
          {procedure.map((p, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-accent mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                {i + 1}
              </span>
              <span className="text-base-content text-xs leading-relaxed">
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Materials
        </span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {materials.map((m, i) => (
            <span
              key={i}
              className="bg-base-200 text-base-content rounded px-2 py-1 text-[10px] font-medium">
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-base-200 mt-5 rounded-lg p-3">
        <span className="text-neutral text-[9px] font-bold tracking-[0.15em] uppercase">
          Analysis
        </span>
        <p className="text-base-content mt-1 text-xs leading-relaxed">
          {analysis}
        </p>
      </div>
    </div>
  );
};

Methods.displayName = 'Methods';
