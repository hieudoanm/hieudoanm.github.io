import { fireEvent, render, screen } from '@testing-library/react';
import CategoriesPage from '@/app/(templates)/store/categories/page';
import { CategoriesTemplate } from '../CategoriesTemplate';

describe('CategoriesTemplate', () => {
  it('renders categories with counts', () => {
    render(<CategoriesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Browse categories' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 categories')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('24 items')).toBeInTheDocument();
  });

  it('filters categories by search', () => {
    render(<CategoriesTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search categories'), {
      target: { value: 'audio' },
    });
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    expect(screen.getByText('1 categories')).toBeInTheDocument();
  });

  it('expands a category to show its products', () => {
    render(<CategoriesTemplate />);
    expect(screen.queryByText('Wireless Mouse')).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Electronics 24 items' })
    );
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Electronics 24 items' })
    );
    expect(screen.queryByText('Wireless Mouse')).not.toBeInTheDocument();
  });

  it('shows the empty state when no category matches', () => {
    render(<CategoriesTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search categories'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No categories found')).toBeInTheDocument();
  });

  it('renders the CategoriesPage', () => {
    render(<CategoriesPage />);
    expect(screen.getByText('4 categories')).toBeInTheDocument();
  });
});
