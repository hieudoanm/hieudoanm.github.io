jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
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
