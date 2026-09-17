import {
  bestQ,
  demandPrice,
  deriveLab,
  dwlAt,
  effectiveIntercept,
  interceptAt,
  longRunIntercept,
  marginalRevenue,
  profitAt,
  quizBestQ,
  quizDwl,
  quizDwlAtOptimum,
  quizPrice,
  quizProfit,
  slopeAt,
  totalCost,
  totalRevenue,
} from '../game';

describe('interceptAt', () => {
  it('starts at 40 and reaches 120 at full differentiation', () => {
    expect(interceptAt(0)).toBe(40);
    expect(interceptAt(100)).toBe(120);
  });
});

describe('slopeAt', () => {
  it('grows from 0.4 to 1.0 as differentiation rises', () => {
    expect(slopeAt(0)).toBe(0.4);
    expect(slopeAt(100)).toBe(1);
  });
});

describe('longRunIntercept', () => {
  it('is the intercept that zeroes long-run profit', () => {
    expect(longRunIntercept(100)).toBe(28);
  });
});

describe('effectiveIntercept', () => {
  it('erodes demand toward the long-run level under entry', () => {
    expect(effectiveIntercept(100, 0, 'monopolistic')).toBe(120);
    expect(effectiveIntercept(100, 0.5, 'monopolistic')).toBe(74);
    expect(effectiveIntercept(100, 1, 'monopolistic')).toBe(28);
    expect(effectiveIntercept(100, 1, 'monopoly')).toBe(120);
  });
});

describe('demandPrice', () => {
  it('prices on the demand line for pricing modes', () => {
    expect(demandPrice(20, 75, 0, 'monopoly')).toBe(83);
  });

  it('takes the market price in perfect competition', () => {
    expect(demandPrice(20, 75, 0, 'perfect')).toBe(8);
  });
});

describe('marginalRevenue', () => {
  it('doubles the demand slope for pricing modes', () => {
    expect(marginalRevenue(20, 75, 0, 'monopoly')).toBe(66);
  });

  it('equals price for a price-taking firm', () => {
    expect(marginalRevenue(20, 75, 0, 'perfect')).toBe(8);
  });
});

describe('cost and profit', () => {
  it('charges fixed cost only when the firm has pricing power', () => {
    expect(totalCost(20, 'monopolistic')).toBe(260);
    expect(totalCost(20, 'perfect')).toBe(160);
  });

  it('computes total revenue and profit for a given output', () => {
    expect(totalRevenue(20, 75, 0, 'monopoly')).toBe(1660);
    expect(profitAt(20, 75, 0, 'monopolistic')).toBe(1400);
  });
});

describe('bestQ', () => {
  it('finds the MR = MC output for pricing modes', () => {
    expect(bestQ(75, 0, 'monopolistic')).toBe(54);
  });

  it('finds the market-clearing output in perfect competition', () => {
    expect(bestQ(75, 0, 'perfect')).toBe(108);
  });
});

describe('dwlAt', () => {
  it('is a triangle between demand and marginal cost', () => {
    expect(dwlAt(20, 75, 0, 'monopoly')).toBe(3309);
  });

  it('is zero for a price-taking firm', () => {
    expect(dwlAt(20, 75, 0, 'perfect')).toBe(0);
  });
});

describe('deriveLab', () => {
  it('derives the full set of lab figures from a demand point', () => {
    const derived = deriveLab({
      quantity: 51,
      differentiation: 50,
      entryProgress: 0,
      mode: 'monopolistic',
    });
    expect(derived.price).toBe(44);
    expect(derived.totalRevenue).toBe(2259);
    expect(derived.totalCost).toBe(508);
    expect(derived.profit).toBe(1751);
    expect(derived.marginalRevenue).toBe(9);
    expect(derived.marginalCost).toBe(8);
    expect(derived.bestQuantity).toBe(51);
    expect(derived.dwl).toBe(941);
  });
});

describe('quiz helpers', () => {
  it('finds the profit-maximizing quantity where MR = MC', () => {
    expect(quizBestQ(60, 0.5)).toBe(52);
  });

  it('prices on the given demand line', () => {
    expect(quizPrice(52, 60, 0.5)).toBe(34);
  });

  it('computes profit including fixed cost', () => {
    expect(quizProfit(52, 60, 0.5)).toBe(1252);
  });

  it('computes the deadweight-loss triangle', () => {
    expect(quizDwl(52, 60, 0.5)).toBe(676);
    expect(quizDwlAtOptimum(60, 0.5)).toBe(676);
  });
});
