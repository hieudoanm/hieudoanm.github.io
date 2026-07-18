import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const WaterTracker: FC<TemplateProps> = ({ data }) => {
  const goal = (data.goal as string) ?? '';
  const current = (data.current as string) ?? '';
  const unit = (data.unit as string) ?? '';
  const tip = (data.tip as string) ?? '';

  const goalNum = parseInt(goal) || 8;
  const currentNum = parseInt(current) || 0;
  const fullGlasses = Math.min(currentNum, goalNum);
  const emptyGlasses = Math.max(0, goalNum - fullGlasses);

  const citation = (data.citation as string) ?? '';
  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
        Daily Water Intake
      </span>
      <div className="mt-6 mb-4 flex flex-wrap justify-center gap-1.5">
        {Array.from({ length: fullGlasses }).map((_, i) => (
          <div
            key={`full-${i}`}
            className="bg-accent flex h-8 w-6 items-center justify-center rounded-t-sm rounded-b-md text-xs">
            💧
          </div>
        ))}
        {Array.from({ length: emptyGlasses }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="border-accent/20 flex h-8 w-6 items-center justify-center rounded-t-sm rounded-b-md border text-xs"
          />
        ))}
      </div>
      <p className="text-base-content text-sm">
        <span className="text-accent font-bold">{current}</span>
        {unit && (
          <span className="text-neutral">
            {' '}
            / {goal} {unit}
          </span>
        )}
      </p>
      {tip && <p className="text-neutral mt-4 text-xs italic">{tip}</p>}
      {citation && (
        <p className="text-base-content/40 mt-auto pt-4 text-center text-[10px]">
          {citation}
        </p>
      )}
    </div>
  );
};

WaterTracker.displayName = 'WaterTracker';
