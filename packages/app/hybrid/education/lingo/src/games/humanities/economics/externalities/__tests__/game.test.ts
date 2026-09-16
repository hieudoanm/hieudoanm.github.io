import { EXTERNAL_DAMAGE, MAX_Q, TAX_RATE } from '../constants';
import {
  calloutText,
  damage,
  phaseForRound,
  privateOptimalQ,
  prodCost,
  profit,
  revenue,
  roundReport,
  socialOptimalQ,
  socialWelfare,
  taxFor,
  taxRateForPhase,
} from '../game';

describe('revenue', () => {
  it('charges the market price times quantity', () => {
    expect(revenue(5)).toBe(75);
    expect(revenue(10)).toBe(100);
  });
});

describe('prodCost', () => {
  it('returns half the square of quantity', () => {
    expect(prodCost(5)).toBe(12.5);
    expect(prodCost(10)).toBe(50);
  });
});

describe('damage', () => {
  it('scales constant external damage per unit', () => {
    expect(damage(5)).toBe(20);
    expect(damage(4)).toBe(EXTERNAL_DAMAGE * 4);
  });
});

describe('taxFor', () => {
  it('multiplies quantity by the tax rate', () => {
    expect(taxFor(5, 4)).toBe(20);
    expect(taxFor(7, 0)).toBe(0);
  });
});

describe('profit', () => {
  it('is revenue minus cost minus tax', () => {
    expect(profit(5, 4)).toBe(42.5);
    expect(profit(7, 0)).toBe(66.5);
  });
});

describe('socialWelfare', () => {
  it('subtracts external damage from private profit', () => {
    expect(socialWelfare(5)).toBe(42.5);
    expect(socialWelfare(10)).toBe(10);
  });
});

describe('privateOptimalQ', () => {
  it('overshoots the social optimum without a tax', () => {
    expect(privateOptimalQ(0)).toBeGreaterThan(socialOptimalQ());
  });

  it('lands exactly on the social optimum at the Pigouvian rate', () => {
    expect(privateOptimalQ(TAX_RATE)).toBe(socialOptimalQ());
  });
});

describe('socialOptimalQ', () => {
  it('maximizes social welfare at Q=5', () => {
    expect(socialOptimalQ()).toBe(5);
  });
});

describe('phaseForRound', () => {
  it('maps rounds 1-3 to phase 1 and 4-6 to phase 2', () => {
    for (let round = 1; round <= 3; round++) {
      expect(phaseForRound(round)).toBe(1);
    }
    for (let round = 4; round <= 6; round++) {
      expect(phaseForRound(round)).toBe(2);
    }
  });
});

describe('taxRateForPhase', () => {
  it('charges no tax in phase 1 and the Pigouvian rate in phase 2', () => {
    expect(taxRateForPhase(1)).toBe(0);
    expect(taxRateForPhase(2)).toBe(TAX_RATE);
  });
});

describe('calloutText', () => {
  it('explains the overshoot in phase 1 and alignment in phase 2', () => {
    expect(calloutText(1)).toBe(
      "Your private optimum overshoots the social optimum — pollution isn't priced."
    );
    expect(calloutText(2)).toBe(
      'With the tax your private optimum equals the social optimum (Q=5).'
    );
  });
});

describe('roundReport', () => {
  it('reports price, revenue, costs, tax, profit and welfare', () => {
    const report = roundReport(1, 5);
    expect(report.price).toBe(15);
    expect(report.revenue).toBe(75);
    expect(report.prodCost).toBe(12.5);
    expect(report.damage).toBe(20);
    expect(report.taxPaid).toBe(0);
    expect(report.profit).toBe(62.5);
    expect(report.socialWelfare).toBe(42.5);
  });

  it('applies the Pigouvian tax in phase 2', () => {
    const report = roundReport(4, 5);
    expect(report.taxPaid).toBe(20);
    expect(report.profit).toBe(42.5);
  });

  it('keeps quantity within the allowed range', () => {
    expect(MAX_Q).toBe(15);
  });
});
