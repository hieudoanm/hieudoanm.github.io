import { useCallback } from 'react';

import { SqlDatabaseState } from '@/hooks/useSqlDatabaseState';
import { selectTableWithInstance } from '@/hooks/sqlDatabaseHelpers';
import type { SqliteTableMeta } from '@/types/sqlite';
import { formatBytes } from '@/utils/sqlExport';
import { listOPFSFiles, opfsAvailable, saveToOPFS } from '@/utils/opfs';
import { createSeedData } from '@/utils/seedData';

export const useSqlDatabaseIo = (state: SqlDatabaseState) => {
  const createNewDb = useCallback(async () => {
    state.setLoading(true);
    state.setLoadingMsg('Creating database…');
    try {
      const SQL = await state.loadSqlJs();
      if (state.dbRef.current) {
        try {
          state.dbRef.current.close();
        } catch (e: unknown) {
          console.error('[useSqlDatabase] Error closing existing DB:', e);
        }
      }
      const instance = new SQL.Database();
      createSeedData(instance);
      const metas: SqliteTableMeta[] = ['customers', 'orders', 'products'].map(
        (name) => {
          const r = instance.exec(`SELECT COUNT(*) FROM "${name}"`);
          return { name, rowCount: Number(r[0].values[0][0]), columns: [] };
        }
      );
      state.setDbInstance(instance);
      state.setDbFileName('demo_database.db');
      state.setTables(metas);
      selectTableWithInstance(instance, 'customers', state);
      state.setError(null);
      state.setStatus('Created demo database · 3 tables');
    } catch (e: unknown) {
      state.setError(e instanceof Error ? e.message : String(e));
      state.setStatus('Error: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      state.setLoading(false);
    }
  }, [state]);

  const handleSave = async () => {
    if (!state.dbInstance || !state.dbFileName) return;
    if (!(await opfsAvailable())) {
      alert('OPFS is not available. Use Chrome or Edge.');
      return;
    }
    try {
      const data = state.dbInstance.export();
      await saveToOPFS(state.dbFileName, data);
      state.setStatus(
        `Saved to OPFS · "${state.dbFileName}" · ${formatBytes(data.length)}`
      );
      listOPFSFiles().then(state.setOpfsFiles);
    } catch (e: unknown) {
      state.setStatus(
        'OPFS save error: ' + (e instanceof Error ? e.message : String(e))
      );
    }
  };

  const handleExport = () => {
    if (!state.dbInstance) return;
    const data = state.dbInstance.export();
    const blob = new Blob([data.buffer as ArrayBuffer], {
      type: 'application/octet-stream',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.dbFileName ?? 'export.db';
    a.click();
    URL.revokeObjectURL(url);
    state.setStatus(
      `Exported "${state.dbFileName}" · ${formatBytes(data.length)}`
    );
  };

  return { createNewDb, handleSave, handleExport };
};
