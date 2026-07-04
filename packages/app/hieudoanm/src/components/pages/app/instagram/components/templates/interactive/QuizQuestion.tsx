import type { FC } from 'react';
import type { TemplateProps } from '../common';

export const QuizQuestion: FC<TemplateProps> = ({ data }) => {
  const question = (data.question as string) ?? '';
  const options = (data.options as string[]) ?? [];
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-10">
      <span className="text-accent mb-1 text-[10px] font-bold tracking-[0.2em] uppercase">
        Quiz
      </span>
      <h1 className="text-base-content mb-6 text-lg leading-tight font-bold">
        {question}
      </h1>
      <div className="flex flex-1 flex-col justify-center gap-2">
        {options.map((opt, i) => (
          <div
            key={i}
            className="rounded-box border-accent/20 flex items-center gap-3 border px-4 py-3">
            <span className="bg-accent/10 text-accent flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {letters[i] ?? i + 1}
            </span>
            <span className="text-base-content text-sm">{opt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

QuizQuestion.displayName = 'QuizQuestion';
