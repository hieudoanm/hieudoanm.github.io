import { render, screen } from '@testing-library/react';
import { LikeCount } from '../LikeCount';

describe('LikeCount', () => {
  it('renders the like count with a comma separator', () => {
    render(<LikeCount count={1234} />);
    expect(screen.getByTestId('like-count')).toHaveTextContent('1,234');
  });

  it('highlights the count when liked', () => {
    render(<LikeCount count={100} liked />);
    expect(screen.getByTestId('like-count')).toHaveClass('text-error');
  });

  it('renders neutrally when not liked', () => {
    render(<LikeCount count={0} />);
    expect(screen.getByTestId('like-count')).toHaveClass(
      'text-base-content/60'
    );
  });
});
