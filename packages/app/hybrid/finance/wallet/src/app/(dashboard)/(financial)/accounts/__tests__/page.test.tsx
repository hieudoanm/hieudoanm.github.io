jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import AccountsOverviewPage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('AccountsOverviewPage', () => {
  it('renders total balance and account type sections', async () => {
    renderWithProviders(<AccountsOverviewPage />);
    await screen.findByText('Total Balance');
    expect(screen.getByText('Checking')).toBeInTheDocument();
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByText('Credit')).toBeInTheDocument();
  });

  it('shows per-section account counts', async () => {
    renderWithProviders(<AccountsOverviewPage />);
    await screen.findByText('Total Balance');
    expect(screen.getAllByText(/account/).length).toBeGreaterThan(0);
  });
});
