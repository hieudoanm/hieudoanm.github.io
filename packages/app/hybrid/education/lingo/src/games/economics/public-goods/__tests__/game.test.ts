import {
  conditionalContribution,
  cooperateContribution,
  freeRiderContribution,
  groupTotal,
  payoff,
} from '../game';

describe('groupTotal', () => {
  it('sums all contributions', () => {
    expect(groupTotal([10, 20, 30])).toBe(60);
    expect(groupTotal([])).toBe(0);
  });
});

describe('payoff', () => {
  it('computes endowment minus contribution plus shared return', () => {
    const all = [50, 100, 0, 50];
    const total = groupTotal(all);
    expect(payoff(50, all)).toBe(100 - 50 + (total * 2) / 4);
  });

  it('rewards free riding when others contribute', () => {
    const freeRider = payoff(0, [100, 100, 100, 0]);
    const cooperator = payoff(100, [100, 100, 100, 0]);
    expect(freeRider).toBeGreaterThan(cooperator);
  });
});

describe('cooperateContribution', () => {
  it('contributes 100 when the player has been cooperative', () => {
    expect(cooperateContribution([50, 60])).toBe(100);
    expect(cooperateContribution([])).toBe(100);
  });

  it('drops to 50 when the player average is below 30', () => {
    expect(cooperateContribution([10, 20])).toBe(50);
    expect(cooperateContribution([0, 0, 40])).toBe(50);
  });
});

describe('freeRiderContribution', () => {
  it('always contributes nothing', () => {
    expect(freeRiderContribution()).toBe(0);
    expect(freeRiderContribution()).toBe(0);
  });
});

describe('conditionalContribution', () => {
  it('contributes a fixed 50 on round one', () => {
    expect(conditionalContribution([], 1)).toBe(50);
    expect(conditionalContribution([80], 1)).toBe(50);
  });

  it('matches the rounded player average from round two on', () => {
    expect(conditionalContribution([50], 2)).toBe(50);
    expect(conditionalContribution([10, 20], 3)).toBe(15);
    expect(conditionalContribution([10, 10, 10], 4)).toBe(10);
  });

  it('defaults to 0 when there is no player history', () => {
    expect(conditionalContribution([], 3)).toBe(0);
  });
});
