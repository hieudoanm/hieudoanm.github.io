import { render, screen } from '@testing-library/react';
import VideoPage from '@/app/(app)/video/page';

describe('video page', () => {
  it('renders the video tools page', () => {
    render(<VideoPage />);
    expect(
      screen.getByRole('heading', { name: 'Video Tools' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a video tool from the sidebar')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search tools...')).toBeInTheDocument();
  });
});
