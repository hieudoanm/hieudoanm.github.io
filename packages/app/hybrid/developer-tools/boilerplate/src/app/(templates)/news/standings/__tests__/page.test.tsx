import { render, screen } from '@testing-library/react';
import StandingsPage from '@/app/(templates)/news/standings/page';

describe('StandingsPage', () => {
  it('renders the standings page', () => {
    render(<StandingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Standings' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 teams')).toBeInTheDocument();
  });
});
