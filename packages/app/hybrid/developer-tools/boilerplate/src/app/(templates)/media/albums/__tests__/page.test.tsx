import { render, screen } from '@testing-library/react';
import AlbumsPage from '@/app/(templates)/media/albums/page';

describe('AlbumsPage', () => {
  it('renders the albums page', () => {
    render(<AlbumsPage />);
    expect(screen.getByRole('heading', { name: 'Albums' })).toBeInTheDocument();
  });
});
