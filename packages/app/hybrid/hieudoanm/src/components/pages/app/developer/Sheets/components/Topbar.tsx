import { FC, memo, RefObject } from 'react';

import {
  IcoDatabase,
  IcoDownload,
  IcoPlus,
  IcoSave,
  IcoUpload,
} from '../icons';

interface TopbarProps {
  loading: boolean;
  dbFileName: string | null;
  opfsFiles: string[];
  dbInstance: boolean;
  onOpen: () => void;
  onNewDb: () => void;
  onLoadOpfs: (f: string) => void;
  onSave: () => void;
  onExport: () => void;
}

export const Topbar: FC<TopbarProps> = memo(
  ({
    loading,
    dbFileName,
    opfsFiles,
    dbInstance,
    onOpen,
    onNewDb,
    onLoadOpfs,
    onSave,
    onExport,
  }) => (
    <header className="bg-base-200 border-base-300 flex flex-shrink-0 items-center gap-3 border-b px-4 py-2">
      <button className="btn btn-primary btn-sm gap-2" onClick={onOpen}>
        <IcoUpload /> Open .db
      </button>
      <button
        className="btn btn-ghost btn-sm gap-2"
        onClick={onNewDb}
        disabled={loading}>
        <IcoPlus /> New DB
      </button>
      {dbFileName && (
        <div className="badge badge-outline badge-primary gap-2 px-3 py-3 font-mono text-xs">
          <span className="bg-primary inline-block h-2 w-2 animate-pulse rounded-full" />
          {dbFileName}
        </div>
      )}
      <div className="ml-auto flex items-center gap-2">
        {opfsFiles.length > 0 && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm gap-2">
              <IcoDatabase /> OPFS ({opfsFiles.length})
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 border-base-300 z-50 mt-2 w-52 rounded-xl border p-2 shadow-xl">
              {opfsFiles.map((f) => (
                <li key={f}>
                  <a
                    className="font-mono text-xs"
                    onClick={() => onLoadOpfs(f)}>
                    <IcoDatabase /> {f}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="btn btn-ghost btn-sm gap-2"
          onClick={onSave}
          disabled={!dbInstance}>
          <IcoSave /> Save OPFS
        </button>
        <button
          className="btn btn-ghost btn-sm gap-2"
          onClick={onExport}
          disabled={!dbInstance}>
          <IcoDownload /> Export .db
        </button>
      </div>
    </header>
  )
);

Topbar.displayName = 'Topbar';
