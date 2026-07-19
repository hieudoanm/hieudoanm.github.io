import { render, screen } from '@testing-library/react';
import NowPlayingPage from '@/app/(templates)/media/now-playing/page';

describe('NowPlayingPage', () => {
  it('renders the now playing page', () => {
    render(<NowPlayingPage />);
    expect(screen.getByText('What is on right now.')).toBeInTheDocument();
  });
});
