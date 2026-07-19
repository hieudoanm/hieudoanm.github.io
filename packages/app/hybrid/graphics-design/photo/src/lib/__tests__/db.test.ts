import type { Album, Filter, Layer, PhotoImage, PhotoSettings } from '@/types';

type Store = {
  getAll: jest.Mock;
  get: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
};

type FakeIDB = {
  objectStoreNames: { contains: (name: string) => boolean };
  createObjectStore: jest.Mock;
  getAll: (s: string, ...args: unknown[]) => unknown;
  get: (s: string, ...args: unknown[]) => unknown;
  put: (s: string, ...args: unknown[]) => unknown;
  delete: (s: string, ...args: unknown[]) => unknown;
  stores: Record<string, Store>;
};

const makeStore = (): Store => ({
  getAll: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
});

const makeFakeIDB = (existing: string[]): FakeIDB => {
  const stores: Record<string, Store> = {
    images: makeStore(),
    albums: makeStore(),
    filters: makeStore(),
    history: makeStore(),
    layers: makeStore(),
    settings: makeStore(),
  };
  return {
    objectStoreNames: { contains: (name: string) => existing.includes(name) },
    createObjectStore: jest.fn(),
    getAll: (s: string, ...args: unknown[]) => stores[s].getAll(...args),
    get: (s: string, ...args: unknown[]) => stores[s].get(...args),
    put: (s: string, ...args: unknown[]) => stores[s].put(...args),
    delete: (s: string, ...args: unknown[]) => stores[s].delete(...args),
    stores,
  };
};

const image = (id: string): PhotoImage => ({
  id,
  name: `${id}.png`,
  type: 'image/png',
  width: 100,
  height: 100,
  size: 10,
  color: '#3b82f6',
  tags: [],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt: 1,
});

const album = (id: string): Album => ({
  id,
  name: 'Album',
  coverId: null,
  imageIds: [],
  createdAt: 1,
  updatedAt: 1,
});

const filter = (id: string): Filter => ({
  id,
  name: 'Warm',
  category: 'warm',
  adjustments: {},
});

const layer = (id: string): Layer => ({
  id,
  name: 'Layer 1',
  type: 'image',
  visible: true,
  locked: false,
  opacity: 100,
  blendMode: 'normal',
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  rotation: 0,
});

const entry = {
  id: 'h1',
  imageId: 'a',
  label: 'Adjust',
  adjustments: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    temperature: 0,
    exposure: 0,
    highlights: 0,
    shadows: 0,
    clarity: 0,
    vibrance: 0,
    sharpness: 0,
    noiseReduction: 0,
    vignette: 0,
  },
  filterId: null,
  timestamp: 1,
};

const settings: PhotoSettings & { id: string } = {
  id: 'settings',
  theme: 'dark',
  defaultExportFormat: 'webp',
  canvasBackground: 'checkerboard',
  defaultQuality: 90,
};

interface Loaded {
  db: typeof import('@/lib/db').db;
  fakeIDB: FakeIDB;
}

let current: Loaded;

const load = (existing: string[]): Loaded => {
  jest.doMock('idb', () => ({ openDB: jest.fn() }));
  const idb = require('idb') as { openDB: jest.Mock };
  const { db } = require('@/lib/db') as typeof import('@/lib/db');
  current = { db, fakeIDB: null as unknown as FakeIDB };
  idb.openDB.mockImplementation(
    (
      _name: string,
      _version: number,
      options: { upgrade: (db: FakeIDB) => void }
    ) => {
      current.fakeIDB = makeFakeIDB(existing);
      options.upgrade(current.fakeIDB);
      return Promise.resolve(current.fakeIDB);
    }
  );
  return current;
};

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
});

const connect = async (): Promise<void> => {
  await current.db.images.getAll();
};

describe('db', () => {
  it('creates all six object stores during upgrade', async () => {
    load([]);
    await connect();
    expect(current.fakeIDB.createObjectStore).toHaveBeenCalledTimes(6);
  });

  it('skips object stores that already exist', async () => {
    load(['images', 'settings']);
    await connect();
    expect(current.fakeIDB.createObjectStore).toHaveBeenCalledTimes(4);
  });

  it('opens a single shared database connection', async () => {
    load([]);
    await current.db.images.getAll();
    await current.db.albums.getAll();
    await current.db.settings.get();
    const idb = require('idb') as { openDB: jest.Mock };
    expect(idb.openDB).toHaveBeenCalledTimes(1);
  });

  it('reads and writes images', async () => {
    load([]);
    await connect();
    current.fakeIDB.stores.images.getAll.mockResolvedValue([image('a')]);
    current.fakeIDB.stores.images.get.mockResolvedValue(image('a'));
    await expect(current.db.images.getAll()).resolves.toEqual([image('a')]);
    await expect(current.db.images.get('a')).resolves.toEqual(image('a'));
    await current.db.images.put(image('a'));
    await current.db.images.delete('a');
    expect(current.fakeIDB.stores.images.put).toHaveBeenCalledWith(image('a'));
    expect(current.fakeIDB.stores.images.delete).toHaveBeenCalledWith('a');
  });

  it('reads and writes albums', async () => {
    load([]);
    await connect();
    current.fakeIDB.stores.albums.getAll.mockResolvedValue([album('al')]);
    current.fakeIDB.stores.albums.get.mockResolvedValue(album('al'));
    await expect(current.db.albums.getAll()).resolves.toEqual([album('al')]);
    await expect(current.db.albums.get('al')).resolves.toEqual(album('al'));
    await current.db.albums.put(album('al'));
    await current.db.albums.delete('al');
    expect(current.fakeIDB.stores.albums.delete).toHaveBeenCalledWith('al');
  });

  it('reads and writes filters', async () => {
    load([]);
    await connect();
    current.fakeIDB.stores.filters.getAll.mockResolvedValue([filter('warm')]);
    await expect(current.db.filters.getAll()).resolves.toEqual([
      filter('warm'),
    ]);
    await current.db.filters.put(filter('warm'));
    expect(current.fakeIDB.stores.filters.put).toHaveBeenCalledWith(
      filter('warm')
    );
  });

  it('reads, writes, and deletes history entries', async () => {
    load([]);
    await connect();
    current.fakeIDB.stores.history.getAll.mockResolvedValue([entry]);
    await expect(current.db.history.getAll()).resolves.toEqual([entry]);
    await current.db.history.put(entry);
    await current.db.history.delete('h1');
    expect(current.fakeIDB.stores.history.delete).toHaveBeenCalledWith('h1');
  });

  it('reads, writes, and deletes layers', async () => {
    load([]);
    await connect();
    current.fakeIDB.stores.layers.getAll.mockResolvedValue([layer('l1')]);
    await expect(current.db.layers.getAll()).resolves.toEqual([layer('l1')]);
    await current.db.layers.put(layer('l1'));
    await current.db.layers.delete('l1');
    expect(current.fakeIDB.stores.layers.delete).toHaveBeenCalledWith('l1');
  });

  it('returns default settings when none stored', async () => {
    load([]);
    await connect();
    current.fakeIDB.stores.settings.get.mockResolvedValue(undefined);
    await expect(current.db.settings.get()).resolves.toEqual({
      theme: 'photo-light',
      defaultExportFormat: 'png',
      canvasBackground: 'checkerboard',
      defaultQuality: 85,
    });
  });

  it('persists settings with a fixed id', async () => {
    load([]);
    await current.db.settings.put(settings);
    expect(current.fakeIDB.stores.settings.put).toHaveBeenCalledWith({
      ...settings,
      id: 'settings',
    });
  });
});
