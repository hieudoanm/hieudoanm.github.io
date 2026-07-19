import { fireEvent, render, screen } from '@testing-library/react';
import { ExchangeCard } from '../ExchangeCard';

describe('ExchangeCard', () => {
  it('renders amounts with currency codes', () => {
    render(<ExchangeCard from="USD" to="EUR" amount={100} rate={0.85} />);
    expect(screen.getByTestId('exchange-amount')).toHaveTextContent('100 USD');
    expect(screen.getByTestId('exchange-converted')).toHaveTextContent(
      '85 EUR'
    );
  });

  it('uses converted amount when provided', () => {
    render(
      <ExchangeCard
        from="USD"
        to="EUR"
        amount={100}
        rate={0.85}
        converted={80}
      />
    );
    expect(screen.getByTestId('exchange-converted')).toHaveTextContent(
      '80 EUR'
    );
  });

  it('shows the exchange rate', () => {
    render(<ExchangeCard from="USD" to="EUR" amount={100} rate={0.85} />);
    expect(screen.getByText('1 USD = 0.85 EUR')).toBeInTheDocument();
  });

  it('calls onSwap', () => {
    const onSwap = jest.fn();
    render(
      <ExchangeCard
        from="USD"
        to="EUR"
        amount={100}
        rate={0.85}
        onSwap={onSwap}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Swap currencies' }));
    expect(onSwap).toHaveBeenCalledTimes(1);
  });
});
