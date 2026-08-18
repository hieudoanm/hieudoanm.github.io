jest.mock('@/lib/db', () => ({
  db: {
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
    needsSeed: jest.fn().mockResolvedValue(false),
    getAll: jest.fn().mockResolvedValue([]),
    put: jest.fn().mockResolvedValue(undefined),
    putAll: jest.fn().mockResolvedValue(undefined),
    count: jest.fn().mockResolvedValue(0),
  },
}));

import { renderHook, act, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { DataProvider, useData } from '../DataProvider';
import { db } from '@/lib/db';
import {
  user as seedUser,
  accounts as seedAccounts,
  cards as seedCards,
  recurringBills as seedRecurringBills,
  notifications as seedNotifications,
  budgetCategories as seedBudgetCategories,
  contacts as seedContacts,
  paymentRequests as seedPaymentRequests,
  recurringTransfers as seedRecurringTransfers,
  currencyAlerts as seedCurrencyAlerts,
  loans as seedLoans,
  fixedDeposits as seedFDs,
  recurringDeposits as seedRDs,
  savingsGoals as seedGoals,
  insurance as seedInsurance,
  cardRewards as seedRewards,
} from '@/data/mock';
import type { Account, Transaction } from '@/types';

const wrapper = ({ children }: { children: ReactNode }) => (
  <DataProvider>{children}</DataProvider>
);

const waitReady = async (result: { current: ReturnType<typeof useData> }) => {
  await waitFor(() => expect(result.current.loading).toBe(false));
};

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('useData', () => {
  it('throws when used outside DataProvider', () => {
    expect(() => renderHook(() => useData())).toThrow(
      'useData must be used within DataProvider'
    );
  });

  it('starts loading and exposes seeded entities once ready', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    expect(result.current.loading).toBe(true);
    await waitReady(result);

    expect(result.current.user?.name).toBe('Alex Johnson');
    expect(result.current.accounts).toHaveLength(seedAccounts.length);
    expect(result.current.cards).toHaveLength(seedCards.length);
    expect(result.current.recurringBills).toHaveLength(
      seedRecurringBills.length
    );
    expect(result.current.notifications).toHaveLength(seedNotifications.length);
    expect(result.current.budgetCategories).toHaveLength(
      seedBudgetCategories.length
    );
    expect(result.current.contacts).toHaveLength(seedContacts.length);
    expect(result.current.paymentRequests).toHaveLength(
      seedPaymentRequests.length
    );
    expect(result.current.recurringTransfers).toHaveLength(
      seedRecurringTransfers.length
    );
    expect(result.current.currencyAlerts).toHaveLength(
      seedCurrencyAlerts.length
    );
    expect(result.current.loans).toHaveLength(seedLoans.length);
    expect(result.current.fixedDeposits).toHaveLength(seedFDs.length);
    expect(result.current.recurringDeposits).toHaveLength(seedRDs.length);
    expect(result.current.savingsGoals).toHaveLength(seedGoals.length);
    expect(result.current.insurance).toHaveLength(seedInsurance.length);
    expect(result.current.cardRewards).toHaveLength(seedRewards.length);
  });

  it('loads persisted items from the database when present', async () => {
    (db.getAll as jest.Mock).mockImplementation((store: string) =>
      Promise.resolve(
        store === 'user' ? [{ ...seedUser, name: 'Persisted' }] : []
      )
    );
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    expect(result.current.user?.name).toBe('Persisted');
  });
});

