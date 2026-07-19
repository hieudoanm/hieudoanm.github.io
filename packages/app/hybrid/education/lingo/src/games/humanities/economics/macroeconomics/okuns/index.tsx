import { FC, useCallback, useReducer } from 'react';
import { EstimatePanel } from './components/estimate';
import { IntroPanel } from './components/intro';
import { ResultPanel } from './components/result';
import { SteerPanel } from './components/steer';
import { STEER_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { CoefficientChoice } from './types';

export const OkunLab: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    resultKind,
    model,
    growth,
    unemployment,
    steerStep,
    deviation,
    outcomeScore,
    onTarget,
    dataset,
    chosenCoef,
    line,
    correctCoef,
  } = state;

  const setPotentialGrowth = useCallback(
    (value: number) => dispatch({ type: 'SET_POTENTIAL_GROWTH', value }),
    []
  );
  const setOkunCoef = useCallback(
    (value: number) => dispatch({ type: 'SET_OKUN_COEF', value }),
    []
  );
  const setNaturalRate = useCallback(
    (value: number) => dispatch({ type: 'SET_NATURAL_RATE', value }),
    []
  );
  const setGrowth = useCallback(
    (value: number) => dispatch({ type: 'SET_GROWTH', value }),
    []
  );
  const startSteer = useCallback(() => dispatch({ type: 'START_STEER' }), []);
  const checkSteer = useCallback(() => dispatch({ type: 'CHECK_STEER' }), []);
  const startEstimate = useCallback(
    () => dispatch({ type: 'START_ESTIMATE' }),
    []
  );
  const chooseCoef = useCallback(
    (value: CoefficientChoice) => dispatch({ type: 'CHOOSE_COEF', value }),
    []
  );
  const estimate = useCallback(
    () => dispatch({ type: 'ESTIMATE_COEFFICIENT' }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const header =
    phase === 'intro'
      ? 'Configure the model'
      : phase === 'steer'
        ? `Year ${steerStep + 1} / ${STEER_ROUNDS}`
        : phase === 'estimate'
          ? 'Regression round'
          : resultKind === 'steer'
            ? 'Steering result'
            : 'Estimate result';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>{header}</span>
        <button type="button" onClick={reset} className="btn btn-ghost btn-xs">
          Reset
        </button>
      </div>
      {phase === 'intro' && (
        <IntroPanel
          model={model}
          onGStar={setPotentialGrowth}
          onCoef={setOkunCoef}
          onUStar={setNaturalRate}
          onSteer={startSteer}
          onEstimate={startEstimate}
        />
      )}
      {phase === 'steer' && (
        <SteerPanel
          c={model.c}
          gStar={model.gStar}
          uStar={model.uStar}
          growth={growth}
          unemployment={unemployment}
          steerStep={steerStep}
          onGrowth={setGrowth}
          onCheck={checkSteer}
        />
      )}
      {phase === 'estimate' && (
        <EstimatePanel
          dataset={dataset}
          chosenCoef={chosenCoef}
          onChoose={chooseCoef}
          onEstimate={estimate}
        />
      )}
      {phase === 'done' && resultKind && (
        <ResultPanel
          kind={resultKind}
          targetUnemployment={model.uStar}
          unemployment={unemployment}
          deviation={deviation}
          score={outcomeScore}
          onTarget={onTarget}
          dataset={dataset}
          line={line}
          correctCoef={correctCoef}
          chosenCoef={chosenCoef}
          onReset={reset}
          onSteer={startSteer}
          onEstimate={startEstimate}
        />
      )}
    </div>
  );
};

OkunLab.displayName = 'OkunLab';
