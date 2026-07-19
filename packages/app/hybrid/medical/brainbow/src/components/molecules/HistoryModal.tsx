'use client';

import { useState, type FC } from 'react';
import { FiClock, FiRotateCcw, FiTrash2, FiX } from 'react-icons/fi';
import { Button } from '@/components/atoms/Button';
import type { ProjectSnapshot } from '@/lib/history/history';

export interface HistoryModalProps {
  snapshots: ProjectSnapshot[];
  canCommit: boolean;
  onCommit: (message: string) => void;
  onRestore: (id: string) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

export const HistoryModal: FC<HistoryModalProps> = ({
  snapshots,
  canCommit,
  onCommit,
  onRestore,
  onRemove,
  onClose,
}) => {
  const [message, setMessage] = useState('');
  const commit = (): void => {
    if (!canCommit || message.trim() === '') return;
    onCommit(message.trim());
    setMessage('');
  };

  return (
    <div
      className="bg-base-300/50 fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Version history">
      <div className="bg-base-100 flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-xl shadow-xl">
        <div className="flex items-center justify-between border-b p-3">
          <h2 className="flex items-center gap-2 text-base">
            <FiClock />
            Version history
          </h2>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Close version history"
            onClick={onClose}>
            <FiX />
          </Button>
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              placeholder="Snapshot message"
              aria-label="Snapshot message"
              className="input input-bordered input-sm flex-1"
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') commit();
              }}
            />
            <Button
              variant="primary"
              size="sm"
              disabled={!canCommit || message.trim() === ''}
              aria-label="Save snapshot"
              onClick={commit}>
              Save
            </Button>
          </div>
          {snapshots.length === 0 ? (
            <p className="text-base-content/50 text-sm">
              No snapshots yet. Save a snapshot to start a version history.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {snapshots.map((snapshot) => (
                <li
                  key={snapshot.id}
                  className="border-base-300 bg-base-200 flex items-center gap-2 rounded-lg border p-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{snapshot.message}</p>
                    <p className="text-base-content/50 text-xs">
                      {new Date(snapshot.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`Restore ${snapshot.message}`}
                    onClick={() => onRestore(snapshot.id)}>
                    <FiRotateCcw />
                    Restore
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Delete ${snapshot.message}`}
                    onClick={() => onRemove(snapshot.id)}>
                    <FiTrash2 />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
