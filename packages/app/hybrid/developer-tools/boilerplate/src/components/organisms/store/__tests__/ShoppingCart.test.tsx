import { fireEvent, render, screen } from '@testing-library/react';
import { ShoppingCart } from '../ShoppingCart';

const items = [
  { id: 'i1', name: 'Mug', price: 10, qty: 2 },
  { id: 'i2', name: 'Tote', price: 5, qty: 1 },
];

describe('ShoppingCart', () => {
  it('renders items with quantities and computed subtotal', () => {
    render(<ShoppingCart items={items} />);
    expect(screen.getByText('Mug')).toBeInTheDocument();
    expect(screen.getByText('Tote')).toBeInTheDocument();
    expect(screen.getByTestId('subtotal')).toHaveTextContent('$25.00');
  });

  it('updates the subtotal when a quantity is increased', () => {
    render(<ShoppingCart items={items} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Increase quantity for Mug' })
    );
    expect(screen.getByTestId('subtotal')).toHaveTextContent('$35.00');
  });

  it('never decreases quantity below one', () => {
    render(<ShoppingCart items={items} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Decrease quantity for Tote' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Decrease quantity for Tote' })
    );
    expect(screen.getByTestId('qty-i2')).toHaveTextContent('1');
  });

  it('fires onRemove and onCheckout callbacks', () => {
    const onRemove = jest.fn();
    const onCheckout = jest.fn();
    render(
      <ShoppingCart items={items} onRemove={onRemove} onCheckout={onCheckout} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove Mug' }));
    expect(onRemove).toHaveBeenCalledWith('i1');
    fireEvent.click(screen.getByRole('button', { name: 'Checkout' }));
    expect(onCheckout).toHaveBeenCalled();
  });
});
