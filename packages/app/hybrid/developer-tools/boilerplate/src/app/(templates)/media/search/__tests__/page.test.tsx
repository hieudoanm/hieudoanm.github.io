import { render, screen } from '@testing-library/react';
import MusicSearchPage from '@/app/(templates)/media/search/page';

describe('MusicSearchPage', () => {
  it('renders the music search page', () => {
    render(<MusicSearchPage />);
    expect(screen.getByText('5 results')).toBeInTheDocument();
  });
});
