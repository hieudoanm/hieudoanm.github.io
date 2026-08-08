import { render, screen } from '@testing-library/react';
import { AlbumCover } from '../AlbumCover';

describe('AlbumCover', () => {
  it('shows initials when no artwork is provided', () => {
    render(<AlbumCover title="Dark Side of the Moon" />);
    expect(screen.getByTestId('album-cover')).toHaveTextContent('DS');
  });

  it('renders the artwork image with alt text', () => {
    render(<AlbumCover title="Abbey Road" src="/abbey.jpg" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Abbey Road cover');
  });

  it('applies the requested size class', () => {
    render(<AlbumCover title="Thriller" size="lg" />);
    expect(screen.getByTestId('album-cover')).toHaveClass('h-32');
  });
});
