import { render, screen } from '@testing-library/react';
import { ArticleList } from '../ArticleList';

const articles = [
  { id: '1', title: 'First story', section: 'World', excerpt: 'Short one.' },
  { id: '2', title: 'Second story' },
];

describe('ArticleList', () => {
  it('renders the title and all articles', () => {
    render(<ArticleList articles={articles} title="Top Stories" />);
    expect(screen.getByText('Top Stories')).toBeInTheDocument();
    expect(screen.getByText('First story')).toBeInTheDocument();
    expect(screen.getByText('Second story')).toBeInTheDocument();
  });

  it('renders section and excerpt when present', () => {
    render(<ArticleList articles={articles} />);
    expect(screen.getByText('World')).toBeInTheDocument();
    expect(screen.getByText('Short one.')).toBeInTheDocument();
  });

  it('renders an empty state when no articles', () => {
    render(<ArticleList articles={[]} />);
    expect(screen.getByText('No articles yet.')).toBeInTheDocument();
  });

  it('renders article links when href is provided', () => {
    render(
      <ArticleList articles={[{ id: '3', title: 'Linked', href: '/x' }]} />
    );
    expect(screen.getByRole('link', { name: 'Linked' })).toHaveAttribute(
      'href',
      '/x'
    );
  });
});
