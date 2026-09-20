jest.mock(
  '@/lib/wallet/db',
  () => require('@/test-helpers/wallet').mockDbModule
);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers/wallet').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers/wallet').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers/wallet';
import CheckingAccountsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('CheckingAccountsPage', () => {
  it('renders checking accounts and opens add modal', async () => {
    renderWithProviders(<CheckingAccountsPage />);
    await screen.findByText('Checking Accounts');
    expect(screen.getByText('Main Checking')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add Checking Account'));
    expect(screen.getAllByText('Add Account').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Add Account')).not.toBeInTheDocument();
  });

  it('adds a new account via the modal', async () => {
    renderWithProviders(<CheckingAccountsPage />);
    await screen.findByText('Checking Accounts');
    fireEvent.click(screen.getByText('Add Checking Account'));

    fireEvent.change(screen.getByLabelText('Account Name'), {
      target: { value: 'New Checking' },
    });
    fireEvent.change(screen.getByLabelText('Balance'), {
      target: { value: '500' },
    });
    fireEvent.change(screen.getByLabelText('Account Number'), {
      target: { value: '•••• 9999' },
    });
    fireEvent.click(screen.getByText('Add Account', { selector: 'button' }));

    await waitFor(() => {
      expect(screen.queryByText('Add Account')).not.toBeInTheDocument();
    });
  });
});
