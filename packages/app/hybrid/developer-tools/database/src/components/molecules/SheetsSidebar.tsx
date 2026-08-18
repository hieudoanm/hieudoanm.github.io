import { memo, useState, type FC, type Ref } from 'react';
import {
  FiChevronDown,
  FiChevronRight,
  FiDatabase,
  FiSearch,
  FiTable,
} from 'react-icons/fi';

import type { SqliteTableMeta } from '@/types/sqlite';
import { formatNumber } from '@/utils/sqlExport';

interface SheetsSidebarProps {
  tables: SqliteTableMeta[];
  activeTable: string | null;
  opfsFiles: string[];
  expandedTables?: Record<string, boolean>;
  onToggleTable?: (name: string) => void;
  onSelectTable: (name: string) => void;
  onLoadOpfs: (f: string) => void;
  searchRef?: Ref<HTMLInputElement>;
  width?: number;
}

export const SheetsSidebar: FC<SheetsSidebarProps> = memo(
  ({
    tables,
    activeTable,
    opfsFiles,
    expandedTables = {},
    onToggleTable,
    onSelectTable,
    onLoadOpfs,
    searchRef,
    width = 224,
  }) => {
    const [search, setSearch] = useState('');
    const q = search.trim().toLowerCase();
    const filtered = q
      ? tables.filter((t) => t.name.toLowerCase().includes(q))
      : tables;

    return (
      <aside
        className="bg-base-200 border-base-300 flex flex-shrink-0 flex-col overflow-hidden border-r max-sm:h-full"
        style={{ width }}>
        <div className="px-3 pt-3 pb-1">
          <p className="text-base-content/30 text-[10px] font-normal tracking-widest uppercase">
            Tables
          </p>
        </div>
        <div className="px-3 pb-2">
          <label className="input input-sm input-bordered flex items-center gap-2">
            <FiSearch className="text-base-content/40 size-3.5 flex-shrink-0" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter…"
              spellCheck={false}
              className="w-full bg-transparent text-xs outline-none"
            />
          </label>
        </div>
        <div className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-2">
          {filtered.length === 0 && (
            <p className="text-base-content/30 px-2 py-3 text-xs italic">
              {q ? 'No matches' : 'No tables'}
            </p>
          )}
          {filtered.map((t) => (
            <div key={t.name}>
              <button
                onClick={() => onSelectTable(t.name)}
                className={`group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-all ${activeTable === t.name ? 'bg-primary/10 text-primary border-primary/20 border' : 'text-base-content/60 hover:text-base-content hover:bg-base-300 border border-transparent'}`}>
                {onToggleTable && (
                  <span
                    role="button"
                    aria-label={`Toggle ${t.name}`}
                    className="text-base-content/30 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTable(t.name);
                    }}>
                    {expandedTables[t.name] ? (
                      <FiChevronDown className="size-3" />
                    ) : (
                      <FiChevronRight className="size-3" />
                    )}
                  </span>
                )}
                <span
                  className={`flex-shrink-0 ${activeTable === t.name ? 'text-primary' : 'text-base-content/30'}`}>
                  <FiTable className="size-3.5" />
                </span>
                <span className="flex-1 truncate text-xs font-normal">
                  {t.name}
                </span>
                <span className="text-base-content/30 font-mono text-[10px] tabular-nums">
                  {formatNumber(t.rowCount)}
                </span>
              </button>
              {expandedTables[t.name] && t.columns.length > 0 && (
                <div className="border-base-300 mt-0.5 mb-1 ml-5 space-y-0.5 border-l pl-2">
                  {t.columns.map((col) => (
                    <div
                      key={col.name}
                      className="text-base-content/40 flex items-center gap-1.5 font-mono text-[10px]">
                      {col.primaryKey && (
                        <span className="text-warning text-[9px] font-bold">
                          PK
                        </span>
                      )}
                      <span className="truncate">{col.name}</span>
                      <span className="text-base-content/25">{col.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {opfsFiles.length > 0 && (
          <>
            <div className="border-base-300 border-t px-3 pt-3 pb-1">
              <p className="text-base-content/30 text-[10px] font-normal tracking-widest uppercase">
                Saved (OPFS)
              </p>
            </div>
            <div className="space-y-0.5 px-2 pb-2">
              {opfsFiles.map((f) => (
                <button
                  key={f}
                  onClick={() => onLoadOpfs(f)}
                  className="text-base-content/50 hover:text-base-content hover:bg-base-300 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-all">
                  <span className="text-base-content/30 flex-shrink-0">
                    <FiDatabase className="size-3.5" />
                  </span>
                  <span className="truncate font-mono text-xs">{f}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </aside>
    );
  }
);
SheetsSidebar.displayName = 'SheetsSidebar';
