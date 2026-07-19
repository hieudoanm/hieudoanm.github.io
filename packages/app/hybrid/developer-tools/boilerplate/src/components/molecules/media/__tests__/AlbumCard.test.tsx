import { fireEvent, render, screen } from '@testing-library/react';
import { AlbumCard } from '../AlbumCard';

describe('AlbumCard', () => {
  it('renders title and metadata', () => {
    render(
      <AlbumCard title="Album" artist="Artist" year="2024" trackCount={10} />
    );
    expect(screen.getByText('Album')).toBeInTheDocument();
    expect(screen.getByText('Artist · 2024 · 10 tracks')).toBeInTheDocument();
  });

  it('omits optional metadata when missing', () => {
    render(<AlbumCard title="Album" artist="Artist" />);
    expect(screen.getByText('Artist')).toBeInTheDocument();
  });

  it('calls onOpen when clicked', () => {
    const onOpen = jest.fn();
    render(<AlbumCard title="Album" artist="Artist" onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('album-card'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
