import { countries } from '../countries-data';
import {
  applyQuizGuess,
  INITIAL_STATS,
  pickOptions,
  POOL,
  randomFrom,
} from '../quiz';

describe('quiz shared helpers', () => {
  it('POOL only contains ranked countries', () => {
    expect(POOL.length).toBeGreaterThan(0);
    for (const entry of POOL) expect(entry.rank).toBeGreaterThan(0);
  });

  it('randomFrom returns an element of the list', () => {
    const picked = randomFrom(POOL);
    expect(POOL).toContain(picked);
  });

  it('pickOptions includes the correct entry exactly once among four options', () => {
    const correct = POOL[0];
    const options = pickOptions(correct);
    expect(options).toHaveLength(4);
    const matches = options.filter((option) => option.name === correct.name);
    expect(matches).toHaveLength(1);
    expect(new Set(options.map((option) => option.name)).size).toBe(4);
  });

  it('pickOptions never repeats the correct flag in decoys', () => {
    for (const correct of POOL.slice(0, 20)) {
      const options = pickOptions(correct);
      const flags = options.map((option) => option.flag);
      expect(new Set(flags).size).toBe(flags.length);
    }
  });

  it('applyQuizGuess increments score and streak on a correct guess', () => {
    const next = applyQuizGuess({ score: 2, streak: 3, bestStreak: 5 }, true);
    expect(next).toEqual({ score: 3, streak: 4, bestStreak: 5 });
  });

  it('applyQuizGuess raises bestStreak when the streak beats it', () => {
    const next = applyQuizGuess({ score: 1, streak: 5, bestStreak: 5 }, true);
    expect(next.bestStreak).toBe(6);
  });

  it('applyQuizGuess resets the streak but keeps score and best on a miss', () => {
    const next = applyQuizGuess({ score: 4, streak: 3, bestStreak: 7 }, false);
    expect(next).toEqual({ score: 4, streak: 0, bestStreak: 7 });
  });

  it('INITIAL_STATS starts at zero', () => {
    expect(INITIAL_STATS).toEqual({ score: 0, streak: 0, bestStreak: 0 });
  });

  it('dataset has unique country names', () => {
    const names = countries.map((entry) => entry.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
