import { render, screen } from '@testing-library/react';
import { StockChart } from '../StockChart';

const points = [
  { label: 'Mon', value: 150 },
  { label: 'Tue', value: 165 },
  { label: 'Wed', value: 160 },
];

describe('StockChart', () => {
  it('renders title and point labels', () => {
    render(<StockChart points={points} />);
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
  });

  it('renders one bar per point', () => {
    render(<StockChart points={points} />);
    expect(screen.getAllByTestId('stock-chart-bar')).toHaveLength(3);
  });

  it('uses the provided title', () => {
    render(<StockChart points={points} title="Portfolio value" />);
    expect(screen.getByText('Portfolio value')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<StockChart points={[]} />);
    expect(screen.getByText('No chart data')).toBeInTheDocument();
  });
});
