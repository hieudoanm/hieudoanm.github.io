import { createEffect, createSignal } from 'solid-js';

export const createIndexedDB = <T>({
  databaseName = '',
  storeName = '',
}: {
  databaseName: string;
  storeName: string;
}) => {
  const [database, setDatabase] = createSignal<IDBDatabase | null>(null);

  createEffect(() => {
    const dbName = databaseName;
    const store = storeName;
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      if (!database.objectStoreNames.contains(store)) {
        const objectStore = database.createObjectStore(store, {
          keyPath: 'id',
          autoIncrement: true,
        });

        objectStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };

    request.onsuccess = () => {
      setDatabase(request.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
    };
  });

  const sortItems = (
    a: { completed?: boolean; updatedAt: string },
    b: { completed?: boolean; updatedAt: string }
  ) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  };

  const list = (): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      const db = database();
      if (!db) return resolve([]);

      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const items = request.result;
        items.sort(sortItems);

        resolve(items);
      };

      request.onerror = () =>
        reject(new Error(request.error?.message || 'Failed to fetch items'));
    });
  };

  const add = (text: string) => {
    return new Promise<void>((resolve, reject) => {
      const db = database();
      if (!db) return;

      const now = new Date().toISOString();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      store.add({ text, completed: false, updatedAt: now });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(new Error(transaction.error?.message || 'Failed to add item'));
    });
  };

  const update = (item: T) => {
    return new Promise<void>((resolve, reject) => {
      const db = database();
      if (!db) return;

      const now = new Date().toISOString();
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      store.put({ ...item, updatedAt: now });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(
          new Error(transaction.error?.message || 'Failed to update item')
        );
    });
  };

  const remove = (id: number) => {
    return new Promise<void>((resolve, reject) => {
      const db = database();
      if (!db) return;

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      store.delete(id);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(
          new Error(transaction.error?.message || 'Failed to delete item')
        );
    });
  };

  return { database, list, add, update, remove };
};
