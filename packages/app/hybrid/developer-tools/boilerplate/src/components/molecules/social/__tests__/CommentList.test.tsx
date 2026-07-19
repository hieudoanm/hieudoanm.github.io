import { render, screen } from '@testing-library/react';
import { CommentList } from '../CommentList';

const comments = [
  { id: '1', author: 'Anna', content: 'Great read.', time: '1h', likes: 4 },
  { id: '2', author: 'Bob', content: 'Totally agree.' },
];

describe('CommentList', () => {
  it('renders the default title and comments', () => {
    render(<CommentList comments={comments} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('Anna')).toBeInTheDocument();
    expect(screen.getByText('Great read.')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders comment time and likes when provided', () => {
    render(<CommentList comments={comments} />);
    expect(screen.getByText('1h')).toBeInTheDocument();
    expect(screen.getByText('4 likes')).toBeInTheDocument();
  });

  it('renders an empty state when no comments', () => {
    render(<CommentList comments={[]} />);
    expect(screen.getByText('No comments yet.')).toBeInTheDocument();
  });
});
