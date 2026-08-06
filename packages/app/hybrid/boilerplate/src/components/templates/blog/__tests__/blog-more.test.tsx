import { fireEvent, render, screen } from '@testing-library/react';
import { BlogCategoriesTemplate } from '../BlogCategoriesTemplate';
import { BlogTagsTemplate } from '../BlogTagsTemplate';
import { BlogSearchTemplate } from '../BlogSearchTemplate';
import CategoriesPage from '@/app/(main)/blog/categories/page';
import TagsPage from '@/app/(main)/blog/tags/page';
import SearchPage from '@/app/(main)/blog/search/page';

describe('BlogCategoriesTemplate', () => {
  it('renders all categories with counts', () => {
    render(<BlogCategoriesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Categories' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 categories')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Engineering/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/12 posts/)).toBeInTheDocument();
    expect(screen.getByText(/6 posts/)).toBeInTheDocument();
  });

  it('filters categories by search', () => {
    render(<BlogCategoriesTemplate />);
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Search categories' }),
      {
        target: { value: 'design' },
      }
    );
    expect(screen.getByText('1 categories')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Design/ })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Engineering/ })
    ).not.toBeInTheDocument();
  });

  it('shows empty state when nothing matches', () => {
    render(<BlogCategoriesTemplate />);
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Search categories' }),
      {
        target: { value: 'finance' },
      }
    );
    expect(screen.getByText('No categories found')).toBeInTheDocument();
    expect(screen.getByText('0 categories')).toBeInTheDocument();
  });

  it('expands and collapses a category to reveal posts', () => {
    render(<BlogCategoriesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Product/ }));
    expect(screen.getByText('Shipping a smaller MVP')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Product/ }));
    expect(
      screen.queryByText('Shipping a smaller MVP')
    ).not.toBeInTheDocument();
  });
});

describe('BlogTagsTemplate', () => {
  it('renders all tags and posts', () => {
    render(<BlogTagsTemplate />);
    expect(screen.getByRole('heading', { name: 'Tags' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'nextjs (9)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'rust (7)' })
    ).toBeInTheDocument();
    expect(screen.getByText('App router tips')).toBeInTheDocument();
    expect(screen.getByText('Prompt patterns')).toBeInTheDocument();
  });

  it('filters posts when a tag is selected', () => {
    render(<BlogTagsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'nextjs (9)' }));
    expect(screen.getByText('2 posts tagged nextjs')).toBeInTheDocument();
    expect(screen.getByText('App router tips')).toBeInTheDocument();
    expect(screen.getByText('Server actions')).toBeInTheDocument();
    expect(screen.queryByText('Prompt patterns')).not.toBeInTheDocument();
  });

  it('clears the tag filter', () => {
    render(<BlogTagsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'nextjs (9)' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear filter' }));
    expect(screen.getByText('Prompt patterns')).toBeInTheDocument();
    expect(screen.queryByText('Clear filter')).not.toBeInTheDocument();
  });
});

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

describe('Blog extra pages', () => {
  it('renders the categories page', () => {
    render(<CategoriesPage />);
    expect(
      screen.getByRole('heading', { name: 'Categories' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Engineering/ })
    ).toBeInTheDocument();
  });

  it('renders the tags page', () => {
    render(<TagsPage />);
    expect(screen.getByRole('heading', { name: 'Tags' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'nextjs (9)' })
    ).toBeInTheDocument();
  });

  it('renders the search page', () => {
    render(<SearchPage />);
    expect(screen.getByRole('heading', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByText('All posts')).toBeInTheDocument();
  });
});
