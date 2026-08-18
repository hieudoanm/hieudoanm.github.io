import { render, screen } from '@testing-library/react';
import ArtistsPage from '@/app/(templates)/media/artists/page';

describe('ArtistsPage', () => {
  it('renders the artists page', () => {
    render(<ArtistsPage />);
    expect(screen.getByText('4 artists')).toBeInTheDocument();
  });
});
