import type { SqliteCell, SqliteDatabase } from '@/types/sqlite';

export const escapeIdentifier = (name: string): string =>
  `"${name.replace(/"/g, '""')}"`;

export const sqlLiteral = (v: SqliteCell): string => {
  if (v === null || v instanceof Uint8Array) return 'NULL';
  if (typeof v === 'number') return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
};

export const tableNameList = (instance: SqliteDatabase): string[] => {
  const res = instance.exec(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  );
  return res.length ? res[0].values.map((r) => String(r[0])) : [];
};

export const dumpTableRows = (
  instance: SqliteDatabase,
  tableName: string
): string[] => {
  const res = instance.exec(`SELECT * FROM ${escapeIdentifier(tableName)}`);
  if (!res.length || !res[0].values.length) return [];
  const columns = res[0].columns.map(escapeIdentifier).join(', ');
  return res[0].values.map(
    (row) =>
      `INSERT INTO ${escapeIdentifier(tableName)} (${columns}) VALUES (${row
        .map(sqlLiteral)
        .join(', ')});`
  );
};

export const dumpDatabase = (instance: SqliteDatabase): string => {
  const out: string[] = ['PRAGMA foreign_keys=OFF;', 'BEGIN TRANSACTION;', ''];
  const objects = instance.exec(
    "SELECT type, name, sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%' ORDER BY CASE type WHEN 'table' THEN 0 WHEN 'index' THEN 1 WHEN 'view' THEN 2 WHEN 'trigger' THEN 3 ELSE 4 END, name"
  );
  for (const row of objects[0]?.values ?? []) {
    if (row[0] === 'table') {
      out.push(String(row[2]) + ';', '');
      for (const insert of dumpTableRows(instance, String(row[1]))) {
        out.push(insert);
      }
      out.push('');
    } else if (row[0] === 'index') {
      out.push(String(row[2]) + ';');
    } else {
      out.push(String(row[2]) + ';');
    }
  }
  out.push('', 'COMMIT;');
  return out.join('\n');
};

export const downloadText = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
