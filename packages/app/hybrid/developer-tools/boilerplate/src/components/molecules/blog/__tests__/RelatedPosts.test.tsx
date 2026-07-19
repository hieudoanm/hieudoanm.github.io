import { render, screen } from '@testing-library/react';
import { RelatedPosts } from '../RelatedPosts';

describe('RelatedPosts', () => {
  it('renders a custom title and the list of posts', () => {
    render(
      <RelatedPosts
        title="More from the blog"
        posts={[
          { title: 'Post A', href: '/a', readTime: '3 min' },
          { title: 'Post B' },
        ]}
      />
    );
    expect(screen.getByText('More from the blog')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Post A' })).toHaveAttribute(
      'href',
      '/a'
    );
    expect(screen.getByRole('link', { name: 'Post B' })).toHaveAttribute(
      'href',
      '#'
    );
    expect(screen.getByText('3 min')).toBeInTheDocument();
  });

  it('shows an empty message when there are no posts', () => {
    render(<RelatedPosts posts={[]} />);
    expect(screen.getByText('Related posts')).toBeInTheDocument();
    expect(screen.getByText('No related posts yet.')).toBeInTheDocument();
  });
});
