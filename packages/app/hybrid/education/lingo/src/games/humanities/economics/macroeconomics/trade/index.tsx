'use client';

import { FC, useCallback, useMemo, useReducer, useState } from 'react';
import { RetaliationPanel } from './retaliation';
import { ChallengePanel, LabPanel, RevealPanel, SummaryPanel } from './panels';
import { LAB_MARKET } from './constants';
import { analyze } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { Market } from './types';

export const TradeGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [pending, setPending] = useState<number | null>(null);
  const {
    phase,
    worldPrice,
    tariff,
    spec,
    round,
    result,
    results,
    totalScore,
    myTariff,
    otherTariff,
  } = state;

  const market = useMemo<Market>(
    () => ({ ...LAB_MARKET, worldP: worldPrice }),
    [worldPrice]
  );
  const analysis = useMemo(() => analyze(market, tariff), [market, tariff]);

  const setWorldPrice = useCallback(
    (value: number) => dispatch({ type: 'SET_WORLD_PRICE', value }),
    []
  );
  const setTariff = useCallback(
    (value: number) => dispatch({ type: 'SET_TARIFF', value }),
    []
  );
  const setMyTariff = useCallback(
    (value: number) => dispatch({ type: 'SET_MY_TARIFF', value }),
    []
  );
  const setOtherTariff = useCallback(
    (value: number) => dispatch({ type: 'SET_OTHER_TARIFF', value }),
    []
  );
  const start = useCallback(() => {
    setPending(null);
    dispatch({ type: 'START_ROUNDS' });
  }, []);
  const submit = useCallback(() => {
    if (pending === null) return;
    setPending(null);
    dispatch({ type: 'SUBMIT_CHOICE', tariff: pending });
  }, [pending]);
  const checkRetaliation = useCallback(
    () => dispatch({ type: 'SUBMIT_RETALIATION' }),
    []
  );
  const next = useCallback(() => {
    setPending(null);
    dispatch({ type: 'NEXT_ROUND' });
  }, []);
  const reset = useCallback(() => {
    setPending(null);
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {phase === 'explore' && (
        <LabPanel
          market={market}
          analysis={analysis}
          tariff={tariff}
          onWorldPrice={setWorldPrice}
          onTariff={setTariff}
          onStart={start}
          onReset={reset}
        />
      )}
      {phase === 'challenge' &&
        (spec.kind === 'retaliation' ? (
          <RetaliationPanel
            my={myTariff}
            other={otherTariff}
            onMy={setMyTariff}
            onOther={setOtherTariff}
            onCheck={checkRetaliation}
          />
        ) : (
          <ChallengePanel
            round={round}
            spec={spec}
            pending={pending}
            onSelect={setPending}
            onCheck={submit}
          />
        ))}
      {phase === 'reveal' && result && (
        <RevealPanel
          result={result}
          my={myTariff}
          other={otherTariff}
          isRetaliation={result.kind === 'retaliation'}
          onNext={next}
        />
      )}
      {phase === 'done' && (
        <SummaryPanel
          results={results}
          totalScore={totalScore}
          onReset={reset}
        />
      )}
    </div>
  );
};

TradeGame.displayName = 'TradeGame';
