import { useCallback, useReducer, useState } from 'react';
import type { FC } from 'react';
import { MAX_Q, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { RoundResult } from './types';

const NASH_TOTAL = 400 * TOTAL_ROUNDS;

const formatCurrency = (n: number): string => `$${n.toLocaleString('en-US')}`;

const naiveCount = (rounds: RoundResult[]): number =>
  rounds.filter((r) => r.qA === r.qB).length;

const RevealPanel: FC<{
  round: number;
  result: RoundResult;
  onNext: () => void;
}> = ({ round, result, onNext }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-3xl">🤖</div>
    <div className="text-lg">Firm B produced {result.qB} units</div>
    <div className="flex flex-col gap-1 text-center text-sm">
      <span>
        Market price: <strong>{formatCurrency(result.price)}</strong>
      </span>
      <span className="text-success">
        Your profit: <strong>{formatCurrency(result.profitA)}</strong>
      </span>
      <span>
        AI profit: <strong>{formatCurrency(result.profitB)}</strong>
      </span>
    </div>
    <div className="border-base-300 max-w-sm rounded-lg border p-3 text-center text-xs">
      The Cournot-Nash equilibrium is qA = qB = 30 (total 60); colluding at 22.5
      each earns more total profit but invites cheating.
    </div>
    <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
      {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

export const CournotGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [qInput, setQInput] = useState<string>('15');
  const { phase, round, result, results, totalProfitA, totalProfitB } = state;

  const submitQ = useCallback(() => {
    const value = Number(qInput);
    if (!Number.isFinite(value) || value < 0) return;
    dispatch({ type: 'SUBMIT_Q', qA: Math.min(MAX_Q, value) });
  }, [qInput]);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setQInput('15');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span data-testid="round-counter">
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Your profit so far: <strong>{formatCurrency(totalProfitA)}</strong>
        </span>
      </div>

      {phase === 'choose' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            Choose your output qA.{' '}
            <strong className="text-primary">{qInput}</strong> units
          </p>
          <p className="text-base-content/60 text-xs">
            You and Firm B choose output for a market where P = 100 − qA − qB.
            Firm B best-responds to your choice.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="range"
              min={0}
              max={MAX_Q}
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              data-testid="q-slider"
              className="range range-primary range-sm flex-1"
            />
            <input
              type="number"
              min={0}
              max={MAX_Q}
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              data-testid="q-input"
              className="input input-bordered input-sm w-20"
            />
            <button
              type="button"
              onClick={submitQ}
              data-testid="submit-q"
              className="btn btn-primary btn-sm">
              Produce
            </button>
          </div>
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel round={round} result={result} onNext={nextRound} />
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-4xl">📊</div>
          <div className="text-lg">Cournot results</div>
          <div className="flex gap-6 text-sm">
            <span>
              Your total profit: <strong>{formatCurrency(totalProfitA)}</strong>
            </span>
            <span>
              AI total profit: <strong>{formatCurrency(totalProfitB)}</strong>
            </span>
            <span>
              Nash benchmark: <strong>{formatCurrency(NASH_TOTAL)}</strong>
            </span>
          </div>
          <div className="flex gap-4 text-xs">
            <span>
              Matching at equilibrium: <strong>{naiveCount(results)}</strong> /{' '}
              {TOTAL_ROUNDS}
            </span>
            <span>
              Your average output:{' '}
              <strong>
                {Math.round(
                  (results.reduce((s, r) => s + r.qA, 0) || 0) / results.length
                )}
              </strong>
            </span>
          </div>
          <p className="text-base-content/60 max-w-sm text-center text-xs">
            {totalProfitA >= totalProfitB
              ? 'You out-earned the AI when output stayed near the Nash level.'
              : 'Firm B out-earned you — output near the Nash equilibrium is not always most profitable per pick.'}
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
CournotGame.displayName = 'CournotGame';
