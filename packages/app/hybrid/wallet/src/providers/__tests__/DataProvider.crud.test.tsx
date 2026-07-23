import { render, screen, act } from '@testing-library/react';
import { DataProvider, useData } from '../DataProvider';
import type { RecurringBill, Account, Card } from '@/types';

function TestCrud({
  onReady,
}: {
  onReady: (api: ReturnType<typeof useData>) => void;
}) {
  const api = useData();
  onReady(api);

  return (
    <div>
      <span data-testid="accounts-count">{api.accounts.length}</span>
      <span data-testid="bills-count">{api.recurringBills.length}</span>
      <span data-testid="cards-count">{api.cards.length}</span>
    </div>
  );
}

describe('DataProvider CRUD operations', () => {
  let apiRef: ReturnType<typeof useData>;

  beforeEach(() => {
    localStorage.clear();
    apiRef = null!;
  });

  const renderCrud = () =>
    render(
      <DataProvider>
        <TestCrud
          onReady={(api) => {
            apiRef = api;
          }}
        />
      </DataProvider>
    );

  it('updateAccount updates matching account', async () => {
    renderCrud();
    const acc = apiRef.accounts[0];
    await act(async () => {
      await apiRef.updateAccount({ ...acc, balance: 9999 });
    });
    expect(apiRef.accounts.find((a) => a.id === acc.id)?.balance).toBe(9999);
  });

  it('addAccount appends a new account', async () => {
    renderCrud();
    const newAcc: Account = {
      id: 'new-acc',
      name: 'Test Account',
      type: 'savings',
      balance: 500,
      currency: 'USD',
      accountNumber: '123456',
      color: '#10B981',
    };
    await act(async () => {
      await apiRef.addAccount(newAcc);
    });
    expect(apiRef.accounts.some((a) => a.id === 'new-acc')).toBe(true);
  });

  it('addTransaction prepends a new transaction', async () => {
    renderCrud();
    const prevCount = apiRef.transactions.length;
    await act(async () => {
      await apiRef.addTransaction({
        id: 'new-tx',
        accountId: apiRef.accounts[0].id,
        type: 'expense',
        amount: 42,
        description: 'Test',
        category: 'Food',
        date: '2026-01-01',
        status: 'completed',
      });
    });
    expect(apiRef.transactions.length).toBe(prevCount + 1);
    expect(apiRef.transactions[0].id).toBe('new-tx');
  });

  it('updateCard updates matching card', async () => {
    renderCrud();
    const card = apiRef.cards[0];
    await act(async () => {
      await apiRef.updateCard({ ...card, frozen: true });
    });
    expect(apiRef.cards.find((c) => c.id === card.id)?.frozen).toBe(true);
  });

  it('addRecurringBill appends a new bill', async () => {
    renderCrud();
    const prevCount = apiRef.recurringBills.length;
    const newBill: RecurringBill = {
      id: 'new-bill',
      name: 'Netflix',
      amount: 15,
      currency: 'USD',
      frequency: 'monthly',
      nextDue: '2026-02-01',
      paid: false,
    };
    await act(async () => {
      await apiRef.addRecurringBill(newBill);
    });
    expect(apiRef.recurringBills.length).toBe(prevCount + 1);
    expect(apiRef.recurringBills.some((b) => b.id === 'new-bill')).toBe(true);
  });

  it('updateRecurringBill updates matching bill', async () => {
    renderCrud();
    const bill = apiRef.recurringBills[0];
    await act(async () => {
      await apiRef.updateRecurringBill({ ...bill, paid: true });
    });
    expect(apiRef.recurringBills.find((b) => b.id === bill.id)?.paid).toBe(
      true
    );
  });

  it('markNotificationRead marks notification as read', async () => {
    renderCrud();
    const unread = apiRef.notifications.find((n) => !n.read);
    if (!unread) return;

    await act(async () => {
      await apiRef.markNotificationRead(unread.id);
    });
    expect(apiRef.notifications.find((n) => n.id === unread.id)?.read).toBe(
      true
    );
  });

  it('updateBudgetCategory updates matching category', async () => {
    renderCrud();
    const cat = apiRef.budgetCategories[0];
    await act(async () => {
      await apiRef.updateBudgetCategory({ ...cat, spent: 500 });
    });
    expect(apiRef.budgetCategories.find((c) => c.id === cat.id)?.spent).toBe(
      500
    );
  });
});
