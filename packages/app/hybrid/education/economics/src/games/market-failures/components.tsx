import type { FC } from 'react';
import {
  FAILURE_LABELS,
  POLICY_LABELS,
  POLLUTION_MAX_GAP,
  SCENARIOS,
} from './constants';
import { choseOptimalTax, optimalOutput, taxAccuracy } from './game';
import type { Policy, PollutionState, Scenario } from './types';

export const ScenarioHeader: FC<{ index: number }> = ({ index }) => (
  <div className="text-sm">
    Scenario <strong data-testid="scenario">{index + 1}</strong> /{' '}
    {SCENARIOS.length}
  </div>
);

export const ScenarioCard: FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="card border-base-content/10 border p-4">
    <div className="flex flex-wrap items-center gap-2">
      <h2 className="text-lg font-bold">{scenario.name}</h2>
      <span
        data-testid="failure-type"
        className="badge badge-primary badge-outline">
        {FAILURE_LABELS[scenario.failureType]}
      </span>
    </div>
    <p className="text-base-content/80 mt-2 text-sm">{scenario.description}</p>
  </div>
);

export const PolicyOptions: FC<{
  selected: Policy | null;
  disabled: boolean;
  onPick: (policy: Policy) => void;
}> = ({ selected, disabled, onPick }) => (
  <div data-testid="policy-options" className="grid gap-2 sm:grid-cols-2">
    {Object.entries(POLICY_LABELS).map(([key, label]) => {
      const policy = key as Policy;
      const active = selected === policy;
      return (
        <button
          key={policy}
          type="button"
          disabled={disabled}
          onClick={() => onPick(policy)}
          data-testid={`policy-${policy}`}
          className={`btn ${active ? 'btn-primary' : 'btn-outline'} btn-sm justify-start`}>
          {label}
        </button>
      );
    })}
  </div>
);

export const Feedback: FC<{
  scenario: Scenario;
  correct: boolean;
  policy: Policy;
}> = ({ scenario, correct, policy }) => (
  <div
    data-testid="answer"
    className={`card border p-4 text-sm ${
      correct ? 'border-success' : 'border-error'
    }`}>
    <p className={correct ? 'text-success' : 'text-error'}>
      {correct ? 'Correct!' : 'Not quite—'} You chose {POLICY_LABELS[policy]}.
    </p>
    <p className="text-base-content/80 mt-2">
      <strong>Failure type:</strong> {FAILURE_LABELS[scenario.failureType]}
    </p>
    <p className="text-base-content/80 mt-1">
      <strong>Why this works:</strong> {scenario.why}
    </p>
  </div>
);

export const ScoreBadge: FC<{ score: number }> = ({ score }) => (
  <span data-testid="score" className="badge badge-accent">
    Score: {score}
  </span>
);

export const PollutionPanel: FC<{
  gap: number;
  tax: number;
  confirmed: boolean;
  onGap: (gap: number) => void;
  onTax: (tax: number) => void;
  onCheck: () => void;
}> = ({ gap, tax, confirmed, onGap, onTax, onCheck }) => {
  const optimal = optimalOutput(tax, gap);
  const accurate = choseOptimalTax(tax, gap);
  return (
    <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
      <p className="text-sm">
        A polluting factory has a private marginal cost below its social
        marginal cost. Set a Pigouvian tax to close the gap and reach optimal
        output.
      </p>
      <label className="flex flex-col gap-1 text-sm">
        Social MC − Private MC gap:
        <input
          data-testid="gap"
          type="range"
          min={0}
          max={POLLUTION_MAX_GAP}
          value={gap}
          onChange={(e) => onGap(Number(e.target.value))}
          className="range range-primary range-sm"
        />
        <span className="text-xs">{gap} units</span>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Tax that equals the gap (Pigouvian):
        <input
          data-testid="tax"
          type="number"
          min={0}
          max={POLLUTION_MAX_GAP}
          value={tax}
          onChange={(e) => onTax(Number(e.target.value))}
          className="input input-sm input-bordered w-24"
        />
      </label>
      <div className="text-sm">
        Optimal output at this tax:{' '}
        <strong data-testid="optimal-output">{optimal}</strong>
        {confirmed && (
          <span className={accurate ? 'text-success' : 'text-error'}>
            {accurate
              ? ' — Pigouvian tax hit!'
              : ` — tax should equal the gap (${gap}) for efficiency`}
          </span>
        )}
      </div>
      <button
        data-testid="check"
        type="button"
        disabled={confirmed}
        onClick={onCheck}
        className="btn btn-primary btn-sm">
        Confirm equilibrium
      </button>
    </div>
  );
};

export const ResultsPanel: FC<{
  score: number;
  total: number;
  tax: number;
  gap: number;
}> = ({ score, total, tax, gap }) => {
  const accuracy = taxAccuracy(tax, gap);
  const optimal = choseOptimalTax(tax, gap);
  return (
    <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-6 text-center">
      <div className="text-4xl">🏁</div>
      <h2 className="text-lg font-bold">All done!</h2>
      <p data-testid="score" className="text-primary text-xl font-bold">
        {score} / {total}
      </p>
      <p className="text-sm">
        Tax accuracy:{' '}
        <strong>{optimal ? `${accuracy}% — optimal` : `${accuracy}%`}</strong>
      </p>
      <p data-testid="optimal-output" className="text-sm">
        Optimal output:{' '}
        <strong>
          {optimalOutput(tax, gap)}
          {optimal && ' — Pigouvian tax hit!'}
        </strong>
      </p>
      <p className="text-base-content/60 text-xs">
        Your Pigouvian tax of {tax} vs. the gap of {gap}.
      </p>
    </div>
  );
};
