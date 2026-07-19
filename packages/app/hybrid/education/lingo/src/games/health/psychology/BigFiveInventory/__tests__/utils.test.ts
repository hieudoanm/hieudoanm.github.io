import { BFI_ITEMS, computeBigFiveScores, factorLevel } from '../utils';

describe('BFI_ITEMS', () => {
  it('has 44 items across five factors', () => {
    expect(BFI_ITEMS).toHaveLength(44);
    const factors = new Set(BFI_ITEMS.map((item) => item.factor));
    expect(factors.size).toBe(5);
  });
});

describe('computeBigFiveScores', () => {
  it('returns the midpoint for neutral responses', () => {
    const scores = computeBigFiveScores(BFI_ITEMS.map(() => 3));
    Object.values(scores).forEach((mean) => expect(mean).toBe(3));
  });

  it('reverse-keys reverse items before averaging', () => {
    // Baseline: every item at the neutral midpoint 3 (reverse: 6 - 3 = 3)
    // gives each factor a mean of exactly 3.
    const responses = BFI_ITEMS.map(() => 3);

    // A forward-keyed extraversion item rated 5 (+2) raises the extraversion
    // mean to (3 * 7 + 5) / 8 = 3.25; other factors stay at 3.
    const forwardIndex = BFI_ITEMS.findIndex(
      (item) => item.factor === 'extraversion' && !item.reverse
    );
    expect(forwardIndex).toBeGreaterThan(-1);
    responses[forwardIndex] = 5;
    const scores = computeBigFiveScores(responses);
    expect(scores.extraversion).toBeCloseTo(26 / 8, 5);

    // A reverse-keyed item rated 1 is scored 6 - 1 = 5 (+2 over the midpoint).
    const reverseIndex = BFI_ITEMS.findIndex(
      (item) => item.factor === 'extraversion' && item.reverse
    );
    expect(reverseIndex).toBeGreaterThan(-1);
    responses[forwardIndex] = 3;
    responses[reverseIndex] = 1;
    expect(computeBigFiveScores(responses).extraversion).toBeCloseTo(26 / 8, 5);
  });
});

describe('factorLevel', () => {
  it.each([
    [1, 'low'],
    [2.4, 'low'],
    [3, 'moderate'],
    [3.59, 'moderate'],
    [3.6, 'high'],
    [5, 'high'],
  ])('classifies %p as %p', (score, level) => {
    expect(factorLevel(score)).toBe(level);
  });
});
