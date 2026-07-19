jest.mock('@/lib/db', () => require('@/test-helpers').mockDbModule);
jest.mock(
  'next/navigation',
  () => require('@/test-helpers').mockNextNavigation
);
jest.mock('next/link', () => require('@/test-helpers').mockLinkModule);

import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/test-helpers';
import HomePage from '@/app/(dashboard)/page';
import AccountsOverviewPage from '@/app/(dashboard)/(financial)/accounts/page';
import CheckingAccountsPage from '@/app/(dashboard)/(financial)/accounts/checking/page';
import SavingsAccountsPage from '@/app/(dashboard)/(financial)/accounts/savings/page';
import CreditAccountsPage from '@/app/(dashboard)/(financial)/accounts/credit/page';

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

describe('SavingsAccountsPage', () => {
  it('renders savings accounts and opens add modal', async () => {
    renderWithProviders(<SavingsAccountsPage />);
    await screen.findByText('Savings Accounts');
    expect(screen.getByText('Savings')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add Savings Account'));
    expect(screen.getAllByText('Add Account').length).toBeGreaterThan(0);
  });
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
