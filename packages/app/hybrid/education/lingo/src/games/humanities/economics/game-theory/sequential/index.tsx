import { FC, useCallback, useReducer } from 'react';
import { TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { PlayerAction, RoundResult } from './types';
import { GameTree, RollbackAnnotation } from './components';

const formatPayoff = (n: number): string => (n >= 0 ? `+${n}` : `${n}`);

const ChoosePhase: FC<{
  onChoose: (c: PlayerAction) => void;
  selected: PlayerAction | null;
  onReveal: () => void;
}> = ({ onChoose, selected, onReveal }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-lg">You are the Entrant.</div>
    <p className="text-base-content/60 text-center text-xs">
      Choose Enter or Out to begin this round.
    </p>
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChoose('enter')}
        data-testid="choose-enter"
        className={`btn btn-sm ${selected === 'enter' ? 'btn-primary' : ''}`}>
        Enter
      </button>
      <button
        type="button"
        onClick={() => onChoose('out')}
        data-testid="choose-out"
        className={`btn btn-sm ${selected === 'out' ? 'btn-primary' : ''}`}>
        Out
      </button>
    </div>
    {selected && (
      <button
        type="button"
        onClick={onReveal}
        data-testid="reveal"
        className="btn btn-primary btn-sm">
        Reveal
      </button>
    )}
  </div>
);

const RevealPhase: FC<{
  playerAction: string;
  incumbentAction: string | null;
  playerPayoff: number;
  spneMatch: boolean;
  onNext: () => void;
  round: number;
}> = ({
  playerAction,
  incumbentAction,
  playerPayoff,
  spneMatch,
  onNext,
  round,
}) => (
  <div className="flex flex-col gap-3 py-4" data-testid="reveal-phase">
    <div className="flex flex-col items-center gap-2">
      <div className="text-2xl">{spneMatch ? '✅' : '⚠️'}</div>
      <div className="text-lg font-bold">
        {spneMatch ? 'Subgame-perfect move!' : 'Not the SPNE choice'}
      </div>
      <div className="text-sm">
        Your payoff: <strong>{formatPayoff(playerPayoff)}</strong>
      </div>
    </div>
    <GameTree
      chosenPath={[playerAction, ...(incumbentAction ? [incumbentAction] : [])]}
      showAnnotations={playerAction === 'enter'}
    />
    <RollbackAnnotation
      playerAction={playerAction}
      incumbentAction={incumbentAction}
    />
    <button
      type="button"
      onClick={onNext}
      data-testid="next-round"
      className="btn btn-primary btn-sm self-center">
      {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

const SummaryRow: FC<{ result: RoundResult }> = ({ result }) => (
  <tr>
    <td className="py-1 text-center">{result.round}</td>
    <td className="py-1 text-center capitalize">{result.playerAction}</td>
    <td className="py-1 text-center capitalize">
      {result.incumbentAction ?? '—'}
    </td>
    <td className="py-1 text-center">{formatPayoff(result.playerPayoff)}</td>
    <td className="py-1 text-center">{result.spneMatch ? '✅' : '❌'}</td>
  </tr>
);

const DonePhase: FC<{
  results: RoundResult[];
  totalScore: number;
  onReset: () => void;
}> = ({ results, totalScore, onReset }) => (
  <div
    className="flex flex-col items-center gap-3 py-4"
    data-testid="done-phase">
    <div className="text-2xl">📊</div>
    <div className="text-lg font-bold">Game Complete</div>
    <table className="border-base-300 w-full max-w-md border text-sm">
      <thead>
        <tr className="border-base-300 border-b">
          <th className="py-1">Rd</th>
          <th className="py-1">You</th>
          <th className="py-1">AI</th>
          <th className="py-1">Payoff</th>
          <th className="py-1">SPNE</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => (
          <SummaryRow key={r.round} result={r} />
        ))}
      </tbody>
    </table>
    <div className="text-sm">
      Total score: <strong>{formatPayoff(totalScore)}</strong>
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

export const BackwardInductionGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    round,
    playerAction,
    incumbentAction,
    playerPayoff,
    spneMatch,
    results,
    totalScore,
  } = state;

  const choose = useCallback(
    (choice: PlayerAction) => dispatch({ type: 'PLAY_ENTRY', choice }),
    []
  );
  const reveal = useCallback(() => dispatch({ type: 'REVEAL' }), []);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Score so far: <strong>{formatPayoff(state.totalScore)}</strong>
        </span>
      </div>
      {phase === 'choose' && (
        <ChoosePhase
          onChoose={choose}
          selected={playerAction}
          onReveal={reveal}
        />
      )}
      {phase === 'reveal' && playerAction && (
        <RevealPhase
          playerAction={playerAction}
          incumbentAction={incumbentAction}
          playerPayoff={playerPayoff}
          spneMatch={spneMatch}
          onNext={nextRound}
          round={round}
        />
      )}
      {phase === 'done' && (
        <DonePhase results={results} totalScore={totalScore} onReset={reset} />
      )}
    </div>
  );
};
BackwardInductionGame.displayName = 'BackwardInductionGame';
