import { type FC } from 'react';
import {
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuSave,
  LuWrapText,
} from 'react-icons/lu';
import { getFileIcon } from '../utils/editor-languages';

interface StatusBarProps {
  path: string;
  line: number;
  col: number;
  selectionCount: number;
  fileSize: number;
  autoSave: boolean;
  dirty: boolean;
  wordWrap: boolean;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleWordWrap: () => void;
  onToggleAutoSave: () => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const StatusBar: FC<StatusBarProps> = ({
  path,
  line,
  col,
  selectionCount,
  fileSize,
  autoSave,
  dirty,
  wordWrap,
  sidebarOpen,
  onToggleSidebar,
  onToggleWordWrap,
  onToggleAutoSave,
}) => {
  const name = path.split('/').pop() ?? path;
  const ext = name.includes('.')
    ? name.split('.').pop()?.toUpperCase()
    : 'TEXT';

  return (
    <div className="bg-base-200 border-base-100 text-base-content/60 flex items-center justify-between border-t px-2 py-0.5 text-xs">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="hover:text-base-content cursor-pointer">
          {sidebarOpen ? (
            <LuPanelLeftClose className="h-3.5 w-3.5" />
          ) : (
            <LuPanelLeftOpen className="h-3.5 w-3.5" />
          )}
        </button>
        <span>
          Ln {line}, Col {col}
          {selectionCount > 0 && <span> ({selectionCount} sel)</span>}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleAutoSave}
          className={`hover:text-base-content cursor-pointer ${autoSave ? 'text-primary' : ''}`}
          title={`Auto save: ${autoSave ? 'on' : 'off'}`}>
          <LuSave className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onToggleWordWrap}
          className={`hover:text-base-content cursor-pointer ${wordWrap ? 'text-primary' : ''}`}
          title="Toggle word wrap">
          <LuWrapText className="h-3.5 w-3.5" />
        </button>
        {dirty && <span className="text-primary">●</span>}
        <span>{formatFileSize(fileSize)}</span>
        <span className="flex items-center gap-1">
          {getFileIcon(path)}
          {ext}
        </span>
      </div>
    </div>
  );
};
