import {
  accentOptions,
  addItem,
  createRestaurant,
  decodeMenuData,
  deleteRestaurant,
  emptyMenu,
  encodeMenuData,
  itemsForRestaurant,
  makeCustomerUrl,
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
} from '@/lib/menu/menu';
import type {
  MenuItem,
  MenuState,
  Order,
  OrderLine,
  Restaurant,
} from '@/types/menu/menu';

const restaurant = (overrides: Partial<Restaurant> = {}): Restaurant => ({
  id: 'r1',
  name: 'Bistro',
  accent: 'primary',
  tableCount: 10,
  createdAt: '2026-01-01T00:00:00.000Z',
  ...overrides,
});

const item = (overrides: Partial<MenuItem> = {}): MenuItem => ({
  id: 'i1',
  restaurantId: 'r1',
  name: 'Soup',
  price: 500,
  category: 'food',
  emoji: '🥣',
  available: true,
  sortOrder: 1,
  createdAt: '2026-01-01T00:00:00.000Z',
  ...overrides,
});

const order = (overrides: Partial<Order> = {}): Order => ({
  id: 'o1',
  restaurantId: 'r1',
  lines: [],
  subtotal: 0,
  createdAt: '2026-01-01T00:00:00.000Z',
  status: 'placed',
  ...overrides,
});

const state = (overrides: Partial<MenuState> = {}): MenuState => ({
  ...emptyMenu(),
  ...overrides,
});

const line = (overrides: Partial<OrderLine> = {}): OrderLine => ({
  itemId: 'i1',
  name: 'Soup',
  emoji: '🥣',
  price: 500,
  quantity: 2,
  ...overrides,
});

describe('emptyMenu', () => {
  it('starts with no restaurants, items, or orders', () => {
    expect(emptyMenu()).toEqual({
      restaurants: [],
      items: [],
      orders: [],
    });
  });

  it('returns a fresh object on each call', () => {
    const first = emptyMenu();
    const second = emptyMenu();
    expect(first).not.toBe(second);
    expect(first.restaurants).not.toBe(second.restaurants);
  });
});

describe('accentOptions', () => {
  it('includes primary and the daisyUI status colors', () => {
    expect(accentOptions).toContain('primary');
    expect(accentOptions).toContain('secondary');
    expect(accentOptions).toContain('error');
  });
});

describe('createRestaurant', () => {
  it('trims the name and stores the accent', () => {
    const { restaurant: created } = createRestaurant(emptyMenu(), {
      name: '  Bistro  ',
      accent: 'secondary',
      tableCount: 8,
    });
    expect(created.name).toBe('Bistro');
    expect(created.accent).toBe('secondary');
    expect(created.tableCount).toBe(8);
  });

  it('appends the restaurant to state', () => {
    const { state: next } = createRestaurant(emptyMenu(), {
      name: 'Bistro',
      accent: 'primary',
      tableCount: 4,
    });
    expect(next.restaurants).toHaveLength(1);
  });

  it('keeps a provided description', () => {
    const { restaurant: created } = createRestaurant(emptyMenu(), {
      name: 'Bistro',
      description: '  Italian  ',
      accent: 'primary',
      tableCount: 4,
    });
    expect(created.description).toBe('Italian');
  });

  it('drops a whitespace-only description to undefined', () => {
    const { restaurant: created } = createRestaurant(emptyMenu(), {
      name: 'Bistro',
      description: '   ',
      accent: 'primary',
      tableCount: 4,
    });
    expect(created.description).toBeUndefined();
  });

  it('falls back to primary for an unknown accent', () => {
    const { restaurant: created } = createRestaurant(emptyMenu(), {
      name: 'Bistro',
      accent: 'not-a-color',
      tableCount: 4,
    });
    expect(created.accent).toBe('primary');
  });

  it('clamps tableCount up to at least 1', () => {
    const { restaurant: created } = createRestaurant(emptyMenu(), {
      name: 'Bistro',
      accent: 'primary',
      tableCount: 0,
    });
    expect(created.tableCount).toBe(1);
  });

  it('clamps tableCount down to at most 99', () => {
    const { restaurant: created } = createRestaurant(emptyMenu(), {
      name: 'Bistro',
      accent: 'primary',
      tableCount: 500,
    });
    expect(created.tableCount).toBe(99);
  });
});

