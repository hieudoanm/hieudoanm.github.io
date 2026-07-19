import type { DatabaseConnection, TableSchema, QueryResult } from '@/types';

export const MOCK_CONNECTIONS: DatabaseConnection[] = [
  {
    id: 'db-1',
    name: 'Production DB',
    filePath: '/data/production.db',
    size: 15728640,
    readOnly: true,
    lastConnected: Date.now() - 3600000,
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: 'db-2',
    name: 'Development DB',
    filePath: '/data/dev.db',
    size: 5242880,
    readOnly: false,
    lastConnected: Date.now() - 86400000,
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: 'db-3',
    name: 'Analytics DB',
    filePath: '/data/analytics.db',
    size: 52428800,
    readOnly: true,
    lastConnected: Date.now() - 86400000 * 3,
    createdAt: Date.now() - 86400000 * 60,
  },
];

export const MOCK_SCHEMAS: Record<string, TableSchema[]> = {
  'db-1': [
    {
      name: 'users',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
        { name: 'name', type: 'TEXT', nullable: false, primaryKey: false },
        { name: 'email', type: 'TEXT', nullable: false, primaryKey: false },
        {
          name: 'created_at',
          type: 'DATETIME',
          nullable: false,
          primaryKey: false,
        },
      ],
      rowCount: 1250,
      indexes: [{ name: 'idx_users_email', columns: ['email'], unique: true }],
    },
    {
      name: 'orders',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
        {
          name: 'user_id',
          type: 'INTEGER',
          nullable: false,
          primaryKey: false,
          foreignKey: { table: 'users', column: 'id' },
        },
        { name: 'total', type: 'REAL', nullable: false, primaryKey: false },
        { name: 'status', type: 'TEXT', nullable: false, primaryKey: false },
        {
          name: 'created_at',
          type: 'DATETIME',
          nullable: false,
          primaryKey: false,
        },
      ],
      rowCount: 8430,
      indexes: [
        { name: 'idx_orders_user', columns: ['user_id'], unique: false },
      ],
    },
    {
      name: 'products',
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true },
        { name: 'name', type: 'TEXT', nullable: false, primaryKey: false },
        { name: 'price', type: 'REAL', nullable: false, primaryKey: false },
        { name: 'stock', type: 'INTEGER', nullable: false, primaryKey: false },
      ],
      rowCount: 320,
      indexes: [],
    },
  ],
};

const generateRows = (
  schema: TableSchema,
  count: number
): Record<string, unknown>[] =>
  Array.from({ length: count }, (_, i) => {
    const row: Record<string, unknown> = {};
    schema.columns.forEach((col) => {
      if (col.primaryKey) row[col.name] = i + 1;
      else if (col.type === 'INTEGER')
        row[col.name] = Math.floor(Math.random() * 1000);
      else if (col.type === 'REAL')
        row[col.name] = parseFloat((Math.random() * 100).toFixed(2));
      else if (col.type === 'TEXT') row[col.name] = `Value ${i + 1}`;
      else row[col.name] = new Date().toISOString();
    });
    return row;
  });

export const MOCK_QUERY_RESULTS: Record<string, QueryResult> = {
  default: {
    columns: ['id', 'name', 'email', 'created_at'],
    rows: generateRows(MOCK_SCHEMAS['db-1'][0], 10),
    rowCount: 10,
    executionTime: 42,
  },
};
