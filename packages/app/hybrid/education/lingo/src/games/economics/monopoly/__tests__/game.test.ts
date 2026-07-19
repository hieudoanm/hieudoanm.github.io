import {
  COMPETITIVE_PRICE,
  COMPETITIVE_Q,
  DEMAND_INTERCEPT,
  DWL_MONOPOLY,
  MARGINAL_COST,
  PROFIT_MAX,
  PROFIT_MAX_PRICE,
  PROFIT_MAX_Q,
} from '../constants';
import { dwlAt, guidance, priceAt, profitAt } from '../game';

describe('priceAt', () => {
  it('charges the inverse demand price P = 100 - Q', () => {
    expect(priceAt(PROFIT_MAX_Q)).toBe(PROFIT_MAX_PRICE);
    expect(priceAt(COMPETITIVE_Q)).toBe(COMPETITIVE_PRICE);
    expect(priceAt(20)).toBe(DEMAND_INTERCEPT - 20);
  });
});

describe('profitAt', () => {
  it('maximizes profit at the monopoly output', () => {
    expect(profitAt(PROFIT_MAX_Q)).toBe(PROFIT_MAX);
  });

  it('earns zero profit at the competitive output', () => {
    expect(profitAt(COMPETITIVE_Q)).toBe(0);
  });

  it('computes TR - TC with TC = 20Q', () => {
    expect(profitAt(10)).toBe(700);
    expect(profitAt(10)).toBe(90 * 10 - MARGINAL_COST * 10);
  });
});

describe('dwlAt', () => {
  it('reports the full deadweight loss at the monopoly output', () => {
    expect(dwlAt(PROFIT_MAX_Q)).toBe(DWL_MONOPOLY);
  });

  it('vanishes at the competitive output', () => {
    expect(dwlAt(COMPETITIVE_Q)).toBe(0);
  });

  it('never goes negative beyond the competitive output', () => {
    expect(dwlAt(90)).toBe(0);
  });

  it('shrinks the triangle as output approaches the competitive level', () => {
    expect(dwlAt(60)).toBe(200);
    expect(dwlAt(70)).toBe(50);
  });
});

describe('guidance', () => {
  it('flags outputs below, at, and above the profit maximum', () => {
    expect(guidance(PROFIT_MAX_Q - 1)).toBe('below-optimum');
    expect(guidance(PROFIT_MAX_Q)).toBe('optimal');
    expect(guidance(PROFIT_MAX_Q + 1)).toBe('above-optimum');
  });
});
