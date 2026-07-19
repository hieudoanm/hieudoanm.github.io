import type { FC } from 'react';
import { Item } from '@/types/pos';

export const ItemCatalog: FC<{
  items: Item[];
  onAdd: (item: Item) => void;
}> = ({ items, onAdd }) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-sm font-bold">Items</h2>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onAdd(item)}
          className="border-base-300 bg-base-200 hover:bg-base-300 flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors">
          <span className="text-base-content text-sm font-bold">
            {item.name}
          </span>
          <span className="text-base-content/50 text-xs">{item.category}</span>
          <span className="text-primary font-mono text-sm font-bold">
            ${item.price.toFixed(2)}
          </span>
        </button>
      ))}
    </div>
  </div>
);

ItemCatalog.displayName = 'ItemCatalog';
