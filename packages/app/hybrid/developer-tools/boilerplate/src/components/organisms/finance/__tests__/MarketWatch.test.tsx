import { render, screen } from '@testing-library/react';
import { MarketWatch } from '../MarketWatch';

const quotes = [
  { symbol: 'AAPL', name: 'Apple', price: 185.3, change: 0.8 },
  { symbol: 'TSLA', name: 'Tesla', price: 245, change: -1.2 },
];

describe('MarketWatch', () => {
  it('renders each quote with price and change', () => {
    render(<MarketWatch quotes={quotes} />);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('$185.30')).toBeInTheDocument();
    expect(screen.getByText('▲ 0.8%')).toBeInTheDocument();
    expect(screen.getByText('▼ 1.2%')).toBeInTheDocument();
  });

  it('applies the success class to rising quotes', () => {
    const { container } = render(<MarketWatch quotes={quotes} />);
    const rising = container.querySelector('td.text-success');
    expect(rising).not.toBeNull();
    expect(rising).toHaveTextContent('▲ 0.8%');
  });

  it('applies the error class to falling quotes', () => {
    const { container } = render(<MarketWatch quotes={quotes} />);
    expect(container.querySelector('td.text-error')).toHaveTextContent(
      '▼ 1.2%'
    );
  });

  it('renders an empty state when there are no quotes', () => {
    render(<MarketWatch quotes={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No market data available.'
    );
  });
});
