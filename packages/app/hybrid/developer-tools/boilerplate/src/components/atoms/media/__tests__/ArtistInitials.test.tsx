import { render, screen } from '@testing-library/react';
import { ArtistInitials } from '../ArtistInitials';

describe('ArtistInitials', () => {
  it('renders initials from the artist name', () => {
    render(<ArtistInitials name="Pink Floyd" />);
    expect(screen.getByTestId('artist-initials')).toHaveTextContent('PF');
  });

  it('renders a single initial for one-word names', () => {
    render(<ArtistInitials name="Zedd" />);
    expect(screen.getByTestId('artist-initials')).toHaveTextContent('Z');
  });

  it('handles empty names', () => {
    render(<ArtistInitials name="  " />);
    expect(screen.getByTestId('artist-initials')).toHaveTextContent('');
  });
});
