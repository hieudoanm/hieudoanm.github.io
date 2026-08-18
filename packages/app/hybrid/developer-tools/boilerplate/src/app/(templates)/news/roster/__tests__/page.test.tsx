import { render, screen } from '@testing-library/react';
import RosterPage from '@/app/(templates)/news/roster/page';

describe('RosterPage', () => {
  it('renders the roster page', () => {
    render(<RosterPage />);
    expect(
      screen.getByRole('heading', { name: 'Team Roster' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 players')).toBeInTheDocument();
  });
});
