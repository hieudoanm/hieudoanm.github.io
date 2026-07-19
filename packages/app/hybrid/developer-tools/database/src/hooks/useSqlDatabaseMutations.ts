import { useCallback } from 'react';

import { SqlDatabaseState } from '@/hooks/useSqlDatabaseState';
import {
  enumerateTables,
  getRowId,
  selectTableWithInstance,
} from '@/hooks/sqlDatabaseHelpers';
import type { SqliteCell } from '@/types/sqlite';
import { formatNumber } from '@/utils/sqlExport';

export const IMPORT_BATCH_SIZE = 500;

export const useSqlDatabaseMutations = (state: SqlDatabaseState) => {
  const updateCell = useCallback(
    (
      tableName: string,
      columnName: string,
      rowIndex: number,
      value: SqliteCell
    ): boolean => {
      const instance = state.dbRef.current;
      if (!instance) return false;
      const rowid = getRowId(instance, tableName, rowIndex);
      if (rowid === undefined) return false;
      try {
        instance.run(
          `UPDATE "${tableName}" SET "${columnName}" = ? WHERE rowid = ?`,
          [value, rowid]
        );
        selectTableWithInstance(instance, tableName, state);
        return true;
      } catch (e: unknown) {
        state.setError(e instanceof Error ? e.message : String(e));
        state.setStatus('Update failed');
        return false;
      }
    },
    [state]
  );

  const deleteRow = useCallback(
    (tableName: string, rowIndex: number): boolean => {
      const instance = state.dbRef.current;
      if (!instance) return false;
      const rowid = getRowId(instance, tableName, rowIndex);
      if (rowid === undefined) return false;
      try {
        instance.run(`DELETE FROM "${tableName}" WHERE rowid = ?`, [rowid]);
        selectTableWithInstance(instance, tableName, state);
        return true;
      } catch (e: unknown) {
        state.setError(e instanceof Error ? e.message : String(e));
        state.setStatus('Delete failed');
        return false;
      }
    },
    [state]
  );

  const addRow = useCallback(
    (tableName: string): boolean => {
      const instance = state.dbRef.current;
      if (!instance) return false;
      try {
        instance.run(`INSERT INTO "${tableName}" DEFAULT VALUES`);
        selectTableWithInstance(instance, tableName, state);
        return true;
      } catch {
        try {
          instance.run(`INSERT INTO "${tableName}" VALUES (NULL)`);
          selectTableWithInstance(instance, tableName, state);
          return true;
        } catch (e: unknown) {
          state.setError(e instanceof Error ? e.message : String(e));
          state.setStatus('Insert failed');
          return false;
        }
      }
    },
    [state]
  );

  const importRows = useCallback(
    (
      tableName: string,
      columns: string[],
      rows: SqliteCell[][],
      onProgress: (done: number, total: number) => void
    ): { inserted: number; failed: number } => {
      const instance = state.dbRef.current;
      if (!instance) return { inserted: 0, failed: 0 };
      const colList = columns.map((c) => `"${c}"`).join(', ');
      const placeholders = columns.map(() => '?').join(', ');
      const stmt = `INSERT INTO "${tableName}" (${colList}) VALUES (${placeholders})`;
      let inserted = 0;
      let failed = 0;
      try {
        instance.run('BEGIN');
        for (const row of rows) {
          try {
            instance.run(stmt, row);
            inserted += 1;
          } catch {
            failed += 1;
          }
        }
        instance.run('COMMIT');
      } catch (e: unknown) {
        instance.run('ROLLBACK');
        state.setError(e instanceof Error ? e.message : String(e));
      }
      if (rows.length > 0) onProgress(rows.length, rows.length);
      state.setTables(enumerateTables(instance));
      selectTableWithInstance(instance, tableName, state);
      state.setStatus(
        `Imported ${formatNumber(inserted)} rows into "${tableName}"${failed ? ` · ${failed} failed` : ''}`
      );
      return { inserted, failed };
    },
    [state]
  );

  const importRowsAsync = useCallback(
    async (
      tableName: string,
      columns: string[],
      rows: SqliteCell[][],
      onProgress: (done: number, total: number) => void
    ): Promise<{ inserted: number; failed: number }> => {
      const instance = state.dbRef.current;
      if (!instance) return { inserted: 0, failed: 0 };
      const colList = columns.map((c) => `"${c}"`).join(', ');
      const placeholders = columns.map(() => '?').join(', ');
      const stmt = `INSERT INTO "${tableName}" (${colList}) VALUES (${placeholders})`;
      let inserted = 0;
      let failed = 0;
      for (let start = 0; start < rows.length; start += IMPORT_BATCH_SIZE) {
        const chunk = rows.slice(start, start + IMPORT_BATCH_SIZE);
        try {
          instance.run('BEGIN');
          for (const row of chunk) {
            try {
              instance.run(stmt, row);
              inserted += 1;
            } catch {
              failed += 1;
            }
          }
          instance.run('COMMIT');
        } catch (e: unknown) {
          instance.run('ROLLBACK');
          state.setError(e instanceof Error ? e.message : String(e));
        }
        onProgress(
          Math.min(start + IMPORT_BATCH_SIZE, rows.length),
          rows.length
        );
        if (start + IMPORT_BATCH_SIZE < rows.length) {
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
      }
      state.setTables(enumerateTables(instance));
      selectTableWithInstance(instance, tableName, state);
      state.setStatus(
        `Imported ${formatNumber(inserted)} rows into "${tableName}"${failed ? ` · ${failed} failed` : ''}`
      );
      return { inserted, failed };
    },
    [state]
  );

  return { updateCell, deleteRow, addRow, importRows, importRowsAsync };
};
