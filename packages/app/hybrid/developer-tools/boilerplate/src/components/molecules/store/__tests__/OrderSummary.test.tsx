import { render, screen } from '@testing-library/react';
import { OrderSummary } from '../OrderSummary';

describe('OrderSummary', () => {
  it('renders order number, status and total', () => {
    render(<OrderSummary orderNumber="#1024" status="shipped" total={230.5} />);
    expect(screen.getByText('#1024')).toBeInTheDocument();
    expect(screen.getByTestId('order-status')).toHaveTextContent('shipped');
    expect(screen.getByTestId('order-status')).toHaveClass('badge-info');
    expect(screen.getByTestId('order-total')).toHaveTextContent('$230.50');
  });

  it('maps delivered status to success badge', () => {
    render(<OrderSummary orderNumber="#1" status="delivered" total={10} />);
    expect(screen.getByTestId('order-status')).toHaveClass('badge-success');
  });

  it('shows optional placed, payment and item info', () => {
    render(
      <OrderSummary
        orderNumber="#1"
        status="processing"
        placedAt="Aug 3, 2026"
        paymentMethod="Visa •••• 4242"
        itemCount={2}
        total={10}
      />
    );
    expect(screen.getByText('Aug 3, 2026')).toBeInTheDocument();
    expect(screen.getByText('Visa •••• 4242')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
