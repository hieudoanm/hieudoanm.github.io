import type {
  SVGDocument,
  SVGSymbol,
  SVGSettings,
  HistoryEntry,
} from '@/types';

jest.mock('idb', () => ({ openDB: jest.fn() }));

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
    return { createIndex: jest.fn() };
  },
  getAll: (store: string) => [...stores[store].data.values()],
  get: (store: string, key: string) => stores[store].data.get(key),
  put: (store: string, value: { id: string }) => {
    stores[store].data.set(value.id, value);
  },
  delete: (store: string, key: string) => {
    stores[store].data.delete(key);
  },
  transaction: (store: string) => {
    const txStore = {
      index: (indexName: string) => {
        const byIndex = (query: string) =>
          [...stores[store].data.values()].filter(
            (v) => (v as { documentId: string }).documentId === query
          );
        return {
          getAllKeys: (query: string) =>
            Promise.resolve(
              byIndex(query).map((v) => (v as { id: string }).id)
            ),
          getAll: (query: string) => Promise.resolve(byIndex(query)),
        };
      },
      delete: (key: string) => {
        stores[store].data.delete(key);
      },
    };
    return { store: txStore, done: Promise.resolve() };
  },
});

const document = (id: string): SVGDocument => ({
  id,
  title: `Doc ${id}`,
  width: 100,
  height: 100,
  shapes: [],
  layers: [],
  symbols: [],
  gradients: [],
  createdAt: 1000,
  updatedAt: 1000,
});

const symbol = (id: string): SVGSymbol => ({
  id,
  name: `Symbol ${id}`,
  shapes: [],
  width: 10,
  height: 10,
  createdAt: 1000,
});

const historyEntry = (id: string): HistoryEntry => ({
  id,
  documentId: 'doc-1',
  shapes: [],
  layers: [],
  timestamp: 1000,
  label: 'edit',
});

describe('db', () => {
  let db: (typeof import('@/lib/db'))['db'];

  beforeEach(async () => {
    jest.resetModules();
    jest.mock('idb', () => ({ openDB: jest.fn() }));
    const openDB = jest.requireMock('idb').openDB;
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
    db = (await import('@/lib/db')).db;
  });

  it('creates the four object stores on upgrade', async () => {
    await db.documents.getAll();
    expect(jest.requireMock('idb').openDB).toHaveBeenCalledWith(
      'svg-db',
      1,
      expect.any(Object)
    );
    expect(Object.keys(stores).sort()).toEqual([
      'documents',
      'history',
      'settings',
      'symbols',
    ]);
  });

  it('documents getAll/get/put/delete round-trip', async () => {
    await db.documents.put(document('d1'));
    await db.documents.put(document('d2'));
    await expect(db.documents.getAll()).resolves.toHaveLength(2);
    await expect(db.documents.get('d1')).resolves.toMatchObject({ id: 'd1' });
    await expect(db.documents.get('missing')).resolves.toBeUndefined();
    await db.documents.delete('d1');
    await expect(db.documents.getAll()).resolves.toHaveLength(1);
  });

  it('symbols getAll/get/put/delete round-trip', async () => {
    await db.symbols.put(symbol('s1'));
    await expect(db.symbols.get('s1')).resolves.toMatchObject({ id: 's1' });
    await expect(db.symbols.getAll()).resolves.toHaveLength(1);
    await db.symbols.delete('s1');
    await expect(db.symbols.getAll()).resolves.toEqual([]);
  });

  it('settings.get returns defaults when nothing is stored', async () => {
    await expect(db.settings.get()).resolves.toEqual({
      id: 'default',
      theme: 'svg-light',
      gridSize: 20,
      snapToGrid: true,
      showGrid: true,
      showRulers: true,
      exportFormat: 'svg',
      exportScale: 2,
    });
  });

  it('settings.get returns stored settings', async () => {
    const saved: SVGSettings = {
      theme: 'night',
      gridSize: 10,
      snapToGrid: false,
      showGrid: false,
      showRulers: false,
      exportFormat: 'png',
      exportScale: 4,
    };
    await db.settings.put(saved);
    await expect(db.settings.get()).resolves.toEqual({
      ...saved,
      id: 'default',
    });
  });

  it('settings.put merges the default id', async () => {
    await db.settings.put({ theme: 'dark' } as SVGSettings);
    expect(stores.settings.data.get('default')).toMatchObject({
      id: 'default',
      theme: 'dark',
    });
  });

  it('history round-trips and queries by document', async () => {
    await db.history.put(historyEntry('h1'));
    await expect(db.history.getAll()).resolves.toHaveLength(1);
    await expect(db.history.getByDocument('doc-1')).resolves.toHaveLength(1);
    await expect(db.history.getByDocument('other')).resolves.toEqual([]);
  });

  it('history.delete removes a single entry', async () => {
    await db.history.put(historyEntry('h1'));
    await db.history.put({ ...historyEntry('h2'), documentId: 'other' });
    await db.history.delete('h1');
    await expect(db.history.getAll()).resolves.toEqual([
      expect.objectContaining({ id: 'h2' }),
    ]);
  });

  it('history.deleteByDocument removes all entries for a document', async () => {
    await db.history.put(historyEntry('h1'));
    await db.history.put({ ...historyEntry('h2'), documentId: 'other' });
    await db.history.deleteByDocument('doc-1');
    await expect(db.history.getAll()).resolves.toEqual([
      expect.objectContaining({ id: 'h2' }),
    ]);
  });

  it('skips stores that already exist on upgrade', async () => {
    stores['documents'] = { data: new Map() };
    stores['symbols'] = { data: new Map() };
    stores['settings'] = { data: new Map() };
    stores['history'] = { data: new Map() };
    await db.documents.getAll();
    expect(Object.keys(stores).sort()).toEqual([
      'documents',
      'history',
      'settings',
      'symbols',
    ]);
  });

  it('falls back to the default delay when the env var is unset', async () => {
    const real = process.env.NEXT_PUBLIC_MOCK_DELAY;
    delete process.env.NEXT_PUBLIC_MOCK_DELAY;
    jest.useFakeTimers();
    const p = db.documents.getAll();
    jest.advanceTimersByTime(800);
    await expect(p).resolves.toEqual([]);
    jest.useRealTimers();
    process.env.NEXT_PUBLIC_MOCK_DELAY = real;
  });
});
