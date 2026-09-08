import { FC, useCallback, useReducer, useState } from 'react';
import { SummaryPanel, TrialTable } from './components';
import {
  MAX_PRICE,
  MAX_TRIALS,
  MIN_FINISH_TRIALS,
  MIN_PRICE,
  QUICK_PRICES,
} from './constants';
import { createInitialState, gameReducer } from './reducer';

const formatCurrency = (n: number): string => `$${n.toLocaleString('en-US')}`;

const formatSigned = (n: number): string =>
  n >= 0 ? `+${formatCurrency(n)}` : `-${formatCurrency(Math.abs(n))}`;

export const LemonsGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [price, setPrice] = useState<string>('');
  const { phase, trials, best } = state;

  const submitPrice = useCallback(() => {
    const value = Number(price);
    if (!Number.isFinite(value) || value < MIN_PRICE || value > MAX_PRICE)
      return;
    dispatch({ type: 'SUBMIT_PRICE', price: Math.round(value) });
  }, [price]);
  const finish = useCallback(() => dispatch({ type: 'FINISH' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setPrice('');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Trial <strong>{Math.min(trials.length + 1, MAX_TRIALS)}</strong> of{' '}
          {MAX_TRIALS}
        </span>
        {best && (
          <span>
            Best so far: <strong>{formatCurrency(best.price)}</strong> (
            {formatSigned(best.expectedProfit)})
          </span>
        )}
      </div>

      {phase === 'playing' && (
        <>
          <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
            <p className="text-sm">
              Post one price for a used car. Each seller sells only if your
              price meets their reservation; you can&rsquo;t tell good cars from
              lemons.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {QUICK_PRICES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPrice(String(value))}
                  data-testid={`quick-price-${value}`}
                  className="btn btn-sm">
                  {formatCurrency(value)}
                </button>
              ))}
              <input
                type="number"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                data-testid="price-input"
                placeholder="Custom price"
                className="input input-sm input-bordered w-28"
              />
              <button
                type="button"
                onClick={submitPrice}
                data-testid="submit-price"
                className="btn btn-primary btn-sm">
                Post Price
              </button>
            </div>
          </div>

          {trials.length > 0 && <TrialTable trials={trials} />}

          {trials.length >= MIN_FINISH_TRIALS && (
            <button
              type="button"
              onClick={finish}
              data-testid="finish"
              className="btn btn-secondary btn-sm self-center">
              Finish
            </button>
          )}
        </>
      )}

      {phase === 'done' && <SummaryPanel trials={trials} onReset={reset} />}
    </div>
  );
};

LemonsGame.displayName = 'LemonsGame';
