import { FC } from 'react';
import type {
  Classification,
  Hint,
  InvestigationAction,
  Scenario,
  ScenarioResult,
} from './types';
import { CLASSIFICATION_LABELS } from './constants';

export interface ActionMeta {
  id: InvestigationAction;
  label: string;
  emoji: string;
  description: string;
}

export const INVESTIGATION_ACTIONS: ActionMeta[] = [
  {
    id: 'randomized-trial',
    label: 'Run a randomized trial',
    emoji: '🧪',
    description: 'Randomly assign treatment to average away confounders.',
  },
  {
    id: 'control-confounders',
    label: 'Control for confounders',
    emoji: '🔍',
    description: 'Hold the suspected confounder fixed in the comparison.',
  },
  {
    id: 'more-data',
    label: 'Collect more data',
    emoji: '📈',
    description: 'Expand the sample to check whether the pattern holds.',
  },
];

export const ScenarioCard: FC<{
  scenario: Scenario;
  round: number;
}> = ({ scenario, round }) => (
  <div
    className="card border-base-content/10 flex flex-col gap-2 border p-4"
    data-testid="scenario">
    <span className="text-sm">
      Scenario <strong>{round}</strong>
    </span>
    <h2 className="text-lg font-bold">{scenario.title}</h2>
    <p className="text-base-content/80 text-sm">{scenario.correlation}</p>
    <p className="text-base-content/60 text-xs">
      Is the correlation actually causal? Spend investigation points, then
      classify the relationship.
    </p>
  </div>
);

export const BudgetPanel: FC<{
  budget: number;
  spent: number;
  onInvestigate: (action: InvestigationAction) => void;
}> = ({ budget, spent, onInvestigate }) => {
  const left = Math.max(0, budget - spent);
  return (
    <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
      <div className="flex items-center justify-between text-sm">
        <span>Investigation budget</span>
        <span
          className="badge badge-primary"
          data-testid="investigation-balance">
          {left} / {budget} points left
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {INVESTIGATION_ACTIONS.map((a) => (
          <button
            key={a.id}
            type="button"
            disabled={left <= 0}
            onClick={() => onInvestigate(a.id)}
            data-testid={`investigate-${a.id}`}
            className="btn btn-outline btn-sm">
            {a.emoji} {a.label} · 1 pt
          </button>
        ))}
      </div>
      <p className="text-base-content/60 text-xs">
        {INVESTIGATION_ACTIONS[0].description} Unused points boost your score.
      </p>
    </div>
  );
};

export const HintsPanel: FC<{ hints: Hint[] }> = ({ hints }) => {
  if (hints.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      {hints.map((hint, index) => (
        <div
          key={`${hint.action}-${index}`}
          className="alert alert-info justify-start text-sm">
          <span>
            {INVESTIGATION_ACTIONS.find((a) => a.id === hint.action)?.emoji}
          </span>
          <span>{hint.text}</span>
        </div>
      ))}
    </div>
  );
};

export const AnswerOptions: FC<{
  choices: Classification[];
  onSubmit: (choice: Classification) => void;
}> = ({ choices, onSubmit }) => (
  <div className="grid gap-2 sm:grid-cols-2">
    {choices.map((choice) => (
      <button
        key={choice}
        type="button"
        onClick={() => onSubmit(choice)}
        data-testid={`option-${choice}`}
        className="btn btn-outline btn-sm justify-start">
        {CLASSIFICATION_LABELS[choice]}
      </button>
    ))}
  </div>
);

export const RevealPanel: FC<{
  scenario: Scenario;
  correct: boolean;
  last: boolean;
  answer: Classification;
  onNext: () => void;
}> = ({ scenario, correct, last, answer, onNext }) => (
  <div
    className="card border-base-content/10 flex flex-col gap-3 border p-4"
    data-testid="answer">
    <div className="text-lg">{correct ? '✅ Correct!' : '❌ Not quite'}</div>
    <p className="text-sm">
      You said <strong>{CLASSIFICATION_LABELS[answer]}</strong>; the answer is{' '}
      <strong>{CLASSIFICATION_LABELS[scenario.correct]}</strong>.
    </p>
    <p className="border-base-300 text-base-content/70 rounded-lg border p-3 text-sm">
      {scenario.explanation}
    </p>
    <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
      {last ? 'See Results' : 'Next Scenario'}
    </button>
  </div>
);

export const ResultsPanel: FC<{
  total: number;
  max: number;
  results: ScenarioResult[];
  onReset: () => void;
}> = ({ total, max, results, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">📊</div>
    <div className="text-lg">Investigation report</div>
    <div className="flex gap-6 text-sm">
      <span>
        Total score: <strong data-testid="score">{total}</strong> / {max}
      </span>
      <span>
        Correct:{' '}
        <strong>
          {results.filter((r) => r.correct).length} / {results.length}
        </strong>
      </span>
    </div>
    <button
      type="button"
      onClick={onReset}
      data-testid="reset"
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);
