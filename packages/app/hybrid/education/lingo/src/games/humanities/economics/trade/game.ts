import { NASH_TARIFF, RETALIATION_LEVELS } from './constants';
import type { Analysis, Market, RoundSpec } from './types';

export const demandAt = (m: Market, price: number): number =>
  Math.max(0, (m.ad - price) / m.bd);

export const supplyAt = (m: Market, price: number): number =>
  Math.max(0, (price - m.as) / m.bs);

export const autarkyPrice = (m: Market): number =>
  (m.ad * m.bs + m.as * m.bd) / (m.bd + m.bs);

export const autarkyQuantity = (m: Market): number =>
  (m.ad - m.as) / (m.bd + m.bs);

export const priceAfter = (m: Market, tariff: number): number =>
  m.worldP * (1 + tariff);

export const importsAt = (m: Market, tariff: number): number =>
  Math.max(
    0,
    demandAt(m, priceAfter(m, tariff)) - supplyAt(m, priceAfter(m, tariff))
  );

export const consumerSurplus = (m: Market, tariff: number): number =>
  0.5 * (m.ad - priceAfter(m, tariff)) * demandAt(m, priceAfter(m, tariff));

export const producerSurplus = (m: Market, tariff: number): number =>
  0.5 * (priceAfter(m, tariff) - m.as) * supplyAt(m, priceAfter(m, tariff));

export const tariffRevenue = (m: Market, tariff: number): number =>
  (priceAfter(m, tariff) - m.worldP) * importsAt(m, tariff);

export const deadweightLoss = (m: Market, tariff: number): number => {
  const gap = priceAfter(m, tariff) - m.worldP;
  return 0.5 * gap * (gap / m.bd + gap / m.bs);
};

export const analyze = (m: Market, tariff: number): Analysis => ({
  autarkyPrice: autarkyPrice(m),
  autarkyQuantity: autarkyQuantity(m),
  priceAfter: priceAfter(m, tariff),
  imports: Math.max(
    0,
    demandAt(m, priceAfter(m, tariff)) - supplyAt(m, priceAfter(m, tariff))
  ),
  demandAtPriceAfter: demandAt(m, priceAfter(m, tariff)),
  supplyAtPriceAfter: supplyAt(m, priceAfter(m, tariff)),
  consumerSurplus: consumerSurplus(m, tariff),
  producerSurplus: producerSurplus(m, tariff),
  revenue: tariffRevenue(m, tariff),
  deadweightLoss: deadweightLoss(m, tariff),
});

export const protectionReduction = (m: Market, tariff: number): number =>
  importsAt(m, 0) - importsAt(m, tariff);

export const importDeviation = (
  m: Market,
  tariff: number,
  target: number
): number => Math.abs(importsAt(m, tariff) - target);

export const answerFor = (spec: RoundSpec): number => {
  switch (spec.kind) {
    case 'revenue':
      return spec.options.reduce((best, t) =>
        tariffRevenue(spec.market, t) > tariffRevenue(spec.market, best)
          ? t
          : best
      );
    case 'protection':
      return (
        spec.options.find(
          (t) => protectionReduction(spec.market, t) >= spec.target
        ) ?? spec.options[0]
      );
    case 'import-target':
      return spec.options.reduce((best, t) =>
        importDeviation(spec.market, t, spec.target) <
        importDeviation(spec.market, best, spec.target)
          ? t
          : best
      );
    case 'retaliation':
      return NASH_TARIFF;
  }
};

export const scoreFor = (
  spec: RoundSpec,
  chosen: number,
  other: number
): number => {
  switch (spec.kind) {
    case 'revenue': {
      const best = answerFor(spec);
      const bestRevenue = tariffRevenue(spec.market, best);
      return Math.round(
        (100 * tariffRevenue(spec.market, chosen)) / bestRevenue
      );
    }
    case 'protection': {
      const reduction = protectionReduction(spec.market, chosen);
      if (reduction < spec.target) {
        return Math.round((100 * reduction) / spec.target);
      }
      const best = answerFor(spec);
      return Math.round(
        (100 * deadweightLoss(spec.market, best)) /
          deadweightLoss(spec.market, chosen)
      );
    }
    case 'import-target': {
      const freeImports = importsAt(spec.market, 0);
      return Math.max(
        0,
        Math.round(
          100 *
            (1 -
              importDeviation(spec.market, chosen, spec.target) / freeImports)
        )
      );
    }
    case 'retaliation':
      return Math.max(
        0,
        Math.round(
          100 *
            (1 -
              (Math.abs(chosen - NASH_TARIFF) + Math.abs(other - NASH_TARIFF)))
        )
      );
  }
};

export const tradeVolume = (my: number, other: number): number =>
  Math.max(0, 100 * (1 - my - other));

export const payoff = (t: number, u: number): number =>
  90 * t - 110 * t * u + 20 * (1 - u) * (1 - 2 * t);

export const bestResponse = (other: number): number =>
  RETALIATION_LEVELS.reduce((best, t) =>
    payoff(t, other) > payoff(best, other) ? t : best
  );

export const isNash = (my: number, other: number): boolean =>
  bestResponse(other) === my && bestResponse(my) === other;
