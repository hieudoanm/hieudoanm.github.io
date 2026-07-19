import type { SqliteCell, SqliteDatabase } from '@/types/sqlite';
import { tableNameList } from '@/utils/sqlDump';

export interface TableStat {
  name: string;
  rowCount: number;
  approxBytes: number;
  indexCount: number;
}

export interface DatabaseStats {
  pageSize: number;
  pageCount: number;
  totalBytes: number;
  tableCount: number;
  indexCount: number;
  tables: TableStat[];
}

const stringBytes = (s: string): number => {
  let bytes = 0;
  for (let i = 0; i < s.length; i++) {
    const code = s.codePointAt(i) ?? 0;
    if (code > 0xffff) {
      bytes += 4;
      i += 1;
    } else if (code > 0x7ff) bytes += 3;
    else if (code > 0x7f) bytes += 2;
    else bytes += 1;
  }
  return bytes;
};

const valueBytes = (v: SqliteCell): number => {
  if (v === null) return 0;
  if (v instanceof Uint8Array) return v.length;
  if (typeof v === 'number') return 8;
  return stringBytes(v);
};

export const computeTableStats = (
  instance: SqliteDatabase,
  maxScan = 2000
): TableStat[] => {
  return tableNameList(instance).map((name) => {
    const countRes = instance.exec(`SELECT COUNT(*) FROM "${name}"`);
    const rowCount = Number(countRes[0]?.values[0][0] ?? 0);
    const indexRes = instance.exec(
      `SELECT COUNT(*) FROM pragma_index_list("${name}") WHERE origin != 'pk'`
    );
    const indexCount = Number(indexRes[0]?.values[0][0] ?? 0);
    let approxBytes = 0;
    if (rowCount > 0) {
      try {
        const res = instance.exec(`SELECT * FROM "${name}" LIMIT ${maxScan}`);
        if (res[0]) {
          for (const row of res[0].values) {
            for (const cell of row) approxBytes += valueBytes(cell);
          }
        }
      } catch {
        approxBytes = 0;
      }
    }
    return { name, rowCount, approxBytes, indexCount };
  });
};

export const computeDatabaseStats = (
  instance: SqliteDatabase,
  maxScan = 2000
): DatabaseStats => {
  const pageSizeRes = instance.exec('PRAGMA page_size');
  const pageCountRes = instance.exec('PRAGMA page_count');
  const pageSize = Number(pageSizeRes[0]?.values[0][0] ?? 4096);
  const pageCount = Number(pageCountRes[0]?.values[0][0] ?? 0);
  const tables = computeTableStats(instance, maxScan);
  const idxRes = instance.exec(
    "SELECT COUNT(*) FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%'"
  );
  return {
    pageSize,
    pageCount,
    totalBytes: pageSize * pageCount,
    tableCount: tables.length,
    indexCount: Number(idxRes[0]?.values[0][0] ?? 0),
    tables,
  };
};

export interface IndexUsageStat {
  table: string;
  name: string;
  scans: number;
  writes: number;
  efficiency: number;
}

export const computeMockIndexUsage = (
  instance: SqliteDatabase
): IndexUsageStat[] => {
  const out: IndexUsageStat[] = [];
  for (const table of tableNameList(instance)) {
    const res = instance.exec(`PRAGMA index_list("${table}")`);
    for (const row of res[0]?.values ?? []) {
      if (String(row[3]) === 'pk') continue;
      const unique = Number(row[2]) === 1;
      out.push({
        table,
        name: String(row[1]),
        scans: unique ? 0 : Math.floor(Math.random() * 500),
        writes: Math.floor(Math.random() * 100),
        efficiency: Math.floor(60 + Math.random() * 40),
      });
    }
  }
  return out;
};

export const largestTables = (stats: DatabaseStats, limit = 5): TableStat[] =>
  [...stats.tables]
    .sort((a, b) => b.approxBytes - a.approxBytes)
    .slice(0, limit);
