import { FC, useCallback, useReducer, useState } from 'react';
import { MAX_Q, MIN_Q, PRICE_SEQUENCE, TOTAL_ROUNDS } from './constants';
import { RevealCard, SummaryCard } from './components';
import { createInitialState, gameReducer } from './reducer';

const QUICK_QS = [0, 6, 11, 18, 30];

export const CompetitiveFirmGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [q, setQ] = useState<string>('');
  const { phase, round, price, result, results, totalProfit, optimalCount } =
    state;

  const submitQ = useCallback(() => {
    const value = Number(q);
    if (!Number.isInteger(value) || value < MIN_Q || value > MAX_Q) return;
    dispatch({ type: 'SUBMIT_Q', q: value });
  }, [q]);

  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setQ('');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Market price: <strong className="text-primary">${price}</strong>
        </span>
        <span>
          Total profit: <strong>${totalProfit}</strong>
        </span>
      </div>

      {phase === 'choose' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            Cost: TC(q) = 50 + 8q + q² (MC = 8 + 2q). You are a price taker.
            Choose output where P = MC to maximise profit.
          </p>
          <p className="text-base-content/60 text-xs">
            Shut down if P falls below min AVC = 8. In the long run, entry and
            exit push P toward min AC ≈ $22.1.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {QUICK_QS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setQ(String(v))}
                data-testid={`quick-q-${v}`}
                className="btn btn-sm">
                {v}
              </button>
            ))}
            <input
              type="number"
              min={MIN_Q}
              max={MAX_Q}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              data-testid="q-input"
              placeholder="Output q"
              className="input input-sm input-bordered w-28"
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
        <RevealCard result={result} onNext={nextRound} />
      )}

      {phase === 'done' && (
        <SummaryCard
          results={results}
          totalProfit={totalProfit}
          optimalCount={optimalCount}
          onReset={reset}
        />
      )}
    </div>
  );
};

CompetitiveFirmGame.displayName = 'CompetitiveFirmGame';
