import type { FC } from 'react';
import { CheckReset, UtilityStats } from './components';
import type { Bundle, Good, LabResult } from './types';

const fmt = (n: number): string =>
  Number.isInteger(n) ? String(n) : n.toFixed(2);

export interface GoodData {
  emoji: string;
  label: string;
  kind: Good;
  count: number;
  countTestid: string;
  lastMU: number;
  muTestid: string;
  muPerDollar: number;
  muPerDollarTestid: string;
  buyTestid: string;
  sellTestid: string;
  canBuy: boolean;
  canSell: boolean;
}

interface GoodRowProps {
  good: GoodData;
  onBuy: (good: Good) => void;
  onSell: (good: Good) => void;
}

export const GoodRow: FC<GoodRowProps> = ({ good, onBuy, onSell }) => (
  <div className="border-base-200 flex flex-col gap-1 rounded-lg border p-3">
    <span className="text-sm font-bold">
      {good.emoji} {good.label}
    </span>
    <span className="text-3xl" data-testid={good.countTestid}>
      {good.count}
    </span>
    <span className="text-xs">
      MU of last unit: <span data-testid={good.muTestid}>{good.lastMU}</span>
    </span>
    <span className="text-xs">
      MU/p of last unit:{' '}
      <span data-testid={good.muPerDollarTestid}>{fmt(good.muPerDollar)}</span>
    </span>
    <div className="flex gap-2">
      <button
        type="button"
        data-testid={good.buyTestid}
        onClick={() => onBuy(good.kind)}
        disabled={!good.canBuy}
        className="btn btn-primary btn-sm">
        Buy
      </button>
      <button
        type="button"
        data-testid={good.sellTestid}
        onClick={() => onSell(good.kind)}
        disabled={!good.canSell}
        className="btn btn-outline btn-sm">
        Sell
      </button>
    </div>
  </div>
);

interface AllocationBoardProps {
  apples: GoodData;
  cookies: GoodData;
  income: number;
  spent: number;
  totalUtility: number;
  optimalUtility: number;
  onBuy: (good: Good) => void;
  onSell: (good: Good) => void;
  onCheck: () => void;
  onReset: () => void;
}

export const AllocationBoard: FC<AllocationBoardProps> = ({
  apples,
  cookies,
  income,
  spent,
  totalUtility,
  optimalUtility,
  onBuy,
  onSell,
  onCheck,
  onReset,
}) => (
  <div className="card border-base-content/10 flex flex-col gap-3 border p-4">
    <div className="flex items-center justify-between">
      <h2 className="text-primary text-sm font-bold">Allocation</h2>
      <span className="text-base-content/60 text-xs">
        Budget used: {spent} / {income}
      </span>
    </div>
    <div className="grid gap-2 sm:grid-cols-2">
      <GoodRow good={apples} onBuy={onBuy} onSell={onSell} />
      <GoodRow good={cookies} onBuy={onBuy} onSell={onSell} />
    </div>
    <UtilityStats totalUtility={totalUtility} optimalUtility={optimalUtility} />
    <CheckReset onCheck={onCheck} onReset={onReset} />
  </div>
);

interface ResultBannerProps {
  score: number;
  success: boolean;
  optimal: Bundle;
}

export const ResultBanner: FC<ResultBannerProps> = ({
  score,
  success,
  optimal,
}) => (
  <div
    data-testid="result"
    className={`card border p-3 text-sm ${
      success ? 'border-success' : 'border-warning'
    }`}>
    <div className={`font-bold ${success ? 'text-success' : 'text-warning'}`}>
      {success ? '🎯 Optimal allocation!' : `Not quite — score ${score} / 100`}
    </div>
    <p className="text-base-content/60 text-xs">
      Optimal bundle: {optimal.apples} apples, {optimal.cookies} cookies.
    </p>
  </div>
);

interface HistoryPanelProps {
  entries: LabResult[];
}

export const HistoryPanel: FC<HistoryPanelProps> = ({ entries }) => (
  <div className="card border-base-content/10 border p-4">
    <h3 className="text-primary mb-2 text-sm font-bold">History</h3>
    {entries.length === 0 ? (
      <p className="text-base-content/60 text-xs">No checks yet.</p>
    ) : (
      <ul className="flex flex-col gap-1 text-xs">
        {entries.map((entry) => (
          <li key={entry.round} className="flex justify-between">
            <span>
              {entry.round}. {entry.apples} apples, {entry.cookies} cookies
            </span>
            <span>
              U {entry.achievedUtility} → {entry.score} / 100
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
