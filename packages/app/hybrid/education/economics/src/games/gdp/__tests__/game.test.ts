import {
  computeDeflator,
  computeGdp,
  computeRealGdp,
  withinTolerance,
} from '../game';

describe('computeGdp', () => {
  it('sums the four expenditure components', () => {
    const components = {
      consumption: 100,
      investment: 50,
      government: 25,
      netExports: 10,
    };
    expect(computeGdp(components)).toBe(185);
  });

  it('lets negative net exports reduce GDP', () => {
    const components = {
      consumption: 100,
      investment: 0,
      government: 0,
      netExports: -40,
    };
    expect(computeGdp(components)).toBe(60);
  });
});

describe('computeRealGdp', () => {
  it('equals nominal when the price index is 100', () => {
    expect(computeRealGdp(200, 100)).toBe(200);
  });

  it('defaltes nominal by the price index', () => {
    expect(computeRealGdp(200, 150)).toBe(133);
    expect(computeRealGdp(200, 50)).toBe(400);
  });
});

describe('computeDeflator', () => {
  it('returns the price level implied by nominal and real GDP', () => {
    expect(computeDeflator(200, 200)).toBe(100);
    expect(computeDeflator(200, 133)).toBe(150);
  });

  it('guards against division by zero real GDP', () => {
    expect(computeDeflator(0, 0)).toBe(0);
  });
});

describe('withinTolerance', () => {
  it('accepts values inside the tolerance window', () => {
    expect(withinTolerance(120, 120)).toBe(true);
    expect(withinTolerance(125, 120)).toBe(true);
    expect(withinTolerance(115, 120)).toBe(true);
  });

  it('rejects values outside the tolerance window', () => {
    expect(withinTolerance(126, 120)).toBe(false);
    expect(withinTolerance(114, 120)).toBe(false);
  });

  it('uses the provided tolerance when given', () => {
    expect(withinTolerance(20, 0, 20)).toBe(true);
    expect(withinTolerance(21, 0, 20)).toBe(false);
  });
});
