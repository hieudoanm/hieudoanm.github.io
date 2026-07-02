import { type FC, useState } from 'react';
import {
  LuChevronDown,
  LuChevronRight,
  LuFolder,
  LuFolderOpen,
  LuTrash2,
} from 'react-icons/lu';
import type { FileNode } from '../utils/tree';
import { getFileIcon } from '../utils/editor-languages';

export interface TreeNodeProps {
  node: FileNode;
  depth: number;
  activePath: string | null;
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

export const TreeNode: FC<TreeNodeProps> = ({
  node,
  depth,
  activePath,
  onOpenFile,
  onDeleteFile,
  onToggleDir,
  onContextMenu,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isDir = node.type === 'dir';
  const loaded = node.children !== undefined;
  const isActive = !isDir && node.path === activePath;

  return (
    <div>
      <div
        className={`group flex cursor-pointer items-center gap-1 px-2 py-0.5 text-sm select-none ${
          isActive ? 'bg-primary/10 text-primary' : 'hover:bg-base-200'
        }`}
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
              activePath={activePath}
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
