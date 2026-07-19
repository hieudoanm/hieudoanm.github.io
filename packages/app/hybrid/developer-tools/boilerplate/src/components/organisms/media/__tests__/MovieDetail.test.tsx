import { fireEvent, render, screen } from '@testing-library/react';
import { MovieDetail } from '../MovieDetail';

const movie = {
  title: 'Midnight Signals',
  year: 2025,
  rating: 8.7,
  genres: ['Sci-Fi', 'Thriller'],
  duration: 7380,
  synopsis: 'A radio operator intercepts a message from the future.',
  cast: [
    { name: 'Ava Reyes', role: 'Nina' },
    { name: 'Tom Okafor', role: 'Grant' },
  ],
};

describe('MovieDetail', () => {
  it('renders movie title, rating and formatted duration', () => {
    render(<MovieDetail movie={movie} />);
    expect(screen.getByText('Midnight Signals')).toBeInTheDocument();
    expect(screen.getByText('★ 8.7')).toBeInTheDocument();
    expect(screen.getByText('2h 3m')).toBeInTheDocument();
    expect(screen.getByText(movie.synopsis)).toBeInTheDocument();
  });

  it('renders genre badges and cast list', () => {
    render(<MovieDetail movie={movie} />);
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('Thriller')).toBeInTheDocument();
    expect(screen.getByText('Ava Reyes')).toBeInTheDocument();
    expect(screen.getByText('Tom Okafor')).toBeInTheDocument();
  });

  it('fires onPlay and onWatchlist callbacks', () => {
    const onPlay = jest.fn();
    const onWatchlist = jest.fn();
    render(
      <MovieDetail movie={movie} onPlay={onPlay} onWatchlist={onWatchlist} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(onPlay).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: '+ Watchlist' }));
    expect(onWatchlist).toHaveBeenCalled();
  });
});
