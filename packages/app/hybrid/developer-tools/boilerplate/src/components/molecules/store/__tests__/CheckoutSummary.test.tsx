import { render, screen } from '@testing-library/react';
import { CheckoutSummary } from '../CheckoutSummary';

describe('CheckoutSummary', () => {
  it('renders subtotal, shipping, tax and total', () => {
    render(
      <CheckoutSummary subtotal={100} shipping={10} tax={8} total={118} />
    );
    expect(screen.getByTestId('checkout-subtotal')).toHaveTextContent(
      '$100.00'
    );
    expect(screen.getByTestId('checkout-total')).toHaveTextContent('$118.00');
  });

  it('shows item count when provided', () => {
    render(<CheckoutSummary subtotal={50} total={50} itemCount={3} />);
    expect(screen.getByTestId('checkout-item-count')).toHaveTextContent(
      '3 items'
    );
  });

  it('shows a discount line only when positive', () => {
    const { rerender } = render(
      <CheckoutSummary subtotal={100} discount={15} total={85} />
    );
    expect(screen.getByText('-$15.00')).toBeInTheDocument();
    rerender(<CheckoutSummary subtotal={100} discount={0} total={100} />);
    expect(screen.queryByText('-$0.00')).not.toBeInTheDocument();
  });
});
