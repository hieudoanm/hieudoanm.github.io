import { memo, type FC } from 'react';
import {
  FiDatabase,
  FiDownload,
  FiPlus,
  FiSave,
  FiUpload,
} from 'react-icons/fi';

interface SheetsToolbarProps {
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

export const SheetsToolbar: FC<SheetsToolbarProps> = memo(
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
    <div className="flex items-center gap-2">
      <button className="btn btn-primary btn-sm gap-2" onClick={onOpen}>
        <FiUpload className="size-3.5" /> Open .db
      </button>
      <button
        className="btn btn-ghost btn-sm gap-2"
        onClick={onNewDb}
        disabled={loading}>
        <FiPlus className="size-3.5" /> New DB
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
              <FiDatabase className="size-3.5" /> OPFS ({opfsFiles.length})
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 border-base-300 z-50 mt-2 w-52 rounded-xl border p-2 shadow-xl">
              {opfsFiles.map((f) => (
                <li key={f}>
                  <a
                    className="font-mono text-xs"
                    onClick={() => onLoadOpfs(f)}>
                    <FiDatabase className="size-3.5" /> {f}
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
          <FiSave className="size-3.5" /> Save OPFS
        </button>
        <button
          className="btn btn-ghost btn-sm gap-2"
          onClick={onExport}
          disabled={!dbInstance}>
          <FiDownload className="size-3.5" /> Export .db
        </button>
      </div>
    </div>
  )
);
SheetsToolbar.displayName = 'SheetsToolbar';
