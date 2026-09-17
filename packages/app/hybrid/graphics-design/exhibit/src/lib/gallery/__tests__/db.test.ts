import { openDB } from 'idb';
import { db } from '@/lib/gallery/db';
import type { Album, Photo } from '@/types/gallery';

jest.mock('idb', () => ({
  openDB: jest.fn(),
}));

const mockOpenDB = openDB as jest.Mock;

const makeStore = (getValue: unknown) => ({
  getAll: jest.fn().mockResolvedValue(getValue),
  get: jest
    .fn()
    .mockResolvedValue(Array.isArray(getValue) ? getValue[0] : getValue),
  put: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
});

const setupDB = (stores: Record<string, unknown> = {}) => {
  const itemStores: Record<string, ReturnType<typeof makeStore>> = {};
  for (const name of ['photos', 'albums']) {
    itemStores[name] = makeStore(stores[name]);
  }
  const instance = {
    objectStoreNames: { contains: jest.fn(() => true) },
    createObjectStore: jest.fn(),
    getAll: (name: string) => itemStores[name].getAll(),
    get: (name: string, id: string) => itemStores[name].get(id),
    put: (name: string, value: unknown) => itemStores[name].put(value),
    delete: (name: string, id: string) => itemStores[name].delete(id),
  };
  mockOpenDB.mockResolvedValue(instance);
  return { instance, itemStores };
};

const photo: Photo = {
  id: 'p-1',
  name: 'Ocean',
  type: 'image/jpeg',
  width: 100,
  height: 100,
  size: 1000,
  color: '#000',
  tags: [],
  favorite: false,
  albumId: null,
  createdAt: 1,
  updatedAt: 2,
};

const album: Album = {
  id: 'a-1',
  name: 'Nature',
  coverId: 'p-1',
  photoIds: ['p-1'],
  createdAt: 1,
  updatedAt: 1,
};

describe('gallery db', () => {
  beforeEach(() => {
    mockOpenDB.mockReset();
  });

  it('photos.getAll/get/put/delete', async () => {
    const { itemStores } = setupDB({ photos: [photo] });
    await expect(db.photos.getAll()).resolves.toEqual([photo]);
    await expect(db.photos.get('p-1')).resolves.toEqual(photo);
    await db.photos.put(photo);
    await db.photos.delete('p-1');
    expect(itemStores.photos.put).toHaveBeenCalledWith(photo);
    expect(itemStores.photos.delete).toHaveBeenCalledWith('p-1');
  });

  it('albums.getAll/get/put/delete', async () => {
    const { itemStores } = setupDB({ albums: [album] });
    await expect(db.albums.getAll()).resolves.toEqual([album]);
    await expect(db.albums.get('a-1')).resolves.toEqual(album);
    await db.albums.put(album);
    await db.albums.delete('a-1');
    expect(itemStores.albums.put).toHaveBeenCalledWith(album);
    expect(itemStores.albums.delete).toHaveBeenCalledWith('a-1');
  });

  it('creates missing object stores during upgrade', async () => {
    const createObjectStore = jest.fn();
    mockOpenDB.mockImplementation(
      (
        _name: string,
        _version: number,
        { upgrade }: { upgrade: (db: unknown) => void }
      ) => {
        const instance = {
          objectStoreNames: { contains: jest.fn(() => false) },
          createObjectStore,
          getAll: jest.fn().mockResolvedValue([]),
          get: jest.fn(),
          put: jest.fn(),
          delete: jest.fn(),
        };
        upgrade(instance);
        return Promise.resolve(instance);
      }
    );
    await db.photos.getAll();
    expect(createObjectStore).toHaveBeenCalledWith('photos', {
      keyPath: 'id',
    });
    expect(createObjectStore).toHaveBeenCalledWith('albums', {
      keyPath: 'id',
    });
  });

  it('does not recreate existing object stores during upgrade', async () => {
    const createObjectStore = jest.fn();
    mockOpenDB.mockImplementation(
      (
        _name: string,
        _version: number,
        { upgrade }: { upgrade: (db: unknown) => void }
      ) => {
        const instance = {
          objectStoreNames: { contains: jest.fn(() => true) },
          createObjectStore,
          getAll: jest.fn().mockResolvedValue([]),
          get: jest.fn(),
          put: jest.fn(),
          delete: jest.fn(),
        };
        upgrade(instance);
        return Promise.resolve(instance);
      }
    );
    await db.photos.getAll();
    expect(createObjectStore).not.toHaveBeenCalled();
  });

  it('honors the NEXT_PUBLIC_MOCK_DELAY env var', async () => {
    const original = process.env.NEXT_PUBLIC_MOCK_DELAY;
    process.env.NEXT_PUBLIC_MOCK_DELAY = '10';
    setupDB({ photos: [photo] });
    await expect(db.photos.getAll()).resolves.toEqual([photo]);
    process.env.NEXT_PUBLIC_MOCK_DELAY = original;
  });
});
