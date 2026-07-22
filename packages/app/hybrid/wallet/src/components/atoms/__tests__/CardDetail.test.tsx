import { render, screen } from '@testing-library/react';
import CardDetail from '../CardDetail';
import type { Card } from '@/types';

const mockCard: Card = {
  id: '1',
  name: 'Main Card',
  number: '4532 1234 5678 1234',
  expiry: '12/28',
  type: 'visa',
  color: 'primary',
  frozen: false,
};

describe('CardDetail', () => {
  it('renders card name', () => {
    render(<CardDetail card={mockCard} />);
    expect(screen.getByText('Main Card')).toBeInTheDocument();
  });

  it('renders masked card number', () => {
    render(<CardDetail card={mockCard} />);
    expect(screen.getByText('•••• •••• •••• 1234')).toBeInTheDocument();
  });

  it('renders card type', () => {
    render(<CardDetail card={mockCard} />);
    expect(screen.getByText('visa')).toBeInTheDocument();
  });

  it('renders expiry date', () => {
    render(<CardDetail card={mockCard} />);
    expect(screen.getByText('12/28')).toBeInTheDocument();
  });

  it('shows Active status when not frozen', () => {
    render(<CardDetail card={mockCard} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows Frozen status when frozen', () => {
    const frozenCard = { ...mockCard, frozen: true };
    render(<CardDetail card={frozenCard} />);
    expect(screen.getByText('Frozen')).toBeInTheDocument();
  });

  it('shows Freeze button when not frozen', () => {
    render(<CardDetail card={mockCard} />);
    expect(screen.getByText('Freeze')).toBeInTheDocument();
  });

  it('shows Unfreeze button when frozen', () => {
    const frozenCard = { ...mockCard, frozen: true };
    render(<CardDetail card={frozenCard} />);
    expect(screen.getByText('Unfreeze')).toBeInTheDocument();
  });
});
