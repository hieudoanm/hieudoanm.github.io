import { fireEvent, render, screen } from '@testing-library/react';
import { RecentlyPlayed } from '../RecentlyPlayed';

const items = [
  { id: '1', title: 'Song A', artist: 'Artist A', playedAt: '2h ago' },
  { id: '2', title: 'Song B', artist: 'Artist B', playedAt: 'Yesterday' },
];

describe('RecentlyPlayed', () => {
  it('renders played items with timestamps', () => {
    render(<RecentlyPlayed items={items} />);
    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.getByText('Artist B')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('shows an empty state', () => {
    render(<RecentlyPlayed items={[]} />);
    expect(screen.getByText('Nothing played yet.')).toBeInTheDocument();
  });

  it('calls onSelect when an item is clicked', () => {
    const onSelect = jest.fn();
    render(<RecentlyPlayed items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Song B'));
    expect(onSelect).toHaveBeenCalledWith('2');
  });
});
