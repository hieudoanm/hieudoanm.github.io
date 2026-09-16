import { countries, type CountryEntry } from './countries-data';

/** Top-ranked countries used to draw quiz questions. */
export const POPULAR: readonly CountryEntry[] = countries
  .filter((entry) => entry.rank > 0)
  .sort((a, b) => a.rank - b.rank)
  .slice(0, 80);

export const POOL: readonly CountryEntry[] =
  POPULAR.length > 0 ? POPULAR : countries;

export const randomFrom = <T>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

/** One correct entry plus distinct decoys, shuffled. */
export const pickOptions = (
  correct: CountryEntry,
  count = 4
): CountryEntry[] => {
  const others = countries.filter(
    (entry) => entry.name !== correct.name && entry.flag !== correct.flag
  );
  const decoys = [...others]
    .sort(() => Math.random() - 0.5)
    .slice(0, count - 1);
  return [...decoys, correct].sort(() => Math.random() - 0.5);
};

export interface QuizStats {
  score: number;
  streak: number;
  bestStreak: number;
}

export const INITIAL_STATS: QuizStats = { score: 0, streak: 0, bestStreak: 0 };

/** Pure streak/score transition shared by all quiz games. */
export const applyQuizGuess = (
  stats: QuizStats,
  correct: boolean
): QuizStats => ({
  score: stats.score + (correct ? 1 : 0),
  streak: correct ? stats.streak + 1 : 0,
  bestStreak: correct
    ? Math.max(stats.bestStreak, stats.streak + 1)
    : stats.bestStreak,
});
