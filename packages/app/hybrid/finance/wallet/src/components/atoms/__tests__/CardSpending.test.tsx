import { render, screen } from '@testing-library/react';
import CardSpending from '../CardSpending';
import type { Card } from '@/types';

const mockCard: Card = {
  id: '1',
  name: 'Main Card',
  number: '4532 1234 5678 1234',
  expiry: '12/28',
  type: 'visa',
  color: 'primary',
  frozen: false,
  cardholderName: 'Alex Johnson',
  spendingLimit: 5000,
  spentThisMonth: 2340.5,
  currency: 'USD',
};

describe('CardSpending', () => {
  it('renders spending limit heading', () => {
    render(<CardSpending card={mockCard} />);
    expect(screen.getByText('Spending Limit')).toBeInTheDocument();
  });

  it('renders spent amount', () => {
    render(<CardSpending card={mockCard} />);
    expect(screen.getByText('$2,340.50')).toBeInTheDocument();
  });

  it('renders spending limit', () => {
    render(<CardSpending card={mockCard} />);
    expect(screen.getByText(/of \$5,000.00/)).toBeInTheDocument();
  });

  it('renders percentage used', () => {
    render(<CardSpending card={mockCard} />);
    expect(screen.getByText('47% used')).toBeInTheDocument();
  });

  it('renders remaining amount', () => {
    render(<CardSpending card={mockCard} />);
    expect(screen.getByText('$2,659.50 remaining')).toBeInTheDocument();
  });

  it('shows warning when spending >= 80%', () => {
    const highCard = { ...mockCard, spentThisMonth: 4200 };
    render(<CardSpending card={highCard} />);
    expect(
      screen.getByText(/You have used 84% of your spending limit/)
    ).toBeInTheDocument();
  });
});
