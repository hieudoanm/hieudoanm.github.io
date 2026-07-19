import { db } from '@/lib/db';
import type {
  DatabaseConnection,
  QueryHistory,
  Bookmark,
  Settings,
} from '@/types';

jest.mock('idb', () => ({ openDB: jest.fn() }));

const { openDB } = jest.requireMock('idb');

interface StoreData {
  data: Map<string, unknown>;
}

const stores: Record<string, StoreData> = {};

const createMockDB = () => ({
  objectStoreNames: {
    contains: (name: string) => name in stores,
  },
  createObjectStore: (name: string) => {
    stores[name] = { data: new Map() };
  },
  getAll: (store: string) => [...stores[store].data.values()],
  get: (store: string, key: string) => stores[store].data.get(key),
  put: (store: string, value: { id: string }) => {
    stores[store].data.set(value.id, value);
  },
  delete: (store: string, key: string) => {
    stores[store].data.delete(key);
  },
});

const connection = (id: string): DatabaseConnection => ({
  id,
  name: `Connection ${id}`,
  filePath: `/data/${id}.db`,
  size: 1024,
  readOnly: false,
  lastConnected: 1000,
  createdAt: 500,
});

const historyEntry = (id: string): QueryHistory => ({
  id,
  connectionId: 'db-1',
  sql: 'SELECT 1',
  executionTime: 1,
  rowCount: 1,
  success: true,
  timestamp: 1000,
});

const bookmark = (id: string): Bookmark => ({
  id,
  connectionId: 'db-1',
  name: 'Query',
  sql: 'SELECT 1',
  createdAt: 1000,
});

describe('db', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    for (const key of Object.keys(stores)) delete stores[key];
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    openDB.mockImplementation(
      (
        _name: string,
        _version: number,
        opts: { upgrade: (db: unknown) => void }
      ) => {
        const mockDB = createMockDB();
        opts.upgrade(mockDB);
        return Promise.resolve(mockDB);
      }
    );
  });

  it('creates the four object stores on upgrade', async () => {
    await db.connections.getAll();
    expect(openDB).toHaveBeenCalledWith('database-db', 1, expect.any(Object));
    expect(Object.keys(stores).sort()).toEqual([
      'bookmarks',
      'connections',
      'history',
      'settings',
    ]);
  });

  it('connections.getAll returns stored connections', async () => {
    await db.connections.put(connection('c1'));
    await db.connections.put(connection('c2'));
    const all = await db.connections.getAll();
    expect(all.map((c) => c.id)).toEqual(['c1', 'c2']);
  });

  it('connections.get returns a single connection', async () => {
    await db.connections.put(connection('c1'));
    await expect(db.connections.get('c1')).resolves.toMatchObject({
      id: 'c1',
    });
    await expect(db.connections.get('missing')).resolves.toBeUndefined();
  });

  it('connections.delete removes a connection', async () => {
    await db.connections.put(connection('c1'));
    await db.connections.delete('c1');
    await expect(db.connections.getAll()).resolves.toEqual([]);
  });

  it('history getAll/put/delete round-trip', async () => {
    await db.history.put(historyEntry('h1'));
    await expect(db.history.getAll()).resolves.toHaveLength(1);
    await db.history.delete('h1');
    await expect(db.history.getAll()).resolves.toEqual([]);
  });

  it('bookmarks getAll/put/delete round-trip', async () => {
    await db.bookmarks.put(bookmark('b1'));
    await expect(db.bookmarks.getAll()).resolves.toHaveLength(1);
    await db.bookmarks.delete('b1');
    await expect(db.bookmarks.getAll()).resolves.toEqual([]);
  });

  it('settings.get returns defaults when nothing is stored', async () => {
    const settings = await db.settings.get();
    expect(settings).toEqual({
      id: 'default',
      theme: 'database-light',
      defaultPort: 5432,
      editorFontSize: 14,
      queryTimeout: 30,
    });
  });

  it('settings.get returns stored settings', async () => {
    const saved: Settings = {
      theme: 'night',
      defaultPort: 5432,
      editorFontSize: 16,
      queryTimeout: 60,
    };
    await db.settings.put(saved);
    await expect(db.settings.get()).resolves.toMatchObject({
      ...saved,
      id: 'default',
    });
  });

  it('settings.put merges a default id', async () => {
    await db.settings.put({ theme: 'dark' } as Settings);
    expect(stores.settings.data.get('default')).toMatchObject({
      id: 'default',
      theme: 'dark',
    });
  });

  it('falls back to the default delay when env is unset', async () => {
    delete process.env.NEXT_PUBLIC_MOCK_DELAY;
    jest.useFakeTimers();
    const promise = db.connections.getAll();
    jest.advanceTimersByTime(800);
    await promise;
    jest.useRealTimers();
    expect(openDB).toHaveBeenCalled();
  });
});
