import {
  CONFIDENCES,
  MARKET_TRADES,
  STARTING_CAPITAL,
  TRAINER_CLAIMED,
} from './constants';
import { NILE_LENGTH } from './constants';
import type { AnsweredQuestion, Bucket, MarketOutcome } from './types';

export const pct = (n: number): number => Math.round(n);

export const answeredTotal = (answers: AnsweredQuestion[]): number =>
  answers.length;

export const answeredCorrect = (answers: AnsweredQuestion[]): number =>
  answers.filter((a) => a.correct).length;

export const scorePct = (answers: AnsweredQuestion[]): number =>
  answers.length === 0
    ? 0
    : pct((answeredCorrect(answers) / answers.length) * 100);

export const buildBuckets = (answers: AnsweredQuestion[]): Bucket[] =>
  CONFIDENCES.map((confidence) => {
    const inBucket = answers.filter((a) => a.confidence === confidence);
    const correct = inBucket.filter((a) => a.correct).length;
    const total = inBucket.length;
    const accuracy = total === 0 ? 0 : pct((correct / total) * 100);
    return { confidence, correct, total, accuracy, gap: confidence - accuracy };
  });

export const marketHitRate = (answers: AnsweredQuestion[]): number => {
  if (answers.length === 0) return TRAINER_CLAIMED - 20;
  const accuracy = (answeredCorrect(answers) / answers.length) * 100;
  return Math.max(1, pct(accuracy));
};

export const positionOutcome = (
  position: number,
  actual: number,
  claimed: number = TRAINER_CLAIMED
): MarketOutcome => {
  const evClaimed = pct(position * (2 * (claimed / 100) - 1));
  const evActual = pct(position * (2 * (actual / 100) - 1));
  const fraction = position / 100;
  const hit = actual / 100;
  const growth =
    Math.pow(1 - fraction, MARKET_TRADES * (1 - hit)) *
    Math.pow(1 + fraction, MARKET_TRADES * hit);
  const bankroll = STARTING_CAPITAL * growth;
  return {
    claimed,
    actual,
    evClaimed,
    evActual,
    bankroll,
    overconfident: actual < claimed,
  };
};

export const nileInRange = (low: number, high: number): boolean =>
  low <= NILE_LENGTH && NILE_LENGTH <= high;
