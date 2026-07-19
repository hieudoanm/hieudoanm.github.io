import { FC } from 'react';
import { CONFIDENCES, QUESTION_LABEL, TOTAL_QUESTIONS } from './constants';
import type { Confidence, Option, Question } from './types';

const choiceBtn = (active: boolean): string =>
  `btn btn-sm flex-1 ${
    active ? 'btn-primary' : 'btn-outline border-base-content/20'
  }`;

export const QuestionCard: FC<{
  question: Question;
  index: number;
  selected: Option | null;
  confidence: Confidence | null;
  canSubmit: boolean;
  onSelect: (o: Option) => void;
  onConfidence: (c: Confidence) => void;
  onSubmit: () => void;
}> = ({
  question,
  index,
  selected,
  confidence,
  canSubmit,
  onSelect,
  onConfidence,
  onSubmit,
}) => (
  <div
    data-testid="question"
    className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex items-center justify-between text-xs">
      <span className="text-base-content/60">
        Question {index + 1} / {TOTAL_QUESTIONS}
      </span>
    </div>
    <h2 className="text-primary text-lg font-bold">{question.prompt}</h2>
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        data-testid="option-a"
        onClick={() => onSelect('A')}
        className={choiceBtn(selected === 'A')}>
        {question.optionA}
      </button>
      <button
        type="button"
        data-testid="option-b"
        onClick={() => onSelect('B')}
        className={choiceBtn(selected === 'B')}>
        {question.optionB}
      </button>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-base-content/60 text-xs">
        How confident are you?
      </span>
      <div data-testid="confidence" className="flex flex-wrap gap-1">
        {CONFIDENCES.map((c) => (
          <button
            key={c}
            type="button"
            data-testid={`confidence-${c}`}
            onClick={() => onConfidence(c)}
            className={`btn btn-xs ${confidence === c ? 'btn-primary' : ''}`}
            title={QUESTION_LABEL[c]}>
            {c}%
          </button>
        ))}
      </div>
    </div>
    <button
      type="button"
      data-testid="submit"
      onClick={onSubmit}
      disabled={!canSubmit}
      className="btn btn-primary btn-sm self-start">
      Submit Answer
    </button>
  </div>
);

export const RevealCard: FC<{
  question: Question;
  correct: boolean;
  score: number;
  accuracy: number;
  confidence: Confidence;
  onNext: () => void;
}> = ({ question, correct, score, accuracy, confidence, onNext }) => (
  <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 py-6 text-center">
    <div className="text-4xl">{correct ? '\u2705' : '\u274c'}</div>
    <div data-testid="answer" className="text-lg font-bold">
      {correct ? 'Correct!' : 'Wrong.'} The answer was{' '}
      {question.correct === 'A' ? question.optionA : question.optionB}.
    </div>
    <div className="flex gap-4 text-sm">
      <span data-testid="score">
        Score: <strong>{score}</strong>/{TOTAL_QUESTIONS}
      </span>
      <span data-testid="accuracy">
        Accuracy: <strong>{accuracy}%</strong>
      </span>
    </div>
    <div data-testid="bucket" className="text-base-content/60 text-xs">
      You claimed {confidence}% confidence &mdash; you should be right about{' '}
      {confidence}% of the time.
    </div>
    <button
      type="button"
      data-testid="next"
      onClick={onNext}
      className="btn btn-primary btn-sm">
      {score >= TOTAL_QUESTIONS ? 'See Calibration' : 'Next Question'}
    </button>
  </div>
);
