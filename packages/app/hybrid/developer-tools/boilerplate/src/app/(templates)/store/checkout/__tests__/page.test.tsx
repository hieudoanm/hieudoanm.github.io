import { render, screen } from '@testing-library/react';
import CheckoutPage from '@/app/(templates)/store/checkout/page';

describe('CheckoutPage', () => {
  it('renders checkout', () => {
    render(<CheckoutPage />);
    expect(screen.getByText('Shipping information')).toBeInTheDocument();
  });
});
