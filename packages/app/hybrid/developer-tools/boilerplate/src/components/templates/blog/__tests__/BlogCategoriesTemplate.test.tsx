import { fireEvent, render, screen } from '@testing-library/react';
import { BlogCategoriesTemplate } from '../BlogCategoriesTemplate';

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
