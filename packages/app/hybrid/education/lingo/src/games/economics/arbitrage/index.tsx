import { FC, useCallback, useReducer, useState } from 'react';
import {
  DoneCard,
  RateTable,
  ResultCard,
  formatProfit,
  formatUsd,
} from './components';
import { PATHS, QUOTES, START_USD, TOTAL_ROUNDS } from './constants';
import { consistencyRatio } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { TrianglePathId } from './types';

const PATH_ORDER: TrianglePathId[] = [
  'usd_eur_jpy_usd',
  'usd_jpy_eur_usd',
  'direct',
];

export const TriangularArbitrageGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [budgetInput, setBudgetInput] = useState<string>(String(START_USD));
  const { phase, round, rates, pathId, result, results, totalProfit } = state;

  const pickPath = useCallback(
    (next: TrianglePathId) => dispatch({ type: 'PICK_PATH', pathId: next }),
    []
  );
  const execute = useCallback(() => {
    const budget = Number(budgetInput);
    if (!Number.isFinite(budget) || budget <= 0) return;
    dispatch({ type: 'EXECUTE', budget });
  }, [budgetInput]);
  const next = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setBudgetInput(String(START_USD));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Triangle <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Running profit: <strong>{formatProfit(totalProfit)}</strong>
        </span>
      </div>

      {phase === 'choose' && (
        <div className="flex flex-col gap-4">
          <RateTable rates={rates} ratio={consistencyRatio(rates)} />
          <div>
            <p className="text-base-content/60 mb-2 text-sm">
              Pick a triangle and a trade direction:
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {PATH_ORDER.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => pickPath(id)}
                  data-testid={`path-${id}`}
                  className={`card border p-3 text-left transition-colors ${
                    pathId === id ? 'border-primary' : 'border-base-content/10'
                  }`}>
                  <span className="text-lg">{PATHS[id].label}</span>
                  <span className="text-base-content/60 block text-xs">
                    {PATHS[id].routes}
                  </span>
                  <span className="text-base-content/60 mt-1 block text-xs">
                    {PATHS[id].description}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="card border-base-content/10 flex flex-wrap items-center gap-2 border p-4">
            <label htmlFor="budget" className="text-sm">
              Budget (USD)
            </label>
            <input
              id="budget"
              type="number"
              min={1}
              step={100}
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              data-testid="budget"
              className="input input-bordered input-sm w-32"
            />
            {[500, START_USD, 2000].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setBudgetInput(String(v))}
                data-testid={`quick-budget-${v}`}
                className="btn btn-sm">
                {formatUsd(v)}
              </button>
            ))}
            <button
              type="button"
              onClick={execute}
              data-testid="execute"
              className="btn btn-primary btn-sm">
              Execute
            </button>
          </div>
        </div>
      )}

      {phase === 'reveal' && result && (
        <ResultCard
          result={result}
          isLast={round >= TOTAL_ROUNDS}
          onNext={next}
        />
      )}

      {phase === 'done' && (
        <DoneCard results={results} totalProfit={totalProfit} onReset={reset} />
      )}
    </div>
  );
};
TriangularArbitrageGame.displayName = 'TriangularArbitrageGame';
