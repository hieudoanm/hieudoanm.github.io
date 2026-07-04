import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const PollVote: FC<TemplateProps> = ({ data }) => {
  const question = (data.question as string) ?? '';
  const options =
    (data.options as { label: string; percentage: number }[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <h1 className="text-base-content mb-6 text-lg leading-tight font-bold">
        {question}
      </h1>
      <div className="flex flex-1 flex-col justify-center gap-3">
        {options.map((opt, i) => (
          <div key={i}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-base-content font-medium">{opt.label}</span>
              <span className="text-neutral">{opt.percentage}%</span>
            </div>
            <div className="bg-neutral/20 h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-accent h-full rounded-full transition-all"
                style={{ width: `${opt.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-neutral mt-4 text-center text-[10px]">
        Cast your vote
      </p>
    </div>
  );
};

PollVote.displayName = 'PollVote';
