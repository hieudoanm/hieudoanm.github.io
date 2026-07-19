/**
 * @jest-environment node
 */
jest.mock('idb', () => ({ openDB: jest.fn() }));

describe('db (SSR)', () => {
  beforeEach(async () => {
    jest.resetModules();
    jest.mock('idb', () => ({ openDB: jest.fn() }));
    const openDB = jest.requireMock('idb').openDB;
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    openDB.mockImplementation(
      (
        _name: string,
        _version: number,
        opts: { upgrade: (db: unknown) => void }
      ) => {
        const mockDB = {
          objectStoreNames: { contains: () => true },
          getAll: () => [],
          createObjectStore: () => ({ createIndex: jest.fn() }),
        };
        opts.upgrade(mockDB);
        return Promise.resolve(mockDB);
      }
    );
  });

  it('uses a zero delay when window is undefined', async () => {
    const dbModule = await import('@/lib/db');
    await expect(dbModule.db.documents.getAll()).resolves.toEqual([]);
  });
});
