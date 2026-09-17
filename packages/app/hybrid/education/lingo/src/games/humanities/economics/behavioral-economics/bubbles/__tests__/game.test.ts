import {
  applyAction,
  episodePrice,
  finalWealth,
  pnlOf,
  wasAboveFundamentals,
} from '../game';
import type { GameState } from '../types';

const state = (overrides: Partial<GameState> = {}): GameState => ({
  phase: 'play',
  episode: 1,
  round: 4,
  fundamental: 60,
  cash: 1000,
  units: 0,
  avgCost: 0,
  realized: 0,
  lastAction: null,
  episodeScores: [],
  ...overrides,
});

describe('episodePrice', () => {
  it('scales the fundamental by the round factor', () => {
    expect(episodePrice(1, 60)).toBe(33);
    expect(episodePrice(4, 60)).toBe(60);
    expect(episodePrice(2, 80)).toBe(56);
    expect(episodePrice(8, 60)).toBe(36);
  });
});

describe('applyAction', () => {
  it('buys a single unit and updates the running average cost', () => {
    const next = applyAction(state(), 'buy', 60, 4);
    expect(next.cash).toBe(940);
    expect(next.units).toBe(1);
    expect(next.avgCost).toBe(60);
  });

  it('averages cost across multiple purchases', () => {
    let next = applyAction(state(), 'buy', 60, 4);
    next = applyAction(next, 'buy', 90, 6);
    expect(next.units).toBe(2);
    expect(next.avgCost).toBe(75);
  });

  it('refuses a buy it cannot afford', () => {
    const before = state({ cash: 30 });
    expect(applyAction(before, 'buy', 60, 4)).toBe(before);
  });

  it('sells the whole position and realizes the gain', () => {
    const next = applyAction(
      state({ cash: 900, units: 2, avgCost: 60 }),
      'sell',
      105,
      7
    );
    expect(next.cash).toBe(1110);
    expect(next.units).toBe(0);
    expect(next.avgCost).toBe(0);
    expect(next.realized).toBe(90);
  });

  it('refuses a sell with no position', () => {
    const before = state();
    expect(applyAction(before, 'sell', 60, 4)).toBe(before);
  });

  it('returns the state unchanged when holding', () => {
    const before = state();
    expect(applyAction(before, 'hold', 60, 4)).toBe(before);
  });

  it('ignores actions outside the valid round range', () => {
    const before = state();
    expect(applyAction(before, 'buy', 60, 9)).toBe(before);
    expect(applyAction(before, 'buy', 60, 0)).toBe(before);
  });
});

describe('finalWealth', () => {
  it('adds cash and the mark-to-market position', () => {
    expect(finalWealth(state({ cash: 940, units: 1 }), 36)).toBe(976);
  });
});

describe('wasAboveFundamentals', () => {
  it('detects when price exceeds the fundamental value', () => {
    expect(wasAboveFundamentals(105, 60)).toBe(true);
    expect(wasAboveFundamentals(36, 60)).toBe(false);
  });
});

describe('pnlOf', () => {
  it('measures wealth against the starting cash', () => {
    expect(pnlOf(state(), 60)).toBe(0);
    expect(pnlOf(state({ cash: 940, units: 1 }), 36)).toBe(-24);
  });
});
