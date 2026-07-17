import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const GoalTracker: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Goal Tracker';
  const goal = (data.goal as string) ?? 'Ship 100 commits';
  const current = (data.current as number) ?? 73;
  const target = (data.target as number) ?? 100;
  const unit = (data.unit as string) ?? '';
  const text = (data.text as string) ?? '';

  const pct = Math.min(Math.round((current / (target || 1)) * 100), 100);

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <div className="w-full max-w-[80%] text-center">
        <div className="text-neutral text-xs font-bold tracking-widest uppercase">
          {title}
        </div>
        <div className="text-base-content mt-3 text-base font-bold">{goal}</div>
        <div className="text-primary mt-2 text-2xl font-black">{pct}%</div>
        <div className="bg-base-200 mt-3 h-3 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-neutral mt-2 text-xs font-medium">
          {current}
          {unit} / {target}
          {unit}
        </div>
        {text && <p className="text-neutral mt-3 text-sm">{text}</p>}
      </div>
    </div>
  );
};

GoalTracker.displayName = 'GoalTracker';
