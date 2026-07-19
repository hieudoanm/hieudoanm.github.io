import { openDB, type IDBPDatabase } from 'idb';
import type {
  PDFDocument,
  Annotation,
  Bookmark,
  FormField,
  Stamp,
  Settings,
} from '@/types';

const DB_NAME = 'pdf-db';
const DB_VERSION = 1;

const getMockDelay = (): number => {
  if (typeof window === 'undefined') return 0;
  const delay = process.env.NEXT_PUBLIC_MOCK_DELAY;
  return delay ? parseInt(delay, 10) : 800;
};

const mockDelay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getDB = (): Promise<IDBPDatabase> =>
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('documents')) {
        db.createObjectStore('documents', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('annotations')) {
        const store = db.createObjectStore('annotations', { keyPath: 'id' });
        store.createIndex('documentId', 'documentId');
      }
      if (!db.objectStoreNames.contains('bookmarks')) {
        const store = db.createObjectStore('bookmarks', { keyPath: 'id' });
        store.createIndex('documentId', 'documentId');
      }
      if (!db.objectStoreNames.contains('formFields')) {
        const store = db.createObjectStore('formFields', { keyPath: 'id' });
        store.createIndex('documentId', 'documentId');
      }
      if (!db.objectStoreNames.contains('stamps')) {
        const store = db.createObjectStore('stamps', { keyPath: 'id' });
        store.createIndex('documentId', 'documentId');
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'id' });
      }
    },
  });

export const db = {
  documents: {
    getAll: async (): Promise<PDFDocument[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      return database.getAll('documents');
    },
    get: async (id: string): Promise<PDFDocument | undefined> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      return database.get('documents', id);
    },
    put: async (doc: PDFDocument): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.put('documents', doc);
    },
    delete: async (id: string): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.delete('documents', id);
    },
  },
  annotations: {
    getAll: async (): Promise<Annotation[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      return database.getAll('annotations');
    },
    getByDocument: async (documentId: string): Promise<Annotation[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      const index = database
        .transaction('annotations')
        .store.index('documentId');
      return index.getAll(documentId);
    },
    get: async (id: string): Promise<Annotation | undefined> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      return database.get('annotations', id);
    },
    put: async (ann: Annotation): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.put('annotations', ann);
    },
    delete: async (id: string): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.delete('annotations', id);
    },
    deleteByDocument: async (documentId: string): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      const tx = database.transaction('annotations', 'readwrite');
      const index = tx.store.index('documentId');
      const keys = await index.getAllKeys(documentId);
      await Promise.all(keys.map((key) => tx.store.delete(key)));
      await tx.done;
    },
  },
  bookmarks: {
    getAll: async (): Promise<Bookmark[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      return database.getAll('bookmarks');
    },
    getByDocument: async (documentId: string): Promise<Bookmark[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      const index = database.transaction('bookmarks').store.index('documentId');
      return index.getAll(documentId);
    },
    put: async (bm: Bookmark): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.put('bookmarks', bm);
    },
    delete: async (id: string): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.delete('bookmarks', id);
    },
  },
  formFields: {
    getAll: async (): Promise<FormField[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      return database.getAll('formFields');
    },
    getByDocument: async (documentId: string): Promise<FormField[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      const index = database
        .transaction('formFields')
        .store.index('documentId');
      return index.getAll(documentId);
    },
    put: async (field: FormField): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.put('formFields', field);
    },
    delete: async (id: string): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.delete('formFields', id);
    },
  },
  stamps: {
    getAll: async (): Promise<Stamp[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      return database.getAll('stamps');
    },
    getByDocument: async (documentId: string): Promise<Stamp[]> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      const index = database.transaction('stamps').store.index('documentId');
      return index.getAll(documentId);
    },
    put: async (stamp: Stamp): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.put('stamps', stamp);
    },
    delete: async (id: string): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      await database.delete('stamps', id);
    },
  },
  settings: {
    get: async (): Promise<Settings> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      const settings = await database.get('settings', 'default');
      return (
        settings ?? {
          id: 'default',
          theme: 'night',
          defaultZoom: 100,
          pageLayout: 'continuous',
          annotationDefaults: { color: '#facc15', strokeWidth: 2 },
        }
      );
    },
    put: async (settings: Settings): Promise<void> => {
      await mockDelay(getMockDelay());
      const database = await getDB();
      const toSave = { ...settings, id: 'default' };
      await database.put('settings', toSave);
    },
  },
};
