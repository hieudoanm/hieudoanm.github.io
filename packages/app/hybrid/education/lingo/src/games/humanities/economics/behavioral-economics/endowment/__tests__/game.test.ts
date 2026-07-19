import { ITEMS, MAX, MIN } from '../constants';
import { average, gap, nextItem } from '../game';

describe('gap', () => {
  it('returns the difference when WTA exceeds WTP', () => {
    expect(gap(7, 3)).toBe(4);
    expect(gap(10, 1)).toBe(9);
  });

  it('clamps negative differences to zero', () => {
    expect(gap(3, 7)).toBe(0);
    expect(gap(5, 5)).toBe(0);
  });
});

describe('average', () => {
  it('averages a list of numbers', () => {
    expect(average([2, 4, 6])).toBe(4);
    expect(average([10, 0, 5])).toBe(5);
  });

  it('returns zero for an empty list', () => {
    expect(average([])).toBe(0);
  });
});

describe('nextItem', () => {
  it('maps a random value to an item', () => {
    expect(nextItem(0)).toEqual(ITEMS[0]);
    expect(nextItem(0.99)).toEqual(ITEMS[ITEMS.length - 1]);
  });

  it('is deterministic given the same random value', () => {
    expect(nextItem(0.5)).toEqual(nextItem(0.5));
  });

  it('always returns an item from the catalog', () => {
    for (let i = 0; i < 100; i++) {
      expect(ITEMS).toContainEqual(nextItem(Math.random()));
    }
  });
});

describe('catalog', () => {
  it('has at least six items with unique ids', () => {
    expect(ITEMS.length).toBeGreaterThanOrEqual(6);
    expect(new Set(ITEMS.map((i) => i.id)).size).toBe(ITEMS.length);
  });

  it('defines a value range used by the sliders', () => {
    expect(MIN).toBeLessThan(MAX);
  });
});
