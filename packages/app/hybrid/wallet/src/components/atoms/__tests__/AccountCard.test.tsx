import { render, screen } from '@testing-library/react';
import AccountCard from '../AccountCard';
import type { Account } from '@/types';

const mockAccount: Account = {
  id: '1',
  name: 'Main Checking',
  type: 'checking',
  balance: 12450.83,
  currency: 'USD',
  accountNumber: '•••• 4521',
  color: 'primary',
};

describe('AccountCard', () => {
  it('renders account name', () => {
    render(<AccountCard account={mockAccount} />);
    expect(screen.getByText('Main Checking')).toBeInTheDocument();
  });

  it('renders formatted balance', () => {
    render(<AccountCard account={mockAccount} />);
    expect(screen.getByText('$12,450.83')).toBeInTheDocument();
  });

  it('renders account number', () => {
    render(<AccountCard account={mockAccount} />);
    expect(screen.getByText('•••• 4521')).toBeInTheDocument();
  });
});
