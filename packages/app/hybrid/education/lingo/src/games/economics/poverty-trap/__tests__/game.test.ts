import {
  buildScenario,
  classifyTrap,
  discretionaryIncome,
  escapeThreshold,
  hasEscaped,
  minimumTransferFor,
  netSavings,
  nextCapital,
  production,
  simulate,
  simulateYear,
} from '../game';

describe('production', () => {
  it('computes A*K^alpha and never goes negative', () => {
    expect(production(60)).toBeCloseTo(35.49, 1);
    expect(production(0)).toBe(0);
    expect(production(-5)).toBe(0);
  });
});

describe('escapeThreshold', () => {
  it('rises with subsistence', () => {
    expect(escapeThreshold(30)).toBeCloseTo(39.42, 1);
    expect(escapeThreshold(48)).toBeGreaterThan(escapeThreshold(30));
  });
});

describe('discretionaryIncome', () => {
  it('is zero below the subsistence floor', () => {
    expect(discretionaryIncome(20, 30)).toBe(0);
    expect(discretionaryIncome(40, 30)).toBe(10);
  });
});

describe('netSavings', () => {
  it('collapses when income is below subsistence', () => {
    expect(netSavings(5, 0.2, 30)).toBe(0);
  });

  it('saves a fraction of discretionary income above subsistence', () => {
    expect(netSavings(60, 0.2, 30)).toBeCloseTo(1.1, 1);
  });
});

describe('nextCapital', () => {
  it('freezes capital when trapped', () => {
    expect(nextCapital(5, 0.2, 30)).toBe(5);
  });

  it('accumulates capital when above subsistence', () => {
    expect(nextCapital(60, 0.2, 30)).toBeGreaterThan(60);
  });
});

describe('simulateYear', () => {
  it('reports income, savings and capital for a year', () => {
    const row = simulateYear(1, 60, 0.2, 30);
    expect(row.year).toBe(1);
    expect(row.income).toBeCloseTo(35.49, 1);
    expect(row.netSavings).toBeCloseTo(1.1, 1);
    expect(row.capital).toBe(60);
  });
});

describe('simulate', () => {
  it('keeps a poor household frozen at the low equilibrium', () => {
    const result = simulate(5, 0.2, 30);
    expect(result.finalCapital).toBe(5);
    expect(result.escaped).toBe(false);
    expect(result.trapPhase).toBe('trapped');
  });

  it('lets an above-threshold household escape and grow', () => {
    const result = simulate(60, 0.2, 30);
    expect(result.escaped).toBe(true);
    expect(result.trapPhase).toBe('escaping');
    expect(result.finalCapital).toBeGreaterThan(60);
  });

  it('adds a transfer to the starting capital', () => {
    const result = simulate(5, 0.2, 30, 35);
    expect(result.escaped).toBe(true);
    expect(result.simulations[0].capital).toBe(40);
  });
});

describe('classifyTrap', () => {
  it('flags a state just below threshold as fragile', () => {
    const start = 38;
    const result = simulate(start, 0.2, 30);
    expect(result.trapPhase).toBe('at-threshold');
  });
});

describe('hasEscaped', () => {
  it('requires the final capital to clear the threshold', () => {
    const { simulations } = simulate(60, 0.2, 30);
    expect(hasEscaped(60, simulations, 30)).toBe(true);
    const trapped = simulate(5, 0.2, 30).simulations;
    expect(hasEscaped(5, trapped, 30)).toBe(false);
  });
});

describe('minimumTransferFor', () => {
  it('returns zero when already above the threshold', () => {
    expect(minimumTransferFor(60, 0.2, 30)).toBe(0);
  });

  it('returns the smallest transfer that clears the threshold', () => {
    expect(minimumTransferFor(5, 0.2, 30)).toBe(35);
    expect(minimumTransferFor(30, 0.2, 30)).toBe(10);
    expect(minimumTransferFor(38, 0.2, 30)).toBe(2);
  });
});

describe('buildScenario', () => {
  it('derives an escape threshold for the custom scenario', () => {
    const scenario = buildScenario(5, 0.2, 30);
    expect(scenario.threshold).toBeCloseTo(39.42, 1);
    expect(scenario.initialCapital).toBe(5);
  });
});
