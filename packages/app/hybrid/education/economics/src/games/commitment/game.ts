import { TEMPTATION_RATE } from './constants';

export const tempted = (
  random01: number,
  save: number,
  commitment: boolean
): number => {
  if (commitment) return save;
  return random01 < TEMPTATION_RATE ? Math.max(0, save - 10) : save;
};

export const compound = (savings: number, save: number): number =>
  Math.round(savings * 1.1 + save);

export const consumptionUtility = (consume: number): number =>
  Math.round(Math.sqrt(consume) * 100) / 100;
