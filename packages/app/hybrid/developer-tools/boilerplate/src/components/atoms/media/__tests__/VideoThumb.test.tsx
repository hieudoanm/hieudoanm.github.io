import { render, screen } from '@testing-library/react';
import { VideoThumb } from '../VideoThumb';

describe('VideoThumb', () => {
  it('renders the thumbnail image with alt text', () => {
    render(<VideoThumb title="How it works" src="/thumb.jpg" />);
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'How it works');
  });

  it('shows the title and duration overlay', () => {
    render(<VideoThumb title="Podcast 1" durationSeconds={125} />);
    expect(screen.getByTestId('video-thumb')).toHaveTextContent('Podcast 1');
    expect(screen.getByTestId('video-thumb')).toHaveTextContent('2:05');
  });

  it('shows a placeholder when no thumbnail is provided', () => {
    render(<VideoThumb title="Clip" />);
    expect(screen.getByTestId('video-thumb')).toHaveTextContent('No preview');
  });
});
