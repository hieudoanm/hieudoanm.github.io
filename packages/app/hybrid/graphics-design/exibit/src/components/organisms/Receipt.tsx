'use client';

import type { FC } from 'react';
import { Transaction } from '@/types/pos';
import { FiCheck } from 'react-icons/fi';

export const Receipt: FC<{
  transaction: Transaction;
  onNewSale: () => void;
}> = ({ transaction, onNewSale }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="bg-success/20 flex h-12 w-12 items-center justify-center rounded-full">
      <FiCheck className="text-success h-6 w-6" />
    </div>

    <h2 className="text-sm font-bold">Payment Complete</h2>

    <div className="border-base-300 bg-base-200 w-full max-w-sm rounded-xl border p-4">
      <div className="flex flex-col gap-2">
        {transaction.items.map((ci) => (
          <div key={ci.item.id} className="flex items-center justify-between">
            <span className="text-sm">
              {ci.item.name} x{ci.quantity}
            </span>
            <span className="font-mono text-sm font-bold">
              ${(ci.item.price * ci.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-base-content/20 mt-3 border-t pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Total</span>
          <span className="text-primary font-mono text-sm font-bold">
            ${transaction.total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-base-content/20 mt-3 border-t pt-3">
        {transaction.payments.map((p, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm capitalize">
              {p.method.replace('_', ' ')}
            </span>
            <span className="font-mono text-sm">${p.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>

    <button onClick={onNewSale} className="btn btn-primary btn-sm">
      New Sale
    </button>
  </div>
);

Receipt.displayName = 'Receipt';
