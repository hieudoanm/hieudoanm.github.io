import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const MeditationGuide: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const duration = (data.duration as string) ?? '';
  const instructions = (data.instructions as string[]) ?? [];
  const tip = (data.tip as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <div className="flex items-center justify-between">
        <h1 className="text-base-content text-lg font-bold">{title}</h1>
        {duration && (
          <span className="rounded-box bg-accent/10 text-accent px-3 py-1 text-xs font-bold">
            {duration}
          </span>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {instructions.map((inst, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="bg-accent text-accent-content mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {i + 1}
            </span>
            <p className="text-base-content pt-1 text-sm">{inst}</p>
          </div>
        ))}
      </div>
      {tip && (
        <div className="bg-accent/5 rounded-box mt-6 px-4 py-3">
          <span className="text-accent text-[10px] font-bold tracking-widest uppercase">
            Tip
          </span>
          <p className="text-base-content mt-1 text-xs leading-relaxed">
            {tip}
          </p>
        </div>
      )}
    </div>
  );
};

MeditationGuide.displayName = 'MeditationGuide';
