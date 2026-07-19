import { FC } from 'react';
import { TOTAL_ROUNDS } from './constants';
import type { BubbleAction } from './types';

export const formatCurrency = (n: number): string => {
  const value = Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return n >= 0 ? `$${value}` : `-$${value}`;
};

const Stat: FC<{
  label: string;
  value: string;
  testid: string;
}> = ({ label, value, testid }) => (
  <div className="border-base-300 flex flex-col items-center gap-1 rounded-lg border p-3">
    <span className="text-base-content/60 text-xs tracking-wide uppercase">
      {label}
    </span>
    <span className="text-lg font-bold" data-testid={testid}>
      {value}
    </span>
  </div>
);

export const PriceBoard: FC<{
  round: number;
  price: number;
  fundamental: number;
  cash: number;
  units: number;
  pnl: number;
}> = ({ round, price, fundamental, cash, units, pnl }) => (
  <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
    <Stat label="Round" value={String(round)} testid="round" />
    <Stat label="Price" value={formatCurrency(price)} testid="price" />
    <Stat label="Value" value={formatCurrency(fundamental)} testid="value" />
    <Stat label="Cash" value={formatCurrency(cash)} testid="cash" />
    <Stat label="Units" value={String(units)} testid="position" />
    <Stat label="P/L" value={formatCurrency(pnl)} testid="pnl" />
  </div>
);

export const ActionBar: FC<{
  onAction: (action: BubbleAction) => void;
}> = ({ onAction }) => (
  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      data-testid="buy"
      onClick={() => onAction('buy')}
      className="btn btn-success btn-sm">
      Buy
    </button>
    <button
      type="button"
      data-testid="sell"
      onClick={() => onAction('sell')}
      className="btn btn-error btn-sm">
      Sell
    </button>
    <button
      type="button"
      data-testid="hold"
      onClick={() => onAction('hold')}
      className="btn btn-neutral btn-sm">
      Hold
    </button>
  </div>
);

export const OutcomePanel: FC<{
  round: number;
  price: number;
  lastAction: BubbleAction;
  cash: number;
  units: number;
  pnl: number;
  onNext: () => void;
}> = ({ round, price, lastAction, cash, units, pnl, onNext }) => {
  const emoji =
    lastAction === 'buy' ? '🛒' : lastAction === 'sell' ? '💰' : '🤝';
  return (
    <div className="flex flex-col items-center gap-3 pt-4">
      <div className="text-3xl">{emoji}</div>
      <p className="text-sm">
        Round {round} traded at {formatCurrency(price)}. You chose{' '}
        <strong>{lastAction}</strong>.
      </p>
      <div className="flex gap-6 text-sm">
        <span>
          Cash: <strong>{formatCurrency(cash)}</strong>
        </span>
        <span>
          Units: <strong>{units}</strong>
        </span>
        <span>
          P/L: <strong>{formatCurrency(pnl)}</strong>
        </span>
      </div>
      <button
        type="button"
        onClick={onNext}
        data-testid="next"
        className="btn btn-primary btn-sm">
        {round >= TOTAL_ROUNDS ? 'See Result' : 'Next Round'}
      </button>
    </div>
  );
};

export const EpisodeSummary: FC<{
  episode: number;
  fundamental: number;
  score: number;
  onNext: () => void;
}> = ({ episode, fundamental, score, onNext }) => (
  <div className="flex flex-col items-center gap-3 pt-4">
    <div className="text-3xl">📊</div>
    <p className="text-sm">
      Episode {episode} (value {formatCurrency(fundamental)}) complete.
    </p>
    <p className="text-sm">
      Final wealth: <strong>{formatCurrency(score)}</strong>
    </p>
    <button
      type="button"
      onClick={onNext}
      data-testid="next-episode"
      className="btn btn-primary btn-sm">
      Next Episode
    </button>
  </div>
);

export const ResultsPanel: FC<{
  scores: number[];
  startingCash: number;
  onReset: () => void;
}> = ({ scores, startingCash, onReset }) => {
  const total = scores.reduce((sum, score) => sum + score, 0);
  const benchmark = scores.length * startingCash;
  const delta = total - benchmark;
  return (
    <div
      className="flex flex-col items-center gap-3 pt-4"
      data-testid="results">
      <div className="text-4xl">💥</div>
      <div className="text-lg">Bubble Lab results</div>
      <div className="flex flex-col gap-1 text-center text-sm">
        {scores.map((score, index) => (
          <span key={index}>
            Episode {index + 1}: {formatCurrency(score)}
          </span>
        ))}
        <span>
          Total: <strong>{formatCurrency(total)}</strong>
        </span>
        <span>
          vs holding cash:{' '}
          <strong data-testid="pnl">{formatCurrency(delta)}</strong>
        </span>
      </div>
      <button
        type="button"
        onClick={onReset}
        data-testid="reset"
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};
