import type { FC, MouseEvent, Ref } from 'react';

import { SheetsSidebar } from '@/components/molecules/SheetsSidebar';
import type { SqliteTableMeta } from '@/types/sqlite';

interface DbSchemaSidebarProps {
  open: boolean;
  tables: SqliteTableMeta[];
  activeTable: string | null;
  opfsFiles: string[];
  expandedTables: Record<string, boolean>;
  width: number;
  searchRef: Ref<HTMLInputElement>;
  onToggleTable: (name: string) => void;
  onSelectTable: (name: string) => void;
  onLoadOpfs: (f: string) => void;
  onStartResize: (e: MouseEvent) => void;
}

export const DbSchemaSidebar: FC<DbSchemaSidebarProps> = ({
  open,
  tables,
  activeTable,
  opfsFiles,
  expandedTables,
  width,
  searchRef,
  onToggleTable,
  onSelectTable,
  onLoadOpfs,
  onStartResize,
}) => {
  if (!open) return null;
  return (
    <>
      <div className="max-sm:absolute max-sm:inset-y-0 max-sm:left-0 max-sm:z-30 max-sm:h-full max-sm:shadow-2xl">
        <SheetsSidebar
          tables={tables}
          activeTable={activeTable}
          opfsFiles={opfsFiles}
          expandedTables={expandedTables}
          onToggleTable={onToggleTable}
          onSelectTable={onSelectTable}
          onLoadOpfs={onLoadOpfs}
          searchRef={searchRef}
          width={width}
        />
      </div>
      <div
        onMouseDown={onStartResize}
        className="bg-base-200 hover:bg-primary/60 hidden w-1 flex-shrink-0 transition-colors hover:cursor-col-resize sm:block"
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
      />
    </>
  );
};
