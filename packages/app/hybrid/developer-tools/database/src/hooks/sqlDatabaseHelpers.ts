import type {
  SqliteDatabase,
  SqliteQueryResult,
  SqliteTableMeta,
} from '@/types/sqlite';
import { formatNumber } from '@/utils/sqlExport';

export interface SqlStateSetters {
  setQueryResult: (result: SqliteQueryResult) => void;
  setActiveTable: (table: string | null) => void;
  setError: (error: string | null) => void;
  setStatus: (status: string) => void;
}

export const selectTableWithInstance = (
  instance: SqliteDatabase,
  name: string,
  setters: SqlStateSetters
) => {
  try {
    const res = instance.exec(`SELECT * FROM "${name}" LIMIT 10000`);
    const rows = res.length ? res[0].values : [];
    const columns = res.length ? res[0].columns : [];
    setters.setQueryResult({ columns, rows });
    setters.setActiveTable(name);
    setters.setError(null);
    setters.setStatus(
      `"${name}" · ${formatNumber(rows.length)} rows · ${columns.length} columns`
    );
  } catch (e: unknown) {
    setters.setError(e instanceof Error ? e.message : String(e));
    setters.setStatus(
      'Query error: ' + (e instanceof Error ? e.message : String(e))
    );
  }
};

export const enumerateTables = (
  instance: SqliteDatabase
): SqliteTableMeta[] => {
  const res = instance.exec(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  );
  const names: string[] = res.length
    ? res[0].values.map((r) => String(r[0]))
    : [];
  return names.map((name) => {
    try {
      const count = instance.exec(`SELECT COUNT(*) FROM "${name}"`);
      const cols = instance.exec(`PRAGMA table_info("${name}")`);
      return {
        name,
        rowCount: Number(count[0].values[0][0]),
        columns: cols.length
          ? cols[0].values.map((c) => ({
              name: String(c[1]),
              type: String(c[2] ?? ''),
              nullable: Number(c[3]) === 0,
              primaryKey: Number(c[5]) > 0,
            }))
          : [],
      };
    } catch {
      return { name, rowCount: 0, columns: [] };
    }
  });
};

export const getRowId = (
  instance: SqliteDatabase,
  tableName: string,
  rowIndex: number
): number | undefined => {
  const res = instance.exec(`SELECT rowid FROM "${tableName}" LIMIT 10000`);
  const rowid = Number(res[0]?.values[rowIndex]?.[0]);
  return Number.isNaN(rowid) ? undefined : rowid;
};
