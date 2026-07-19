import type { FC } from 'react';
import {
  FiArrowLeft,
  FiBarChart2,
  FiBookmark,
  FiClock,
  FiCode,
  FiCopy,
  FiCpu,
  FiEdit3,
  FiPlay,
  FiPlus,
} from 'react-icons/fi';

import { SheetsToolbar } from '@/components/molecules/SheetsToolbar';

interface DbHeaderProps {
  title: string;
  loading: boolean;
  dbFileName: string | null;
  opfsFiles: string[];
  hasDb: boolean;
  activeTable: string | null;
  sidebarOpen: boolean;
  panel: 'history' | 'bookmarks' | null;
  onBack: () => void;
  onOpenFile: () => void;
  onNewDb: () => void;
  onLoadOpfs: (f: string) => void;
  onSave: () => void;
  onExport: () => void;
  onExportSql: () => void;
  onToggleSidebar: () => void;
  onNewTable: () => void;
  onEditTable: () => void;
  onShowViz: () => void;
  onTogglePanel: (panel: 'history' | 'bookmarks') => void;
  onExecute: () => void;
  onExplain: () => void;
  onFormat: () => void;
  onCopyResult: () => void;
  onBookmark: () => void;
}

export const DbHeader: FC<DbHeaderProps> = ({
  title,
  loading,
  dbFileName,
  opfsFiles,
  hasDb,
  activeTable,
  sidebarOpen,
  panel,
  onBack,
  onOpenFile,
  onNewDb,
  onLoadOpfs,
  onSave,
  onExport,
  onExportSql,
  onToggleSidebar,
  onNewTable,
  onEditTable,
  onShowViz,
  onTogglePanel,
  onExecute,
  onExplain,
  onFormat,
  onCopyResult,
  onBookmark,
}) => {
  return (
    <header className="border-base-300 flex flex-shrink-0 items-center gap-2 overflow-x-auto border-b px-3 py-2">
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        className="btn btn-neutral btn-sm btn-circle flex-shrink-0">
        <FiArrowLeft className="size-4" />
      </button>
      <span className="max-w-40 min-w-0 truncate text-sm font-semibold sm:max-w-none">
        {title}
      </span>
      <div className="bg-base-300 mx-1 h-5 w-px flex-shrink-0" />
      <SheetsToolbar
        loading={loading}
        dbFileName={dbFileName}
        opfsFiles={opfsFiles}
        dbInstance={hasDb}
        onOpen={onOpenFile}
        onNewDb={onNewDb}
        onLoadOpfs={onLoadOpfs}
        onSave={onSave}
        onExport={onExport}
        onExportSql={onExportSql}
      />
      <div className="flex-1 flex-shrink-0" />
      <button
        type="button"
        onClick={onToggleSidebar}
        className="btn btn-ghost btn-sm flex-shrink-0">
        Schema
      </button>
      {hasDb && (
        <>
          <button
            type="button"
            onClick={onNewTable}
            title="New table"
            aria-label="New table"
            className="btn btn-ghost btn-sm flex-shrink-0">
            <FiPlus className="size-4" />
          </button>
          <button
            type="button"
            onClick={onEditTable}
            disabled={!activeTable}
            title="Edit table schema"
            aria-label="Edit table schema"
            className="btn btn-ghost btn-sm flex-shrink-0">
            <FiEdit3 className="size-4" />
          </button>
          <button
            type="button"
            onClick={onShowViz}
            title="Visualize (ER diagram, statistics)"
            aria-label="Visualize"
            className="btn btn-ghost btn-sm flex-shrink-0">
            <FiBarChart2 className="size-4" />
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => onTogglePanel('history')}
        title="Query history"
        aria-label="Query history"
        className="btn btn-ghost btn-sm flex-shrink-0">
        <FiClock className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => onTogglePanel('bookmarks')}
        title="Bookmarks"
        aria-label="Bookmarks"
        className="btn btn-ghost btn-sm flex-shrink-0">
        <FiBookmark className="size-4" />
      </button>
      <button
        type="button"
        onClick={onExecute}
        className="btn btn-primary btn-sm flex-shrink-0">
        <FiPlay className="size-4" />
        <span className="hidden sm:inline">Execute</span>
      </button>
      <button
        type="button"
        onClick={onExplain}
        disabled={!hasDb}
        title="Explain query plan"
        aria-label="Explain query plan"
        className="btn btn-ghost btn-sm flex-shrink-0">
        <FiCpu className="size-4" />
      </button>
      <button
        type="button"
        onClick={onFormat}
        title="Format SQL (Ctrl+Shift+Enter)"
        aria-label="Format SQL"
        className="btn btn-ghost btn-sm flex-shrink-0">
        <FiCode className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Copy result"
        onClick={onCopyResult}
        className="btn btn-ghost btn-sm flex-shrink-0">
        <FiCopy className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Bookmark query"
        onClick={onBookmark}
        className="btn btn-ghost btn-sm flex-shrink-0">
        <FiBookmark className="size-4" />
      </button>
    </header>
  );
};
