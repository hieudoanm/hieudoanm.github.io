import { useState } from 'react';
import {
  LuChevronDown,
  LuChevronRight,
  LuFile,
  LuFilePlus,
  LuFolder,
  LuFolderOpen,
  LuFolderPlus,
  LuTrash2,
  LuX,
} from 'react-icons/lu';
import type { FileNode } from '../utils/tree';
import { getFileIcon } from '../utils/editor-languages';

interface FileTreeProps {
  root: FileNode | null;
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
}

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  onOpenFile: (path: string) => void;
  onDeleteFile: (path: string) => void;
  onToggleDir: (path: string) => void;
  onContextMenu: (
    e: React.MouseEvent,
    path: string,
    name: string,
    isDir: boolean
  ) => void;
}

const TreeNode = ({
  node,
  depth,
  onOpenFile,
  onDeleteFile,
  onToggleDir,
  onContextMenu,
}: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(false);
  const isDir = node.type === 'dir';
  const loaded = node.children !== undefined;

  return (
    <div>
      <div
        className={`group hover:bg-base-200 flex cursor-pointer items-center gap-1 px-2 py-0.5 text-sm select-none`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (isDir) {
            if (!loaded) {
              onToggleDir(node.path);
            }
            setExpanded((v) => !v);
          } else {
            onOpenFile(node.path);
          }
        }}
        onContextMenu={(e) => onContextMenu(e, node.path, node.name, isDir)}>
        <span className="flex w-5 items-center justify-center text-xs">
          {isDir ? (
            expanded && loaded ? (
              <LuChevronDown className="h-3 w-3 shrink-0" />
            ) : (
              <LuChevronRight className="h-3 w-3 shrink-0" />
            )
          ) : (
            <span className="h-3 w-3" />
          )}
        </span>
        <span className="flex w-4 items-center justify-center text-xs">
          {isDir ? (
            expanded && loaded ? (
              <LuFolderOpen className="text-base-content/60 h-4 w-4" />
            ) : (
              <LuFolder className="text-base-content/60 h-4 w-4" />
            )
          ) : (
            getFileIcon(node.path)
          )}
        </span>
        <span className="flex-1 truncate">{node.name}</span>
        {!isDir && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFile(node.path);
            }}
            className="text-base-content/40 hover:text-error opacity-0 group-hover:opacity-100"
            title="Delete file">
            <LuTrash2 className="h-3 w-3" />
          </button>
        )}
      </div>
      {isDir && expanded && loaded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              onOpenFile={onOpenFile}
              onDeleteFile={onDeleteFile}
              onToggleDir={onToggleDir}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree = ({
  root,
  onOpenFile,
  onOpenFolder,
  onOpenFileDialog,
  onCloseSidebar,
  onAddFile,
  onAddDir,
  onDeleteFile,
  onToggleDir,
  onContextMenu,
}: FileTreeProps) => {
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
