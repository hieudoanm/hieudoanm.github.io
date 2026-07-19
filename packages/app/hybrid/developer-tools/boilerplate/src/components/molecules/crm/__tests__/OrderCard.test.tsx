import { render, screen } from '@testing-library/react';
import { OrderCard } from '../OrderCard';

describe('OrderCard', () => {
  it('renders order number, customer, date and item count', () => {
    render(
      <OrderCard
        id="1042"
        customer="Acme"
        date="Aug 1, 2026"
        total={1200}
        itemsCount={3}
        status="Shipped"
      />
    );
    expect(screen.getByText('Order #1042')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Aug 1, 2026 · 3 items')).toBeInTheDocument();
  });

  it('renders the formatted total and status', () => {
    render(
      <OrderCard
        id="1042"
        customer="Acme"
        date="D"
        total={1200}
        itemsCount={3}
        status="Shipped"
      />
    );
    expect(screen.getByText('$1,200')).toBeInTheDocument();
    expect(screen.getByText('Shipped')).toBeInTheDocument();
  });
});
