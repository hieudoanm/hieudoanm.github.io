import type { User, Account } from '@/types';

const failingStores = new Set<string>();
const syncThrowingStores = new Set<string>();

interface FakeRequest {
  result: unknown;
  error: Error | null;
  onsuccess: ((ev: { target: FakeRequest }) => void) | null;
  onerror: ((ev: { target: FakeRequest }) => void) | null;
  onupgradeneeded: ((ev: { target: FakeRequest }) => void) | null;
  _succeed: (result: unknown) => void;
  _fail: (error: Error) => void;
}

const makeRequest = (): FakeRequest => {
  const request: FakeRequest = {
    result: null,
    error: null,
    onsuccess: null,
    onerror: null,
    onupgradeneeded: null,
    _succeed(result: unknown) {
      this.result = result;
      this.onsuccess?.({ target: this });
    },
    _fail(error: Error) {
      this.error = error;
      this.onerror?.({ target: this });
    },
  };
  return request;
};

class FakeStore {
  getAll = () => {
    const req = makeRequest();
    queueMicrotask(() =>
      failingStores.has(this.name)
        ? req._fail(new Error('getAll failed'))
        : req._succeed([...this.data.values()])
    );
    return req;
  };

  count = () => {
    const req = makeRequest();
    queueMicrotask(() =>
      failingStores.has(this.name)
        ? req._fail(new Error('count failed'))
        : req._succeed(this.data.size)
    );
    return req;
  };

  put = (value: { id: string }) => {
    if (syncThrowingStores.has(this.name)) throw new Error('sync item failure');
    const req = makeRequest();
    queueMicrotask(() => {
      if (failingStores.has(this.name))
        return req._fail(new Error('put failed'));
      this.data.set(value.id, value);
      req._succeed(undefined);
    });
    return req;
  };

  delete = (id: string) => {
    const req = makeRequest();
    queueMicrotask(() => {
      if (failingStores.has(this.name))
        return req._fail(new Error('delete failed'));
      this.data.delete(id);
      req._succeed(undefined);
    });
    return req;
  };

  constructor(
    public name: string,
    public data: Map<string, unknown>
  ) {}
}

class FakeTransaction {
  oncomplete: (() => void) | null = null;
  onerror: ((ev: { target: unknown }) => void) | null = null;
  readonly error: Error | null = new Error('putAll failed');

  objectStore = (name: string) => {
    const store = new FakeStore(name, this.database.getStore(name));
    queueMicrotask(() => {
      if (failingStores.has(name)) this.onerror?.({ target: this });
      else this.oncomplete?.();
    });
    return store;
  };

  constructor(
    public mode: string,
    private database: FakeDatabase
  ) {}
}

class FakeDatabase {
  stores = new Set<string>();
  private storeData = new Map<string, Map<string, unknown>>();

  objectStoreNames = {
    contains: (name: string) => this.stores.has(name),
  };

  getStore = (name: string) => {
    if (!this.storeData.has(name)) this.storeData.set(name, new Map());
    return this.storeData.get(name)!;
  };

  createObjectStore = (name: string) => {
    this.stores.add(name);
    this.getStore(name);
    return new FakeStore(name, this.storeData.get(name)!);
  };

  transaction = (_name: string, mode: string) =>
    new FakeTransaction(mode, this);
}

const databases = new Map<string, FakeDatabase>();

const fakeIndexedDB = {
  open: (name: string, version: number) => {
    const request = makeRequest();
    let database = databases.get(name);
    if (!database) {
      database = new FakeDatabase();
      databases.set(name, database);
      queueMicrotask(() => {
        request.result = database;
        request.onupgradeneeded?.({ target: request });
        request._succeed(database);
      });
    } else {
      queueMicrotask(() => request._succeed(database));
    }
    return request;
  },
};

const user = (id: string): User => ({
  id,
  name: `User ${id}`,
  email: `${id}@example.com`,
  phone: '123',
  country: 'US',
  timezone: 'EST',
  currency: 'USD',
  avatar: '',
});

const account = (id: string): Account => ({
  id,
  name: `Account ${id}`,
  type: 'checking',
  balance: 100,
  currency: 'USD',
  accountNumber: `000${id}`,
  color: 'primary',
});

