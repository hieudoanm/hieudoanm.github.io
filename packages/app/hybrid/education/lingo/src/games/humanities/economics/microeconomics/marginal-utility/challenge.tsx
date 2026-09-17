import type { FC } from 'react';
import { TOTAL_ROUNDS } from './constants';
import type { ChallengeResult, ChallengeScenario, Phase } from './types';

interface ChallengeOptionsProps {
  scenario: ChallengeScenario;
  selected: number;
  disabled: boolean;
  onSelect: (index: number) => void;
}

export const ChallengeOptions: FC<ChallengeOptionsProps> = ({
  scenario,
  selected,
  disabled,
  onSelect,
}) => (
  <div className="grid gap-2 sm:grid-cols-2">
    {scenario.options.map((option, index) => (
      <button
        key={index}
        type="button"
        data-testid={`option-${index}`}
        onClick={() => onSelect(index)}
        disabled={disabled}
        className={`btn btn-sm ${
          selected === index ? 'btn-primary' : 'btn-outline'
        }`}>
        {option.apples} apples, {option.cookies} cookies
      </button>
    ))}
  </div>
);

interface ChallengeFeedbackProps {
  result: ChallengeResult;
  onNext: () => void;
}

export const ChallengeFeedback: FC<ChallengeFeedbackProps> = ({
  result,
  onNext,
}) => (
  <div className="flex flex-col gap-1">
    <div
      className={`card border p-3 text-sm ${
        result.correct ? 'border-success' : 'border-warning'
      }`}>
      <div
        className={`font-bold ${
          result.correct ? 'text-success' : 'text-warning'
        }`}>
        {result.correct
          ? '🎯 Correct optimum!'
          : `Not the optimum — ${result.utilityRatio}/100 of max utility`}
      </div>
      <p className="text-base-content/60 text-xs">
        Optimal bundle: {result.optimal.apples} apples, {result.optimal.cookies}{' '}
        cookies.
      </p>
    </div>
    <button
      type="button"
      data-testid="next-round"
      onClick={onNext}
      className="btn btn-primary btn-sm self-start">
      {result.round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

interface ChallengeBoardProps {
  round: number;
  scenario: ChallengeScenario;
  selected: number;
  result: ChallengeResult | null;
  phase: Phase;
  onSelect: (index: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  onReset: () => void;
}

export const ChallengeBoard: FC<ChallengeBoardProps> = ({
  round,
  scenario,
  selected,
  result,
  phase,
  onSelect,
  onSubmit,
  onNext,
  onReset,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex items-center justify-between">
      <h2 className="text-primary text-sm font-bold">
        Challenge {round} / {TOTAL_ROUNDS}
      </h2>
      <span className="text-base-content/60 text-xs">
        pa = {scenario.pa}, pc = {scenario.pc}, M = {scenario.income}
      </span>
    </div>
    <p className="text-sm">
      Which bundle maximizes total utility within the budget?
    </p>
    <ChallengeOptions
      scenario={scenario}
      selected={selected}
      disabled={phase === 'reveal'}
      onSelect={onSelect}
    />
    <div className="flex gap-2">
      <button
        type="button"
        data-testid="submit-challenge"
        onClick={onSubmit}
        disabled={selected < 0 || phase === 'reveal'}
        className="btn btn-primary btn-sm">
        Submit
      </button>
      <button
        type="button"
        data-testid="reset"
        onClick={onReset}
        className="btn btn-outline btn-sm">
        Reset
      </button>
    </div>
    {result && phase === 'reveal' && (
      <ChallengeFeedback result={result} onNext={onNext} />
    )}
  </div>
);

interface ChallengeSummaryProps {
  totalCorrect: number;
  onReset: () => void;
}

export const ChallengeSummary: FC<ChallengeSummaryProps> = ({
  totalCorrect,
  onReset,
}) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">🏆</div>
    <div className="text-lg">Challenge complete</div>
    <span>
      Correct:{' '}
      <strong>
        {totalCorrect} / {TOTAL_ROUNDS}
      </strong>
    </span>
    <button
      type="button"
      data-testid="reset"
      onClick={onReset}
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
