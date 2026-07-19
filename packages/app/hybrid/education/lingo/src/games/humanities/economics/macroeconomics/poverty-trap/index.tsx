import { FC, useCallback, useReducer } from 'react';
import { PhaseBadge, SimControls, SimTable } from './components';
import { PolicyPanel } from './panel';
import { createInitialState, gameReducer } from './reducer';

export const PovertyTrapGame: FC = () => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );

  const setCapital = useCallback(
    (v: number) => dispatch({ type: 'SET_INITIAL_CAPITAL', value: v }),
    []
  );
  const setRate = useCallback(
    (v: number) => dispatch({ type: 'SET_SAVINGS_RATE', value: v }),
    []
  );
  const setSubsistence = useCallback(
    (v: number) => dispatch({ type: 'SET_SUBSISTENCE', value: v }),
    []
  );
  const setTransfer = useCallback(
    (v: number) => dispatch({ type: 'SET_TRANSFER', value: v }),
    []
  );
  const setGuess = useCallback(
    (v: number) => dispatch({ type: 'SET_GUESS', value: v }),
    []
  );
  const startPolicy = useCallback(() => dispatch({ type: 'START_POLICY' }), []);
  const escapeNow = useCallback(() => dispatch({ type: 'ESCAPE_NOW' }), []);
  const check = useCallback(() => dispatch({ type: 'CHECK' }), []);
  const next = useCallback(() => dispatch({ type: 'NEXT_CHALLENGE' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      {state.phase === 'simulate' && (
        <>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Simulate the poverty trap</h2>
            <PhaseBadge phase={state.simulation.trapPhase} />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <SimControls
              initialCapital={state.initialCapital}
              savingsRate={state.savingsRate}
              subsistence={state.subsistence}
              threshold={state.scenario.threshold}
              onCapital={setCapital}
              onRate={setRate}
              onSubsistence={setSubsistence}
            />
            <SimTable
              rows={state.simulation.simulations}
              threshold={state.scenario.threshold}
              scenario={state.scenario}
            />
          </div>
          <button
            type="button"
            onClick={startPolicy}
            className="btn btn-primary btn-sm w-fit"
            data-testid="start-policy">
            Next: Policy challenge →
          </button>
        </>
      )}

      {state.phase === 'policy' && (
        <PolicyPanel
          challenge={state.challenge}
          transfer={state.transfer}
          guess={state.guess}
          minTransfer={state.minimumTransfer}
          score={state.score}
          round={state.round}
          totalRounds={state.totalRounds}
          escaped={state.escaped}
          answered={state.answered}
          correct={state.correct}
          onTransfer={setTransfer}
          onGuess={setGuess}
          onEscapeNow={escapeNow}
          onCheck={check}
          onNext={next}
          onReset={reset}
        />
      )}
    </div>
  );
};
PovertyTrapGame.displayName = 'PovertyTrapGame';
