import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionFilters from '../TransactionFilters';

describe('TransactionFilters', () => {
  it('renders search input', () => {
    render(
      <TransactionFilters
        search=""
        filter="all"
        dateFrom=""
        dateTo=""
        category="All"
        amountMin=""
        amountMax=""
        onSearchChange={() => {}}
        onFilterChange={() => {}}
        onDateFromChange={() => {}}
        onDateToChange={() => {}}
        onCategoryChange={() => {}}
        onAmountMinChange={() => {}}
        onAmountMaxChange={() => {}}
      />
    );
    expect(
      screen.getByPlaceholderText('Search transactions...')
    ).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(
      <TransactionFilters
        search=""
        filter="all"
        dateFrom=""
        dateTo=""
        category="All"
        amountMin=""
        amountMax=""
        onSearchChange={() => {}}
        onFilterChange={() => {}}
        onDateFromChange={() => {}}
        onDateToChange={() => {}}
        onCategoryChange={() => {}}
        onAmountMinChange={() => {}}
        onAmountMaxChange={() => {}}
      />
    );
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expense')).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', async () => {
    const onSearchChange = jest.fn();
    render(
      <TransactionFilters
        search=""
        filter="all"
        dateFrom=""
        dateTo=""
        category="All"
        amountMin=""
        amountMax=""
        onSearchChange={onSearchChange}
        onFilterChange={() => {}}
        onDateFromChange={() => {}}
        onDateToChange={() => {}}
        onCategoryChange={() => {}}
        onAmountMinChange={() => {}}
        onAmountMaxChange={() => {}}
      />
    );
    await userEvent.type(
      screen.getByPlaceholderText('Search transactions...'),
      'test'
    );
    expect(onSearchChange).toHaveBeenCalledTimes(4);
  });

  it('calls onFilterChange when clicking filter button', async () => {
    const onFilterChange = jest.fn();
    render(
      <TransactionFilters
        search=""
        filter="all"
        dateFrom=""
        dateTo=""
        category="All"
        amountMin=""
        amountMax=""
        onSearchChange={() => {}}
        onFilterChange={onFilterChange}
        onDateFromChange={() => {}}
        onDateToChange={() => {}}
        onCategoryChange={() => {}}
        onAmountMinChange={() => {}}
        onAmountMaxChange={() => {}}
      />
    );
    await userEvent.click(screen.getByText('Income'));
    expect(onFilterChange).toHaveBeenCalledWith('income');
  });
});