describe('db', () => {
  let db: (typeof import('@/lib/db'))['db'];

  beforeEach(async () => {
    jest.resetModules();
    databases.clear();
    failingStores.clear();
    syncThrowingStores.clear();
    (globalThis as { indexedDB?: unknown }).indexedDB = fakeIndexedDB;
    db = (await import('@/lib/db')).db;
  });

  it('exposes the expected store names', () => {
    expect(db.STORES).toMatchObject({
      user: 'user',
      accounts: 'accounts',
      transactions: 'transactions',
      cards: 'cards',
      recurringBills: 'recurringBills',
      notifications: 'notifications',
      budgetCategories: 'budgetCategories',
      currencyRates: 'currencyRates',
    });
    expect(Object.values(db.STORES)).toHaveLength(18);
  });

  it('creates object stores on first open', async () => {
    const database = await db.open();
    Object.values(db.STORES).forEach((storeName) => {
      expect(database.objectStoreNames.contains(storeName)).toBe(true);
    });
  });

  it('reuses the cached database instance on subsequent opens', async () => {
    const database = await db.open();
    const second = await db.open();
    expect(second).toBe(database);
  });

  it('getAll returns empty array for empty store', async () => {
    await expect(db.getAll<User>(db.STORES.user)).resolves.toEqual([]);
  });

  it('put then getAll round-trips data', async () => {
    await db.put<User>(db.STORES.user, user('u1'));
    const items = await db.getAll<User>(db.STORES.user);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ id: 'u1' });
  });

  it('putAll stores valid items and skips missing ids', async () => {
    await db.putAll(db.STORES.accounts, [
      account('a1'),
      account('a2'),
      null as unknown as Account,
      { balance: 5 } as unknown as Account,
    ]);
    const items = await db.getAll<Account>(db.STORES.accounts);
    expect(items).toHaveLength(2);
    expect(items.map((a) => a.id).sort()).toEqual(['a1', 'a2']);
  });

  it('putAll no-ops when no valid items exist', async () => {
    await db.putAll(db.STORES.accounts, [null as unknown as Account]);
    await expect(db.getAll(db.STORES.accounts)).resolves.toEqual([]);
  });

  it('putAll survives item-level put failures', async () => {
    syncThrowingStores.add('accounts');
    await expect(
      db.putAll(db.STORES.accounts, [account('a1'), account('a2')])
    ).resolves.toBeUndefined();
  });

  it('count reflects store size', async () => {
    await db.put(db.STORES.user, user('u1'));
    await db.put(db.STORES.user, user('u2'));
    await expect(db.count(db.STORES.user)).resolves.toBe(2);
  });

  it('remove deletes an item', async () => {
    await db.put(db.STORES.user, user('u1'));
    await db.remove(db.STORES.user, 'u1');
    await expect(db.getAll(db.STORES.user)).resolves.toEqual([]);
  });

  it('needsSeed returns true when user store is empty', async () => {
    await expect(db.needsSeed()).resolves.toBe(true);
  });

  it('needsSeed returns false when user exists', async () => {
    await db.put<User>(db.STORES.user, user('u1'));
    await expect(db.needsSeed()).resolves.toBe(false);
  });

  it('rejects getAll when the request fails', async () => {
    failingStores.add('transactions');
    await expect(db.getAll(db.STORES.transactions)).rejects.toThrow(
      'getAll failed'
    );
  });

  it('rejects put when the request fails', async () => {
    failingStores.add('cards');
    await expect(db.put(db.STORES.cards, { id: 'c1' })).rejects.toThrow(
      'put failed'
    );
  });

  it('rejects putAll when the transaction fails', async () => {
    failingStores.add('accounts');
    await expect(
      db.putAll(db.STORES.accounts, [account('a1')])
    ).rejects.toThrow('putAll failed');
  });

  it('rejects count when the request fails', async () => {
    failingStores.add('user');
    await expect(db.count(db.STORES.user)).rejects.toThrow('count failed');
  });

  it('rejects remove when the request fails', async () => {
    failingStores.add('user');
    await expect(db.remove(db.STORES.user, 'u1')).rejects.toThrow(
      'delete failed'
    );
  });
});
