import { FC, useCallback, useReducer } from 'react';
import { createInitialState, gameReducer } from './reducer';
import type { CompoundingFrequency } from './types';
import { CalculatorPhase } from './calculator';
import { AnnuityPhase, ComparePhase, NpvPhase, ResultsPhase } from './phases';

export const TimeValueGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);

  const setPrincipal = useCallback(
    (v: number) => dispatch({ type: 'SET_PRINCIPAL', value: v }),
    []
  );
  const setRate = useCallback(
    (v: number) => dispatch({ type: 'SET_RATE', value: v }),
    []
  );
  const setYears = useCallback(
    (v: number) => dispatch({ type: 'SET_YEARS', value: v }),
    []
  );
  const setCompounding = useCallback(
    (v: CompoundingFrequency) =>
      dispatch({ type: 'SET_COMPOUNDING', value: v }),
    []
  );
  const check = useCallback(() => dispatch({ type: 'CHECK' }), []);
  const selectOffer = useCallback(
    (offer: string) => dispatch({ type: 'SELECT_OFFER', offer }),
    []
  );
  const selectAnnuity = useCallback(
    (answer: string) => dispatch({ type: 'SELECT_ANNUITY', answer }),
    []
  );
  const selectNpv = useCallback(
    (answer: string) => dispatch({ type: 'SELECT_NPV', answer }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      {state.phase === 'calculator' && (
        <CalculatorPhase
          principal={state.principal}
          rate={state.rate}
          years={state.years}
          compounding={state.compounding}
          onPrincipal={setPrincipal}
          onRate={setRate}
          onYears={setYears}
          onCompounding={setCompounding}
          onCheck={check}
        />
      )}

      {state.phase === 'compare' && (
        <ComparePhase
          compareRound={state.compareRound}
          onSelect={selectOffer}
        />
      )}

      {state.phase === 'annuity' && <AnnuityPhase onAnswer={selectAnnuity} />}

      {state.phase === 'npv' && <NpvPhase onAnswer={selectNpv} />}

      {state.phase === 'results' && (
        <ResultsPhase
          score={state.score}
          total={5}
          compareData={state.compareData}
          annuityCorrect={state.annuityData.correctChoice}
          npvCorrect={state.npvData.correctChoice}
          onReset={reset}
        />
      )}
    </div>
  );
};
TimeValueGame.displayName = 'TimeValueGame';
