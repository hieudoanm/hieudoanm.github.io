import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const SpeedRun: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Speed Run';
  const task = (data.task as string) ?? 'Build a landing page';
  const record = (data.record as string) ?? '2h 15m';
  const attempts = (data.attempts as string) ?? '12';
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <div className="text-center">
        <div className="text-neutral text-xs font-bold tracking-widest uppercase">
          {title}
        </div>
        <div className="text-base-content mt-3 text-lg font-bold">{task}</div>
        <div className="text-primary mt-4 text-3xl leading-none font-black">
          {record}
        </div>
        <div className="text-neutral mt-2 text-xs font-bold tracking-wider uppercase">
          best time
        </div>
        <div className="text-neutral mt-2 text-xs">{attempts} attempts</div>
        {text && <p className="text-neutral mt-3 text-sm">{text}</p>}
      </div>
    </div>
  );
};

SpeedRun.displayName = 'SpeedRun';
