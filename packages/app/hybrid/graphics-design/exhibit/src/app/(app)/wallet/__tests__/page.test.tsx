jest.mock(
  '@/lib/wallet/db',
  () => require('@/test-helpers/wallet').mockDbModule
);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers/wallet').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers/wallet').mockLinkModule);

import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers/wallet';
import HomePage from '../page';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('HomePage', () => {
  it('renders greeting, balance, accounts and recent transactions', async () => {
    renderWithProviders(<HomePage />);
    expect(await screen.findByText('Main Checking')).toBeInTheDocument();
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    expect(screen.getByText('Grocery Store')).toBeInTheDocument();
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument();
  });

  it('renders quick action links', async () => {
    renderWithProviders(<HomePage />);
    await screen.findByText('Main Checking');
    expect(screen.getAllByText('Transfer').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Budget').length).toBeGreaterThan(0);
    expect(screen.getByText('View all')).toBeInTheDocument();
  });
});
