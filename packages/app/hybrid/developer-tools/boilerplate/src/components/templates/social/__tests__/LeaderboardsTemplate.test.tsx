import { fireEvent, render, screen, within } from '@testing-library/react';
import { LeaderboardsTemplate } from '../LeaderboardsTemplate';

describe('LeaderboardsTemplate', () => {
  it('renders the global leaderboard with ranked players', () => {
    render(<LeaderboardsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Leaderboards' })
    ).toBeInTheDocument();
    expect(screen.getByText('Top players.')).toBeInTheDocument();
    expect(screen.getByText('5 players')).toBeInTheDocument();
    expect(screen.getByText('NovaBlaze')).toBeInTheDocument();
    expect(screen.getByText('12,450')).toBeInTheDocument();
    expect(screen.getByText('78% win rate')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Follow' })).toHaveLength(5);
  });

  it('switches to the regional leaderboard', () => {
    render(<LeaderboardsTemplate />);
    const main = screen.getByRole('main');
    fireEvent.click(within(main).getByRole('button', { name: 'Regional' }));
    expect(screen.getByText('4 players')).toBeInTheDocument();
    expect(screen.getByText('MapleRush')).toBeInTheDocument();
    expect(screen.queryByText('NovaBlaze')).not.toBeInTheDocument();
  });

  it('follows a player', () => {
    render(<LeaderboardsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Follow' })[0]);
    expect(
      screen.getByRole('button', { name: 'Following' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Following')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Follow' })).toHaveLength(4);
  });
});
