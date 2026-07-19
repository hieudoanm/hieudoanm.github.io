import { STAKE } from '../utils';
import {
  countCatches,
  drawNumbers,
  payoutFor,
  playKeno,
  quickPick,
} from '../utils';

describe('keno utils', () => {
  it('draws twenty unique numbers between one and eighty', () => {
    const drawn = drawNumbers();
    expect(drawn).toHaveLength(20);
    expect(new Set(drawn).size).toBe(20);
    expect(Math.min(...drawn)).toBeGreaterThanOrEqual(1);
    expect(Math.max(...drawn)).toBeLessThanOrEqual(80);
  });

  it('quick-picks the requested number of spots', () => {
    expect(quickPick(5)).toHaveLength(5);
    expect(quickPick(3)).toHaveLength(3);
  });

  it('counts catches between selection and draw', () => {
    expect(countCatches([1, 2, 3], [2, 3, 4])).toBe(2);
    expect(countCatches([1, 2], [3, 4])).toBe(0);
  });

  it.each([
    [1, 1, 3],
    [2, 2, 12],
    [3, 3, 42],
    [4, 4, 120],
    [5, 5, 700],
  ])(
    'pays %i × stake for %i picks with %i catches',
    (picks, catches, multiplier) => {
      const selected = Array.from({ length: picks }, (_, index) => index + 1);
      const caughtNumbers = selected.slice(0, catches);
      const filler = Array.from(
        { length: 20 - catches },
        (_, index) => 80 - index
      );
      const outcome = playKeno(selected, [...caughtNumbers, ...filler]);
      expect(outcome.catches).toBe(catches);
      expect(payoutFor(picks, catches)).toBe(multiplier);
      expect(outcome.won).toBe(STAKE * multiplier);
    }
  );

  it('returns nothing for misses and invalid combos', () => {
    expect(payoutFor(1, 0)).toBe(0);
    expect(payoutFor(2, 1)).toBe(0);
    expect(payoutFor(5, 2)).toBe(0);
    const outcome = playKeno(
      [1, 2, 3, 4, 5],
      Array.from({ length: 20 }, (_, index) => index + 6)
    );
    expect(outcome.won).toBe(0);
    expect(outcome.catches).toBe(0);
  });
});
