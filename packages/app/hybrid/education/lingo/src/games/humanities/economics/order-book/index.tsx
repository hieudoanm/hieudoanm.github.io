import { FC, useCallback, useReducer } from 'react';
import { ACTION_ORDER, DEPTH, LIMIT_PRICE, TOTAL_ROUNDS } from './constants';
import { askFor, bidFor, pnl, sampleStep } from './game';
import { createInitialState, gameReducer } from './reducer';
import type { Action, RoundResult } from './types';

const formatMoney = (n: number): string => `$${n.toLocaleString('en-US')}`;

const signed = (n: number): string => (n > 0 ? `+${n}` : `${n}`);

const ACTION_META: Record<
  Action,
  { emoji: string; label: string; description: string }
> = {
  'buy-ask': {
    emoji: '🟢',
    label: 'Buy at ask',
    description: 'Market buy — crosses the spread for an instant fill.',
  },
  'sell-bid': {
    emoji: '🔴',
    label: 'Sell at bid',
    description: 'Market sell — crosses the spread for an instant fill.',
  },
  'post-bid': {
    emoji: '🕳️',
    label: 'Post bid',
    description: 'Limit buy one tick inside — fills only if price rises to it.',
  },
  'post-ask': {
    emoji: '🧊',
    label: 'Post ask',
    description:
      'Limit sell one tick inside — fills only if price falls to it.',
  },
};

const BookPanel: FC<{ mid: number }> = ({ mid }) => {
  const bid = bidFor(mid);
  const ask = askFor(mid);
  return (
    <div className="card border-base-content/10 flex flex-col gap-2 border p-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-base-content/60 text-xs">Best ask</span>
        <span>
          <strong className="text-error">{ask}</strong> × {DEPTH}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-primary text-xs font-bold">Mid</span>
        <span>{mid}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base-content/60 text-xs">Best bid</span>
        <span>
          <strong className="text-success">{bid}</strong> × {DEPTH}
        </span>
      </div>
      <div className="text-base-content/60 flex items-center justify-between border-t pt-2 text-xs">
        <span>Spread width</span>
        <span>{ask - bid}</span>
      </div>
    </div>
  );
};

const RevealPanel: FC<{ result: RoundResult; onNext: () => void }> = ({
  result,
  onNext,
}) => {
  const profit = pnl(result.cash, result.position, result.midAfter);
  const filled = result.fill !== 'none';
  const header =
    result.action === 'buy-ask'
      ? `Bought at the ask for ${formatMoney(result.fillPrice ?? 0)}`
      : result.action === 'sell-bid'
        ? `Sold at the bid for ${formatMoney(result.fillPrice ?? 0)}`
        : filled
          ? `Limit ${result.fill === 'buy' ? 'buy' : 'sell'} filled at ${formatMoney(result.fillPrice ?? 0)}`
          : 'Limit order not filled';
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="text-3xl">{ACTION_META[result.action].emoji}</div>
      <div className="text-lg">{header}</div>
      <div className="flex flex-col gap-1 text-center text-sm">
        <span>
          Mid price:{' '}
          <strong>
            {result.midBefore} → {result.midAfter}
          </strong>
        </span>
        <span>
          Position: <strong>{signed(result.delta)}</strong> · Volume:{' '}
          <strong>{result.volume} lots</strong>
        </span>
        <span className={profit < 0 ? 'text-error' : 'text-success'}>
          P&L: <strong>{formatMoney(profit)}</strong>
        </span>
        <span>
          Spread cost so far:{' '}
          <strong>{formatMoney(result.totalSpreadCost)}</strong>
        </span>
      </div>
      <button
        type="button"
        onClick={onNext}
        data-testid="next-round"
        className="btn btn-primary btn-sm">
        {result.round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
      </button>
    </div>
  );
};

export const OrderBookGame: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const { phase, round, mid, cash, position, volume, spreadCost, roundResult } =
    state;

  const submitAction = useCallback(
    (action: Action) => {
      if (phase !== 'choose') return;
      dispatch({ type: 'SUBMIT_ACTION', action, step: sampleStep() });
    },
    [phase]
  );
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span>
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span>
          P&L so far: <strong>{formatMoney(pnl(cash, position, mid))}</strong>
        </span>
      </div>

      {phase === 'choose' && (
        <div className="flex flex-col gap-3">
          <BookPanel mid={mid} />
          <p className="text-base-content/60 text-sm">
            Pick one action for this round:
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {ACTION_ORDER.map((id) => {
              const meta = ACTION_META[id];
              const price =
                id === 'buy-ask'
                  ? askFor(mid)
                  : id === 'sell-bid'
                    ? bidFor(mid)
                    : LIMIT_PRICE;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => submitAction(id)}
                  data-testid={`action-${id}`}
                  className="card border-base-content/10 border p-3 text-left transition-colors">
                  <span className="text-lg">
                    {meta.emoji} {meta.label} {price}
                  </span>
                  <span className="text-base-content/60 block text-xs">
                    {meta.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {phase === 'reveal' && roundResult && (
        <RevealPanel result={roundResult} onNext={nextRound} />
      )}

      {phase === 'done' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-4xl">📊</div>
          <div className="text-lg">Order book results</div>
          <div className="flex gap-6 text-sm">
            <span>
              Final P&L:{' '}
              <strong>{formatMoney(pnl(cash, position, mid))}</strong>
            </span>
            <span>
              Volume: <strong>{volume} lots</strong>
            </span>
            <span>
              Spread cost: <strong>{formatMoney(spreadCost)}</strong>
            </span>
          </div>
          <p className="text-base-content/60 max-w-sm text-center text-xs">
            The bid-ask spread is the hidden cost of trading: market orders
            cross it, limit orders earn it back.
          </p>
          <button
            type="button"
            onClick={reset}
            data-testid="play-again"
            className="btn btn-primary btn-sm">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
OrderBookGame.displayName = 'OrderBookGame';
