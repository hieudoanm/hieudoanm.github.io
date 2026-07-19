import { Score } from '../rating';
import {
  expectedScore,
  winProbability,
  kFactorFide,
  kFactorUsfc,
  calculateUsfc,
  calculateDwz,
  dwzIndex,
  glicko2,
  winPercentFromCentipawns,
  calculateAccuracy,
  classifyMove,
} from '../systems';

describe('expectedScore', () => {
  test('equal ratings give 0.5', () => {
    expect(expectedScore(1500, 1500)).toBeCloseTo(0.5, 6);
  });

  test('higher-rated player has higher expectation', () => {
    expect(expectedScore(1600, 1400)).toBeGreaterThan(0.7);
  });

  test('400-point gap gives ~0.91', () => {
    expect(expectedScore(1800, 1400)).toBeCloseTo(1 / 1.1, 5);
  });
});

describe('winProbability', () => {
  test('equal ratings yield under 0.5 due to draws', () => {
    expect(winProbability(1500, 1500)).toBeLessThan(0.5);
  });

  test('clamped within bounds', () => {
    expect(winProbability(3000, 1000)).toBe(0.97);
    expect(winProbability(1000, 3000)).toBe(0.01);
  });
});

describe('k-factor presets', () => {
  test('FIDE returns 40 for new or young players', () => {
    expect(kFactorFide({ rating: 1500, games: 5, age: 17 })).toBe(40);
    expect(kFactorFide({ rating: 1500, games: 5, age: 30 })).toBe(40);
  });

  test('FIDE returns 20 for established under-2400 players', () => {
    expect(kFactorFide({ rating: 2000, games: 50, age: 30 })).toBe(20);
  });

  test('FIDE returns 10 above 2400', () => {
    expect(kFactorFide({ rating: 2500, games: 50, age: 30 })).toBe(10);
  });

  test('USCF returns 50 for juniors under 2200', () => {
    expect(kFactorUsfc({ rating: 1800, games: 50, age: 16 })).toBe(50);
  });

  test('USCF returns 32/24/16 by rating band', () => {
    expect(kFactorUsfc({ rating: 2000, games: 50, age: 30 })).toBe(32);
    expect(kFactorUsfc({ rating: 2200, games: 50, age: 30 })).toBe(24);
    expect(kFactorUsfc({ rating: 2500, games: 50, age: 30 })).toBe(16);
  });
});

describe('calculateUsfc', () => {
  test('win against equal opponent at rating 2000 gains 16 points', () => {
    const result = calculateUsfc({
      rating: 2000,
      ratingOpponent: 2000,
      score: Score.WIN,
      games: 50,
      age: 30,
    });
    expect(result.ratingChange).toBe(16);
    expect(result.ratingNew).toBe(2016);
  });

  test('400-point cap applied for wild mismatches', () => {
    const result = calculateUsfc({
      rating: 1200,
      ratingOpponent: 2200,
      score: Score.WIN,
      games: 50,
      age: 30,
    });
    expect(result.ratingChange).toBeGreaterThan(0);
    expect(result.ratingChange).toBeLessThan(32);
  });

  test('rating never drops below floor 100', () => {
    const result = calculateUsfc({
      rating: 100,
      ratingOpponent: 1500,
      score: Score.LOSS,
      games: 50,
      age: 30,
    });
    expect(result.ratingNew).toBe(100);
  });
});

describe('DWZ', () => {
  test('dwzIndex zero for adults or high ratings', () => {
    expect(dwzIndex({ rating: 1200, age: 30 })).toBe(0);
    expect(dwzIndex({ rating: 1400, age: 12 })).toBe(0);
  });

  test('dwzIndex scales with gap below 1300 for juniors', () => {
    expect(dwzIndex({ rating: 1200, age: 12 })).toBe(2);
    expect(dwzIndex({ rating: 900, age: 12 })).toBe(5);
  });

  test('win against equal opponent bumps rating', () => {
    const result = calculateDwz({
      rating: 1500,
      ratingOpponent: 1500,
      score: Score.WIN,
      games: 30,
      age: 30,
    });
    expect(result.ratingNew).toBeGreaterThan(1500);
  });

  test('rating never drops below floor 400', () => {
    const result = calculateDwz({
      rating: 405,
      ratingOpponent: 405,
      score: Score.LOSS,
      games: 30,
      age: 30,
    });
    expect(result.ratingNew).toBe(400);
  });
});

describe('glicko2', () => {
  test('matches reference vector from the Glicko-2 paper', () => {
    const result = glicko2({
      rating: 1500,
      rd: 200,
      sigma: 0.06,
      games: [
        { rating: 1400, rd: 30, score: 1 },
        { rating: 1550, rd: 100, score: 0 },
        { rating: 1700, rd: 300, score: 0 },
      ],
    });
    expect(result.rating).toBeCloseTo(1464, 0);
    expect(result.rd).toBeCloseTo(152, 0);
    expect(result.sigma).toBeCloseTo(0.06, 3);
  });

  test('no games grows RD by the volatility and keeps rating', () => {
    const result = glicko2({ rating: 1500, rd: 200, sigma: 0.06, games: [] });
    expect(result.rd).toBeGreaterThan(200);
    expect(result.rd).toBeLessThan(201);
    expect(result.rating).toBeCloseTo(1500, 5);
    expect(result.sigma).toBe(0.06);
  });
});

describe('analysis math', () => {
  test('winPercentFromCentipawns maps 0cp to 50', () => {
    expect(winPercentFromCentipawns(0)).toBeCloseTo(50, 5);
  });

  test('winPercentFromCentipawns maps high advantage near 100', () => {
    expect(winPercentFromCentipawns(500)).toBeGreaterThan(85);
    expect(winPercentFromCentipawns(-500)).toBeLessThan(15);
  });

  test('calculateAccuracy bounded to 0..100 on lichess scale', () => {
    expect(calculateAccuracy(0)).toBe(70);
    expect(calculateAccuracy(100)).toBe(0);
    expect(calculateAccuracy(-5)).toBe(95);
  });

  test('classifyMove thresholds', () => {
    expect(classifyMove(0).code).toBe('best');
    expect(classifyMove(3).code).toBe('good');
    expect(classifyMove(7).code).toBe('inaccuracy');
    expect(classifyMove(15).code).toBe('mistake');
    expect(classifyMove(30).code).toBe('blunder');
  });
});
