import { COEFFICIENT_CHOICES, DATA_G_STAR, QUARTERS } from './constants';
import type { CoefficientChoice, DataPoint, FittedLine } from './types';

const round1 = (n: number): number => Math.round(n * 10) / 10 + 0;
const round2 = (n: number): number => Math.round(n * 100) / 100 + 0;

export const rand = (min: number, max: number): number =>
  round1(min + Math.random() * (max - min));

export const annualDelta = (c: number, gStar: number, g: number): number =>
  round2(-c * (g - gStar));

export const quarterlyDelta = (c: number, gStar: number, g: number): number =>
  round2(annualDelta(c, gStar, g) / 4);

export const outputGap = (growth: number, gStar: number): number =>
  round1(growth - gStar);

export const nextUnemployment = (
  unemployment: number,
  c: number,
  gStar: number,
  growth: number
): number => round2(unemployment + annualDelta(c, gStar, growth));

export const projectUnemployment = (
  uStart: number,
  c: number,
  gStar: number,
  growth: number,
  quarters: number = QUARTERS
): number[] => {
  const path = [uStart];
  for (let index = 0; index < quarters; index++) {
    path.push(round2(path[index] + quarterlyDelta(c, gStar, growth)));
  }
  return path;
};

export const sampleStartGap = (): number => {
  const sign = Math.random() < 0.5 ? -1 : 1;
  return sign * rand(0.5, 1.5);
};

export const sampleTrueCoef = (): CoefficientChoice =>
  COEFFICIENT_CHOICES[Math.floor(Math.random() * COEFFICIENT_CHOICES.length)];

export const generateDataset = (c: number): DataPoint[] =>
  Array.from({ length: QUARTERS }, () => {
    const growth = rand(-1, 5);
    const noise = rand(-0.15, 0.15);
    return {
      growth,
      du: round2(-c * (growth - DATA_G_STAR) + noise),
    };
  });

const mean = (values: number[]): number =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

export const estimateLine = (points: DataPoint[]): FittedLine => {
  const meanX = mean(points.map((point) => point.growth));
  const meanY = mean(points.map((point) => point.du));
  const numerator = points.reduce(
    (sum, point) => sum + (point.growth - meanX) * (point.du - meanY),
    0
  );
  const denominator = points.reduce(
    (sum, point) => sum + (point.growth - meanX) ** 2,
    0
  );
  const slope = round2(numerator / denominator);
  const intercept = round2(meanY - slope * meanX);
  return { slope, intercept };
};

export const closestCoef = (slope: number): CoefficientChoice =>
  COEFFICIENT_CHOICES.reduce((best, choice) =>
    Math.abs(choice - Math.abs(slope)) < Math.abs(best - Math.abs(slope))
      ? choice
      : best
  );

export const estimatePoints = (chosen: number, slope: number): number =>
  Math.max(0, Math.round(100 - Math.abs(chosen - Math.abs(slope)) * 100));

export const steerScore = (deviation: number): number =>
  Math.max(0, Math.round(100 - Math.abs(deviation) * 80));

export const isOnTarget = (deviation: number, tolerance: number): boolean =>
  Math.abs(deviation) <= tolerance;
