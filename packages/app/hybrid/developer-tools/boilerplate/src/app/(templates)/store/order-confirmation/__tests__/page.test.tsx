import { render, screen } from '@testing-library/react';
import OrderConfirmationPage from '@/app/(templates)/store/order-confirmation/page';

describe('OrderConfirmationPage', () => {
  it('renders order confirmation', () => {
    render(<OrderConfirmationPage />);
    expect(screen.getByText('Order confirmed!')).toBeInTheDocument();
  });
});
