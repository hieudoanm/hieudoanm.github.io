import { render, screen } from '@testing-library/react';
import { PostIcon } from '../PostIcon';

describe('PostIcon', () => {
  it('renders the text post icon', () => {
    render(<PostIcon type="text" />);
    expect(screen.getByTestId('post-icon')).toHaveAttribute(
      'aria-label',
      'text post'
    );
  });

  it('renders the video post icon', () => {
    render(<PostIcon type="video" />);
    expect(screen.getByTestId('post-icon')).toHaveAttribute(
      'aria-label',
      'video post'
    );
  });

  it('renders the poll post icon', () => {
    render(<PostIcon type="poll" />);
    expect(screen.getByTestId('post-icon')).toHaveAttribute(
      'aria-label',
      'poll post'
    );
  });
});
