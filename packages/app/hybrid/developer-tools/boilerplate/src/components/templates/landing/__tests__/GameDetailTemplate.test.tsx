import { fireEvent, render, screen } from '@testing-library/react';
import { GameDetailTemplate } from '../GameDetailTemplate';

describe('GameDetailTemplate', () => {
  it('renders the game details with genres and rating', () => {
    render(<GameDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Game' })).toBeInTheDocument();
    expect(screen.getByText('Game details.')).toBeInTheDocument();
    expect(screen.getByText('Stellar Vanguard')).toBeInTheDocument();
    expect(screen.getByText('Aurora Interactive')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('Multiplayer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Wishlist' })
    ).toBeInTheDocument();
  });

  it('toggles play to paused', () => {
    render(<GameDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Paused' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Paused' }));
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('toggles wishlist to wishlisted with a badge', () => {
    render(<GameDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Wishlist' }));
    expect(
      screen.getByRole('button', { name: 'Wishlisted' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Wishlisted')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Wishlisted' }));
    expect(
      screen.getByRole('button', { name: 'Wishlist' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Wishlisted')).not.toBeInTheDocument();
  });
});
