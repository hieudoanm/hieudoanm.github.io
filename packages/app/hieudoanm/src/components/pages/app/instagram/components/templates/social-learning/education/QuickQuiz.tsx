import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const QuickQuiz: FC<TemplateProps> = ({ data }) => {
  const question = (data.question as string) ?? '';
  const options = (data.options as string[]) ?? [];
  const answer = (data.answer as string) ?? '';
  const explanation = (data.explanation as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <span className="text-accent mb-4 text-[10px] font-bold tracking-[0.2em] uppercase">
        Quick Quiz
      </span>
      <p className="text-base-content text-base font-semibold">{question}</p>
      <div className="mt-4 flex flex-col gap-2">
        {options.map((opt, i) => {
          const letters = ['A', 'B', 'C', 'D'];
          const isCorrect = opt === answer;
          return (
            <div
              key={i}
              className={`rounded-box border px-4 py-2.5 text-sm ${
                isCorrect ? 'border-accent bg-accent/5' : 'border-base-300'
              }`}>
              <span
                className={`font-mono text-xs font-bold ${isCorrect ? 'text-accent' : 'text-neutral/40'}`}>
                {letters[i]}
              </span>
              <span
                className={`ml-3 ${isCorrect ? 'text-base-content font-medium' : 'text-neutral'}`}>
                {opt}
              </span>
            </div>
          );
        })}
      </div>
      {explanation && (
        <div className="border-accent/20 mt-6 border-t pt-4">
          <p className="text-neutral text-xs leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};

QuickQuiz.displayName = 'QuickQuiz';
