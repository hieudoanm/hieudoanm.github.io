import { Score, getScoreValue } from './rating';

export const expectedScore = (rating: number, ratingOpponent: number): number =>
  1 / (1 + 10 ** ((ratingOpponent - rating) / 400));

export const drawPercent = (diff: number): number => {
  if (diff >= 500) return 6;
  if (diff >= 400) return 8;
  if (diff >= 300) return 12;
  if (diff >= 200) return 20;
  if (diff >= 100) return 30;
  return 38;
};

export const winProbability = (
  rating: number,
  ratingOpponent: number
): number => {
  const draws = drawPercent(Math.abs(rating - ratingOpponent)) / 100;
  const wins = expectedScore(rating, ratingOpponent) - draws / 2;
  return Math.min(0.99, Math.max(0.01, Math.round(wins * 100) / 100));
};

export const kFactorFide = ({
  rating,
  games,
  age,
}: {
  rating: number;
  games: number;
  age: number;
}): number => {
  if (games < 30 || age < 18) return 40;
  if (rating < 2400) return 20;
  return 10;
};

export const kFactorUsfc = ({
  rating,
  games,
  age,
}: {
  rating: number;
  games: number;
  age: number;
}): number => {
  if (age < 21 && rating < 2200) return 50;
  if (rating < 2100 || games < 26) return 32;
  if (rating < 2400) return 24;
  return 16;
};

export const calculateUsfc = ({
  rating,
  ratingOpponent,
  score,
  games,
  age,
}: {
  rating: number;
  ratingOpponent: number;
  score: Score;
  games: number;
  age: number;
}): { ratingNew: number; ratingChange: number } => {
  const cappedOpponent =
    Math.abs(ratingOpponent - rating) > 400
      ? rating + Math.sign(ratingOpponent - rating) * 400
      : ratingOpponent;
  const expected = expectedScore(rating, cappedOpponent);
  const k = kFactorUsfc({ rating, games, age });
  const change = Math.round(k * (getScoreValue(score) - expected));
  return { ratingNew: Math.max(100, rating + change), ratingChange: change };
};

export const dwzIndex = ({
  rating,
  age,
}: {
  rating: number;
  age: number;
}): number => {
  if (age >= 21 || rating >= 1300) return 0;
  return Math.min(5, Math.floor((1300 - rating) / 50));
};

export const calculateDwz = ({
  rating,
  ratingOpponent,
  score,
  games,
  age,
}: {
  rating: number;
  ratingOpponent: number;
  score: Score;
  games: number;
  age: number;
}): { ratingNew: number; ratingChange: number } => {
  const e = expectedScore(rating, ratingOpponent);
  const adjusted = e + (dwzIndex({ rating, age }) * (0.5 - e)) / 8;
  const a = Math.max(-5, Math.min(5, (ratingOpponent - rating) / 10));
  const b =
    age >= 60 ? 15 : age < 21 ? (games < 8 ? 5 : games < 30 ? 10 : 15) : 0;
  const k = 1300 / (a + b);
  const change = Math.round(k * (getScoreValue(score) - adjusted));
  return { ratingNew: Math.max(400, rating + change), ratingChange: change };
};

export interface Glicko2Game {
  rating: number;
  rd: number;
  score: number;
}

const glickoScale = 173.7178;

const glickoG = (phi: number): number =>
  1 / Math.sqrt(1 + (3 * phi * phi) / (Math.PI * Math.PI));

const glickoE = (mu: number, muOpp: number, phiOpp: number): number =>
  1 / (1 + Math.exp(-glickoG(phiOpp) * (mu - muOpp)));

const glickoVolatility = ({
  phi,
  sigma,
  delta,
  v,
  tau,
}: {
  phi: number;
  sigma: number;
  delta: number;
  v: number;
  tau: number;
}): number => {
  const a = Math.log(sigma * sigma);
  const phi2 = phi * phi;
  const delta2 = delta * delta;
  const f = (x: number): number => {
    const ex = Math.exp(x);
    const lhs = (ex * (delta2 - phi2 - v - ex)) / (2 * (phi2 + v + ex) ** 2);
    return lhs - (x - a) / (tau * tau);
  };
  let A = a;
  let B: number;
  if (delta2 > phi2 + v) {
    B = Math.log(delta2 - phi2 - v);
  } else {
    let k = 1;
    while (f(a - k * tau) < 0) k++;
    B = a - k * tau;
  }
  let fA = f(A);
  let fB = f(B);
  while (Math.abs(B - A) > 1e-6) {
    const C = A + ((A - B) * fA) / (fB - fA);
    const fC = f(C);
    if (fC * fB <= 0) {
      A = B;
      fA = fB;
    } else {
      fA /= 2;
    }
    B = C;
    fB = fC;
  }
  return Math.exp(A / 2);
};

export const glicko2 = ({
  rating,
  rd,
  sigma = 0.06,
  games,
  tau = 0.5,
}: {
  rating: number;
  rd: number;
  sigma?: number;
  games: Glicko2Game[];
  tau?: number;
}): { rating: number; rd: number; sigma: number } => {
  if (!games.length) {
    return {
      rating,
      rd: glickoScale * Math.sqrt((rd / glickoScale) ** 2 + sigma * sigma),
      sigma,
    };
  }
  const mu = (rating - 1500) / glickoScale;
  const phi = rd / glickoScale;
  const g = games.map((game) => ({
    gPhi: glickoG(game.rd / glickoScale),
    e: glickoE(mu, (game.rating - 1500) / glickoScale, game.rd / glickoScale),
    score: game.score,
  }));
  const v =
    1 /
    g.reduce((sum, item) => sum + item.gPhi ** 2 * item.e * (1 - item.e), 0);
  const delta =
    v * g.reduce((sum, item) => sum + item.gPhi * (item.score - item.e), 0);
  const sigmaNew = glickoVolatility({
    phi,
    sigma,
    delta,
    v,
    tau,
  });
  const phiStar = Math.sqrt(phi * phi + sigmaNew * sigmaNew);
  const phiNew = 1 / Math.sqrt(1 / (phiStar * phiStar) + 1 / v);
  const muNew =
    mu +
    phiNew *
      phiNew *
      g.reduce((sum, item) => sum + item.gPhi * (item.score - item.e), 0);
  return {
    rating: 1500 + glickoScale * muNew,
    rd: glickoScale * phiNew,
    sigma: sigmaNew,
  };
};

export const winPercentFromCentipawns = (cp: number): number =>
  50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);

export const calculateAccuracy = (winPercentLost: number): number =>
  Math.max(
    0,
    Math.min(
      100,
      Math.round(103.1668 * Math.exp(-0.04354 * winPercentLost) - 33.043)
    )
  );

export type MoveClass = 'best' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';

export const classifyMove = (
  winPercentLost: number
): { label: string; code: MoveClass } => {
  if (winPercentLost <= 2) return { label: 'Best', code: 'best' };
  if (winPercentLost <= 5) return { label: 'Good', code: 'good' };
  if (winPercentLost <= 10) return { label: 'Inaccuracy', code: 'inaccuracy' };
  if (winPercentLost <= 20) return { label: 'Mistake', code: 'mistake' };
  return { label: 'Blunder', code: 'blunder' };
};
