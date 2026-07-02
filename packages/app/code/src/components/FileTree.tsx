import { type FC } from 'react';
import {
  LuFile,
  LuFilePlus,
  LuFolderOpen,
  LuFolderPlus,
  LuRefreshCw,
  LuX,
} from 'react-icons/lu';
import type { FileNode } from '../utils/tree';
import { TreeNode } from './TreeNode';

interface FileTreeProps {
  root: FileNode | null;
  activePath: string | null;
  onOpenFile: (path: string) => void;
  onOpenFolder: () => void;
  onOpenFileDialog: () => void;
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
  onRefresh: () => void;
}

export const FileTree: FC<FileTreeProps> = ({
  root,
  activePath,
  onOpenFile,
  onOpenFolder,
  onOpenFileDialog,
  onCloseSidebar,
  onAddFile,
  onAddDir,
  onDeleteFile,
  onToggleDir,
  onContextMenu,
  onRefresh,
}) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-base-200 flex items-center justify-between border-b p-2">
        <span className="text-xs font-semibold">Explorer</span>
        <div className="flex items-center gap-1">
          <button
            onClick={onAddFile}
            className="btn btn-ghost btn-xs"
            title="New File">
            <LuFilePlus className="h-4 w-4" />
          </button>
          <button
            onClick={onAddDir}
            className="btn btn-ghost btn-xs"
            title="New Folder">
            <LuFolderPlus className="h-4 w-4" />
          </button>
          <button
            onClick={onOpenFolder}
            className="btn btn-ghost btn-xs"
            title="Open Folder">
            <LuFolderOpen className="h-4 w-4" />
          </button>
          <button
            onClick={onOpenFileDialog}
            className="btn btn-ghost btn-xs"
            title="Open File">
            <LuFile className="h-4 w-4" />
          </button>
          {root && (
            <button
              onClick={onRefresh}
              className="btn btn-ghost btn-xs"
              title="Refresh">
              <LuRefreshCw className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={onCloseSidebar}
            className="btn btn-ghost btn-xs"
            title="Close sidebar">
            <LuX className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-1">
        {root ? (
          <TreeNode
            node={root}
            depth={0}
            activePath={activePath}
            onOpenFile={onOpenFile}
            onDeleteFile={onDeleteFile}
            onToggleDir={onToggleDir}
            onContextMenu={onContextMenu}
          />
        ) : (
          <p className="text-base-content/40 p-3 text-center text-xs">
            Open a folder to start
          </p>
        )}
      </div>
    </div>
  );
};
