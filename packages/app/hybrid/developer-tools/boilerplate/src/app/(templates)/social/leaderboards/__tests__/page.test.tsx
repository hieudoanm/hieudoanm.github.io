import { render, screen } from '@testing-library/react';
import LeaderboardsPage from '@/app/(templates)/social/leaderboards/page';

describe('LeaderboardsPage', () => {
  it('renders the leaderboards page', () => {
    render(<LeaderboardsPage />);
    expect(
      screen.getByRole('heading', { name: 'Leaderboards' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 players')).toBeInTheDocument();
  });
});
