import { render, screen } from '@testing-library/react';
import MoviePage from '@/app/(templates)/media/movie/page';

describe('MoviePage', () => {
  it('renders the movie detail page', () => {
    render(<MoviePage />);
    expect(screen.getByRole('heading', { name: 'Movie' })).toBeInTheDocument();
    expect(screen.getByText('2h 10m')).toBeInTheDocument();
  });
});
