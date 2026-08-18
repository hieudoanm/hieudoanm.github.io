import { render, screen } from '@testing-library/react';
import { InvestmentPortfolio } from '../InvestmentPortfolio';

const holdings = [
  { symbol: 'AAPL', name: 'Apple', value: 5000, change: 1.5 },
  { symbol: 'MSFT', name: 'Microsoft', value: 3200, change: -2 },
];

describe('InvestmentPortfolio', () => {
  it('renders the total value and each holding', () => {
    render(<InvestmentPortfolio holdings={holdings} totalValue={8200} />);
    expect(screen.getByText('$8,200')).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('$5,000')).toBeInTheDocument();
  });

  it('applies a success class for positive changes', () => {
    const { container } = render(
      <InvestmentPortfolio holdings={holdings} totalValue={8200} />
    );
    const changeCell = container.querySelector('td.text-success');
    expect(changeCell).not.toBeNull();
    expect(changeCell).toHaveTextContent('+1.5%');
  });

  it('applies an error class for negative changes', () => {
    const { container } = render(
      <InvestmentPortfolio holdings={holdings} totalValue={8200} />
    );
    expect(container.querySelector('td.text-error')).toHaveTextContent('-2%');
  });

  it('shows an empty state for empty holdings', () => {
    render(<InvestmentPortfolio holdings={[]} totalValue={0} />);
    expect(screen.getByTestId('empty')).toHaveTextContent('No holdings yet.');
  });
});
