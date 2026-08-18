'use client';

import { FC, useState, useMemo } from 'react';
import { FiSearch, FiX, FiArrowLeft } from 'react-icons/fi';
import type { Transaction } from '@/types/pos';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onBack: () => void;
  onVoid: (id: string) => void;
}

export const TransactionHistory: FC<TransactionHistoryProps> = ({
  transactions,
  onBack,
  onVoid,
}) => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return transactions;
    const q = search.toLowerCase();
    return transactions.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.items.some((i) => i.item.name.toLowerCase().includes(q))
    );
  }, [transactions, search]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  const selected = selectedId
    ? transactions.find((t) => t.id === selectedId)
    : null;

  if (selected) {
    return (
      <div className="flex h-full flex-col">
        <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setSelectedId(null)}>
            <FiArrowLeft className="size-4" />
          </button>
          <h1 className="text-sm font-semibold">Transaction Detail</h1>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-base-content/50 text-xs">ID</p>
              <p className="font-mono text-xs">{selected.id.slice(0, 8)}...</p>
            </div>
            <span
              className={`badge badge-sm ${selected.status === 'voided' ? 'badge-error' : 'badge-success'}`}>
              {selected.status}
            </span>
          </div>
          <div className="mb-4">
            <p className="text-base-content/50 text-xs">Date</p>
            <p className="text-sm">{formatDate(selected.createdAt)}</p>
          </div>
          <table className="table-sm table">
            <thead>
              <tr>
                <th>Item</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {selected.items.map((ci, i) => (
                <tr key={i}>
                  <td>{ci.item.name}</td>
                  <td className="text-right">{ci.quantity}</td>
                  <td className="text-right">
                    ${(ci.item.price * ci.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="divider" />
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${selected.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${selected.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${selected.total.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span>Payment</span>
            <span>
              {selected.payments
                .map((p) => `$${p.amount.toFixed(2)} ${p.method}`)
                .join(', ')}
            </span>
          </div>
          {selected.status === 'completed' && (
            <button
              className="btn btn-error btn-sm mt-6 w-full"
              onClick={() => {
                onVoid(selected.id);
                setSelectedId(null);
              }}>
              Void Transaction
            </button>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-sm font-semibold">Transaction History</h1>
        <span className="text-base-content/50 text-xs">
          {transactions.length} transactions
        </span>
      </header>
      <div className="border-base-300 border-b px-4 py-3">
        <div className="relative">
          <FiSearch className="text-base-content/30 absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID or item..."
            className="input input-bordered input-sm w-full pr-8 pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={() => setSearch('')}>
              <FiX className="size-4" />
            </button>
          )}
        </div>
      </div>
      <main className="min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="text-base-content/50 py-20 text-center text-sm">
            No transactions found
          </div>
        ) : (
          <ul className="divide-base-300 divide-y">
            {filtered.map((t) => (
              <li
                key={t.id}
                className="hover:bg-base-200 flex cursor-pointer items-center justify-between px-4 py-3 transition-colors"
                onClick={() => setSelectedId(t.id)}>
                <div>
                  <p className="font-mono text-xs">{t.id.slice(0, 8)}...</p>
                  <p className="text-base-content/50 text-xs">
                    {formatDate(t.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">${t.total.toFixed(2)}</p>
                  <span
                    className={`badge badge-xs ${
                      t.status === 'voided' ? 'badge-error' : 'badge-success'
                    }`}>
                    {t.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

TransactionHistory.displayName = 'TransactionHistory';
