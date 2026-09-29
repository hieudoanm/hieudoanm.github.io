'use client';

import { FC, useState } from 'react';
import { FiPrinter, FiCheck } from 'react-icons/fi';
import type { Transaction } from '@/types/pos';

interface DigitalReceiptProps {
  transaction: Transaction;
  onNewSale: () => void;
}

export const DigitalReceipt: FC<DigitalReceiptProps> = ({
  transaction,
  onNewSale,
}) => {
  const [printAttempted, setPrintAttempted] = useState(false);

  const handlePrint = () => {
    setPrintAttempted(true);
    const receiptContent = [
      '=== RECEIPT ===',
      `ID: ${transaction.id.slice(0, 8)}`,
      `Date: ${new Date(transaction.createdAt).toLocaleString()}`,
      '',
      ...transaction.items.map(
        (ci) =>
          `${ci.item.name} x${ci.quantity}  $${(ci.item.price * ci.quantity).toFixed(2)}`
      ),
      '',
      `Subtotal: $${transaction.subtotal.toFixed(2)}`,
      `Tax: $${transaction.tax.toFixed(2)}`,
      `Total: $${transaction.total.toFixed(2)}`,
      '',
      ...transaction.payments.map(
        (p) => `${p.method.toUpperCase()}: $${p.amount.toFixed(2)}`
      ),
      '',
      'Thank you!',
    ].join('\n');

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `receipt-${transaction.id.slice(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="bg-base-200 w-full max-w-sm rounded-lg p-6 shadow">
        <div className="mb-4 flex flex-col items-center">
          <FiCheck className="text-success mb-2 size-12" />
          <h1 className="text-lg font-bold">Payment Complete</h1>
        </div>

        <div className="text-base-content/50 mb-4 text-xs">
          <p>ID: {transaction.id.slice(0, 8)}...</p>
          <p>{new Date(transaction.createdAt).toLocaleString()}</p>
        </div>

        <table className="table-sm table">
          <tbody>
            {transaction.items.map((ci, i) => (
              <tr key={i}>
                <td>
                  {ci.item.name} × {ci.quantity}
                </td>
                <td className="text-right">
                  ${(ci.item.price * ci.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="divider my-1" />

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${transaction.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${transaction.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${transaction.total.toFixed(2)}</span>
        </div>

        <div className="divider my-1" />

        {transaction.payments.map((p, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="capitalize">{p.method.replace('_', ' ')}</span>
            <span>${p.amount.toFixed(2)}</span>
          </div>
        ))}

        <div className="mt-4 flex gap-2">
          <button
            className="btn btn-outline btn-sm flex-1"
            onClick={handlePrint}>
            <FiPrinter className="size-4" />
            {printAttempted ? 'Downloaded' : 'Download'}
          </button>
          <button className="btn btn-primary btn-sm flex-1" onClick={onNewSale}>
            New Sale
          </button>
        </div>
      </div>
    </div>
  );
};

DigitalReceipt.displayName = 'DigitalReceipt';
