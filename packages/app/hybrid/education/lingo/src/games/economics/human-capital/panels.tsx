import type { FC } from 'react';
import { PERFECT_SCORE } from './constants';
import { money } from './components';
import type { RoundResult } from './types';

interface RevealPanelProps {
  result: RoundResult;
  isLast: boolean;
  onBack: () => void;
  onStart: () => void;
  onNext: () => void;
}

export const RevealPanel: FC<RevealPanelProps> = ({
  result,
  isLast,
  onBack,
  onStart,
  onNext,
}) => {
  const sandbox = result.score === null;
  const perfect = result.score === PERFECT_SCORE;
  return (
    <div
      data-testid="feedback"
      className={`card border p-4 ${perfect ? 'border-success' : 'border-base-content/10'}`}>
      <div className="flex flex-col gap-2 text-sm">
        <div className={`font-bold ${perfect ? 'text-success' : ''}`}>
          {sandbox
            ? '🔎 Sandbox result'
            : perfect
              ? '🎯 Optimal schooling!'
              : '🤔 Not quite the maximum.'}
        </div>
        <div className="text-base-content/80 flex gap-4 text-xs">
          <span data-testid="feedback-optimal">
            Optimal years: <strong>{result.optimalYears}</strong> → NPV{' '}
            {money(result.optimalNpv)}
          </span>
          <span data-testid="feedback-pick">
            Your pick: <strong>{result.years}</strong> yrs → NPV{' '}
            {money(result.npv)}
          </span>
        </div>
        {!sandbox && (
          <span data-testid="feedback-score">
            Score: <strong>{result.score}</strong> / {PERFECT_SCORE}
          </span>
        )}
        <div className="flex gap-2">
          {sandbox ? (
            <>
              <button type="button" onClick={onBack} className="btn btn-sm">
                Keep exploring
              </button>
              <button
                type="button"
                onClick={onStart}
                data-testid="start-challenge"
                className="btn btn-primary btn-sm">
                Start Challenge
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onNext}
              data-testid="next-challenge"
              className="btn btn-primary btn-sm">
              {isLast ? 'See Results' : 'Next Challenge'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface DonePanelProps {
  score: number;
  onReset: () => void;
}

export const DonePanel: FC<DonePanelProps> = ({ score, onReset }) => (
  <div data-testid="done" className="card border-base-content/10 border p-4">
    <div className="flex flex-col items-center gap-2 py-2 text-center">
      <div className="text-3xl">🏆</div>
      <div className="text-lg font-bold">Challenges complete</div>
      <p className="text-sm" data-testid="done-score">
        Total score: <strong>{score}</strong> / {PERFECT_SCORE} × career rounds
      </p>
      <button
        type="button"
        onClick={onReset}
        data-testid="play-again"
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  </div>
);
