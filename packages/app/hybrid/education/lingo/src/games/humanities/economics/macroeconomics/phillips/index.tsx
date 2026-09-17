import { FC, useCallback, useReducer } from 'react';
import { TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { Policy } from './types';
import {
  PolicySelector,
  PhillipsChart,
  AnchorSlider,
  RevealPanel,
  SummaryPanel,
} from './components';

export const PhillipsGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);

  const selectPolicy = useCallback(
    (policy: Policy) => dispatch({ type: 'SELECT_POLICY', policy }),
    []
  );
  const check = useCallback(() => dispatch({ type: 'CHECK' }), []);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const setAnchor = useCallback(
    (anchor: number) => dispatch({ type: 'SET_ANCHOR', anchor }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const {
    phase,
    round,
    startInflation,
    startUnemployment,
    naturalRate,
    expectationsInflation,
    policy,
    anchor,
    newInflation,
    newUnemployment,
    sacrifice,
    totalScore,
    history,
  } = state;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Score: <strong>{totalScore.toFixed(1)}</strong> / {round * 10 - 10}
        </span>
      </div>

      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-base-content/60">Inflation (π)</span>
            <span
              className="text-primary text-lg font-bold"
              data-testid="inflation">
              {startInflation.toFixed(2)}%
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base-content/60">Unemployment (u)</span>
            <span
              className="text-primary text-lg font-bold"
              data-testid="unemployment">
              {startUnemployment.toFixed(2)}%
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base-content/60">Natural Rate (u*)</span>
            <span className="text-lg font-bold" data-testid="natural-rate">
              {naturalRate}%
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-base-content/60">Expectations (π_e)</span>
            <span className="text-lg font-bold" data-testid="exp-inflation">
              {expectationsInflation.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <PhillipsChart
            currentInflation={startInflation}
            currentUnemployment={startUnemployment}
            anchor={anchor}
          />
        </div>
      </div>

      {phase === 'pick' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">Choose a monetary policy:</p>
          <PolicySelector policy={policy} onSelect={selectPolicy} />
          <AnchorSlider anchor={anchor} onChange={setAnchor} />
          <button
            type="button"
            data-testid="check"
            onClick={check}
            disabled={!policy}
            className="btn btn-primary btn-sm disabled:opacity-50">
            Check Result
          </button>
        </div>
      )}

      {phase === 'reveal' &&
        newInflation !== null &&
        newUnemployment !== null && (
          <RevealPanel
            result={history[history.length - 1]}
            totalScore={totalScore}
            isLast={round >= TOTAL_ROUNDS}
            onNext={nextRound}
          />
        )}

      {phase === 'done' && (
        <SummaryPanel
          history={history}
          totalScore={totalScore}
          sacrifice={sacrifice}
          onReset={reset}
        />
      )}
    </div>
  );
};
PhillipsGame.displayName = 'PhillipsGame';
