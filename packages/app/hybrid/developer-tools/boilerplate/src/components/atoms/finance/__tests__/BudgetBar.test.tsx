import { render, screen } from '@testing-library/react';
import { BudgetBar } from '../BudgetBar';

describe('BudgetBar', () => {
  it('renders the label and a progress bar', () => {
    render(<BudgetBar label="Food" value={50} />);
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByTestId('budget-bar-progress')).toHaveAttribute(
      'value',
      '50'
    );
  });

  it('computes percent relative to max', () => {
    render(<BudgetBar value={25} max={100} />);
    expect(screen.getByTestId('budget-bar-progress')).toHaveAttribute(
      'value',
      '25'
    );
  });

  it('caps the value at 100 percent', () => {
    render(<BudgetBar value={150} max={100} />);
    expect(screen.getByTestId('budget-bar-progress')).toHaveAttribute(
      'value',
      '100'
    );
  });

  it('does not crash with a zero max', () => {
    render(<BudgetBar value={10} max={0} />);
    expect(screen.getByTestId('budget-bar-progress')).toHaveAttribute(
      'value',
      '0'
    );
  });
});
