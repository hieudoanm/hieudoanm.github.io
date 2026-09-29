import { FRAMER_CATEGORIES, SCENARIOS, WIND_FALL_AMOUNT } from '../constants';
import {
  allocationRows,
  isValidAllocation,
  scoreFor,
  totalAllocated,
} from '../game';

describe('scoreFor', () => {
  const rational = SCENARIOS.map((s) => s.rational);

  it('counts every answer that matches its scenario rational choice', () => {
    expect(scoreFor(rational)).toBe(SCENARIOS.length);
  });

  it('scores zero when every answer is irrational', () => {
    const allWrong = rational.map((choice) => (choice === 'a' ? 'b' : 'a'));
    expect(scoreFor(allWrong)).toBe(0);
  });

  it('ignores missing answers', () => {
    expect(scoreFor([])).toBe(0);
    expect(scoreFor([SCENARIOS[0]?.rational ?? 'a'])).toBe(1);
  });
});

describe('totalAllocated', () => {
  it('sums the earmarked amounts', () => {
    expect(
      totalAllocated({ fun: 300, bills: 200, savings: 400, giving: 100 })
    ).toBe(WIND_FALL_AMOUNT);
    expect(totalAllocated({})).toBe(0);
  });
});

describe('isValidAllocation', () => {
  it('accepts a full split across every framer category', () => {
    const allocations = { fun: 300, bills: 200, savings: 400, giving: 100 };
    expect(isValidAllocation(allocations)).toBe(true);
  });

  it('rejects a split that does not sum to the windfall', () => {
    const allocations = { fun: 100, bills: 100, savings: 100, giving: 100 };
    expect(isValidAllocation(allocations)).toBe(false);
  });

  it('rejects allocations that miss or invent categories', () => {
    expect(isValidAllocation({ fun: 1000 })).toBe(false);
    expect(
      isValidAllocation({
        fun: 0,
        bills: 0,
        savings: 0,
        giving: 0,
        crypto: 1000,
      })
    ).toBe(false);
  });
});

describe('allocationRows', () => {
  it('returns one row per framer category in order', () => {
    const rows = allocationRows({
      fun: 300,
      bills: 200,
      savings: 400,
      giving: 100,
    });
    expect(rows.map((r) => r.category.id)).toEqual(
      FRAMER_CATEGORIES.map((c) => c.id)
    );
    expect(rows.map((r) => r.amount)).toEqual([300, 200, 400, 100]);
  });
});
