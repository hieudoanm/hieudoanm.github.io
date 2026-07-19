import { render, screen } from '@testing-library/react';
import TournamentsPage from '@/app/(templates)/social/tournaments/page';

describe('TournamentsPage', () => {
  it('renders the tournaments page', () => {
    render(<TournamentsPage />);
    expect(
      screen.getByRole('heading', { name: 'Tournaments' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 tournaments')).toBeInTheDocument();
  });
});
