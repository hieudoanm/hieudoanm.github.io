'use client';

import { formatRelativeTime, METHOD_COLORS } from '@/lib/format';
import { HistoryEntry } from '@/types/api-client';
import { type FC } from 'react';

interface HistoryEntryItemProps {
  entry: HistoryEntry;
  active: boolean;
  onSelect: (entry: HistoryEntry) => void;
}

export const HistoryEntryItem: FC<HistoryEntryItemProps> = ({
  entry,
  active,
  onSelect,
}) => (
  <li>
    <button
      type="button"
      onClick={() => onSelect(entry)}
      className={`flex flex-col items-start gap-0.5 ${active ? 'menu-active' : ''}`}>
      <span className="flex w-full items-center gap-2">
        <span
          className={`badge ${METHOD_COLORS[entry.request.method]} badge-xs`}>
          {entry.request.method}
        </span>
        <span className="truncate font-mono text-xs">{entry.request.url}</span>
      </span>
      <span className="text-base-content/40 text-xs">
        {formatRelativeTime(entry.timestamp)}
      </span>
    </button>
  </li>
);

HistoryEntryItem.displayName = 'HistoryEntryItem';
