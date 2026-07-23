import { openDB, type IDBPDatabase } from 'idb';
import type {
  DatabaseConnection,
  QueryHistory,
  Bookmark,
  Settings,
} from '@/types';

const DB_NAME = 'database-db';
const DB_VERSION = 1;

const getMockDelay = (): number => {
  if (typeof window === 'undefined') return 0;
  const delay = process.env.NEXT_PUBLIC_MOCK_DELAY;
  return delay ? parseInt(delay, 10) : 800;
};

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getDB = (): Promise<IDBPDatabase> =>
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('connections'))
        db.createObjectStore('connections', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('history'))
        db.createObjectStore('history', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('bookmarks'))
        db.createObjectStore('bookmarks', { keyPath: 'id' });
      if (!db.objectStoreNames.contains('settings'))
        db.createObjectStore('settings', { keyPath: 'id' });
    },
  });

export const db = {
  connections: {
    getAll: async (): Promise<DatabaseConnection[]> => {
      await delay(getMockDelay());
      return (await getDB()).getAll('connections');
    },
    get: async (id: string): Promise<DatabaseConnection | undefined> => {
      await delay(getMockDelay());
      return (await getDB()).get('connections', id);
    },
    put: async (conn: DatabaseConnection): Promise<void> => {
      await delay(getMockDelay());
      await (await getDB()).put('connections', conn);
    },
    delete: async (id: string): Promise<void> => {
      await delay(getMockDelay());
      await (await getDB()).delete('connections', id);
    },
  },
  history: {
    getAll: async (): Promise<QueryHistory[]> => {
      await delay(getMockDelay());
      return (await getDB()).getAll('history');
    },
    put: async (h: QueryHistory): Promise<void> => {
      await delay(getMockDelay());
      await (await getDB()).put('history', h);
    },
    delete: async (id: string): Promise<void> => {
      await delay(getMockDelay());
      await (await getDB()).delete('history', id);
    },
  },
  bookmarks: {
    getAll: async (): Promise<Bookmark[]> => {
      await delay(getMockDelay());
      return (await getDB()).getAll('bookmarks');
    },
    put: async (b: Bookmark): Promise<void> => {
      await delay(getMockDelay());
      await (await getDB()).put('bookmarks', b);
    },
    delete: async (id: string): Promise<void> => {
      await delay(getMockDelay());
      await (await getDB()).delete('bookmarks', id);
    },
  },
  settings: {
    get: async (): Promise<Settings> => {
      await delay(getMockDelay());
      const s = await (await getDB()).get('settings', 'default');
      return (
        s ?? {
          id: 'default',
          theme: 'night',
          defaultPort: 5432,
          editorFontSize: 14,
          queryTimeout: 30,
        }
      );
    },
    put: async (s: Settings): Promise<void> => {
      await delay(getMockDelay());
      await (await getDB()).put('settings', { id: 'default', ...s });
    },
  },
};
