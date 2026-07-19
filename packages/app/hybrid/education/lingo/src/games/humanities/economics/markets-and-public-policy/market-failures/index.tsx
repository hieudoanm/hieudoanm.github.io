import { FC, useCallback, useReducer } from 'react';
import { SCENARIOS } from './constants';
import {
  Feedback,
  PolicyOptions,
  PollutionPanel,
  ResultsPanel,
  ScenarioCard,
  ScenarioHeader,
  ScoreBadge,
} from './components';
import { createInitialState, gameReducer } from './reducer';
import type { Policy } from './types';

export const MarketFailuresGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, scenarioIndex, lastAnswer, score, pollution } = state;
  const scenario = SCENARIOS[scenarioIndex];

  const answerPolicy = useCallback(
    (policy: Policy) => dispatch({ type: 'ANSWER_POLICY', policy }),
    []
  );
  const nextScenario = useCallback(
    () => dispatch({ type: 'NEXT_SCENARIO' }),
    []
  );
  const setGap = useCallback(
    (gap: number) => dispatch({ type: 'SET_GAP', gap }),
    []
  );
  const setTax = useCallback(
    (tax: number) => dispatch({ type: 'SET_TAX', tax }),
    []
  );
  const confirmTax = useCallback(() => dispatch({ type: 'CONFIRM_TAX' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      {phase === 'scenario' && (
        <>
          <div className="flex items-center justify-between">
            <ScenarioHeader index={scenarioIndex} />
            <ScoreBadge score={score} />
          </div>
          <ScenarioCard scenario={scenario} />
          <PolicyOptions
            selected={lastAnswer?.policy ?? null}
            disabled={!!lastAnswer}
            onPick={answerPolicy}
          />
          {lastAnswer && (
            <>
              <Feedback
                scenario={scenario}
                policy={lastAnswer.policy}
                correct={lastAnswer.policyCorrect}
              />
              <button
                type="button"
                onClick={nextScenario}
                className="btn btn-primary btn-sm w-fit">
                {scenarioIndex === SCENARIOS.length - 1
                  ? 'Start Pigouvian Fix'
                  : 'Next Scenario'}
              </button>
            </>
          )}
        </>
      )}

      {phase === 'pollution' && (
        <>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Bonus: The Pigouvian Fix</span>
            <ScoreBadge score={score} />
          </div>
          <PollutionPanel
            gap={pollution.gap}
            tax={pollution.tax}
            confirmed={pollution.confirmed}
            onGap={setGap}
            onTax={setTax}
            onCheck={confirmTax}
          />
        </>
      )}

      {phase === 'done' && (
        <>
          <ResultsPanel
            score={score}
            total={SCENARIOS.length}
            tax={pollution.tax}
            gap={pollution.gap}
          />
          <button
            type="button"
            onClick={reset}
            data-testid="reset"
            className="btn btn-outline btn-sm w-fit">
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

MarketFailuresGame.displayName = 'MarketFailuresGame';
