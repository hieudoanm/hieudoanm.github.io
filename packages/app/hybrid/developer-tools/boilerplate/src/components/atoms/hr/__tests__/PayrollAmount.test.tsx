import { render, screen } from '@testing-library/react';
import { PayrollAmount } from '../PayrollAmount';

describe('PayrollAmount', () => {
  it('formats the amount as currency', () => {
    render(<PayrollAmount amount={5000} />);
    expect(screen.getByTestId('payroll-amount')).toHaveTextContent('$5,000');
  });

  it('appends the period label', () => {
    render(<PayrollAmount amount={60000} period="yearly" />);
    expect(screen.getByTestId('payroll-amount')).toHaveTextContent('/yr');
  });

  it('supports a custom currency', () => {
    render(<PayrollAmount amount={1000} currency="EUR" />);
    expect(screen.getByTestId('payroll-amount')).toHaveTextContent('€');
  });
});
