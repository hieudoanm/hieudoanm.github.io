import { fireEvent, render, screen } from '@testing-library/react';
import { ArticleTemplate } from '../ArticleTemplate';

describe('ArticleTemplate', () => {
  it('renders the article with meta and body', () => {
    render(<ArticleTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Article' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('The Future of Urban Transit Is Electric')
    ).toBeInTheDocument();
    expect(screen.getByText('Maya Chen')).toBeInTheDocument();
    expect(screen.getByText('Aug 5, 2026')).toBeInTheDocument();
    expect(screen.getByText('6 min read')).toBeInTheDocument();
    expect(screen.getByText('128 likes')).toBeInTheDocument();
  });

  it('toggles the like count', () => {
    render(<ArticleTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Like' }));
    expect(screen.getByText('129 likes')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Unlike' }));
    expect(screen.getByText('128 likes')).toBeInTheDocument();
  });

  it('toggles the bookmark state', () => {
    render(<ArticleTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Bookmark' }));
    expect(
      screen.getByRole('button', { name: 'Bookmarked' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Bookmarked' }));
    expect(
      screen.getByRole('button', { name: 'Bookmark' })
    ).toBeInTheDocument();
  });
});
