import { fireEvent, render, screen } from '@testing-library/react';
import { SearchFiltersTemplate } from '../SearchFiltersTemplate';

describe('SearchFiltersTemplate', () => {
  it('renders the search form and full results', () => {
    render(<SearchFiltersTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Search Filters' })
    ).toBeInTheDocument();
    expect(screen.getByText('Find your next property.')).toBeInTheDocument();
    expect(screen.getByText('12 properties found')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Price range')).toBeInTheDocument();
    expect(screen.getByLabelText('Bedrooms')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(screen.getByText('Riverside Condo')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Apply filters' })
    ).toBeInTheDocument();
  });

  it('filters results by location and price range', () => {
    render(<SearchFiltersTemplate />);
    fireEvent.change(screen.getByLabelText('Location'), {
      target: { value: 'Downtown' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Apply filters' }));
    expect(screen.getByText('2 properties found')).toBeInTheDocument();
    expect(screen.getByText('Downtown Penthouse')).toBeInTheDocument();
    expect(
      screen.queryByText('Maple Grove Family Home')
    ).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Location'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText('Price range'), {
      target: { value: 'Over $1M' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Apply filters' }));
    expect(screen.getByText('2 properties found')).toBeInTheDocument();
    expect(screen.getByText('Birchwood Estate')).toBeInTheDocument();
    expect(screen.queryByText('Riverside Condo')).not.toBeInTheDocument();
  });
});
