import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const ProgressTracker: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const metric = (data.metric as string) ?? '';
  const startValue = (data.startValue as string) ?? '';
  const currentValue = (data.currentValue as string) ?? '';
  const goalValue = (data.goalValue as string) ?? '';
  const unit = (data.unit as string) ?? '';

  const start = parseFloat(startValue) || 0;
  const current = parseFloat(currentValue) || 0;
  const goal = parseFloat(goalValue) || 1;
  const pct = Math.min(
    100,
    Math.round(((current - start) / (goal - start)) * 100)
  );

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <h1 className="text-base-content text-lg font-bold">{title}</h1>
      <div className="mt-8">
        <span className="text-accent text-6xl font-bold tracking-tight">
          {currentValue}
        </span>
        {unit && <span className="text-neutral ml-1 text-sm">{unit}</span>}
      </div>
      {metric && (
        <p className="text-neutral mt-1 text-sm font-medium">{metric}</p>
      )}
      <div className="mt-6 w-full">
        <div className="bg-base-300 h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-accent h-full rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px]">
          <span className="text-neutral">{startValue}</span>
          <span className="text-base-content font-semibold">{goalValue}</span>
        </div>
      </div>
    </div>
  );
};

ProgressTracker.displayName = 'ProgressTracker';
