import type { FC } from 'react';
import { FiPlay, FiTrash2, FiX } from 'react-icons/fi';

import type { Bookmark, QueryHistory } from '@/types';
import { formatRelativeTime } from '@/utils/format';

interface DbSidePanelProps {
  panel: 'history' | 'bookmarks' | null;
  onClose: () => void;
  history: QueryHistory[];
  groupedBookmarks: [string, Bookmark[]][];
  onRerun: (sql: string) => void;
  onUseSql: (sql: string) => void;
  onDeleteBookmark: (id: string) => void;
}

export const DbSidePanel: FC<DbSidePanelProps> = ({
  panel,
  onClose,
  history,
  groupedBookmarks,
  onRerun,
  onUseSql,
  onDeleteBookmark,
}) => {
  if (!panel) return null;
  return (
    <div className="bg-base-100 fixed inset-y-0 right-0 z-40 flex w-80 flex-col border-l shadow-2xl">
      <div className="border-base-300 flex flex-shrink-0 items-center justify-between border-b px-4 py-3">
        <span className="text-sm font-semibold">
          {panel === 'history' ? 'History' : 'Bookmarks'}
        </span>
        <button
          type="button"
          aria-label="Close panel"
          onClick={onClose}
          className="btn btn-ghost btn-xs btn-circle">
          <FiX className="size-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {panel === 'history' ? (
          history.length === 0 ? (
            <p className="text-base-content/30 px-2 py-4 text-xs italic">
              No queries yet
            </p>
          ) : (
            history.map((h) => (
              <div
                key={h.id}
                className="hover:bg-base-200 group flex items-center gap-2 rounded-lg px-2 py-2">
                <button
                  className="min-w-0 flex-1 text-left"
                  onClick={() => onUseSql(h.sql)}>
                  <p className="truncate font-mono text-xs">{h.sql}</p>
                  <p className="text-base-content/30 text-[10px]">
                    {formatRelativeTime(h.timestamp)} · {h.rowCount} rows ·{' '}
                    {h.executionTime} ms
                  </p>
                </button>
                <button
                  type="button"
                  aria-label="Re-run query"
                  onClick={() => onRerun(h.sql)}
                  className="btn btn-ghost btn-xs text-primary">
                  <FiPlay className="size-3.5" />
                </button>
              </div>
            ))
          )
        ) : groupedBookmarks.length === 0 ? (
          <p className="text-base-content/30 px-2 py-4 text-xs italic">
            No bookmarks yet
          </p>
        ) : (
          groupedBookmarks.map(([folder, items]) => (
            <div key={folder} className="mb-3">
              <p className="text-base-content/30 px-2 py-1 text-[10px] font-normal tracking-widest uppercase">
                {folder || 'No folder'}
              </p>
              {items.map((b) => (
                <div
                  key={b.id}
                  className="hover:bg-base-200 group flex items-center gap-2 rounded-lg px-2 py-2">
                  <button
                    className="min-w-0 flex-1 text-left"
                    onClick={() => onUseSql(b.sql)}>
                    <p className="truncate text-xs font-normal">{b.name}</p>
                    <p className="text-base-content/30 truncate font-mono text-[10px]">
                      {b.sql}
                    </p>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete bookmark ${b.name}`}
                    onClick={() => onDeleteBookmark(b.id)}
                    className="btn btn-ghost btn-xs text-base-content/30 hover:text-error">
                    <FiTrash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
