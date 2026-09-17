import { FC, useCallback, useReducer, useState } from 'react';
import {
  ExplorerPanel,
  QuizForm,
  RevealPanel,
  SummaryPanel,
} from './components';
import { TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { Shift } from './types';

export const ISLMExplorer: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [isShift, setIsShift] = useState<Shift | null>(null);
  const [lmShift, setLmShift] = useState<Shift | null>(null);
  const { phase, a, c, b, d, round, current, result, results, score } = state;

  const onAutonomous = useCallback(
    (next: number) => dispatch({ type: 'SET_SLIDERS', a: next, c }),
    [c]
  );
  const onMoney = useCallback(
    (next: number) => dispatch({ type: 'SET_SLIDERS', a, c: next }),
    [a]
  );
  const startQuiz = useCallback(() => dispatch({ type: 'START_QUIZ' }), []);
  const onCheck = useCallback(() => {
    if (!isShift || !lmShift) return;
    dispatch({ type: 'SUBMIT_ANSWER', isShift, lmShift });
  }, [isShift, lmShift]);
  const onNext = useCallback(() => {
    dispatch({ type: 'NEXT_SCENARIO' });
    setIsShift(null);
    setLmShift(null);
  }, []);
  const onReset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setIsShift(null);
    setLmShift(null);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {phase === 'explore' && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-semibold">IS-LM Explorer</span>
            <span>
              Adjust fiscal (a) and monetary (c) to explore equilibrium.
            </span>
          </div>
          <ExplorerPanel
            a={a}
            c={c}
            b={b}
            d={d}
            onAutonomous={onAutonomous}
            onMoney={onMoney}
            onStartQuiz={startQuiz}
          />
        </>
      )}

      {phase === 'quiz' && current && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span>
              Challenge <strong>{round}</strong> / {TOTAL_ROUNDS}
            </span>
            <span>
              Score: <strong>{score}</strong>
            </span>
          </div>
          <QuizForm
            scenario={current}
            isShift={isShift}
            lmShift={lmShift}
            onIs={setIsShift}
            onLm={setLmShift}
            onCheck={onCheck}
          />
        </>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel
          result={result}
          totalRounds={TOTAL_ROUNDS}
          onNext={onNext}
        />
      )}

      {phase === 'done' && (
        <SummaryPanel
          results={results}
          score={score}
          totalRounds={TOTAL_ROUNDS}
          onReset={onReset}
        />
      )}
    </div>
  );
};

ISLMExplorer.displayName = 'ISLMExplorer';
