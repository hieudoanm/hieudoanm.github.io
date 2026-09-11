import { FC, useCallback, useReducer, useState } from 'react';
import { BOTS, MAX_HARVEST, TOTAL_ROUNDS } from './constants';
import { createInitialState, gameReducer } from './reducer';

const LESSON =
  'Everyone benefits from sustainable harvesting, but individual incentives push toward overuse — the tragedy of the commons.';

const FinalScreen: FC<{
  collapsed: boolean;
  round: number;
  totalHarvested: number;
  finalStock: number;
  onReset: () => void;
}> = ({ collapsed, round, totalHarvested, finalStock, onReset }) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-4xl">{collapsed ? '💀' : '📊'}</div>
    <div className="text-lg">
      {collapsed ? 'The commons collapsed.' : 'Harvest complete'}
    </div>
    <div className="flex gap-6 text-sm">
      <span>
        You harvested: <strong>{totalHarvested}</strong>
      </span>
      <span>
        {collapsed ? (
          <>
            Rounds played: <strong>{round}</strong>
          </>
        ) : (
          <>
            Final stock: <strong>{finalStock}</strong>
          </>
        )}
      </span>
    </div>
    <p className="text-base-content/60 max-w-md text-center text-xs italic">
      {LESSON}
    </p>
    <button
      type="button"
      onClick={onReset}
      className="btn btn-primary btn-sm"
      data-testid="play-again">
      Play Again
    </button>
  </div>
);

const RevealPanel: FC<{
  round: number;
  stockBefore: number;
  playerHarvest: number;
  botHarvests: Record<string, number>;
  growth: number;
  stockAfter: number;
  collapsed: boolean;
  onNext: () => void;
}> = ({
  round,
  stockBefore,
  playerHarvest,
  botHarvests,
  growth,
  stockAfter,
  collapsed,
  onNext,
}) => (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="text-3xl">{collapsed ? '💀' : '🌿'}</div>
    <div className="text-sm">Round {round} results</div>
    <div className="border-base-300 w-full max-w-sm rounded-lg border p-3 text-sm">
      <div className="border-base-200 flex items-center justify-between border-b py-1">
        <span className="flex items-center gap-1">🙋 You</span>
        <span className="font-bold">-{playerHarvest}</span>
      </div>
      {BOTS.map((bot) => (
        <div
          key={bot.id}
          className="border-base-200 flex items-center justify-between border-b py-1 last:border-0">
          <span className="flex items-center gap-1">
            {bot.emoji} {bot.name}
          </span>
          <span>-{botHarvests[bot.id]}</span>
        </div>
      ))}
    </div>
    <div className="flex gap-4 text-sm">
      <span data-testid="stock-change">
        Stock: <strong>{stockBefore}</strong> → <strong>{stockAfter}</strong>
      </span>
      <span>
        Growth: <strong>+{growth}</strong>
      </span>
    </div>
    {collapsed && (
      <span className="text-error text-xs font-bold">
        The commons collapsed!
      </span>
    )}
    <button
      type="button"
      onClick={onNext}
      className="btn btn-primary btn-sm"
      data-testid="next-round">
      {collapsed || round >= TOTAL_ROUNDS ? 'See Results' : 'Next Round'}
    </button>
  </div>
);

export const CommonsHarvest: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, {}, createInitialState);
  const [amount, setAmount] = useState<string>('4');
  const {
    phase,
    round,
    stock,
    playerHarvest,
    result,
    results,
    totalHarvested,
    collapsed,
  } = state;

  const submitHarvest = useCallback(() => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value < 0) return;
    dispatch({
      type: 'SUBMIT_HARVEST',
      amount: Math.min(Math.round(value), MAX_HARVEST),
    });
  }, [amount]);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setAmount('4');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span data-testid="round-counter">
          Round <strong>{round}</strong> / {TOTAL_ROUNDS}
        </span>
        <span data-testid="harvest-total">
          Your harvest: <strong>{totalHarvested}</strong>
        </span>
        <span data-testid="stock-display">
          Stock: <strong>{stock}</strong> / 100
        </span>
      </div>

      <div className="bg-base-200 h-2.5 w-full rounded-full">
        <div
          className={`h-2.5 rounded-full transition-all ${stock > 30 ? 'bg-success' : stock > 10 ? 'bg-warning' : 'bg-error'}`}
          style={{ width: `${stock}%` }}
        />
      </div>

      {phase === 'choose' && (
        <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
          <p className="text-sm">
            Stock: <strong className="text-primary">{stock}</strong> / 100
          </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="harvest-slider" className="text-sm">
              How much do you harvest?{' '}
              <strong className="text-primary">{amount}</strong>
            </label>
            <input
              id="harvest-slider"
              type="range"
              min={0}
              max={MAX_HARVEST}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-testid="harvest-slider"
              className="range range-primary"
            />
            <input
              type="number"
              min={0}
              max={MAX_HARVEST}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-testid="harvest-input"
              className="input input-sm input-bordered w-24"
            />
          </div>
          <p className="text-base-content/60 text-xs">
            Each villager takes what they can from the remaining stock.
          </p>
          <button
            type="button"
            onClick={submitHarvest}
            data-testid="submit-harvest"
            className="btn btn-primary btn-sm self-start">
            Harvest
          </button>
        </div>
      )}

      {phase === 'reveal' && result && (
        <RevealPanel
          round={round}
          stockBefore={result.stockBefore}
          playerHarvest={result.playerHarvest}
          botHarvests={result.botHarvests}
          growth={result.growth}
          stockAfter={result.stockAfter}
          collapsed={result.collapsed}
          onNext={nextRound}
        />
      )}

      {phase === 'done' && (
        <FinalScreen
          collapsed={collapsed}
          round={round}
          totalHarvested={totalHarvested}
          finalStock={stock}
          onReset={reset}
        />
      )}
    </div>
  );
};
CommonsHarvest.displayName = 'CommonsHarvest';
