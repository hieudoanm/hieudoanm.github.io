import { render, screen } from '@testing-library/react';
import { PayrollOverview } from '../PayrollOverview';

describe('PayrollOverview', () => {
  const payroll = [
    {
      id: '1',
      name: 'Ada Lovelace',
      period: 'July 2026',
      gross: 5000,
      deductions: 1000,
      net: 4000,
      status: 'paid' as const,
    },
    {
      id: '2',
      name: 'Grace Hopper',
      period: 'July 2026',
      gross: 4500,
      deductions: 500,
      net: 4000,
      status: 'pending' as const,
    },
  ];

  it('renders aggregated net total and pending count', () => {
    render(<PayrollOverview payroll={payroll} />);
    expect(screen.getByText('$8,000')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders formatted currency in the table', () => {
    render(<PayrollOverview payroll={payroll} />);
    expect(screen.getByText('$5,000')).toBeInTheDocument();
    expect(screen.getByText('-$1,000')).toBeInTheDocument();
  });

  it('applies status badge classes', () => {
    render(<PayrollOverview payroll={payroll} />);
    expect(screen.getByText('paid')).toHaveClass('badge-success');
    expect(screen.getByText('pending')).toHaveClass('badge-warning');
  });

  it('shows an empty state when payroll is empty', () => {
    render(<PayrollOverview payroll={[]} />);
    expect(screen.getByText('No payroll entries')).toBeInTheDocument();
  });
});
