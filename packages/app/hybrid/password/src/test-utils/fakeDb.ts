import type { Folder, Settings, VaultItem } from '@/types';

export interface FakeDb {
  db: {
    items: {
      getAll: jest.Mock;
      get: jest.Mock;
      put: jest.Mock;
      delete: jest.Mock;
    };
    folders: {
      getAll: jest.Mock;
      put: jest.Mock;
      delete: jest.Mock;
    };
    settings: {
      get: jest.Mock;
      put: jest.Mock;
    };
  };
  reset: (config?: {
    items?: VaultItem[];
    folders?: Folder[];
    settings?: Settings;
  }) => void;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'nothing',
  autoLockTimeout: 5,
  clipboardClear: 30,
};

export const createFakeDb = (): FakeDb => {
  let items: VaultItem[] = [];
  let folders: Folder[] = [];
  let settings: Settings = { ...DEFAULT_SETTINGS };

  const db = {
    items: {
      getAll: jest.fn(async (): Promise<VaultItem[]> => [...items]),
      get: jest.fn(async (id: string): Promise<VaultItem | undefined> =>
        items.find((i) => i.id === id)
      ),
      put: jest.fn(async (item: VaultItem): Promise<void> => {
        items = items.filter((i) => i.id !== item.id);
        items.push(item);
      }),
      delete: jest.fn(async (id: string): Promise<void> => {
        items = items.filter((i) => i.id !== id);
      }),
    },
    folders: {
      getAll: jest.fn(async (): Promise<Folder[]> => [...folders]),
      put: jest.fn(async (f: Folder): Promise<void> => {
        folders = folders.filter((x) => x.id !== f.id);
        folders.push(f);
      }),
      delete: jest.fn(async (id: string): Promise<void> => {
        folders = folders.filter((f) => f.id !== id);
      }),
    },
    settings: {
      get: jest.fn(async (): Promise<Settings> => ({ ...settings })),
      put: jest.fn(async (s: Settings): Promise<void> => {
        settings = { ...s };
      }),
    },
  };

  const reset = (config?: {
    items?: VaultItem[];
    folders?: Folder[];
    settings?: Settings;
  }): void => {
    items = config?.items ? [...config.items] : [];
    folders = config?.folders ? [...config.folders] : [];
    settings = config?.settings
      ? { ...config.settings }
      : { ...DEFAULT_SETTINGS };
  };

  return { db, reset };
};

export const mockDb = createFakeDb();
