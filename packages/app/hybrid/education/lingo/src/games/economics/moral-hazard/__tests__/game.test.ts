import type { RoundResult } from '../types';
import { CONTRACTS, LOSS_AMOUNT, STARTING_WEALTH } from '../constants';
import {
  buildRoundResult,
  expectedPayoff,
  insuranceCoverage,
  isLossDraw,
  moralHazardCount,
  roundPayoff,
} from '../game';

describe('isLossDraw', () => {
  it('returns true when rand is below prob', () => {
    expect(isLossDraw(0.3, () => 0.1)).toBe(true);
  });

  it('returns false when rand is above prob', () => {
    expect(isLossDraw(0.3, () => 0.5)).toBe(false);
  });

  it('returns false when rand equals prob', () => {
    expect(isLossDraw(0.3, () => 0.3)).toBe(false);
  });
});

describe('insuranceCoverage', () => {
  it('returns 0 for none', () => {
    expect(insuranceCoverage('none')).toBe(0);
  });

  it('returns full loss amount for full', () => {
    expect(insuranceCoverage('full')).toBe(LOSS_AMOUNT);
  });

  it('returns loss minus deductible for partial', () => {
    expect(insuranceCoverage('partial')).toBe(
      LOSS_AMOUNT - CONTRACTS.partial.deductible
    );
  });
});

describe('expectedPayoff', () => {
  it('None: high effort is better than low effort', () => {
    expect(expectedPayoff('none', 'high')).toBeGreaterThan(
      expectedPayoff('none', 'low')
    );
  });

  it('Partial: high effort is better than low effort', () => {
    expect(expectedPayoff('partial', 'high')).toBeGreaterThan(
      expectedPayoff('partial', 'low')
    );
  });

  it('Full: low effort is better than high effort', () => {
    expect(expectedPayoff('full', 'low')).toBeGreaterThan(
      expectedPayoff('full', 'high')
    );
  });

  it('None high = 92', () => {
    expect(expectedPayoff('none', 'high')).toBe(92);
  });

  it('None low = 82', () => {
    expect(expectedPayoff('none', 'low')).toBe(82);
  });

  it('Full high = 83', () => {
    expect(expectedPayoff('full', 'high')).toBe(83);
  });

  it('Full low = 85', () => {
    expect(expectedPayoff('full', 'low')).toBe(85);
  });

  it('Partial high = 88', () => {
    expect(expectedPayoff('partial', 'high')).toBe(88);
  });

  it('Partial low = 86', () => {
    expect(expectedPayoff('partial', 'low')).toBe(86);
  });
});

describe('roundPayoff', () => {
  it('no loss: returns starting wealth minus premium minus effort cost', () => {
    expect(roundPayoff('none', 'low', false)).toBe(100);
    expect(roundPayoff('none', 'high', false)).toBe(98);
    expect(roundPayoff('full', 'low', false)).toBe(85);
    expect(roundPayoff('full', 'high', false)).toBe(83);
    expect(roundPayoff('partial', 'low', false)).toBe(92);
    expect(roundPayoff('partial', 'high', false)).toBe(90);
  });

  it('loss with none: full out of pocket', () => {
    expect(roundPayoff('none', 'low', true)).toBe(40);
    expect(roundPayoff('none', 'high', true)).toBe(38);
  });

  it('loss with full: insurer covers everything', () => {
    expect(roundPayoff('full', 'low', true)).toBe(85);
    expect(roundPayoff('full', 'high', true)).toBe(83);
  });

  it('loss with partial: player pays deductible', () => {
    expect(roundPayoff('partial', 'low', true)).toBe(72);
    expect(roundPayoff('partial', 'high', true)).toBe(70);
  });

  it('accepts custom loss amount', () => {
    expect(roundPayoff('partial', 'low', true, 10)).toBe(82);
  });
});

describe('moralHazardCount', () => {
  it('counts rounds with full contract and low effort', () => {
    const history: RoundResult[] = [
      {
        round: 1,
        contract: 'full',
        effort: 'low',
        loss: false,
        netWealth: 85,
        outOfPocket: 0,
        insurerPays: 0,
      },
      {
        round: 2,
        contract: 'full',
        effort: 'high',
        loss: false,
        netWealth: 83,
        outOfPocket: 0,
        insurerPays: 0,
      },
      {
        round: 3,
        contract: 'none',
        effort: 'low',
        loss: true,
        netWealth: 40,
        outOfPocket: 60,
        insurerPays: 0,
      },
    ];
    expect(moralHazardCount(history)).toBe(1);
  });

  it('returns 0 for empty history', () => {
    expect(moralHazardCount([])).toBe(0);
  });
});

describe('buildRoundResult', () => {
  it('builds correct result for no loss', () => {
    const r = buildRoundResult(1, 'full', 'low', false);
    expect(r.netWealth).toBe(85);
    expect(r.outOfPocket).toBe(0);
    expect(r.insurerPays).toBe(0);
    expect(r.loss).toBe(false);
  });

  it('builds correct result for loss with partial', () => {
    const r = buildRoundResult(1, 'partial', 'high', true);
    expect(r.netWealth).toBe(70);
    expect(r.outOfPocket).toBe(20);
    expect(r.insurerPays).toBe(40);
    expect(r.loss).toBe(true);
  });
});
