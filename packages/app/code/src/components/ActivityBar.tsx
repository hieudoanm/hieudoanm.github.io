import { type FC } from 'react';
import {
  LuFolderOpen,
  LuSearch,
  LuPalette,
  LuFolderClosed,
} from 'react-icons/lu';

type SidebarState = 'closed' | 'explorer' | 'search';

interface ActivityBarProps {
  sidebarState: SidebarState;
  theme: 'dim' | 'winter';
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
      className={`btn btn-ghost btn-square btn-sm ${theme === 'winter' ? 'text-primary' : 'text-base-content/60'}`}
      title={`Switch to ${theme === 'dim' ? 'winter' : 'dim'} theme`}>
      <LuPalette className="h-5 w-5" />
    </button>
    <div className="flex-1" />
  </div>
);
