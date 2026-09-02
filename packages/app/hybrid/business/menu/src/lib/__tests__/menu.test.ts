import {
  accentOptions,
  addItem,
  createRestaurant,
  decodeMenuData,
  deleteRestaurant,
  emptyMenu,
  encodeMenuData,
  itemsForRestaurant,
  money,
  orderSubtotal,
  ordersForRestaurant,
  placeOrder,
  removeItem,
  restaurantById,
  toggleItemAvailable,
  updateItem,
  updateOrderStatus,
  updateRestaurant,
} from '../menu';

const baseRestaurant = () =>
  createRestaurant(emptyMenu(), {
    name: 'Test Diner',
    description: 'A diner',
    accent: 'primary',
    tableCount: 4,
  });

describe('createRestaurant', () => {
  it('creates a restaurant with trimmed fields', () => {
    const { state, restaurant } = createRestaurant(emptyMenu(), {
      name: '  Test Diner  ',
      description: '  Good food  ',
      accent: 'secondary',
      tableCount: 2,
    });
    expect(restaurant.name).toBe('Test Diner');
    expect(restaurant.description).toBe('Good food');
    expect(restaurant.accent).toBe('secondary');
    expect(state.restaurants).toHaveLength(1);
  });

  it('clamps tableCount to 1..99', () => {
    const { restaurant: zero } = createRestaurant(emptyMenu(), {
      name: 'A',
      accent: 'primary',
      tableCount: 0,
    });
    expect(zero.tableCount).toBe(1);
    const { restaurant: big } = createRestaurant(emptyMenu(), {
      name: 'B',
      accent: 'primary',
      tableCount: 500,
    });
    expect(big.tableCount).toBe(99);
  });

  it('falls back to primary accent for invalid accent', () => {
    const { restaurant } = createRestaurant(emptyMenu(), {
      name: 'C',
      accent: 'nope',
      tableCount: 1,
    });
    expect(restaurant.accent).toBe('primary');
  });

  it('provides known accent options', () => {
    expect(accentOptions).toContain('primary');
    expect(accentOptions).toContain('accent');
  });
});

describe('updateRestaurant', () => {
  it('renames a restaurant', () => {
    const { state, restaurant } = baseRestaurant();
    const next = updateRestaurant(state, restaurant.id, { name: 'Renamed' });
    expect(restaurantById(next, restaurant.id)?.name).toBe('Renamed');
  });

  it('leaves other restaurants untouched', () => {
    const { state, restaurant: a } = baseRestaurant();
    const { state: s2, restaurant: b } = createRestaurant(state, {
      name: 'B',
      accent: 'primary',
      tableCount: 1,
    });
    const next = updateRestaurant(s2, a.id, { name: 'A2' });
    expect(restaurantById(next, b.id)?.name).toBe('B');
  });

  it('is idempotent for unknown id', () => {
    const { state } = baseRestaurant();
    const next = updateRestaurant(state, 'missing', { name: 'X' });
    expect(next.restaurants).toHaveLength(1);
  });
});

describe('deleteRestaurant', () => {
  it('removes restaurant, its items, and orders', () => {
    let { state, restaurant } = baseRestaurant();
    const { state: s1 } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'Pizza',
      price: 1000,
      category: 'food',
      emoji: '🍕',
    });
    const { state: s2, order } = placeOrder(s1, {
      restaurantId: restaurant.id,
      lines: [
        { itemId: 'x', name: 'Pizza', emoji: '🍕', price: 1000, quantity: 1 },
      ],
    });
    expect(order.id).toBeTruthy();
    const next = deleteRestaurant(s2, restaurant.id);
    expect(next.restaurants).toHaveLength(0);
    expect(next.items).toHaveLength(0);
    expect(next.orders).toHaveLength(0);
  });
});

