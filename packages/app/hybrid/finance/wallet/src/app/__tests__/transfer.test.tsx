import { render, screen } from '@testing-library/react';
import { DataProvider, useData } from '@/providers/DataProvider';
import { ToastProvider } from '@/providers/ToastProvider';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: jest.fn(), push: jest.fn() }),
  usePathname: () => '/transfer',
}));

function TransferHarness() {
  const { accounts } = useData();

  return (
    <div>
      <span data-testid="accounts-available">{accounts.length}</span>
      {accounts.map((acc) => (
        <span key={acc.id} data-testid={`acc-${acc.id}`}>
          {acc.name}
        </span>
      ))}
    </div>
  );
}

describe('Transfer page data integration', () => {
  beforeEach(() => localStorage.clear());

  it('loads accounts for transfer selection', () => {
    render(
      <DataProvider>
        <ToastProvider>
          <TransferHarness />
        </ToastProvider>
      </DataProvider>
    );
    expect(
      Number(screen.getByTestId('accounts-available').textContent)
    ).toBeGreaterThan(0);
  });

  it('displays account names for source/destination selection', () => {
    render(
      <DataProvider>
        <ToastProvider>
          <TransferHarness />
        </ToastProvider>
      </DataProvider>
    );
    expect(screen.getByText('Main Checking')).toBeInTheDocument();
    expect(screen.getByText('Savings')).toBeInTheDocument();
  });
});
