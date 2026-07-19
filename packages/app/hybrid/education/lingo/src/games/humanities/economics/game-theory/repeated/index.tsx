import { FC, useCallback, useEffect, useReducer, useRef } from 'react';
import { STRATEGIES, TOTAL_ROUNDS } from './constants';
import { lessonFor, mutualCooperations, playerDefections } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { Action, StrategyId } from './types';

export const RepeatedDilemmaGame: FC = () => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { phase, round, opponent, history, totalScore, lastRound } = state;
  const selected = STRATEGIES.find((s) => s.id === opponent);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const selectOpponent = useCallback((strategyId: StrategyId) => {
    dispatch({ type: 'SELECT_OPPONENT', strategyId });
  }, []);
  const submit = useCallback((action: Action) => {
    dispatch({ type: 'SUBMIT_ACTION', action });
  }, []);
  const nextRound = useCallback(() => {
    dispatch({ type: 'NEXT_ROUND' });
    if (round < TOTAL_ROUNDS) containerRef.current?.focus();
  }, [round]);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    containerRef.current?.focus();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'c' && phase === 'play') submit('C');
      if (e.key === 'd' && phase === 'play') submit('D');
      if (e.key === 'Enter' && phase === 'reveal') nextRound();
      if (e.key === 'r') reset();
    },
    [phase, submit, nextRound, reset]
  );

  return (
    <div
      ref={containerRef}
      data-testid="game-container"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-4 outline-none">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          {selected ? `${selected.emoji} ${selected.name}` : 'Pick an opponent'}
        </span>
        <span>
          Score: <strong>{totalScore}</strong>
        </span>
      </div>

      {phase === 'select' && (
        <div>
          <p className="mb-2 text-sm">Choose an opponent:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {STRATEGIES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => selectOpponent(s.id)}
                data-testid={`opponent-${s.id}`}
                className="card border-base-content/10 border p-3 text-left">
                <span className="text-lg">
                  {s.emoji} {s.name}
                </span>
                <span className="text-base-content/60 block text-xs">
                  {s.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'play' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">Round {round}: cooperate or defect?</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => submit('C')}
              data-testid="action-c"
              className="btn btn-success btn-sm flex-1">
              Cooperate (C)
            </button>
            <button
              type="button"
              onClick={() => submit('D')}
              data-testid="action-d"
              className="btn btn-error btn-sm flex-1">
              Defect (D)
            </button>
          </div>
        </div>
      )}

      {phase === 'reveal' && lastRound && (
        <div
          data-testid="reveal"
          className="card border-base-content/10 flex flex-col gap-3 border p-4 text-sm">
          <div className="flex flex-wrap gap-4">
            <span>
              You: <strong>{lastRound.playerAction}</strong>
            </span>
            <span>
              {selected?.emoji} Opponent:{' '}
              <strong data-testid="reveal-opponent">
                {lastRound.opponentAction}
              </strong>
            </span>
            <span>
              Payoff: <strong>+{lastRound.payoff}</strong>
            </span>
            <span>
              Cumulative: <strong>{lastRound.cumulative}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={nextRound}
            data-testid="next-round"
            className="btn btn-primary btn-sm">
            {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
          </button>
        </div>
      )}

      {phase === 'done' && opponent && (
        <div
          data-testid="summary"
          className="card border-base-content/10 flex flex-col items-center gap-3 border p-4 text-sm">
          <div className="text-3xl">🏁</div>
          <div className="text-lg">Tournament over</div>
          <div className="flex flex-wrap justify-center gap-6">
            <span>
              Total score: <strong>{totalScore}</strong>
            </span>
            <span>
              Mutual cooperation:{' '}
              <strong>
                {mutualCooperations(history)} / {TOTAL_ROUNDS}
              </strong>
            </span>
            <span>
              Your defections: <strong>{playerDefections(history)}</strong>
            </span>
          </div>
          <p className="text-base-content/70 max-w-md text-center text-xs">
            {lessonFor(opponent)}
          </p>
          <button
            type="button"
            onClick={reset}
            data-testid="play-again"
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="border-base-200 border-t pt-2">
          <p className="mb-1 text-xs opacity-60">History</p>
          <div className="flex flex-col gap-1 text-xs">
            {history.map((r) => (
              <div
                key={r.round}
                data-testid={`round-${r.round}`}
                className="border-base-200 flex flex-wrap justify-between gap-2 border-b py-1 last:border-0">
                <span>Round {r.round}</span>
                <span>You {r.playerAction}</span>
                <span>
                  {selected?.emoji} {r.opponentAction}
                </span>
                <span>+{r.payoff}</span>
                <span>Total {r.cumulative}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-xs opacity-40">
        C cooperate · D defect · Enter continue · R reset
      </p>
    </div>
  );
};
RepeatedDilemmaGame.displayName = 'RepeatedDilemmaGame';
