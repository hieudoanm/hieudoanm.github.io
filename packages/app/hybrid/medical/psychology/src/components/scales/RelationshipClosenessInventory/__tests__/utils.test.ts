import {
  ACTIVITIES,
  INFLUENCE_ITEMS,
  PLAN_ITEMS,
  TIME_SLOTS,
  computeScores,
} from '../utils';

describe('RCI data', () => {
  it('defines time slots, activities, influence items and plans', () => {
    expect(TIME_SLOTS.length).toBeGreaterThan(0);
    expect(ACTIVITIES.length).toBeGreaterThan(0);
    expect(INFLUENCE_ITEMS.length).toBeGreaterThan(0);
    expect(PLAN_ITEMS).toHaveLength(6);
  });
});

describe('computeScores', () => {
  it('sums time in minutes and counts activities', () => {
    const scores = computeScores(
      [{ hours: 1, minutes: 30 }],
      [true, false, true],
      INFLUENCE_ITEMS.map(() => 4),
      PLAN_ITEMS.map(() => 7)
    );
    expect(scores.timeMinutes).toBe(90);
    expect(scores.activitiesCount).toBe(2);
    expect(scores.influenceTotal).toBe(4 * INFLUENCE_ITEMS.length);
    expect(scores.plansTotal).toBe(7 * PLAN_ITEMS.length);
  });

  it('reverse-keys influence items before summing', () => {
    const reversedCount = INFLUENCE_ITEMS.filter((item) => item.reverse).length;

    // Zero-rated forward items score 0; zero-rated reverse items score 8 - 0.
    const zeros = INFLUENCE_ITEMS.map(() => 0);
    const zeroRated = computeScores([], [], zeros, []);
    expect(zeroRated.influenceTotal).toBe(8 * reversedCount);

    // Each reverse item rated 1 is scored 8 - 1 = 7; forward items stay 0.
    const reverseOnly = INFLUENCE_ITEMS.map((item) => (item.reverse ? 1 : 0));
    const reversed = computeScores([], [], reverseOnly, []);
    expect(reversed.influenceTotal).toBe(7 * reversedCount);
  });

  it('clamps negative time entries to zero', () => {
    const scores = computeScores([{ hours: -2, minutes: -5 }], [], [], []);
    expect(scores.timeMinutes).toBe(0);
  });
});
