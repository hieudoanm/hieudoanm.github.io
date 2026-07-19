import { render, screen } from '@testing-library/react';
import { MediaBadge } from '../MediaBadge';

describe('MediaBadge', () => {
  it('renders the media type label', () => {
    render(<MediaBadge type="video" />);
    expect(screen.getByTestId('media-badge')).toHaveTextContent('video');
  });

  it('applies live error class', () => {
    render(<MediaBadge type="live" />);
    expect(screen.getByTestId('media-badge')).toHaveClass('badge-error');
  });

  it('applies photo neutral class', () => {
    render(<MediaBadge type="photo" />);
    expect(screen.getByTestId('media-badge')).toHaveClass('badge-neutral');
  });

  it('renders audio accent class', () => {
    render(<MediaBadge type="audio" />);
    expect(screen.getByTestId('media-badge')).toHaveClass('badge-accent');
  });
});
