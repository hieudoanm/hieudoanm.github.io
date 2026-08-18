import { render, screen } from '@testing-library/react';
import { CommentCount } from '../CommentCount';

describe('CommentCount', () => {
  it('renders the comment count', () => {
    render(<CommentCount count={12} />);
    expect(screen.getByTestId('comment-count')).toHaveTextContent('12');
  });

  it('renders default label', () => {
    render(<CommentCount count={12} />);
    expect(screen.getByTestId('comment-count')).toHaveTextContent('comments');
  });

  it('renders custom label', () => {
    render(<CommentCount count={1} label="reply" />);
    expect(screen.getByTestId('comment-count')).toHaveTextContent('reply');
  });
});
