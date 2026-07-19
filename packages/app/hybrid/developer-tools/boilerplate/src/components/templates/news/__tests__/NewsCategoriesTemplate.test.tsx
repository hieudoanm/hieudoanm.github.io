import { fireEvent, render, screen } from '@testing-library/react';
import { NewsCategoriesTemplate } from '../NewsCategoriesTemplate';

describe('NewsCategoriesTemplate', () => {
  it('renders category tiles with article counts', () => {
    render(<NewsCategoriesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Categories' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 categories')).toBeInTheDocument();
    expect(screen.getAllByText('Technology')).toHaveLength(2);
    expect(screen.getByText('24 articles')).toBeInTheDocument();
    expect(screen.getByText('42 articles')).toBeInTheDocument();
  });

  it('filters categories by search', () => {
    render(<NewsCategoriesTemplate />);
    fireEvent.change(screen.getByLabelText('Search categories'), {
      target: { value: 'tech' },
    });
    expect(screen.getAllByText('Technology')).toHaveLength(2);
    expect(screen.queryByText('World News')).not.toBeInTheDocument();
    expect(screen.getByText('1 categories')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search categories'), {
      target: { value: 'health' },
    });
    expect(screen.getByText('15 articles')).toBeInTheDocument();
    expect(screen.getByText('1 categories')).toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', () => {
    render(<NewsCategoriesTemplate />);
    fireEvent.change(screen.getByLabelText('Search categories'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No categories found')).toBeInTheDocument();
    expect(screen.getByText('0 categories')).toBeInTheDocument();
  });
});
