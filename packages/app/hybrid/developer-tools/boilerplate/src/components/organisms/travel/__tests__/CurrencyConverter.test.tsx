import { fireEvent, render, screen } from '@testing-library/react';
import { CurrencyConverter } from '../CurrencyConverter';

describe('CurrencyConverter', () => {
  it('renders the currency selects and amount input', () => {
    render(<CurrencyConverter />);
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('From')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
  });

  it('converts the amount using the fixed rate', () => {
    render(<CurrencyConverter initialAmount={100} />);
    expect(screen.getByTestId('converted-amount')).toHaveTextContent('92.00');
  });

  it('updates the conversion when the amount changes', () => {
    render(<CurrencyConverter />);
    const input = screen.getByLabelText('Amount');
    fireEvent.change(input, { target: { value: '200' } });
    expect(screen.getByTestId('converted-amount')).toHaveTextContent('184.00');
  });

  it('updates the conversion when the target currency changes', () => {
    render(<CurrencyConverter initialAmount={100} />);
    fireEvent.change(screen.getByLabelText('To'), {
      target: { value: 'JPY' },
    });
    expect(screen.getByTestId('converted-amount')).toHaveTextContent(
      '15150.00'
    );
  });
});
