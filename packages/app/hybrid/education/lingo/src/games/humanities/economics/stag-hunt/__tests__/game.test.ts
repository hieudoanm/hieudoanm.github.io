import {
  fellowHunter,
  hareSeeker,
  mimicMove,
  grudgerMove,
  payoffs,
} from '../game';

describe('payoffs', () => {
  it('returns 4,4 when both play stag', () => {
    expect(payoffs('stag', 'stag')).toEqual([4, 4]);
  });

  it('returns 0,3 when player plays stag and partner plays hare', () => {
    expect(payoffs('stag', 'hare')).toEqual([0, 3]);
  });

  it('returns 3,0 when player plays hare and partner plays stag', () => {
    expect(payoffs('hare', 'stag')).toEqual([3, 0]);
  });

  it('returns 3,3 when both play hare', () => {
    expect(payoffs('hare', 'hare')).toEqual([3, 3]);
  });
});

describe('fellowHunter', () => {
  it('always returns stag', () => {
    expect(fellowHunter()).toBe('stag');
  });
});

describe('hareSeeker', () => {
  it('always returns hare', () => {
    expect(hareSeeker()).toBe('hare');
  });
});

describe('mimicMove', () => {
  it('returns stag when history is empty', () => {
    expect(mimicMove([])).toBe('stag');
  });

  it('copies the last player move', () => {
    expect(mimicMove(['stag', 'hare'])).toBe('hare');
    expect(mimicMove(['hare', 'hare', 'stag'])).toBe('stag');
  });
});

describe('grudgerMove', () => {
  it('returns stag when player has never played hare', () => {
    expect(grudgerMove([])).toBe('stag');
    expect(grudgerMove(['stag', 'stag'])).toBe('stag');
  });

  it('returns hare once player has played hare', () => {
    expect(grudgerMove(['stag', 'hare'])).toBe('hare');
    expect(grudgerMove(['hare'])).toBe('hare');
  });
});
