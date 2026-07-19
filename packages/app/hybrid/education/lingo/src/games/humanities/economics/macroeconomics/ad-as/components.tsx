import type { FC } from 'react';
import { GAP_OPTIONS, PRICE_OPTIONS } from './constants';
import type { GapSign, PriceDirection, RoundResult } from './types';

export const formatPrice = (n: number): string => n.toFixed(1);

export const formatGap = (n: number): string =>
  `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;

export const PredictionForm: FC<{
  gapPick: GapSign | null;
  pricePick: PriceDirection | null;
  onGap: (next: GapSign) => void;
  onPrice: (next: PriceDirection) => void;
  onSubmit: () => void;
}> = ({ gapPick, pricePick, onGap, onPrice, onSubmit }) => {
  const ready = gapPick !== null && pricePick !== null;
  return (
    <div className="card border-base-content/10 flex flex-col gap-4 border p-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Short-run output gap</p>
        <div className="grid grid-cols-3 gap-2">
          {GAP_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              data-testid={`gap-${option.value}`}
              onClick={() => onGap(option.value)}
              className={`btn btn-sm ${gapPick === option.value ? 'btn-primary' : ''}`}>
              {option.emoji} {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Price level vs last round</p>
        <div className="grid grid-cols-3 gap-2">
          {PRICE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              data-testid={`price-${option.value}`}
              onClick={() => onPrice(option.value)}
              className={`btn btn-sm ${pricePick === option.value ? 'btn-primary' : ''}`}>
              {option.emoji} {option.label}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        data-testid="submit-predictions"
        onClick={onSubmit}
        disabled={!ready}
        className="btn btn-primary btn-sm self-center">
        Reveal the Shock
      </button>
    </div>
  );
};

export const RevealPanel: FC<{
  result: RoundResult;
  totalRounds: number;
  onNext: () => void;
}> = ({ result, totalRounds, onNext }) => {
  const bothCorrect = result.gapCorrect && result.priceCorrect;
  return (
    <div
      data-testid="reveal-panel"
      className="card border-base-content/10 flex flex-col items-center gap-3 border p-4">
      <div className="text-3xl">{bothCorrect ? '🎯' : '📊'}</div>
      <p className="text-sm">
        Round {result.round}: the AD factor was {result.a}.
      </p>
      <div className="grid w-full max-w-sm grid-cols-2 gap-2 text-sm">
        <span data-testid="reveal-short-run-price">
          Short-run price: <strong>{formatPrice(result.shortRunPrice)}</strong>
        </span>
        <span data-testid="reveal-short-run-output">
          Short-run output:{' '}
          <strong>{formatPrice(result.shortRunOutput)}</strong>
        </span>
        <span data-testid="reveal-gap">
          Output gap: <strong>{formatGap(result.gapPercent)}</strong>
        </span>
        <span data-testid="reveal-long-run-price">
          Long-run price: <strong>{formatPrice(result.longRunPrice)}</strong>
        </span>
      </div>
      <div className="text-sm">
        Gap prediction: {result.gapCorrect ? '✅ correct' : '❌ wrong'} · Price
        prediction: {result.priceCorrect ? '✅ correct' : '❌ wrong'}
      </div>
      <p className="text-base-content/60 text-xs">
        In the long run the price settles at{' '}
        <strong>{formatPrice(result.longRunPrice)}</strong> and output returns
        to <strong>100</strong>.
      </p>
      <span data-testid="reveal-points" className="text-sm">
        You scored <strong>{result.points} / 2</strong> this round.
      </span>
      <button
        type="button"
        data-testid="next-round"
        onClick={onNext}
        className="btn btn-primary btn-sm">
        {result.round >= totalRounds ? 'See Summary' : 'Next Shock'}
      </button>
    </div>
  );
};

export const SummaryPanel: FC<{
  rounds: RoundResult[];
  score: number;
  totalRounds: number;
  onReset: () => void;
}> = ({ rounds, score, totalRounds, onReset }) => {
  const deepest = rounds.reduce((best, r) =>
    r.gapPercent < best.gapPercent ? r : best
  );
  const biggest = rounds.reduce((best, r) =>
    r.gapPercent > best.gapPercent ? r : best
  );
  return (
    <div className="card border-base-content/10 flex flex-col items-center gap-3 border p-4">
      <div className="text-3xl">🏁</div>
      <p className="text-lg">Lab complete</p>
      <div className="flex gap-6 text-sm">
        <span data-testid="summary-deepest">
          Deepest recession: <strong>Round {deepest.round}</strong> (
          {formatGap(deepest.gapPercent)})
        </span>
        <span data-testid="summary-boom">
          Biggest boom: <strong>Round {biggest.round}</strong> (
          {formatGap(biggest.gapPercent)})
        </span>
      </div>
      <span data-testid="summary-score" className="text-sm">
        Final score:{' '}
        <strong>
          {score} / {totalRounds * 2}
        </strong>
      </span>
      <p className="text-base-content/60 max-w-md text-center text-sm">
        The lesson: demand shocks move output and prices in the short run, but
        in the long run output returns to potential and prices do the adjusting
        — the menu of adjustment.
      </p>
      <button
        type="button"
        data-testid="play-again"
        onClick={onReset}
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};
