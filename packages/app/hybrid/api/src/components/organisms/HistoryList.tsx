'use client';

import { HistoryEntryItem } from '@/components/molecules/HistoryEntryItem';
import { HistoryEntry } from '@/types/api-client';
import { type FC } from 'react';
import { FiClock, FiTrash2 } from 'react-icons/fi';

interface HistoryListProps {
  entries: HistoryEntry[];
  activeId: string | null;
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
}

export const HistoryList: FC<HistoryListProps> = ({
  entries,
  activeId,
  onSelect,
  onClear,
}) => {
  if (entries.length === 0) {
    return (
      <div className="text-base-content/40 flex flex-col items-center gap-2 py-8">
        <FiClock className="size-6" />
        <p className="text-sm">No requests yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-2">
        <span className="text-base-content/40 text-xs font-bold uppercase">
          History
        </span>
        <button
          type="button"
          onClick={onClear}
          className="btn btn-ghost btn-xs gap-1">
          <FiTrash2 className="size-3" />
          <span>Clear</span>
        </button>
      </div>
      <ul className="menu w-full gap-0.5 p-1">
        {entries.map((entry) => (
          <HistoryEntryItem
            key={entry.id}
            entry={entry}
            active={activeId === entry.id}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
};

HistoryList.displayName = 'HistoryList';
