import { QUOTES } from '../constants';
import {
  arbProfit,
  consistencyRatio,
  convert,
  impliedCross,
  tradeRound,
} from '../game';
import type { FxRates } from '../types';

const rates: FxRates = QUOTES[0];

describe('impliedCross', () => {
  it('multiplies the two base rates into a cross rate', () => {
    expect(impliedCross(1.25, 100)).toBe(125);
  });
});

describe('consistencyRatio', () => {
  it('compares the quoted cross against the implied cross', () => {
    expect(consistencyRatio(rates)).toBeCloseTo(126.125 / 125, 10);
  });
});

describe('convert', () => {
  it('converts between every pair of currencies', () => {
    expect(convert(1000, 'USD', 'EUR', rates)).toBe(800);
    expect(convert(800, 'EUR', 'JPY', rates)).toBe(100900);
    expect(convert(100900, 'JPY', 'USD', rates)).toBe(1009);
    expect(convert(100900, 'JPY', 'EUR', rates)).toBeCloseTo(800, 5);
  });
});

describe('tradeRound', () => {
  it('holds cash on the direct path', () => {
    expect(tradeRound(1000, 'direct', rates)).toBe(1000);
  });

  it('gains on the triangle that follows the quoted cross', () => {
    expect(tradeRound(1000, 'usd_eur_jpy_usd', rates)).toBe(1009);
  });

  it('loses on the reversed triangle', () => {
    expect(tradeRound(1000, 'usd_jpy_eur_usd', rates)).toBeCloseTo(991.08, 1);
  });
});

describe('arbProfit', () => {
  it('reports the spread captured with a profitable triangle', () => {
    expect(arbProfit(1000, 'usd_eur_jpy_usd', rates)).toBe(9);
  });

  it('reports a slight loss on the reversed triangle', () => {
    expect(arbProfit(1000, 'usd_jpy_eur_usd', rates)).toBeCloseTo(-8.92, 1);
  });

  it('reports zero for holding cash', () => {
    expect(arbProfit(1000, 'direct', rates)).toBe(0);
  });
});
