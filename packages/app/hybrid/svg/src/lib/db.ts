import { openDB, type IDBPDatabase } from 'idb';
import type {
  SVGDocument,
  SVGSymbol,
  SVGSettings,
  HistoryEntry,
} from '@/types';

const DB_NAME = 'svg-db';
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
      if (!db.objectStoreNames.contains('documents')) {
        db.createObjectStore('documents', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('symbols')) {
        db.createObjectStore('symbols', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('history')) {
        const historyStore = db.createObjectStore('history', {
          keyPath: 'id',
        });
        historyStore.createIndex('documentId', 'documentId');
      }
    },
  });

export const db = {
  documents: {
    getAll: async (): Promise<SVGDocument[]> => {
      await delay(getMockDelay());
      const database = await getDB();
      return database.getAll('documents');
    },
    get: async (id: string): Promise<SVGDocument | undefined> => {
      await delay(getMockDelay());
      const database = await getDB();
      return database.get('documents', id);
    },
    put: async (document: SVGDocument): Promise<void> => {
      await delay(getMockDelay());
      const database = await getDB();
      await database.put('documents', document);
    },
    delete: async (id: string): Promise<void> => {
      await delay(getMockDelay());
      const database = await getDB();
      await database.delete('documents', id);
    },
  },
  symbols: {
    getAll: async (): Promise<SVGSymbol[]> => {
      await delay(getMockDelay());
      const database = await getDB();
      return database.getAll('symbols');
    },
    get: async (id: string): Promise<SVGSymbol | undefined> => {
      await delay(getMockDelay());
      const database = await getDB();
      return database.get('symbols', id);
    },
    put: async (symbol: SVGSymbol): Promise<void> => {
      await delay(getMockDelay());
      const database = await getDB();
      await database.put('symbols', symbol);
    },
    delete: async (id: string): Promise<void> => {
      await delay(getMockDelay());
      const database = await getDB();
      await database.delete('symbols', id);
    },
  },
  settings: {
    get: async (): Promise<SVGSettings> => {
      await delay(getMockDelay());
      const database = await getDB();
      const settings = await database.get('settings', 'default');
      return (
        settings ?? {
          id: 'default',
          theme: 'night',
          gridSize: 20,
          snapToGrid: true,
          showGrid: true,
          showRulers: true,
          exportFormat: 'svg',
          exportScale: 2,
        }
      );
    },
    put: async (settings: SVGSettings): Promise<void> => {
      await delay(getMockDelay());
      const database = await getDB();
      await database.put('settings', { id: 'default', ...settings });
    },
  },
  history: {
    getAll: async (): Promise<HistoryEntry[]> => {
      await delay(getMockDelay());
      const database = await getDB();
      return database.getAll('history');
    },
    getByDocument: async (documentId: string): Promise<HistoryEntry[]> => {
      await delay(getMockDelay());
      const database = await getDB();
      const index = database.transaction('history').store.index('documentId');
      return index.getAll(documentId);
    },
    put: async (entry: HistoryEntry): Promise<void> => {
      await delay(getMockDelay());
      const database = await getDB();
      await database.put('history', entry);
    },
    deleteByDocument: async (documentId: string): Promise<void> => {
      await delay(getMockDelay());
      const database = await getDB();
      const tx = database.transaction('history', 'readwrite');
      const index = tx.store.index('documentId');
      const keys = await index.getAllKeys(documentId);
      await Promise.all(keys.map((key) => tx.store.delete(key)));
      await tx.done;
    },
  },
};
