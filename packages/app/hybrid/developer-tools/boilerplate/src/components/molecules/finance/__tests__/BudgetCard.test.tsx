import { render, screen } from '@testing-library/react';
import { BudgetCard } from '../BudgetCard';

describe('BudgetCard', () => {
  it('renders name, spent and limit', () => {
    render(<BudgetCard name="Groceries" spent={400} limit={500} />);
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByTestId('budget-spent')).toHaveTextContent('$400');
    expect(screen.getByText('of $500')).toBeInTheDocument();
  });

  it('shows percentage used', () => {
    render(<BudgetCard name="Groceries" spent={250} limit={1000} />);
    expect(screen.getByText('25% used')).toBeInTheDocument();
  });

  it('shows remaining amount', () => {
    render(<BudgetCard name="Groceries" spent={300} limit={500} />);
    expect(screen.getByTestId('budget-remaining')).toHaveTextContent(
      '$200 left'
    );
  });

  it('reports over budget when limit exceeded', () => {
    render(<BudgetCard name="Groceries" spent={600} limit={500} />);
    expect(screen.getByTestId('budget-remaining')).toHaveTextContent(
      'Over by $100'
    );
  });
});
