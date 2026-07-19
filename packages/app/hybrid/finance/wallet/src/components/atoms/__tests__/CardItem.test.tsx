import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardItem from '../CardItem';
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

describe('CardItem', () => {
  it('renders card name', () => {
    render(<CardItem card={mockCard} selected={false} onSelect={jest.fn()} />);
    expect(screen.getByText('Main Card')).toBeInTheDocument();
  });

  it('renders masked card number', () => {
    render(<CardItem card={mockCard} selected={false} onSelect={jest.fn()} />);
    expect(screen.getByText('•••• •••• •••• 1234')).toBeInTheDocument();
  });

  it('renders expiry date', () => {
    render(<CardItem card={mockCard} selected={false} onSelect={jest.fn()} />);
    expect(screen.getByText('12/28')).toBeInTheDocument();
  });

  it('renders Frozen badge when frozen', () => {
    const frozenCard = { ...mockCard, frozen: true };
    render(
      <CardItem card={frozenCard} selected={false} onSelect={jest.fn()} />
    );
    expect(screen.getByText('Frozen')).toBeInTheDocument();
  });

  it('does not render Frozen badge when not frozen', () => {
    render(<CardItem card={mockCard} selected={false} onSelect={jest.fn()} />);
    expect(screen.queryByText('Frozen')).not.toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const onSelect = jest.fn();
    render(<CardItem card={mockCard} selected={false} onSelect={onSelect} />);
    await userEvent.click(screen.getByText('Main Card'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('renders card type label', () => {
    render(<CardItem card={mockCard} selected={false} onSelect={jest.fn()} />);
    expect(screen.getByText('Visa')).toBeInTheDocument();
  });

  it('renders spending progress bar', () => {
    render(<CardItem card={mockCard} selected={false} onSelect={jest.fn()} />);
    expect(screen.getByText(/Spent/)).toBeInTheDocument();
  });
});
