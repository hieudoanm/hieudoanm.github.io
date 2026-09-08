import initSqlJs from 'sql.js';

jest.mock('sql.js', () => {
  const Database = jest.fn();
  const mockInit = jest.fn().mockResolvedValue({ Database });
  return { __esModule: true, default: mockInit };
});

const mockedInit = initSqlJs as unknown as jest.Mock;

interface SqliteModule {
  getSqlJs: () => Promise<unknown>;
  openDoiDb: () => Promise<unknown>;
  WASM_PATH: string;
  DB_PATH: string;
}

const loadModule = async (): Promise<{
  mod: SqliteModule;
  init: jest.Mock;
}> => {
  jest.resetModules();
  const mod = (await import('@/lib/sqlite')) as unknown as SqliteModule;
  const init = (jest.requireMock('sql.js') as { default: jest.Mock }).default;
  mockedInit.mockClear();
  init.mockClear();
  return { mod, init };
};

describe('sqlite', () => {
  beforeEach(() => {
    mockedInit.mockClear();
    mockedInit.mockResolvedValue({ Database: jest.fn() });
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BASE_PATH;
    globalThis.fetch = undefined as unknown as typeof fetch;
  });

  it('builds asset paths from the base path env', async () => {
    process.env.NEXT_PUBLIC_BASE_PATH = '/downloads/doi';
    const { mod } = await loadModule();

    expect(mod.WASM_PATH).toBe('/downloads/doi/wasm/sql-wasm.wasm');
    expect(mod.DB_PATH).toBe('/downloads/doi/data/doi.db');
  });

  it('defaults asset paths without a base path', async () => {
    const { mod } = await loadModule();

    expect(mod.WASM_PATH).toBe('/wasm/sql-wasm.wasm');
    expect(mod.DB_PATH).toBe('/data/doi.db');
  });

  it('initialises sql.js once and reuses the promise', async () => {
    const { mod, init } = await loadModule();
    const first = await mod.getSqlJs();
    const second = await mod.getSqlJs();

    expect(first).toBe(second);
    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith({
      locateFile: expect.any(Function),
    });
  });

  it('opens the database asset through fetch', async () => {
    const dbCtor = jest.fn().mockReturnValue({ _db: true });
    const { mod } = await loadModule();
    const init = (jest.requireMock('sql.js') as { default: jest.Mock }).default;
    init.mockResolvedValue({ Database: dbCtor });

    const bytes = new Uint8Array([1, 2, 3]);
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: async () => bytes.buffer as ArrayBuffer,
    }) as unknown as typeof fetch;

    const db = await mod.openDoiDb();
    expect(globalThis.fetch).toHaveBeenCalled();
    expect(dbCtor).toHaveBeenCalledWith(bytes);
  });

  it('rejects when the database fetch fails', async () => {
    const { mod } = await loadModule();
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }) as unknown as typeof fetch;

    await expect(mod.openDoiDb()).rejects.toThrow(
      'Failed to load database: 404'
    );
  });
});
