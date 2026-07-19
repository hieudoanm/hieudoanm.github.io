import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { getFileIcon } from '../utils/editor-languages';

interface QuickOpenProps {
  open: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
  collectFiles: () => Promise<string[]>;
}

export const QuickOpen: FC<QuickOpenProps> = ({
  open,
  onClose,
  onSelect,
  collectFiles,
}) => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIdx(0);
      collectFiles().then(setFiles);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, collectFiles]);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(files.slice(0, 20));
      setSelectedIdx(0);
      return;
    }
    const lower = query.toLowerCase();
    const results = files
      .filter((f) => f.toLowerCase().includes(lower))
      .slice(0, 20);
    setFiltered(results);
    setSelectedIdx(0);
  }, [query, files]);

  const handleSelect = useCallback(
    (path: string) => {
      onSelect(path);
      onClose();
    },
    [onSelect, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIdx]) {
          handleSelect(filtered[selectedIdx]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [filtered, selectedIdx, handleSelect, onClose]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={() => {}}
      />
      <div className="bg-base-100 relative z-10 w-full max-w-lg rounded-lg shadow-2xl">
        <input
          ref={inputRef}
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search files by name..."
          className="input input-bordered w-full rounded-b-none text-sm"
        />
        {filtered.length > 0 && (
          <ul className="max-h-80 overflow-auto py-1">
            {filtered.map((path, idx) => {
              const name = path.split('/').pop() ?? path;
              return (
                <li
                  key={path}
                  onClick={() => handleSelect(path)}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className={`flex cursor-pointer items-center gap-2 px-4 py-1.5 text-sm ${
                    idx === selectedIdx ? 'bg-base-300' : ''
                  }`}>
                  <span className="text-base-content/60">
                    {getFileIcon(path)}
                  </span>
                  <span className="flex-1 truncate">{name}</span>
                  <span className="text-base-content/40 truncate text-xs">
                    {path}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        {query && filtered.length === 0 && (
          <p className="text-base-content/40 p-4 text-center text-xs">
            No files found
          </p>
        )}
      </div>
    </div>
  );
};
