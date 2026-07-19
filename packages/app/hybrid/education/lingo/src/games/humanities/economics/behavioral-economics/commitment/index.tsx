import { FC, useCallback, useReducer, useState } from 'react';
import { DAILY_INCOME, SAVE_STEP, TOTAL_DAYS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { GameState } from './reducer';

const de = { minimumFractionDigits: 0, maximumFractionDigits: 2 } as const;

const formatCurrency = (n: number): string =>
  `$${n.toLocaleString('en-US', de)}`;
const formatNumber = (n: number): string => n.toLocaleString('en-US', de);

const SetupScreen: FC<{ onStart: (commitment: boolean) => void }> = ({
  onStart,
}) => {
  const [commitment, setCommitment] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="text-4xl">{commitment ? '🔒' : '🔓'}</div>
      <h2 className="text-lg font-semibold">Choose your savings strategy</h2>
      <p className="text-base-content/60 max-w-sm text-center text-sm">
        Will you enable auto-save? Once the game starts, you cannot change your
        mind.
      </p>
      <button
        type="button"
        data-testid="toggle-commitment"
        onClick={() => setCommitment(!commitment)}
        className={`btn btn-sm ${commitment ? 'btn-success' : 'btn-warning'}`}>
        Commitment device: {commitment ? 'ON' : 'OFF'}
      </button>
      <button
        type="button"
        data-testid="start-game"
        onClick={() => onStart(commitment)}
        className="btn btn-primary btn-sm mt-2">
        Start Game
      </button>
    </div>
  );
};

const ChooseScreen: FC<{
  state: GameState;
  onSubmit: (save: number) => void;
}> = ({ state, onSubmit }) => {
  const [save, setSave] = useState(DAILY_INCOME / 2);
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <p className="text-sm">
        Day <strong>{state.day}</strong> / {TOTAL_DAYS} · Balance{' '}
        <strong>{formatCurrency(state.savingsBalance)}</strong>
      </p>
      <div className="card border-base-content/10 flex flex-col items-center gap-2 border p-4">
        <p className="text-sm">
          Income: <strong>{formatCurrency(DAILY_INCOME)}</strong> · Intended
          save: <strong className="text-primary">{formatCurrency(save)}</strong>{' '}
          · Consume: <strong>{formatCurrency(DAILY_INCOME - save)}</strong>
        </p>
        <input
          type="range"
          min={0}
          max={DAILY_INCOME}
          step={SAVE_STEP}
          value={save}
          onChange={(e) => setSave(Number(e.target.value))}
          data-testid="save-slider"
          className="range range-primary w-full max-w-xs"
        />
        <div className="flex flex-wrap gap-1 text-xs">
          {[0, 5, 10, 15, 20].map((v) => (
            <button
              key={v}
              type="button"
              data-testid={`quick-save-${v}`}
              onClick={() => setSave(v)}
              className="btn btn-xs">
              {formatCurrency(v)}
            </button>
          ))}
        </div>
        <button
          type="button"
          data-testid="submit-save"
          onClick={() => onSubmit(save)}
          className="btn btn-primary btn-sm mt-2">
          Save & Consume
        </button>
      </div>
    </div>
  );
};

const RevealScreen: FC<{ state: GameState; onNext: () => void }> = ({
  state,
  onNext,
}) => {
  const r = state.lastResult;
  if (!r) return null;
  const tempted = r.actualSave < r.intendedSave;
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-3xl">{tempted ? '😈' : '💰'}</div>
      {tempted && (
        <div className="alert alert-warning text-sm">
          Splurge impulse! You caved and consumed more than planned.
        </div>
      )}
      <div className="flex flex-col gap-1 text-center text-sm">
        {tempted && (
          <span className="text-error">
            Splurge loss: <strong>{formatNumber(r.splurgeLoss)}</strong>
          </span>
        )}
        <span>
          Intended save: <strong>{formatCurrency(r.intendedSave)}</strong>
        </span>
        <span>
          Actually saved:{' '}
          <strong className={tempted ? 'text-error' : 'text-success'}>
            {formatCurrency(r.actualSave)}
          </strong>
        </span>
        <span>
          New savings balance: <strong>{formatCurrency(r.newBalance)}</strong>
        </span>
        <span>
          Consumed: <strong>{formatCurrency(r.consume)}</strong>
        </span>
        <span>
          Consumption utility:{' '}
          <strong>{formatNumber(r.consumptionUtility)}</strong>
        </span>
      </div>
      <button
        type="button"
        data-testid="next-day"
        onClick={onNext}
        className="btn btn-primary btn-sm">
        {state.day >= TOTAL_DAYS ? 'See Results' : 'Next Day'}
      </button>
    </div>
  );
};

const ResultsScreen: FC<{ state: GameState; onReset: () => void }> = ({
  state,
  onReset,
}) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">📊</div>
    <div className="text-lg font-semibold">Results</div>
    <div className="flex flex-col gap-1 text-center text-sm">
      <span>
        Commitment device:{' '}
        <strong>{state.commitment ? 'ON 🔒' : 'OFF 🔓'}</strong>
      </span>
      <span>
        Final savings:{' '}
        <strong className="text-primary">
          {formatCurrency(state.savingsBalance)}
        </strong>
      </span>
      <span>
        Total consumption utility:{' '}
        <strong>{formatNumber(state.totalConsumptionUtility)}</strong>
      </span>
      <span>
        Total splurge loss:{' '}
        <strong className="text-error">
          {formatNumber(state.totalSplurgeLoss)}
        </strong>
      </span>
    </div>
    <div className="card border-base-content/10 border p-3 text-center text-xs italic">
      Without a commitment device, present bias whittles away what you yourself
      planned to save.
    </div>
    <button
      type="button"
      data-testid="play-again"
      onClick={onReset}
      className="btn btn-primary btn-sm">
      Play Again
    </button>
  </div>
);

export const CommitmentDevice: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const startGame = useCallback(
    (commitment: boolean) => dispatch({ type: 'START_GAME', commitment }),
    []
  );
  const submitSave = useCallback(
    (intendedSave: number) =>
      dispatch({ type: 'SAVE', intendedSave, random01: Math.random() }),
    []
  );
  const nextDay = useCallback(() => dispatch({ type: 'NEXT_DAY' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      {state.phase === 'setup' && <SetupScreen onStart={startGame} />}
      {state.phase === 'choose' && (
        <ChooseScreen state={state} onSubmit={submitSave} />
      )}
      {state.phase === 'reveal' && (
        <RevealScreen state={state} onNext={nextDay} />
      )}
      {state.phase === 'done' && (
        <ResultsScreen state={state} onReset={reset} />
      )}
    </div>
  );
};
CommitmentDevice.displayName = 'CommitmentDevice';
