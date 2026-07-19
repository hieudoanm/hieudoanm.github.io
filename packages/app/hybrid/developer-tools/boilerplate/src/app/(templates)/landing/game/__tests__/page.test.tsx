import { render, screen } from '@testing-library/react';
import GamePage from '@/app/(templates)/landing/game/page';

describe('GamePage', () => {
  it('renders the game detail page', () => {
    render(<GamePage />);
    expect(screen.getByRole('heading', { name: 'Game' })).toBeInTheDocument();
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
  });
});
