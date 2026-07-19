import { FC, useCallback, useReducer, useState } from 'react';
import { moralHazardCount } from './game';
import { createInitialState, gameReducer } from './reducer';
import { TOTAL_ROUNDS } from './constants';
import type { Contract, Effort, GameState } from './types';
import {
  ContractPicker,
  EffortPicker,
  ExpectedPayoffTable,
} from './components';

const formatWealth = (n: number): string =>
  n >= 0 ? `+$${n}` : `-$${Math.abs(n)}`;

export const MoralHazardGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [contract, setContract] = useState<Contract | null>(null);
  const [effort, setEffort] = useState<Effort | null>(null);

  const pickContract = useCallback(
    (c: Contract) => {
      setContract(c);
      dispatch({ type: 'SELECT_CONTRACT', contract: c });
    },
    [dispatch]
  );

  const pickEffort = useCallback(
    (e: Effort) => {
      setEffort(e);
      dispatch({ type: 'SELECT_EFFORT', effort: e });
    },
    [dispatch]
  );

  const submitRound = useCallback(() => {
    dispatch({ type: 'SUBMIT' });
  }, [dispatch]);

  const nextRound = useCallback(() => {
    dispatch({ type: 'NEXT_ROUND' });
    setContract(null);
    setEffort(null);
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setContract(null);
    setEffort(null);
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-4" data-testid="moral-hazard-game">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{state.round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Total wealth: <strong>{formatWealth(state.totalWealth)}</strong>
        </span>
      </div>

      {state.phase === 'contract' && <ContractPicker onSelect={pickContract} />}

      {state.phase === 'effort' && state.selectedContract && (
        <EffortPicker
          contract={state.selectedContract}
          onSelect={pickEffort}
          onSubmit={submitRound}
          selectedEffort={effort}
        />
      )}

      {state.phase === 'reveal' && state.roundResult && (
        <RevealPanel
          state={state}
          contract={contract}
          effort={effort}
          onNext={nextRound}
        />
      )}

      {state.phase === 'done' && <SummaryPanel state={state} onReset={reset} />}
    </div>
  );
};
MoralHazardGame.displayName = 'MoralHazardGame';

const RevealPanel: FC<{
  state: GameState;
  contract: Contract | null;
  effort: Effort | null;
  onNext: () => void;
}> = ({ state, contract, effort, onNext }) => {
  const r = state.roundResult!;
  const hint =
    contract === 'full'
      ? 'Full coverage made your care worthless — you preferred to shirk.'
      : contract === 'partial'
        ? 'The deductible kept your skin in the game — effort was worth it.'
        : 'Without insurance, effort directly protected your wealth.';
  return (
    <div className="flex flex-col items-center gap-3 py-4" data-testid="reveal">
      <div className="text-3xl">{r.loss ? '🔥' : '🏠'}</div>
      <div className="text-lg">
        {r.loss ? 'Loss occurred!' : 'No loss this round.'}
      </div>
      <div className="flex flex-col gap-1 text-center text-sm">
        {r.loss && (
          <>
            <span>
              Loss amount: <strong>$60</strong>
            </span>
            <span>
              You paid: <strong>${r.outOfPocket}</strong>
            </span>
            {r.insurerPays > 0 && (
              <span className="text-success">
                Insurer paid: <strong>${r.insurerPays}</strong>
              </span>
            )}
          </>
        )}
        <span className="mt-1 font-semibold">
          Net wealth this round: <strong>{formatWealth(r.netWealth)}</strong>
        </span>
        <span className="text-base-content/60 text-xs">
          Cumulative: {formatWealth(state.totalWealth)}
        </span>
      </div>
      {contract && effort && (
        <ExpectedPayoffTable contract={contract} choice={effort} />
      )}
      <p className="text-base-content/60 max-w-sm text-center text-xs italic">
        {hint}
      </p>
      <button
        type="button"
        onClick={onNext}
        className="btn btn-primary btn-sm"
        data-testid="next-round">
        {state.round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
      </button>
    </div>
  );
};

const SummaryPanel: FC<{
  state: GameState;
  onReset: () => void;
}> = ({ state, onReset }) => {
  const mhCount = moralHazardCount(state.roundResults);
  return (
    <div
      className="flex flex-col items-center gap-3 py-4"
      data-testid="summary">
      <div className="text-4xl">📊</div>
      <div className="text-lg">Game Over</div>
      <div className="flex gap-6 text-sm">
        <span>
          Total wealth:{' '}
          <strong className="text-primary">
            {formatWealth(state.totalWealth)}
          </strong>
        </span>
        <span>
          Moral hazard events:{' '}
          <strong className={mhCount > 0 ? 'text-error' : 'text-success'}>
            {mhCount}
          </strong>
        </span>
      </div>
      {mhCount > 0 && (
        <p className="text-base-content/60 max-w-md text-center text-sm">
          You chose low effort while fully insured {mhCount} time
          {mhCount !== 1 ? 's' : ''}. Full coverage removed your incentive to
          take care — this is the hidden-action problem at the heart of moral
          hazard. When the insurer cannot observe your effort, you have every
          reason to shirk.
        </p>
      )}
      {mhCount === 0 && (
        <p className="text-base-content/60 max-w-md text-center text-sm">
          You avoided moral hazard — nice! Notice how partial coverage and no
          insurance both kept your incentive to exert effort intact. Only full
          coverage destroyed the link between care and outcome.
        </p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="btn btn-primary btn-sm"
        data-testid="play-again">
        Play Again
      </button>
    </div>
  );
};
