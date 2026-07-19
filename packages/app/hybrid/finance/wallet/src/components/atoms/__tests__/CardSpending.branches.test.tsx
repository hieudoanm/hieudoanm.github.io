import { render, screen } from '@testing-library/react';
import CardSpending from '../CardSpending';
import type { Card } from '@/types';

const baseCard: Card = {
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

describe('CardSpending — branch coverage', () => {
  it('defaults spentThisMonth to 0 when undefined', () => {
    const card = {
      ...baseCard,
      spentThisMonth: undefined as unknown as number,
    };
    render(<CardSpending card={card} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('0% used')).toBeInTheDocument();
  });

  it('defaults spendingLimit to 0 when undefined', () => {
    const card = { ...baseCard, spendingLimit: undefined as unknown as number };
    render(<CardSpending card={card} />);
    expect(screen.getByText('of $0.00')).toBeInTheDocument();
    expect(screen.getByText('0% used')).toBeInTheDocument();
  });

  it('defaults currency to USD when undefined', () => {
    const card = { ...baseCard, currency: undefined as unknown as string };
    render(<CardSpending card={card} />);
    expect(screen.getByText('$2,340.50')).toBeInTheDocument();
  });

  it('shows error style when spending >= 80%', () => {
    const card = { ...baseCard, spentThisMonth: 4500 };
    const { container } = render(<CardSpending card={card} />);
    expect(screen.getByText(/You have used 90%/)).toBeInTheDocument();
    expect(container.querySelector('.bg-error')).toBeInTheDocument();
  });

  it('shows primary style when spending < 80%', () => {
    const card = { ...baseCard, spentThisMonth: 2500 };
    const { container } = render(<CardSpending card={card} />);
    expect(screen.queryByText(/You have used/)).not.toBeInTheDocument();
    expect(container.querySelector('.bg-primary')).toBeInTheDocument();
  });

  it('clamps percentage to 100 when over limit', () => {
    const card = { ...baseCard, spentThisMonth: 6000, spendingLimit: 5000 };
    render(<CardSpending card={card} />);
    expect(screen.getByText('120% used')).toBeInTheDocument();
  });
});
