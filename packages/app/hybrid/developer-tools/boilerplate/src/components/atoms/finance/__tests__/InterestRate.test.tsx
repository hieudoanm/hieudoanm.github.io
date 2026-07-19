import { render, screen } from '@testing-library/react';
import { InterestRate } from '../InterestRate';

describe('InterestRate', () => {
  it('renders the rate with two decimals', () => {
    render(<InterestRate rate={3.456} />);
    expect(screen.getByTestId('interest-rate')).toHaveTextContent('3.46%');
  });

  it('defaults to the APY period label', () => {
    render(<InterestRate rate={5} />);
    expect(screen.getByTestId('interest-rate')).toHaveTextContent('APY');
  });

  it('renders a custom period', () => {
    render(<InterestRate rate={1.5} period="APR" />);
    expect(screen.getByTestId('interest-rate')).toHaveTextContent('APR');
  });
});
