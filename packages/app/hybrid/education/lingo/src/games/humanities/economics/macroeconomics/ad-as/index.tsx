import { FC, useCallback, useReducer, useState } from 'react';
import { PredictionForm, RevealPanel, SummaryPanel } from './components';
import { TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { GapSign, PriceDirection } from './types';

export const AggregateDemandGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [gapPick, setGapPick] = useState<GapSign | null>(null);
  const [pricePick, setPricePick] = useState<PriceDirection | null>(null);
  const { phase, round, result, rounds, score } = state;

  const onSubmit = useCallback(() => {
    if (!gapPick || !pricePick) return;
    dispatch({ type: 'SUBMIT_PREDICTIONS', gap: gapPick, price: pricePick });
  }, [gapPick, pricePick]);

  const onNext = useCallback(() => {
    dispatch({ type: 'NEXT_ROUND' });
    setGapPick(null);
    setPricePick(null);
  }, []);

  const onReset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setGapPick(null);
    setPricePick(null);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Shock <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Score: <strong>{score}</strong>
        </span>
      </div>
      {phase === 'predict' && (
        <PredictionForm
          gapPick={gapPick}
          pricePick={pricePick}
          onGap={setGapPick}
          onPrice={setPricePick}
          onSubmit={onSubmit}
        />
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
          rounds={rounds}
          score={score}
          totalRounds={TOTAL_ROUNDS}
          onReset={onReset}
        />
      )}
    </div>
  );
};

AggregateDemandGame.displayName = 'AggregateDemandGame';
