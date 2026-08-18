'use client';

import type { ClipboardItem, ClipboardStats } from '@/types/clipper';
import { FC, useCallback, useEffect, useState } from 'react';
import {
  FiClock,
  FiCopy,
  FiDatabase,
  FiSearch,
  FiStar,
  FiTrash2,
  FiX,
} from 'react-icons/fi';

const ClipboardHistory: FC = () => {
  const [entries, setEntries] = useState<ClipboardItem[]>([]);
  const [stats, setStats] = useState<ClipboardStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:1420/api/history');
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch {
      console.log('[ClipboardHistory] Failed to load history');
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:1420/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch {
      console.log('[ClipboardHistory] Failed to load stats');
    }
  }, []);

  useEffect(() => {
    loadHistory();
    loadStats();
    const interval = setInterval(loadHistory, 2000);
    return () => clearInterval(interval);
  }, [loadHistory, loadStats]);

  const handleCopy = async (content: string, id: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      console.log('[ClipboardHistory] Failed to copy');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:1420/api/delete/${id}`, {
        method: 'DELETE',
      });
      setEntries((prev) => prev.filter((e) => e.id !== id));
      loadStats();
    } catch {
      console.log('[ClipboardHistory] Failed to delete');
    }
  };

  const handleTogglePin = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:1420/api/pin/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        const updated = await response.json();
        setEntries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, pinned: updated.pinned } : e))
        );
        loadStats();
      }
    } catch {
      console.log('[ClipboardHistory] Failed to toggle pin');
    }
  };

  const handleClearAll = async () => {
    try {
      await fetch('http://localhost:1420/api/clear', { method: 'POST' });
      setEntries((prev) => prev.filter((e) => e.pinned));
      loadStats();
    } catch {
      console.log('[ClipboardHistory] Failed to clear history');
    }
  };

  const filteredEntries = entries.filter((entry) =>
    searchQuery
      ? entry.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="border-base-300 bg-base-200 flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold">Clipper</h1>
          <span className="divider divider-horizontal mx-0" />
          <span className="text-base-content/50 text-xs">
            Clipboard History
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-ghost btn-sm gap-1"
            onClick={handleClearAll}
            aria-label="Clear unpinned history">
            <FiTrash2 className="size-4" />
            Clear
          </button>
        </div>
      </header>

      <div className="border-base-300 border-b px-4 py-3">
        <div className="relative">
          <FiSearch className="text-base-content/30 absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clipboard history..."
            className="input input-bordered input-sm w-full pr-8 pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute top-1/2 right-3 -translate-y-1/2"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search">
              <FiX className="size-4" />
            </button>
          )}
        </div>
      </div>

      {stats && (
        <div className="border-base-300 flex gap-4 border-b px-4 py-2 text-xs">
          <div className="flex items-center gap-1.5">
            <FiDatabase className="size-3" />
            <span className="text-base-content/50">
              {stats.totalEntries} total
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiStar className="size-3" />
            <span className="text-base-content/50">
              {stats.pinnedEntries} pinned
            </span>
          </div>
        </div>
      )}

      <main className="min-h-0 flex-1 overflow-y-auto">
        {filteredEntries.length === 0 ? (
          <div className="text-base-content/50 flex flex-col items-center justify-center py-20 text-sm">
            <FiClock className="mb-3 size-8" />
            <p>No clipboard entries yet</p>
            <p className="text-xs">Copy something to get started</p>
          </div>
        ) : (
          <ul className="divide-base-300 divide-y">
            {filteredEntries.map((entry) => (
              <li
                key={entry.id}
                className={`hover:bg-base-200 flex items-start gap-3 px-4 py-3 transition-colors ${
                  selectedId === entry.id ? 'bg-base-200' : ''
                } ${entry.pinned ? 'border-l-primary border-l-2' : ''}`}
                onClick={() => setSelectedId(entry.id)}>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-relaxed">
                    {truncateContent(entry.content)}
                  </p>
                  <div className="text-base-content/40 mt-1 flex items-center gap-3 text-xs">
                    <span>{formatTime(entry.createdAt)}</span>
                    <span className="flex items-center gap-1">
                      <FiCopy className="size-3" />
                      {entry.copiedCount}
                    </span>
                    <span className="capitalize">{entry.contentType}</span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(entry.content, entry.id);
                    }}
                    aria-label="Copy to clipboard">
                    <FiCopy
                      className={`size-3.5 ${
                        copiedId === entry.id ? 'text-success' : ''
                      }`}
                    />
                  </button>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePin(entry.id);
                    }}
                    aria-label={entry.pinned ? 'Unpin' : 'Pin'}>
                    <FiStar
                      className={`size-3.5 ${
                        entry.pinned ? 'text-primary' : ''
                      }`}
                    />
                  </button>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(entry.id);
                    }}
                    aria-label="Delete">
                    <FiTrash2 className="size-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default ClipboardHistory;
