import { growthFor, harvest, hasCollapsed, nextStock } from '../game';
import { GROWTH_RATE, MAX_STOCK } from '../constants';

describe('growthFor', () => {
  it('returns 0 when stock is 0', () => {
    expect(growthFor(0)).toBe(0);
  });

  it('returns max growth when stock is at max', () => {
    expect(growthFor(MAX_STOCK)).toBe(GROWTH_RATE);
  });

  it('returns intermediate growth for mid-range stock', () => {
    expect(growthFor(50)).toBe(Math.round(GROWTH_RATE * 0.5));
  });
});

describe('nextStock', () => {
  it('clamps to 0 when harvest exceeds stock plus growth', () => {
    expect(nextStock(5, 100)).toBe(0);
  });

  it('clamps to max stock', () => {
    expect(nextStock(MAX_STOCK, 0)).toBe(MAX_STOCK);
  });

  it('grows from zero stock by zero when stock is 0', () => {
    expect(nextStock(0, 0)).toBe(0);
  });

  it('returns stock minus harvest plus growth', () => {
    const stock = 80;
    const growth = growthFor(stock);
    expect(nextStock(stock, 5)).toBe(Math.min(MAX_STOCK, stock - 5 + growth));
  });
});

describe('harvest', () => {
  it('returns requested amount when stock is sufficient', () => {
    expect(harvest(5, 50)).toBe(5);
  });

  it('returns remaining stock when requested exceeds it', () => {
    expect(harvest(10, 3)).toBe(3);
  });

  it('returns 0 when stock is 0', () => {
    expect(harvest(5, 0)).toBe(0);
  });
});

describe('hasCollapsed', () => {
  it('returns true when stock is 0', () => {
    expect(hasCollapsed(0)).toBe(true);
  });

  it('returns false when stock is positive', () => {
    expect(hasCollapsed(1)).toBe(false);
  });
});
