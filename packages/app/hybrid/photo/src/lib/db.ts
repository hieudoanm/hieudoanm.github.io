import { openDB, type IDBPDatabase } from 'idb';
import type {
  PhotoImage,
  Album,
  Filter,
  EditHistoryEntry,
  Layer,
  PhotoSettings,
} from '@/types';

const DB_NAME = 'photo-db';
const DB_VERSION = 1;

const delay = () =>
  new Promise((r) =>
    setTimeout(r, parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY ?? '800'))
  );

interface PhotoDB {
  images: { key: string; value: PhotoImage };
  albums: { key: string; value: Album };
  filters: { key: string; value: Filter };
  history: { key: string; value: EditHistoryEntry };
  layers: { key: string; value: Layer };
  settings: { key: string; value: PhotoSettings & { id: string } };
}

let dbPromise: Promise<IDBPDatabase<PhotoDB>> | null = null;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<PhotoDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('images'))
          db.createObjectStore('images', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('albums'))
          db.createObjectStore('albums', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('filters'))
          db.createObjectStore('filters', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('history'))
          db.createObjectStore('history', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('layers'))
          db.createObjectStore('layers', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('settings'))
          db.createObjectStore('settings', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
};

export const db = {
  images: {
    getAll: async (): Promise<PhotoImage[]> => {
      await delay();
      return (await getDB()).getAll('images');
    },
    get: async (id: string): Promise<PhotoImage | undefined> => {
      await delay();
      return (await getDB()).get('images', id);
    },
    put: async (image: PhotoImage): Promise<void> => {
      await delay();
      await (await getDB()).put('images', image);
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      await (await getDB()).delete('images', id);
    },
  },
  albums: {
    getAll: async (): Promise<Album[]> => {
      await delay();
      return (await getDB()).getAll('albums');
    },
    get: async (id: string): Promise<Album | undefined> => {
      await delay();
      return (await getDB()).get('albums', id);
    },
    put: async (album: Album): Promise<void> => {
      await delay();
      await (await getDB()).put('albums', album);
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      await (await getDB()).delete('albums', id);
    },
  },
  filters: {
    getAll: async (): Promise<Filter[]> => {
      await delay();
      return (await getDB()).getAll('filters');
    },
    put: async (filter: Filter): Promise<void> => {
      await delay();
      await (await getDB()).put('filters', filter);
    },
  },
  history: {
    getAll: async (): Promise<EditHistoryEntry[]> => {
      await delay();
      return (await getDB()).getAll('history');
    },
    put: async (entry: EditHistoryEntry): Promise<void> => {
      await delay();
      await (await getDB()).put('history', entry);
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      await (await getDB()).delete('history', id);
    },
  },
  layers: {
    getAll: async (): Promise<Layer[]> => {
      await delay();
      return (await getDB()).getAll('layers');
    },
    put: async (layer: Layer): Promise<void> => {
      await delay();
      await (await getDB()).put('layers', layer);
    },
    delete: async (id: string): Promise<void> => {
      await delay();
      await (await getDB()).delete('layers', id);
    },
  },
  settings: {
    get: async (): Promise<PhotoSettings> => {
      await delay();
      const s = await (await getDB()).get('settings', 'settings');
      return (
        s ?? {
          theme: 'night',
          defaultExportFormat: 'png',
          canvasBackground: 'checkerboard',
          defaultQuality: 85,
        }
      );
    },
    put: async (s: PhotoSettings): Promise<void> => {
      await delay();
      await (await getDB()).put('settings', { ...s, id: 'settings' });
    },
  },
};
