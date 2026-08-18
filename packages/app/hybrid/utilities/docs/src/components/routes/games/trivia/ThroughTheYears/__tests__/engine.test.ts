import {
  sortByYear,
  findInsertionIndex,
  checkPlacement,
  calculateScore,
  getComboMultiplier,
  formatYear,
  shuffleArray,
  getCenturyKey,
  getCenturyLabel,
  getCenturyStartYear,
  groupByCentury,
  getTimelineBounds,
  getDecadeKey,
  getDecadeStartYear,
  getDecadeLabel,
  getYearDivider,
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

describe('getCenturyKey', () => {
  it('maps AD years to their century', () => {
    expect(getCenturyKey(45)).toBe(1);
    expect(getCenturyKey(1066)).toBe(11);
    expect(getCenturyKey(1969)).toBe(20);
    expect(getCenturyKey(2001)).toBe(21);
  });

  it('maps BC years to negative centuries', () => {
    expect(getCenturyKey(-45)).toBe(-1);
    expect(getCenturyKey(-450)).toBe(-5);
    expect(getCenturyKey(-1969)).toBe(-20);
  });

  it('maps year 0 to the 1st century BC', () => {
    expect(getCenturyKey(0)).toBe(-1);
  });
});

describe('getCenturyLabel', () => {
  it('formats ordinal suffixes', () => {
    expect(getCenturyLabel(45)).toBe('1st century');
    expect(getCenturyLabel(101)).toBe('2nd century');
    expect(getCenturyLabel(1500)).toBe('15th century');
    expect(getCenturyLabel(2001)).toBe('21st century');
  });

  it('adds BC suffix for negative years', () => {
    expect(getCenturyLabel(-45)).toBe('1st century BC');
    expect(getCenturyLabel(-1969)).toBe('20th century BC');
  });
});

describe('getCenturyStartYear', () => {
  it('returns the first year of a century', () => {
    expect(getCenturyStartYear(1)).toBe(1);
    expect(getCenturyStartYear(20)).toBe(1901);
    expect(getCenturyStartYear(-1)).toBe(-100);
    expect(getCenturyStartYear(-20)).toBe(-2000);
  });
});

describe('groupByCentury', () => {
  it('groups events by century in ascending order', () => {
    const events = [
      makeEvent('a', 1776),
      makeEvent('b', 1492),
      makeEvent('c', 1789),
      makeEvent('d', 1500),
    ];
    const groups = groupByCentury(events);
    expect(groups.map((group) => group.key)).toEqual([15, 18]);
    expect(groups[0].label).toBe('15th century');
    expect(groups[0].events.map((event) => event.id)).toEqual(['b', 'd']);
    expect(groups[1].events.map((event) => event.id)).toEqual(['a', 'c']);
  });

  it('separates BC and AD centuries', () => {
    const events = [makeEvent('a', 44), makeEvent('b', -45)];
    const groups = groupByCentury(events);
    expect(groups.map((group) => group.key)).toEqual([-1, 1]);
    expect(groups[0].label).toBe('1st century BC');
    expect(groups[1].label).toBe('1st century');
  });
});

describe('getTimelineBounds', () => {
  it('computes min, max and span', () => {
    const events = [
      makeEvent('a', -450),
      makeEvent('b', 1066),
      makeEvent('c', 1969),
    ];
    expect(getTimelineBounds(events)).toEqual({
      minYear: -450,
      maxYear: 1969,
      span: 2419,
    });
  });

  it('returns zeros for empty events', () => {
    expect(getTimelineBounds([])).toEqual({ minYear: 0, maxYear: 0, span: 0 });
  });
});

describe('getDecadeKey', () => {
  it('maps AD years to their decade', () => {
    expect(getDecadeKey(1)).toBe(1);
    expect(getDecadeKey(10)).toBe(1);
    expect(getDecadeKey(11)).toBe(2);
    expect(getDecadeKey(1960)).toBe(196);
    expect(getDecadeKey(1969)).toBe(197);
  });

  it('maps BC years to negative decades', () => {
    expect(getDecadeKey(0)).toBe(-1);
    expect(getDecadeKey(-1)).toBe(-1);
    expect(getDecadeKey(-10)).toBe(-1);
    expect(getDecadeKey(-11)).toBe(-2);
    expect(getDecadeKey(-1960)).toBe(-196);
  });
});

describe('getDecadeStartYear', () => {
  it('returns the first year of a decade', () => {
    expect(getDecadeStartYear(1)).toBe(1);
    expect(getDecadeStartYear(197)).toBe(1961);
    expect(getDecadeStartYear(-1)).toBe(-10);
    expect(getDecadeStartYear(-196)).toBe(-1960);
  });
});

describe('getDecadeLabel', () => {
  it('formats conventional decade labels', () => {
    expect(getDecadeLabel(1961)).toBe('1960s');
    expect(getDecadeLabel(1969)).toBe('1960s');
    expect(getDecadeLabel(2001)).toBe('2000s');
  });

  it('adds BC suffix for negative years', () => {
    expect(getDecadeLabel(-1960)).toBe('1960s BC');
    expect(getDecadeLabel(-50)).toBe('50s BC');
  });
});

describe('getYearDivider', () => {
  it('marks century starts', () => {
    expect(getYearDivider(1901)).toEqual({
      kind: 'century',
      label: '20th century',
    });
    expect(getYearDivider(-100)).toEqual({
      kind: 'century',
      label: '1st century BC',
    });
  });

  it('marks decade starts that are not century starts', () => {
    expect(getYearDivider(1961)).toEqual({ kind: 'decade', label: '1960s' });
    expect(getYearDivider(-1960)).toEqual({
      kind: 'decade',
      label: '1960s BC',
    });
  });

  it('returns null for plain years', () => {
    expect(getYearDivider(45)).toBeNull();
    expect(getYearDivider(1960)).toBeNull();
    expect(getYearDivider(1965)).toBeNull();
  });
});