describe('updateRestaurant', () => {
  it('patches only the matching restaurant', () => {
    const base = state({
      restaurants: [restaurant({ id: 'r1' }), restaurant({ id: 'r2' })],
    });
    const next = updateRestaurant(base, 'r1', { name: 'Renamed' });
    expect(next.restaurants[0].name).toBe('Renamed');
    expect(next.restaurants[1].name).toBe('Bistro');
  });

  it('leaves state untouched when no id matches', () => {
    const base = state({ restaurants: [restaurant({ id: 'r1' })] });
    const next = updateRestaurant(base, 'missing', { name: 'Renamed' });
    expect(next.restaurants[0].name).toBe('Bistro');
  });
});

describe('deleteRestaurant', () => {
  it('removes the restaurant along with its items and orders', () => {
    const base = state({
      restaurants: [restaurant({ id: 'r1' }), restaurant({ id: 'r2' })],
      items: [
        item({ id: 'i1', restaurantId: 'r1' }),
        item({ id: 'i2', restaurantId: 'r2' }),
      ],
      orders: [order({ id: 'o1', restaurantId: 'r1' })],
    });
    const next = deleteRestaurant(base, 'r1');
    expect(next.restaurants.map((r) => r.id)).toEqual(['r2']);
    expect(next.items.map((i) => i.id)).toEqual(['i2']);
    expect(next.orders).toHaveLength(0);
  });

  it('is a no-op when the id does not exist', () => {
    const base = state({ restaurants: [restaurant({ id: 'r1' })] });
    expect(deleteRestaurant(base, 'nope').restaurants).toHaveLength(1);
  });
});

describe('addItem', () => {
  it('numbers sortOrder from the restaurant item count', () => {
    const base = state({
      items: [
        item({ id: 'i1', restaurantId: 'r1' }),
        item({ id: 'i2', restaurantId: 'r9' }),
      ],
    });
    const { item: created } = addItem(base, {
      restaurantId: 'r1',
      name: '  Pasta  ',
      price: 900,
      category: 'food',
      emoji: '🍝',
    });
    expect(created.sortOrder).toBe(2);
    expect(created.name).toBe('Pasta');
    expect(created.available).toBe(true);
  });

  it('appends the item to state', () => {
    const { state: next } = addItem(emptyMenu(), {
      restaurantId: 'r1',
      name: 'Pasta',
      price: 900,
      category: 'food',
      emoji: '🍝',
    });
    expect(next.items).toHaveLength(1);
  });

  it('keeps a provided description', () => {
    const { item: created } = addItem(emptyMenu(), {
      restaurantId: 'r1',
      name: 'Pasta',
      description: '  Tomato  ',
      price: 900,
      category: 'food',
      emoji: '🍝',
    });
    expect(created.description).toBe('Tomato');
  });

  it('drops a whitespace-only description', () => {
    const { item: created } = addItem(emptyMenu(), {
      restaurantId: 'r1',
      name: 'Pasta',
      description: ' ',
      price: 900,
      category: 'food',
      emoji: '🍝',
    });
    expect(created.description).toBeUndefined();
  });

  it('clamps a negative price to zero', () => {
    const { item: created } = addItem(emptyMenu(), {
      restaurantId: 'r1',
      name: 'Pasta',
      price: -50,
      category: 'food',
      emoji: '🍝',
    });
    expect(created.price).toBe(0);
  });

  it('falls back to a default emoji when blank', () => {
    const { item: created } = addItem(emptyMenu(), {
      restaurantId: 'r1',
      name: 'Pasta',
      price: 900,
      category: 'food',
      emoji: '   ',
    });
    expect(created.emoji).toBe('🍽️');
  });
});

describe('updateItem', () => {
  it('patches only the matching item', () => {
    const base = state({
      items: [item({ id: 'i1' }), item({ id: 'i2', name: 'Salad' })],
    });
    const next = updateItem(base, 'i1', { name: 'Stew' });
    expect(next.items[0].name).toBe('Stew');
    expect(next.items[1].name).toBe('Salad');
  });

  it('leaves items untouched when no id matches', () => {
    const base = state({ items: [item({ id: 'i1' })] });
    expect(updateItem(base, 'missing', { name: 'Stew' }).items[0].name).toBe(
      'Soup'
    );
  });
});

describe('removeItem', () => {
  it('removes the matching item', () => {
    const base = state({ items: [item({ id: 'i1' }), item({ id: 'i2' })] });
    expect(removeItem(base, 'i1').items.map((i) => i.id)).toEqual(['i2']);
  });

  it('is a no-op when the id does not exist', () => {
    const base = state({ items: [item({ id: 'i1' })] });
    expect(removeItem(base, 'missing').items).toHaveLength(1);
  });
});

