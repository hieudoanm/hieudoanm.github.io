'use client';

import { FC, useCallback, useReducer } from 'react';
import { createInitialState, gameReducer } from './reducer';
import { STARTING_BUDGET, TOTAL_SCENARIOS } from './constants';
import { getScenario, maxPossibleScore } from './game';
import {
  AnswerOptions,
  BudgetPanel,
  HintsPanel,
  ResultsPanel,
  RevealPanel,
  ScenarioCard,
} from './components';
import type { Classification, InvestigationAction } from './types';

export const CausationChallenge: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    round,
    scenarioIndex,
    budgetSpent,
    hints,
    results,
    totalScore,
  } = state;
  const scenario = getScenario(scenarioIndex);
  const last = round >= TOTAL_SCENARIOS;

  const investigate = useCallback(
    (action: InvestigationAction) => dispatch({ type: 'INVESTIGATE', action }),
    []
  );
  const submitAnswer = useCallback(
    (answer: Classification) => dispatch({ type: 'SUBMIT_ANSWER', answer }),
    []
  );
  const nextScenario = useCallback(
    () => dispatch({ type: 'NEXT_SCENARIO' }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  if (phase === 'done') {
    return (
      <ResultsPanel
        total={totalScore}
        max={maxPossibleScore()}
        results={results}
        onReset={reset}
      />
    );
  }

  const lastResult = results[results.length - 1];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm">
        <span>
          Scenario <strong>{round}</strong> / {TOTAL_SCENARIOS}
        </span>
        <span>
          Score so far: <strong>{totalScore}</strong>
        </span>
      </div>
      <ScenarioCard scenario={scenario} round={round} />
      {phase === 'investigate' && (
        <>
          <BudgetPanel
            budget={STARTING_BUDGET}
            spent={budgetSpent}
            onInvestigate={investigate}
          />
          <HintsPanel hints={hints} />
          <div className="card border-base-content/10 flex flex-col gap-2 border p-4">
            <span className="text-sm">Classify the relationship:</span>
            <AnswerOptions choices={scenario.choices} onSubmit={submitAnswer} />
          </div>
        </>
      )}
      {phase === 'reveal' && lastResult && (
        <RevealPanel
          scenario={scenario}
          correct={lastResult.correct}
          answer={lastResult.answer ?? 'coincidence'}
          last={last}
          onNext={nextScenario}
        />
      )}
    </div>
  );
};
CausationChallenge.displayName = 'CausationChallenge';
