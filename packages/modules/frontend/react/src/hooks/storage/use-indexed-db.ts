import { useEffect, useState } from 'react';

export const useIndexedDB = <T>({
  databaseName = '',
  storeName = '',
}: {
  databaseName: string;
  storeName: string;
}) => {
  const [database, setDatabase] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    const request = indexedDB.open(databaseName, 1);

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      if (!database.objectStoreNames.contains(storeName)) {
        const store = database.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });

        store.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };

    request.onsuccess = () => {
      setDatabase(request.result);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
    };
  }, [databaseName, storeName]);

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
      if (!database) return resolve([]);

      const transaction = database.transaction(storeName, 'readonly');
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
      if (!database) return;

      const now = new Date().toISOString();
      const transaction = database.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      store.add({ text, completed: false, updatedAt: now });

      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(new Error(transaction.error?.message || 'Failed to add item'));
    });
  };

  const update = (item: T) => {
    return new Promise<void>((resolve, reject) => {
      if (!database) return;

      const now = new Date().toISOString();
      const transaction = database.transaction(storeName, 'readwrite');
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
      if (!database) return;

      const transaction = database.transaction(storeName, 'readwrite');
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

export default useIndexedDB;
