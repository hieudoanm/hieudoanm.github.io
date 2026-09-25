import { render, screen } from '@testing-library/react';
import BudgetSummary from '../BudgetSummary';

describe('BudgetSummary', () => {
  it('renders total spent', () => {
    render(<BudgetSummary totalSpent={1580} totalLimit={2050} />);
    expect(screen.getByText('$1,580.00')).toBeInTheDocument();
  });

  it('renders total budget', () => {
    render(<BudgetSummary totalSpent={1580} totalLimit={2050} />);
    expect(screen.getByText('$2,050.00')).toBeInTheDocument();
  });

  it('renders remaining amount', () => {
    render(<BudgetSummary totalSpent={1580} totalLimit={2050} />);
    expect(screen.getByText('$470.00 remaining')).toBeInTheDocument();
  });
});
