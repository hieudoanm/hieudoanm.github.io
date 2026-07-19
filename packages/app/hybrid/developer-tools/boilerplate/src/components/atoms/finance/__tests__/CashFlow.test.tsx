import { render, screen } from '@testing-library/react';
import { CashFlow } from '../CashFlow';

describe('CashFlow', () => {
  it('renders inflow and outflow amounts', () => {
    render(<CashFlow inflow={1000} outflow={400} />);
    expect(screen.getByTestId('cash-flow')).toHaveTextContent('+$1,000.00');
    expect(screen.getByTestId('cash-flow')).toHaveTextContent('-$400.00');
  });

  it('shows the net difference', () => {
    render(<CashFlow inflow={1000} outflow={400} />);
    expect(screen.getByTestId('cash-flow')).toHaveTextContent('Net $600.00');
  });

  it('supports a custom currency', () => {
    render(<CashFlow inflow={200} outflow={100} currency="GBP" />);
    expect(screen.getByTestId('cash-flow')).toHaveTextContent('£100.00');
  });
});