describe('toggleItemAvailable', () => {
  it('flips available from true to false', () => {
    const base = state({ items: [item({ id: 'i1', available: true })] });
    expect(toggleItemAvailable(base, 'i1').items[0].available).toBe(false);
  });

  it('flips available from false to true', () => {
    const base = state({ items: [item({ id: 'i1', available: false })] });
    expect(toggleItemAvailable(base, 'i1').items[0].available).toBe(true);
  });

  it('leaves other items untouched', () => {
    const base = state({
      items: [item({ id: 'i1' }), item({ id: 'i2', available: false })],
    });
    const next = toggleItemAvailable(base, 'i1');
    expect(next.items[1].available).toBe(false);
  });

  it('is a no-op when the id does not exist', () => {
    const base = state({ items: [item({ id: 'i1' })] });
    expect(toggleItemAvailable(base, 'missing').items[0].available).toBe(true);
  });
});

describe('itemsForRestaurant', () => {
  it('filters by restaurant and sorts by sortOrder', () => {
    const base = state({
      items: [
        item({ id: 'i1', restaurantId: 'r1', sortOrder: 3 }),
        item({ id: 'i2', restaurantId: 'r2', sortOrder: 1 }),
        item({ id: 'i3', restaurantId: 'r1', sortOrder: 2 }),
      ],
    });
    expect(itemsForRestaurant(base, 'r1').map((i) => i.id)).toEqual([
      'i3',
      'i1',
    ]);
  });

  it('returns an empty array for an unknown restaurant', () => {
    expect(itemsForRestaurant(state({ items: [item()] }), 'nope')).toEqual([]);
  });
});

describe('restaurantById', () => {
  it('finds the matching restaurant', () => {
    const base = state({ restaurants: [restaurant({ id: 'r1' })] });
    expect(restaurantById(base, 'r1')?.name).toBe('Bistro');
  });

  it('returns undefined when absent', () => {
    expect(
      restaurantById(state({ restaurants: [restaurant()] }), 'nope')
    ).toBeUndefined();
  });
});

describe('orderSubtotal', () => {
  it('sums price times quantity', () => {
    expect(
      orderSubtotal([
        line({ price: 500, quantity: 2 }),
        line({ price: 250, quantity: 2 }),
      ])
    ).toBe(1500);
  });

  it('returns zero for no lines', () => {
    expect(orderSubtotal([])).toBe(0);
  });

  it('rounds to two decimals', () => {
    expect(orderSubtotal([line({ price: 333, quantity: 3 })])).toBe(999);
  });
});

describe('placeOrder', () => {
  it('stores the order with a computed subtotal and placed status', () => {
    const { order: placed } = placeOrder(emptyMenu(), {
      restaurantId: 'r1',
      lines: [line()],
    });
    expect(placed.status).toBe('placed');
    expect(placed.subtotal).toBe(1000);
  });

  it('appends the order to state', () => {
    const { state: next } = placeOrder(emptyMenu(), {
      restaurantId: 'r1',
      lines: [line()],
    });
    expect(next.orders).toHaveLength(1);
  });

  it('keeps table, customer, and note when provided', () => {
    const { order: placed } = placeOrder(emptyMenu(), {
      restaurantId: 'r1',
      tableNumber: ' 4 ',
      customerName: ' Ana ',
      note: ' no onions ',
      lines: [],
    });
    expect(placed.tableNumber).toBe('4');
    expect(placed.customerName).toBe('Ana');
    expect(placed.note).toBe('no onions');
  });

  it('drops blank table, customer, and note to undefined', () => {
    const { order: placed } = placeOrder(emptyMenu(), {
      restaurantId: 'r1',
      tableNumber: ' ',
      customerName: '',
      note: '  ',
      lines: [],
    });
    expect(placed.tableNumber).toBeUndefined();
    expect(placed.customerName).toBeUndefined();
    expect(placed.note).toBeUndefined();
  });
});

describe('updateOrderStatus', () => {
  it('updates the status of the matching order', () => {
    const base = state({ orders: [order({ id: 'o1' }), order({ id: 'o2' })] });
    const next = updateOrderStatus(base, 'o1', 'paid');
    expect(next.orders[0].status).toBe('paid');
    expect(next.orders[1].status).toBe('placed');
  });

  it('leaves orders untouched when no id matches', () => {
    const base = state({ orders: [order({ id: 'o1' })] });
    expect(updateOrderStatus(base, 'missing', 'paid').orders[0].status).toBe(
      'placed'
    );
  });
});

