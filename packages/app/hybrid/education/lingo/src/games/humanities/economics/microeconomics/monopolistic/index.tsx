import { FC, useReducer } from 'react';
import { ModePicker, QuizPanel, SummaryPanel } from './components';
import { QUIZ_SCENARIOS } from './constants';
import { deriveLab } from './game';
import { LabPanel } from './lab';
import { createInitialState, gameReducer } from './reducer';
import type { Mode } from './types';

export const MonopolisticCompetitionGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const derived = deriveLab(state);
  const scenario = QUIZ_SCENARIOS[state.quizRound - 1] ?? QUIZ_SCENARIOS[0];
  const result =
    state.quizResults.find((r) => r.round === state.quizRound) ?? null;

  return (
    <div
      className="flex flex-col gap-4"
      data-testid="monopolistic-competition-game">
      {state.phase === 'lab' && (
        <>
          <ModePicker
            mode={state.mode}
            onSelect={(mode: Mode) => dispatch({ type: 'SET_MODE', mode })}
          />
          <LabPanel
            mode={state.mode}
            differentiation={state.differentiation}
            quantity={state.quantity}
            entryProgress={state.entryProgress}
            derived={derived}
            onDifferentiation={(value: number) =>
              dispatch({ type: 'SET_DIFFERENTIATION', value })
            }
            onPrice={(price: number) => dispatch({ type: 'SET_PRICE', price })}
            onQuantity={(quantity: number) =>
              dispatch({ type: 'SET_QUANTITY', quantity })
            }
            onEntry={() => dispatch({ type: 'SIMULATE_ENTRY' })}
            onStartQuiz={() => dispatch({ type: 'START_QUIZ' })}
          />
        </>
      )}

      {state.phase === 'quiz' && (
        <QuizPanel
          round={state.quizRound}
          scenario={scenario}
          selected={state.quizSelected}
          answered={state.quizAnswered}
          result={result}
          onSelect={(q: number) => dispatch({ type: 'SELECT_QUIZ_OPTION', q })}
          onCheck={() => dispatch({ type: 'CHECK_QUIZ' })}
          onNext={() => dispatch({ type: 'NEXT_QUIZ' })}
        />
      )}

      {state.phase === 'done' && (
        <SummaryPanel
          score={state.quizScore}
          total={QUIZ_SCENARIOS.length}
          bestProfit={state.labBestProfit}
          onReset={() => dispatch({ type: 'RESET' })}
        />
      )}
    </div>
  );
};
MonopolisticCompetitionGame.displayName = 'MonopolisticCompetitionGame';
