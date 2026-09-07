import { BOTS, MAX_VALUE, MIN_VALUE } from '../constants';
import {
  isWinnerCurse,
  payoffFor,
  planBids,
  resolveAuction,
  sampleEstimate,
  sampleTrueValue,
  shadeBid,
} from '../game';

describe('sampleTrueValue', () => {
  it('returns a value within the auctionable range', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(sampleTrueValue()).toBe(MIN_VALUE);
    jest.spyOn(Math, 'random').mockReturnValue(0.999);
    expect(sampleTrueValue()).toBe(MAX_VALUE);
    jest.restoreAllMocks();
  });
});

describe('sampleEstimate', () => {
  it('returns an estimate near the true value but never below 1', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(sampleEstimate(100)).toBe(75);
    jest.spyOn(Math, 'random').mockReturnValue(0.999);
    expect(sampleEstimate(1)).toBe(26);
    jest.restoreAllMocks();
  });
});

describe('shadeBid', () => {
  it('rounds the estimate times the bot shading factor', () => {
    expect(shadeBid(100, BOTS[0])).toBe(100);
    expect(shadeBid(100, BOTS[1])).toBe(88);
    expect(shadeBid(100, BOTS[2])).toBe(75);
  });
});

describe('planBids', () => {
  it('returns a strategy for every bot', () => {
    const plan = planBids(100);
    expect(plan).toHaveLength(BOTS.length);
    expect(plan.map((p) => p.botId)).toEqual(BOTS.map((b) => b.id));
  });
});

describe('resolveAuction', () => {
  const bids = { owl: 30, fox: 90, mouse: 45 };

  it('pays the winning bid in first-price formats', () => {
    for (const format of ['english', 'dutch', 'first-price'] as const) {
      expect(resolveAuction(bids, format)).toEqual({
        winner: 'fox',
        price: 90,
      });
    }
  });

  it('pays the second-highest bid in a Vickrey auction', () => {
    expect(resolveAuction(bids, 'vickrey')).toEqual({
      winner: 'fox',
      price: 45,
    });
  });
});

describe('payoffFor', () => {
  it('earns the difference between value and price only when the player wins', () => {
    expect(payoffFor('player', 80, 100)).toBe(20);
    expect(payoffFor('player', 120, 100)).toBe(-20);
    expect(payoffFor('fox', 90, 100)).toBe(0);
  });
});

describe('isWinnerCurse', () => {
  it('detects an overpayment', () => {
    expect(isWinnerCurse(-5)).toBe(true);
    expect(isWinnerCurse(5)).toBe(false);
    expect(isWinnerCurse(0)).toBe(false);
  });
});
