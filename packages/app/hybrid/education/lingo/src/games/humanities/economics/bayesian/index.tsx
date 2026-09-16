import { FC, useCallback, useEffect, useReducer } from 'react';
import { TOTAL_TRIALS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { Door } from './types';
import { ExplanationPanel, TallyBar } from './components';

const doorLabel = (door: Door): string => String(door + 1);

const thirdDoor = (a: Door, b: Door): Door => (3 - a - b) as Door;

export const MontyHallGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, undefined, () =>
    createInitialState()
  );
  const { phase, trial, picked, revealed, tally } = state;

  useEffect(() => {
    if (phase === 'reveal') dispatch({ type: 'REVEAL_GOAT' });
  }, [phase, dispatch]);

  const startTrial = useCallback(
    (door: Door) => dispatch({ type: 'TRIAL_START', pick: door }),
    []
  );
  const decide = useCallback(
    (switched: boolean) => dispatch({ type: 'DECIDE', switched }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Trial <strong>{trial}</strong> / {TOTAL_TRIALS}
        </span>
        <span>
          Switch wins:{' '}
          <strong data-testid="switch-wins">{tally.switchWins}</strong> | Stay
          wins: <strong data-testid="stay-wins">{tally.stayWins}</strong>
        </span>
      </div>

      {tally.total > 0 && <TallyBar tally={tally} />}

      {phase === 'pick' && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-base-content/60 text-sm">
            Behind one door is a prize. Pick a door:
          </p>
          <div className="flex gap-3">
            {([0, 1, 2] as Door[]).map((door) => (
              <button
                key={door}
                type="button"
                onClick={() => startTrial(door)}
                data-testid={`door-${door}`}
                className="btn btn-lg btn-outline h-20 w-20 text-xl">
                {doorLabel(door)}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="flex flex-col items-center gap-3 py-8">
          <p className="text-base-content/60 text-sm">
            The host is opening a door…
          </p>
        </div>
      )}

      {phase === 'decide' && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm">
            You picked Door <strong>{doorLabel(picked)}</strong>. The host opens
            Door <strong>{doorLabel(revealed)}</strong> — a goat!
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => decide(true)}
              data-testid="switch-btn"
              className="btn btn-success btn-sm">
              Switch to Door {doorLabel(thirdDoor(picked, revealed))}
            </button>
            <button
              type="button"
              onClick={() => decide(false)}
              data-testid="stay-btn"
              className="btn btn-error btn-sm">
              Stay with Door {doorLabel(picked)}
            </button>
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-4xl">🏁</div>
          <div className="text-lg font-bold">All 20 trials complete!</div>
          <div className="flex gap-6 text-sm">
            <span className="text-success">
              Switching won <strong>{tally.switchWins}/20</strong>
            </span>
            <span className="text-error">
              Staying won <strong>{tally.stayWins}/20</strong>
            </span>
          </div>
          <ExplanationPanel tally={tally} />
          <button
            type="button"
            onClick={reset}
            data-testid="reset-btn"
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
MontyHallGame.displayName = 'MontyHallGame';
