'use client';

import { FC, useMemo } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import type { Transaction } from '@/types/pos';

interface DailySummaryProps {
  transactions: Transaction[];
  onBack: () => void;
}

export const DailySummary: FC<DailySummaryProps> = ({
  transactions,
  onBack,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const todayTxns = useMemo(
    () =>
      transactions.filter(
        (t) => t.createdAt.startsWith(today) && t.status === 'completed'
      ),
    [transactions, today]
  );

  const summary = useMemo(() => {
    const totalSales = todayTxns.reduce((s, t) => s + t.total, 0);
    const totalTax = todayTxns.reduce((s, t) => s + t.tax, 0);
    const byPayment = { cash: 0, card: 0, gift_card: 0 };
    const itemCounts: Record<
      string,
      { name: string; quantity: number; total: number }
    > = {};

    for (const t of todayTxns) {
      for (const p of t.payments) {
        byPayment[p.method] += p.amount;
      }
      for (const ci of t.items) {
        const existing = itemCounts[ci.item.id];
        if (existing) {
          existing.quantity += ci.quantity;
          existing.total += ci.item.price * ci.quantity;
        } else {
          itemCounts[ci.item.id] = {
            name: ci.item.name,
            quantity: ci.quantity,
            total: ci.item.price * ci.quantity,
          };
        }
      }
    }

    const topItems = Object.values(itemCounts)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return {
      totalSales,
      totalTax,
      byPayment,
      topItems,
      count: todayTxns.length,
    };
  }, [todayTxns]);

  return (
    <div className="flex h-full flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-sm font-semibold">Daily Summary</h1>
        <span className="text-base-content/50 text-xs">{today}</span>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="stats stats-vertical bg-base-200 mb-4 w-full shadow">
          <div className="stat">
            <div className="stat-title">Transactions</div>
            <div className="stat-value text-primary">{summary.count}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Sales</div>
            <div className="stat-value text-success">
              ${summary.totalSales.toFixed(2)}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Tax</div>
            <div className="stat-value">${summary.totalTax.toFixed(2)}</div>
          </div>
        </div>

        <h2 className="mb-2 text-sm font-semibold">By Payment Method</h2>
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="bg-base-200 rounded p-3 text-center">
            <p className="text-base-content/50 text-xs">Cash</p>
            <p className="text-sm font-bold">
              ${summary.byPayment.cash.toFixed(2)}
            </p>
          </div>
          <div className="bg-base-200 rounded p-3 text-center">
            <p className="text-base-content/50 text-xs">Card</p>
            <p className="text-sm font-bold">
              ${summary.byPayment.card.toFixed(2)}
            </p>
          </div>
          <div className="bg-base-200 rounded p-3 text-center">
            <p className="text-base-content/50 text-xs">Gift Card</p>
            <p className="text-sm font-bold">
              ${summary.byPayment.gift_card.toFixed(2)}
            </p>
          </div>
        </div>

        <h2 className="mb-2 text-sm font-semibold">Top Items</h2>
        {summary.topItems.length === 0 ? (
          <p className="text-base-content/50 text-sm">No sales today</p>
        ) : (
          <ul className="divide-base-300 divide-y">
            {summary.topItems.map((ti, i) => (
              <li key={i} className="flex justify-between py-2 text-sm">
                <span>
                  {ti.name} × {ti.quantity}
                </span>
                <span className="font-bold">${ti.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

DailySummary.displayName = 'DailySummary';
