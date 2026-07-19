import { render, screen } from '@testing-library/react';
import { MonthlyStat } from '../MonthlyStat';

describe('MonthlyStat', () => {
  it('renders the label and value', () => {
    render(<MonthlyStat label="Spending" value="$320" />);
    expect(screen.getByText('Spending')).toBeInTheDocument();
    expect(screen.getByTestId('monthly-stat')).toHaveTextContent('$320');
  });

  it('renders numeric values', () => {
    render(<MonthlyStat label="Transactions" value={42} />);
    expect(screen.getByTestId('monthly-stat')).toHaveTextContent('42');
  });

  it('applies the label variant class', () => {
    render(<MonthlyStat label="Income" value={1000} />);
    expect(screen.getByText('Income')).toHaveClass('text-base-content/60');
  });
});
