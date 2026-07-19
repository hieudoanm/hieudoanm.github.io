import { FC, useCallback, useReducer, useState } from 'react';
import { BOTS, FORMATS, FORMAT_ORDER, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import { PLAYER_ID } from './constants';
import type { AuctionFormat } from './types';

const formatCurrency = (n: number): string => `$${n.toLocaleString('en-US')}`;

const formatPrice = (n: number): string =>
  n >= 0 ? `+$${n}` : `-$${Math.abs(n)}`;

const RevealPanel: FC<{
  round: number;
  format: AuctionFormat;
  trueValue: number;
  winner: string;
  price: number;
  payoff: number;
  bids: Record<string, number>;
  onNext: () => void;
}> = ({ round, format, trueValue, winner, price, payoff, bids, onNext }) => {
  const won = winner === PLAYER_ID;
  const cursed = won && payoff < 0;
  const entries = Object.entries(bids).sort(([, a], [, b]) => b - a);
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-3xl">{won ? '🎉' : '🤖'}</div>
      <div className="text-lg">
        {won
          ? 'You won the auction!'
          : `${BOTS.find((b) => b.id === winner)?.emoji} won the auction`}
      </div>
      <div className="flex flex-col gap-1 text-center text-sm">
        <span>
          Item value: <strong>{formatCurrency(trueValue)}</strong>
        </span>
        <span>
          Winning bid: <strong>{formatCurrency(price)}</strong>
        </span>
        {won && (
          <span className={cursed ? 'text-error' : 'text-success'}>
            Your profit: <strong>{formatPrice(payoff)}</strong>
            {cursed && <span className="ml-2">— winner’s curse!</span>}
          </span>
        )}
      </div>
      <div className="border-base-300 w-full max-w-sm rounded-lg border p-3 text-sm">
        {entries.map(([id, bid], index) => (
          <div
            key={id}
            className="border-base-200 flex items-center justify-between border-b py-1 last:border-0">
            <span className="flex items-center gap-1">
              {id === PLAYER_ID
                ? '🙋 You'
                : `${BOTS.find((b) => b.id === id)?.emoji} ${BOTS.find((b) => b.id === id)?.name}`}
              {id === winner && (
                <span className="text-xs">{won ? '🏆' : '🤖'}</span>
              )}
            </span>
            <span>
              {formatCurrency(bid)}
              {index === 0 && (
                <span className="ml-1 text-sm">
                  ←{won ? 'winning' : 'top'} bid
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
      <span className="text-base-content/60 text-xs">
        {FORMATS[format].label}: {FORMATS[format].description}
      </span>
      <button type="button" onClick={onNext} className="btn btn-primary btn-sm">
        {round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
      </button>
    </div>
  );
};

export const AuctionGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [amount, setAmount] = useState<string>('');
  const { phase, round, format, playerEstimate, result, results, totalProfit } =
    state;

  const pickFormat = useCallback(
    (next: AuctionFormat) => dispatch({ type: 'START_ROUND', format: next }),
    []
  );
  const submitBid = useCallback(() => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 0) return;
    dispatch({ type: 'SUBMIT_BID', amount: Math.round(value) });
  }, [amount]);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setAmount('');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Auction <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          Your profit so far: <strong>{formatPrice(totalProfit)}</strong>
        </span>
      </div>

      {phase === 'choose' && !format && (
        <div>
          <p className="text-base-content/60 mb-2 text-sm">
            Choose an auction format:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {FORMAT_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => pickFormat(id)}
                data-testid={`format-${id}`}
                className="card border-base-content/10 border p-3 text-left transition-colors">
                <span className="text-lg">
                  {FORMATS[id].emoji} {FORMATS[id].label}
                </span>
                <span className="text-base-content/60 block text-xs">
                  {FORMATS[id].description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'choose' && format && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            Your private estimate of the item’s value:{' '}
            <strong className="text-primary">
              {formatCurrency(playerEstimate)}
            </strong>
          </p>
          <p className="text-base-content/60 text-xs">
            This estimate is noisy — the true value is hidden. In a Vickrey
            auction, bidding exactly your estimate is your best strategy.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {[
              playerEstimate,
              Math.round(playerEstimate * 0.8),
              Math.round(playerEstimate * 0.6),
            ].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(String(v))}
                data-testid={`quick-bid-${v}`}
                className="btn btn-sm">
                {formatCurrency(v)}
              </button>
            ))}
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-testid="bid-input"
              placeholder="Custom bid"
              className="input input-sm input-bordered w-28"
            />
            <button
              type="button"
              onClick={submitBid}
              data-testid="submit-bid"
              className="btn btn-primary btn-sm">
              Place Bid
            </button>
          </div>
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel
          round={round}
          format={result.format}
          trueValue={result.trueValue}
          winner={result.winner}
          price={result.price}
          payoff={result.playerPayoff}
          bids={result.bids}
          onNext={nextRound}
        />
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-4xl">📊</div>
          <div className="text-lg">Auction results</div>
          <div className="flex gap-6 text-sm">
            <span>
              Your profit: <strong>{formatPrice(totalProfit)}</strong>
            </span>
            <span>
              Auctions won:{' '}
              <strong>
                {results.filter((r) => r.winner === PLAYER_ID).length} /{' '}
                {TOTAL_ROUNDS}
              </strong>
            </span>
          </div>
          <button
            type="button"
            onClick={reset}
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
AuctionGame.displayName = 'AuctionGame';
