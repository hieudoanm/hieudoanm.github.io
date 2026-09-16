import {
  sortByYear,
  findInsertionIndex,
  checkPlacement,
  calculateScore,
  getComboMultiplier,
  getHintLevel,
  getHintText,
  formatYear,
  getInitialEvents,
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
import {
  EVENT_A,
  EVENT_B,
  EVENT_C,
  EVENT_BC,
  makeEvent,
} from '../testing/fixtures';

describe('sortByYear', () => {
  it('sorts events chronologically without mutating input', () => {
    const events = [EVENT_C, EVENT_BC, EVENT_A];
    const sorted = sortByYear(events);
    expect(sorted.map((event) => event.year)).toEqual([-500, 1900, 2000]);
    expect(events.map((event) => event.year)).toEqual([2000, -500, 1900]);
  });
});

describe('findInsertionIndex', () => {
  it('returns the first index where the event year is smaller', () => {
    const timeline = [EVENT_A, EVENT_B];
    expect(findInsertionIndex(timeline, EVENT_BC)).toBe(0);
    expect(findInsertionIndex(timeline, makeEvent('x', 1925))).toBe(1);
    expect(findInsertionIndex(timeline, EVENT_C)).toBe(2);
    expect(findInsertionIndex([], EVENT_A)).toBe(0);
  });
});

describe('checkPlacement', () => {
  const timeline = [EVENT_A, EVENT_B];

  it('marks a correct placement', () => {
    expect(checkPlacement(timeline, EVENT_C, 2)).toEqual({
      correct: true,
      correctIndex: 2,
      event: EVENT_C,
    });
  });

  it('marks an incorrect placement and reports the correct index', () => {
    expect(checkPlacement(timeline, EVENT_BC, 1)).toEqual({
      correct: false,
      correctIndex: 0,
      event: EVENT_BC,
    });
  });
});

describe('calculateScore', () => {
  it('scores zero for an incorrect answer', () => {
    expect(
      calculateScore({ correct: false, streak: 3, hintUsed: false, timeMs: 0 })
    ).toBe(0);
  });

  it('awards base points with a speed bonus', () => {
    expect(
      calculateScore({ correct: true, streak: 0, hintUsed: false, timeMs: 0 })
    ).toBe(150);
    expect(
      calculateScore({
        correct: true,
        streak: 0,
        hintUsed: false,
        timeMs: 50_000,
      })
    ).toBe(100);
  });

  it('applies combo multipliers by streak', () => {
    expect(getComboMultiplier(0)).toBe(1);
    expect(getComboMultiplier(2)).toBe(1);
    expect(getComboMultiplier(3)).toBe(2);
    expect(getComboMultiplier(5)).toBe(3);
    expect(getComboMultiplier(10)).toBe(5);
    expect(
      calculateScore({ correct: true, streak: 5, hintUsed: false, timeMs: 0 })
    ).toBe(350);
  });

  it('penalises hints but never goes below zero', () => {
    expect(
      calculateScore({
        correct: true,
        streak: 0,
        hintUsed: true,
        timeMs: 50_000,
      })
    ).toBe(75);
    expect(
      calculateScore({
        correct: true,
        streak: 0,
        hintUsed: true,
        timeMs: 120_000,
      })
    ).toBe(75);
  });
});

describe('getHintLevel', () => {
  it('clamps the hint level between 0 and 3', () => {
    expect(getHintLevel(0)).toBe(0);
    expect(getHintLevel(1)).toBe(1);
    expect(getHintLevel(2)).toBe(2);
    expect(getHintLevel(3)).toBe(3);
    expect(getHintLevel(9)).toBe(3);
  });
});

describe('getHintText', () => {
  it('describes the century at level one', () => {
    expect(getHintText(EVENT_A, 1)).toBe('1900s');
    expect(getHintText(makeEvent('y', 500), 1)).toBe('500s');
  });

  it('describes the decade at level two', () => {
    expect(getHintText(makeEvent('z', 1907), 2)).toBe('1900s');
    expect(getHintText(makeEvent('w', 5), 2)).toBe('0');
  });

  it('reveals neighbours at level three and is empty otherwise', () => {
    expect(getHintText(EVENT_A, 3)).toBe('Neighbouring event revealed');
    expect(getHintText(EVENT_A, 0)).toBe('');
  });
});

describe('formatYear', () => {
  it('formats BC years, zero and AD years', () => {
    expect(formatYear(-44)).toBe('44 BC');
    expect(formatYear(0)).toBe('0');
    expect(formatYear(1969)).toBe('1969');
  });
});

describe('getInitialEvents', () => {
  it('picks the earliest and latest events', () => {
    const initial = getInitialEvents([EVENT_C, EVENT_BC, EVENT_A]);
    expect(initial.map((event) => event.id)).toEqual(['bc', 'c']);
  });

  it('returns a copy for small decks', () => {
    const deck = [EVENT_B];
    const initial = getInitialEvents(deck);
    expect(initial).toEqual([EVENT_B]);
    expect(initial).not.toBe(deck);
  });
});

describe('shuffleArray', () => {
  it('keeps all elements with the same seed deterministic', () => {
    const items = [1, 2, 3, 4, 5];
    expect(shuffleArray(items, 42)).toEqual(shuffleArray(items, 42));
    expect([...shuffleArray(items, 42)].sort()).toEqual(items);
    expect(items).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('century helpers', () => {
  it('computes century keys for AD and BC years', () => {
    expect(getCenturyKey(1900)).toBe(19);
    expect(getCenturyKey(1901)).toBe(20);
    expect(getCenturyKey(-500)).toBe(-5);
    expect(getCenturyKey(0)).toBe(-1);
  });

  it('labels centuries with ordinal suffixes', () => {
    expect(getCenturyLabel(1900)).toBe('19th century');
    expect(getCenturyLabel(105)).toBe('2nd century');
    expect(getCenturyLabel(1001)).toBe('11th century');
    expect(getCenturyLabel(1301)).toBe('14th century');
    expect(getCenturyLabel(-500)).toBe('5th century BC');
  });

  it('computes century start years', () => {
    expect(getCenturyStartYear(20)).toBe(1901);
    expect(getCenturyStartYear(-5)).toBe(-500);
  });
});

describe('groupByCentury', () => {
  it('groups events into ordered century buckets', () => {
    const groups = groupByCentury([
      EVENT_B,
      EVENT_BC,
      makeEvent('d', 1955),
      EVENT_A,
    ]);
    expect(groups.map((group) => group.label)).toEqual([
      '5th century BC',
      '19th century',
      '20th century',
    ]);
    expect(groups[1].events.map((event) => event.id)).toEqual(['a']);
    expect(groups[2].events).toHaveLength(2);
  });
});

describe('getTimelineBounds', () => {
  it('returns zero bounds for an empty timeline', () => {
    expect(getTimelineBounds([])).toEqual({ minYear: 0, maxYear: 0, span: 0 });
  });

  it('returns min, max and span', () => {
    expect(getTimelineBounds([EVENT_B, EVENT_BC])).toEqual({
      minYear: -500,
      maxYear: 1950,
      span: 2450,
    });
  });
});

describe('decade helpers', () => {
  it('computes decade keys and start years', () => {
    expect(getDecadeKey(1990)).toBe(199);
    expect(getDecadeKey(1991)).toBe(200);
    expect(getDecadeStartYear(199)).toBe(1981);
    expect(getDecadeStartYear(-5)).toBe(-50);
  });

  it('labels decades including BC', () => {
    expect(getDecadeLabel(1991)).toBe('1990s');
    expect(getDecadeLabel(-55)).toBe('60s BC');
  });
});

describe('getYearDivider', () => {
  it('detects century starts', () => {
    expect(getYearDivider(1901)).toEqual({
      kind: 'century',
      label: '20th century',
    });
  });

  it('detects decade starts', () => {
    expect(getYearDivider(1991)).toEqual({
      kind: 'decade',
      label: '1990s',
    });
  });

  it('returns null for ordinary years', () => {
    expect(getYearDivider(1955)).toBeNull();
  });
});
