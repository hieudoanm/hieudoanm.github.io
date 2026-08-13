import type { DbPageState } from '@/hooks/useDbPageState';
import type {
  SqliteCell,
  SqliteDatabase,
  SqliteQueryResult,
  SqliteTableMeta,
} from '@/types/sqlite';
import { copyToClipboard } from '@/utils/format';
import type { DesignColumn, TableDesign } from '@/utils/schema';
import { convertToJSON, convertToSQL } from '@/utils/sqlExport';
import { downloadText } from '@/utils/sqlDump';

interface ActionsProps {
  state: Pick<
    DbPageState,
    | 'designerOpen'
    | 'setDesignerOpen'
    | 'designingTable'
    | 'setDesigningTable'
    | 'design'
    | 'setDesign'
    | 'showExport'
    | 'setShowExport'
    | 'showImport'
    | 'setShowImport'
    | 'showViz'
    | 'setShowViz'
  >;
  activeTable: string | null;
  queryResult: SqliteQueryResult;
  tables: SqliteTableMeta[];
  dbInstance: SqliteDatabase | null;
  dbFileName: string | null;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  updateCell: (
    tableName: string,
    columnName: string,
    rowIndex: number,
    value: SqliteCell
  ) => boolean;
  deleteRow: (tableName: string, rowIndex: number) => boolean;
  addRow: (tableName: string) => boolean;
  getTableDesign: (tableName: string) => TableDesign | null;
  createTableFromDesign: (name: string, columns: DesignColumn[]) => boolean;
  alterTableFromDesign: (
    name: string,
    oldColumns: DesignColumn[],
    columns: DesignColumn[]
  ) => boolean;
  dumpSql: () => string | null;
}

export interface DbPageActions {
  designerOpen: boolean;
  setDesignerOpen: (v: boolean) => void;
  designingTable: string | null;
  design: TableDesign | null;
  showExport: boolean;
  setShowExport: (v: boolean) => void;
  showImport: boolean;
  setShowImport: (v: boolean) => void;
  showViz: boolean;
  setShowViz: (v: boolean) => void;
  openNewTable: () => void;
  openEditTable: () => void;
  handleSaveDesign: (name: string, columns: DesignColumn[]) => void;
  handleAddRow: () => void;
  handleUpdateCell: (
    rowIndex: number,
    colIdx: number,
    value: SqliteCell
  ) => void;
  handleDeleteRow: (rowIndex: number) => void;
  handleCopyRow: (rowIndex: number, fmt: 'sql' | 'json') => Promise<void>;
  handleExportSql: () => void;
  openImport: () => void;
}

export const useDbPageActions = ({
  state,
  activeTable,
  queryResult,
  tables,
  dbInstance,
  dbFileName,
  addToast,
  updateCell,
  deleteRow,
  addRow,
  getTableDesign,
  createTableFromDesign,
  alterTableFromDesign,
  dumpSql,
}: ActionsProps): DbPageActions => {
  const handleAddRow = () => {
    if (!activeTable) return;
    if (addRow(activeTable)) addToast('Row added', 'success');
  };

  const handleUpdateCell = (
    rowIndex: number,
    colIdx: number,
    value: SqliteCell
  ) => {
    if (!activeTable) return;
    const col = queryResult.columns[colIdx];
    if (updateCell(activeTable, col, rowIndex, value))
      addToast(`Updated ${col}`, 'success');
  };

  const handleDeleteRow = (rowIndex: number) => {
    if (!activeTable) return;
    if (!window.confirm(`Delete row ${rowIndex + 1} from "${activeTable}"?`))
      return;
    if (deleteRow(activeTable, rowIndex)) addToast('Row deleted', 'success');
  };

  const handleCopyRow = async (rowIndex: number, fmt: 'sql' | 'json') => {
    const row = queryResult.rows[rowIndex];
    if (!row) return;
    const name = activeTable ?? 'query_result';
    const text =
      fmt === 'sql'
        ? convertToSQL(name, queryResult.columns, [row])
        : convertToJSON(queryResult.columns, [row]);
    await copyToClipboard(text);
    addToast(fmt === 'sql' ? 'Copied SQL INSERT' : 'Copied JSON', 'success');
  };

  const openNewTable = () => {
    state.setDesigningTable(null);
    state.setDesign(null);
    state.setDesignerOpen(true);
  };

  const openEditTable = () => {
    if (!activeTable) return;
    state.setDesigningTable(activeTable);
    state.setDesign(getTableDesign(activeTable));
    state.setDesignerOpen(true);
  };

  const handleSaveDesign = (name: string, columns: DesignColumn[]) => {
    const ok = state.designingTable
      ? alterTableFromDesign(
          state.designingTable,
          state.design?.columns ?? [],
          columns
        )
      : createTableFromDesign(name, columns);
    if (ok)
      addToast(
        state.designingTable
          ? `Updated "${state.designingTable}"`
          : `Created "${name}"`,
        'success'
      );
  };

  const handleExportSql = () => {
    const sql = dumpSql();
    if (sql === null) return;
    downloadText(
      (dbFileName ?? 'database').replace(/\.db$/i, '') + '.sql',
      sql
    );
    addToast('SQL dump exported', 'success');
  };

  const openImport = () => {
    state.setShowImport(true);
  };

  return {
    designerOpen: state.designerOpen,
    setDesignerOpen: state.setDesignerOpen,
    designingTable: state.designingTable,
    design: state.design,
    showExport: state.showExport,
    setShowExport: state.setShowExport,
    showImport: state.showImport,
    setShowImport: state.setShowImport,
    showViz: state.showViz,
    setShowViz: state.setShowViz,
    openNewTable,
    openEditTable,
    handleSaveDesign,
    handleAddRow,
    handleUpdateCell,
    handleDeleteRow,
    handleCopyRow,
    handleExportSql,
    openImport,
  };
};
