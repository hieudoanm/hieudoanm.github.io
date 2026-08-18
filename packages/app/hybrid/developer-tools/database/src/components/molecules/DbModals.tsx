import type { FC } from 'react';

import { ExportModal } from '@/components/molecules/ExportModal';
import { ImportModal } from '@/components/molecules/ImportModal';
import { TableDesignerModal } from '@/components/organisms/TableDesignerModal';
import { VisualizationModal } from '@/components/organisms/VisualizationModal';
import type { ResultTab } from '@/types/sqlite';
import type {
  SqliteCell,
  SqliteDatabase,
  SqliteTableMeta,
} from '@/types/sqlite';
import type { DesignColumn, TableDesign } from '@/utils/schema';

interface DbModalsProps {
  showExport: boolean;
  activeTab: ResultTab | null;
  activeTable: string | null;
  exportColumns: string[];
  exportRows: SqliteCell[][];
  onCloseExport: () => void;
  showImport: boolean;
  tables: SqliteTableMeta[];
  onImport: (
    tableName: string,
    columns: string[],
    rows: SqliteCell[][],
    onProgress: (done: number, total: number) => void
  ) => Promise<{ inserted: number; failed: number }>;
  onCloseImport: () => void;
  designerOpen: boolean;
  designingTable: string | null;
  design: TableDesign | null;
  onSaveDesign: (name: string, columns: DesignColumn[]) => void;
  onCloseDesigner: () => void;
  showViz: boolean;
  dbInstance: SqliteDatabase | null;
  dbFileName: string | null;
  onCloseViz: () => void;
}

export const DbModals: FC<DbModalsProps> = ({
  showExport,
  activeTab,
  activeTable,
  exportColumns,
  exportRows,
  onCloseExport,
  showImport,
  tables,
  onImport,
  onCloseImport,
  designerOpen,
  designingTable,
  design,
  onSaveDesign,
  onCloseDesigner,
  showViz,
  dbInstance,
  dbFileName,
  onCloseViz,
}) => {
  const tableName = activeTab
    ? activeTab.explain
      ? 'explain_plan'
      : 'query_result'
    : (activeTable ?? 'query_result');
  return (
    <>
      {showExport && exportColumns.length > 0 && (
        <ExportModal
          tableName={tableName}
          columns={exportColumns}
          rows={exportRows}
          onClose={onCloseExport}
        />
      )}
      {showImport && (
        <ImportModal
          tables={tables}
          defaultTable={activeTable}
          onImport={onImport}
          onClose={onCloseImport}
        />
      )}
      {designerOpen && (
        <TableDesignerModal
          tableName={designingTable}
          initialDesign={design}
          tables={tables}
          onSave={onSaveDesign}
          onClose={onCloseDesigner}
        />
      )}
      {showViz && dbInstance && (
        <VisualizationModal
          dbInstance={dbInstance}
          dbFileName={dbFileName}
          onClose={onCloseViz}
        />
      )}
    </>
  );
};
