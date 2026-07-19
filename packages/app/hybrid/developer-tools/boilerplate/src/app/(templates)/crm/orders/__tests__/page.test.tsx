import { render, screen } from '@testing-library/react';
import OrdersPage from '@/app/(templates)/crm/orders/page';

describe('OrdersPage', () => {
  it('renders the OrdersPage', () => {
    render(<OrdersPage />);
    expect(screen.getByText('6 orders')).toBeInTheDocument();
  });
});
