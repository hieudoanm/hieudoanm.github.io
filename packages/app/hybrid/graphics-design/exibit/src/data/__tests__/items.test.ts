import { render, screen, fireEvent } from '@testing-library/react';
import { DEFAULT_ITEMS } from '@/data/items';

describe('DEFAULT_ITEMS', () => {
  it('contains items with required fields', () => {
    DEFAULT_ITEMS.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.price).toBeGreaterThan(0);
      expect(item.category).toBeTruthy();
    });
  });

  it('has items in multiple categories', () => {
    const categories = new Set(DEFAULT_ITEMS.map((i) => i.category));
    expect(categories.size).toBeGreaterThan(1);
  });

  it('has unique ids', () => {
    const ids = DEFAULT_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
