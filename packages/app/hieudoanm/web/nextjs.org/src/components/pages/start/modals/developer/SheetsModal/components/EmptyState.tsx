import { FC, memo } from 'react';

import { IcoPlus, IcoUpload } from '../icons';

interface EmptyStateProps {
  loading: boolean;
  loadingMsg: string;
  onOpen: () => void;
  onNewDb: () => void;
}

export const EmptyState: FC<EmptyStateProps> = memo(
  ({ loading, loadingMsg, onOpen, onNewDb }) => (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg text-primary" />
          <p className="text-base-content/50 font-mono text-sm">{loadingMsg}</p>
        </div>
      ) : (
        <>
          <div className="text-base-content/10">
            <svg
              className="h-20 w-20"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2">
              <ellipse cx="24" cy="12" rx="16" ry="5.5" />
              <path d="M8 12v8c0 3.038 7.163 5.5 16 5.5S40 23.038 40 20v-8" />
              <path d="M8 20v8c0 3.038 7.163 5.5 16 5.5S40 31.038 40 28v-8" />
              <path d="M8 28v8c0 3.038 7.163 5.5 16 5.5S40 39.038 40 36v-8" />
            </svg>
          </div>
          <div>
            <h1 className="text-base-content/80 mb-2 text-2xl font-bold tracking-tight">
              Sheets
            </h1>
            <p className="text-base-content/40 max-w-xs text-sm leading-relaxed">
              Open a{' '}
              <code className="text-primary bg-primary/10 rounded px-1 text-xs">
                .db
              </code>{' '}
              file or drop it anywhere to browse your SQLite database. Persisted
              via <span className="text-primary">OPFS</span> — no server needed.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-primary btn-sm gap-2" onClick={onOpen}>
              <IcoUpload /> Open file
            </button>
            <button className="btn btn-ghost btn-sm gap-2" onClick={onNewDb}>
              <IcoPlus /> Try demo DB
            </button>
          </div>
        </>
      )}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';
