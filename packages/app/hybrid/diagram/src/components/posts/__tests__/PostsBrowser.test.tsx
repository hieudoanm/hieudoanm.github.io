import { fireEvent, render, screen } from '@testing-library/react';
import PostsBrowser, { POSTS_PER_PAGE } from '@/components/posts/PostsBrowser';
import type { PostSummary } from '@/lib/posts';

const posts: PostSummary[] = [
  {
    slug: 'cdn',
    title: 'Content Delivery Network',
    description: 'Edge routing, caching, invalidation.',
    difficulty: 'medium',
    category: 'infrastructure',
    tags: ['cache', 'cdn'],
  },
  {
    slug: 'netflix',
    title: 'Netflix — Streaming',
    description: 'Video-on-demand and CDN delivery.',
    difficulty: 'easy',
    category: 'media',
    tags: ['cdn', 'video'],
  },
  {
    slug: 'stripe',
    title: 'Stripe — Payments',
    description: 'Payments API and idempotency.',
    difficulty: 'hard',
    category: 'ecommerce',
    tags: ['payments'],
  },
];

const manyPosts: PostSummary[] = Array.from(
  { length: POSTS_PER_PAGE * 2 + 3 },
  (_, index) => ({
    slug: `post-${index}`,
    title: `Post ${index}`,
    description: `Shared topic ${index}.`,
    difficulty: 'medium',
    category: 'infrastructure',
    tags: [],
  })
);

describe('PostsBrowser', () => {
  it('shows every post initially', () => {
    render(<PostsBrowser posts={posts} />);
    expect(screen.getByText('Content Delivery Network')).toBeInTheDocument();
    expect(screen.getByText('Netflix — Streaming')).toBeInTheDocument();
    expect(screen.getByText('Stripe — Payments')).toBeInTheDocument();
    expect(screen.getByText('Showing 1–3 of 3 posts')).toBeInTheDocument();
  });

  it('filters posts by search query across name, description, and tags', () => {
    render(<PostsBrowser posts={posts} />);
    const search = screen.getByLabelText('Search posts');

    fireEvent.change(search, { target: { value: 'netflix' } });
    expect(screen.getByText('Netflix — Streaming')).toBeInTheDocument();
    expect(screen.queryByText('Stripe — Payments')).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'payments' } });
    expect(screen.getByText('Stripe — Payments')).toBeInTheDocument();
    expect(
      screen.queryByText('Content Delivery Network')
    ).not.toBeInTheDocument();

    fireEvent.change(search, { target: { value: 'cache' } });
    expect(screen.getByText('Content Delivery Network')).toBeInTheDocument();
    expect(screen.queryByText('Stripe — Payments')).not.toBeInTheDocument();
  });

  it('filters posts by tag and combines tags with AND semantics', () => {
    render(<PostsBrowser posts={posts} />);
    const cdnTag = screen.getByRole('button', { name: 'cdn' });
    const videoTag = screen.getByRole('button', { name: 'video' });

    fireEvent.click(cdnTag);
    expect(screen.getByText('Content Delivery Network')).toBeInTheDocument();
    expect(screen.getByText('Netflix — Streaming')).toBeInTheDocument();
    expect(screen.queryByText('Stripe — Payments')).not.toBeInTheDocument();

    fireEvent.click(videoTag);
    expect(
      screen.queryByText('Content Delivery Network')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Netflix — Streaming')).toBeInTheDocument();
    expect(videoTag).toHaveAttribute('aria-pressed', 'true');
  });

  it('deselects a tag when clicked a second time', () => {
    render(<PostsBrowser posts={posts} />);
    const cdnTag = screen.getByRole('button', { name: 'cdn' });
    fireEvent.click(cdnTag);
    expect(cdnTag).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(cdnTag);
    expect(cdnTag).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Stripe — Payments')).toBeInTheDocument();
  });

  it('clears active tag filters', () => {
    render(<PostsBrowser posts={posts} />);
    fireEvent.click(screen.getByRole('button', { name: 'payments' }));

    expect(
      screen.queryByText('Content Delivery Network')
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getByText('Content Delivery Network')).toBeInTheDocument();
    expect(screen.getByText('Showing 1–3 of 3 posts')).toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', () => {
    render(<PostsBrowser posts={posts} />);
    fireEvent.change(screen.getByLabelText('Search posts'), {
      target: { value: 'zebra' },
    });
    expect(screen.getByText('No posts match your search.')).toBeInTheDocument();
  });

  it('paginates long lists and navigates between pages', () => {
    render(<PostsBrowser posts={manyPosts} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(POSTS_PER_PAGE);
    expect(
      screen.getByText(
        `Showing 1–${POSTS_PER_PAGE} of ${manyPosts.length} posts`
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    expect(
      screen.getByText(
        `Showing ${POSTS_PER_PAGE + 1}–${POSTS_PER_PAGE * 2} of ${manyPosts.length} posts`
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('resets to the first page when filters change', () => {
    render(<PostsBrowser posts={manyPosts} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Search posts'), {
      target: { value: 'topic' },
    });
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(screen.getByText('Post 0')).toBeInTheDocument();
  });
});
