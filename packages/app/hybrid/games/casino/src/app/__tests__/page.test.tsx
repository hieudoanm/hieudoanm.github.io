import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Casino Games')).toBeInTheDocument();
  });

  it('renders all ten game cards', () => {
    render(<HomePage />);
    for (const name of [
      'Baccarat',
      'Card Counter',
      'Poker Odds',
      'Over Under Seven',
      'Slot Machine',
      'Roulette',
      'Craps',
      'War',
      'Keno',
      'Hi-Lo',
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it('renders game descriptions', () => {
    render(<HomePage />);
    expect(screen.getByText(/Bet player, banker or tie/)).toBeInTheDocument();
    expect(screen.getByText(/Higher card takes the stake/)).toBeInTheDocument();
  });

  it('renders links to game pages', () => {
    render(<HomePage />);
    expect(screen.getByTestId('open-baccarat').closest('a')).toHaveAttribute(
      'href',
      '/baccarat'
    );
    expect(screen.getByTestId('open-hi-lo').closest('a')).toHaveAttribute(
      'href',
      '/hi-lo'
    );
  });
});
