import { fireEvent, render, screen } from '@testing-library/react';
import { BlogSearchTemplate } from '../BlogSearchTemplate';

describe('BlogSearchTemplate', () => {
  it('renders all posts before any search', () => {
    render(<BlogSearchTemplate />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('All posts')).toBeInTheDocument();
    expect(screen.getByText('App router tips')).toBeInTheDocument();
    expect(screen.getByText('Design tokens')).toBeInTheDocument();
  });

  it('returns matching results with a count', () => {
    render(<BlogSearchTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search posts' }), {
      target: { value: 'rust' },
    });
    expect(screen.getByText('1 results for "rust"')).toBeInTheDocument();
    expect(screen.getByText('Rust at the edge')).toBeInTheDocument();
    expect(screen.queryByText('Design tokens')).not.toBeInTheDocument();
  });

  it('shows empty state when nothing matches', () => {
    render(<BlogSearchTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search posts' }), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('0 results for "zzz"')).toBeInTheDocument();
  });
});
