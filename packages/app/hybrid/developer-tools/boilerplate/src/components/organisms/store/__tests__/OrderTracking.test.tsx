import { render, screen } from '@testing-library/react';
import { OrderTracking } from '../OrderTracking';

const timeline = [
  { status: 'placed', label: 'Order placed', time: 'Aug 01' },
  { status: 'shipped', label: 'Shipped', time: 'Aug 02' },
];

describe('OrderTracking', () => {
  it('renders the order id, status and ETA', () => {
    render(
      <OrderTracking
        orderId="A123"
        status="In transit"
        eta="Aug 05"
        items={[{ name: 'Mug', qty: 2 }]}
        timeline={timeline}
      />
    );
    expect(screen.getByText(/Order #A123/)).toBeInTheDocument();
    expect(screen.getByText('In transit')).toBeInTheDocument();
    expect(screen.getByText(/Estimated delivery: Aug 05/)).toBeInTheDocument();
  });

  it('renders order items and timeline entries', () => {
    render(
      <OrderTracking
        orderId="A123"
        status="In transit"
        items={[{ name: 'Mug', qty: 2 }]}
        timeline={timeline}
      />
    );
    expect(screen.getByText('Mug')).toBeInTheDocument();
    expect(screen.getByText('Order placed')).toBeInTheDocument();
    expect(screen.getByText('Shipped')).toBeInTheDocument();
  });
});
