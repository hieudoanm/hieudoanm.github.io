import { FC, useCallback, useReducer, useState } from 'react';
import { POOL, RESPONDER, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import { formatCurrency } from './game';

const RevealPanel: FC<{
  round: number;
  keep: number;
  threshold: number;
  accepted: boolean;
  payoff: number;
  onNext: () => void;
}> = ({ round, keep, threshold, accepted, payoff, onNext }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-3xl">{accepted ? '🎉' : '😔'}</div>
    <div className="text-lg">
      {accepted
        ? `${RESPONDER.emoji} ${RESPONDER.name} accepted your offer!`
        : `${RESPONDER.emoji} ${RESPONDER.name} rejected your offer.`}
    </div>
    <div className="flex flex-col gap-1 text-center text-sm">
      <span>
        Your keep: <strong>{formatCurrency(keep)}</strong>
      </span>
      <span>
        You offered: <strong>{formatCurrency(POOL - keep)}</strong>
      </span>
      <span>
        {RESPONDER.name}&rsquo;s threshold:{' '}
        <strong>{formatCurrency(threshold)}</strong>
      </span>
      <span className={accepted ? 'text-success' : 'text-error'}>
        Round payoff: <strong>{formatCurrency(payoff)}</strong>
      </span>
    </div>
    <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
      {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

const LESSON =
  'Offering just a little above the responder\u2019s threshold maximizes what you keep; demanding too much risks rejection.';

export const UltimatumGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [keepInput, setKeepInput] = useState<number>(50);
  const { phase, round, result, totalKept, acceptedCount } = state;

  const submitKeep = useCallback(() => {
    const value = Math.round(keepInput);
    if (value < 0 || value > POOL) return;
    dispatch({ type: 'SUBMIT_KEEP', keep: value });
  }, [keepInput]);

  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setKeepInput(50);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Total kept: <strong>{formatCurrency(totalKept)}</strong>
        </span>
      </div>

      {phase === 'choose' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            You are the proposer. Choose how much of{' '}
            <strong>{formatCurrency(POOL)}</strong> to keep.
          </p>
          <p className="text-base-content/60 text-xs">
            {RESPONDER.emoji} {RESPONDER.name} will accept your offer only if it
            meets their secret threshold.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="range"
              min={0}
              max={POOL}
              value={keepInput}
              onChange={(e) => setKeepInput(Number(e.target.value))}
              data-testid="keep-slider"
              className="range range-primary"
            />
            <span className="text-primary font-bold">
              {formatCurrency(keepInput)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base-content/60 text-xs">
              Offer: <strong>{formatCurrency(POOL - keepInput)}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={submitKeep}
            data-testid="submit-keep"
            className="btn btn-primary btn-sm self-start">
            Submit Proposal
          </button>
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel
          round={round}
          keep={result.keep}
          threshold={result.threshold}
          accepted={result.accepted}
          payoff={result.payoff}
          onNext={nextRound}
        />
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-4xl">📊</div>
          <div className="text-lg">Ultimatum Split Results</div>
          <div className="flex gap-6 text-sm">
            <span>
              Total kept: <strong>{formatCurrency(totalKept)}</strong>
            </span>
            <span>
              Offers accepted:{' '}
              <strong>
                {acceptedCount} / {TOTAL_ROUNDS}
              </strong>
            </span>
          </div>
          <div className="card border-base-content/10 max-w-md border p-4 text-center text-sm">
            {LESSON}
          </div>
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

UltimatumGame.displayName = 'UltimatumGame';
