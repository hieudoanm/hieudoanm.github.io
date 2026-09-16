import { MC } from './constants';

export const qBusiness = (price: number, flipped = false): number =>
  Math.max(0, Math.round(flipped ? 120 - 2 * price : 100 - price));

export const qLeisure = (price: number, flipped = false): number =>
  Math.max(0, Math.round(flipped ? 100 - price : 120 - 2 * price));

export const profitSingle = (price: number, flipped = false): number =>
  (price - MC) * (qBusiness(price, flipped) + qLeisure(price, flipped));

export const profitDual = (
  priceB: number,
  priceL: number,
  flipped = false
): number =>
  (priceB - MC) * qBusiness(priceB, flipped) +
  (priceL - MC) * qLeisure(priceL, flipped);

const integerPrices = (): number[] =>
  Array.from({ length: 100 }, (_, index) => index + 1);

export const optimalSingle = (
  flipped = false
): { price: number; profit: number } => {
  let bestPrice = 0;
  let bestProfit = Number.NEGATIVE_INFINITY;
  for (const price of integerPrices()) {
    const profit = profitSingle(price, flipped);
    if (profit > bestProfit) {
      bestProfit = profit;
      bestPrice = price;
    }
  }
  return { price: bestPrice, profit: bestProfit };
};

export const optimalDual = (
  flipped = false
): { priceB: number; priceL: number; profit: number } => {
  let bestB = 0;
  let bestL = 0;
  let bestProfit = Number.NEGATIVE_INFINITY;
  for (const priceB of integerPrices()) {
    for (const priceL of integerPrices()) {
      const profit = profitDual(priceB, priceL, flipped);
      if (profit > bestProfit) {
        bestProfit = profit;
        bestB = priceB;
        bestL = priceL;
      }
    }
  }
  return { priceB: bestB, priceL: bestL, profit: bestProfit };
};

export const roundFlipped = (round: number): boolean => round === 3;
