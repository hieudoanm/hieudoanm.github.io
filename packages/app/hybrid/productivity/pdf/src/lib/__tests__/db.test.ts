import { db } from '@/lib/db';
import type {
  PDFDocument,
  Annotation,
  Bookmark,
  FormField,
  Stamp,
  Settings,
} from '@/types';

jest.mock('idb', () => ({ openDB: jest.fn() }));

const { openDB } = jest.requireMock('idb');

interface StoreData {
  data: Map<string, unknown>;
}

const stores: Record<string, StoreData> = {};

const createMockDB = () => ({
  objectStoreNames: {
    contains: (name: string) => name in stores,
  },
  createObjectStore: (name: string) => {
    stores[name] = { data: new Map() };
    return { createIndex: () => {} };
  },
  getAll: (store: string) => [...stores[store].data.values()],
  get: (store: string, key: string) => stores[store].data.get(key),
  put: (store: string, value: { id: string }) => {
    stores[store].data.set(value.id, value);
  },
  delete: (store: string, key: string) => {
    stores[store].data.delete(key);
  },
  transaction: (store: string) => ({
    store: {
      index: () => ({
        getAll: (documentId: string) =>
          [...stores[store].data.values()].filter(
            (value) =>
              (value as { documentId: string }).documentId === documentId
          ),
        getAllKeys: (documentId: string) =>
          [...stores[store].data.values()]
            .filter(
              (value) =>
                (value as { documentId: string }).documentId === documentId
            )
            .map((value) => (value as { id: string }).id),
      }),
      delete: (key: string) => {
        stores[store].data.delete(key);
      },
    },
    done: Promise.resolve(),
  }),
});

const documentFactory = (id: string): PDFDocument => ({
  id,
  title: `Document ${id}`,
  filename: `${id}.pdf`,
  author: 'Author',
  pageCount: 1,
  fileSize: 1024,
  createdAt: 1000,
  updatedAt: 1000,
  lastOpenedAt: 1000,
  thumbnailColor: '#000000',
  pages: [],
});

const annotation = (id: string, documentId: string): Annotation => ({
  id,
  documentId,
  pageNumber: 1,
  type: 'highlight',
  color: '#facc15',
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  content: 'note',
  createdAt: 1000,
  updatedAt: 1000,
});

const bookmark = (id: string, documentId: string): Bookmark => ({
  id,
  documentId,
  pageNumber: 1,
  title: 'Bookmark',
  createdAt: 1000,
});

const formField = (id: string, documentId: string): FormField => ({
  id,
  documentId,
  pageNumber: 1,
  type: 'text',
  label: 'Field',
  value: '',
  x: 0,
  y: 0,
  width: 10,
  height: 10,
});

const stamp = (id: string, documentId: string): Stamp => ({
  id,
  documentId,
  pageNumber: 1,
  preset: 'Approved',
  text: 'APPROVED',
  color: '#10b981',
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  rotation: 0,
  createdAt: 1000,
});

