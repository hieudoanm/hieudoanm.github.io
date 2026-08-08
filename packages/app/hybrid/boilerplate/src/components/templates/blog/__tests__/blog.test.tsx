import { fireEvent, render, screen } from '@testing-library/react';
import { BlogItemTemplate } from '../BlogItemTemplate';
import { BlogListTemplate } from '../BlogListTemplate';

const posts = [
  {
    slug: 'post-a',
    title: 'Post A',
    description: 'Description A',
    content: 'Content A',
    date: '2024-01-01',
    author: 'Author A',
    tags: ['react', 'nextjs'],
    readingTime: 5,
    coverImage: '/images/a.png',
  },
  {
    slug: 'post-b',
    title: 'Post B',
    description: 'Description B',
    content: 'Content B',
    date: '2024-02-01',
    author: 'Author B',
    tags: ['rust'],
  },
];

describe('BlogListTemplate', () => {
  it('renders posts and tags', () => {
    render(<BlogListTemplate posts={posts} />);
    expect(screen.getByText('Post A')).toBeInTheDocument();
    expect(screen.getByText('Description B')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'react' })).toBeInTheDocument();
  });

  it('filters posts by tag', () => {
    render(<BlogListTemplate posts={posts} />);
    fireEvent.click(screen.getByRole('button', { name: 'rust' }));
    expect(screen.queryByText('Post A')).not.toBeInTheDocument();
    expect(screen.getByText('Post B')).toBeInTheDocument();
  });

  it('toggles tag off on second click', () => {
    render(<BlogListTemplate posts={posts} />);
    fireEvent.click(screen.getByRole('button', { name: 'react' }));
    expect(screen.getByRole('button', { name: 'react' })).toHaveClass(
      'btn-primary'
    );
    fireEvent.click(screen.getByRole('button', { name: 'react' }));
    expect(screen.getByRole('button', { name: 'react' })).not.toHaveClass(
      'btn-primary'
    );
  });

  it('shows empty state when no posts', () => {
    render(<BlogListTemplate posts={[]} />);
    expect(screen.getByText(/No posts tagged/)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'react' })
    ).not.toBeInTheDocument();
  });

  it('links to individual posts', () => {
    render(<BlogListTemplate posts={posts} />);
    expect(screen.getByRole('link', { name: /Post A/ })).toHaveAttribute(
      'href',
      '/blog/post-a'
    );
  });
});

describe('BlogItemTemplate', () => {
  const recentPosts = [
    { slug: 'post-a', title: 'Post A', date: '2024-01-01' },
    { slug: 'post-b', title: 'Post B', date: '2024-02-01' },
    { slug: 'post-c', title: 'Post C', date: '2024-03-01' },
    { slug: 'post-d', title: 'Post D', date: '2024-04-01' },
  ];

  it('renders post metadata and content', () => {
    render(<BlogItemTemplate post={posts[0]} recentPosts={recentPosts} />);
    expect(screen.getByText('Author A')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('Content A')).toBeInTheDocument();
  });

  it('renders cover image and tags', () => {
    render(<BlogItemTemplate post={posts[0]} recentPosts={recentPosts} />);
    expect(screen.getByAltText('Post A')).toHaveAttribute(
      'src',
      '/images/a.png'
    );
    expect(screen.getByText('nextjs')).toBeInTheDocument();
  });

  it('omits reading time and cover when absent', () => {
    render(<BlogItemTemplate post={posts[1]} recentPosts={recentPosts} />);
    expect(screen.queryByText(/min read/)).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders up to three related posts excluding current', () => {
    render(<BlogItemTemplate post={posts[0]} recentPosts={recentPosts} />);
    expect(screen.getByText('Continue reading')).toBeInTheDocument();
    expect(screen.getByText('Post B')).toBeInTheDocument();
    expect(screen.getByText('Post D')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Post B/ })).toHaveAttribute(
      'href',
      '/blog/post-b'
    );
  });

  it('hides related section when empty', () => {
    render(<BlogItemTemplate post={posts[0]} recentPosts={[]} />);
    expect(screen.queryByText('Continue reading')).not.toBeInTheDocument();
  });
});
