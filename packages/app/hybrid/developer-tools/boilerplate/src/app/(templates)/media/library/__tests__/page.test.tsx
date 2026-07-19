import { render, screen } from '@testing-library/react';
import MediaLibraryPage from '@/app/(templates)/media/library/page';

describe('MediaLibraryPage', () => {
  it('renders the media library page', () => {
    render(<MediaLibraryPage />);
    expect(
      screen.getByRole('heading', { name: 'Media Library' })
    ).toBeInTheDocument();
  });
});
