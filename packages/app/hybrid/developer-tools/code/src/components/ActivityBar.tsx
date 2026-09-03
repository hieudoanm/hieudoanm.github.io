import { type FC } from 'react';
import Link from 'next/link';
import {
  LuFolderOpen,
  LuSearch,
  LuPalette,
  LuFolderClosed,
  LuDownload,
} from 'react-icons/lu';

type SidebarState = 'closed' | 'explorer' | 'search';

interface ActivityBarProps {
  sidebarState: SidebarState;
  theme: 'code-dark' | 'code-light';
  onOpenExplorer: () => void;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
}

export const ActivityBar: FC<ActivityBarProps> = ({
  sidebarState,
  theme,
  onOpenExplorer,
  onOpenSearch,
  onToggleTheme,
}) => (
  <div className="bg-base-200 border-base-100 flex w-12 flex-col items-center gap-2 border-r py-2">
    <button
      onClick={onOpenExplorer}
      className={`btn btn-ghost btn-square btn-sm ${sidebarState === 'explorer' ? 'text-primary' : 'text-base-content/60'}`}
      title={sidebarState === 'explorer' ? 'Close Explorer' : 'Open Explorer'}>
      {sidebarState === 'explorer' ? (
        <LuFolderOpen className="h-5 w-5" />
      ) : (
        <LuFolderClosed className="h-5 w-5" />
      )}
    </button>
    <button
      onClick={onOpenSearch}
      className={`btn btn-ghost btn-square btn-sm ${sidebarState === 'search' ? 'text-primary' : 'text-base-content/60'}`}
      title="Search (Cmd+Shift+F)">
      <LuSearch className="h-5 w-5" />
    </button>
    <button
      onClick={onToggleTheme}
      className={`btn btn-ghost btn-square btn-sm ${theme === 'code-light' ? 'text-primary' : 'text-base-content/60'}`}
      title={`Switch to ${theme === 'code-dark' ? 'code-light' : 'code-dark'} theme`}>
      <LuPalette className="h-5 w-5" />
    </button>
    <div className="flex-1" />
    <Link
      href="/downloads"
      className="btn btn-ghost btn-square btn-sm text-base-content/60"
      title="Downloads">
      <LuDownload className="h-5 w-5" />
    </Link>
  </div>
);
