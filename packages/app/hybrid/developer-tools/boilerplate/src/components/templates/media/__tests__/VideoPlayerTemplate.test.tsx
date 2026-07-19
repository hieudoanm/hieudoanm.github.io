import { fireEvent, render, screen } from '@testing-library/react';
import { VideoPlayerTemplate } from '../VideoPlayerTemplate';

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
