import { render, screen } from '@testing-library/react';
import { LineItemRow } from '@/components/pos/molecules/LineItemRow';
import type { CartItem } from '@/types/pos';

const cartItem: CartItem = {
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
};

describe('LineItemRow', () => {
  it('renders the item name and quantity', () => {
    render(<LineItemRow cartItem={cartItem} />);
    expect(screen.getByText('Coffee x2')).toBeInTheDocument();
  });

  it('renders the line total', () => {
    render(<LineItemRow cartItem={cartItem} />);
    expect(screen.getByText('$7.00')).toBeInTheDocument();
  });

  it('supports the multiplication sign separator', () => {
    render(<LineItemRow cartItem={cartItem} separator="×" />);
    expect(screen.getByText('Coffee ×2')).toBeInTheDocument();
  });
});
