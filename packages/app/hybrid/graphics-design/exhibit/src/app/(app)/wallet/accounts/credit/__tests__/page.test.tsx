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
import CreditAccountsPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('CreditAccountsPage', () => {
  it('renders credit accounts and opens add modal', async () => {
    renderWithProviders(<CreditAccountsPage />);
    await screen.findByText('Credit Cards');
    expect(screen.getByText('Credit Card')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add Credit Card'));
    expect(screen.getAllByText('Add Account').length).toBeGreaterThan(0);
  });
});
