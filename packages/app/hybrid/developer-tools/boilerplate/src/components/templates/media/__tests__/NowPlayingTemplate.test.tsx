import { fireEvent, render, screen } from '@testing-library/react';
import { NowPlayingTemplate } from '../NowPlayingTemplate';

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
