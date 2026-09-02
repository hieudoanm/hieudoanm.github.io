import { seedMenuData } from '@/lib/seed';

describe('seedMenuData', () => {
  it('returns restaurants, food and drink items', () => {
    const data = seedMenuData();
    expect(data.restaurants.length).toBe(3);
    expect(data.items.length).toBeGreaterThanOrEqual(12);
    expect(data.items.some((i) => i.category === 'food')).toBe(true);
    expect(data.items.some((i) => i.category === 'drink')).toBe(true);
  });

  it('returns deterministic data', () => {
    const a = seedMenuData();
    const b = seedMenuData();
    expect(a).toEqual(b);
  });

  it('every item belongs to a seeded restaurant', () => {
    const data = seedMenuData();
    const ids = new Set(data.restaurants.map((r) => r.id));
    for (const item of data.items) {
      expect(ids.has(item.restaurantId)).toBe(true);
    }
  });

  it('orders reference seeded restaurants and consistent line totals', () => {
    const data = seedMenuData();
    const ids = new Set(data.restaurants.map((r) => r.id));
    for (const order of data.orders) {
      expect(ids.has(order.restaurantId)).toBe(true);
      const sum = order.lines.reduce(
        (acc, line) => acc + line.price * line.quantity,
        0
      );
      expect(order.subtotal).toBe(sum);
    }
  });
});
