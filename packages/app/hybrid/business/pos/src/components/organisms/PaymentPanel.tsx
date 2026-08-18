'use client';

import { FC, useState } from 'react';
import type {
  PaymentMethod,
  PaymentSplit,
  GiftCard,
  Discount,
} from '@/types/pos';

interface PaymentPanelProps {
  total: number;
  giftCards: GiftCard[];
  discounts: Discount[];
  onPayment: (payments: PaymentSplit[]) => void;
  onBack: () => void;
}

export const PaymentPanel: FC<PaymentPanelProps> = ({
  total,
  giftCards,
  discounts,
  onPayment,
  onBack,
}) => {
  const [splits, setSplits] = useState<PaymentSplit[]>([
    { method: 'cash', amount: 0 },
  ]);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [giftCardCode, setGiftCardCode] = useState('');

  const discountAmount = appliedDiscount
    ? appliedDiscount.type === 'percentage'
      ? total * (appliedDiscount.value / 100)
      : Math.min(appliedDiscount.value, total)
    : 0;

  const adjustedTotal = Math.max(0, total - discountAmount);
  const totalPaid = splits.reduce((s, p) => s + p.amount, 0);
  const remaining = Math.max(0, adjustedTotal - totalPaid);
  const change = Math.max(0, totalPaid - adjustedTotal);

  const addSplit = () => {
    const unusedMethod = (['cash', 'card', 'gift_card'] as const).find(
      (m) => !splits.some((s) => s.method === m)
    );
    if (unusedMethod) {
      setSplits([...splits, { method: unusedMethod, amount: 0 }]);
    }
  };

  const removeSplit = (index: number) => {
    setSplits(splits.filter((_, i) => i !== index));
  };

  const updateSplit = (
    index: number,
    field: keyof PaymentSplit,
    value: unknown
  ) => {
    const updated = [...splits];
    updated[index] = { ...updated[index], [field]: value };
    setSplits(updated);
  };

  const applyDiscount = () => {
    const d = discounts.find(
      (d) => d.code.toLowerCase() === discountCode.toLowerCase() && d.active
    );
    if (d) {
      if (d.maxUses && d.usedCount >= d.maxUses) return;
      if (d.expiresAt && new Date(d.expiresAt) < new Date()) return;
      if (d.minPurchase && total < d.minPurchase) return;
      setAppliedDiscount(d);
    }
  };

  const applyGiftCard = () => {
    const gc = giftCards.find(
      (g) => g.code.toLowerCase() === giftCardCode.toLowerCase() && g.active
    );
    if (gc && gc.balance > 0) {
      const amount = Math.min(gc.balance, remaining);
      setSplits([
        ...splits.filter((s) => s.method !== 'gift_card'),
        { method: 'gift_card' as PaymentMethod, amount, reference: gc.code },
      ]);
    }
  };

  const canComplete = remaining <= 0.01 || totalPaid >= adjustedTotal;

  return (
    <div className="flex h-full flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center justify-between border-b px-4">
        <h1 className="text-sm font-semibold">Payment</h1>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          Back
        </button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <div className="bg-base-200 mb-2 rounded p-3 text-center">
            <p className="text-base-content/50 text-xs">Total Due</p>
            <p className="text-2xl font-bold">${adjustedTotal.toFixed(2)}</p>
            {discountAmount > 0 && (
              <p className="text-success text-xs">
                Discount: -${discountAmount.toFixed(2)}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-sm font-semibold">Discount Code</h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered input-sm flex-1"
              placeholder="Enter code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className="btn btn-outline btn-sm" onClick={applyDiscount}>
              Apply
            </button>
          </div>
          {appliedDiscount && (
            <p className="text-success mt-1 text-xs">
              Applied: {appliedDiscount.code} (
              {appliedDiscount.type === 'percentage'
                ? `${appliedDiscount.value}%`
                : `$${appliedDiscount.value}`}
              off)
            </p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-sm font-semibold">Gift Card</h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered input-sm flex-1"
              placeholder="Gift card code"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value)}
            />
            <button className="btn btn-outline btn-sm" onClick={applyGiftCard}>
              Apply
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Payment Methods</h2>
            {splits.length < 3 && (
              <button className="btn btn-ghost btn-xs" onClick={addSplit}>
                + Add
              </button>
            )}
          </div>

          {splits.map((split, i) => (
            <div key={i} className="mb-2 flex items-center gap-2">
              <select
                className="select select-bordered select-sm"
                value={split.method}
                onChange={(e) =>
                  updateSplit(i, 'method', e.target.value as PaymentMethod)
                }>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="gift_card">Gift Card</option>
              </select>
              <input
                type="number"
                className="input input-bordered input-sm flex-1"
                value={split.amount || ''}
                onChange={(e) =>
                  updateSplit(i, 'amount', Number(e.target.value))
                }
                min={0}
                step={0.01}
                placeholder="0.00"
              />
              {splits.length > 1 && (
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => removeSplit(i)}>
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="bg-base-200 rounded p-3">
          <div className="flex justify-between text-sm">
            <span>Paid</span>
            <span>${totalPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Remaining</span>
            <span className={remaining > 0 ? 'text-warning' : 'text-success'}>
              ${remaining.toFixed(2)}
            </span>
          </div>
          {change > 0 && (
            <div className="flex justify-between text-sm font-bold">
              <span>Change</span>
              <span className="text-success">${change.toFixed(2)}</span>
            </div>
          )}
        </div>
      </main>

      <div className="border-base-300 border-t p-4">
        <button
          className="btn btn-primary w-full"
          disabled={!canComplete}
          onClick={() => onPayment(splits)}>
          Complete Payment
        </button>
      </div>
    </div>
  );
};

PaymentPanel.displayName = 'PaymentPanel';
