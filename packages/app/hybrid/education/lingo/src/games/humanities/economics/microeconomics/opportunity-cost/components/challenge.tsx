import type { FC } from 'react';
import type { ChallengeRound } from '../types';
import { formatCurrency } from './format';

interface ChallengePanelProps {
  round: number;
  challenge: ChallengeRound;
  selected: 'A' | 'B' | null;
  onPick: (answer: 'A' | 'B') => void;
  onNext: () => void;
}

export const ChallengePanel: FC<ChallengePanelProps> = ({
  round,
  challenge,
  selected,
  onPick,
  onNext,
}) => (
  <div className="flex flex-col gap-4">
    <p className="text-sm">{challenge.scenario}</p>
    <div className="grid gap-2 sm:grid-cols-2">
      <OptionCard
        testid="option-a"
        option={challenge.optionA}
        side="A"
        selected={selected}
        correct={challenge.correctAnswer}
        onPick={onPick}
      />
      <OptionCard
        testid="option-b"
        option={challenge.optionB}
        side="B"
        selected={selected}
        correct={challenge.correctAnswer}
        onPick={onPick}
      />
    </div>
    {selected && (
      <RevealBlock
        round={round}
        optionA={challenge.optionA}
        optionB={challenge.optionB}
        onNext={onNext}
      />
    )}
  </div>
);
ChallengePanel.displayName = 'ChallengePanel';

interface OptionCardProps {
  testid: string;
  option: { label: string; description: string; value: number; oc: number };
  side: 'A' | 'B';
  selected: 'A' | 'B' | null;
  correct: 'A' | 'B';
  onPick: (answer: 'A' | 'B') => void;
}

const OptionCard: FC<OptionCardProps> = ({
  testid,
  option,
  side,
  selected,
  correct,
  onPick,
}) => {
  const isCorrect = side === correct;
  const reveal = selected !== null;
  return (
    <button
      type="button"
      onClick={() => !selected && onPick(side)}
      data-testid={testid}
      className={`card border p-3 text-left transition-colors ${
        reveal
          ? isCorrect
            ? 'border-success bg-success/10'
            : 'border-error bg-error/10'
          : 'border-base-content/10 hover:border-primary'
      }`}>
      <div className="text-sm font-medium">
        {side}: {option.label}
      </div>
      <div className="text-base-content/60 text-xs">{option.description}</div>
      {reveal && (
        <div className="mt-2 flex flex-col gap-1 text-xs">
          <span>Value: {formatCurrency(option.value)}</span>
          <span data-testid={`net-benefit-${side.toLowerCase()}`}>
            OC: {formatCurrency(option.oc)} → Net:{' '}
            {formatCurrency(option.value - option.oc)}
          </span>
        </div>
      )}
    </button>
  );
};

interface RevealBlockProps {
  round: number;
  optionA: { oc: number };
  optionB: { oc: number };
  onNext: () => void;
}

const RevealBlock: FC<RevealBlockProps> = ({
  round,
  optionA,
  optionB,
  onNext,
}) => (
  <div className="flex flex-col gap-2 text-sm">
    <span data-testid="oc-a">
      Opportunity cost of A: <strong>{formatCurrency(optionA.oc)}</strong>
    </span>
    <span data-testid="oc-b">
      Opportunity cost of B: <strong>{formatCurrency(optionB.oc)}</strong>
    </span>
    <p className="text-base-content/60 text-xs">
      The rational choice is the one with the higher net value after subtracting
      its opportunity cost.
    </p>
    <button
      type="button"
      onClick={onNext}
      className="btn btn-primary btn-sm self-start"
      data-testid="next">
      {round >= 5 ? 'See Results' : 'Next Round'}
    </button>
  </div>
);
