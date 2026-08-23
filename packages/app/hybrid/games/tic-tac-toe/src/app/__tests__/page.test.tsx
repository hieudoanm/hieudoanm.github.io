import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Tic-Tac-Toe Variants')).toBeInTheDocument();
  });

  it('renders all six game cards', () => {
    render(<HomePage />);
    for (const name of [
      'Classic',
      'Duck',
      'Notakto',
      'Reverse',
      'T3',
      'Wild',
    ]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it('renders game descriptions', () => {
    render(<HomePage />);
    expect(screen.getByText(/X and O on a 3×3 grid/)).toBeInTheDocument();
    expect(screen.getByText(/Max three marks each/)).toBeInTheDocument();
  });

  it('renders links to game pages', () => {
    render(<HomePage />);
    expect(screen.getByTestId('open-classic').closest('a')).toHaveAttribute(
      'href',
      '/classic'
    );
    expect(screen.getByTestId('open-wild').closest('a')).toHaveAttribute(
      'href',
      '/wild'
    );
  });
});
