import { render, screen, fireEvent } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

function DashboardHarness() {
  const { user, accounts, transactions, loading } = useData();

  if (loading) return <div data-testid="loading">Loading...</div>;

  return (
    <div>
      <span data-testid="user-name">{user?.name}</span>
      <span data-testid="accounts">{accounts.length}</span>
      <span data-testid="transactions">{transactions.length}</span>
    </div>
  );
}

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <DataProvider>
      <ToastProvider>{ui}</ToastProvider>
    </DataProvider>
  );
}

describe('Dashboard page integration', () => {
  beforeEach(() => localStorage.clear());

  it('renders user data', async () => {
    renderWithProviders(<DashboardHarness />);
    expect(await screen.findByTestId('user-name')).toHaveTextContent(
      'Alex Johnson'
    );
  });

  it('displays account and transaction counts', async () => {
    renderWithProviders(<DashboardHarness />);
    await screen.findByTestId('user-name');
    expect(Number(screen.getByTestId('accounts').textContent)).toBeGreaterThan(
      0
    );
    expect(
      Number(screen.getByTestId('transactions').textContent)
    ).toBeGreaterThan(0);
  });
});
