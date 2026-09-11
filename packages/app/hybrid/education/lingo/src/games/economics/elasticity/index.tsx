import { FC, useCallback, useReducer, useState } from 'react';
import {
  PriceRangeHint,
  RoundBest,
  SummaryTable,
  TrialTable,
} from './components';
import {
  BASE_PRICE,
  MAX_PRICE,
  MIN_PRICE,
  RULE,
  TOTAL_ROUNDS,
} from './constants';
import { createInitialState, gameReducer } from './reducer';

export const RevenueExplorerGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [price, setPrice] = useState<string>('');
  const { phase, round, epsilon, trials, rounds, bestPrice, bestRevenue } =
    state;

  const submit = useCallback(() => {
    const value = Math.round(Number(price));
    if (!Number.isFinite(value) || value < MIN_PRICE || value > MAX_PRICE)
      return;
    dispatch({ type: 'SUBMIT_PRICE', price: value });
    setPrice('');
  }, [price]);

  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setPrice('');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="card bg-base-200 text-base-content/80 rounded-lg p-3 text-sm">
        {RULE}
      </div>

      {phase === 'choose' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <div className="flex items-center justify-between text-sm">
            <span>
              Round <strong>{round}</strong> / {TOTAL_ROUNDS}
            </span>
            <span data-testid="epsilon">
              Elasticity ε = <strong>{epsilon}</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min={MIN_PRICE}
              max={MAX_PRICE}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              data-testid="price-input"
              placeholder={`Price (${MIN_PRICE}–${MAX_PRICE})`}
              className="input input-sm input-bordered w-36"
            />
            <button
              type="button"
              onClick={submit}
              data-testid="submit-price"
              className="btn btn-primary btn-sm">
              Set Price
            </button>
          </div>
          <PriceRangeHint />

          {trials.length > 0 && (
            <>
              <RoundBest
                bestPrice={bestPrice}
                bestRevenue={bestRevenue}
                epsilon={epsilon}
              />
              <TrialTable trials={trials} />
            </>
          )}

          <p className="text-base-content/60 text-xs">
            Base demand: at price {BASE_PRICE}, quantity is 10, revenue is 100.
          </p>

          {trials.length > 0 && (
            <button
              type="button"
              onClick={nextRound}
              data-testid="next-round"
              className="btn btn-primary btn-sm">
              {round >= TOTAL_ROUNDS ? 'See Summary' : 'Next Round'}
            </button>
          )}
        </div>
      )}

      {phase === 'reveal' && (
        <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
          <div className="text-lg font-bold">Across-round summary</div>
          <SummaryTable rounds={rounds} />
          <p className="text-base-content/80 text-sm">
            In elastic rounds your best price was the lowest you tried; in
            inelastic rounds it was the highest you tried. Revenue peaks where
            elasticity equals one in magnitude.
          </p>
          <button
            type="button"
            onClick={reset}
            data-testid="play-again"
            className="btn btn-primary btn-sm self-start">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
RevenueExplorerGame.displayName = 'RevenueExplorerGame';
