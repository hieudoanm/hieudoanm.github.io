import { type FC } from 'react';
import {
  LuChevronDown,
  LuChevronRight,
  LuFilePlus,
  LuFolderOpen,
  LuFolderPlus,
  LuX,
} from 'react-icons/lu';
import type { IconType } from 'react-icons';

interface ExplorerToolbarProps {
  hasRoot: boolean;
  onAddFile: () => void;
  onAddDir: () => void;
  onOpenFolder: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onCloseSidebar: () => void;
}

const ToolbarBtn: FC<{
  Icon: IconType;
  title: string;
  onClick: () => void;
}> = ({ Icon, title, onClick }) => (
  <button onClick={onClick} className="btn btn-ghost btn-xs" title={title}>
    <Icon className="h-4 w-4" />
  </button>
);

const always = (
  onAddFile: () => void,
  onAddDir: () => void,
  onOpenFolder: () => void
): { Icon: IconType; title: string; onClick: () => void }[] => [
  { Icon: LuFilePlus, title: 'New File', onClick: onAddFile },
  { Icon: LuFolderPlus, title: 'New Folder', onClick: onAddDir },
  { Icon: LuFolderOpen, title: 'Open Folder', onClick: onOpenFolder },
];

const rootOnly = (
  onExpandAll: () => void,
  onCollapseAll: () => void
): { Icon: IconType; title: string; onClick: () => void }[] => [
  { Icon: LuChevronDown, title: 'Expand all', onClick: onExpandAll },
  { Icon: LuChevronRight, title: 'Collapse all', onClick: onCollapseAll },
];

export const ExplorerToolbar: FC<ExplorerToolbarProps> = ({
  hasRoot,
  onAddFile,
  onAddDir,
  onOpenFolder,
  onExpandAll,
  onCollapseAll,
  onCloseSidebar,
}) => (
  <div className="border-base-200 flex items-center justify-between border-b p-2">
    <span className="text-xs font-semibold">Explorer</span>
    <div className="flex items-center gap-1">
      {always(onAddFile, onAddDir, onOpenFolder).map((b) => (
        <ToolbarBtn key={b.title} {...b} />
      ))}
      {hasRoot &&
        rootOnly(onExpandAll, onCollapseAll).map((b) => (
          <ToolbarBtn key={b.title} {...b} />
        ))}
      <ToolbarBtn Icon={LuX} title="Close sidebar" onClick={onCloseSidebar} />
    </div>
  </div>
);
