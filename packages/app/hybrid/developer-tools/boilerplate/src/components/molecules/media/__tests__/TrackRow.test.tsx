import { fireEvent, render, screen } from '@testing-library/react';
import { TrackRow } from '../TrackRow';

describe('TrackRow', () => {
  it('renders title, artist, duration and index', () => {
    render(<TrackRow title="Song" artist="Artist" duration="3:45" index={2} />);
    expect(screen.getByText('Song')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    expect(screen.getByText('3:45')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('highlights the playing track', () => {
    render(<TrackRow title="Song" artist="Artist" duration="3:45" playing />);
    expect(screen.getByText('Song')).toHaveClass('text-primary');
  });

  it('shows a pause button when playing', () => {
    render(<TrackRow title="Song" artist="Artist" duration="3:45" playing />);
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  it('calls onPlay when play button clicked', () => {
    const onPlay = jest.fn();
    render(
      <TrackRow title="Song" artist="Artist" duration="3:45" onPlay={onPlay} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });
});
