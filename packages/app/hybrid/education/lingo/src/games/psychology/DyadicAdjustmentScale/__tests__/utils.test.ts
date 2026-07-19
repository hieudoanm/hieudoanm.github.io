import {
  DAS_ITEMS,
  DAS_TOTAL_MAX,
  computeDasScores,
  interpretDasTotal,
} from '../utils';

describe('DAS_ITEMS', () => {
  it('has 32 items across four subscales', () => {
    expect(DAS_ITEMS).toHaveLength(32);
    const subscales = new Set(DAS_ITEMS.map((item) => item.subscale));
    expect(subscales).toEqual(
      new Set(['consensus', 'satisfaction', 'cohesion', 'affectional'])
    );
  });
});

describe('computeDasScores', () => {
  it('sums subscales and the total when every item is maxed', () => {
    const responses = DAS_ITEMS.map((item) =>
      Math.max(...item.options.map((option) => option.value))
    );
    const scores = computeDasScores(responses);
    expect(scores.total).toBe(DAS_TOTAL_MAX);
    expect(scores.consensus).toBe(65);
    expect(scores.satisfaction).toBe(50);
    expect(scores.cohesion).toBe(24);
    expect(scores.affectional).toBe(12);
  });

  it('returns zeros for empty responses', () => {
    const scores = computeDasScores(DAS_ITEMS.map(() => 0));
    expect(scores.total).toBe(0);
  });
});

describe('interpretDasTotal', () => {
  it('labels totals of 102+ as non-distressed', () => {
    expect(interpretDasTotal(102)).toBe('Relationally non-distressed');
  });

  it('labels totals below 102 as distressed', () => {
    expect(interpretDasTotal(101)).toBe('Relationally distressed');
  });
});