describe('db', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    for (const key of Object.keys(stores)) delete stores[key];
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
    openDB.mockImplementation(
      (
        _name: string,
        _version: number,
        opts: { upgrade: (database: unknown) => void }
      ) => {
        const mockDB = createMockDB();
        opts.upgrade(mockDB);
        return Promise.resolve(mockDB);
      }
    );
  });

  it('creates the six object stores on upgrade', async () => {
    await db.documents.getAll();
    expect(openDB).toHaveBeenCalledWith('pdf-db', 1, expect.any(Object));
    expect(Object.keys(stores).sort()).toEqual([
      'annotations',
      'bookmarks',
      'documents',
      'formFields',
      'settings',
      'stamps',
    ]);
  });

  it('documents getAll/put/delete round-trip', async () => {
    await db.documents.put(documentFactory('doc-1'));
    await db.documents.put(documentFactory('doc-2'));
    const all = await db.documents.getAll();
    expect(all.map((d) => d.id)).toEqual(['doc-1', 'doc-2']);
    await db.documents.delete('doc-1');
    await expect(db.documents.getAll()).resolves.toEqual([
      expect.objectContaining({ id: 'doc-2' }),
    ]);
  });

  it('documents.get returns a single document', async () => {
    await db.documents.put(documentFactory('doc-1'));
    await expect(db.documents.get('doc-1')).resolves.toMatchObject({
      id: 'doc-1',
    });
    await expect(db.documents.get('missing')).resolves.toBeUndefined();
  });

  it('annotations getAll/put/delete round-trip', async () => {
    await db.annotations.put(annotation('a1', 'doc-1'));
    await expect(db.annotations.getAll()).resolves.toHaveLength(1);
    await db.annotations.delete('a1');
    await expect(db.annotations.getAll()).resolves.toEqual([]);
  });

  it('annotations.getByDocument filters by document', async () => {
    await db.annotations.put(annotation('a1', 'doc-1'));
    await db.annotations.put(annotation('a2', 'doc-1'));
    await db.annotations.put(annotation('a3', 'doc-2'));
    const result = await db.annotations.getByDocument('doc-1');
    expect(result.map((a) => a.id)).toEqual(['a1', 'a2']);
  });

  it('annotations.deleteByDocument removes only matching annotations', async () => {
    await db.annotations.put(annotation('a1', 'doc-1'));
    await db.annotations.put(annotation('a2', 'doc-1'));
    await db.annotations.put(annotation('a3', 'doc-2'));
    await db.annotations.deleteByDocument('doc-1');
    const remaining = await db.annotations.getAll();
    expect(remaining.map((a) => a.id)).toEqual(['a3']);
  });

  it('bookmarks getAll/put/delete round-trip', async () => {
    await db.bookmarks.put(bookmark('b1', 'doc-1'));
    await expect(db.bookmarks.getAll()).resolves.toHaveLength(1);
    await db.bookmarks.delete('b1');
    await expect(db.bookmarks.getAll()).resolves.toEqual([]);
  });

  it('bookmarks.getByDocument filters by document', async () => {
    await db.bookmarks.put(bookmark('b1', 'doc-1'));
    await db.bookmarks.put(bookmark('b2', 'doc-2'));
    const result = await db.bookmarks.getByDocument('doc-2');
    expect(result.map((b) => b.id)).toEqual(['b2']);
  });

  it('formFields getAll/put/delete round-trip', async () => {
    await db.formFields.put(formField('f1', 'doc-1'));
    await expect(db.formFields.getAll()).resolves.toHaveLength(1);
    await db.formFields.delete('f1');
    await expect(db.formFields.getAll()).resolves.toEqual([]);
  });

  it('formFields.getByDocument filters by document', async () => {
    await db.formFields.put(formField('f1', 'doc-1'));
    await db.formFields.put(formField('f2', 'doc-2'));
    const result = await db.formFields.getByDocument('doc-2');
    expect(result.map((f) => f.id)).toEqual(['f2']);
  });

  it('stamps getAll/put/delete round-trip', async () => {
    await db.stamps.put(stamp('s1', 'doc-1'));
    await expect(db.stamps.getAll()).resolves.toHaveLength(1);
    await db.stamps.delete('s1');
    await expect(db.stamps.getAll()).resolves.toEqual([]);
  });

  it('stamps.getByDocument filters by document', async () => {
    await db.stamps.put(stamp('s1', 'doc-1'));
    await db.stamps.put(stamp('s2', 'doc-2'));
    const result = await db.stamps.getByDocument('doc-2');
    expect(result.map((s) => s.id)).toEqual(['s2']);
  });

  it('settings.get returns defaults when nothing is stored', async () => {
    const settings = await db.settings.get();
    expect(settings).toEqual({
      id: 'default',
      theme: 'pdf-light',
      defaultZoom: 100,
      pageLayout: 'continuous',
      annotationDefaults: { color: '#facc15', strokeWidth: 2 },
    });
  });

  it('settings.get returns stored settings', async () => {
    const saved: Settings = {
      id: 'default',
      theme: 'night',
      defaultZoom: 150,
      pageLayout: 'single',
      annotationDefaults: { color: '#3b82f6', strokeWidth: 4 },
    };
    await db.settings.put(saved);
    await expect(db.settings.get()).resolves.toMatchObject({
      ...saved,
      id: 'default',
    });
  });

  it('settings.put merges a default id', async () => {
    await db.settings.put({ theme: 'dark' } as Settings);
    expect(stores.settings.data.get('default')).toMatchObject({
      id: 'default',
      theme: 'dark',
    });
  });

  it('falls back to the default delay when env is unset', async () => {
    delete process.env.NEXT_PUBLIC_MOCK_DELAY;
    jest.useFakeTimers();
    const promise = db.documents.getAll();
    jest.advanceTimersByTime(800);
    await promise;
    jest.useRealTimers();
    expect(openDB).toHaveBeenCalled();
  });
});
