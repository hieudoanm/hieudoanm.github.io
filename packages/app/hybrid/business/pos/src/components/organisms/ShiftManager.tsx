'use client';

import { FC, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import type { Shift } from '@/types/pos';

interface ShiftManagerProps {
  shifts: Shift[];
  currentShift: Shift | null;
  onOpen: (openBalance: number) => void;
  onClose: (closeBalance: number) => void;
  onBack: () => void;
}

export const ShiftManager: FC<ShiftManagerProps> = ({
  shifts,
  currentShift,
  onOpen,
  onClose,
  onBack,
}) => {
  const [openBalance, setOpenBalance] = useState(0);
  const [closeBalance, setCloseBalance] = useState(0);

  return (
    <div className="flex h-full flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-sm font-semibold">Shifts</h1>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto p-4">
        {currentShift ? (
          <div className="card bg-base-200 mb-4">
            <div className="card-body">
              <h2 className="card-title text-sm">Active Shift</h2>
              <div className="text-sm">
                <p>
                  Started: {new Date(currentShift.startedAt).toLocaleString()}
                </p>
                <p>Open Balance: ${currentShift.openBalance.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="input input-bordered input-sm flex-1"
                  placeholder="Close balance"
                  value={closeBalance || ''}
                  onChange={(e) => setCloseBalance(Number(e.target.value))}
                  min={0}
                  step={0.01}
                />
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => {
                    onClose(closeBalance);
                    setCloseBalance(0);
                  }}>
                  Close Shift
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-base-200 mb-4">
            <div className="card-body">
              <h2 className="card-title text-sm">Open New Shift</h2>
              <input
                type="number"
                className="input input-bordered input-sm"
                placeholder="Opening balance"
                value={openBalance || ''}
                onChange={(e) => setOpenBalance(Number(e.target.value))}
                min={0}
                step={0.01}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  onOpen(openBalance);
                  setOpenBalance(0);
                }}>
                Open Shift
              </button>
            </div>
          </div>
        )}

        <h2 className="mb-2 text-sm font-semibold">Shift History</h2>
        {shifts.length === 0 ? (
          <p className="text-base-content/50 text-sm">No shifts yet</p>
        ) : (
          <ul className="divide-base-300 divide-y">
            {shifts.map((s) => (
              <li key={s.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">
                      {new Date(s.startedAt).toLocaleDateString()}
                    </p>
                    <p className="text-base-content/50 text-xs">
                      Open: ${s.openBalance.toFixed(2)}
                      {s.closeBalance != null &&
                        ` → Close: $${s.closeBalance.toFixed(2)}`}
                    </p>
                  </div>
                  <span
                    className={`badge badge-xs ${
                      s.status === 'open' ? 'badge-success' : 'badge-ghost'
                    }`}>
                    {s.status}
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

ShiftManager.displayName = 'ShiftManager';
