import type { Currency, FxRates, TrianglePathId } from './types';

export const impliedCross = (usdPerEur: number, jpyPerUsd: number): number =>
  usdPerEur * jpyPerUsd;

export const consistencyRatio = (rates: FxRates): number =>
  rates.quotedCross / impliedCross(rates.usdPerEur, rates.jpyPerUsd);

export const convert = (
  amount: number,
  from: Currency,
  to: Currency,
  rates: FxRates
): number => {
  switch (from) {
    case 'USD':
      return to === 'EUR' ? amount / rates.usdPerEur : amount * rates.jpyPerUsd;
    case 'EUR':
      return to === 'USD'
        ? amount * rates.usdPerEur
        : amount * rates.quotedCross;
    case 'JPY':
      return to === 'USD'
        ? amount / rates.jpyPerUsd
        : amount / rates.quotedCross;
  }
};

export const tradeRound = (
  startUsd: number,
  pathId: TrianglePathId,
  rates: FxRates
): number => {
  switch (pathId) {
    case 'direct':
      return startUsd;
    case 'usd_eur_jpy_usd':
      return convert(
        convert(convert(startUsd, 'USD', 'EUR', rates), 'EUR', 'JPY', rates),
        'JPY',
        'USD',
        rates
      );
    case 'usd_jpy_eur_usd':
      return convert(
        convert(convert(startUsd, 'USD', 'JPY', rates), 'JPY', 'EUR', rates),
        'EUR',
        'USD',
        rates
      );
  }
};

export const arbProfit = (
  startUsd: number,
  pathId: TrianglePathId,
  rates: FxRates
): number => tradeRound(startUsd, pathId, rates) - startUsd;
