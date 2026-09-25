import {
  demandAt,
  effectivePrice,
  elasticityAt,
  equilibriumPrice,
  equilibriumQuantity,
  gap,
  marketCondition,
  maxAffordablePrice,
  supplyAt,
  totalSurplusAt,
} from '../game';

describe('demandAt', () => {
  it('returns the quantity demanded along the linear curve', () => {
    expect(demandAt(40, 100, 1.25)).toBe(50);
  });

  it('clamps to zero above the choke price', () => {
    expect(demandAt(100, 100, 1.25)).toBe(0);
  });
});

describe('supplyAt', () => {
  it('returns the quantity supplied along the linear curve', () => {
    expect(supplyAt(40, 1)).toBe(40);
  });

  it('clamps to zero when the price is zero', () => {
    expect(supplyAt(0, 1)).toBe(0);
  });
});

describe('gap', () => {
  it('is positive below equilibrium, signalling a shortage', () => {
    expect(gap(40, 100, 1.25, 1)).toBe(10);
  });

  it('is negative above equilibrium, signalling a surplus', () => {
    expect(gap(60, 100, 1.25, 1)).toBe(-35);
  });
});

describe('equilibriumPrice', () => {
  it('solves a/(b+c)', () => {
    expect(equilibriumPrice(100, 1.25, 1)).toBeCloseTo(44.44, 2);
  });

  it('returns 0 when b + c is zero', () => {
    expect(equilibriumPrice(100, 0, 0)).toBe(0);
  });
});

describe('equilibriumQuantity', () => {
  it('solves a·c/(b+c)', () => {
    expect(equilibriumQuantity(100, 1.25, 1)).toBeCloseTo(44.44, 2);
  });

  it('returns 0 when b + c is zero', () => {
    expect(equilibriumQuantity(100, 0, 0)).toBe(0);
  });
});

describe('elasticityAt', () => {
  it('is b·(P*/Q*) at equilibrium', () => {
    expect(elasticityAt(100, 1.25, 1)).toBeCloseTo(1.25, 5);
  });

  it('returns 0 when the equilibrium quantity is zero', () => {
    expect(elasticityAt(100, 1.25, 0)).toBe(0);
  });
});

describe('totalSurplusAt', () => {
  it('sums consumer and producer surplus at equilibrium', () => {
    expect(totalSurplusAt(100, 1.25, 1)).toBeCloseTo(1777.78, 1);
  });
});

describe('maxAffordablePrice', () => {
  it('is the intercept divided by the demand slope', () => {
    expect(maxAffordablePrice(100, 1.25)).toBeCloseTo(80, 2);
  });

  it('returns 0 when the slope is zero', () => {
    expect(maxAffordablePrice(100, 0)).toBe(0);
  });
});

describe('effectivePrice', () => {
  it('returns the market price unchanged without controls', () => {
    expect(effectivePrice(40, false, 30, false, 60)).toBe(40);
  });

  it('raises the price to the floor when enabled', () => {
    expect(effectivePrice(10, true, 30, false, 60)).toBe(30);
  });

  it('lowers the price to the ceiling when enabled', () => {
    expect(effectivePrice(70, false, 30, true, 60)).toBe(60);
  });

  it('applies both a floor and a ceiling', () => {
    expect(effectivePrice(50, true, 30, true, 60)).toBe(50);
    expect(effectivePrice(20, true, 30, true, 60)).toBe(30);
    expect(effectivePrice(90, true, 30, true, 60)).toBe(60);
  });
});

describe('marketCondition', () => {
  it('classifies a positive gap as a shortage', () => {
    expect(marketCondition(10)).toBe('shortage');
  });

  it('classifies a negative gap as a surplus', () => {
    expect(marketCondition(-10)).toBe('surplus');
  });

  it('classifies a zero gap as equilibrium', () => {
    expect(marketCondition(0)).toBe('equilibrium');
  });
});
