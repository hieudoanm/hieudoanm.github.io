import { fireEvent, render, screen } from '@testing-library/react';
import { PlaylistCard } from '../PlaylistCard';

describe('PlaylistCard', () => {
  it('renders title, author and track count', () => {
    render(<PlaylistCard title="Chill" trackCount={12} author="Me" />);
    expect(screen.getByText('Chill')).toBeInTheDocument();
    expect(screen.getByText('Me · 12 tracks')).toBeInTheDocument();
  });

  it('renders placeholder when no cover image', () => {
    render(<PlaylistCard title="Chill" trackCount={1} />);
    expect(screen.getByText('🎵')).toBeInTheDocument();
  });

  it('calls onOpen when clicked', () => {
    const onOpen = jest.fn();
    render(<PlaylistCard title="Chill" trackCount={1} onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('playlist-card'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
