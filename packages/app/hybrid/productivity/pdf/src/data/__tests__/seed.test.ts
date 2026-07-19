import { seedDatabase, generateId } from '@/data/seed';
import { MOCK_DOCUMENTS } from '@/data/models';

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
    return { createIndex: () => {} };
  },
  getAll: (store: string) => [...stores[store].data.values()],
  get: (store: string, key: string) => stores[store].data.get(key),
  put: (store: string, value: { id: string }) => {
    stores[store].data.set(value.id, value);
  },
  delete: (store: string, key: string) => {
    stores[store].data.delete(key);
  },
  transaction: (store: string) => ({
    store: {
      index: () => ({
        getAll: () => [],
        getAllKeys: () => [],
      }),
      delete: () => {},
    },
    done: Promise.resolve(),
  }),
});

describe('seedDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    for (const key of Object.keys(stores)) delete stores[key];
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    openDB.mockImplementation(
      (
        _name: string,
        _version: number,
        opts: { upgrade: (database: unknown) => void }
      ) => {
        const mockDB = createMockDB();
        opts.upgrade(mockDB);
        return Promise.resolve(mockDB);
      }
    );
  });

  it('seeds mock documents, annotations, and bookmarks on first load', async () => {
    await seedDatabase();
    expect(stores.documents.data.size).toBe(MOCK_DOCUMENTS.length);
    expect(stores.annotations.data.size).toBeGreaterThan(0);
    expect(stores.bookmarks.data.size).toBeGreaterThan(0);
  });

  it('skips seeding when documents already exist', async () => {
    stores.documents = {
      data: new Map([['doc-existing', { id: 'doc-existing' }]]),
    };
    await seedDatabase();
    expect(stores.documents.data.size).toBe(1);
    expect(stores.annotations.data.size).toBe(0);
  });
});

describe('generateId', () => {
  it('is re-exported from models', () => {
    expect(typeof generateId).toBe('function');
    expect(generateId()).not.toBe(generateId());
  });
});
