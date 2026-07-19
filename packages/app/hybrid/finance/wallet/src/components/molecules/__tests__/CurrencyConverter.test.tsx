import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyConverter from '../CurrencyConverter';
import { currencyRates } from '@/data/mock';

describe('CurrencyConverter', () => {
  const defaultProps = {
    amount: '1000',
    from: 'USD',
    to: 'EUR',
    rates: currencyRates,
    converted: 920,
    rate: 0.92,
    onAmountChange: jest.fn(),
    onFromChange: jest.fn(),
    onToChange: jest.fn(),
    onSwap: jest.fn(),
    onConvert: jest.fn(),
  };

  it('renders amount input', () => {
    render(<CurrencyConverter {...defaultProps} />);
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('renders converted amount', () => {
    render(<CurrencyConverter {...defaultProps} />);
    expect(screen.getByText('€920.00')).toBeInTheDocument();
  });

  it('renders exchange rate', () => {
    render(<CurrencyConverter {...defaultProps} />);
    expect(screen.getByText('1 USD = 0.9200 EUR')).toBeInTheDocument();
  });

  it('renders Convert button', () => {
    render(<CurrencyConverter {...defaultProps} />);
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });

  it('calls onSwap when swap button is clicked', async () => {
    const onSwap = jest.fn();
    render(<CurrencyConverter {...defaultProps} onSwap={onSwap} />);
    await userEvent.click(
      screen.getByRole('button', { name: 'Swap currencies' })
    );
    expect(onSwap).toHaveBeenCalled();
  });
});
