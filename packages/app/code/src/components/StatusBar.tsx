import { LuPanelLeftClose, LuPanelLeftOpen, LuWrapText } from 'react-icons/lu';
import { getFileIcon } from '../utils/editor-languages';

interface StatusBarProps {
  path: string;
  line: number;
  col: number;
  dirty: boolean;
  wordWrap: boolean;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onToggleWordWrap: () => void;
}

export const StatusBar = ({
  path,
  line,
  col,
  dirty,
  wordWrap,
  sidebarOpen,
  onToggleSidebar,
  onToggleWordWrap,
}: StatusBarProps) => {
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
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleWordWrap}
          className={`hover:text-base-content cursor-pointer ${wordWrap ? 'text-primary' : ''}`}
          title="Toggle word wrap">
          <LuWrapText className="h-3.5 w-3.5" />
        </button>
        {dirty && <span className="text-primary">●</span>}
        <span className="flex items-center gap-1">
          {getFileIcon(path)}
          {ext}
        </span>
      </div>
    </div>
  );
};
