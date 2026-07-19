import type { FC } from 'react';
import { useState } from 'react';
import { CartItem, Transaction } from '@/types/pos';
import { FiArrowLeft } from 'react-icons/fi';

export const Checkout: FC<{
  items: CartItem[];
  onComplete: (transaction: Transaction) => void;
  onBack: () => void;
}> = ({ items, onComplete, onBack }) => {
  const [amountTendered, setAmountTendered] = useState('');

  const subtotal = items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );
  const total = subtotal;
  const tendered = parseFloat(amountTendered) || 0;
  const change = tendered - total;
  const canComplete = tendered >= total;

  const complete = () => {
    if (!canComplete) return;
    onComplete({
      id: crypto.randomUUID(),
      items,
      subtotal,
      total,
      paymentMethod: 'cash',
      amountTendered: tendered,
      change,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="btn btn-ghost btn-sm">
          <FiArrowLeft className="text-lg" />
        </button>
        <h2 className="text-sm font-bold">Checkout</h2>
      </div>

      <div className="border-base-300 bg-base-200 rounded-xl border p-4">
        <div className="flex flex-col gap-2">
          {items.map((ci) => (
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
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold">Amount Tendered</label>
        <input
          type="number"
          value={amountTendered}
          onChange={(e) => setAmountTendered(e.target.value)}
          placeholder="0.00"
          className="border-base-300 bg-base-200 input input-sm w-full"
          min="0"
          step="0.01"
        />
      </div>

      {amountTendered && (
        <div className="border-base-300 bg-base-200 rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Change</span>
            <span
              className={`font-mono text-sm font-bold ${
                change >= 0 ? 'text-success' : 'text-error'
              }`}>
              ${change.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={complete}
        disabled={!canComplete}
        className="btn btn-primary btn-sm w-full">
        Complete Payment
      </button>
    </div>
  );
};

Checkout.displayName = 'Checkout';
