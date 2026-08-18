import { useState, type FC } from 'react';
import type { FileNode } from '../utils/tree';
import { EmptyExplorer } from './EmptyExplorer';
import { ExplorerToolbar } from './ExplorerToolbar';
import { TreeNode } from './TreeNode';

interface FileTreeProps {
  root: FileNode | null;
  activePath: string | null;
  onOpenFile: (path: string) => void;
  onOpenFolder: () => void;
  onCloseSidebar: () => void;
  onAddFile: () => void;
  onAddDir: () => void;
  onDeleteFile: (path: string) => void;
  onToggleDir: (path: string) => void;
  onContextMenu: (
    e: React.MouseEvent,
    path: string,
    name: string,
    isDir: boolean
  ) => void;
}

export const FileTree: FC<FileTreeProps> = ({
  root,
  activePath,
  onOpenFile,
  onOpenFolder,
  onCloseSidebar,
  onAddFile,
  onAddDir,
  onDeleteFile,
  onToggleDir,
  onContextMenu,
}) => {
  const [expandAllTrigger, setExpandAllTrigger] = useState(0);
  const [collapseAllTrigger, setCollapseAllTrigger] = useState(0);

  return (
    <div className="flex h-full w-full flex-col">
      <ExplorerToolbar
        hasRoot={root !== null}
        onAddFile={onAddFile}
        onAddDir={onAddDir}
        onOpenFolder={onOpenFolder}
        onExpandAll={() => setExpandAllTrigger((v) => v + 1)}
        onCollapseAll={() => setCollapseAllTrigger((v) => v + 1)}
        onCloseSidebar={onCloseSidebar}
      />
      <div className="flex-1 overflow-auto py-1">
        {root ? (
          <TreeNode
            node={root}
            depth={0}
            activePath={activePath}
            expandAllTrigger={expandAllTrigger}
            collapseAllTrigger={collapseAllTrigger}
            onOpenFile={onOpenFile}
            onDeleteFile={onDeleteFile}
            onToggleDir={onToggleDir}
            onContextMenu={onContextMenu}
          />
        ) : (
          <EmptyExplorer />
        )}
      </div>
    </div>
  );
};
