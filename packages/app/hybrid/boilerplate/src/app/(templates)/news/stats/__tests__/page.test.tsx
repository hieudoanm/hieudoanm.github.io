import { render, screen } from '@testing-library/react';
import StatsPage from '@/app/(templates)/news/stats/page';

describe('StatsPage', () => {
  it('renders the stats page', () => {
    render(<StatsPage />);
    expect(
      screen.getByRole('heading', { name: 'Player Stats' })
    ).toBeInTheDocument();
    expect(screen.getByText('18 goals')).toBeInTheDocument();
  });
});
