import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '../Cart';
import { CartItem } from '@/types/pos';

const ITEMS: CartItem[] = [
  {
    item: {
      id: '1',
      name: 'Coffee',
      price: 3.5,
      category: 'Drinks',
      stock: 100,
      lowStockThreshold: 10,
    },
    quantity: 2,
    discount: 0,
  },
  {
    item: {
      id: '2',
      name: 'Sandwich',
      price: 6.0,
      category: 'Food',
      stock: 30,
      lowStockThreshold: 5,
    },
    quantity: 1,
    discount: 0,
  },
];

describe('Cart', () => {
  it('renders empty state when no items', () => {
    render(
      <Cart
        items={[]}
        onUpdateQuantity={jest.fn()}
        onRemove={jest.fn()}
        onCheckout={jest.fn()}
      />
    );
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('renders item names and quantities', () => {
    render(
      <Cart
        items={ITEMS}
        onUpdateQuantity={jest.fn()}
        onRemove={jest.fn()}
        onCheckout={jest.fn()}
      />
    );
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Sandwich')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders subtotal', () => {
    render(
      <Cart
        items={ITEMS}
        onUpdateQuantity={jest.fn()}
        onRemove={jest.fn()}
        onCheckout={jest.fn()}
      />
    );
    expect(screen.getByText('$13.00')).toBeInTheDocument();
  });

  it('calls onCheckout when checkout button is clicked', () => {
    const onCheckout = jest.fn();
    render(
      <Cart
        items={ITEMS}
        onUpdateQuantity={jest.fn()}
        onRemove={jest.fn()}
        onCheckout={onCheckout}
      />
    );
    fireEvent.click(screen.getByText('Checkout'));
    expect(onCheckout).toHaveBeenCalled();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(
      <Cart
        items={ITEMS}
        onUpdateQuantity={jest.fn()}
        onRemove={onRemove}
        onCheckout={jest.fn()}
      />
    );
    const buttons = screen.getAllByRole('button');
    const trashBtn = buttons.find((btn) =>
      btn.className.includes('text-error')
    );
    if (trashBtn) fireEvent.click(trashBtn);
    expect(onRemove).toHaveBeenCalled();
  });

  it('calls onUpdateQuantity with incremented value when plus is clicked', () => {
    const onUpdateQuantity = jest.fn();
    render(
      <Cart
        items={ITEMS}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={jest.fn()}
        onCheckout={jest.fn()}
      />
    );
    const buttons = screen.getAllByRole('button');
    const itemButtons = buttons.filter(
      (btn) =>
        !btn.className.includes('text-error') &&
        btn.className.includes('btn-ghost')
    );
    fireEvent.click(itemButtons[1]);
    expect(onUpdateQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('calls onUpdateQuantity with decremented value when minus is clicked', () => {
    const onUpdateQuantity = jest.fn();
    render(
      <Cart
        items={ITEMS}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={jest.fn()}
        onCheckout={jest.fn()}
      />
    );
    const buttons = screen.getAllByRole('button');
    const itemButtons = buttons.filter(
      (btn) =>
        !btn.className.includes('text-error') &&
        btn.className.includes('btn-ghost')
    );
    fireEvent.click(itemButtons[0]);
    expect(onUpdateQuantity).toHaveBeenCalledWith('1', 1);
  });
});