describe('items', () => {
  it('sorts items by sortOrder', () => {
    let { state, restaurant } = baseRestaurant();
    const { state: s1 } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'First',
      price: 100,
      category: 'food',
      emoji: 'a',
    });
    const { state: s2 } = addItem(s1, {
      restaurantId: restaurant.id,
      name: 'Second',
      price: 200,
      category: 'food',
      emoji: 'b',
    });
    const items = itemsForRestaurant(s2, restaurant.id);
    expect(items.map((i) => i.name)).toEqual(['First', 'Second']);
  });

  it('assigns incrementing sortOrder', () => {
    let { state, restaurant } = baseRestaurant();
    const { state: s1, item: a } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'A',
      price: 100,
      category: 'food',
      emoji: '🍕',
    });
    const { state: s2, item: b } = addItem(s1, {
      restaurantId: restaurant.id,
      name: 'B',
      price: 200,
      category: 'drink',
      emoji: '🥤',
    });
    expect(a.sortOrder).toBe(1);
    expect(b.sortOrder).toBe(2);
  });

  it('clamps price to non-negative', () => {
    const { state, restaurant } = baseRestaurant();
    const { item } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'Neg',
      price: -5,
      category: 'food',
      emoji: '🍴',
    });
    expect(item.price).toBe(0);
  });

  it('defaults emoji when blank', () => {
    const { state, restaurant } = baseRestaurant();
    const { item } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'X',
      price: 1,
      category: 'food',
      emoji: '  ',
    });
    expect(item.emoji).toBe('🍽️');
  });

  it('updates and removes an item', () => {
    const { state, restaurant } = baseRestaurant();
    const { state: s1, item } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'Burger',
      price: 500,
      category: 'food',
      emoji: '🍔',
    });
    const updated = updateItem(s1, item.id, { name: 'Cheeseburger' });
    expect(itemsForRestaurant(updated, restaurant.id)[0].name).toBe(
      'Cheeseburger'
    );
    const removed = removeItem(updated, item.id);
    expect(itemsForRestaurant(removed, restaurant.id)).toHaveLength(0);
  });

  it('toggles availability', () => {
    const { state, restaurant } = baseRestaurant();
    const { state: s1, item } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'Soup',
      price: 300,
      category: 'food',
      emoji: '🍲',
    });
    expect(item.available).toBe(true);
    const off = toggleItemAvailable(s1, item.id);
    expect(itemsForRestaurant(off, restaurant.id)[0].available).toBe(false);
    const on = toggleItemAvailable(off, item.id);
    expect(itemsForRestaurant(on, restaurant.id)[0].available).toBe(true);
  });
});

describe('orders', () => {
  it('computes subtotal', () => {
    expect(
      orderSubtotal([
        { itemId: 'a', name: 'A', emoji: '🍕', price: 1000, quantity: 2 },
        { itemId: 'b', name: 'B', emoji: '🥤', price: 250, quantity: 1 },
      ])
    ).toBe(2250);
  });

  it('returns 0 for empty lines', () => {
    expect(orderSubtotal([])).toBe(0);
  });

  it('calculates money from cents', () => {
    expect(money(2250)).toContain('22.50');
    expect(money(0)).toContain('0');
  });

  it('places an order with trimmed optional fields', () => {
    let { state, restaurant } = baseRestaurant();
    const { state: s1 } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'Pizza',
      price: 1000,
      category: 'food',
      emoji: '🍕',
    });
    const { state: s2, order } = placeOrder(s1, {
      restaurantId: restaurant.id,
      tableNumber: ' 3 ',
      customerName: '  Alice  ',
      note: '  No onions  ',
      lines: [
        { itemId: 'pizza', name: 'Pizza', emoji: '🍕', price: 1000, quantity: 1 },
      ],
    });
    expect(order.tableNumber).toBe('3');
    expect(order.customerName).toBe('Alice');
    expect(order.note).toBe('No onions');
    expect(order.status).toBe('placed');
    expect(order.subtotal).toBe(1000);
    expect(ordersForRestaurant(s2, restaurant.id)).toHaveLength(1);
  });

  it('only lists orders for the given restaurant', () => {
    let { state, restaurant } = baseRestaurant();
    const { state: s1 } = placeOrder(state, {
      restaurantId: restaurant.id,
      lines: [
        { itemId: 'a', name: 'A', emoji: 'a', price: 100, quantity: 1 },
      ],
    });
    const { state: s2, restaurant: other } = createRestaurant(s1, {
      name: 'Other',
      accent: 'primary',
      tableCount: 1,
    });
    const list = ordersForRestaurant(s2, other.id);
    expect(list).toHaveLength(0);
  });

  it('updates order status', () => {
    let { state, restaurant } = baseRestaurant();
    const { state: s1, order } = placeOrder(state, {
      restaurantId: restaurant.id,
      lines: [
        { itemId: 'a', name: 'A', emoji: 'a', price: 100, quantity: 1 },
      ],
    });
    const next = updateOrderStatus(s1, order.id, 'served');
    expect(ordersForRestaurant(next, restaurant.id)[0].status).toBe('served');
  });
});

describe('query param encoding', () => {
  it('round-trips menu data through encode/decode', () => {
    let { state, restaurant } = baseRestaurant();
    const { state: s1 } = addItem(state, {
      restaurantId: restaurant.id,
      name: 'Pizza',
      price: 1000,
      category: 'food',
      emoji: '🍕',
    });
    const items = itemsForRestaurant(s1, restaurant.id);
    const payload = encodeMenuData(restaurant, items);
    const decoded = decodeMenuData(payload);
    expect(decoded?.restaurant.name).toBe('Test Diner');
    expect(decoded?.items).toHaveLength(1);
    expect(decoded?.items[0].name).toBe('Pizza');
  });

  it('returns null for corrupt payload', () => {
    expect(decodeMenuData('not-valid')).toBeNull();
    expect(decodeMenuData('')).toBeNull();
  });

  it('rejects wrong version', () => {
    const { state, restaurant } = baseRestaurant();
    const payload = encodeMenuData(restaurant, itemsForRestaurant(state, restaurant.id));
    const broken = payload.slice(0, 2) + '9' + payload.slice(3); // corrupt v
    expect(decodeMenuData(broken)).toBeNull();
  });
});