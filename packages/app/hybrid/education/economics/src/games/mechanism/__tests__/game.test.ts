import { MAX_VALUE, MIN_VALUE, SHARE } from '../constants';
import {
  aiReports,
  clampReport,
  idealReport,
  isPivotal,
  netPayoffs,
  outcome,
  pivotTaxFor,
  sampleValues,
} from '../game';

describe('sampleValues', () => {
  it('uses the injectable rand to draw three values in range', () => {
    const sequence = [0, 0.999, 0.5];
    const values = sampleValues(() => sequence.shift() as number);
    expect(values).toEqual([0, 100, 50]);
  });

  it('defaults to Math.random', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.2);
    expect(sampleValues()).toEqual([20, 20, 20]);
    jest.restoreAllMocks();
  });

  it('honors the value bounds', () => {
    expect(sampleValues(() => 0)).toEqual([MIN_VALUE, MIN_VALUE, MIN_VALUE]);
    expect(sampleValues(() => 0.999)).toEqual([
      MAX_VALUE,
      MAX_VALUE,
      MAX_VALUE,
    ]);
  });
});

describe('aiReports', () => {
  it('reports AI values truthfully', () => {
    expect(aiReports([60, 90, 90])).toEqual([60, 90, 90]);
  });
});

describe('isPivotal', () => {
  it('flags an agent whose report bridges the cost gap', () => {
    expect(isPivotal([80, 40, 40], 0)).toBe(true);
    expect(isPivotal([0, 90, 90], 0)).toBe(false);
  });

  it('never flags an agent when the project fails to build', () => {
    expect(isPivotal([40, 40, 40], 0)).toBe(false);
  });
});

describe('pivotTaxFor', () => {
  it('charges the externality only to pivotal agents', () => {
    expect(pivotTaxFor([80, 40, 40], 0)).toBe(70);
    expect(pivotTaxFor([80, 40, 40], 1)).toBe(30);
  });

  it('charges nothing when others already fund the project', () => {
    expect(pivotTaxFor([0, 90, 90], 0)).toBe(0);
  });
});

describe('outcome', () => {
  it('builds under Equal Share when reports sum to the cost', () => {
    const result = outcome('equal', [0, 90, 90]);
    expect(result.built).toBe(true);
    expect(result.payments).toEqual([SHARE, SHARE, SHARE]);
    expect(result.pivotTaxes).toEqual([0, 0, 0]);
  });

  it('refuses to build when reports fall short', () => {
    const result = outcome('equal', [0, 40, 90]);
    expect(result.built).toBe(false);
    expect(result.payments).toEqual([0, 0, 0]);
    expect(result.pivotTaxes).toEqual([0, 0, 0]);
  });

  it('adds the Clarke tax for pivotal agents under the pivot rule', () => {
    expect(outcome('pivot', [80, 40, 40])).toEqual({
      built: true,
      payments: [120, 80, 80],
      pivotTaxes: [70, 30, 30],
    });
  });

  it('charges nothing under the pivot rule when the project is not built', () => {
    expect(outcome('pivot', [40, 40, 40])).toEqual({
      built: false,
      payments: [0, 0, 0],
      pivotTaxes: [0, 0, 0],
    });
  });
});

describe('netPayoffs', () => {
  it('lets the player free-ride under Equal Share when others fund it', () => {
    const truthful = netPayoffs('equal', [60, 90, 90], [60, 90, 90]);
    const freeRiding = netPayoffs('equal', [60, 90, 90], [0, 90, 90]);
    expect(freeRiding).toEqual([10, 40, 40]);
    expect(freeRiding[0]).toBe(truthful[0]);
  });

  it('charges the player the full equal share plus tax when pivotal', () => {
    expect(netPayoffs('pivot', [80, 40, 40], [80, 40, 40])).toEqual([
      -40, -40, -40,
    ]);
  });
});

describe('idealReport', () => {
  it('reports truthfully under the pivot rule', () => {
    expect(idealReport('pivot', 80, [40, 40])).toBe(80);
  });

  it('free-rides under Equal Share when others fund the project', () => {
    expect(idealReport('equal', 60, [90, 90])).toBe(0);
  });

  it('reports only the shortfall when others do not fund it', () => {
    expect(idealReport('equal', 60, [40, 40])).toBe(70);
  });

  it('does not volunteer when the value never covers the share', () => {
    expect(idealReport('equal', 40, [40, 40])).toBe(0);
  });
});

describe('clampReport', () => {
  it('clamps and rounds to a valid report', () => {
    expect(clampReport(-5)).toBe(0);
    expect(clampReport(150)).toBe(100);
    expect(clampReport(55.5)).toBe(56);
    expect(clampReport(44)).toBe(44);
  });
});
