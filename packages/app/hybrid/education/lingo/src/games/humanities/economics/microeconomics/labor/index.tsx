'use client';

import { FC, useCallback, useReducer } from 'react';
import { computeMetrics, equilibriumWage } from './game';
import { TOTAL_QUIZ_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import { ExplorePanel, QuizPanel, RevealPanel, SummaryPanel } from './panels';
import type { CurveKey, LaborCurve } from './types';

const maxWage = (a: number, b: number): number =>
  Math.max(0, Math.floor(b === 0 ? 0 : a / b));

export const LaborMarketLab: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, wMin, a, b, c, d } = state;
  const curve: LaborCurve = { a, b, c, d };
  const metrics = computeMetrics(wMin, curve);

  const onParam = useCallback(
    (key: CurveKey, value: number) =>
      dispatch({ type: 'SET_PARAM', key, value }),
    []
  );
  const onWage = useCallback(
    (value: number) => dispatch({ type: 'SET_WAGE', value }),
    []
  );
  const onPreset = useCallback(
    (id: string) => dispatch({ type: 'LOAD_SCENARIO', id }),
    []
  );
  const startQuiz = useCallback(() => dispatch({ type: 'START_QUIZ' }), []);
  const onCheck = useCallback(
    (index: number) => dispatch({ type: 'ANSWER', index }),
    []
  );
  const onNext = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-primary font-semibold">Labor Market Lab</span>
        <span className="text-base-content/60 text-xs">
          Ld(w) = A − B·w &nbsp;•&nbsp; Ls(w) = C + D·w
        </span>
      </div>

      {phase === 'explore' && (
        <>
          <ExplorePanel
            curve={curve}
            wMin={wMin}
            wageMax={maxWage(a, b)}
            metrics={metrics}
            onParam={onParam}
            onWage={onWage}
            onPreset={onPreset}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={reset}
              data-testid="reset"
              className="btn btn-outline btn-sm">
              Reset
            </button>
            <button
              type="button"
              onClick={startQuiz}
              data-testid="start-quiz"
              className="btn btn-primary btn-sm">
              Take the Quiz
            </button>
          </div>
        </>
      )}

      {phase === 'quiz' && state.scenario && (
        <QuizPanel
          key={state.round}
          round={state.round}
          total={TOTAL_QUIZ_ROUNDS}
          scenario={state.scenario}
          options={state.options}
          onCheck={onCheck}
        />
      )}

      {phase === 'reveal' && state.result && (
        <RevealPanel
          result={state.result}
          wStar={equilibriumWage(curve)}
          round={state.round}
          total={TOTAL_QUIZ_ROUNDS}
          onNext={onNext}
        />
      )}

      {phase === 'done' && (
        <SummaryPanel
          results={state.results}
          score={state.score}
          total={TOTAL_QUIZ_ROUNDS}
          onReset={reset}
        />
      )}
    </div>
  );
};

LaborMarketLab.displayName = 'LaborMarketLab';
