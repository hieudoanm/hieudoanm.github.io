import { render, screen } from '@testing-library/react';
import { ArticleCard } from '../ArticleCard';

describe('ArticleCard', () => {
  it('renders the article title', () => {
    render(<ArticleCard title="Markets rally on rate news" />);
    expect(screen.getByText('Markets rally on rate news')).toBeInTheDocument();
  });

  it('renders category, author and date when provided', () => {
    render(
      <ArticleCard
        title="Markets rally"
        category="Finance"
        author="Jane Doe"
        date="Jan 15, 2024"
      />
    );
    expect(screen.getByText('Finance')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('renders excerpt when provided', () => {
    render(<ArticleCard title="Markets rally" excerpt="A short summary." />);
    expect(screen.getByText('A short summary.')).toBeInTheDocument();
  });

  it('renders read more link when href provided', () => {
    render(<ArticleCard title="Markets rally" href="/stories/markets" />);
    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute(
      'href',
      '/stories/markets'
    );
  });
});
