import { fireEvent, render, screen } from '@testing-library/react';
import { AlbumPage } from '../AlbumPage';

const album = {
  title: 'Night Drive',
  artist: 'Mono Wave',
  year: 2024,
  tracks: [
    { id: 'a1', title: 'Horizon', duration: 200 },
    { id: 'a2', title: 'Pulse', duration: 170 },
  ],
};

describe('AlbumPage', () => {
  it('renders album metadata and track list', () => {
    render(<AlbumPage album={album} />);
    expect(screen.getByTestId('album-title')).toHaveTextContent('Night Drive');
    expect(screen.getByText('Mono Wave')).toBeInTheDocument();
    expect(screen.getByText('Horizon')).toBeInTheDocument();
    expect(screen.getByText('3:20')).toBeInTheDocument();
  });

  it('summarises the total runtime and track count', () => {
    render(<AlbumPage album={album} />);
    expect(screen.getByText(/2 tracks.*6:10/)).toBeInTheDocument();
  });

  it('fires onPlayTrack with the track id', () => {
    const onPlayTrack = jest.fn();
    render(<AlbumPage album={album} onPlayTrack={onPlayTrack} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Horizon' }));
    expect(onPlayTrack).toHaveBeenCalledWith('a1');
  });

  it('fires onPlayAll from the header action', () => {
    const onPlayAll = jest.fn();
    render(<AlbumPage album={album} onPlayAll={onPlayAll} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play album' }));
    expect(onPlayAll).toHaveBeenCalled();
  });
});
