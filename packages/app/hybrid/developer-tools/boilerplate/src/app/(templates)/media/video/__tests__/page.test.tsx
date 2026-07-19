import { render, screen } from '@testing-library/react';
import VideoPlayerPage from '@/app/(templates)/media/video/page';

describe('VideoPlayerPage', () => {
  it('renders the video player page', () => {
    render(<VideoPlayerPage />);
    expect(
      screen.getByRole('heading', { name: 'Video Player' })
    ).toBeInTheDocument();
  });
});
