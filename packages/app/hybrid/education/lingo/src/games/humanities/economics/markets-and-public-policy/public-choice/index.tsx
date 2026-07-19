import { FC, useCallback, useReducer } from 'react';
import { DonePanel, Header } from './components';
import { PRIZE, TOTAL_ROUNDS } from './constants';
import { MedianCheck, MedianPlan } from './median';
import { ParadoxCheck, ParadoxPlan } from './paradox';
import { RentCheck, RentPlan } from './rent';
import { createInitialState, gameReducer } from './reducer';
import type { MedianResult, ParadoxResult, RentResult } from './types';

export const VotingPowerLab: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, mode, round, wins } = state;

  const setPlatform = useCallback(
    (value: number) => dispatch({ type: 'SET_PLATFORM', value }),
    []
  );
  const setSpend = useCallback(
    (value: number) => dispatch({ type: 'SET_SPEND', value }),
    []
  );
  const setSupported = useCallback(
    (optionId: string) => dispatch({ type: 'SET_SUPPORTED', optionId }),
    []
  );
  const setFirstPair = useCallback(
    (pair: [string, string]) => dispatch({ type: 'SET_FIRST_PAIR', pair }),
    []
  );
  const check = useCallback(() => dispatch({ type: 'CHECK' }), []);
  const next = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const nextLabel = round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round';

  return (
    <div className="flex flex-col gap-4">
      <Header round={round} mode={mode} wins={wins} />

      {phase === 'plan' && mode === 'median' && (
        <MedianPlan
          voters={state.voters}
          playerPlatform={state.playerPlatform}
          botPlatform={state.botPlatform}
          median={state.median}
          onChange={setPlatform}
          onCheck={check}
        />
      )}

      {phase === 'plan' && mode === 'paradox' && (
        <ParadoxPlan
          options={state.paradoxOptions}
          supported={state.supported}
          firstPair={state.firstPair}
          onSupport={setSupported}
          onPair={setFirstPair}
          onCheck={check}
        />
      )}

      {phase === 'plan' && mode === 'rent' && (
        <RentPlan
          playerSpend={state.rentPlayerSpend}
          botSpend={state.rentBotSpend}
          prize={PRIZE}
          onChange={setSpend}
          onCheck={check}
        />
      )}

      {phase === 'check' && mode === 'median' && state.lastResult && (
        <MedianCheck
          result={state.lastResult.detail as MedianResult}
          median={state.median}
          nextLabel={nextLabel}
          onNext={next}
        />
      )}

      {phase === 'check' && mode === 'paradox' && state.lastResult && (
        <ParadoxCheck
          result={state.lastResult.detail as ParadoxResult}
          options={state.paradoxOptions}
          nextLabel={nextLabel}
          onNext={next}
        />
      )}

      {phase === 'check' && mode === 'rent' && state.lastResult && (
        <RentCheck
          result={state.lastResult.detail as RentResult}
          prize={PRIZE}
          nextLabel={nextLabel}
          onNext={next}
        />
      )}

      {phase === 'done' && (
        <DonePanel wins={wins} totalWaste={state.totalWaste} onReset={reset} />
      )}
    </div>
  );
};

VotingPowerLab.displayName = 'VotingPowerLab';
