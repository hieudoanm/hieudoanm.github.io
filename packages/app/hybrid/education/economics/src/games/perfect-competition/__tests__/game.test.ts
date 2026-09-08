import {
  avgTotalCost,
  avgVariableCost,
  longRunNote,
  marginalCost,
  minAC,
  minAVC,
  profitAt,
  profitMaxQ,
} from '../game';

describe('marginalCost', () => {
  it('follows MC = 8 + 2q', () => {
    expect(marginalCost(0)).toBe(8);
    expect(marginalCost(6)).toBe(20);
    expect(marginalCost(11)).toBe(30);
    expect(marginalCost(18)).toBe(44);
  });
});

describe('avgVariableCost', () => {
  it('follows AVC = 8 + q', () => {
    expect(avgVariableCost(8)).toBe(16);
    expect(avgVariableCost(10)).toBe(18);
  });
});

describe('avgTotalCost', () => {
  it('follows AC = 50/q + 8 + q', () => {
    expect(avgTotalCost(10)).toBe(23);
    expect(avgTotalCost(11)).toBeCloseTo(259 / 11, 5);
  });
});

describe('profitAt', () => {
  it('earns 71 at the optimum for a price of 30', () => {
    expect(profitAt(30, 11)).toBe(71);
  });

  it('is negative for output far from the optimum', () => {
    expect(profitAt(20, 40)).toBeLessThan(0);
    expect(profitAt(30, 40)).toBeLessThan(0);
    expect(profitAt(44, 0)).toBeLessThan(0);
  });
});

describe('profitMaxQ', () => {
  it('sets P = MC so q* = round((P - 8) / 2)', () => {
    expect(profitMaxQ(20)).toBe(6);
    expect(profitMaxQ(30)).toBe(11);
    expect(profitMaxQ(44)).toBe(18);
  });

  it('rounds the tie-break price of 27 up to 10', () => {
    expect(profitMaxQ(27)).toBe(10);
  });

  it('clamps the suggested output to the allowed range', () => {
    expect(profitMaxQ(5)).toBe(0);
    expect(profitMaxQ(100)).toBe(40);
  });
});

describe('minAVC', () => {
  it('returns the shut-down threshold of 8', () => {
    expect(minAVC()).toBe(8);
  });
});

describe('minAC', () => {
  it('is roughly 22.1 at q = sqrt(50) ≈ 7.07', () => {
    expect(minAC()).toBeGreaterThanOrEqual(22.0);
    expect(minAC()).toBeLessThanOrEqual(22.3);
  });
});

describe('longRunNote', () => {
  it('predicts entry when price exceeds min AC', () => {
    expect(longRunNote(30)).toBe('entry');
  });

  it('predicts exit when price is below min AC', () => {
    expect(longRunNote(20)).toBe('exit');
  });

  it('reports equilibrium at the zero-profit price', () => {
    expect(longRunNote(minAC())).toBe('equilibrium');
  });
});
