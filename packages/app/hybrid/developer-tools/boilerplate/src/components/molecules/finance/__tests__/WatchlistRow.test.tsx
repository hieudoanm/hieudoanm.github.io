import { fireEvent, render, screen } from '@testing-library/react';
import { WatchlistRow } from '../WatchlistRow';

describe('WatchlistRow', () => {
  it('renders symbol, name and price', () => {
    render(
      <WatchlistRow symbol="AAPL" name="Apple" price={175.3} change={1.2} />
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getAllByText('AAPL')).toHaveLength(2);
    expect(screen.getByTestId('watchlist-price')).toHaveTextContent('$175.30');
  });

  it('renders positive change in green', () => {
    render(
      <WatchlistRow symbol="AAPL" name="Apple" price={175} change={1.2} />
    );
    expect(screen.getByText('▲ 1.20%')).toHaveClass('text-success');
  });

  it('renders negative change in red', () => {
    render(
      <WatchlistRow symbol="AAPL" name="Apple" price={175} change={-2.5} />
    );
    expect(screen.getByText('▼ 2.50%')).toHaveClass('text-error');
  });

  it('calls onSelect with the symbol', () => {
    const onSelect = jest.fn();
    render(
      <WatchlistRow
        symbol="AAPL"
        name="Apple"
        price={175}
        change={1}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByTestId('watchlist-row'));
    expect(onSelect).toHaveBeenCalledWith('AAPL');
  });
});
