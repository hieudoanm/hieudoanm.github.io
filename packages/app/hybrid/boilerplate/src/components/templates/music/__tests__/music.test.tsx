import { fireEvent, render, screen, within } from '@testing-library/react';
import { AlbumDetailTemplate } from '../AlbumDetailTemplate';
import { ArtistsTemplate } from '../ArtistsTemplate';
import { ChartsTemplate } from '../ChartsTemplate';
import { LyricsTemplate } from '../LyricsTemplate';
import { MusicHomeTemplate } from '../MusicHomeTemplate';
import { MusicSearchTemplate } from '../MusicSearchTemplate';
import { NowPlayingTemplate } from '../NowPlayingTemplate';
import { PlaylistTemplate } from '../PlaylistTemplate';
import AlbumDetailPage from '@/app/(main)/music/album/page';
import ArtistsPage from '@/app/(main)/music/artists/page';
import ChartsPage from '@/app/(main)/music/charts/page';
import MusicHomePage from '@/app/(main)/music/home/page';
import LyricsPage from '@/app/(main)/music/lyrics/page';
import NowPlayingPage from '@/app/(main)/music/now-playing/page';
import PlaylistPage from '@/app/(main)/music/playlist/page';
import MusicSearchPage from '@/app/(main)/music/search/page';

describe('MusicHomeTemplate', () => {
  it('renders the home feed with new releases', () => {
    render(<MusicHomeTemplate />);
    expect(screen.getByRole('heading', { name: 'Music' })).toBeInTheDocument();
    expect(screen.getByText('Home feed.')).toBeInTheDocument();
    expect(screen.getByText('3 new releases')).toBeInTheDocument();
    expect(screen.getByText('Neon Tides')).toBeInTheDocument();
    expect(screen.getByText('Luna Vega')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Play' })).toHaveLength(3);
  });

  it('toggles a release card to Now playing', () => {
    render(<MusicHomeTemplate />);
    const card = screen.getByText('Neon Tides').closest('.card');
    expect(card).not.toBeNull();
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Play' })
    );
    expect(
      within(card as HTMLElement).getByText('Now playing')
    ).toBeInTheDocument();
    expect(
      within(card as HTMLElement).getByRole('button', { name: 'Pause' })
    ).toBeInTheDocument();
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Pause' })
    );
    expect(
      within(card as HTMLElement).queryByText('Now playing')
    ).not.toBeInTheDocument();
  });

  it('keeps Now playing on a single card at a time', () => {
    render(<MusicHomeTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Play' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Play' })[1]);
    expect(screen.getAllByText('Now playing')).toHaveLength(1);
  });
});

