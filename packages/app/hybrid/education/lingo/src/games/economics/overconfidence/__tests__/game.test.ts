import { NILE_LENGTH } from '../constants';
import {
  answeredCorrect,
  buildBuckets,
  marketHitRate,
  nileInRange,
  positionOutcome,
  scorePct,
} from '../game';
import type { AnsweredQuestion } from '../types';

const answer = (
  confidence: AnsweredQuestion['confidence'],
  correct: boolean
): AnsweredQuestion => ({
  questionIndex: 0,
  option: 'A',
  confidence,
  correct,
});

describe('buildBuckets', () => {
  it('groups answers by confidence and computes accuracy and gap', () => {
    const buckets = buildBuckets([
      answer(90, true),
      answer(90, false),
      answer(90, true),
      answer(50, true),
    ]);
    const b90 = buckets.find((b) => b.confidence === 90)!;
    expect(b90).toEqual({
      confidence: 90,
      correct: 2,
      total: 3,
      accuracy: 67,
      gap: 23,
    });
    const b50 = buckets.find((b) => b.confidence === 50)!;
    expect(b50.accuracy).toBe(100);
    expect(b50.gap).toBe(-50);
  });

  it('leaves empty buckets with zero accuracy and a zero gap', () => {
    const b100 = buildBuckets([]).find((b) => b.confidence === 100)!;
    expect(b100).toEqual({
      confidence: 100,
      correct: 0,
      total: 0,
      accuracy: 0,
      gap: 100,
    });
  });
});

describe('score helpers', () => {
  it('counts correct answers and percentage', () => {
    const answers = [answer(70, true), answer(70, false), answer(70, true)];
    expect(answeredCorrect(answers)).toBe(2);
    expect(scorePct(answers)).toBe(67);
  });

  it('returns zero percentage for no answers', () => {
    expect(scorePct([])).toBe(0);
  });
});

describe('marketHitRate', () => {
  it('falls back to 70% calibration when there are no answers', () => {
    expect(marketHitRate([])).toBe(70);
  });

  it('derives the hit rate from quiz accuracy', () => {
    const answers = [answer(90, true), answer(90, true), answer(90, false)];
    expect(marketHitRate(answers)).toBe(67);
  });
});

describe('positionOutcome', () => {
  it('flags overconfidence when actual accuracy is below the claimed 90%', () => {
    const outcome = positionOutcome(80, 70);
    expect(outcome.overconfident).toBe(true);
    expect(outcome.evClaimed).toBe(64);
    expect(outcome.evActual).toBe(32);
  });

  it('turns a leveraged overconfident bet into a blow-up', () => {
    const outcome = positionOutcome(80, 70);
    expect(outcome.overconfident).toBe(true);
    expect(outcome.evActual).toBe(32);
    expect(outcome.bankroll).toBeLessThan(100);
  });

  it('ruins the trader who bets everything on a 70% edge', () => {
    const outcome = positionOutcome(100, 70);
    expect(outcome.bankroll).toBe(0);
    expect(outcome.overconfident).toBe(true);
  });

  it('preserves capital when sizing at the true Kelly fraction', () => {
    const outcome = positionOutcome(40, 70);
    expect(outcome.overconfident).toBe(true);
    expect(outcome.bankroll).toBeGreaterThan(100);
  });

  it('reports fair pricing when calibration matches the claim', () => {
    const outcome = positionOutcome(60, 90, 90);
    expect(outcome.overconfident).toBe(false);
    expect(outcome.evClaimed).toBe(48);
    expect(outcome.evActual).toBe(48);
  });
});

describe('nileInRange', () => {
  it('confirms brackets that contain the true Nile length', () => {
    expect(nileInRange(5000, 8000)).toBe(true);
    expect(nileInRange(NILE_LENGTH, NILE_LENGTH)).toBe(true);
  });

  it('rejects brackets that miss the true length', () => {
    expect(nileInRange(1000, 3000)).toBe(false);
    expect(nileInRange(7000, 9000)).toBe(false);
  });
});
