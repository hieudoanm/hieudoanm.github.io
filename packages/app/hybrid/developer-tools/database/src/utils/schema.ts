import type { SqliteCell } from '@/types/sqlite';
import { escapeIdentifier } from '@/utils/sqlDump';

export interface ExecResult {
  columns: string[];
  values: SqliteCell[][];
}

export type ExecFn = (sql: string) => ExecResult[];

export interface DesignColumn {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  unique: boolean;
  defaultValue: string;
  fkTable: string;
  fkColumn: string;
}

export interface ForeignKey {
  id: number;
  seq: number;
  table: string;
  from: string;
  to: string;
  onUpdate: string;
  onDelete: string;
}

export interface IndexInfo {
  name: string;
  unique: boolean;
  origin: string;
  columns: string[];
}

export interface TableDesign {
  name: string;
  columns: DesignColumn[];
  foreignKeys: ForeignKey[];
  indexes: IndexInfo[];
}

const TYPE_OPTIONS = [
  'INTEGER',
  'TEXT',
  'REAL',
  'BLOB',
  'NUMERIC',
  'BOOLEAN',
  'DATE',
  'DATETIME',
  'TIMESTAMP',
];

const run = (exec: ExecFn, sql: string): ExecResult[] => {
  try {
    return exec(sql);
  } catch {
    return [];
  }
};

export const emptyDesignColumn = (): DesignColumn => ({
  name: '',
  type: 'TEXT',
  nullable: true,
  primaryKey: false,
  unique: false,
  defaultValue: '',
  fkTable: '',
  fkColumn: '',
});

export const readTableDesign = (
  exec: ExecFn,
  tableName: string
): TableDesign => {
  const colsRes = run(
    exec,
    `PRAGMA table_info(${escapeIdentifier(tableName)})`
  );
  const columns: DesignColumn[] = (colsRes[0]?.values ?? []).map((r) => ({
    name: String(r[1]),
    type: String(r[2] ?? ''),
    nullable: Number(r[3]) === 0,
    primaryKey: Number(r[5]) > 0,
    unique: false,
    defaultValue: r[4] === null ? '' : String(r[4]),
    fkTable: '',
    fkColumn: '',
  }));

  const fkRes = run(
    exec,
    `PRAGMA foreign_key_list(${escapeIdentifier(tableName)})`
  );
  const foreignKeys: ForeignKey[] = (fkRes[0]?.values ?? []).map((r) => ({
    id: Number(r[0]),
    seq: Number(r[1]),
    table: String(r[2]),
    from: String(r[3]),
    to: r[4] === null ? '' : String(r[4]),
    onUpdate: String(r[5]),
    onDelete: String(r[6]),
  }));

  const idxRes = run(exec, `PRAGMA index_list(${escapeIdentifier(tableName)})`);
  const indexes: IndexInfo[] = (idxRes[0]?.values ?? [])
    .filter((r) => String(r[3]) !== 'pk')
    .map((r) => {
      const name = String(r[1]);
      const detail = run(exec, `PRAGMA index_info(${escapeIdentifier(name)})`);
      return {
        name,
        unique: Number(r[2]) === 1,
        origin: String(r[3]),
        columns: (detail[0]?.values ?? []).map((c) => String(c[2])),
      };
    });

  for (const fk of foreignKeys) {
    const col = columns.find((c) => c.name === fk.from);
    if (col) {
      col.fkTable = fk.table;
      col.fkColumn = fk.to;
    }
  }

  return { name: tableName, columns, foreignKeys, indexes };
};

export const buildCreateTableSQL = (
  tableName: string,
  columns: DesignColumn[]
): string => {
  const defs = columns.map((c) => {
    const parts = [`${escapeIdentifier(c.name)} ${c.type || 'TEXT'}`];
    if (c.primaryKey) parts.push('PRIMARY KEY');
    if (!c.nullable) parts.push('NOT NULL');
    if (c.unique) parts.push('UNIQUE');
    if (c.defaultValue.trim() !== '')
      parts.push(`DEFAULT ${c.defaultValue.trim()}`);
    if (c.fkTable.trim() !== '')
      parts.push(
        `REFERENCES ${escapeIdentifier(c.fkTable.trim())}${
          c.fkColumn.trim() ? `(${escapeIdentifier(c.fkColumn.trim())})` : ''
        }`
      );
    return parts.join(' ');
  });
  return `CREATE TABLE ${escapeIdentifier(tableName)} (\n  ${defs.join(',\n  ')}\n);`;
};

export const buildAlterStatements = (
  tableName: string,
  original: DesignColumn[],
  updated: DesignColumn[]
): string[] => {
  const stmts: string[] = [];
  const origByName = new Map(original.map((c) => [c.name, c]));
  const updByName = new Map(updated.map((c) => [c.name, c]));

  const added = updated.filter((c) => !origByName.has(c.name));
  const removed = original.filter((c) => !updByName.has(c.name));

  for (const c of added) {
    const renamedFrom = removed.find((o) => o.type === c.type);
    if (renamedFrom) {
      stmts.push(
        `ALTER TABLE ${escapeIdentifier(tableName)} RENAME COLUMN ${escapeIdentifier(
          renamedFrom.name
        )} TO ${escapeIdentifier(c.name)};`
      );
      removed.splice(removed.indexOf(renamedFrom), 1);
      continue;
    }
    const parts = [`${escapeIdentifier(c.name)} ${c.type || 'TEXT'}`];
    if (!c.nullable) parts.push('NOT NULL');
    if (c.unique) parts.push('UNIQUE');
    if (c.defaultValue.trim() !== '')
      parts.push(`DEFAULT ${c.defaultValue.trim()}`);
    if (c.fkTable.trim() !== '')
      parts.push(
        `REFERENCES ${escapeIdentifier(c.fkTable.trim())}${
          c.fkColumn.trim() ? `(${escapeIdentifier(c.fkColumn.trim())})` : ''
        }`
      );
    stmts.push(
      `ALTER TABLE ${escapeIdentifier(tableName)} ADD COLUMN ${parts.join(' ')};`
    );
  }
  for (const c of removed) {
    stmts.push(
      `ALTER TABLE ${escapeIdentifier(tableName)} DROP COLUMN ${escapeIdentifier(
        c.name
      )};`
    );
  }
  return stmts;
};

export { TYPE_OPTIONS };