describe('ordersForRestaurant', () => {
  it('filters by restaurant and sorts newest first', () => {
    const base = state({
      orders: [
        order({
          id: 'o1',
          restaurantId: 'r1',
          createdAt: '2026-01-01T00:00:00.000Z',
        }),
        order({
          id: 'o2',
          restaurantId: 'r1',
          createdAt: '2026-02-01T00:00:00.000Z',
        }),
        order({
          id: 'o3',
          restaurantId: 'r2',
          createdAt: '2026-03-01T00:00:00.000Z',
        }),
      ],
    });
    expect(ordersForRestaurant(base, 'r1').map((o) => o.id)).toEqual([
      'o2',
      'o1',
    ]);
  });

  it('returns an empty array for an unknown restaurant', () => {
    expect(ordersForRestaurant(state({ orders: [order()] }), 'nope')).toEqual(
      []
    );
  });
});

describe('money', () => {
  it('formats cents as US dollars', () => {
    expect(money(123456)).toBe('$1,234.56');
  });

  it('formats zero', () => {
    expect(money(0)).toBe('$0.00');
  });
});

describe('encodeMenuData', () => {
  it('produces a url-safe base64 payload that decodes back', () => {
    const payload = encodeMenuData(restaurant(), [item()]);
    expect(payload).not.toMatch(/[+/=]/);
    expect(decodeMenuData(payload)).toEqual({
      v: 1,
      restaurant: restaurant(),
      items: [item()],
    });
  });

  it('handles non-ascii characters through the encoder', () => {
    const payload = encodeMenuData(restaurant({ name: 'Café' }), [
      item({ name: 'Piñata' }),
    ]);
    expect(decodeMenuData(payload)?.restaurant.name).toBe('Café');
    expect(decodeMenuData(payload)?.items[0].name).toBe('Piñata');
  });

  it('falls back to URI encoding when btoa is unavailable', () => {
    const originalBtoa = globalThis.btoa;
    const originalAtob = globalThis.atob;
    // @ts-expect-error - simulating a non-browser runtime
    delete globalThis.btoa;
    // @ts-expect-error - simulating a non-browser runtime
    delete globalThis.atob;
    try {
      const payload = encodeMenuData(restaurant(), [item()]);
      expect(decodeMenuData(payload)).toEqual({
        v: 1,
        restaurant: restaurant(),
        items: [item()],
      });
    } finally {
      globalThis.btoa = originalBtoa;
      globalThis.atob = originalAtob;
    }
  });
});

describe('decodeMenuData', () => {
  it('returns null for a payload that is not valid base64', () => {
    expect(decodeMenuData('!!!not-base64!!!')).toBeNull();
  });

  it('returns null when the version is unsupported', () => {
    const payload = btoa(JSON.stringify({ v: 2, restaurant: {}, items: [] }));
    expect(decodeMenuData(payload)).toBeNull();
  });

  it('returns null when the restaurant is missing', () => {
    const payload = btoa(JSON.stringify({ v: 1, items: [] }));
    expect(decodeMenuData(payload)).toBeNull();
  });

  it('returns null when items is not an array', () => {
    const payload = btoa(
      JSON.stringify({ v: 1, restaurant: {}, items: 'nope' })
    );
    expect(decodeMenuData(payload)).toBeNull();
  });

  it('round-trips through the URI fallback when atob is unavailable', () => {
    const original = globalThis.atob;
    // @ts-expect-error - simulating a non-browser runtime
    delete globalThis.atob;
    try {
      const json = JSON.stringify({
        v: 1,
        restaurant: restaurant(),
        items: [item()],
      });
      expect(decodeMenuData(encodeURIComponent(json))).toEqual({
        v: 1,
        restaurant: restaurant(),
        items: [item()],
      });
    } finally {
      globalThis.atob = original;
    }
  });
});

describe('makeCustomerUrl', () => {
  it('builds a /menu URL carrying the encoded payload', () => {
    const url = makeCustomerUrl(restaurant(), [item()]);
    expect(url.startsWith('/menu/?d=')).toBe(true);
    expect(decodeMenuData(url.replace('/menu/?d=', ''))?.items[0].name).toBe(
      'Soup'
    );
  });
});
