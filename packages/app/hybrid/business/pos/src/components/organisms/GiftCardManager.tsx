'use client';

import { FC, useState } from 'react';
import { FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';
import type { GiftCard } from '@/types/pos';

interface GiftCardManagerProps {
  giftCards: GiftCard[];
  onAdd: (gc: GiftCard) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
}

export const GiftCardManager: FC<GiftCardManagerProps> = ({
  giftCards,
  onAdd,
  onRemove,
  onBack,
}) => {
  const [code, setCode] = useState('');
  const [balance, setBalance] = useState(0);

  const handleAdd = () => {
    if (!code.trim() || balance <= 0) return;
    onAdd({
      id: crypto.randomUUID(),
      code: code.trim().toUpperCase(),
      balance,
      initialBalance: balance,
      createdAt: new Date().toISOString(),
      active: true,
    });
    setCode('');
    setBalance(0);
  };

  return (
    <div className="flex h-full flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-sm font-semibold">Gift Cards</h1>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="card bg-base-200 mb-4">
          <div className="card-body">
            <h2 className="card-title text-sm">New Gift Card</h2>
            <input
              type="text"
              className="input input-bordered input-sm"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              type="number"
              className="input input-bordered input-sm"
              placeholder="Balance"
              value={balance || ''}
              onChange={(e) => setBalance(Number(e.target.value))}
              min={0}
              step={0.01}
            />
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>
              <FiPlus className="size-4" /> Create
            </button>
          </div>
        </div>

        <h2 className="mb-2 text-sm font-semibold">Active Gift Cards</h2>
        {giftCards.length === 0 ? (
          <p className="text-base-content/50 text-sm">No gift cards</p>
        ) : (
          <ul className="divide-base-300 divide-y">
            {giftCards.map((gc) => (
              <li
                key={gc.id}
                className="flex items-center justify-between py-3">
                <div>
                  <p className="font-mono text-sm font-bold">{gc.code}</p>
                  <p className="text-base-content/50 text-xs">
                    Balance: ${gc.balance.toFixed(2)} / $
                    {gc.initialBalance.toFixed(2)}
                  </p>
                </div>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => onRemove(gc.id)}>
                  <FiTrash2 className="size-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

GiftCardManager.displayName = 'GiftCardManager';
