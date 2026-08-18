import { useCallback } from 'react';

import { SqlDatabaseState } from '@/hooks/useSqlDatabaseState';
import {
  enumerateTables,
  selectTableWithInstance,
} from '@/hooks/sqlDatabaseHelpers';
import type { DesignColumn, TableDesign } from '@/utils/schema';
import {
  buildAlterStatements,
  buildCreateTableSQL,
  readTableDesign,
} from '@/utils/schema';
import {
  computeDatabaseStats,
  computeMockIndexUsage,
  type DatabaseStats,
  type IndexUsageStat,
} from '@/utils/stats';
import { buildErModel, layoutErModel, type ErModel } from '@/utils/er';
import { dumpDatabase } from '@/utils/sqlDump';

export const useSqlDatabaseSchema = (state: SqlDatabaseState) => {
  const applySchemaChange = useCallback(
    (statements: string[]): boolean => {
      const instance = state.dbRef.current;
      if (!instance) return false;
      try {
        for (const stmt of statements) {
          if (!stmt.trim()) continue;
          instance.exec(stmt);
        }
        const metas = enumerateTables(instance);
        state.setTables(metas);
        if (
          state.activeTable &&
          metas.some((m) => m.name === state.activeTable)
        ) {
          selectTableWithInstance(instance, state.activeTable, state);
        }
        state.setError(null);
        state.setStatus(
          `Applied ${statements.length} schema change${statements.length !== 1 ? 's' : ''}`
        );
        return true;
      } catch (e: unknown) {
        state.setError(e instanceof Error ? e.message : String(e));
        state.setStatus('Schema change failed');
        return false;
      }
    },
    [state]
  );

  const createTableFromDesign = useCallback(
    (name: string, columns: DesignColumn[]): boolean =>
      applySchemaChange([buildCreateTableSQL(name, columns)]),
    [applySchemaChange]
  );

  const alterTableFromDesign = useCallback(
    (tableName: string, original: DesignColumn[], updated: DesignColumn[]) =>
      applySchemaChange(buildAlterStatements(tableName, original, updated)),
    [applySchemaChange]
  );

  const getTableDesign = useCallback(
    (tableName: string): TableDesign | null => {
      const instance = state.dbRef.current;
      if (!instance) return null;
      return readTableDesign((sql) => instance.exec(sql), tableName);
    },
    [state]
  );

  const getStats = useCallback((): DatabaseStats | null => {
    const instance = state.dbRef.current;
    if (!instance) return null;
    return computeDatabaseStats(instance);
  }, [state]);

  const getIndexUsage = useCallback((): IndexUsageStat[] => {
    const instance = state.dbRef.current;
    if (!instance) return [];
    return computeMockIndexUsage(instance);
  }, [state]);

  const getErModel = useCallback((): ErModel | null => {
    const instance = state.dbRef.current;
    if (!instance) return null;
    return layoutErModel(buildErModel(instance));
  }, [state]);

  const dumpSql = useCallback((): string | null => {
    const instance = state.dbRef.current;
    if (!instance) return null;
    return dumpDatabase(instance);
  }, [state]);

  return {
    applySchemaChange,
    createTableFromDesign,
    alterTableFromDesign,
    getTableDesign,
    getStats,
    getIndexUsage,
    getErModel,
    dumpSql,
  };
};
