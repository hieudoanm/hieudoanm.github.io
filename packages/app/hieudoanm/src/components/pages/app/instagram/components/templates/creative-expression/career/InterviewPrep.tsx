import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface QAPair {
  question: string;
  answer: string;
}

export const InterviewPrep: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Interview Prep';
  const role = (data.role as string) ?? '';
  const questions = (data.questions as QAPair[]) ?? [];
  const tip = (data.tip as string) ?? '';

  return (
    <div className="bg-base-100 flex h-full w-full flex-col items-center justify-center p-8 text-center">
      <h1 className="text-primary mb-1 text-3xl font-bold">{title}</h1>
      {role && <p className="badge badge-secondary mb-6">{role}</p>}
      <div className="mb-6 w-full max-w-lg space-y-4 text-left">
        {questions.map((qa, index) => (
          <div key={index} className="bg-base-200 rounded-xl p-4">
            <p className="text-primary text-sm font-semibold">
              Q{index + 1}: {qa.question}
            </p>
            <p className="text-base-content/70 mt-2 text-xs leading-relaxed">
              {qa.answer}
            </p>
          </div>
        ))}
      </div>
      {tip && (
        <p className="text-accent bg-accent/10 rounded-lg px-4 py-2 text-sm font-medium">
          💡 {tip}
        </p>
      )}
    </div>
  );
};
InterviewPrep.displayName = 'InterviewPrep';
