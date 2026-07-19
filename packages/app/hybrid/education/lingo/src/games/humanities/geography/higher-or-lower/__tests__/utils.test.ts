import {
  buildQuestion,
  formatNum,
  HL_POOL,
  isHigherCorrect,
  isLowerRankCorrect,
  pickPair,
  populationOf,
  rankOf,
} from '../utils';

describe('higher-or-lower utils', () => {
  it('HL_POOL only contains ranked countries', () => {
    expect(HL_POOL.length).toBeGreaterThan(0);
    for (const entry of HL_POOL) {
      expect(entry.rank).toBeGreaterThan(0);
    }
  });

  it('pickPair deals two distinct countries from the mode pool', () => {
    for (const mode of ['population', 'passport'] as const) {
      for (let index = 0; index < 20; index += 1) {
        const { left, right } = pickPair(mode);
        expect(left.name).not.toBe(right.name);
      }
    }
  });

  it('buildQuestion stores the value matching its mode', () => {
    const populationQuestion = buildQuestion('population');
    expect(populationQuestion.mode).toBe('population');
    expect(populationQuestion.leftValue).toBe(
      populationOf(populationQuestion.pair.left.name)
    );
    const passportQuestion = buildQuestion('passport');
    expect(passportQuestion.mode).toBe('passport');
    expect(passportQuestion.leftValue).toBe(
      rankOf(passportQuestion.pair.left.name)
    );
  });

  it('isHigherCorrect accepts ties on either side', () => {
    expect(isHigherCorrect('left', 5, 5)).toBe(true);
    expect(isHigherCorrect('right', 5, 5)).toBe(true);
    expect(isHigherCorrect('left', 2, 5)).toBe(false);
    expect(isHigherCorrect('left', 5, 2)).toBe(true);
    expect(isHigherCorrect('right', 2, 5)).toBe(true);
    expect(isHigherCorrect('right', 5, 2)).toBe(false);
  });

  it('isLowerRankCorrect accepts ties on either side', () => {
    expect(isLowerRankCorrect('left', 1, 1)).toBe(true);
    expect(isLowerRankCorrect('right', 1, 1)).toBe(true);
    expect(isLowerRankCorrect('left', 2, 5)).toBe(true);
    expect(isLowerRankCorrect('left', 5, 2)).toBe(false);
    expect(isLowerRankCorrect('right', 5, 2)).toBe(true);
    expect(isLowerRankCorrect('right', 2, 5)).toBe(false);
  });

  it('rankOf returns the passport rank for known countries', () => {
    const first = buildQuestion('passport').pair.left;
    expect(rankOf(first.name)).toBe(first.rank);
  });

  it('rankOf falls back to zero for unknown countries', () => {
    expect(rankOf('Atlantis')).toBe(0);
  });

  it('formatNum shortens large numbers', () => {
    expect(formatNum(1_400_000_000)).toBe('1.4B');
    expect(formatNum(2_500_000)).toBe('2.5M');
    expect(formatNum(7_000)).toBe('7.0K');
    expect(formatNum(42)).toBe('42');
  });
});
