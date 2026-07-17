import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const Deadline: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Deadline';
  const daysLeft = (data.daysLeft as string) ?? '5';
  const task = (data.task as string) ?? 'Final submission';
  const text = (data.text as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-neutral text-xs font-bold tracking-widest uppercase">
          {title}
        </h2>
        <div className="text-primary mt-4 text-4xl leading-none font-black">
          {daysLeft}
        </div>
        <div className="text-base-content mt-2 text-xs font-bold tracking-wider uppercase">
          days left
        </div>
        <p className="text-neutral mt-3 text-base font-medium">{task}</p>
        {text && <p className="text-neutral mt-2 text-xs">{text}</p>}
      </div>
    </div>
  );
};

Deadline.displayName = 'Deadline';
