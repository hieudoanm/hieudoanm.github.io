const mockDb = {
  STORES: {
    user: 'user',
    accounts: 'accounts',
    transactions: 'transactions',
    cards: 'cards',
    recurringBills: 'recurringBills',
    notifications: 'notifications',
    budgetCategories: 'budgetCategories',
    currencyRates: 'currencyRates',
    contacts: 'contacts',
    paymentRequests: 'paymentRequests',
    recurringTransfers: 'recurringTransfers',
    currencyAlerts: 'currencyAlerts',
    loans: 'loans',
    fixedDeposits: 'fixedDeposits',
    recurringDeposits: 'recurringDeposits',
    savingsGoals: 'savingsGoals',
    insurance: 'insurance',
    cardRewards: 'cardRewards',
  },
  needsSeed: jest.fn(),
  put: jest.fn(),
  putAll: jest.fn(),
};

jest.mock('@/lib/db', () => ({ db: mockDb }));

import { ensureSeeded } from '@/lib/seed';

describe('ensureSeeded', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDb.needsSeed.mockResolvedValue(true);
    mockDb.put.mockResolvedValue(undefined);
    mockDb.putAll.mockResolvedValue(undefined);
    jest.resetModules();
  });

  it('seeds all stores when the database needs seeding', async () => {
    const { ensureSeeded: freshEnsureSeeded } = await import('@/lib/seed');
    await freshEnsureSeeded();
    expect(mockDb.needsSeed).toHaveBeenCalled();
    expect(mockDb.put).toHaveBeenCalledWith(
      mockDb.STORES.user,
      expect.anything()
    );
    const seededStores = [
      mockDb.STORES.accounts,
      mockDb.STORES.transactions,
      mockDb.STORES.cards,
      mockDb.STORES.recurringBills,
      mockDb.STORES.notifications,
      mockDb.STORES.budgetCategories,
      mockDb.STORES.currencyRates,
      mockDb.STORES.contacts,
      mockDb.STORES.paymentRequests,
      mockDb.STORES.recurringTransfers,
      mockDb.STORES.currencyAlerts,
      mockDb.STORES.loans,
      mockDb.STORES.fixedDeposits,
      mockDb.STORES.recurringDeposits,
      mockDb.STORES.savingsGoals,
      mockDb.STORES.insurance,
      mockDb.STORES.cardRewards,
    ];
    seededStores.forEach((store) => {
      expect(mockDb.putAll).toHaveBeenCalledWith(store, expect.anything());
    });
  });

  it('skips seeding when the database already has data', async () => {
    mockDb.needsSeed.mockResolvedValue(false);
    const { ensureSeeded: freshEnsureSeeded } = await import('@/lib/seed');
    await freshEnsureSeeded();
    expect(mockDb.put).not.toHaveBeenCalled();
    expect(mockDb.putAll).not.toHaveBeenCalled();
  });

  it('memoizes the seed promise across calls', async () => {
    const { ensureSeeded: freshEnsureSeeded } = await import('@/lib/seed');
    await freshEnsureSeeded();
    await freshEnsureSeeded();
    expect(mockDb.needsSeed).toHaveBeenCalledTimes(1);
  });

  it('propagates errors from needsSeed and resets the memo', async () => {
    mockDb.needsSeed.mockRejectedValue(new Error('db down'));
    const { ensureSeeded: freshEnsureSeeded } = await import('@/lib/seed');
    await expect(freshEnsureSeeded()).rejects.toThrow('db down');
    await expect(freshEnsureSeeded()).rejects.toThrow('db down');
    expect(mockDb.needsSeed).toHaveBeenCalledTimes(2);
  });

  it('survives partial store seeding failures', async () => {
    mockDb.putAll.mockImplementation((store: string) =>
      store === mockDb.STORES.accounts
        ? Promise.reject(new Error('store failed'))
        : Promise.resolve(undefined)
    );
    const { ensureSeeded: freshEnsureSeeded } = await import('@/lib/seed');
    await expect(freshEnsureSeeded()).resolves.toBeUndefined();
  });
});
