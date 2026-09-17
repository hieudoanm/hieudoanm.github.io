import { FC, useCallback, useMemo, useReducer, useState } from 'react';
import { ROUNDS, TAX_MAX, TAX_MIN, TOTAL_ROUNDS } from './constants';
import { afterPolicy, gini, giniAfter, lorenzPoints } from './game';
import { createInitialState, gameReducer } from './reducer';
import { FinalPanel, LorenzChart, OutcomePanel } from './components';

const formatPct = (n: number): string => `${Math.round(n * 100)}%`;
const formatGini = (n: number): string => n.toFixed(3);

const RoundPlayer: FC<{
  taxInput: number;
  onTaxChange: (t: number) => void;
  onSubmit: () => void;
}> = ({ taxInput, onTaxChange, onSubmit }) => {
  const [tax, setTax] = useState<string>('0');
  const value = Number(tax);
  const valid = Number.isFinite(value) && value >= TAX_MIN && value <= TAX_MAX;
  const changeTax = (next: string) => {
    setTax(next);
    const parsed = Number(next);
    if (Number.isFinite(parsed)) onTaxChange(parsed);
  };
  return (
    <div className="card border-base-content/10 border p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm">
          Tax rate: <strong>{formatPct(valid ? value : taxInput)}</strong>
        </span>
        <input
          type="range"
          min={TAX_MIN}
          max={TAX_MAX}
          step={0.01}
          value={valid ? value : taxInput}
          onChange={(e) => changeTax(e.target.value)}
          data-testid="tax-slider"
          className="range range-primary range-sm flex-1"
        />
        <input
          type="number"
          min={TAX_MIN}
          max={TAX_MAX}
          step={0.01}
          value={tax}
          onChange={(e) => changeTax(e.target.value)}
          data-testid="tax-input"
          className="input input-bordered input-sm w-24"
        />
        <button
          type="button"
          disabled={!valid}
          onClick={onSubmit}
          data-testid="apply-tax"
          className="btn btn-primary btn-sm">
          Apply
        </button>
      </div>
    </div>
  );
};

export const InequalityGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, round, outcome, outcomes, totalScore } = state;
  const spec = ROUNDS[Math.min(round, TOTAL_ROUNDS) - 1];

  const baseGini = useMemo(() => gini(spec.incomes), [spec]);
  const previewGini = useMemo(
    () => giniAfter(spec.incomes, state.taxInput),
    [spec, state.taxInput]
  );
  const previewLorenz = useMemo(
    () => lorenzPoints(afterPolicy(spec.incomes, state.taxInput)),
    [spec, state.taxInput]
  );

  const setTaxValue = useCallback(
    (t: number) => dispatch({ type: 'SET_TAX', value: t }),
    []
  );
  const submit = useCallback(() => dispatch({ type: 'SUBMIT' }), []);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Score: <strong>{totalScore}</strong>
        </span>
        {spec.hard && (
          <span className="badge badge-warning">Surprise income vector</span>
        )}
      </div>

      {phase === 'play' && (
        <>
          <div className="card border-base-content/10 grid gap-4 border p-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 text-sm">
              <p className="text-base-content/60 text-xs">
                Annual incomes in a 10-household economy (k$)
              </p>
              <div className="flex flex-wrap gap-1">
                {spec.incomes.map((y, i) => (
                  <span key={i} className="badge badge-ghost">
                    {y}
                  </span>
                ))}
              </div>
              <p>
                Base Gini:{' '}
                <strong data-testid="base-gini">{formatGini(baseGini)}</strong>
              </p>
              <p>
                Target Gini:{' '}
                <strong data-testid="target-gini">
                  {formatGini(spec.target)}
                </strong>
              </p>
              <p>
                At your rate, Gini becomes{' '}
                <strong data-testid="preview-gini">
                  {formatGini(previewGini)}
                </strong>
              </p>
              <p className="text-base-content/60 text-xs">
                A proportional tax with a uniform per-capita rebate is
                revenue-neutral — mean income never changes.
              </p>
            </div>
            <LorenzChart points={previewLorenz} />
          </div>
          <RoundPlayer
            taxInput={state.taxInput}
            onTaxChange={setTaxValue}
            onSubmit={submit}
          />
        </>
      )}

      {phase === 'reveal' && outcome && (
        <div className="flex flex-col gap-4">
          <LorenzChart points={previewLorenz} />
          <OutcomePanel
            outcome={outcome}
            onNext={nextRound}
            last={round >= TOTAL_ROUNDS}
          />
        </div>
      )}

      {phase === 'done' && (
        <FinalPanel
          outcomes={outcomes}
          totalScore={totalScore}
          onReset={reset}
        />
      )}
    </div>
  );
};
InequalityGame.displayName = 'InequalityGame';
