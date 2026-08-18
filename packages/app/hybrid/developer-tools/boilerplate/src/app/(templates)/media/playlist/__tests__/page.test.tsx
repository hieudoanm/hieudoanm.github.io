import { render, screen } from '@testing-library/react';
import PlaylistPage from '@/app/(templates)/media/playlist/page';

describe('PlaylistPage', () => {
  it('renders the playlist page', () => {
    render(<PlaylistPage />);
    expect(screen.getByText('5 songs')).toBeInTheDocument();
  });
});
