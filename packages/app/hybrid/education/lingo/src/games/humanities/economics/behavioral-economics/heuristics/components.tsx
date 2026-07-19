import type { FC } from 'react';
import {
  CONJUNCTION_LABELS,
  ROUNDS,
  SCORE_LABELS,
  TOTAL_ROUNDS,
} from './constants';
import type { AnchoringReport, RoundItem, RoundResult } from './types';

export const RoundIntro: FC<{
  question: string;
  story: string;
  note?: string;
}> = ({ question, story, note }) => (
  <div
    className="card border-base-content/10 flex flex-col gap-2 border p-4"
    data-testid="round-intro">
    <p className="text-lg font-semibold" data-testid="question">
      {question}
    </p>
    <p className="text-base-content/60 text-sm">{story}</p>
    {note && <p className="text-base-content/70 text-sm font-medium">{note}</p>}
  </div>
);

export const AnchorBanner: FC<{ text: string }> = ({ text }) => (
  <div className="alert alert-info" data-testid="anchor-panel">
    <span>{text}</span>
  </div>
);

export const GuessForm: FC<{
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  label: string;
  submitLabel?: string;
}> = ({ value, onChange, onSubmit, label, submitLabel = 'Submit Guess' }) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <label htmlFor="guess-input" className="text-sm">
      {label}
    </label>
    <div className="flex flex-wrap items-center gap-2">
      <input
        id="guess-input"
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="guess-input"
        aria-label={label}
        className="input input-sm input-bordered w-40"
      />
      <button
        type="button"
        onClick={onSubmit}
        data-testid="submit-guess"
        className="btn btn-primary btn-sm">
        {submitLabel}
      </button>
    </div>
  </div>
);

export const FeedbackPanel: FC<{
  item: RoundItem;
  result: RoundResult;
  isLast: boolean;
  onNext: () => void;
}> = ({ item, result, isLast, onNext }) => {
  const conjunction = result.conjunction;
  const scoreLabel = conjunction
    ? CONJUNCTION_LABELS[result.points]
    : SCORE_LABELS[result.points];
  const trueText = item.trueText ?? `${item.trueAnswer} ${item.unit}`;
  return (
    <div
      className="card border-base-content/10 flex flex-col gap-3 border p-4"
      data-testid="feedback">
      <p className="text-lg">
        {result.points > 0 ? '✅ Nice job!' : '❌ Not quite.'}
      </p>
      <div className="text-base-content/70 flex flex-col gap-1 text-sm">
        <span>
          Your guess: <strong>{result.guess}</strong>
        </span>
        {conjunction && (
          <span>
            Second guess (P(A and B)): <strong>{conjunction.overlap}</strong>
          </span>
        )}
        <span>
          Exact answer: <strong>{trueText}</strong>
        </span>
        <span>
          Off by: <strong>{result.error}</strong>
        </span>
        <span className="font-medium">{scoreLabel}</span>
      </div>
      <p className="text-base-content/60 text-sm">{item.lesson}</p>
      <button
        type="button"
        onClick={onNext}
        data-testid="next-round"
        className="btn btn-primary btn-sm">
        {isLast ? 'See Report' : 'Next Round'}
      </button>
    </div>
  );
};

export const SummaryPanel: FC<{
  results: RoundResult[];
  report: AnchoringReport;
  totalPoints: number;
  onReset: () => void;
}> = ({ results, report, totalPoints, onReset }) => (
  <div className="flex flex-col gap-4" data-testid="report">
    <div className="text-lg font-bold">📊 Final report</div>
    <p className="text-sm">
      Total points: <strong>{totalPoints}</strong> / {TOTAL_ROUNDS * 2}
    </p>
    <p className="text-sm" data-testid="anchoring-summary">
      {report.summary}
    </p>
    <div className="card border-base-content/10 overflow-x-auto border p-3">
      <table className="table-sm table w-full text-sm">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your guess</th>
            <th>True answer</th>
            <th>Error</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => {
            const item = ROUNDS.find((r) => r.id === row.roundId);
            const answer =
              item?.trueText ?? `${item?.trueAnswer} ${item?.unit}`;
            const guess = row.conjunction
              ? `${row.conjunction.base} / ${row.conjunction.overlap}`
              : row.guess;
            return (
              <tr key={row.roundId}>
                <td className="max-w-xs">{item?.question}</td>
                <td>{guess}</td>
                <td>{answer}</td>
                <td>{row.error}</td>
                <td>{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <button
      type="button"
      onClick={onReset}
      data-testid="play-again"
      className="btn btn-primary btn-sm self-center">
      Play Again
    </button>
  </div>
);
