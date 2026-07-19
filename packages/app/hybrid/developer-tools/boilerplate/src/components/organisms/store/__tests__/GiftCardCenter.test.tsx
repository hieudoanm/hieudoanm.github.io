import { render, screen } from '@testing-library/react';
import { GiftCardCenter } from '../GiftCardCenter';

const cards = [
  { id: 'g1', recipient: 'Sam', amount: 50, status: 'Sent' as const },
  { id: 'g2', recipient: 'Jin', amount: 25, status: 'Claimed' as const },
];

describe('GiftCardCenter', () => {
  it('renders gift card recipients and amounts', () => {
    render(<GiftCardCenter cards={cards} />);
    expect(screen.getByText('Sam')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Jin')).toBeInTheDocument();
  });

  it('renders the status for each card', () => {
    render(<GiftCardCenter cards={cards} />);
    expect(screen.getByText('Sent')).toBeInTheDocument();
    expect(screen.getByText('Claimed')).toBeInTheDocument();
  });

  it('renders a new gift card action', () => {
    render(<GiftCardCenter cards={cards} />);
    expect(
      screen.getByRole('button', { name: '+ New gift card' })
    ).toBeInTheDocument();
  });
});
