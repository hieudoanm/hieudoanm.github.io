import { fireEvent, render, screen } from '@testing-library/react';
import { PlaylistView } from '../PlaylistView';

const tracks = [
  { id: 't1', title: 'Horizon', artist: 'Mono Wave', duration: 200 },
  { id: 't2', title: 'Pulse', artist: 'Blue Hour', duration: 170 },
];

describe('PlaylistView', () => {
  it('renders playlist name and track rows', () => {
    render(<PlaylistView name="Night Drive" tracks={tracks} />);
    expect(
      screen.getByRole('heading', { name: 'Night Drive' })
    ).toBeInTheDocument();
    expect(screen.getByText('Horizon')).toBeInTheDocument();
    expect(screen.getByText('Blue Hour')).toBeInTheDocument();
    expect(screen.getByText('3:20')).toBeInTheDocument();
  });

  it('fires onPlay with the track id', () => {
    const onPlay = jest.fn();
    render(<PlaylistView name="Night Drive" tracks={tracks} onPlay={onPlay} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Horizon' }));
    expect(onPlay).toHaveBeenCalledWith('t1');
  });

  it('fires onPlayAll from the header action', () => {
    const onPlayAll = jest.fn();
    render(
      <PlaylistView name="Night Drive" tracks={tracks} onPlayAll={onPlayAll} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Play all' }));
    expect(onPlayAll).toHaveBeenCalled();
  });

  it('shows an empty message when there are no tracks', () => {
    render(<PlaylistView name="Night Drive" tracks={[]} />);
    expect(screen.getByText('No tracks in this playlist.')).toBeInTheDocument();
  });
});
