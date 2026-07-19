jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
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
