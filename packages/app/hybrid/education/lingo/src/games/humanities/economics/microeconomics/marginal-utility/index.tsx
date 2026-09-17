'use client';

import { FC, useCallback, useReducer } from 'react';
import { ACCEPT_SCORE, SCENARIOS } from './constants';
import {
  affordableNext,
  budgetUsed,
  isOptimal,
  lastMU,
  optimalBundle,
  totalUtility,
} from './game';
import { createInitialState, gameReducer } from './reducer';
import { LabControls, ModePicker } from './components';
import { AllocationBoard, GoodData, HistoryPanel, ResultBanner } from './lab';
import { ChallengeBoard, ChallengeSummary } from './challenge';
import type { Good, Mode } from './types';

const buildGoodData = (
  good: Good,
  count: number,
  lastMU: number,
  canBuy: boolean,
  canSell: boolean,
  price: number
): GoodData => {
  const isApple = good === 'apple';
  return {
    emoji: isApple ? '🍎' : '🍪',
    label: isApple ? 'Apples' : 'Cookies',
    kind: good,
    count,
    countTestid: isApple ? 'apples' : 'cookies',
    lastMU,
    muTestid: isApple ? 'mu-apple' : 'mu-cookie',
    muPerDollar: lastMU / price,
    muPerDollarTestid: isApple ? 'mu-p-apple' : 'mu-p-cookie',
    buyTestid: isApple ? 'buy-apple' : 'buy-cookie',
    sellTestid: isApple ? 'sell-apple' : 'sell-cookie',
    canBuy,
    canSell,
  };
};

export const MarginalUtilityLab: FC = () => {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialState
  );
  const {
    mode,
    phase,
    pa,
    pc,
    income,
    apples,
    cookies,
    result,
    history,
    round,
    selected,
    challengeResult,
    totalCorrect,
  } = state;

  const setMode = useCallback(
    (value: Mode) => dispatch({ type: 'SET_MODE', mode: value }),
    []
  );
  const setPrice = useCallback(
    (good: Good, value: number) => dispatch({ type: 'SET_PRICE', good, value }),
    []
  );
  const setIncome = useCallback(
    (value: number) => dispatch({ type: 'SET_INCOME', value }),
    []
  );
  const buy = useCallback((good: Good) => dispatch({ type: 'BUY', good }), []);
  const sell = useCallback(
    (good: Good) => dispatch({ type: 'SELL', good }),
    []
  );
  const check = useCallback(() => dispatch({ type: 'CHECK' }), []);
  const setOption = useCallback(
    (index: number) => dispatch({ type: 'SET_OPTION', index }),
    []
  );
  const submitChallenge = useCallback(
    () => dispatch({ type: 'SUBMIT_CHALLENGE' }),
    []
  );
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  const optimal = optimalBundle(pa, pc, income);
  const optimalUtility = totalUtility(optimal.apples, optimal.cookies);
  const currentUtility = totalUtility(apples, cookies);
  const last = lastMU(apples, cookies);
  const spent = budgetUsed(apples, cookies, pa, pc);
  const success = result !== null && result.score >= ACCEPT_SCORE;
  const scenario = SCENARIOS[round - 1];
  const perfect = isOptimal(apples, cookies, pa, pc, income);

  return (
    <div className="flex flex-col gap-4">
      <ModePicker mode={mode} onChange={setMode} />

      {mode === 'lab' && (
        <>
          <LabControls
            pa={pa}
            pc={pc}
            income={income}
            onPrice={setPrice}
            onIncome={setIncome}
          />
          <AllocationBoard
            apples={buildGoodData(
              'apple',
              apples,
              last.apple,
              affordableNext('apple', apples, cookies, pa, pc, income),
              apples > 0,
              pa
            )}
            cookies={buildGoodData(
              'cookie',
              cookies,
              last.cookie,
              affordableNext('cookie', apples, cookies, pa, pc, income),
              cookies > 0,
              pc
            )}
            income={income}
            spent={spent}
            totalUtility={currentUtility}
            optimalUtility={optimalUtility}
            onBuy={buy}
            onSell={sell}
            onCheck={check}
            onReset={reset}
          />
          {result && (
            <ResultBanner
              score={result.score}
              success={success}
              optimal={result.optimal}
            />
          )}
          {perfect && (
            <p className="text-success text-center text-xs">
              Your current allocation equals the utility-maximizing bundle.
            </p>
          )}
          <HistoryPanel entries={history} />
        </>
      )}

      {mode === 'challenge' && phase !== 'done' && (
        <ChallengeBoard
          round={round}
          scenario={scenario}
          selected={selected}
          result={challengeResult}
          phase={phase}
          onSelect={setOption}
          onSubmit={submitChallenge}
          onNext={nextRound}
          onReset={reset}
        />
      )}

      {mode === 'challenge' && phase === 'done' && (
        <ChallengeSummary totalCorrect={totalCorrect} onReset={reset} />
      )}
    </div>
  );
};

MarginalUtilityLab.displayName = 'MarginalUtilityLab';
