import { fireEvent, render, screen } from '@testing-library/react';
import { CartItem } from '../CartItem';

describe('CartItem', () => {
  it('renders name, unit price and computed line total', () => {
    render(
      <CartItem
        name="Sneakers"
        price={50}
        quantity={3}
        onQuantityChange={jest.fn()}
      />
    );
    expect(screen.getByText('Sneakers')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-quantity')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-item-total')).toHaveTextContent('$150.00');
  });

  it('fires quantity change callbacks on +/- buttons', () => {
    const onQuantityChange = jest.fn();
    render(
      <CartItem
        name="Sneakers"
        price={50}
        quantity={2}
        onQuantityChange={onQuantityChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Increase quantity' }));
    expect(onQuantityChange).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease quantity' }));
    expect(onQuantityChange).toHaveBeenCalledWith(1);
  });

  it('does not decrease below zero', () => {
    const onQuantityChange = jest.fn();
    render(
      <CartItem
        name="Sneakers"
        price={50}
        quantity={0}
        onQuantityChange={onQuantityChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Decrease quantity' }));
    expect(onQuantityChange).toHaveBeenCalledWith(0);
  });

  it('calls onRemove when the remove button is clicked', () => {
    const onRemove = jest.fn();
    render(
      <CartItem
        name="Sneakers"
        price={50}
        quantity={1}
        onQuantityChange={jest.fn()}
        onRemove={onRemove}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove Sneakers' }));
    expect(onRemove).toHaveBeenCalled();
  });
});
