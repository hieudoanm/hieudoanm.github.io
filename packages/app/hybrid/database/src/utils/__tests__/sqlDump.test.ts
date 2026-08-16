import type { SqliteDatabase } from '@/types/sqlite';
import {
  escapeIdentifier,
  sqlLiteral,
  tableNameList,
  dumpTableRows,
  dumpDatabase,
  downloadText,
} from '@/utils/sqlDump';

interface FakeRes {
  columns: string[];
  values: (string | number)[][];
}

const fakeDb = (results: Record<string, FakeRes>): SqliteDatabase => {
  const instance = {
    exec: (sql: string) => {
      for (const [pattern, res] of Object.entries(results)) {
        if (sql.includes(pattern)) {
          let values = res.values;
          if (sql.includes("name NOT LIKE 'sqlite_%'")) {
            values = values.filter((r) => !String(r[0]).startsWith('sqlite_'));
          }
          return [{ columns: res.columns, values }];
        }
      }
      return [];
    },
  };
  return instance as unknown as SqliteDatabase;
};

describe('escapeIdentifier', () => {
  it('quotes identifiers', () => {
    expect(escapeIdentifier('my table')).toBe('"my table"');
  });
  it('escapes embedded quotes', () => {
    expect(escapeIdentifier('a"b')).toBe('"a""b"');
  });
});

describe('sqlLiteral', () => {
  it('renders null and blobs as NULL', () => {
    expect(sqlLiteral(null)).toBe('NULL');
    expect(sqlLiteral(new Uint8Array(2))).toBe('NULL');
  });
  it('renders numbers without quotes', () => {
    expect(sqlLiteral(42)).toBe('42');
    expect(sqlLiteral(1.5)).toBe('1.5');
  });
  it('escapes string quotes', () => {
    expect(sqlLiteral("O'Reilly")).toBe("'O''Reilly'");
  });
});

describe('tableNameList', () => {
  it('lists non-sqlite tables in order', () => {
    const db = fakeDb({
      "name FROM sqlite_master WHERE type='table'": {
        columns: ['name'],
        values: [['orders'], ['customers'], ['sqlite_sequence']],
      },
    });
    expect(tableNameList(db)).toEqual(['orders', 'customers']);
  });
  it('returns empty when no tables', () => {
    const db = fakeDb({});
    expect(tableNameList(db)).toEqual([]);
  });
});

describe('dumpTableRows', () => {
  const db = fakeDb({
    'SELECT * FROM "t"': {
      columns: ['id', 'name'],
      values: [
        [1, 'a'],
        [2, "b'c"],
      ],
    },
  });
  it('generates INSERT statements', () => {
    const out = dumpTableRows(db, 't');
    expect(out).toHaveLength(2);
    expect(out[0]).toContain('INSERT INTO "t" ("id", "name") VALUES (1,');
    expect(out[1]).toContain("'b''c'");
  });
  it('returns empty for empty tables', () => {
    const empty = fakeDb({
      'SELECT * FROM "e"': { columns: ['id'], values: [] },
    });
    expect(dumpTableRows(empty, 'e')).toEqual([]);
  });
});

describe('dumpDatabase', () => {
  it('includes schema, data, indexes and transaction wrappers', () => {
    const db = fakeDb({
      'type, name, sql FROM sqlite_master': {
        columns: ['type', 'name', 'sql'],
        values: [
          ['table', 't', 'CREATE TABLE t (id INTEGER)'],
          ['index', 'idx_t', 'CREATE INDEX idx_t ON t(id)'],
        ],
      },
      'SELECT * FROM "t"': {
        columns: ['id'],
        values: [[1]],
      },
    });
    const dump = dumpDatabase(db);
    expect(dump).toContain('BEGIN TRANSACTION;');
    expect(dump).toContain('COMMIT;');
    expect(dump).toContain('CREATE TABLE t (id INTEGER);');
    expect(dump).toContain('CREATE INDEX idx_t ON t(id);');
    expect(dump).toContain('INSERT INTO "t"');
  });

  it('emits only wrappers when there are no objects', () => {
    const dump = dumpDatabase(fakeDb({}));
    expect(dump).toContain('BEGIN TRANSACTION;');
    expect(dump).toContain('COMMIT;');
    expect(dump).not.toContain('CREATE');
  });

  it('includes views through the fallback branch', () => {
    const db = fakeDb({
      'type, name, sql FROM sqlite_master': {
        columns: ['type', 'name', 'sql'],
        values: [['view', 'v_users', 'CREATE VIEW v_users AS SELECT 1']],
      },
    });
    const dump = dumpDatabase(db);
    expect(dump).toContain('CREATE VIEW v_users AS SELECT 1;');
  });
});

describe('downloadText', () => {
  it('creates and clicks a download link', () => {
    const click = jest.fn();
    const revoke = jest.fn();
    const createObjectURL = jest.fn(() => 'blob:url');
    const mockCreate = jest.spyOn(document, 'createElement').mockReturnValue({
      click,
      href: '',
      download: '',
    } as unknown as HTMLAnchorElement);
    Object.defineProperty(URL, 'createObjectURL', { value: createObjectURL });
    Object.defineProperty(URL, 'revokeObjectURL', { value: revoke });
    downloadText('dump.sql', 'content');
    expect(createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    expect(revoke).toHaveBeenCalled();
    mockCreate.mockRestore();
  });
});
