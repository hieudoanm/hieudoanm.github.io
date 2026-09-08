import { FC } from 'react';
import { CheckButton, NextButton } from './components';
import type { ParadoxOption, ParadoxResult } from './types';

export const ParadoxPlan: FC<{
  options: ParadoxOption[];
  supported: string | null;
  firstPair: [string, string] | null;
  onSupport: (optionId: string) => void;
  onPair: (pair: [string, string]) => void;
  onCheck: () => void;
}> = ({ options, supported, firstPair, onSupport, onPair, onCheck }) => {
  const pairs: [string, string][] = [
    [options[0].id, options[1].id],
    [options[1].id, options[2].id],
    [options[0].id, options[2].id],
  ];
  const canCheck = supported !== null && firstPair !== null;
  const supportedName = options.find((o) => o.id === supported)?.name;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm">
        Three voters rank the three options, but majority preferences{' '}
        <strong>cycle</strong> — no option beats every other, so there is no
        Condorcet winner. Whoever controls the agenda (the order of pairwise
        votes) controls the outcome.
      </p>
      <div data-testid="agenda" className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs">Your faction (which option you back):</span>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onSupport(option.id)}
                data-testid={`support-${option.id}`}
                className={`btn btn-sm ${
                  supported === option.id ? 'btn-primary' : ''
                }`}>
                {option.emoji} {option.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs">
            First pair to vote on (the agenda):
            {supportedName ? ` backing ${supportedName}` : ''}
          </span>
          <div className="flex flex-wrap gap-2">
            {pairs.map(([a, b]) => (
              <button
                key={`${a}-${b}`}
                type="button"
                onClick={() => onPair([a, b])}
                data-testid={`pair-${a.toLowerCase()}-${b.toLowerCase()}`}
                className={`btn btn-sm ${
                  firstPair?.[0] === a && firstPair?.[1] === b
                    ? 'btn-secondary'
                    : ''
                }`}>
                {a} vs {b}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="text-base-content/60 text-xs">
        Pair the two options you do NOT back to hand the final vote to your
        faction.
      </p>
      <CheckButton disabled={!canCheck} onCheck={onCheck} />
    </div>
  );
};

export const ParadoxCheck: FC<{
  result: ParadoxResult;
  options: ParadoxOption[];
  nextLabel: string;
  onNext: () => void;
}> = ({ result, options, nextLabel, onNext }) => {
  const final = options.find((o) => o.id === result.finalWinner);
  const supported = options.find((o) => o.id === result.supported);
  const youWon = result.finalWinner === result.supported;
  const [a, b, c] = options.map((o) => o.name);
  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <div className="text-3xl">🌀</div>
      <div className="text-lg">Pairwise votes</div>
      <div data-testid="option-order" className="flex flex-col gap-1 text-sm">
        {result.steps.map((step, index) => (
          <span key={index}>
            {step.a} vs {step.b} — <strong>{step.winner}</strong> wins
          </span>
        ))}
      </div>
      <p data-testid="winner" className="text-sm">
        Final winner: {final?.emoji} <strong>{final?.name}</strong>
      </p>
      <p className={`text-sm ${youWon ? 'text-success' : 'text-error'}`}>
        {youWon
          ? 'Your faction prevailed — the agenda gave it the game.'
          : `${supported?.name} lost. Change the first pairing to flip the outcome.`}
      </p>
      <div className="text-base-content/60 text-xs">
        Voter 1: {a} › {b} › {c} · Voter 2: {b} › {c} › {a} · Voter 3: {c} › {a}{' '}
        › {b}
      </div>
      <NextButton label={nextLabel} onNext={onNext} />
    </div>
  );
};
