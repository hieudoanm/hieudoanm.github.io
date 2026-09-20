import {
  buyAndHoldWealth,
  coinFlipWealth,
  positionForTip,
  tipStrategyWealth,
  wealthAfter,
} from '../game';
import { RETURNS } from '../constants';

describe('wealthAfter', () => {
  it('keeps wealth unchanged when always in cash', () => {
    expect(wealthAfter(['cash', 'cash', 'cash'])).toBe(1000);
  });

  it('applies each return only when invested', () => {
    expect(wealthAfter(['in', 'cash', 'in'], [10, 20, -10])).toBe(990);
  });

  it('honours a custom starting wealth', () => {
    expect(wealthAfter(['in'], [10], 500)).toBe(550);
  });
});

describe('buyAndHoldWealth', () => {
  it('matches the hand-computed product of returns', () => {
    expect(buyAndHoldWealth()).toBeCloseTo(1077.55, 1);
  });

  it('is the wealth of staying invested every round', () => {
    expect(buyAndHoldWealth(RETURNS)).toBe(
      wealthAfter(
        RETURNS.map(() => 'in'),
        RETURNS
      )
    );
  });
});

describe('coinFlipWealth', () => {
  it('equals wealth of the alternating in/cash sequence', () => {
    const alternating = RETURNS.map((_, i) => (i % 2 === 0 ? 'in' : 'cash'));
    expect(coinFlipWealth()).toBe(wealthAfter(alternating, RETURNS));
  });

  it('profits versus staying in cash', () => {
    expect(coinFlipWealth()).toBeGreaterThan(1000);
  });
});

describe('tipStrategyWealth', () => {
  it('invests only on rounds where the tip says prices rise', () => {
    const tips = [0, 1, 1, 0, 1, 1, 0, 1, 0, 1];
    const decisions = tips.map(positionForTip);
    expect(decisions).toEqual([
      'cash',
      'in',
      'in',
      'cash',
      'in',
      'in',
      'cash',
      'in',
      'cash',
      'in',
    ]);
    expect(tipStrategyWealth(RETURNS, tips)).toBe(
      wealthAfter(decisions, RETURNS)
    );
  });

  it('loses money so buy-and-hold wins decisively', () => {
    expect(tipStrategyWealth()).toBeCloseTo(977.14, 1);
    expect(buyAndHoldWealth()).toBeGreaterThan(tipStrategyWealth());
  });
});

describe('positionForTip', () => {
  it('maps a bullish tip to invested and otherwise to cash', () => {
    expect(positionForTip(1)).toBe('in');
    expect(positionForTip(0)).toBe('cash');
  });
});
