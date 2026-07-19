import { FC, useCallback, useReducer, useState } from 'react';
import {
  BenchmarkPanel,
  DemandPanel,
  DualPricePanel,
  ModePicker,
  RoundBadge,
  SinglePricePanel,
  formatProfit,
} from './components';
import { ResultsPanel, RevealPanel } from './panels';
import { roundFlipped } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { Mode } from './types';

export const SplitPricingGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [error, setError] = useState<string | null>(null);
  const {
    phase,
    round,
    mode,
    price,
    priceB,
    priceL,
    result,
    totalProfit,
    pdTotal,
  } = state;

  const pickMode = useCallback((next: Mode) => {
    dispatch({ type: 'SET_MODE', mode: next });
    setError(null);
  }, []);

  const setSingle = useCallback((value: string) => {
    dispatch({ type: 'SET_PRICE', value });
    setError(null);
  }, []);

  const setBusiness = useCallback((value: string) => {
    dispatch({ type: 'SET_PRICE_B', value });
    setError(null);
  }, []);

  const setLeisure = useCallback((value: string) => {
    dispatch({ type: 'SET_PRICE_L', value });
    setError(null);
  }, []);

  const submit = useCallback(() => {
    const raw = mode === 'single' ? [price] : [priceB, priceL];
    const prices = raw.map((value) => Math.round(Number(value)));
    if (!prices.every((n) => Number.isFinite(n) && n >= 1)) {
      setError('Enter a price of at least 1 first.');
      return;
    }
    dispatch({ type: 'SUBMIT' });
    setError(null);
  }, [mode, price, priceB, priceL]);

  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setError(null);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <RoundBadge round={round} />
        <span>
          Profit so far:{' '}
          <strong data-testid="profit-so-far">
            {formatProfit(totalProfit)}
          </strong>
        </span>
      </div>

      {phase === 'choose' && (
        <div className="flex flex-col gap-3">
          <DemandPanel round={round} />
          <ModePicker mode={mode} onPick={pickMode} />
          {mode === 'single' ? (
            <SinglePricePanel
              price={price}
              onChange={setSingle}
              onSubmit={submit}
            />
          ) : (
            <DualPricePanel
              priceB={priceB}
              priceL={priceL}
              onChangeB={setBusiness}
              onChangeL={setLeisure}
              onSubmit={submit}
            />
          )}
          {error && (
            <p className="text-error text-xs" data-testid="submit-error">
              {error}
            </p>
          )}
          <BenchmarkPanel flipped={roundFlipped(round)} />
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel result={result} onNext={nextRound} />
      )}

      {phase === 'done' && (
        <ResultsPanel
          totalProfit={totalProfit}
          pdTotal={pdTotal}
          onReset={reset}
        />
      )}
    </div>
  );
};

SplitPricingGame.displayName = 'SplitPricingGame';
