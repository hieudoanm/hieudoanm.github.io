import { fireEvent, render, screen } from '@testing-library/react';
import { AlbumTracks } from '../AlbumTracks';

const tracks = [
  { id: '1', title: 'Track One', duration: '3:00' },
  { id: '2', title: 'Track Two', duration: '4:30' },
];

describe('AlbumTracks', () => {
  it('renders album header and tracks', () => {
    render(<AlbumTracks album="My Album" artist="Artist" tracks={tracks} />);
    expect(screen.getByText('My Album')).toBeInTheDocument();
    expect(screen.getAllByTestId('album-track')).toHaveLength(2);
    expect(screen.getByText('Track One')).toBeInTheDocument();
  });

  it('highlights the current track', () => {
    render(<AlbumTracks tracks={tracks} currentId="1" />);
    expect(screen.getByText('Track One')).toHaveClass('text-primary');
  });

  it('calls onPlay with the track id', () => {
    const onPlay = jest.fn();
    render(<AlbumTracks tracks={tracks} onPlay={onPlay} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Track Two' }));
    expect(onPlay).toHaveBeenCalledWith('2');
  });

  it('renders no tracks when empty', () => {
    render(<AlbumTracks tracks={[]} />);
    expect(screen.queryAllByTestId('album-track')).toHaveLength(0);
  });
});
