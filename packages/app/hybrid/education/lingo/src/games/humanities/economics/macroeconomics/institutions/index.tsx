import { FC, useCallback, useReducer } from 'react';
import { PRESETS, TARGETS, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import {
  PresetPicker,
  ResultPanel,
  SimulateButtons,
  SliderPanel,
} from './components';
import type { CountryPreset, Institutions } from './types';

export const InstitutionsGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, round, preset, institutions, targetGrowth, result, success } =
    state;

  const pickPreset = useCallback(
    (next: CountryPreset) => dispatch({ type: 'SELECT_PRESET', preset: next }),
    []
  );
  const setInstitution = useCallback(
    (which: keyof Institutions, value: number) =>
      dispatch({ type: 'SET_INSTITUTION', which, value }),
    []
  );
  const simulate = useCallback(() => dispatch({ type: 'SIMULATE' }), []);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Country <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Rounds won: <strong>{state.roundsWon}</strong>
        </span>
      </div>

      <p className="text-base-content/60 text-sm">
        Target 10-year GDP growth:{' '}
        <strong className="text-primary" data-testid="target-growth">
          {targetGrowth}%
        </strong>
      </p>

      {!preset && <PresetPicker onPick={pickPreset} />}

      {preset && phase === 'configure' && (
        <>
          <SliderPanel institutions={institutions} onChange={setInstitution} />
          <SimulateButtons onSimulate={simulate} onReset={reset} />
        </>
      )}

      {result && phase === 'result' && (
        <ResultPanel
          result={result}
          target={targetGrowth}
          success={success}
          onNext={nextRound}
        />
      )}
    </div>
  );
};
InstitutionsGame.displayName = 'InstitutionsGame';
