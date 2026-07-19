import { render, screen } from '@testing-library/react';
import { ArticleList } from '../ArticleList';

describe('ArticleList', () => {
  const articles = [
    {
      id: '1',
      title: 'Getting started',
      excerpt: 'First steps.',
      author: 'Jane',
      date: 'Jan 2026',
      tag: 'Guide',
    },
    { id: '2', title: 'Advanced tips' },
  ];

  it('renders title and article details', () => {
    render(<ArticleList articles={articles} />);
    expect(screen.getByText('Latest articles')).toBeInTheDocument();
    expect(screen.getByText('Getting started')).toBeInTheDocument();
    expect(screen.getByText('First steps.')).toBeInTheDocument();
    expect(screen.getByText('Guide')).toBeInTheDocument();
  });

  it('renders articles without optional fields', () => {
    render(<ArticleList articles={articles} title="Updates" />);
    expect(screen.getByText('Updates')).toBeInTheDocument();
    expect(screen.getByText('Advanced tips')).toBeInTheDocument();
  });

  it('shows an empty message when no articles', () => {
    render(<ArticleList articles={[]} />);
    expect(screen.getByText('No articles yet.')).toBeInTheDocument();
  });
});
