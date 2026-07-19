import { fireEvent, render, screen } from '@testing-library/react';
import { SearchFilters } from '../SearchFilters';

describe('SearchFilters', () => {
  it('renders search input and sort select', () => {
    render(<SearchFilters />);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Sort by' })
    ).toBeInTheDocument();
  });

  it('calls onSearch with the query when Search is clicked', () => {
    const onSearch = jest.fn();
    render(<SearchFilters onSearch={onSearch} />);
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Hanoi' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(onSearch).toHaveBeenCalledWith('Hanoi');
  });

  it('renders custom sort options', () => {
    render(<SearchFilters sortOptions={['Cheapest', 'Fastest']} />);
    expect(
      screen.getByRole('option', { name: 'Cheapest' })
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Fastest' })).toBeInTheDocument();
  });
});
