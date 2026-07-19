import { render, screen } from '@testing-library/react';
import MusicHomePage from '@/app/(templates)/media/music-home/page';

describe('MusicHomePage', () => {
  it('renders the music home page', () => {
    render(<MusicHomePage />);
    expect(screen.getByText('3 new releases')).toBeInTheDocument();
  });
});
