import { fireEvent, render, screen } from '@testing-library/react';
import { FeedView } from '../FeedView';

const posts = [
  {
    id: 'p1',
    author: 'Mia',
    content: 'Sunset at the bay',
    likes: 12,
    comments: 3,
    time: '2h',
  },
  {
    id: 'p2',
    author: 'Noah',
    content: 'First day of work',
    likes: 5,
    comments: 1,
    time: '5h',
  },
];

describe('FeedView', () => {
  it('renders each post author and content', () => {
    render(<FeedView posts={posts} />);
    expect(screen.getByText('Mia')).toBeInTheDocument();
    expect(screen.getByText('Sunset at the bay')).toBeInTheDocument();
    expect(screen.getByText('Noah')).toBeInTheDocument();
    expect(screen.getByText('First day of work')).toBeInTheDocument();
  });

  it('fires onLike with the post id', () => {
    const onLike = jest.fn();
    render(<FeedView posts={posts} onLike={onLike} />);
    fireEvent.click(screen.getAllByText('12')[0]);
    expect(onLike).toHaveBeenCalledWith('p1');
  });

  it('shows an empty state when no posts exist', () => {
    render(<FeedView posts={[]} />);
    expect(screen.getByText('No posts yet')).toBeInTheDocument();
  });
});