describe('AlbumDetailTemplate', () => {
  it('renders album details and the track summary', () => {
    render(<AlbumDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Album' })).toBeInTheDocument();
    expect(screen.getByText('Horizon Line')).toBeInTheDocument();
    expect(screen.getByText('Nova Ember')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('12 tracks')).toBeInTheDocument();
    expect(screen.getByText('48 min')).toBeInTheDocument();
    expect(screen.getByText('3:45')).toBeInTheDocument();
  });

  it('toggles the play album button', () => {
    render(<AlbumDetailTemplate />);
    expect(screen.getByText('Paused')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Play album' }));
    expect(screen.getByText('Playing')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Pause album' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pause album' }));
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('lists every track with a number and duration', () => {
    render(<AlbumDetailTemplate />);
    expect(screen.getAllByRole('row')).toHaveLength(13);
    expect(screen.getByText('Horizon Line Reprise')).toBeInTheDocument();
  });
});

describe('PlaylistTemplate', () => {
  it('renders songs and the count summary', () => {
    render(<PlaylistTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Playlist' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 songs')).toBeInTheDocument();
    expect(screen.getByText('Golden Hour')).toBeInTheDocument();
    expect(screen.getByText('4:12')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Shuffle' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(5);
  });

  it('toggles shuffle mode', () => {
    render(<PlaylistTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Shuffle' }));
    expect(
      screen.getByRole('button', { name: 'Shuffle on' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Shuffle on' }));
    expect(screen.getByRole('button', { name: 'Shuffle' })).toBeInTheDocument();
  });

  it('removes songs and shows the empty state', () => {
    render(<PlaylistTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('4 songs')).toBeInTheDocument();
    expect(screen.queryByText('Golden Hour')).not.toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('0 songs')).toBeInTheDocument();
    expect(screen.getByText('No songs')).toBeInTheDocument();
  });
});

describe('NowPlayingTemplate', () => {
  it('renders the now playing track details', () => {
    render(<NowPlayingTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Now Playing' })
    ).toBeInTheDocument();
    expect(screen.getByText('Starlight Avenue')).toBeInTheDocument();
    expect(screen.getByText('Maya Fields')).toBeInTheDocument();
    expect(screen.getByText('Night Bloom')).toBeInTheDocument();
    expect(screen.getByText('3:45')).toBeInTheDocument();
    expect(screen.getByText('Paused')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('toggles play and pause', () => {
    render(<NowPlayingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByText('Playing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('toggles the like state', () => {
    render(<NowPlayingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Like' }));
    expect(screen.getByText('Liked')).toBeInTheDocument();
    expect(screen.getByText('Liked')).toHaveClass('badge-error');
    fireEvent.click(screen.getByRole('button', { name: 'Like' }));
    expect(screen.queryByText('Liked')).not.toBeInTheDocument();
  });
});

describe('ArtistsTemplate', () => {
  it('renders artists with follower counts', () => {
    render(<ArtistsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Artists' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 artists')).toBeInTheDocument();
    expect(screen.getByText('Luna Vega')).toBeInTheDocument();
    expect(screen.getByText('1.2M followers')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Follow' })).toHaveLength(4);
  });

  it('toggles follow status', () => {
    render(<ArtistsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Follow' })[0]);
    expect(screen.getAllByText('Following')).toHaveLength(1);
    expect(screen.getByText('Following')).toHaveClass('badge-success');
    fireEvent.click(screen.getAllByRole('button', { name: 'Follow' })[0]);
    expect(screen.queryByText('Following')).not.toBeInTheDocument();
  });
});

describe('MusicSearchTemplate', () => {
  it('renders all results with a count', () => {
    render(<MusicSearchTemplate />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByLabelText('Search music')).toBeInTheDocument();
    expect(screen.getByText('5 results')).toBeInTheDocument();
    expect(screen.getByText('Golden Hour')).toBeInTheDocument();
    expect(screen.getByText('Aria Wells')).toBeInTheDocument();
  });

  it('filters results by title', () => {
    render(<MusicSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search music'), {
      target: { value: 'golden' },
    });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByText('Golden Hour')).toBeInTheDocument();
    expect(screen.queryByText('City Lights')).not.toBeInTheDocument();
  });

  it('shows the no results state', () => {
    render(<MusicSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search music'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.getByText('No results for "zzz"')).toBeInTheDocument();
  });
});

describe('LyricsTemplate', () => {
  it('renders the song details', () => {
    render(<LyricsTemplate />);
    expect(screen.getByRole('heading', { name: 'Lyrics' })).toBeInTheDocument();
    expect(screen.getByText('Midnight Reverie')).toBeInTheDocument();
    expect(screen.getByText('Nova Ember')).toBeInTheDocument();
    expect(screen.getByText('Horizon Line')).toBeInTheDocument();
    expect(screen.getByText('3:45')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show lyrics' })
    ).toBeInTheDocument();
  });

  it('shows and hides lyrics', () => {
    render(<LyricsTemplate />);
    expect(
      screen.queryByText('Dreams are made of midnight')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show lyrics' }));
    expect(screen.getByText('Dreams are made of midnight')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Hide lyrics' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide lyrics' }));
    expect(
      screen.queryByText('Dreams are made of midnight')
    ).not.toBeInTheDocument();
  });
});

describe('ChartsTemplate', () => {
  it('renders the weekly chart by default', () => {
    render(<ChartsTemplate />);
    expect(screen.getByRole('heading', { name: 'Charts' })).toBeInTheDocument();
    expect(screen.getByText('5 songs')).toBeInTheDocument();
    expect(screen.getByText('Solar Flare')).toBeInTheDocument();
    expect(screen.getByText('3.2M plays')).toBeInTheDocument();
  });

  it('switches to the monthly chart', () => {
    render(<ChartsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
    expect(screen.getByText('6 songs')).toBeInTheDocument();
    expect(screen.getByText('Neon Dreams')).toBeInTheDocument();
    expect(screen.queryByText('Solar Flare')).not.toBeInTheDocument();
  });

  it('switches to the yearly chart and shows movement badges', () => {
    render(<ChartsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Yearly' }));
    expect(screen.getByText('4 songs')).toBeInTheDocument();
    expect(screen.getByText('Midnight Static')).toBeInTheDocument();
    expect(screen.queryByText('Neon Dreams')).not.toBeInTheDocument();
    expect(screen.getByText('41.2M plays')).toBeInTheDocument();
    expect(screen.getAllByText('Up')).toHaveLength(2);
    expect(screen.getAllByText('Down')).toHaveLength(2);
    expect(screen.getAllByText('Up')[0]).toHaveClass('badge-success');
    expect(screen.getAllByText('Down')[0]).toHaveClass('badge-error');
  });
});

describe('Music pages', () => {
  it('renders the music home page', () => {
    render(<MusicHomePage />);
    expect(screen.getByText('3 new releases')).toBeInTheDocument();
  });

  it('renders the album detail page', () => {
    render(<AlbumDetailPage />);
    expect(screen.getByText('12 tracks')).toBeInTheDocument();
  });

  it('renders the playlist page', () => {
    render(<PlaylistPage />);
    expect(screen.getByText('5 songs')).toBeInTheDocument();
  });

  it('renders the now playing page', () => {
    render(<NowPlayingPage />);
    expect(screen.getByText('What is on right now.')).toBeInTheDocument();
  });

  it('renders the artists page', () => {
    render(<ArtistsPage />);
    expect(screen.getByText('4 artists')).toBeInTheDocument();
  });

  it('renders the music search page', () => {
    render(<MusicSearchPage />);
    expect(screen.getByText('5 results')).toBeInTheDocument();
  });

  it('renders the lyrics page', () => {
    render(<LyricsPage />);
    expect(screen.getByText('Sing along.')).toBeInTheDocument();
  });

  it('renders the charts page', () => {
    render(<ChartsPage />);
    expect(screen.getByText('5 songs')).toBeInTheDocument();
  });
});
