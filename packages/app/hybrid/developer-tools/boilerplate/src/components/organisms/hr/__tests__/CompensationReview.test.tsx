import { render, screen } from '@testing-library/react';
import { CompensationReview } from '../CompensationReview';

describe('CompensationReview', () => {
  const records = [
    {
      id: '1',
      name: 'Ada Lovelace',
      role: 'Engineer',
      base: 120000,
      bonus: 10000,
      change: 5,
      status: 'approved' as const,
    },
    {
      id: '2',
      name: 'Grace Hopper',
      role: 'Analyst',
      base: 90000,
      bonus: 0,
      change: -3,
      status: 'pending' as const,
    },
  ];

  it('renders formatted compensation figures', () => {
    render(<CompensationReview records={records} />);
    expect(screen.getByText('$120,000')).toBeInTheDocument();
    expect(screen.getByText('$130,000')).toBeInTheDocument();
  });

  it('renders change percentages with sign', () => {
    render(<CompensationReview records={records} />);
    expect(screen.getByText('+5%')).toBeInTheDocument();
    expect(screen.getByText('-3%')).toBeInTheDocument();
  });

  it('applies status badge classes', () => {
    render(<CompensationReview records={records} />);
    expect(screen.getByText('approved')).toHaveClass('badge-success');
    expect(screen.getByText('pending')).toHaveClass('badge-warning');
  });

  it('shows an empty state when no records exist', () => {
    render(<CompensationReview records={[]} />);
    expect(screen.getByText('No compensation records')).toBeInTheDocument();
  });
});
