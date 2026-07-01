import { FC, memo } from 'react';

import { IcoDatabase, IcoTable } from '../icons';
import { TableMeta } from '../types';
import { formatNumber } from '../utils/sqlExport';

interface SidebarProps {
  tables: TableMeta[];
  activeTable: string | null;
  opfsFiles: string[];
  onSelectTable: (name: string) => void;
  onLoadOpfs: (f: string) => void;
}

export const Sidebar: FC<SidebarProps> = memo(
  ({ tables, activeTable, opfsFiles, onSelectTable, onLoadOpfs }) => (
    <aside className="bg-base-200 border-base-300 flex w-56 flex-shrink-0 flex-col overflow-hidden border-r">
      <div className="px-3 pt-3 pb-1">
        <p className="text-base-content/30 text-[10px] font-normal tracking-widest uppercase">
          Tables
        </p>
      </div>
      <div className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-2">
        {tables.length === 0 && (
          <p className="text-base-content/30 px-2 py-3 text-xs italic">
            No tables
          </p>
        )}
        {tables.map((t) => (
          <button
            key={t.name}
            onClick={() => onSelectTable(t.name)}
            className={`group flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-all ${activeTable === t.name ? 'bg-primary/10 text-primary border-primary/20 border' : 'text-base-content/60 hover:text-base-content hover:bg-base-300 border border-transparent'}`}>
            <span
              className={`flex-shrink-0 ${activeTable === t.name ? 'text-primary' : 'text-base-content/30'}`}>
              <IcoTable />
            </span>
            <span className="flex-1 truncate text-xs font-normal">
              {t.name}
            </span>
            <span className="text-base-content/30 font-mono text-[10px] tabular-nums">
              {formatNumber(t.rowCount)}
            </span>
          </button>
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
                  <IcoDatabase />
                </span>
                <span className="truncate font-mono text-xs">{f}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  )
);

Sidebar.displayName = 'Sidebar';
