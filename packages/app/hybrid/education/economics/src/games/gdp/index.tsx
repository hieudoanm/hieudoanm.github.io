import type { FC } from 'react';
import { useCallback, useReducer } from 'react';
import {
  ExplorePanel,
  OutputPanel,
  RoundPanel,
  SliderRow,
  SummaryPanel,
} from './components';
import {
  CONSUMPTION_MAX,
  CONSUMPTION_MIN,
  GOVERNMENT_MAX,
  GOVERNMENT_MIN,
  INVESTMENT_MAX,
  INVESTMENT_MIN,
  NET_EXPORTS_MAX,
  NET_EXPORTS_MIN,
  PRICE_INDEX_MAX,
  PRICE_INDEX_MIN,
} from './constants';
import { computeGdp } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { Components } from './types';

export const GdpGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const {
    phase,
    round,
    components,
    priceIndex,
    target,
    lastChecked,
    results,
    solved,
  } = state;
  const actual = computeGdp(components);

  const setComponent = useCallback(
    (key: keyof Components, value: number) =>
      dispatch({ type: 'SET_COMPONENT', key, value }),
    []
  );
  const setPriceIndex = useCallback(
    (value: number) => dispatch({ type: 'SET_PRICE_INDEX', value }),
    []
  );
  const startQuiz = useCallback(() => dispatch({ type: 'START_QUIZ' }), []);
  const check = useCallback(() => dispatch({ type: 'CHECK' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
        <SliderRow
          testId="consumption"
          label="Consumption (C)"
          min={CONSUMPTION_MIN}
          max={CONSUMPTION_MAX}
          value={components.consumption}
          onChange={(value) => setComponent('consumption', value)}
        />
        <SliderRow
          testId="investment"
          label="Investment (I)"
          min={INVESTMENT_MIN}
          max={INVESTMENT_MAX}
          value={components.investment}
          onChange={(value) => setComponent('investment', value)}
        />
        <SliderRow
          testId="government"
          label="Government (G)"
          min={GOVERNMENT_MIN}
          max={GOVERNMENT_MAX}
          value={components.government}
          onChange={(value) => setComponent('government', value)}
        />
        <SliderRow
          testId="net-exports"
          label="Net Exports (NX)"
          min={NET_EXPORTS_MIN}
          max={NET_EXPORTS_MAX}
          value={components.netExports}
          onChange={(value) => setComponent('netExports', value)}
        />
        <SliderRow
          testId="price-index"
          label="Price index (base = 100)"
          min={PRICE_INDEX_MIN}
          max={PRICE_INDEX_MAX}
          value={priceIndex}
          onChange={setPriceIndex}
        />
        <OutputPanel components={components} priceIndex={priceIndex} />
      </div>

      {phase === 'explore' && <ExplorePanel onStart={startQuiz} />}
      {phase === 'round' && (
        <RoundPanel
          round={round}
          target={target}
          actual={actual}
          lastChecked={lastChecked}
          onCheck={check}
        />
      )}
      {phase === 'summary' && (
        <SummaryPanel results={results} solved={solved} onReset={reset} />
      )}
    </div>
  );
};

GdpGame.displayName = 'GdpGame';
