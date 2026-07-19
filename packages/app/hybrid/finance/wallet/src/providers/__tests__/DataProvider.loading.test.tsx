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
    },
    needsSeed: jest.fn().mockResolvedValue(false),
    getAll: jest.fn().mockResolvedValue([]),
    put: jest.fn().mockResolvedValue(undefined),
    putAll: jest.fn().mockResolvedValue(undefined),
    count: jest.fn().mockResolvedValue(0),
  },
}));

import { render, screen } from '@testing-library/react';
import { DataProvider } from '../DataProvider';
import { useData } from '../DataProvider';

function LoadingTest() {
  const { loading } = useData();
  return <span data-testid="loading">{String(loading)}</span>;
}

function AccountsTest() {
  const { accounts } = useData();
  return <span data-testid="count">{String(accounts.length)}</span>;
}

describe('DataProvider — loading', () => {
  it('starts with loading true, ends with false', async () => {
    render(
      <DataProvider>
        <LoadingTest />
      </DataProvider>
    );
    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    await screen.findByText('false');
  });
});

describe('DataProvider — accounts', () => {
  it('provides seed accounts when DB is empty', async () => {
    render(
      <DataProvider>
        <AccountsTest />
      </DataProvider>
    );
    await screen.findByText('3');
  });
});
