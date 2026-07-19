import type { FC } from 'react';
import { RoundHeader } from './components';
import { ChoosePanel, RevealPanel } from './panels';
import { ResultsTable } from './results';
import type { Phase, RoundResult } from './types';

export const ChallengeScreen: FC<{
  phase: Phase;
  round: number;
  target: number;
  gap: number;
  totalScore: number;
  mpc: number;
  a: number;
  investment: number;
  government: number;
  required: number;
  deltaG: number;
  result: RoundResult | null;
  results: RoundResult[];
  isLast: boolean;
  onChangeDeltaG: (value: number) => void;
  onCheck: () => void;
  onNext: () => void;
  onReset: () => void;
}> = ({
  phase,
  round,
  target,
  gap,
  totalScore,
  mpc,
  a,
  investment,
  government,
  required,
  deltaG,
  result,
  results,
  isLast,
  onChangeDeltaG,
  onCheck,
  onNext,
  onReset,
}) => (
  <div className="flex flex-col gap-4">
    {phase !== 'done' && (
      <RoundHeader
        round={round}
        target={target}
        gap={gap}
        totalScore={totalScore}
        onReset={onReset}
      />
    )}
    {phase === 'choose' && (
      <ChoosePanel
        mpc={mpc}
        a={a}
        investment={investment}
        government={government}
        gap={gap}
        required={required}
        deltaG={deltaG}
        onChangeDeltaG={onChangeDeltaG}
        onCheck={onCheck}
      />
    )}
    {phase === 'reveal' && result && (
      <RevealPanel result={result} isLast={isLast} onNext={onNext} />
    )}
    {phase === 'done' && (
      <ResultsTable
        results={results}
        totalScore={totalScore}
        onReset={onReset}
      />
    )}
  </div>
);
