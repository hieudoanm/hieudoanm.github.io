import { type FC, useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  path: string;
  name: string;
  isDir: boolean;
  rootPath: string | null;
  onClose: () => void;
  onRename: (path: string) => void;
  onDelete: (path: string) => void;
  onDuplicate: (path: string) => void;
}

export const ContextMenu: FC<ContextMenuProps> = ({
  x,
  y,
  path,
  name,
  isDir,
  rootPath,
  onClose,
  onRename,
  onDelete,
  onDuplicate,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', escHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', escHandler);
    };
  }, [onClose]);

  const relativePath = rootPath
    ? path.startsWith(rootPath)
      ? path.slice(rootPath.length).replace(/^\//, '')
      : path
    : path;

  const items: { label: string; action: () => void; disabled?: boolean }[] = [
    { label: 'Copy path', action: () => navigator.clipboard.writeText(path) },
    {
      label: 'Copy relative path',
      action: () => navigator.clipboard.writeText(relativePath),
    },
    { label: 'Rename', action: () => onRename(path) },
    { label: 'Duplicate', action: () => onDuplicate(path), disabled: isDir },
    { label: 'Delete', action: () => onDelete(path) },
  ];

  return (
    <div
      ref={ref}
      className="bg-base-100 border-base-300 fixed z-50 min-w-40 rounded-md border py-1 shadow-xl"
      style={{ left: x, top: y }}>
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            if (!item.disabled) item.action();
          }}
          disabled={item.disabled}
          className={`w-full px-3 py-1.5 text-left text-sm ${
            item.disabled
              ? 'text-base-content/30 cursor-not-allowed'
              : 'hover:bg-base-300 cursor-pointer'
          }`}>
          {item.label}
        </button>
      ))}
    </div>
  );
};
