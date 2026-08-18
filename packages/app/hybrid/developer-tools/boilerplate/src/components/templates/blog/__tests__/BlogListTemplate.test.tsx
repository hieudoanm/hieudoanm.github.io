import { fireEvent, render, screen } from '@testing-library/react';
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
