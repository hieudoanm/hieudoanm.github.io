import { render, screen } from '@testing-library/react';
import AccountDetail from '../AccountDetail';
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

describe('AccountDetail', () => {
  it('renders account name', () => {
    render(<AccountDetail account={mockAccount} />);
    expect(screen.getByText('Main Checking')).toBeInTheDocument();
  });

  it('renders account type', () => {
    render(<AccountDetail account={mockAccount} />);
    expect(screen.getByText('checking')).toBeInTheDocument();
  });

  it('renders formatted balance', () => {
    render(<AccountDetail account={mockAccount} />);
    expect(screen.getByText('$12,450.83')).toBeInTheDocument();
  });

  it('renders account number', () => {
    render(<AccountDetail account={mockAccount} />);
    expect(screen.getByText('•••• 4521')).toBeInTheDocument();
  });

  it('renders Send and Receive buttons', () => {
    render(<AccountDetail account={mockAccount} />);
    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.getByText('Receive')).toBeInTheDocument();
  });
});
