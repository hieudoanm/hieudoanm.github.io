import {
  sortByYear,
  findInsertionIndex,
  checkPlacement,
  calculateScore,
  getComboMultiplier,
  formatYear,
  shuffleArray,
} from '../engine';
import type { HistoricalEvent } from '../types';

const makeEvent = (id: string, year: number): HistoricalEvent => ({
  id,
  title: id,
  year,
  description: '',
  category: 'culture',
  region: 'world',
  difficulty: 1,
  source: 'test',
});

describe('sortByYear', () => {
  it('sorts by year ascending', () => {
    const events = [makeEvent('b', 2000), makeEvent('a', 1000)];
    const sorted = sortByYear(events);
    expect(sorted[0].id).toBe('a');
    expect(sorted[1].id).toBe('b');
  });

  it('handles BC years (negative)', () => {
    const events = [makeEvent('a', 44), makeEvent('b', -450)];
    const sorted = sortByYear(events);
    expect(sorted[0].id).toBe('b');
    expect(sorted[1].id).toBe('a');
  });

  it('does not mutate original array', () => {
    const events = [makeEvent('b', 2000), makeEvent('a', 1000)];
    const sorted = sortByYear(events);
    expect(events[0].id).toBe('b');
    expect(sorted).not.toBe(events);
  });
});

describe('findInsertionIndex', () => {
  it('returns 0 for earliest event', () => {
    const timeline = [makeEvent('a', 1492), makeEvent('b', 1945)];
    const event = makeEvent('c', 1066);
    expect(findInsertionIndex(timeline, event)).toBe(0);
  });

  it('returns end for latest event', () => {
    const timeline = [makeEvent('a', 1492), makeEvent('b', 1945)];
    const event = makeEvent('c', 2020);
    expect(findInsertionIndex(timeline, event)).toBe(2);
  });

  it('returns middle index', () => {
    const timeline = [makeEvent('a', 1492), makeEvent('b', 1945)];
    const event = makeEvent('c', 1776);
    expect(findInsertionIndex(timeline, event)).toBe(1);
  });

  it('handles BC events', () => {
    const timeline = [makeEvent('a', -450), makeEvent('b', 44)];
    const event = makeEvent('c', 0);
    expect(findInsertionIndex(timeline, event)).toBe(1);
  });
});

describe('checkPlacement', () => {
  it('returns correct=true when placed at correct index', () => {
    const timeline = [makeEvent('a', 1492), makeEvent('b', 1945)];
    const event = makeEvent('c', 1776);
    const result = checkPlacement(timeline, event, 1);
    expect(result.correct).toBe(true);
    expect(result.correctIndex).toBe(1);
  });

  it('returns correct=false when placed at wrong index', () => {
    const timeline = [makeEvent('a', 1492), makeEvent('b', 1945)];
    const event = makeEvent('c', 1776);
    const result = checkPlacement(timeline, event, 0);
    expect(result.correct).toBe(false);
    expect(result.correctIndex).toBe(1);
  });
});

describe('calculateScore', () => {
  const SLOW_MS = 60000;

  it('returns 0 for incorrect', () => {
    expect(
      calculateScore({
        correct: false,
        streak: 0,
        hintUsed: false,
        timeMs: SLOW_MS,
      })
    ).toBe(0);
  });

  it('returns 100 for correct with no streak (no speed bonus)', () => {
    expect(
      calculateScore({
        correct: true,
        streak: 0,
        hintUsed: false,
        timeMs: SLOW_MS,
      })
    ).toBe(100);
  });

  it('applies combo multiplier for streaks', () => {
    expect(
      calculateScore({
        correct: true,
        streak: 3,
        hintUsed: false,
        timeMs: SLOW_MS,
      })
    ).toBe(200);
    expect(
      calculateScore({
        correct: true,
        streak: 5,
        hintUsed: false,
        timeMs: SLOW_MS,
      })
    ).toBe(300);
    expect(
      calculateScore({
        correct: true,
        streak: 10,
        hintUsed: false,
        timeMs: SLOW_MS,
      })
    ).toBe(500);
  });

  it('deducts points for using hint', () => {
    const withoutHint = calculateScore({
      correct: true,
      streak: 0,
      hintUsed: false,
      timeMs: SLOW_MS,
    });
    const withHint = calculateScore({
      correct: true,
      streak: 0,
      hintUsed: true,
      timeMs: SLOW_MS,
    });
    expect(withoutHint - withHint).toBe(25);
  });

  it('adds speed bonus', () => {
    const fast = calculateScore({
      correct: true,
      streak: 0,
      hintUsed: false,
      timeMs: 1000,
    });
    const slow = calculateScore({
      correct: true,
      streak: 0,
      hintUsed: false,
      timeMs: SLOW_MS,
    });
    expect(fast).toBeGreaterThan(slow);
  });
});

describe('getComboMultiplier', () => {
  it('returns 1 for streak < 3', () => {
    expect(getComboMultiplier(0)).toBe(1);
    expect(getComboMultiplier(2)).toBe(1);
  });

  it('returns 2 for streak >= 3', () => {
    expect(getComboMultiplier(3)).toBe(2);
    expect(getComboMultiplier(4)).toBe(2);
  });

  it('returns 3 for streak >= 5', () => {
    expect(getComboMultiplier(5)).toBe(3);
  });

  it('returns 5 for streak >= 10', () => {
    expect(getComboMultiplier(10)).toBe(5);
  });
});

describe('formatYear', () => {
  it('formats positive years', () => {
    expect(formatYear(1776)).toBe('1776');
  });

  it('formats BC years', () => {
    expect(formatYear(-450)).toBe('450 BC');
  });

  it('formats year 0', () => {
    expect(formatYear(0)).toBe('0');
  });
});

describe('shuffleArray', () => {
  it('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled).toHaveLength(arr.length);
  });

  it('contains all original elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(arr);
    expect(shuffled.sort()).toEqual(arr.sort());
  });

  it('does not mutate original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const copy = [...arr];
    shuffleArray(arr);
    expect(arr).toEqual(copy);
  });

  it('produces deterministic output with same seed', () => {
    const arr = [1, 2, 3, 4, 5];
    const a = shuffleArray(arr, 12345);
    const b = shuffleArray(arr, 12345);
    expect(a).toEqual(b);
  });
});
