import { render, screen } from '@testing-library/react';
import { PaymentCard } from '../PaymentCard';

describe('PaymentCard', () => {
  it('renders provider and masked number', () => {
    render(<PaymentCard provider="Visa" last4="4242" />);
    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getByTestId('payment-number')).toHaveTextContent('•••• 4242');
  });

  it('shows holder and expiry', () => {
    render(
      <PaymentCard
        provider="Visa"
        last4="4242"
        holder="John Doe"
        expiry="12/28"
      />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Exp 12/28')).toBeInTheDocument();
  });

  it('marks primary card', () => {
    render(<PaymentCard provider="Visa" last4="4242" primary />);
    expect(screen.getByText('Primary')).toBeInTheDocument();
  });

  it('does not show primary badge by default', () => {
    render(<PaymentCard provider="Visa" last4="4242" />);
    expect(screen.queryByText('Primary')).not.toBeInTheDocument();
  });
});
