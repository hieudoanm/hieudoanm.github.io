import { FC, useCallback, useReducer, useState } from 'react';
import { TOTAL_ROUNDS } from './constants';
import { ComparisonPanel, ResultPanel, SummaryPanel } from './components';
import { createInitialState, gameReducer } from './reducer';

const InputPanel: FC<{
  round: number;
  onSubmit: (q: number) => void;
}> = ({ round, onSubmit }) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    const q = Number(value);
    if (!Number.isFinite(q) || q < 1 || q > 90) {
      setError(true);
      return;
    }
    setError(false);
    onSubmit(Math.round(q));
  }, [value, onSubmit]);

  return (
    <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
      <p className="text-sm">
        Round <strong>{round}</strong> / {TOTAL_ROUNDS} — Pick your output
        quantity:
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {[20, 40, 60].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setValue(String(v));
              setError(false);
            }}
            data-testid={`quick-q-${v}`}
            className="btn btn-sm">
            {v}
          </button>
        ))}
        <input
          type="number"
          min={1}
          max={90}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          data-testid="q-input"
          placeholder="1–90"
          className="input input-sm input-bordered w-24"
        />
        <button
          type="button"
          onClick={handleSubmit}
          data-testid="submit-output"
          className="btn btn-primary btn-sm">
          Set Output
        </button>
      </div>
      {error && (
        <span className="text-error text-xs">
          Please enter an integer between 1 and 90.
        </span>
      )}
    </div>
  );
};

export const MonopolyGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, round, result, results, showComparison } = state;

  const submitOutput = useCallback(
    (q: number) => dispatch({ type: 'SUBMIT_OUTPUT', q }),
    []
  );
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const toggleComparison = useCallback(
    () => dispatch({ type: 'TOGGLE_COMPARISON' }),
    []
  );

  const bestRound =
    results.length > 0
      ? results.reduce((best, r) => (r.profit > best.profit ? r : best))
      : null;

  return (
    <div className="flex flex-col gap-4" data-testid="monopoly-game">
      {phase === 'choose' && (
        <InputPanel round={round} onSubmit={submitOutput} />
      )}

      {phase === 'reveal' && result && (
        <ResultPanel result={result} onNext={nextRound} round={round} />
      )}

      {phase === 'done' && (
        <div className="flex flex-col gap-4">
          <SummaryPanel
            bestRound={bestRound}
            totalRounds={results.length}
            showComparison={showComparison}
            onToggle={toggleComparison}
            onReset={reset}
          />
          {showComparison && <ComparisonPanel />}
        </div>
      )}
    </div>
  );
};
MonopolyGame.displayName = 'MonopolyGame';
