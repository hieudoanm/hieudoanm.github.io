import { FC } from 'react';
import { MARKET_TRADES, STARTING_CAPITAL, TRAINER_CLAIMED } from './constants';
import type { MarketOutcome } from './types';

export const MarketCard: FC<{
  actual: number;
  position: number;
  onPosition: (n: number) => void;
  onSubmit: () => void;
}> = ({ actual, position, onPosition, onSubmit }) => (
  <div
    data-testid="market"
    className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <h2 className="text-primary text-lg font-bold">The Trader&rsquo;s Bet</h2>
    <p className="text-base-content/60 text-sm">
      You feel {TRAINER_CLAIMED}% sure of your edge, but your quiz calibration
      showed you were only right {actual}% of the time. Size a position anyway.
    </p>
    <label className="text-sm">
      Position size (% of {STARTING_CAPITAL} capital):
    </label>
    <input
      type="range"
      min={0}
      max={100}
      value={position}
      data-testid="trader-position"
      onChange={(e) => onPosition(Number(e.target.value))}
      className="range range-primary"
    />
    <div className="text-lg font-bold">{position}%</div>
    <button
      type="button"
      data-testid="next"
      onClick={onSubmit}
      className="btn btn-primary btn-sm self-start">
      Place the Trade
    </button>
  </div>
);

export const MarketResultCard: FC<{
  outcome: MarketOutcome;
  onNext: () => void;
}> = ({ outcome, onNext }) => (
  <div
    data-testid="market-result"
    className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <h2 className="text-primary text-lg font-bold">
      {outcome.overconfident ? 'Blow-up Risk' : 'Fair Pricing'}
    </h2>
    <p className="text-sm">
      Claimed confidence: <strong>{outcome.claimed}%</strong> vs real accuracy:{' '}
      <strong>{outcome.actual}%</strong>.
    </p>
    <p className="text-sm">
      Sizing for your claimed edge you expected +{outcome.evClaimed} per trade,
      but reality gives +{outcome.evActual}.
    </p>
    <p className="text-sm">
      Expected capital after {MARKET_TRADES} trades at this size:{' '}
      <strong>{`$${outcome.bankroll.toFixed(0)}`}</strong>
      {outcome.overconfident && (
        <span className="text-error ml-2">
          &mdash; overconfident traders size up on a false edge.
        </span>
      )}
    </p>
    <button
      type="button"
      data-testid="next"
      onClick={onNext}
      className="btn btn-primary btn-sm self-start">
      Estimate a Range
    </button>
  </div>
);
