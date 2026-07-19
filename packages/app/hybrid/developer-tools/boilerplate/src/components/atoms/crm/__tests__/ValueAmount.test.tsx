import { render, screen } from '@testing-library/react';
import { ValueAmount } from '../ValueAmount';

describe('ValueAmount', () => {
  it('formats the value with the default currency', () => {
    render(<ValueAmount value={1000} />);
    expect(screen.getByText('$1,000')).toBeInTheDocument();
  });

  it('formats decimals when configured', () => {
    render(<ValueAmount value={1234.5} decimals={2} />);
    expect(screen.getByText('$1,234.50')).toBeInTheDocument();
  });

  it('renders zero', () => {
    render(<ValueAmount value={0} />);
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('supports a custom currency', () => {
    render(<ValueAmount value={1000} currency="EUR" />);
    expect(screen.getByText('€1,000')).toBeInTheDocument();
  });
});
