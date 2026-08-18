import { render, screen } from '@testing-library/react';
import PaymentMethodsPage from '@/app/(templates)/store/payment-methods/page';

describe('PaymentMethodsPage', () => {
  it('renders the payment methods page', () => {
    render(<PaymentMethodsPage />);
    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
  });
});
