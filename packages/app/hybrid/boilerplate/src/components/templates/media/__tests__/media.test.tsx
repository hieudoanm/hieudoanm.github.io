import { fireEvent, render, screen } from '@testing-library/react';
import { AlbumsTemplate } from '../AlbumsTemplate';
import { MediaLibraryTemplate } from '../MediaLibraryTemplate';
import { VideoPlayerTemplate } from '../VideoPlayerTemplate';
import AlbumsPage from '@/app/(templates)/media/albums/page';
import MediaLibraryPage from '@/app/(templates)/media/library/page';
import VideoPlayerPage from '@/app/(templates)/media/video/page';

describe('MediaLibraryTemplate', () => {
  it('renders assets with type, size and the summary', () => {
    render(<MediaLibraryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Media Library' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 assets')).toBeInTheDocument();
    expect(screen.getByText('hero-banner.png')).toBeInTheDocument();
    expect(screen.getByText('2.4 MB')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Delete selected (0)' })
    ).toBeDisabled();
  });

  it('filters assets by type and search', () => {
    render(<MediaLibraryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Video' }));
    expect(screen.getByText('2 assets')).toBeInTheDocument();
    expect(screen.getByText('product-demo.mp4')).toBeInTheDocument();
    expect(screen.queryByText('hero-banner.png')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search assets'), {
      target: { value: 'podcast' },
    });
    expect(screen.getByText('0 assets')).toBeInTheDocument();
    expect(screen.getByText('No assets found')).toBeInTheDocument();
  });

  it('selects and deletes assets', () => {
    render(<MediaLibraryTemplate />);
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Select hero-banner.png' })
    );
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Select team-photo.jpg' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete selected (2)' })
    );
    expect(screen.getByText('6 assets')).toBeInTheDocument();
    expect(screen.queryByText('hero-banner.png')).not.toBeInTheDocument();
    expect(screen.queryByText('team-photo.jpg')).not.toBeInTheDocument();
  });
});

describe('AlbumsTemplate', () => {
  it('renders albums with photo counts', () => {
    render(<AlbumsTemplate />);
    expect(screen.getByRole('heading', { name: 'Albums' })).toBeInTheDocument();
    expect(screen.getByText('3 albums')).toBeInTheDocument();
    expect(screen.getByText('Summer trip')).toBeInTheDocument();
    expect(screen.getByText('4 photos')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'View photos' })).toHaveLength(
      3
    );
  });

  it('expands and hides album photos', () => {
    render(<AlbumsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'View photos' })[0]);
    expect(screen.getByText('Beach sunset')).toBeInTheDocument();
    expect(screen.getByText('Boardwalk')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide photos' }));
    expect(screen.queryByText('Beach sunset')).not.toBeInTheDocument();
  });

  it('creates an album with validation', () => {
    render(<AlbumsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Create album' }));
    expect(screen.getByText('Enter an album title')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Album title'), {
      target: { value: 'Holiday snaps' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create album' }));
    expect(screen.getByText('Album created')).toBeInTheDocument();
    expect(screen.getByText('Holiday snaps')).toBeInTheDocument();
    expect(screen.getByText('4 albums')).toBeInTheDocument();
  });
});

describe('VideoPlayerTemplate', () => {
  it('renders the playlist and the selected video', () => {
    render(<VideoPlayerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Video Player' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 videos in playlist')).toBeInTheDocument();
    expect(screen.getByText('Now playing: Product demo')).toBeInTheDocument();
    expect(screen.getByText('Duration 4:32')).toBeInTheDocument();
    expect(screen.getByText('Paused')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('selects another video from the playlist', () => {
    render(<VideoPlayerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Q&A session/ }));
    expect(screen.getByText('Now playing: Q&A session')).toBeInTheDocument();
    expect(screen.getByText('Duration 15:48')).toBeInTheDocument();
  });

  it('toggles play and pause', () => {
    render(<VideoPlayerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByText('Playing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    expect(screen.getByText('Paused')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });
});

describe('Media pages', () => {
  it('renders the media library page', () => {
    render(<MediaLibraryPage />);
    expect(
      screen.getByRole('heading', { name: 'Media Library' })
    ).toBeInTheDocument();
  });

  it('renders the albums page', () => {
    render(<AlbumsPage />);
    expect(screen.getByRole('heading', { name: 'Albums' })).toBeInTheDocument();
  });

  it('renders the video player page', () => {
    render(<VideoPlayerPage />);
    expect(
      screen.getByRole('heading', { name: 'Video Player' })
    ).toBeInTheDocument();
  });
});
