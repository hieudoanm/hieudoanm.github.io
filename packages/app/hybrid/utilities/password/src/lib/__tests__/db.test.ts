import { openDB } from 'idb';
import { db } from '@/lib/db';
import type { Folder, Settings, VaultItem } from '@/types';

jest.mock('idb', () => ({
  openDB: jest.fn(),
}));

const mockOpenDB = openDB as jest.Mock;

const makeStore = (getValue: unknown) => ({
  getAll: jest.fn().mockResolvedValue(getValue),
  get: jest.fn().mockResolvedValue(getValue),
  put: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
});

const setupDB = (stores: Record<string, unknown> = {}) => {
  const itemStores: Record<string, ReturnType<typeof makeStore>> = {};
  for (const name of ['items', 'folders', 'settings']) {
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

const item: VaultItem = {
  id: 'v-1',
  type: 'login',
  title: 'GitHub',
  username: 'user@gmail.com',
  password: 'Sup3r!Secret',
  favorite: true,
  tags: ['dev'],
  createdAt: 1,
  updatedAt: 2,
};

const folder: Folder = { id: 'f-1', name: 'Work', createdAt: 1 };

describe('db', () => {
  beforeEach(() => {
    mockOpenDB.mockReset();
  });

  it('items.getAll returns stored items', async () => {
    const { itemStores } = setupDB({ items: [item] });
    await expect(db.items.getAll()).resolves.toEqual([item]);
    expect(itemStores.items.getAll).toHaveBeenCalled();
  });

  it('items.get returns item by id', async () => {
    const { itemStores } = setupDB({ items: item });
    await expect(db.items.get('v-1')).resolves.toEqual(item);
    expect(itemStores.items.get).toHaveBeenCalledWith('v-1');
  });

  it('items.put writes item', async () => {
    const { itemStores } = setupDB();
    await db.items.put(item);
    expect(itemStores.items.put).toHaveBeenCalledWith(item);
  });

  it('items.delete removes item by id', async () => {
    const { itemStores } = setupDB();
    await db.items.delete('v-1');
    expect(itemStores.items.delete).toHaveBeenCalledWith('v-1');
  });

  it('folders getAll/put/delete', async () => {
    const { itemStores } = setupDB({ folders: [folder] });
    await expect(db.folders.getAll()).resolves.toEqual([folder]);
    await db.folders.put(folder);
    await db.folders.delete('f-1');
    expect(itemStores.folders.put).toHaveBeenCalledWith(folder);
    expect(itemStores.folders.delete).toHaveBeenCalledWith('f-1');
  });

  it('settings.get returns stored settings', async () => {
    const settings: Settings = {
      theme: 'night',
      autoLockTimeout: 15,
      clipboardClear: 60,
    };
    setupDB({ settings });
    await expect(db.settings.get()).resolves.toEqual(settings);
  });

  it('settings.get returns defaults when missing', async () => {
    setupDB({ settings: undefined });
    await expect(db.settings.get()).resolves.toEqual({
      id: 'default',
      theme: 'nothing',
      autoLockTimeout: 5,
      clipboardClear: 30,
      biometricEnabled: false,
      lockOnClose: false,
    });
  });

  it('settings.put forces default id', async () => {
    const { itemStores } = setupDB();
    await db.settings.put({
      theme: 'dark',
      autoLockTimeout: 10,
      clipboardClear: 20,
    });
    expect(itemStores.settings.put).toHaveBeenCalledWith({
      id: 'default',
      theme: 'dark',
      autoLockTimeout: 10,
      clipboardClear: 20,
    });
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
    await db.items.getAll();
    expect(createObjectStore).toHaveBeenCalledWith('items', { keyPath: 'id' });
    expect(createObjectStore).toHaveBeenCalledWith('folders', {
      keyPath: 'id',
    });
    expect(createObjectStore).toHaveBeenCalledWith('settings', {
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
    await db.items.getAll();
    expect(createObjectStore).not.toHaveBeenCalled();
  });

  it('honors the NEXT_PUBLIC_MOCK_DELAY env var', async () => {
    const original = process.env.NEXT_PUBLIC_MOCK_DELAY;
    process.env.NEXT_PUBLIC_MOCK_DELAY = '10';
    setupDB({ items: [item] });
    await expect(db.items.getAll()).resolves.toEqual([item]);
    process.env.NEXT_PUBLIC_MOCK_DELAY = original;
  });
});
