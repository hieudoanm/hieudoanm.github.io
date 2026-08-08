import { render, screen } from '@testing-library/react';
import { MarketIndex } from '../MarketIndex';

describe('MarketIndex', () => {
  it('renders name and formatted value', () => {
    render(<MarketIndex name="S&P 500" value={4823.51} change={12.4} />);
    expect(screen.getByText('S&P 500')).toBeInTheDocument();
    expect(screen.getByText('4,823.51')).toBeInTheDocument();
  });

  it('renders a positive change with a plus sign', () => {
    render(<MarketIndex name="S&P 500" value={100} change={2.5} />);
    expect(screen.getByText(/\+2\.50/)).toHaveClass('text-success');
  });

  it('renders a negative change in error color', () => {
    render(<MarketIndex name="Nasdaq" value={100} change={-3.2} />);
    expect(screen.getByText(/-3\.20/)).toHaveClass('text-error');
  });

  it('renders change percent and currency when provided', () => {
    render(
      <MarketIndex
        name="VN-Index"
        value={1250.3}
        change={8.1}
        changePercent={0.65}
        currency="$"
      />
    );
    expect(screen.getByText('$1,250.3')).toBeInTheDocument();
    expect(screen.getByText(/%/)).toBeInTheDocument();
  });
});