describe('authentication', () => {
  it('rejects login with empty email', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await expect(result.current.login('', 'pw')).resolves.toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('wallet-auth')).toBeNull();
  });

  it('logs in with a non-empty email', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    let ok = false;
    await act(async () => {
      ok = await result.current.login('a@b.com', 'pw');
    });
    expect(ok).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem('wallet-auth')).toBe('true');
  });

  it('logs out and clears the session', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await act(async () => {
      await result.current.login('a@b.com', 'pw');
    });
    expect(result.current.isAuthenticated).toBe(true);
    act(() => result.current.logout());
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('wallet-auth')).toBeNull();
  });

  it('restores the session from localStorage', async () => {
    localStorage.setItem('wallet-auth', 'true');
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('rejects forgotPassword with empty email', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await expect(result.current.forgotPassword('')).resolves.toBe(false);
  });

  it('accepts forgotPassword with an email', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await expect(result.current.forgotPassword('a@b.com')).resolves.toBe(true);
  });

  it('rejects resetPassword with empty token', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await expect(result.current.resetPassword('', 'x')).resolves.toBe(false);
  });

  it('accepts resetPassword with a token', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await expect(result.current.resetPassword('tok', 'x')).resolves.toBe(true);
  });
});

describe('user & accounts', () => {
  it('updates the user and persists', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await act(async () => {
      await result.current.updateUser({ ...seedUser, name: 'Zed' });
    });
    expect(result.current.user?.name).toBe('Zed');
    expect(db.put).toHaveBeenCalledWith('user', { ...seedUser, name: 'Zed' });
  });

  it('adds an account', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await act(async () => {
      await result.current.addAccount({ id: 'acc-new' } as Account);
    });
    expect(result.current.accounts).toHaveLength(seedAccounts.length + 1);
  });

  it('updates an account', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedAccounts[0];
    await act(async () => {
      await result.current.updateAccount({ ...target, balance: 987 });
    });
    expect(
      result.current.accounts.find((a) => a.id === target.id)?.balance
    ).toBe(987);
  });
});

describe('transactions & cards & bills', () => {
  it('adds a transaction', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await act(async () => {
      await result.current.addTransaction({ id: 'tx-new' } as Transaction);
    });
    expect(result.current.transactions[0].id).toBe('tx-new');
  });

  it('updates a card', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedCards[0];
    await act(async () => {
      await result.current.updateCard({ ...target, spendingLimit: 555 });
    });
    expect(
      result.current.cards.find((c) => c.id === target.id)?.spendingLimit
    ).toBe(555);
  });

  it('adds and updates a recurring bill', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedRecurringBills[0];
    await act(async () => {
      await result.current.addRecurringBill({
        ...seedRecurringBills[0],
        id: 'bill-new',
      });
    });
    expect(result.current.recurringBills).toHaveLength(
      seedRecurringBills.length + 1
    );
    await act(async () => {
      await result.current.updateRecurringBill({ ...target, paid: true });
    });
    expect(
      result.current.recurringBills.find((b) => b.id === target.id)?.paid
    ).toBe(true);
  });
});

describe('notifications & budget', () => {
  it('marks a notification as read', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target =
      seedNotifications.find((n) => !n.read) ?? seedNotifications[0];
    await act(async () => {
      await result.current.markNotificationRead(target.id);
    });
    expect(
      result.current.notifications.find((n) => n.id === target.id)?.read
    ).toBe(true);
  });

  it('does not persist when marking a missing notification', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    await act(async () => {
      await result.current.markNotificationRead('nope');
    });
    expect(result.current.notifications).toHaveLength(seedNotifications.length);
    expect(db.put).not.toHaveBeenCalled();
  });

  it('updates a budget category', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedBudgetCategories[0];
    await act(async () => {
      await result.current.updateBudgetCategory({ ...target, limit: 123 });
    });
    expect(
      result.current.budgetCategories.find((c) => c.id === target.id)?.limit
    ).toBe(123);
  });
});

