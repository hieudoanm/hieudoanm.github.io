export enum TimeClass {
  CLASSICAL = 'classical',
  RAPID = 'rapid',
  BLITZ = 'blitz',
}

export enum Score {
  WIN = 'WIN',
  DRAW = 'DRAW',
  LOSS = 'LOSS',
}

export const getScoreValue = (score: Score): number => {
  switch (score) {
    case Score.WIN:
      return 1;
    case Score.DRAW:
      return 0.5;
    case Score.LOSS:
      return 0;
  }
};

export type Game = {
  ratingOpponent: number;
  score: Score;
};

export type PerformanceInput = {
  games: Game[];
};

const getAverageOpponentRating = (games: Game[]): number => {
  if (!games.length) return 0;
  const total = games.reduce((sum, g) => sum + g.ratingOpponent, 0);
  return total / games.length;
};

const getScorePercentage = (games: Game[]): number => {
  if (!games.length) return 0;
  const totalScore = games.reduce((sum, g) => sum + getScoreValue(g.score), 0);
  return totalScore / games.length;
};

const getPerformanceDifferential = (p: number): number => {
  const epsilon = 0.0001;
  if (p <= 0) p = epsilon;
  if (p >= 1) p = 1 - epsilon;
  return 400 * Math.log10(p / (1 - p));
};

export const calculatePerformance = ({ games }: PerformanceInput): number => {
  if (!games.length) return 0;
  const avgOpponent = getAverageOpponentRating(games);
  const percentage = getScorePercentage(games);
  const differential = getPerformanceDifferential(percentage);
  return Math.round(avgOpponent + differential);
};

export type DevelopmentCoefficient = 10 | 20 | 40;

const getDevelopmentCoefficient = ({
  ratingPlayer = 1000,
  lessThan30Games = false,
  overRating2400 = false,
  overAge18 = true,
  timeClass = TimeClass.CLASSICAL,
}: {
  ratingPlayer?: number;
  lessThan30Games?: boolean;
  overRating2400?: boolean;
  overAge18?: boolean;
  timeClass?: TimeClass;
}): DevelopmentCoefficient => {
  if (timeClass === TimeClass.RAPID || timeClass === TimeClass.BLITZ) return 20;
  if (overRating2400) return 10;
  if (lessThan30Games || (!overAge18 && ratingPlayer < 2300)) return 40;
  return 20;
};

const getDelta = ({
  ratingPlayer = 1000,
  ratingOpponent = 1000,
  lessThan30Games = false,
  overRating2400 = false,
  overAge18 = true,
  score = Score.DRAW,
  timeClass = TimeClass.CLASSICAL,
}: {
  ratingPlayer?: number;
  ratingOpponent?: number;
  lessThan30Games?: boolean;
  overRating2400?: boolean;
  overAge18?: boolean;
  score?: Score;
  timeClass?: TimeClass;
}): number => {
  if (![Score.WIN, Score.DRAW, Score.LOSS].includes(score)) return 0;
  const gap: number = ratingOpponent - ratingPlayer;
  const chanceToWin: number = 1 / (1 + 10 ** (gap / 400));
  const K: DevelopmentCoefficient = getDevelopmentCoefficient({
    ratingPlayer,
    lessThan30Games,
    overRating2400,
    overAge18,
    timeClass,
  });
  return Math.round(K * (getScoreValue(score) - chanceToWin));
};

export const calculateRating = ({
  ratingPlayer = 1000,
  ratingOpponent = 1000,
  lessThan30Games = false,
  overRating2400 = false,
  overAge18 = true,
  score = Score.DRAW,
  timeClass = TimeClass.CLASSICAL,
}: {
  ratingPlayer?: number;
  ratingOpponent?: number;
  lessThan30Games?: boolean;
  overRating2400?: boolean;
  overAge18?: boolean;
  score?: Score;
  timeClass?: TimeClass;
}): number => {
  const delta = getDelta({
    ratingPlayer,
    ratingOpponent,
    lessThan30Games,
    overRating2400,
    overAge18,
    score,
    timeClass,
  });
  return ratingPlayer + delta;
};
