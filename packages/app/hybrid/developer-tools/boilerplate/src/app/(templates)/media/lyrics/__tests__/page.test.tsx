import { render, screen } from '@testing-library/react';
import LyricsPage from '@/app/(templates)/media/lyrics/page';

describe('LyricsPage', () => {
  it('renders the lyrics page', () => {
    render(<LyricsPage />);
    expect(screen.getByText('Sing along.')).toBeInTheDocument();
  });
});
