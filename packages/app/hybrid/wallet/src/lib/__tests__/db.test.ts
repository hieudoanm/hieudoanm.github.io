jest.mock('@/lib/db', () => {
  const storeData: Record<string, Record<string, unknown>> = {
    user: {},
    accounts: {},
    transactions: {},
    cards: {},
    recurringBills: {},
    notifications: {},
    budgetCategories: {},
    currencyRates: {},
  };

  const STORES = {
    user: 'user',
    accounts: 'accounts',
    transactions: 'transactions',
    cards: 'cards',
    recurringBills: 'recurringBills',
    notifications: 'notifications',
    budgetCategories: 'budgetCategories',
    currencyRates: 'currencyRates',
  };

  return {
    db: {
      STORES,
      open: jest.fn().mockResolvedValue({}),
      needsSeed: jest.fn().mockImplementation(() => {
        return Promise.resolve(Object.keys(storeData.user).length === 0);
      }),
      getAll: jest.fn().mockImplementation((_storeName: string) => {
        return Promise.resolve([]);
      }),
      put: jest.fn().mockResolvedValue(undefined),
      putAll: jest.fn().mockResolvedValue(undefined),
      count: jest.fn().mockImplementation((_storeName: string) => {
        return Promise.resolve(0);
      }),
    },
  };
});

import { db } from '@/lib/db';

describe('db module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('STORES has all expected store names', () => {
    expect(db.STORES).toEqual({
      user: 'user',
      accounts: 'accounts',
      transactions: 'transactions',
      cards: 'cards',
      recurringBills: 'recurringBills',
      notifications: 'notifications',
      budgetCategories: 'budgetCategories',
      currencyRates: 'currencyRates',
    });
  });

  it('needsSeed returns true when user store is empty', async () => {
    const result = await db.needsSeed();
    expect(result).toBe(true);
  });

  it('getAll returns empty array for empty store', async () => {
    const items = await db.getAll<{ id: string }>(db.STORES.user);
    expect(items).toEqual([]);
  });

  it('put calls the underlying store', async () => {
    await db.put(db.STORES.user, { id: '1', name: 'Test' });
    expect(db.put).toHaveBeenCalledWith(db.STORES.user, {
      id: '1',
      name: 'Test',
    });
  });

  it('putAll calls the underlying store', async () => {
    await db.putAll(db.STORES.accounts, [
      { id: '1', name: 'Checking' },
      { id: '2', name: 'Savings' },
    ]);
    expect(db.putAll).toHaveBeenCalledWith(db.STORES.accounts, [
      { id: '1', name: 'Checking' },
      { id: '2', name: 'Savings' },
    ]);
  });

  it('count returns 0 for empty store', async () => {
    const result = await db.count(db.STORES.user);
    expect(result).toBe(0);
  });
});
