import { render, screen, fireEvent } from '@testing-library/react';
import { SAMPLE_ITEMS } from '@/data/items';

describe('SAMPLE_ITEMS', () => {
  it('contains items with required fields', () => {
    SAMPLE_ITEMS.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.price).toBeGreaterThan(0);
      expect(item.category).toBeTruthy();
    });
  });

  it('has items in multiple categories', () => {
    const categories = new Set(SAMPLE_ITEMS.map((i) => i.category));
    expect(categories.size).toBeGreaterThan(1);
  });

  it('has unique ids', () => {
    const ids = SAMPLE_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
