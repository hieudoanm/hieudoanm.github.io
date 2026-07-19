import { render, screen } from '@testing-library/react';
import { BudgetOverview } from '../BudgetOverview';

describe('BudgetOverview', () => {
  it('renders budgets with spent and limit amounts', () => {
    render(
      <BudgetOverview
        budgets={[
          { category: 'Groceries', spent: 320, limit: 400 },
          { category: 'Rent', spent: 1200, limit: 1200 },
        ]}
      />
    );
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('$320 / $400')).toBeInTheDocument();
    expect(screen.getByText('$1,200 / $1,200')).toBeInTheDocument();
  });

  it('applies a success progress class for low usage', () => {
    const { container } = render(
      <BudgetOverview
        budgets={[{ category: 'Groceries', spent: 100, limit: 400 }]}
      />
    );
    expect(container.querySelector('.progress-success')).not.toBeNull();
  });

  it('applies an error progress class when the limit is reached', () => {
    const { container } = render(
      <BudgetOverview
        budgets={[{ category: 'Rent', spent: 1200, limit: 1200 }]}
      />
    );
    expect(container.querySelector('.progress-error')).not.toBeNull();
  });

  it('renders an empty state when no budgets exist', () => {
    render(<BudgetOverview budgets={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No budgets defined.'
    );
  });
});
