'use client';

import { FC, useState, useMemo } from 'react';
import { FiArrowLeft, FiEdit, FiAlertTriangle } from 'react-icons/fi';
import type { Item, InventoryAdjustment } from '@/types/pos';

interface InventoryManagerProps {
  items: Item[];
  adjustments: InventoryAdjustment[];
  onUpdateStock: (itemId: string, newStock: number, reason: string) => void;
  onBack: () => void;
}

export const InventoryManager: FC<InventoryManagerProps> = ({
  items,
  adjustments,
  onUpdateStock,
  onBack,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStock, setNewStock] = useState(0);
  const [reason, setReason] = useState('');
  const [filter, setFilter] = useState<'all' | 'low'>('all');

  const lowStockItems = useMemo(
    () => items.filter((i) => i.stock <= i.lowStockThreshold),
    [items]
  );

  const displayed = filter === 'low' ? lowStockItems : items;

  const handleSave = (itemId: string) => {
    if (reason.trim()) {
      onUpdateStock(itemId, newStock, reason.trim());
      setEditingId(null);
      setReason('');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-sm font-semibold">Inventory</h1>
        {lowStockItems.length > 0 && (
          <span className="badge badge-warning badge-sm gap-1">
            <FiAlertTriangle className="size-3" />
            {lowStockItems.length} low
          </span>
        )}
      </header>

      <div className="border-base-300 flex gap-2 border-b px-4 py-2">
        <button
          className={`btn btn-xs ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setFilter('all')}>
          All ({items.length})
        </button>
        <button
          className={`btn btn-xs ${filter === 'low' ? 'btn-warning' : 'btn-ghost'}`}
          onClick={() => setFilter('low')}>
          Low Stock ({lowStockItems.length})
        </button>
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <table className="table-sm table">
          <thead>
            <tr>
              <th>Item</th>
              <th className="text-right">Stock</th>
              <th className="text-right">Min</th>
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((item) => (
              <tr
                key={item.id}
                className={
                  item.stock <= item.lowStockThreshold ? 'bg-warning/10' : ''
                }>
                <td>
                  {item.name}
                  <p className="text-base-content/50 text-xs">
                    {item.category}
                  </p>
                </td>
                <td className="text-right font-mono">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      className="input input-bordered input-xs w-20 text-right"
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      min={0}
                    />
                  ) : (
                    <span
                      className={
                        item.stock <= item.lowStockThreshold
                          ? 'text-warning'
                          : ''
                      }>
                      {item.stock}
                    </span>
                  )}
                </td>
                <td className="text-base-content/50 text-right">
                  {item.lowStockThreshold}
                </td>
                <td>
                  {editingId === item.id ? (
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="input input-bordered input-xs w-24"
                        placeholder="Reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <button
                        className="btn btn-success btn-xs"
                        onClick={() => handleSave(item.id)}>
                        Save
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => {
                        setEditingId(item.id);
                        setNewStock(item.stock);
                      }}>
                      <FiEdit className="size-3" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {adjustments.length > 0 && (
        <div className="border-base-300 border-t p-4">
          <h2 className="mb-2 text-xs font-semibold">Recent Adjustments</h2>
          <ul className="max-h-40 overflow-y-auto text-xs">
            {adjustments.slice(0, 10).map((a) => (
              <li key={a.id} className="border-b py-1">
                <span className="font-mono">
                  {items.find((i) => i.id === a.itemId)?.name ?? a.itemId}
                </span>{' '}
                {a.previousStock} → {a.newStock}
                <span className="text-base-content/50"> ({a.reason})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

InventoryManager.displayName = 'InventoryManager';
