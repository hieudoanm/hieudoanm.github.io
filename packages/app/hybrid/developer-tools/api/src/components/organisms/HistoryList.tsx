'use client';

import { HistoryEntryItem } from '@/components/molecules/HistoryEntryItem';
import { HistoryEntry } from '@/types/api-client';
import { type FC, useState } from 'react';
import { FiClock, FiSearch, FiTrash2 } from 'react-icons/fi';

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
  const [query, setQuery] = useState('');

  const filtered =
    query.trim() === ''
      ? entries
      : entries.filter((entry) => {
          const haystack =
            `${entry.request.method} ${entry.request.url}`.toLowerCase();
          return haystack.includes(query.trim().toLowerCase());
        });

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
      {entries.length > 0 && (
        <div className="relative mb-1 px-1">
          <FiSearch className="text-base-content/40 absolute top-1/2 left-3 size-3 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search history"
            aria-label="Search history"
            className="input input-bordered input-xs w-full pl-7"
          />
        </div>
      )}
      {entries.length === 0 ? (
        <div className="text-base-content/40 flex flex-col items-center gap-2 py-8">
          <FiClock className="size-6" />
          <p className="text-sm">No requests yet</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-base-content/40 flex flex-col items-center gap-2 py-8">
          <FiSearch className="size-6" />
          <p className="text-sm">No matching requests</p>
        </div>
      ) : (
        <ul className="menu w-full gap-0.5 p-1">
          {filtered.map((entry) => (
            <HistoryEntryItem
              key={entry.id}
              entry={entry}
              active={activeId === entry.id}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

HistoryList.displayName = 'HistoryList';
