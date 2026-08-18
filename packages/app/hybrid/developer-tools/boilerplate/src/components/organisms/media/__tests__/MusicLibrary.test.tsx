import { fireEvent, render, screen } from '@testing-library/react';
import { MusicLibrary } from '../MusicLibrary';

const songs = [
  {
    id: 's1',
    title: 'Horizon',
    artist: 'Mono Wave',
    album: 'Night Drive',
    duration: 200,
  },
  {
    id: 's2',
    title: 'Pulse',
    artist: 'Blue Hour',
    album: 'Static',
    duration: 170,
  },
];

describe('MusicLibrary', () => {
  it('renders songs with album and duration', () => {
    render(<MusicLibrary songs={songs} />);
    expect(screen.getByText('Horizon')).toBeInTheDocument();
    expect(screen.getByText('Static')).toBeInTheDocument();
    expect(screen.getByText('2:50')).toBeInTheDocument();
  });

  it('shows the total song count', () => {
    render(<MusicLibrary songs={songs} />);
    expect(screen.getByText('2 songs')).toBeInTheDocument();
  });

  it('fires onPlay with the song id', () => {
    const onPlay = jest.fn();
    render(<MusicLibrary songs={songs} onPlay={onPlay} />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Horizon' }));
    expect(onPlay).toHaveBeenCalledWith('s1');
  });

  it('renders an empty table for no songs', () => {
    render(<MusicLibrary songs={[]} />);
    expect(screen.getByText('0 songs')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(1);
  });
});
