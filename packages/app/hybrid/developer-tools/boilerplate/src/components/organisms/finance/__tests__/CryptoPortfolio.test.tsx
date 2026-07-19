import { render, screen } from '@testing-library/react';
import { CryptoPortfolio } from '../CryptoPortfolio';

const assets = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.5, value: 15000, change: 2.5 },
  { symbol: 'ETH', name: 'Ethereum', amount: 4, value: 3200, change: -1.1 },
];

describe('CryptoPortfolio', () => {
  it('renders each asset with holdings and value', () => {
    render(<CryptoPortfolio assets={assets} />);
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('$15,000')).toBeInTheDocument();
    expect(screen.getByText('0.5000')).toBeInTheDocument();
  });

  it('applies a success class for rising assets', () => {
    const { container } = render(<CryptoPortfolio assets={assets} />);
    expect(container.querySelector('td.text-success')).toHaveTextContent(
      '+2.5%'
    );
  });

  it('applies an error class for falling assets', () => {
    const { container } = render(<CryptoPortfolio assets={assets} />);
    expect(container.querySelector('td.text-error')).toHaveTextContent('-1.1%');
  });

  it('renders an empty state when there are no assets', () => {
    render(<CryptoPortfolio assets={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent('No crypto assets.');
  });
});
