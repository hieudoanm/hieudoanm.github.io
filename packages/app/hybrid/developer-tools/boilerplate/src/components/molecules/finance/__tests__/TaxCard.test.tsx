import { render, screen } from '@testing-library/react';
import { TaxCard } from '../TaxCard';

describe('TaxCard', () => {
  it('renders title, amount and due date', () => {
    render(<TaxCard title="Income Tax" amount={2500} dueDate="Apr 15" />);
    expect(screen.getByText('Income Tax')).toBeInTheDocument();
    expect(screen.getByTestId('tax-amount')).toHaveTextContent('$2,500.00');
    expect(screen.getByText('Due Apr 15')).toBeInTheDocument();
  });

  it('defaults status to pending', () => {
    render(<TaxCard title="Income Tax" amount={2500} dueDate="Apr 15" />);
    expect(screen.getByText('pending')).toHaveClass('badge-warning');
  });

  it('renders paid status', () => {
    render(
      <TaxCard
        title="Income Tax"
        amount={2500}
        dueDate="Apr 15"
        status="paid"
      />
    );
    expect(screen.getByText('paid')).toHaveClass('badge-success');
  });

  it('renders overdue status', () => {
    render(
      <TaxCard
        title="Income Tax"
        amount={2500}
        dueDate="Apr 15"
        status="overdue"
      />
    );
    expect(screen.getByText('overdue')).toHaveClass('badge-error');
  });
});
