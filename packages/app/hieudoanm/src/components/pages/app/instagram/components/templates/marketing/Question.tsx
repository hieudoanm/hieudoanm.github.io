import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const Question: FC<TemplateProps> = ({ data }) => {
  const headline = (data.headline as string) ?? '';
  const options = (data.options as string[]) ?? [];
  const items =
    options.length > 0
      ? options
      : ['Option A', 'Option B', 'Option C', 'Option D'];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <div className="mb-6">
        <span className="bg-primary/20 text-primary rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
          Question
        </span>
      </div>
      <h1 className="text-base-content mb-8 text-2xl leading-tight font-bold tracking-tight">
        {headline}
      </h1>
      <div className="flex flex-1 flex-col gap-3">
        {items.map((opt, i) => (
          <div
            key={i}
            className="rounded-box border-accent/20 bg-accent/5 flex items-center gap-4 border px-5 py-4">
            <div className="border-accent/30 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2">
              <span className="text-neutral text-xs font-bold">
                {String.fromCharCode(65 + i)}
              </span>
            </div>
            <span className="text-base-content text-sm leading-relaxed">
              {opt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

Question.displayName = 'Question';
