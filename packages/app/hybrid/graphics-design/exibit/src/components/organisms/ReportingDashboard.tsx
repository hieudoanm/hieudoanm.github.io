'use client';

import { FC, useState, useMemo } from 'react';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';
import type { Transaction, ReportPeriod } from '@/types/pos';

interface ReportingDashboardProps {
  transactions: Transaction[];
  onBack: () => void;
}

export const ReportingDashboard: FC<ReportingDashboardProps> = ({
  transactions,
  onBack,
}) => {
  const [period, setPeriod] = useState<ReportPeriod>('daily');

  const filteredTxns = useMemo(() => {
    const now = new Date();
    const start = new Date(now);

    if (period === 'daily') {
      start.setHours(0, 0, 0, 0);
    } else if (period === 'weekly') {
      start.setDate(now.getDate() - 7);
    } else {
      start.setMonth(now.getMonth() - 1);
    }

    const startStr = start.toISOString();
    return transactions.filter(
      (t) => t.createdAt >= startStr && t.status === 'completed'
    );
  }, [transactions, period]);

  const report = useMemo(() => {
    const totalSales = filteredTxns.reduce((s, t) => s + t.total, 0);
    const totalTax = filteredTxns.reduce((s, t) => s + t.tax, 0);

    const byPayment: Record<string, number> = {
      cash: 0,
      card: 0,
      gift_card: 0,
    };
    const byCategory: Record<string, number> = {};
    const itemCounts: Record<
      string,
      { name: string; qty: number; total: number }
    > = {};

    for (const t of filteredTxns) {
      for (const p of t.payments) {
        byPayment[p.method] = (byPayment[p.method] || 0) + p.amount;
      }
      for (const ci of t.items) {
        const cat = ci.item.category;
        byCategory[cat] = (byCategory[cat] || 0) + ci.item.price * ci.quantity;

        const existing = itemCounts[ci.item.id];
        if (existing) {
          existing.qty += ci.quantity;
          existing.total += ci.item.price * ci.quantity;
        } else {
          itemCounts[ci.item.id] = {
            name: ci.item.name,
            qty: ci.quantity,
            total: ci.item.price * ci.quantity,
          };
        }
      }
    }

    const topItems = Object.values(itemCounts)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    return {
      totalSales,
      totalTax,
      count: filteredTxns.length,
      byPayment,
      byCategory,
      topItems,
    };
  }, [filteredTxns]);

  const exportCsv = () => {
    const lines = [
      'Date,ID,Subtotal,Tax,Total,Payment,Status',
      ...filteredTxns.map(
        (t) =>
          `${t.createdAt},${t.id.slice(0, 8)},${t.subtotal.toFixed(2)},${t.tax.toFixed(2)},${t.total.toFixed(2)},${t.payments.map((p) => p.method).join('+')},${t.status}`
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `sales-report-${period}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-sm font-semibold">Reports</h1>
        <button
          className="btn btn-ghost btn-sm ml-auto gap-1"
          onClick={exportCsv}>
          <FiDownload className="size-4" />
          CSV
        </button>
      </header>

      <div className="border-base-300 flex gap-2 border-b px-4 py-2">
        {(['daily', 'weekly', 'monthly'] as const).map((p) => (
          <button
            key={p}
            className={`btn btn-xs capitalize ${period === p ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setPeriod(p)}>
            {p}
          </button>
        ))}
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="stats stats-vertical bg-base-200 mb-4 w-full shadow">
          <div className="stat">
            <div className="stat-title">Transactions</div>
            <div className="stat-value text-primary">{report.count}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Sales</div>
            <div className="stat-value text-success">
              ${report.totalSales.toFixed(2)}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Tax</div>
            <div className="stat-value">${report.totalTax.toFixed(2)}</div>
          </div>
        </div>

        <h2 className="mb-2 text-sm font-semibold">Payment Breakdown</h2>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {Object.entries(report.byPayment).map(([method, amount]) => (
            <div key={method} className="bg-base-200 rounded p-3 text-center">
              <p className="text-base-content/50 text-xs capitalize">
                {method.replace('_', ' ')}
              </p>
              <p className="text-sm font-bold">
                ${(amount as number).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-2 text-sm font-semibold">By Category</h2>
        <div className="mb-4">
          {Object.entries(report.byCategory).map(([cat, amount]) => (
            <div
              key={cat}
              className="flex justify-between border-b py-2 text-sm">
              <span>{cat}</span>
              <span className="font-bold">
                ${(amount as number).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <h2 className="mb-2 text-sm font-semibold">Top Items</h2>
        <ul className="divide-base-300 divide-y">
          {report.topItems.map((ti, i) => (
            <li key={i} className="flex justify-between py-2 text-sm">
              <span>
                {ti.name} × {ti.qty}
              </span>
              <span className="font-bold">${ti.total.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

ReportingDashboard.displayName = 'ReportingDashboard';
