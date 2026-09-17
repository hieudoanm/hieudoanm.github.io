import { FC, useCallback, useReducer } from 'react';
import { TOTAL_QUIZ_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import { DecisionPanel, MacroPanel, QuizPanel, ResultsPanel } from './panels';
import {
  ActionButton,
  formatCurrency,
  formatPercent,
  Slider,
} from './components';
import type { QuizAnswer } from './types';

const ControlsPanel: FC<{
  originWage: number;
  destWage: number;
  movingCost: number;
  jobProb: number;
  migrantCount: number;
  onSetOrigin: (v: number) => void;
  onSetDest: (v: number) => void;
  onSetCost: (v: number) => void;
  onSetProb: (v: number) => void;
  onSetMigrantCount: (v: number) => void;
  onCompute: () => void;
  onSimulate: () => void;
  onStartQuiz: () => void;
}> = ({
  originWage,
  destWage,
  movingCost,
  jobProb,
  migrantCount,
  onSetOrigin,
  onSetDest,
  onSetCost,
  onSetProb,
  onSetMigrantCount,
  onCompute,
  onSimulate,
  onStartQuiz,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
    <Slider
      testid="origin-wage"
      label="Origin wage (W0)"
      value={originWage}
      min={20000}
      max={60000}
      step={1000}
      display={formatCurrency(originWage)}
      onChange={onSetOrigin}
    />
    <Slider
      testid="destination-wage"
      label="Destination wage (W1)"
      value={destWage}
      min={30000}
      max={80000}
      step={1000}
      display={formatCurrency(destWage)}
      onChange={onSetDest}
    />
    <Slider
      testid="moving-cost"
      label="Moving cost (M)"
      value={movingCost}
      min={2000}
      max={15000}
      step={500}
      display={formatCurrency(movingCost)}
      onChange={onSetCost}
    />
    <Slider
      testid="job-probability"
      label="Job probability (p)"
      value={jobProb}
      min={0.7}
      max={1.0}
      step={0.05}
      display={formatPercent(jobProb)}
      onChange={onSetProb}
    />
    <Slider
      testid="migrant-count"
      label="Initial migrants"
      value={migrantCount}
      min={0}
      max={60}
      step={5}
      display={String(migrantCount)}
      onChange={onSetMigrantCount}
    />
    <div className="flex flex-wrap gap-2">
      <ActionButton testid="compute" onClick={onCompute}>
        Evaluate Decision
      </ActionButton>
      <ActionButton
        testid="simulate"
        onClick={onSimulate}
        className="btn btn-secondary btn-sm">
        Run Macro
      </ActionButton>
      <ActionButton
        testid="quiz"
        onClick={onStartQuiz}
        className="btn btn-accent btn-sm">
        Start Quiz
      </ActionButton>
    </div>
  </div>
);

export const MigrationGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);

  const onSetOrigin = useCallback(
    (value: number) => dispatch({ type: 'SET_ORIGIN_WAGE', value }),
    []
  );
  const onSetDest = useCallback(
    (value: number) => dispatch({ type: 'SET_DEST_WAGE', value }),
    []
  );
  const onSetCost = useCallback(
    (value: number) => dispatch({ type: 'SET_MOVING_COST', value }),
    []
  );
  const onSetProb = useCallback(
    (value: number) => dispatch({ type: 'SET_JOB_PROB', value }),
    []
  );
  const onSetMigrantCount = useCallback(
    (value: number) => dispatch({ type: 'SET_MIGRANT_COUNT', value }),
    []
  );
  const onCompute = useCallback(
    () => dispatch({ type: 'COMPUTE_DECISION' }),
    []
  );
  const onSimulate = useCallback(
    () => dispatch({ type: 'SIMULATE_MACRO' }),
    []
  );
  const onStartQuiz = useCallback(() => dispatch({ type: 'START_QUIZ' }), []);
  const onReset = useCallback(() => dispatch({ type: 'RESET' }), []);
  const onAnswer = useCallback(
    (answer: QuizAnswer) => dispatch({ type: 'ANSWER_QUIZ', answer }),
    []
  );
  const onNext = useCallback(() => dispatch({ type: 'NEXT_QUIZ' }), []);

  return (
    <div className="flex flex-col gap-4">
      {state.phase !== 'quiz' && state.phase !== 'done' && (
        <ControlsPanel
          originWage={state.originWage}
          destWage={state.destWage}
          movingCost={state.movingCost}
          jobProb={state.jobProb}
          migrantCount={state.migrantCount}
          onSetOrigin={onSetOrigin}
          onSetDest={onSetDest}
          onSetCost={onSetCost}
          onSetProb={onSetProb}
          onSetMigrantCount={onSetMigrantCount}
          onCompute={onCompute}
          onSimulate={onSimulate}
          onStartQuiz={onStartQuiz}
        />
      )}
      {state.phase === 'result' && state.decision && (
        <DecisionPanel
          npv={state.decision.npv}
          shouldMove={state.decision.shouldMove}
          expectedMove={state.decision.expectedIncomeMove}
          expectedStay={state.decision.expectedIncomeStay}
          onReset={onReset}
        />
      )}
      {state.phase === 'result' && state.macro && (
        <MacroPanel
          equilibriumWage={state.macro.equilibriumWage}
          nativeWage={state.macro.nativeWage}
          migrantCount={state.macro.migrantCount}
          immigrantSurplus={state.macro.immigrantSurplus}
          onReset={onReset}
        />
      )}
      {state.phase === 'quiz' && (
        <QuizPanel
          quizRound={state.quizRound}
          params={state.quizParams}
          quizAnswer={state.quizAnswer}
          onAnswer={onAnswer}
          onNext={onNext}
        />
      )}
      {state.phase === 'done' && (
        <ResultsPanel
          correctCount={state.correctCount}
          total={TOTAL_QUIZ_ROUNDS}
          onReset={onReset}
        />
      )}
    </div>
  );
};

MigrationGame.displayName = 'MigrationGame';
