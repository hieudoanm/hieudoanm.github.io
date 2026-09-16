import {
  choseOptimalTax,
  isPolicyCorrect,
  optimalOutput,
  taxAccuracy,
} from '../game';

describe('isPolicyCorrect', () => {
  it('matches the exact best policy', () => {
    expect(isPolicyCorrect('pigouvian-tax', 'pigouvian-tax')).toBe(true);
    expect(isPolicyCorrect('subsidy', 'pigouvian-tax')).toBe(false);
  });
});

describe('taxAccuracy', () => {
  it('returns 100 when the tax equals the gap', () => {
    expect(taxAccuracy(20, 20)).toBe(100);
  });

  it('penalises divergence from the gap proportionally', () => {
    expect(taxAccuracy(10, 20)).toBe(50);
    expect(taxAccuracy(30, 20)).toBe(50);
    expect(taxAccuracy(0, 20)).toBe(0);
  });

  it('handles a zero gap', () => {
    expect(taxAccuracy(0, 0)).toBe(100);
    expect(taxAccuracy(5, 0)).toBe(0);
  });
});

describe('optimalOutput', () => {
  it('stays at base output at exactly the Pigouvian tax', () => {
    expect(optimalOutput(20, 20)).toBe(100);
  });

  it('reduces output when the tax misses the gap', () => {
    expect(optimalOutput(0, 20)).toBe(0);
    expect(optimalOutput(10, 20)).toBe(50);
  });

  it('never returns negative output', () => {
    expect(optimalOutput(0, 0)).toBe(100);
  });
});

describe('choseOptimalTax', () => {
  it('accepts a tax within tolerance of the gap', () => {
    expect(choseOptimalTax(20, 20)).toBe(true);
    expect(choseOptimalTax(21, 20)).toBe(true);
    expect(choseOptimalTax(10, 20)).toBe(false);
  });
});
