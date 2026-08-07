import { fireEvent, render, screen, within } from '@testing-library/react';
import { ContinueWatchingTemplate } from '../ContinueWatchingTemplate';
import { LiveChannelsTemplate } from '../LiveChannelsTemplate';
import { MovieDetailTemplate } from '../MovieDetailTemplate';
import { MyListTemplate } from '../MyListTemplate';
import { StreamingHomeTemplate } from '../StreamingHomeTemplate';
import { StreamingSearchTemplate } from '../StreamingSearchTemplate';
import { TvSeriesTemplate } from '../TvSeriesTemplate';
import { WatchHistoryTemplate } from '../WatchHistoryTemplate';
import ContinueWatchingPage from '@/app/(main)/streaming/continue-watching/page';
import HistoryPage from '@/app/(main)/streaming/history/page';
import HomePage from '@/app/(main)/streaming/home/page';
import LivePage from '@/app/(main)/streaming/live/page';
import MoviePage from '@/app/(main)/streaming/movie/page';
import MyListPage from '@/app/(main)/streaming/my-list/page';
import SearchPage from '@/app/(main)/streaming/search/page';
import SeriesPage from '@/app/(main)/streaming/series/page';

describe('StreamingHomeTemplate', () => {
  it('renders featured titles with type, year and rating', () => {
    render(<StreamingHomeTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Streaming' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 featured titles')).toBeInTheDocument();
    expect(screen.getByText('Neon Horizon')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getAllByText('2026')).toHaveLength(2);
    expect(screen.getAllByText('Movie')).toHaveLength(2);
    expect(screen.getAllByText('Series')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(4);
  });

  it('toggles a featured title to Watching', () => {
    render(<StreamingHomeTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Watch' })[0]);
    expect(
      screen.getByRole('button', { name: 'Watching' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Watching')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(3);
  });
});

describe('MovieDetailTemplate', () => {
  it('renders movie details with genre badges', () => {
    render(<MovieDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Movie' })).toBeInTheDocument();
    expect(screen.getByText('Starfall Protocol')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('2h 10m')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
  });

  it('toggles play to paused', () => {
    render(<MovieDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Paused' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Paused' }));
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('toggles like to liked with an error badge', () => {
    render(<MovieDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Like' }));
    expect(screen.getByRole('button', { name: 'Liked' })).toBeInTheDocument();
    expect(screen.getAllByText('Liked')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Liked' }));
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
  });
});

describe('TvSeriesTemplate', () => {
  it('renders series with seasons, episodes and rating', () => {
    render(<TvSeriesTemplate />);
    expect(screen.getByRole('heading', { name: 'Series' })).toBeInTheDocument();
    expect(screen.getByText('4 series')).toBeInTheDocument();
    expect(screen.getByText('Iron Sky')).toBeInTheDocument();
    expect(screen.getByText('3 seasons')).toBeInTheDocument();
    expect(screen.getByText('24 episodes')).toBeInTheDocument();
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'My list' })).toHaveLength(4);
  });

  it('adds a series to the list', () => {
    render(<TvSeriesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'My list' })[0]);
    expect(screen.getByRole('button', { name: 'Added' })).toBeInTheDocument();
    expect(screen.getAllByText('Added')).toHaveLength(2);
  });
});

describe('ContinueWatchingTemplate', () => {
  it('renders titles with progress bars', () => {
    render(<ContinueWatchingTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Continue Watching' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 titles')).toBeInTheDocument();
    expect(screen.getByText('Neon Horizon')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getAllByRole('progressbar')).toHaveLength(4);
  });

  it('removes a title and updates the count', () => {
    render(<ContinueWatchingTemplate />);
    const card = screen
      .getByText('Neon Horizon')
      .closest('.card') as HTMLElement;
    fireEvent.click(
      within(card).getByRole('button', { name: 'Remove Neon Horizon' })
    );
    expect(screen.getByText('3 titles')).toBeInTheDocument();
    expect(screen.queryByText('Neon Horizon')).not.toBeInTheDocument();
  });

  it('shows an empty state after removing every title', () => {
    render(<ContinueWatchingTemplate />);
    while (screen.queryAllByRole('button', { name: /^Remove / }).length > 0) {
      screen
        .getAllByRole('button', { name: /^Remove / })
        .forEach((button) => fireEvent.click(button));
    }
    expect(screen.getByText('0 titles')).toBeInTheDocument();
    expect(screen.getByText('Nothing to watch')).toBeInTheDocument();
  });
});

describe('MyListTemplate', () => {
  it('renders saved titles with type badges', () => {
    render(<MyListTemplate />);
    expect(
      screen.getByRole('heading', { name: 'My List' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 titles')).toBeInTheDocument();
    expect(screen.getByText('Starfall Protocol')).toBeInTheDocument();
    expect(screen.getAllByText('Movie')).toHaveLength(2);
    expect(screen.getAllByText('Series')).toHaveLength(2);
  });

  it('removes a title from the list', () => {
    render(<MyListTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Starfall Protocol' })
    );
    expect(screen.getByText('3 titles')).toBeInTheDocument();
    expect(screen.queryByText('Starfall Protocol')).not.toBeInTheDocument();
  });

  it('shows an empty state after removing every title', () => {
    render(<MyListTemplate />);
    while (screen.queryAllByRole('button', { name: /^Remove / }).length > 0) {
      screen
        .getAllByRole('button', { name: /^Remove / })
        .forEach((button) => fireEvent.click(button));
    }
    expect(screen.getByText('0 titles')).toBeInTheDocument();
    expect(screen.getByText('Your list is empty')).toBeInTheDocument();
  });
});

describe('LiveChannelsTemplate', () => {
  it('renders live channels with viewers and live badges', () => {
    render(<LiveChannelsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Live TV' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 channels live')).toBeInTheDocument();
    expect(screen.getByText('Orbit News')).toBeInTheDocument();
    expect(screen.getByText('1.2K watching')).toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(4);
  });

  it('toggles a channel to watching', () => {
    render(<LiveChannelsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Watch' })[0]);
    expect(
      screen.getByRole('button', { name: 'Watching' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Live')).toHaveLength(4);
  });
});

describe('StreamingSearchTemplate', () => {
  it('renders all catalog results with type badges', () => {
    render(<StreamingSearchTemplate />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('6 results')).toBeInTheDocument();
    expect(screen.getByText('Neon Horizon')).toBeInTheDocument();
    expect(screen.getAllByText('Movie')).toHaveLength(3);
    expect(screen.getAllByText('Series')).toHaveLength(3);
  });

  it('filters results by search query', () => {
    render(<StreamingSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search titles'), {
      target: { value: 'neon' },
    });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByText('Neon Horizon')).toBeInTheDocument();
    expect(screen.queryByText('The Last Signal')).not.toBeInTheDocument();
  });

  it('shows a no-results state for an unmatched query', () => {
    render(<StreamingSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search titles'), {
      target: { value: 'xyz' },
    });
    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.getByText('No results for "xyz"')).toBeInTheDocument();
  });
});

describe('WatchHistoryTemplate', () => {
  it('renders history entries with dates and progress', () => {
    render(<WatchHistoryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'History' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 watched titles')).toBeInTheDocument();
    expect(screen.getByText('Starfall Protocol')).toBeInTheDocument();
    expect(screen.getByText('Aug 3, 2026')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getAllByText('Completed')).toHaveLength(3);
  });

  it('clears the history and shows the empty state', () => {
    render(<WatchHistoryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear history' }));
    expect(screen.getByText('0 watched titles')).toBeInTheDocument();
    expect(screen.getByText('No history')).toBeInTheDocument();
    expect(screen.queryByText('Starfall Protocol')).not.toBeInTheDocument();
  });
});

describe('Streaming pages', () => {
  it('renders the streaming home page', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Streaming' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 featured titles')).toBeInTheDocument();
  });

  it('renders the movie detail page', () => {
    render(<MoviePage />);
    expect(screen.getByRole('heading', { name: 'Movie' })).toBeInTheDocument();
    expect(screen.getByText('2h 10m')).toBeInTheDocument();
  });

  it('renders the series page', () => {
    render(<SeriesPage />);
    expect(screen.getByRole('heading', { name: 'Series' })).toBeInTheDocument();
    expect(screen.getByText('4 series')).toBeInTheDocument();
  });

  it('renders the continue watching page', () => {
    render(<ContinueWatchingPage />);
    expect(
      screen.getByRole('heading', { name: 'Continue Watching' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 titles')).toBeInTheDocument();
  });

  it('renders the my list page', () => {
    render(<MyListPage />);
    expect(
      screen.getByRole('heading', { name: 'My List' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 titles')).toBeInTheDocument();
  });

  it('renders the live channels page', () => {
    render(<LivePage />);
    expect(
      screen.getByRole('heading', { name: 'Live TV' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 channels live')).toBeInTheDocument();
  });

  it('renders the streaming search page', () => {
    render(<SearchPage />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('6 results')).toBeInTheDocument();
  });

  it('renders the watch history page', () => {
    render(<HistoryPage />);
    expect(
      screen.getByRole('heading', { name: 'History' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 watched titles')).toBeInTheDocument();
  });
});
