import { LAB_MARKET, NASH_TARIFF, ROUNDS } from '../constants';
import {
  analyze,
  answerFor,
  autarkyPrice,
  autarkyQuantity,
  bestResponse,
  consumerSurplus,
  deadweightLoss,
  demandAt,
  importDeviation,
  importsAt,
  isNash,
  payoff,
  priceAfter,
  producerSurplus,
  protectionReduction,
  scoreFor,
  supplyAt,
  tariffRevenue,
  tradeVolume,
} from '../game';
import type { Market } from '../types';

describe('linear market formulas', () => {
  const m = LAB_MARKET;

  it('computes the autarky equilibrium', () => {
    expect(autarkyPrice(m)).toBe(60);
    expect(autarkyQuantity(m)).toBe(80);
  });

  it('computes demand and supply at a price', () => {
    expect(demandAt(m, 25)).toBe(150);
    expect(supplyAt(m, 25)).toBe(10);
  });

  it('raises the domestic price by the tariff', () => {
    expect(priceAfter(m, 0.2)).toBe(30);
  });

  it('cuts imports as the tariff rises', () => {
    expect(importsAt(m, 0)).toBe(140);
    expect(importsAt(m, 0.2)).toBe(120);
  });
});

describe('surplus, revenue, and deadweight loss at t = 0.2', () => {
  const m = LAB_MARKET;

  it('computes consumer and producer surplus', () => {
    expect(consumerSurplus(m, 0.2)).toBeCloseTo(4900, 5);
    expect(producerSurplus(m, 0.2)).toBeCloseTo(100, 5);
  });

  it('computes tariff revenue on imported units', () => {
    expect(tariffRevenue(m, 0.2)).toBeCloseTo(600, 5);
  });

  it('computes deadweight loss from the two triangles', () => {
    expect(deadweightLoss(m, 0.2)).toBeCloseTo(50, 5);
  });

  it('reports a full analysis object', () => {
    const a = analyze(m, 0.2);
    expect(a.priceAfter).toBe(30);
    expect(a.imports).toBe(120);
    expect(a.demandAtPriceAfter).toBe(140);
    expect(a.supplyAtPriceAfter).toBe(20);
  });
});

describe('answerFor', () => {
  it('picks the revenue-maximizing tariff in round 1', () => {
    expect(answerFor(ROUNDS[0])).toBe(0.35);
  });

  it('picks the first tariff meeting the protection target', () => {
    expect(answerFor(ROUNDS[1])).toBe(0.25);
  });

  it('picks the tariff closest to the import target', () => {
    expect(answerFor(ROUNDS[2])).toBe(0.4);
  });

  it('returns the Nash tariff for retaliation', () => {
    expect(answerFor(ROUNDS[3])).toBe(NASH_TARIFF);
  });
});

describe('protectionReduction and importDeviation', () => {
  it('counts the units kept out by the tariff', () => {
    expect(protectionReduction(ROUNDS[1].market as Market, 0.25)).toBeCloseTo(
      12.5,
      5
    );
  });

  it('measures distance to the import target', () => {
    expect(importDeviation(ROUNDS[2].market as Market, 0.4, 25)).toBeCloseTo(
      0,
      5
    );
    expect(importDeviation(ROUNDS[2].market as Market, 0.5, 25)).toBeCloseTo(
      5,
      5
    );
  });
});

describe('scoreFor', () => {
  it('scores revenue as a share of the best revenue', () => {
    expect(scoreFor(ROUNDS[0], 0.35, 0)).toBe(100);
    expect(scoreFor(ROUNDS[0], 0.2, 0)).toBeGreaterThan(60);
  });

  it('scores protection by reduction below target and DWL above it', () => {
    expect(scoreFor(ROUNDS[1], 0.25, 0)).toBe(100);
    expect(scoreFor(ROUNDS[1], 0.1, 0)).toBeLessThan(100);
  });

  it('scores import-target by proportional deviation', () => {
    expect(scoreFor(ROUNDS[2], 0.4, 0)).toBe(100);
    expect(scoreFor(ROUNDS[2], 0.5, 0)).toBeLessThan(100);
  });

  it('scores retaliation by distance from mutual Nash', () => {
    expect(scoreFor(ROUNDS[3], 0.5, 0.5)).toBe(100);
    expect(scoreFor(ROUNDS[3], 0.25, 0)).toBe(25);
    expect(scoreFor(ROUNDS[3], 0, 0)).toBe(0);
  });
});

describe('retaliation payoffs', () => {
  it('computes trade volume between tariffed partners', () => {
    expect(tradeVolume(0, 0)).toBe(100);
    expect(tradeVolume(0.5, 0.5)).toBe(0);
  });

  it('shows defection tempting and mutual tariffs self-defeating', () => {
    expect(payoff(0, 0)).toBeCloseTo(20, 5);
    expect(payoff(0.5, 0)).toBeCloseTo(45, 5);
    expect(payoff(0.5, 0.5)).toBeCloseTo(17.5, 5);
  });

  it('labels only the mutual high tariff as Nash', () => {
    expect(bestResponse(0.5)).toBe(NASH_TARIFF);
    expect(isNash(0.5, 0.5)).toBe(true);
    expect(isNash(0, 0)).toBe(false);
  });
});
