import { MC } from '../constants';
import {
  optimalDual,
  optimalSingle,
  profitDual,
  profitSingle,
  qBusiness,
  qLeisure,
  roundFlipped,
} from '../game';

describe('qBusiness', () => {
  it('models the standard inelastic business demand', () => {
    expect(qBusiness(55, false)).toBe(45);
    expect(qBusiness(100, false)).toBe(0);
  });

  it('swaps to the elastic curve when flipped', () => {
    expect(qBusiness(35, true)).toBe(50);
    expect(qBusiness(60, true)).toBe(0);
  });

  it('never returns a negative quantity', () => {
    expect(qBusiness(200, false)).toBe(0);
    expect(qBusiness(200, true)).toBe(0);
  });
});

describe('qLeisure', () => {
  it('models the standard elastic leisure demand', () => {
    expect(qLeisure(35, false)).toBe(50);
    expect(qLeisure(60, false)).toBe(0);
  });

  it('swaps to the inelastic curve when flipped', () => {
    expect(qLeisure(55, true)).toBe(45);
    expect(qLeisure(100, true)).toBe(0);
  });

  it('never returns a negative quantity', () => {
    expect(qLeisure(200, false)).toBe(0);
    expect(qLeisure(200, true)).toBe(0);
  });
});

describe('profitSingle', () => {
  it('computes profit above MC at the integer optimum', () => {
    expect(MC).toBe(10);
    expect(profitSingle(42, false)).toBe(3008);
  });

  it('returns zero once demand is exhausted', () => {
    expect(profitSingle(100, false)).toBe(0);
  });
});

describe('profitDual', () => {
  it('reaches 3275 at the standard two-price optimum', () => {
    expect(profitDual(55, 35, false)).toBe(3275);
  });

  it('reaches 3275 at the swapped flipped optimum', () => {
    expect(profitDual(35, 55, true)).toBe(3275);
  });
});

describe('optimalSingle', () => {
  it('finds the best integer single price for the standard segments', () => {
    expect(optimalSingle(false)).toEqual({ price: 42, profit: 3008 });
  });

  it('keeps the same total demand optimum when segments are flipped', () => {
    expect(optimalSingle(true)).toEqual({ price: 42, profit: 3008 });
  });
});

describe('optimalDual', () => {
  it('finds the 3275 segment optimum under the consistent integer rule', () => {
    expect(optimalDual(false)).toEqual({
      priceB: 55,
      priceL: 35,
      profit: 3275,
    });
  });

  it('strictly beats the best single price', () => {
    const single = optimalSingle(false);
    const dual = optimalDual(false);
    expect(dual.profit).toBeGreaterThan(single.profit);
  });

  it('swaps the optimal prices when segments are flipped', () => {
    const standard = optimalDual(false);
    const flipped = optimalDual(true);
    expect(flipped.priceB).toBe(standard.priceL);
    expect(flipped.priceL).toBe(standard.priceB);
    expect(flipped.profit).toBe(standard.profit);
  });
});

describe('roundFlipped', () => {
  it('flips only round 3', () => {
    expect(roundFlipped(1)).toBe(false);
    expect(roundFlipped(2)).toBe(false);
    expect(roundFlipped(3)).toBe(true);
    expect(roundFlipped(4)).toBe(false);
  });
});
