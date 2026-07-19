import { fireEvent, render, screen } from '@testing-library/react';
import { AccountsTemplate } from '../AccountsTemplate';

describe('AccountsTemplate', () => {
  it('renders accounts with type badges and masked balances', () => {
    render(<AccountsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Accounts' })
    ).toBeInTheDocument();
    expect(screen.getByText('Business Checking')).toBeInTheDocument();
    expect(screen.getByText('****4832')).toBeInTheDocument();
    expect(screen.getAllByText('Checking')).toHaveLength(2);
    expect(screen.getAllByText('Savings')).toHaveLength(1);
    expect(screen.getAllByText('Credit')).toHaveLength(1);
    expect(screen.getAllByText('••••')).toHaveLength(4);
    expect(
      screen.getByRole('button', { name: 'Show balances' })
    ).toBeInTheDocument();
  });

  it('toggles between masked and shown balances', () => {
    render(<AccountsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Show balances' }));
    expect(screen.queryByText('••••')).not.toBeInTheDocument();
    expect(screen.getAllByText(/\$\d/)).toHaveLength(4);
    expect(screen.getByText('$120,000')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide balances' }));
    expect(screen.getAllByText('••••')).toHaveLength(4);
  });

  it('cycles the toggle button label', () => {
    render(<AccountsTemplate />);
    expect(
      screen.getByRole('button', { name: 'Show balances' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show balances' }));
    expect(
      screen.getByRole('button', { name: 'Hide balances' })
    ).toBeInTheDocument();
  });
});
