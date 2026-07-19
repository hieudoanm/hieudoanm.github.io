import { render, screen } from '@testing-library/react';
import { OrderHistory } from '../OrderHistory';

describe('OrderHistory', () => {
  it('renders orders with totals and statuses', () => {
    render(
      <OrderHistory
        orders={[
          {
            id: '1',
            number: 'ORD-100',
            date: 'Feb 2026',
            total: 89.99,
            status: 'delivered',
            summary: '2 items',
          },
        ]}
      />
    );
    expect(screen.getByText('Order history')).toBeInTheDocument();
    expect(screen.getByText('ORD-100')).toBeInTheDocument();
    expect(screen.getByText('$89.99')).toBeInTheDocument();
    expect(screen.getByText('delivered')).toBeInTheDocument();
    expect(screen.getByText('2 items')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<OrderHistory orders={[]} />);
    expect(screen.getByText('No orders yet.')).toBeInTheDocument();
  });
});
