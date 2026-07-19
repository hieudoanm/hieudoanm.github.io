import { FC, useCallback, useReducer } from 'react';
import { CHALLENGES, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import { SandboxPanel, ChallengePanel, ResultsPanel } from './components';

export const OpportunityCostGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, round, score, challengeIndex, selected, sandbox } = state;

  const updateSandbox = useCallback(
    (params: Partial<typeof sandbox>) =>
      dispatch({ type: 'UPDATE_SANDBOX', params }),
    []
  );
  const startChallenges = useCallback(
    () => dispatch({ type: 'START_CHALLENGES' }),
    []
  );
  const pick = useCallback(
    (answer: 'A' | 'B') => dispatch({ type: 'PICK', answer }),
    []
  );
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <Header round={round} phase={phase} score={score} />

      {phase === 'sandbox' && (
        <SandboxPanel
          sandbox={sandbox}
          onUpdate={updateSandbox}
          onStart={startChallenges}
        />
      )}

      {phase === 'challenge' && (
        <ChallengePanel
          round={round}
          challenge={CHALLENGES[challengeIndex]}
          selected={selected}
          onPick={pick}
          onNext={nextRound}
        />
      )}

      {phase === 'done' && (
        <ResultsPanel score={score} total={TOTAL_ROUNDS} onReset={reset} />
      )}
    </div>
  );
};
OpportunityCostGame.displayName = 'OpportunityCostGame';

interface HeaderProps {
  round: number;
  phase: string;
  score: number;
}

const Header: FC<HeaderProps> = ({ round, phase, score }) => (
  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
    <span>
      {phase === 'sandbox' ? 'Sandbox' : `Round ${round} / ${TOTAL_ROUNDS}`}
    </span>
    {phase !== 'sandbox' && (
      <span>
        Score: <strong data-testid="score">{score}</strong>
      </span>
    )}
  </div>
);
