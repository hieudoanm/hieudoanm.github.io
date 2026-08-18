import { render, screen } from '@testing-library/react';
import { ArticleCard } from '../ArticleCard';

describe('ArticleCard', () => {
  it('renders title, excerpt, author and read time', () => {
    render(
      <ArticleCard
        title="Hello World"
        excerpt="A short excerpt"
        author="Jane Doe"
        readTime="5 min read"
        date="Aug 1, 2026"
      />
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('A short excerpt')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('Aug 1, 2026')).toBeInTheDocument();
  });

  it('renders the category badge when provided', () => {
    render(
      <ArticleCard
        title="T"
        excerpt="E"
        author="A"
        readTime="2 min"
        category="React"
      />
    );
    expect(screen.getByText('React')).toHaveClass('badge-primary');
  });

  it('renders read more link with the href', () => {
    render(
      <ArticleCard
        title="T"
        excerpt="E"
        author="A"
        readTime="2 min"
        href="/posts/hello"
      />
    );
    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute(
      'href',
      '/posts/hello'
    );
  });
});
