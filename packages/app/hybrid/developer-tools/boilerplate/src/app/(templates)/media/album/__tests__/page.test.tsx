import { render, screen } from '@testing-library/react';
import AlbumDetailPage from '@/app/(templates)/media/album/page';

describe('AlbumDetailPage', () => {
  it('renders the album detail page', () => {
    render(<AlbumDetailPage />);
    expect(screen.getByText('12 tracks')).toBeInTheDocument();
  });
});
