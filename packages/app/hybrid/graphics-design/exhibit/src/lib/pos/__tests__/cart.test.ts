import {
  addItemToCart,
  calculateSubtotal,
  calculateTax,
  removeCartItem,
  updateCartQuantity,
} from '@/lib/pos';
import type { CartItem, Item } from '@/types/pos';

const COFFEE: Item = {
  id: '1',
  name: 'Coffee',
  price: 3.5,
  category: 'Drinks',
  stock: 100,
  lowStockThreshold: 10,
};

const SANDWICH: Item = {
  id: '2',
  name: 'Sandwich',
  price: 6,
  category: 'Food',
  stock: 30,
  lowStockThreshold: 5,
};

describe('calculateSubtotal', () => {
  it('returns 0 for an empty cart', () => {
    expect(calculateSubtotal([])).toBe(0);
  });

  it('multiplies price by quantity and sums lines', () => {
    const items: CartItem[] = [
      { item: COFFEE, quantity: 2, discount: 0 },
      { item: SANDWICH, quantity: 1, discount: 0 },
    ];
    expect(calculateSubtotal(items)).toBe(13);
  });
});

describe('calculateTax', () => {
  it('applies the rate as a percentage of the subtotal', () => {
    expect(calculateTax(200, 10)).toBe(20);
  });
});

describe('addItemToCart', () => {
  it('appends a new line with quantity 1', () => {
    expect(addItemToCart([], COFFEE)).toEqual([
      { item: COFFEE, quantity: 1, discount: 0 },
    ]);
  });

  it('increments quantity when the item is already in the cart', () => {
    const cart: CartItem[] = [{ item: COFFEE, quantity: 2, discount: 0 }];
    expect(addItemToCart(cart, COFFEE)).toEqual([
      { item: COFFEE, quantity: 3, discount: 0 },
    ]);
  });
});

describe('updateCartQuantity', () => {
  const cart: CartItem[] = [
    { item: COFFEE, quantity: 2, discount: 0 },
    { item: SANDWICH, quantity: 1, discount: 0 },
  ];

  it('sets the requested quantity', () => {
    expect(updateCartQuantity(cart, '1', 5)[0].quantity).toBe(5);
  });

  it('removes the line when quantity drops to zero', () => {
    expect(updateCartQuantity(cart, '1', 0)).toEqual([
      { item: SANDWICH, quantity: 1, discount: 0 },
    ]);
  });
});

describe('removeCartItem', () => {
  it('drops the matching line', () => {
    const cart: CartItem[] = [{ item: COFFEE, quantity: 2, discount: 0 }];
    expect(removeCartItem(cart, '1')).toEqual([]);
  });
});
