import { render, screen } from '@testing-library/react';
import { PortfolioCard } from '../PortfolioCard';

const holdings = [
  { name: 'AAPL', value: 5000, change: 1.2 },
  { name: 'BTC', value: 2500, change: -0.8 },
];

describe('PortfolioCard', () => {
  it('renders total value and holdings', () => {
    render(<PortfolioCard totalValue={7500} holdings={holdings} />);
    expect(screen.getByTestId('portfolio-value')).toHaveTextContent('$7,500');
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
  });

  it('renders positive change badge', () => {
    render(<PortfolioCard totalValue={100} change={2.5} holdings={[]} />);
    expect(screen.getByText('▲ 2.50%')).toBeInTheDocument();
  });

  it('renders per-holding changes', () => {
    render(<PortfolioCard totalValue={7500} holdings={holdings} />);
    expect(screen.getByText('(+1.20%)')).toBeInTheDocument();
    expect(screen.getByText('(-0.80%)')).toBeInTheDocument();
  });

  it('renders without change when prop is omitted', () => {
    render(<PortfolioCard totalValue={100} holdings={[]} />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });
});
