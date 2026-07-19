import {
  seedDatabase,
  executeQuery,
  generateId,
  MOCK_SCHEMAS,
} from '@/data/seed';
import { MOCK_CONNECTIONS, MOCK_QUERY_RESULTS } from '@/data/models';

jest.mock('@/lib/db', () => ({
  db: {
    connections: {
      getAll: jest.fn(),
      put: jest.fn(),
    },
  },
}));

jest.mock('@/data/models', () => ({
  MOCK_CONNECTIONS: [{ id: 'db-1', name: 'Production DB' }],
  MOCK_SCHEMAS: { 'db-1': [{ name: 'users' }] },
  MOCK_QUERY_RESULTS: {
    default: { columns: ['id'], rows: [[1]], rowCount: 1, executionTime: 5 },
  },
}));

const { db } = jest.requireMock('@/lib/db');

describe('seedDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('seeds mock connections when the store is empty', async () => {
    db.connections.getAll.mockResolvedValue([]);
    await seedDatabase();
    expect(db.connections.getAll).toHaveBeenCalledTimes(1);
    expect(db.connections.put).toHaveBeenCalledTimes(MOCK_CONNECTIONS.length);
    expect(db.connections.put).toHaveBeenCalledWith(MOCK_CONNECTIONS[0]);
  });

  it('returns early when connections already exist', async () => {
    db.connections.getAll.mockResolvedValue([{ id: 'db-9' }]);
    await seedDatabase();
    expect(db.connections.put).not.toHaveBeenCalled();
  });
});

describe('executeQuery', () => {
  it('returns the default mock query result', () => {
    expect(executeQuery('SELECT anything')).toEqual(MOCK_QUERY_RESULTS.default);
  });
});

describe('generateId', () => {
  it('generates a timestamp-prefixed id', () => {
    const id = generateId();
    expect(id).toMatch(/^\d+-[a-z0-9]+$/);
  });
});

describe('MOCK_SCHEMAS re-export', () => {
  it('exposes the mock schemas', () => {
    expect(MOCK_SCHEMAS['db-1']).toHaveLength(1);
  });
});
