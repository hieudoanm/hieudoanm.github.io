import { render, screen } from '@testing-library/react';
import { ExpenseIcon } from '../ExpenseIcon';

describe('ExpenseIcon', () => {
  it('renders an image with an expense label', () => {
    render(<ExpenseIcon />);
    expect(screen.getByRole('img', { name: 'expense' })).toBeInTheDocument();
  });

  it('applies error color classes', () => {
    render(<ExpenseIcon />);
    expect(screen.getByTestId('expense-icon')).toHaveClass('text-error');
  });

  it('honors a custom size', () => {
    render(<ExpenseIcon size="lg" />);
    expect(screen.getByTestId('expense-icon')).toHaveClass('w-10');
  });
});
