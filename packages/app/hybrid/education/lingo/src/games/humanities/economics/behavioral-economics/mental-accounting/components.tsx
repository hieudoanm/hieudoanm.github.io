import type { FC } from 'react';
import { SCENARIOS } from './constants';
import { scoreFor } from './game';
import type { ChoiceId, Scenario } from './types';

export const ScoreBadge: FC<{ answers: ChoiceId[] }> = ({ answers }) => (
  <span className="badge badge-outline">
    Rational picks:
    <strong data-testid="score">
      {scoreFor(answers)} / {SCENARIOS.length}
    </strong>
  </span>
);

const RationalReveal: FC<{ scenario: Scenario }> = ({ scenario }) => {
  const rationalText =
    scenario.rational === 'a' ? scenario.choiceA : scenario.choiceB;
  return (
    <div className="bg-base-200/60 border-base-content/10 rounded-lg border p-4">
      <p className="text-sm font-semibold" data-testid="rational">
        Rational choice · {scenario.concept}: {rationalText}
      </p>
      <p
        className="text-base-content/70 mt-1 text-xs leading-relaxed"
        data-testid="explanation">
        {scenario.explanation}
      </p>
    </div>
  );
};

const OptionButton: FC<{
  id: ChoiceId;
  text: string;
  disabled: boolean;
  selected: boolean;
  onPick: (choice: ChoiceId) => void;
}> = ({ id, text, disabled, selected, onPick }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={() => onPick(id)}
    data-testid={id === 'a' ? 'choice-a' : 'choice-b'}
    className={`card border p-4 text-left text-sm transition-colors ${
      selected
        ? 'border-primary bg-primary/10'
        : 'border-base-content/10 hover:border-primary/50'
    }`}>
    <span className="badge badge-outline badge-sm mr-2">
      Option {id.toUpperCase()}
    </span>
    {text}
  </button>
);

export const ScenarioPanel: FC<{
  scenario: Scenario;
  revealed: boolean;
  chosen: ChoiceId | null;
  isLast: boolean;
  onPick: (choice: ChoiceId) => void;
  onNext: () => void;
}> = ({ scenario, revealed, chosen, isLast, onPick, onNext }) => (
  <div className="card border-base-content/10 flex flex-col gap-4 border p-5">
    <div>
      <h2 className="text-lg font-semibold">{scenario.title}</h2>
      <p
        className="text-base-content/70 mt-1 text-sm leading-relaxed"
        data-testid="scenario">
        {scenario.vignette}
      </p>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <OptionButton
        id="a"
        text={scenario.choiceA}
        disabled={revealed}
        selected={revealed && chosen === 'a'}
        onPick={onPick}
      />
      <OptionButton
        id="b"
        text={scenario.choiceB}
        disabled={revealed}
        selected={revealed && chosen === 'b'}
        onPick={onPick}
      />
    </div>
    {revealed && <RationalReveal scenario={scenario} />}
    {revealed && (
      <button
        type="button"
        onClick={onNext}
        data-testid="next"
        className="btn btn-primary btn-sm self-end">
        {isLast ? 'Framer Round' : 'Next Scenario'}
      </button>
    )}
  </div>
);
