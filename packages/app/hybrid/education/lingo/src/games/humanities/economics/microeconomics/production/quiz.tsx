import { FC } from 'react';
import type { QuizQuestion } from './types';

export const QuizPanel: FC<{
  question: QuizQuestion;
  round: number;
  total: number;
  selected: number | null;
  onCheck: (index: number) => void;
  onNext: () => void;
}> = ({ question, round, total, selected, onCheck, onNext }) => {
  const answered = selected !== null;
  const correct = answered && selected === question.correctIndex;
  return (
    <div className="card border-base-content/10 flex w-full flex-col gap-4 border p-6">
      <div className="text-sm">
        Question <strong>{round}</strong> of {total}
      </div>
      <p className="font-medium">{question.prompt}</p>
      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => {
          const isRight = answered && index === question.correctIndex;
          const isWrong = answered && index === selected && !correct;
          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => onCheck(index)}
              data-testid={`quiz-option-${index}`}
              className={`btn btn-outline justify-start ${
                isRight ? 'btn-success' : isWrong ? 'btn-error' : ''
              }`}>
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <>
          <p className={`text-sm ${correct ? 'text-success' : 'text-error'}`}>
            {correct ? 'Correct!' : 'Not quite.'} {question.explanation}
          </p>
          <button
            type="button"
            data-testid="quiz-next"
            onClick={onNext}
            className="btn btn-primary btn-sm">
            Next
          </button>
        </>
      )}
    </div>
  );
};

export const ResultsPanel: FC<{
  score: number;
  total: number;
  onReset: () => void;
}> = ({ score, total, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-6">
    <div className="text-4xl">📊</div>
    <div className="text-xl font-semibold">Quiz complete</div>
    <p className="text-lg">
      You scored <strong>{score}</strong> / {total}
    </p>
    <button
      type="button"
      data-testid="reset"
      onClick={onReset}
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
