import { render, screen } from '@testing-library/react';
import { AccountSummary } from '../AccountSummary';

const accounts = [
  { name: 'Checking', type: 'Everyday', number: '****4821', balance: 1200 },
  { name: 'Savings', type: 'High yield', number: '****9032', balance: 5400 },
];

describe('AccountSummary', () => {
  it('renders account details', () => {
    render(<AccountSummary accounts={accounts} />);
    expect(screen.getByText('Checking')).toBeInTheDocument();
    expect(screen.getByText('Everyday · ****4821')).toBeInTheDocument();
    expect(screen.getByText('$5,400')).toBeInTheDocument();
  });

  it('shows summed total', () => {
    render(<AccountSummary accounts={accounts} />);
    expect(screen.getByTestId('accounts-total')).toHaveTextContent('$6,600');
  });

  it('hides total when showTotal is false', () => {
    render(<AccountSummary accounts={accounts} showTotal={false} />);
    expect(screen.queryByTestId('accounts-total')).not.toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<AccountSummary accounts={[]} />);
    expect(screen.getByText('No accounts')).toBeInTheDocument();
  });
});