describe('contacts & payment requests', () => {
  it('adds and updates a contact', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedContacts[0];
    await act(async () => {
      await result.current.addContact({
        ...seedContacts[0],
        id: 'contact-new',
      });
    });
    expect(result.current.contacts).toHaveLength(seedContacts.length + 1);
    await act(async () => {
      await result.current.updateContact({ ...target, email: 'new@x.com' });
    });
    expect(result.current.contacts.find((c) => c.id === target.id)?.email).toBe(
      'new@x.com'
    );
  });

  it('adds and updates a payment request', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedPaymentRequests[0];
    await act(async () => {
      await result.current.addPaymentRequest({
        ...seedPaymentRequests[0],
        id: 'pr-new',
      });
    });
    expect(result.current.paymentRequests).toHaveLength(
      seedPaymentRequests.length + 1
    );
    await act(async () => {
      await result.current.updatePaymentRequest({
        ...target,
        status: 'completed',
      });
    });
    expect(
      result.current.paymentRequests.find((r) => r.id === target.id)?.status
    ).toBe('completed');
  });

  it('adds and updates a recurring transfer', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedRecurringTransfers[0];
    await act(async () => {
      await result.current.addRecurringTransfer({
        ...seedRecurringTransfers[0],
        id: 'rt-new',
      });
    });
    expect(result.current.recurringTransfers).toHaveLength(
      seedRecurringTransfers.length + 1
    );
    await act(async () => {
      await result.current.updateRecurringTransfer({
        ...target,
        active: false,
      });
    });
    expect(
      result.current.recurringTransfers.find((t) => t.id === target.id)?.active
    ).toBe(false);
  });
});

describe('currency alerts', () => {
  it('adds, updates, and deletes an alert', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedCurrencyAlerts[0];
    await act(async () => {
      await result.current.addCurrencyAlert({
        ...seedCurrencyAlerts[0],
        id: 'alert-new',
      });
    });
    expect(result.current.currencyAlerts).toHaveLength(
      seedCurrencyAlerts.length + 1
    );
    await act(async () => {
      await result.current.updateCurrencyAlert({
        ...target,
        targetRate: 42,
      });
    });
    expect(
      result.current.currencyAlerts.find((a) => a.id === target.id)?.targetRate
    ).toBe(42);
    await act(async () => {
      await result.current.deleteCurrencyAlert(target.id);
    });
    expect(
      result.current.currencyAlerts.find((a) => a.id === target.id)
    ).toBeUndefined();
  });
});

describe('bank products & rewards', () => {
  it('updates a loan', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedLoans[0];
    await act(async () => {
      await result.current.updateLoan({ ...target, outstanding: 1 });
    });
    expect(
      result.current.loans.find((l) => l.id === target.id)?.outstanding
    ).toBe(1);
  });

  it('updates a fixed deposit', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedFDs[0];
    await act(async () => {
      await result.current.updateFixedDeposit({ ...target, depositAmount: 2 });
    });
    expect(
      result.current.fixedDeposits.find((f) => f.id === target.id)
        ?.depositAmount
    ).toBe(2);
  });

  it('updates a recurring deposit', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedRDs[0];
    await act(async () => {
      await result.current.updateRecurringDeposit({
        ...target,
        monthlyAmount: 3,
      });
    });
    expect(
      result.current.recurringDeposits.find((r) => r.id === target.id)
        ?.monthlyAmount
    ).toBe(3);
  });

  it('updates a savings goal', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedGoals[0];
    await act(async () => {
      await result.current.updateSavingsGoal({ ...target, targetAmount: 4 });
    });
    expect(
      result.current.savingsGoals.find((g) => g.id === target.id)?.targetAmount
    ).toBe(4);
  });

  it('updates insurance', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedInsurance[0];
    await act(async () => {
      await result.current.updateInsurance({ ...target, coverageAmount: 5 });
    });
    expect(
      result.current.insurance.find((i) => i.id === target.id)?.coverageAmount
    ).toBe(5);
  });

  it('updates a card reward', async () => {
    const { result } = renderHook(() => useData(), { wrapper });
    await waitReady(result);
    const target = seedRewards[0];
    await act(async () => {
      await result.current.updateCardReward({ ...target, points: 6 });
    });
    expect(
      result.current.cardRewards.find((r) => r.id === target.id)?.points
    ).toBe(6);
  });
});
