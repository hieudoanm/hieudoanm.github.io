import { render, screen } from '@testing-library/react';
import MatchesPage from '@/app/(templates)/social/matches/page';

describe('MatchesPage', () => {
  it('renders the live matches page', () => {
    render(<MatchesPage />);
    expect(
      screen.getByRole('heading', { name: 'Live Matches' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 live matches')).toBeInTheDocument();
  });
});
