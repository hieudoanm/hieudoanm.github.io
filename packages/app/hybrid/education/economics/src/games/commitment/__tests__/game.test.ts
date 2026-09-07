import { compound, consumptionUtility, tempted } from '../game';
import {
  DAILY_INCOME,
  GROWTH,
  TEMPTATION_RATE,
  TEMPTATION_REDUCE,
} from '../constants';

describe('tempted', () => {
  it('returns save unchanged when commitment is on', () => {
    expect(tempted(0.1, 15, true)).toBe(15);
    expect(tempted(0.9, 5, true)).toBe(5);
  });

  it('reduces save by TEMPTATION_REDUCE when random < TEMPTATION_RATE', () => {
    expect(tempted(0.3, 15, false)).toBe(15 - TEMPTATION_REDUCE);
    expect(tempted(0.0, 20, false)).toBe(20 - TEMPTATION_REDUCE);
  });

  it('floors at zero when temptation would reduce below zero', () => {
    expect(tempted(0.1, 3, false)).toBe(0);
    expect(tempted(0.1, 0, false)).toBe(0);
  });

  it('returns save unchanged when random >= TEMPTATION_RATE', () => {
    expect(tempted(0.5, 15, false)).toBe(15);
    expect(tempted(1.0, 10, false)).toBe(10);
    expect(tempted(TEMPTATION_RATE, 10, false)).toBe(10);
  });
});

describe('compound', () => {
  it('compounds savings at GROWTH rate and adds save', () => {
    expect(compound(100, 10)).toBe(Math.round(100 * GROWTH + 10));
  });

  it('starts from zero balance', () => {
    expect(compound(0, 20)).toBe(20);
  });

  it('rounds the result', () => {
    expect(compound(33, 7)).toBe(Math.round(33 * GROWTH + 7));
  });
});

describe('consumptionUtility', () => {
  it('returns sqrt of consume rounded to 2 decimals', () => {
    expect(consumptionUtility(0)).toBe(0);
    expect(consumptionUtility(4)).toBe(2);
    expect(consumptionUtility(2)).toBe(Math.round(Math.sqrt(2) * 100) / 100);
  });

  it('matches the full income consumption', () => {
    expect(consumptionUtility(DAILY_INCOME)).toBe(
      Math.round(Math.sqrt(DAILY_INCOME) * 100) / 100
    );
  });
});
