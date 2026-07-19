import { useCallback } from 'react';

import { SqlDatabaseState } from '@/hooks/useSqlDatabaseState';
import {
  enumerateTables,
  selectTableWithInstance,
} from '@/hooks/sqlDatabaseHelpers';
import type { SqliteQueryResult } from '@/types/sqlite';
import { formatNumber } from '@/utils/sqlExport';
import { listOPFSFiles, loadFromOPFS } from '@/utils/opfs';
import { splitStatements } from '@/utils/sqlStatements';

export const useSqlDatabaseQuery = (state: SqlDatabaseState) => {
  const openDb = useCallback(
    async (buffer: Uint8Array, filename: string) => {
      state.setLoading(true);
      state.setLoadingMsg('Initialising SQLite WASM engine…');
      try {
        const SQL = await state.loadSqlJs();
        state.setLoadingMsg('Parsing database…');
        if (state.dbRef.current) {
          try {
            state.dbRef.current.close();
          } catch (e: unknown) {
            console.error('[useSqlDatabase] Error closing existing DB:', e);
          }
        }
        const instance = new SQL.Database(buffer);
        const metas = enumerateTables(instance);
        state.setDbInstance(instance);
        state.setDbFileName(filename);
        state.setTables(metas);
        state.setStatus(
          `Opened "${filename}" · ${metas.length} table${metas.length !== 1 ? 's' : ''}`
        );
        if (metas.length > 0)
          selectTableWithInstance(instance, metas[0].name, state);
        else {
          state.setActiveTable(null);
          state.setQueryResult({ columns: [], rows: [] });
        }
        listOPFSFiles().then(state.setOpfsFiles);
      } catch (e: unknown) {
        state.setError(e instanceof Error ? e.message : String(e));
        state.setStatus(
          'Error: ' + (e instanceof Error ? e.message : String(e))
        );
      } finally {
        state.setLoading(false);
      }
    },
    [state]
  );

  const handleLoadOpfs = async (filename: string) => {
    const buf = await loadFromOPFS(filename);
    if (buf) openDb(buf, filename);
  };

  const selectTable = useCallback(
    (name: string) => {
      if (state.dbInstance)
        selectTableWithInstance(state.dbInstance, name, state);
    },
    [state]
  );

  const refreshTable = useCallback(() => {
    const instance = state.dbRef.current;
    if (!instance || !state.activeTable) return;
    const metas = enumerateTables(instance);
    state.setTables(metas);
    selectTableWithInstance(instance, state.activeTable, state);
  }, [state]);

  const runQuery = useCallback(
    (
      sql: string
    ): { ok: boolean; elapsedMs: number; result: SqliteQueryResult } => {
      const instance = state.dbRef.current;
      if (!instance)
        return { ok: false, elapsedMs: 0, result: { columns: [], rows: [] } };
      const start = performance.now();
      try {
        const res = instance.exec(sql);
        const result: SqliteQueryResult = res.length
          ? { columns: res[0].columns, rows: res[0].values }
          : { columns: [], rows: [] };
        const elapsedMs = Math.round(performance.now() - start);
        state.setQueryResult(result);
        state.setActiveTable(null);
        state.setError(null);
        state.setLastElapsed(elapsedMs);
        state.setStatus(
          `Query · ${formatNumber(result.rows.length)} rows · ${result.columns.length} columns · ${elapsedMs} ms`
        );
        return { ok: true, elapsedMs, result };
      } catch (e: unknown) {
        const elapsedMs = Math.round(performance.now() - start);
        const message = e instanceof Error ? e.message : String(e);
        state.setQueryResult({ columns: [], rows: [] });
        state.setError(message);
        state.setLastElapsed(elapsedMs);
        state.setStatus(`Query error · ${elapsedMs} ms`);
        return { ok: false, elapsedMs, result: { columns: [], rows: [] } };
      }
    },
    [state]
  );

  const runStatements = useCallback(
    (sql: string): SqliteQueryResult[] => {
      const instance = state.dbRef.current;
      if (!instance) return [];
      const results: SqliteQueryResult[] = [];
      const start = performance.now();
      try {
        for (const stmt of splitStatements(sql)) {
          const res = instance.exec(stmt);
          results.push(
            res.length
              ? { columns: res[0].columns, rows: res[0].values }
              : { columns: [], rows: [] }
          );
        }
        const elapsedMs = Math.round(performance.now() - start);
        state.setLastElapsed(elapsedMs);
        state.setError(null);
        state.setStatus(
          `Executed ${results.length} statement${results.length !== 1 ? 's' : ''} · ${elapsedMs} ms`
        );
        return results;
      } catch (e: unknown) {
        state.setError(e instanceof Error ? e.message : String(e));
        state.setStatus('Query error');
        return results;
      }
    },
    [state]
  );

  const explainQuery = useCallback(
    (sql: string): SqliteQueryResult | null => {
      const instance = state.dbRef.current;
      if (!instance) return null;
      try {
        const res = instance.exec(`EXPLAIN QUERY PLAN ${sql}`);
        return res.length
          ? { columns: res[0].columns, rows: res[0].values }
          : { columns: [], rows: [] };
      } catch (e: unknown) {
        state.setError(e instanceof Error ? e.message : String(e));
        state.setStatus('Explain error');
        return null;
      }
    },
    [state]
  );

  return {
    openDb,
    handleLoadOpfs,
    selectTable,
    refreshTable,
    runQuery,
    runStatements,
    explainQuery,
  };
};
