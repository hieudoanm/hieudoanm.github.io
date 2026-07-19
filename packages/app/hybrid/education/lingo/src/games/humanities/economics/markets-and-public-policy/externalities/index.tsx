import { FC, useCallback, useReducer, useState } from 'react';
import { EXTERNAL_DAMAGE, MAX_Q, MIN_Q, TOTAL_ROUNDS } from './constants';
import {
  phaseForRound,
  privateOptimalQ,
  socialOptimalQ,
  taxRateForPhase,
} from './game';
import { createInitialState, gameReducer } from './reducer';
import { ResultPanel, SummaryPanel } from './components';

export const ExternalitiesGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [pick, setPick] = useState<string>('5');
  const { phase, round, result, results } = state;
  const currentPhase = phaseForRound(round);
  const taxRate = taxRateForPhase(currentPhase);

  const submitQ = useCallback(() => {
    const q = Math.round(Number(pick));
    if (!Number.isFinite(q) || q < MIN_Q || q > MAX_Q) return;
    dispatch({ type: 'PICK_OUTPUT', q });
  }, [pick]);

  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setPick('5');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span data-testid="round-label">
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Phase <strong>{currentPhase}</strong>
          {taxRate === 0 ? ' — no tax' : ` — Pigouvian tax $${taxRate}/ton`}
        </span>
      </div>

      {phase === 'pick' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            Demand P = 20 − Q, cost TC(Q) = Q²/2, external damage $
            {EXTERNAL_DAMAGE}/ton. Pick an integer output Q between {MIN_Q} and{' '}
            {MAX_Q}.
          </p>
          <p className="text-base-content/60 text-xs">
            Your profit-maximizing output: Q = {privateOptimalQ(taxRate)}.
            Social optimum: Q = {socialOptimalQ()}.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Choose output"
              value={pick}
              onChange={(e) => setPick(e.target.value)}
              data-testid="q-select"
              className="select select-bordered select-sm w-24">
              {Array.from(
                { length: MAX_Q - MIN_Q + 1 },
                (_, i) => MIN_Q + i
              ).map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={submitQ}
              data-testid="submit-q"
              className="btn btn-primary btn-sm">
              Produce Q Units
            </button>
          </div>
        </div>
      )}

      {phase === 'result' && result && (
        <ResultPanel result={result} round={round} onNext={nextRound} />
      )}

      {phase === 'done' && <SummaryPanel results={results} onReset={reset} />}
    </div>
  );
};

ExternalitiesGame.displayName = 'ExternalitiesGame';
