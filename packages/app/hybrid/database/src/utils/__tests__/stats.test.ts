import type { SqliteDatabase } from '@/types/sqlite';
import {
  type DatabaseStats,
  computeTableStats,
  computeDatabaseStats,
  computeMockIndexUsage,
  largestTables,
} from '@/utils/stats';

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

describe('computeTableStats', () => {
  const db = fakeDb({
    "name FROM sqlite_master WHERE type='table'": {
      columns: ['name'],
      values: [['t'], ['sqlite_sequence']],
    },
    'SELECT COUNT(*) FROM "t"': { columns: [], values: [['2']] },
    'FROM pragma_index_list("t")': {
      columns: [],
      values: [['0']],
    },
    'SELECT * FROM "t"': {
      columns: ['id', 'name'],
      values: [
        [1, 'ab'],
        [2, 'cdef'],
      ],
    },
  });

  it('computes row counts and approximate byte sizes', () => {
    const stats = computeTableStats(db);
    expect(stats).toHaveLength(1);
    expect(stats[0].name).toBe('t');
    expect(stats[0].rowCount).toBe(2);
    // 8 + 2 + 8 + 4 = 22
    expect(stats[0].approxBytes).toBe(22);
  });
});

describe('computeDatabaseStats', () => {
  const db = fakeDb({
    'PRAGMA page_size': { columns: [], values: [['4096']] },
    'PRAGMA page_count': { columns: [], values: [['4']] },
    "name FROM sqlite_master WHERE type='table'": {
      columns: ['name'],
      values: [['t']],
    },
    'SELECT COUNT(*) FROM "t"': { columns: [], values: [['1']] },
    'FROM pragma_index_list("t")': { columns: [], values: [['0']] },
    'SELECT * FROM "t"': {
      columns: ['id'],
      values: [[1]],
    },
    "COUNT(*) FROM sqlite_master WHERE type='index'": {
      columns: [],
      values: [['2']],
    },
  });

  it('aggregates page and table information', () => {
    const stats = computeDatabaseStats(db);
    expect(stats.pageSize).toBe(4096);
    expect(stats.pageCount).toBe(4);
    expect(stats.totalBytes).toBe(16384);
    expect(stats.tableCount).toBe(1);
    expect(stats.indexCount).toBe(2);
  });
});

describe('computeMockIndexUsage', () => {
  it('returns deterministic shape per non-pk index', () => {
    const db = fakeDb({
      "name FROM sqlite_master WHERE type='table'": {
        columns: ['name'],
        values: [['t']],
      },
      'PRAGMA index_list("t")': {
        columns: [],
        values: [
          ['0', 'idx_a', '0', 'c'],
          ['1', 'idx_u', '1', 'c'],
          ['2', 'sqlite_autoindex_t_1', '0', 'pk'],
        ],
      },
    });
    const usage = computeMockIndexUsage(db);
    expect(usage).toHaveLength(2);
    expect(usage[0].table).toBe('t');
    expect(usage[0].scans).toBeGreaterThanOrEqual(0);
    expect(usage[0].efficiency).toBeGreaterThanOrEqual(60);
    expect(usage[1].scans).toBe(0);
    expect(usage.some((u) => u.name === 'sqlite_autoindex_t_1')).toBe(false);
  });
});

describe('largestTables', () => {
  it('sorts by bytes and limits', () => {
    const stats: DatabaseStats = {
      pageSize: 4096,
      pageCount: 1,
      totalBytes: 4096,
      tableCount: 3,
      indexCount: 0,
      tables: [
        { name: 'a', rowCount: 1, approxBytes: 10, indexCount: 0 },
        { name: 'b', rowCount: 1, approxBytes: 100, indexCount: 0 },
        { name: 'c', rowCount: 1, approxBytes: 50, indexCount: 0 },
      ],
    };
    const top = largestTables(stats, 2);
    expect(top.map((t) => t.name)).toEqual(['b', 'c']);
  });
});
