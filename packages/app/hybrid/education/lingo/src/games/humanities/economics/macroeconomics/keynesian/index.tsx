import { FC, useCallback, useReducer } from 'react';
import { ExplorePanel } from './components';
import { TOTAL_ROUNDS } from './constants';
import {
  equilibriumOutput,
  plannedExpenditure,
  requiredDeltaG,
  spendingMultiplier,
  unplannedInventory,
} from './game';
import { ChallengeScreen } from './screens';
import { createInitialState, gameReducer } from './reducer';

export const KeynesianGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    round,
    target,
    gap,
    mpc,
    a,
    investment,
    government,
    deltaG,
    result,
    results,
    totalScore,
  } = state;

  const multiplier = spendingMultiplier(mpc);
  const equilibrium = equilibriumOutput(a, mpc, investment, government);
  const planned = plannedExpenditure(
    a,
    mpc,
    investment,
    government,
    equilibrium
  );
  const unplanned = unplannedInventory(
    a,
    mpc,
    investment,
    government,
    equilibrium
  );
  const required =
    phase === 'choose'
      ? requiredDeltaG(a, mpc, investment, government, target)
      : 0;

  const onChangeMpc = useCallback(
    (value: number) =>
      dispatch({ type: 'SET_EXPLORE_SLIDER', field: 'mpc', value }),
    []
  );
  const onChangeA = useCallback(
    (value: number) =>
      dispatch({ type: 'SET_EXPLORE_SLIDER', field: 'a', value }),
    []
  );
  const onChangeInvestment = useCallback(
    (value: number) =>
      dispatch({ type: 'SET_EXPLORE_SLIDER', field: 'investment', value }),
    []
  );
  const onChangeGovernment = useCallback(
    (value: number) =>
      dispatch({ type: 'SET_EXPLORE_SLIDER', field: 'government', value }),
    []
  );
  const onChangeDeltaG = useCallback(
    (value: number) => dispatch({ type: 'SET_DELTA_G', value }),
    []
  );
  const onStart = useCallback(() => dispatch({ type: 'START_CHALLENGE' }), []);
  const onCheck = useCallback(() => dispatch({ type: 'CHECK' }), []);
  const onNextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const onReset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      {phase === 'explore' ? (
        <ExplorePanel
          mpc={mpc}
          a={a}
          investment={investment}
          government={government}
          equilibrium={equilibrium}
          multiplier={multiplier}
          planned={planned}
          unplanned={unplanned}
          onChangeMpc={onChangeMpc}
          onChangeA={onChangeA}
          onChangeInvestment={onChangeInvestment}
          onChangeGovernment={onChangeGovernment}
          onStart={onStart}
        />
      ) : (
        <ChallengeScreen
          phase={phase}
          round={round}
          target={target}
          gap={gap}
          totalScore={totalScore}
          mpc={mpc}
          a={a}
          investment={investment}
          government={government}
          required={required}
          deltaG={deltaG}
          result={result}
          results={results}
          isLast={round >= TOTAL_ROUNDS}
          onChangeDeltaG={onChangeDeltaG}
          onCheck={onCheck}
          onNext={onNextRound}
          onReset={onReset}
        />
      )}
    </div>
  );
};
KeynesianGame.displayName = 'KeynesianGame';
