import {
  MOCK_CONNECTIONS,
  MOCK_SCHEMAS,
  MOCK_QUERY_RESULTS,
  generateRows,
} from '@/data/models';
import type { TableSchema } from '@/types';

describe('MOCK_CONNECTIONS', () => {
  it('provides three seeded connections', () => {
    expect(MOCK_CONNECTIONS).toHaveLength(3);
    expect(MOCK_CONNECTIONS.map((c) => c.id)).toEqual(['db-1', 'db-2', 'db-3']);
    expect(MOCK_CONNECTIONS[0]).toMatchObject({
      name: 'Production DB',
      readOnly: true,
    });
  });

  it('includes a writable connection', () => {
    expect(MOCK_CONNECTIONS.some((c) => !c.readOnly)).toBe(true);
  });
});

describe('MOCK_SCHEMAS', () => {
  it('provides schemas for db-1', () => {
    expect(MOCK_SCHEMAS['db-1']).toHaveLength(3);
    const [users] = MOCK_SCHEMAS['db-1'];
    expect(users.name).toBe('users');
    expect(users.indexes[0].unique).toBe(true);
    expect(users.columns.some((c) => c.foreignKey !== undefined)).toBe(false);
  });

  it('includes a foreign key relationship on orders', () => {
    const orders = MOCK_SCHEMAS['db-1'].find((s) => s.name === 'orders');
    expect(orders?.columns.some((c) => c.foreignKey)).toBe(true);
  });
});

describe('MOCK_QUERY_RESULTS', () => {
  it('provides a default query result with generated rows', () => {
    const result = MOCK_QUERY_RESULTS.default;
    expect(result.columns).toEqual(['id', 'name', 'email', 'created_at']);
    expect(result.rows).toHaveLength(10);
    expect(result.rowCount).toBe(10);
    expect(result.executionTime).toBeGreaterThanOrEqual(0);
    expect(result.rows[0]).toHaveProperty('id', 1);
    expect(result.rows[0]).toHaveProperty('created_at');
  });
});

describe('generateRows', () => {
  const schema: TableSchema = {
    name: 'metrics',
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
      { name: 'hits', type: 'INTEGER', nullable: false, primaryKey: false },
      { name: 'score', type: 'REAL', nullable: true, primaryKey: false },
      { name: 'blob', type: 'BLOB', nullable: true, primaryKey: false },
    ],
    rowCount: 2,
    indexes: [],
  };

  it('generates typed values for every column kind', () => {
    const rows = generateRows(schema, 2);
    expect(rows).toHaveLength(2);
    const [row] = rows;
    expect(row.id).toBe(1);
    expect(typeof row.hits).toBe('number');
    expect(typeof row.score).toBe('number');
    expect(typeof row.blob).toBe('string');
    expect(rows[1].id).toBe(2);
  });
});
