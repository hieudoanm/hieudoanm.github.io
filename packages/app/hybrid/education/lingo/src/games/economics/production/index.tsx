import { FC, useCallback, useMemo, useReducer } from 'react';
import { LabControls, ProfitCheck } from './components';
import { MAX_LABOR, TOTAL_QUIZ_ROUNDS } from './constants';
import { CostCurvesSvg } from './curves';
import { buildCostSchedule, getQuizQuestions, profitMaxQ } from './game';
import { CostTable, MetricsCards } from './metrics';
import { QuizPanel, ResultsPanel } from './quiz';
import { createInitialState, gameReducer } from './reducer';

export const ProductionGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    labor,
    wage,
    fixedCost,
    price,
    targetQ,
    checkResult,
    quizIndex,
    selected,
    quizResults,
    score,
  } = state;

  const rows = useMemo(
    () => buildCostSchedule(labor, wage, fixedCost),
    [labor, wage, fixedCost]
  );
  const currentRow = rows[labor];
  const profitMax = useMemo(
    () => profitMaxQ(buildCostSchedule(MAX_LABOR, wage, fixedCost), price),
    [wage, fixedCost, price]
  );

  const setLabor = useCallback(
    (value: number) => dispatch({ type: 'SET_LABOR', value }),
    []
  );
  const setWage = useCallback(
    (value: number) => dispatch({ type: 'SET_WAGE', value }),
    []
  );
  const setFixedCost = useCallback(
    (value: number) => dispatch({ type: 'SET_FIXED_COST', value }),
    []
  );
  const setPrice = useCallback(
    (value: number) => dispatch({ type: 'SET_PRICE', value }),
    []
  );
  const setTarget = useCallback(
    (value: string) => dispatch({ type: 'SET_TARGET_Q', value }),
    []
  );
  const checkProfit = useCallback(() => dispatch({ type: 'CHECK_PROFIT' }), []);
  const startQuiz = useCallback(() => dispatch({ type: 'START_QUIZ' }), []);
  const checkAnswer = useCallback(
    (index: number) => dispatch({ type: 'CHECK_ANSWER', selected: index }),
    []
  );
  const nextQuiz = useCallback(() => dispatch({ type: 'NEXT_QUIZ' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      {phase === 'lab' && (
        <>
          <LabControls
            labor={labor}
            wage={wage}
            fixedCost={fixedCost}
            price={price}
            onLabor={setLabor}
            onWage={setWage}
            onFixedCost={setFixedCost}
            onPrice={setPrice}
            onReset={reset}
          />
          <MetricsCards
            row={currentRow}
            price={price}
            profitMaxQ={profitMax?.Q ?? 0}
          />
          <ProfitCheck
            targetQ={targetQ}
            checkResult={checkResult}
            onTarget={setTarget}
            onCheck={checkProfit}
          />
          <div className="card border-base-content/10 border p-4">
            <h2 className="mb-2 text-sm font-semibold">
              Cost curves (MC crosses ATC and AVC at their minimums)
            </h2>
            <CostCurvesSvg rows={rows} />
          </div>
          <div className="card border-base-content/10 border p-4">
            <h2 className="mb-2 text-sm font-semibold">
              Short-run production &amp; cost table
            </h2>
            <CostTable rows={rows} />
          </div>
          <button
            type="button"
            data-testid="start-quiz"
            onClick={startQuiz}
            className="btn btn-primary btn-sm self-start">
            Take the Quiz
          </button>
        </>
      )}

      {phase === 'quiz' && (
        <div className="flex w-full flex-col items-center gap-4">
          <div className="self-start text-sm">
            Quiz score: <strong>{score}</strong> / {TOTAL_QUIZ_ROUNDS}
          </div>
          <QuizPanel
            question={getQuizQuestions()[quizIndex]}
            round={quizIndex + 1}
            total={TOTAL_QUIZ_ROUNDS}
            selected={selected}
            onCheck={checkAnswer}
            onNext={nextQuiz}
          />
        </div>
      )}

      {phase === 'done' && (
        <ResultsPanel score={score} total={TOTAL_QUIZ_ROUNDS} onReset={reset} />
      )}
    </div>
  );
};

ProductionGame.displayName = 'ProductionGame';
