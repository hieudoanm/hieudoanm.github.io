import { ROUNDS } from '../constants';
import {
  absError,
  anchorBiasReport,
  scoreConjunction,
  scoreRound,
} from '../game';
import type { RoundResult } from '../types';

const result = (
  roundId: string,
  guess: number,
  error: number,
  points: number
): RoundResult => ({ roundId, guess, error, points });

describe('absError', () => {
  it('measures the distance between guess and answer', () => {
    expect(absError(100, 50)).toBe(50);
    expect(absError(50, 100)).toBe(50);
    expect(absError(25, 25)).toBe(0);
  });
});

describe('scoreRound', () => {
  it('awards 2 points when within 25% of the true answer', () => {
    expect(scoreRound(54, 54)).toBe(2);
    expect(scoreRound(67.5, 54)).toBe(2);
    expect(scoreRound(40.5, 54)).toBe(2);
  });

  it('awards 1 point when within 50% of the true answer', () => {
    expect(scoreRound(80, 54)).toBe(1);
    expect(scoreRound(81, 54)).toBe(1);
  });

  it('awards 0 points beyond 50% of the true answer', () => {
    expect(scoreRound(82, 54)).toBe(0);
    expect(scoreRound(1, 54)).toBe(0);
    expect(scoreRound(1000, 54)).toBe(0);
  });
});

describe('scoreConjunction', () => {
  it('rewards keeping P(A and B) no higher than P(A)', () => {
    expect(scoreConjunction(40, 30)).toBe(2);
    expect(scoreConjunction(40, 40)).toBe(2);
  });

  it('penalises a conjunction guess above the base rate', () => {
    expect(scoreConjunction(40, 45)).toBe(0);
    expect(scoreConjunction(0, 0)).toBe(0);
  });
});

describe('anchorBiasReport', () => {
  it('reports higher average error on anchored rounds than the control', () => {
    const results = [
      result('africa-countries', 120, 66, 0),
      result('hurricane-sandy', 500, 267, 0),
      result('nyc-rain', 50, 0, 2),
    ];
    const report = anchorBiasReport(results, ROUNDS);
    expect(report.anchoredAvgError).toBe(166.5);
    expect(report.controlError).toBe(0);
    expect(report.drifted).toBe(true);
    expect(report.summary).toContain('166.5');
    expect(report.summary).toContain('control');
  });

  it('ignores availability rounds when aggregating anchored error', () => {
    const results = [
      result('africa-countries', 120, 66, 0),
      result('words-start-r', 90, 84, 0),
      result('nyc-rain', 50, 0, 2),
    ];
    const report = anchorBiasReport(results, ROUNDS);
    expect(report.anchoredAvgError).toBe(66);
    expect(report.controlError).toBe(0);
  });

  it('reports resistance when anchored error is low', () => {
    const results = [
      result('africa-countries', 60, 6, 1),
      result('hurricane-sandy', 250, 17, 1),
      result('nyc-rain', 80, 30, 0),
    ];
    const report = anchorBiasReport(results, ROUNDS);
    expect(report.anchoredAvgError).toBe(11.5);
    expect(report.controlError).toBe(30);
    expect(report.drifted).toBe(false);
    expect(report.summary).toContain('resisted');
  });
});
