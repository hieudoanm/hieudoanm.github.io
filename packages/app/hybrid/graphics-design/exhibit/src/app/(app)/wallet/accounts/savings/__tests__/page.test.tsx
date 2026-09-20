jest.mock(
  '@/lib/wallet/db',
  () => require('@/test-helpers/wallet').mockDbModule
);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers/wallet').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers/wallet').mockLinkModule);

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers/wallet';
import SavingsAccountsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('SavingsAccountsPage', () => {
  it('renders savings accounts and opens add modal', async () => {
    renderWithProviders(<SavingsAccountsPage />);
    await screen.findByText('Savings Accounts');
    expect(screen.getByText('Savings')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add Savings Account'));
    expect(screen.getAllByText('Add Account').length).toBeGreaterThan(0);
  });
});
