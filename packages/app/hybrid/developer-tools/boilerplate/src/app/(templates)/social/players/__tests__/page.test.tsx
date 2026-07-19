import { render, screen } from '@testing-library/react';
import PlayersPage from '@/app/(templates)/social/players/page';

describe('PlayersPage', () => {
  it('renders the players page', () => {
    render(<PlayersPage />);
    expect(
      screen.getByRole('heading', { name: 'Players' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 players')).toBeInTheDocument();
  });
});
