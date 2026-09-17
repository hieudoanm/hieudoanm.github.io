import { SPREAD } from '../constants';
import {
  askFor,
  bidFor,
  crossAway,
  limitFill,
  nextMid,
  pnl,
  randomWalkStep,
  roundTripCost,
  sampleStep,
} from '../game';

describe('bidFor', () => {
  it('places the best bid two ticks below the mid', () => {
    expect(bidFor(100)).toBe(98);
    expect(bidFor(101)).toBe(99);
  });
});

describe('askFor', () => {
  it('places the best ask two ticks above the mid', () => {
    expect(askFor(100)).toBe(102);
    expect(askFor(99)).toBe(101);
  });
});

describe('randomWalkStep', () => {
  it('moves up when the draw is below the midpoint', () => {
    expect(randomWalkStep(0)).toBe(1);
    expect(randomWalkStep(0.49)).toBe(1);
  });

  it('moves down when the draw is at or above the midpoint', () => {
    expect(randomWalkStep(0.5)).toBe(-1);
    expect(randomWalkStep(0.99)).toBe(-1);
  });
});

describe('sampleStep', () => {
  it('wraps Math.random into a ±1 step in both directions', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(sampleStep()).toBe(1);
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(sampleStep()).toBe(-1);
    jest.restoreAllMocks();
  });
});

describe('nextMid', () => {
  it('applies the stepped move to the mid price', () => {
    expect(nextMid(100, 1)).toBe(101);
    expect(nextMid(100, -1)).toBe(99);
  });
});

describe('limitFill', () => {
  it('fills a buy when the new mid reaches its price', () => {
    expect(limitFill(101, null, 101)).toBe('buy');
    expect(limitFill(101, null, 102)).toBe('buy');
  });

  it('fills a sell when the new mid reaches its price', () => {
    expect(limitFill(null, 101, 101)).toBe('sell');
    expect(limitFill(null, 101, 100)).toBe('sell');
  });

  it('leaves an order resting when the new mid stays away', () => {
    expect(limitFill(101, null, 100)).toBe('none');
    expect(limitFill(null, 101, 102)).toBe('none');
  });

  it('returns none when no limit is posted', () => {
    expect(limitFill(null, null, 100)).toBe('none');
  });
});

describe('crossAway', () => {
  it('pays the ask and takes on a long position for a market buy', () => {
    expect(crossAway('buy-ask', 100)).toEqual({ price: 102, delta: 1 });
  });

  it('receives the bid and takes on a short position for a market sell', () => {
    expect(crossAway('sell-bid', 100)).toEqual({ price: 98, delta: -1 });
  });

  it('has no execution for a limit post', () => {
    expect(crossAway('post-bid', 100)).toEqual({ price: 0, delta: 0 });
    expect(crossAway('post-ask', 100)).toEqual({ price: 0, delta: 0 });
  });
});

describe('pnl', () => {
  it('marks cash plus position times the current mid', () => {
    expect(pnl(-102, 1, 100)).toBe(-2);
    expect(pnl(98, -1, 100)).toBe(-2);
    expect(pnl(0, 0, 100)).toBe(0);
  });
});

describe('roundTripCost', () => {
  it('charges half the spread for each side of the market', () => {
    expect(roundTripCost('buy-ask', 100)).toBe(SPREAD / 2);
    expect(roundTripCost('sell-bid', 100)).toBe(SPREAD / 2);
  });

  it('charges nothing for a limit post', () => {
    expect(roundTripCost('post-bid', 100)).toBe(0);
    expect(roundTripCost('post-ask', 100)).toBe(0);
  });
});
