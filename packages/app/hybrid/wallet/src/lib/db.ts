const DB_NAME = 'wallet-db';
const DB_VERSION = 1;

const STORES = {
  accounts: 'accounts',
  transactions: 'transactions',
  cards: 'cards',
  recurringBills: 'recurringBills',
  notifications: 'notifications',
  budgetCategories: 'budgetCategories',
  currencyRates: 'currencyRates',
  user: 'user',
} as const;

type StoreName = (typeof STORES)[keyof typeof STORES];

let dbInstance: IDBDatabase | null = null;

const openDB = (): Promise<IDBDatabase> => {
  console.log('[db] openDB', { DB_NAME, DB_VERSION });
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('[db] openDB error', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      console.log('[db] openDB success');
      dbInstance = request.result;
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log('[db] onupgradeneeded', { stores: Object.values(STORES) });
      Object.values(STORES).forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      });
    };
  });
};

const getAll = async <T>(storeName: StoreName): Promise<T[]> => {
  console.log('[db] getAll', storeName);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => {
      console.log('[db] getAll result', storeName, request.result.length);
      resolve(request.result as T[]);
    };
    request.onerror = () => {
      console.error('[db] getAll error', storeName, request.error);
      reject(request.error);
    };
  });
};

const put = async <T>(storeName: StoreName, data: T): Promise<void> => {
  console.log('[db] put', storeName, data);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.put(data);
    request.onsuccess = () => resolve();
    request.onerror = () => {
      console.error('[db] put error', storeName, request.error);
      reject(request.error);
    };
  });
};

const putAll = async <T>(storeName: StoreName, data: T[]): Promise<void> => {
  console.log('[db] putAll', storeName, data.length);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    data.forEach((item) => store.put(item));
    tx.oncomplete = () => resolve();
    tx.onerror = () => {
      console.error('[db] putAll error', storeName, tx.error);
      reject(tx.error);
    };
  });
};

const count = async (storeName: StoreName): Promise<number> => {
  console.log('[db] count', storeName);
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.count();
    request.onsuccess = () => {
      console.log('[db] count result', storeName, request.result);
      resolve(request.result);
    };
    request.onerror = () => {
      console.error('[db] count error', storeName, request.error);
      reject(request.error);
    };
  });
};

const needsSeed = async (): Promise<boolean> => {
  console.log('[db] needsSeed check');
  const userCount = await count(STORES.user);
  const needs = userCount === 0;
  console.log('[db] needsSeed', { userCount, needs });
  return needs;
};

export const db = {
  open: openDB,
  getAll,
  put,
  putAll,
  count,
  needsSeed,
  STORES,
};
