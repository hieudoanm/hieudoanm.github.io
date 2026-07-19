import { fireEvent, render, screen } from '@testing-library/react';
import { TvSeriesPage } from '../TvSeriesPage';

const series = {
  title: 'Static Coast',
  year: 2024,
  rating: 9.1,
  seasons: 2,
  episodes: [
    {
      id: 'e1',
      title: 'Pilot',
      season: 1,
      episode: 1,
      duration: 3600,
    },
    {
      id: 'e2',
      title: 'High Tide',
      season: 2,
      episode: 4,
      duration: 2400,
    },
  ],
};

describe('TvSeriesPage', () => {
  it('renders series metadata and season summary', () => {
    render(<TvSeriesPage series={series} />);
    expect(screen.getByText('Static Coast')).toBeInTheDocument();
    expect(screen.getByText('★ 9.1')).toBeInTheDocument();
    expect(screen.getByText('2 seasons')).toBeInTheDocument();
    expect(screen.getByText('2 episodes')).toBeInTheDocument();
  });

  it('lists episodes with season and episode labels', () => {
    render(<TvSeriesPage series={series} />);
    expect(screen.getByText('S1E1')).toBeInTheDocument();
    expect(screen.getByText('S2E4')).toBeInTheDocument();
    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('1h 0m')).toBeInTheDocument();
  });

  it('fires onPlay with the episode id', () => {
    const onPlay = jest.fn();
    render(<TvSeriesPage series={series} onPlay={onPlay} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Pilot' }));
    expect(onPlay).toHaveBeenCalledWith('e1');
  });
});
