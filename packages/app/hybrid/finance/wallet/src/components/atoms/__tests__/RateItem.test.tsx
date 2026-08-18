import { render, screen } from '@testing-library/react';
import RateItem from '../RateItem';

describe('RateItem', () => {
  it('renders currency code and name', () => {
    render(<RateItem symbol="$" code="USD" name="US Dollar" rate={1.0} />);
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('US Dollar')).toBeInTheDocument();
  });

  it('renders the symbol', () => {
    render(<RateItem symbol="€" code="EUR" name="Euro" rate={0.92} />);
    expect(screen.getByText('€')).toBeInTheDocument();
  });

  it('renders the rate with 4 decimal places', () => {
    render(<RateItem symbol="£" code="GBP" name="British Pound" rate={0.79} />);
    expect(screen.getByText('0.7900')).toBeInTheDocument();
  });
});
