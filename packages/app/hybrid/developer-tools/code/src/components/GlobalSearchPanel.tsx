import { type FC, useCallback, useRef } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';
import type { SearchResult } from '../hooks/useCodePage';
import { getFileIcon } from '../utils/editor-languages';

interface GlobalSearchPanelProps {
  query: string;
  results: SearchResult[];
  searching: boolean;
  onQueryChange: (q: string) => void;
  onSearch: (q: string) => void;
  onSelectFile: (path: string) => void;
  onClose: () => void;
}

export const GlobalSearchPanel: FC<GlobalSearchPanelProps> = ({
  query,
  results,
  searching,
  onQueryChange,
  onSearch,
  onSelectFile,
  onClose,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (value: string) => {
      onQueryChange(value);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onSearch(value), 300);
    },
    [onQueryChange, onSearch]
  );

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-base-200 flex items-center gap-2 border-b p-2">
        <LuSearch className="text-base-content/60 h-4 w-4" />
        <input
          autoFocus
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch(query);
            if (e.key === 'Escape') onClose();
          }}
          placeholder="Search files..."
          className="input input-ghost input-xs flex-1"
        />
        <button
          onClick={onClose}
          className="btn btn-ghost btn-xs"
          title="Close search">
          <LuX className="h-3 w-3" />
        </button>
      </div>
      <div className="flex-1 overflow-auto py-1">
        {searching && (
          <p className="text-base-content/40 p-3 text-center text-xs">
            Searching...
          </p>
        )}
        {!searching && results.length === 0 && query && (
          <p className="text-base-content/40 p-3 text-center text-xs">
            No results found
          </p>
        )}
        {!searching &&
          results.map((r, idx) => {
            const name = r.path.split('/').pop() ?? r.path;
            return (
              <div
                key={`${r.path}:${r.line}`}
                onClick={() => onSelectFile(r.path)}
                className="hover:bg-base-200 cursor-pointer px-3 py-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-base-content/60">
                    {getFileIcon(r.path)}
                  </span>
                  <span className="truncate">{name}</span>
                  <span className="text-base-content/40 text-xs">
                    Ln {r.line}
                  </span>
                </div>
                <p className="text-base-content/40 mt-0.5 truncate pl-6 text-xs">
                  {r.text}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
